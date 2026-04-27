/**
 * Seeds the vehicle catalog (CatalogMake / CatalogModel / CatalogTrim) from:
 *   - ADEME Car Labelling CSV (authoritative for FR fiscal CV + WLTP CO₂)
 *   - EEA discodata SQL API (1.89 M rows of FR 2023 registrations, used to
 *     widen coverage beyond the 3.6k ADEME rows)
 *
 * Upsert strategy:
 *   - ADEME rows always win. A trim that already exists with source='ademe'
 *     is never overwritten by an EEA row.
 *   - EEA rows fill gaps: new (make, model) pairs, or new energy/power
 *     combinations inside an ADEME-known (make, model) — never replacing.
 *   - `naturalKey` deduplicates identical rows across re-runs, making the
 *     script idempotent.
 *
 * Runs automatically at container boot (see apps/web/lib/catalog/bootstrap.ts)
 * or manually via `pnpm db:seed:catalog`.
 */
import { PrismaClient, type Prisma } from '@prisma/client';

import { estimateFiscalCv, type EnergyHint } from '../lib/catalog/fiscal-cv';

const prisma = new PrismaClient();

const ADEME_URL = 'https://data.ademe.fr/data-fair/api/v1/datasets/ademe-car-labelling/raw';
const ADEME_VERSION = '2026-03-15'; // dataset snapshot date on data.ademe.fr
const EEA_URL = 'https://discodata.eea.europa.eu/api/sql';
const EEA_VERSION = '2023Fv28';

// ---------------------------------------------------------------------------
// utilities
// ---------------------------------------------------------------------------

function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseFrNumber(raw: string | undefined): number | null {
  if (!raw) return null;
  const s = String(raw).replace(/\s/g, '').replace(',', '.');
  if (!s || s === '-' || s === 'None') return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function parseFrInt(raw: string | undefined): number | null {
  const n = parseFrNumber(raw);
  return n === null ? null : Math.round(n);
}

// ---------------------------------------------------------------------------
// CSV parser (RFC-4180 minimal, handles quoted fields with embedded `;`)
// ---------------------------------------------------------------------------

type AdemeRow = Record<string, string>;

function parseCsv(text: string, separator = ';'): AdemeRow[] {
  const rows: string[][] = [];
  let field = '';
  let row: string[] = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === separator) {
      row.push(field);
      field = '';
    } else if (c === '\n') {
      row.push(field);
      field = '';
      rows.push(row);
      row = [];
    } else if (c === '\r') {
      /* skip */
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  const header = (rows.shift() ?? []).map((h) => h.replace(/^﻿/, '').trim());
  return rows
    .filter((r) => r.length === header.length && r.some((v) => v.length > 0))
    .map((r) => {
      const obj: AdemeRow = {};
      header.forEach((h, idx) => {
        obj[h] = (r[idx] ?? '').trim();
      });
      return obj;
    });
}

// ---------------------------------------------------------------------------
// Energy mapping
// ---------------------------------------------------------------------------

function mapAdemeEnergy(raw: string): EnergyHint {
  const s = raw.trim().toUpperCase();
  if (s.includes('ESSENCE') && s.includes('ELEC')) return 'EH';
  if (s.includes('DIESEL') && s.includes('ELEC')) return 'GH';
  if (s.includes('GAZOLE') && s.includes('ELEC')) return 'GH';
  if (s === 'ESSENCE' || s.startsWith('ESS')) return 'ES';
  if (s === 'DIESEL' || s === 'GAZOLE' || s.startsWith('GAZ')) return 'GO';
  if (s.includes('ELEC')) return 'EE';
  if (s.includes('GPL')) return 'GL';
  if (s.includes('GNV') || s.includes('GAZ NATUREL')) return 'GN';
  if (s.includes('HYDROG')) return 'H2';
  if (s.includes('HYBRID')) return 'EH';
  return 'OTHER';
}

function mapEeaEnergy(ft: string, fm: string): EnergyHint {
  const f = ft.toLowerCase();
  const m = fm.toUpperCase();
  if (f === 'electric') return 'EE';
  if (f === 'hydrogen') return 'H2';
  if (f === 'lpg' || f === 'lpg-petrol') return 'GL';
  if (f === 'ng' || f === 'ng-biomethane') return 'GN';
  // Hybrid modes: M=monofuel, B=bifuel, F=flexfuel, H=non-rechargeable hybrid, P=PHEV
  if (m === 'P' || m === 'H') {
    if (f.includes('diesel')) return 'GH';
    return 'EH';
  }
  if (f === 'diesel' || f === 'diesel/electric') return 'GO';
  if (f === 'petrol' || f === 'petrol/electric') return 'ES';
  return 'OTHER';
}

// ---------------------------------------------------------------------------
// Natural key: ensures a trim is one row forever across re-runs
// ---------------------------------------------------------------------------

function naturalKey(parts: {
  make: string;
  model: string;
  label: string;
  energy: string;
  fiscalCv: number;
  powerKw: number | null;
  displacementCc: number | null;
  source: string;
}): string {
  return [
    parts.source,
    parts.make,
    parts.model,
    parts.label,
    parts.energy,
    parts.fiscalCv,
    parts.powerKw ?? '',
    parts.displacementCc ?? '',
  ]
    .join('::')
    .slice(0, 500);
}

// ---------------------------------------------------------------------------
// Upsert helpers
// ---------------------------------------------------------------------------

/**
 * Canonical aliases — collapses EEA/ADEME naming variants into a single brand.
 *
 * EEA distinguishes legal entities (e.g. "MERCEDES-BENZ AG", "MERCEDES BENZ",
 * "MERCEDES AMG") that all map to one consumer brand. ADEME is cleaner but
 * still uses different casing/punctuation than EEA. Without this map, we end
 * up with `MERCEDES` (9 ADEME trims) and `MERCEDES BENZ` (402 EEA trims) as
 * separate brands and the public API filter `?make=MERCEDES` only sees the
 * first one.
 *
 * Keys are written in the post-`normalizeMakeName` form (uppercased, single
 * spaces, no punctuation collapsing — that's done before lookup).
 */
const MAKE_ALIASES: Record<string, string> = {
  'MERCEDES BENZ': 'MERCEDES',
  'MERCEDES BENZ AG': 'MERCEDES',
  'MERCEDES-BENZ': 'MERCEDES',
  'MERCEDES AMG': 'MERCEDES',
  'B M W': 'BMW',
  'BMW I': 'BMW',
  'B.M.W.': 'BMW',
  'M.G.': 'MG',
  'MC LAREN': 'MCLAREN',
  LAMBORGHIN: 'LAMBORGHINI',
  'ROLLS ROYC': 'ROLLS ROYCE',
  'MITSUBISHI MOTORS CORPORATION': 'MITSUBISHI',
  'MITSUBISHI MOTORS THAILAND': 'MITSUBISHI',
  CITROËN: 'CITROEN',
  VAUXHALL: 'OPEL', // same vehicles, UK badge
};

function normalizeMakeName(raw: string): string {
  // Drop punctuation that EEA uses inconsistently (dots, hyphens), uppercase,
  // collapse whitespace. Then look up against the alias table.
  const cleaned = raw.trim().toUpperCase().replace(/[.\-]/g, ' ').replace(/\s+/g, ' ').trim();
  return MAKE_ALIASES[cleaned] ?? cleaned;
}

async function upsertMake(rawName: string, source: 'ademe' | 'eea'): Promise<number> {
  const name = normalizeMakeName(rawName);
  const slug = slugify(name);

  // Prefer matching by slug first (handles ADEME "ALFA ROMEO" vs EEA
  // variants with stray spaces that collapse to the same slug).
  const bySlug = await prisma.catalogMake.findUnique({ where: { slug } });
  if (bySlug) {
    const patch: Prisma.CatalogMakeUpdateInput = {};
    if (!bySlug.sources.includes(source)) patch.sources = [...bySlug.sources, source];
    if (Object.keys(patch).length > 0) {
      await prisma.catalogMake.update({ where: { id: bySlug.id }, data: patch });
    }
    return bySlug.id;
  }

  const byName = await prisma.catalogMake.findUnique({ where: { name } });
  if (byName) {
    if (!byName.sources.includes(source)) {
      await prisma.catalogMake.update({
        where: { id: byName.id },
        data: { sources: [...byName.sources, source] },
      });
    }
    return byName.id;
  }

  const created = await prisma.catalogMake.create({
    data: { name, slug, sources: [source] },
  });
  return created.id;
}

async function upsertModel(makeId: number, rawName: string): Promise<number> {
  const name = rawName.trim().toUpperCase().replace(/\s+/g, ' ');
  const found = await prisma.catalogModel.findUnique({
    where: { makeId_name: { makeId, name } },
  });
  if (found) return found.id;
  const created = await prisma.catalogModel.create({
    data: { makeId, name, slug: slugify(name) },
  });
  return created.id;
}

async function upsertTrim(
  modelId: number,
  trim: Omit<Prisma.CatalogTrimUncheckedCreateInput, 'modelId'>,
  overwrite: boolean,
): Promise<'created' | 'updated' | 'skipped'> {
  const existing = await prisma.catalogTrim.findUnique({
    where: { naturalKey: trim.naturalKey },
  });
  if (existing) {
    if (overwrite) {
      await prisma.catalogTrim.update({
        where: { id: existing.id },
        data: { ...trim, modelId },
      });
      return 'updated';
    }
    return 'skipped';
  }
  await prisma.catalogTrim.create({ data: { ...trim, modelId } });
  return 'created';
}

// ---------------------------------------------------------------------------
// ADEME ingestion (source of truth for FR fiscal)
// ---------------------------------------------------------------------------

async function seedAdeme(): Promise<{ rowCount: number; durationMs: number }> {
  const t0 = Date.now();
  console.log(`[ademe] GET ${ADEME_URL}`);
  const res = await fetch(ADEME_URL);
  if (!res.ok) throw new Error(`ADEME fetch ${res.status}`);
  const rows = parseCsv(await res.text(), ';');
  console.log(`[ademe] parsed ${rows.length} rows`);

  let inserted = 0;
  let updated = 0;
  for (const row of rows) {
    const makeName = (row['Marque'] ?? '').trim().toUpperCase();
    const modelName = (row['Modèle'] ?? row['Libellé modèle'] ?? '').trim().toUpperCase();
    const fiscalCv = parseFrInt(row['Puissance fiscale']);
    if (!makeName || !modelName || fiscalCv === null) continue;

    const co2Min = parseFrNumber(row['CO2 vitesse mixte Min']);
    const co2Max = parseFrNumber(row['CO2 vitesse mixte Max']);
    const co2 =
      co2Min !== null && co2Max !== null
        ? Math.round((co2Min + co2Max) / 2)
        : co2Max !== null
          ? Math.round(co2Max)
          : co2Min !== null
            ? Math.round(co2Min)
            : null;
    const weight =
      parseFrInt(row['Masse OM Max']) ??
      parseFrInt(row['Masse OM Min']) ??
      parseFrInt(row['Poids à vide']);
    const powerKw = parseFrNumber(row['Puissance maximale']);
    const displacement = parseFrInt(row['Cylindrée']);
    const energy = mapAdemeEnergy(row['Energie'] ?? '');
    const bodyType = (row['Carrosserie'] ?? '').trim() || null;
    const description = (row['Description Commerciale'] ?? '').trim();
    const label = description || `${modelName} ${fiscalCv}CV`;

    const makeId = await upsertMake(makeName, 'ademe');
    const modelId = await upsertModel(makeId, modelName);
    const result = await upsertTrim(
      modelId,
      {
        naturalKey: naturalKey({
          make: makeName,
          model: modelName,
          label,
          energy,
          fiscalCv,
          powerKw,
          displacementCc: displacement,
          source: 'ademe',
        }),
        label,
        energy,
        fiscalCv,
        fiscalCvApprox: false,
        co2GPerKm: co2,
        weightKg: weight,
        powerKw,
        displacementCc: displacement,
        bodyType,
        marketYear: 2026,
        source: 'ademe',
      },
      /* overwrite: */ true, // re-seed refreshes ADEME with latest values
    );
    if (result === 'created') inserted++;
    else if (result === 'updated') updated++;
  }

  console.log(`[ademe] ${inserted} created · ${updated} updated`);
  await prisma.catalogSeedState.upsert({
    where: { source: 'ademe' },
    create: {
      source: 'ademe',
      lastSeededAt: new Date(),
      rowCount: rows.length,
      durationMs: Date.now() - t0,
      version: ADEME_VERSION,
    },
    update: {
      lastSeededAt: new Date(),
      rowCount: rows.length,
      durationMs: Date.now() - t0,
      version: ADEME_VERSION,
    },
  });
  return { rowCount: rows.length, durationMs: Date.now() - t0 };
}

// ---------------------------------------------------------------------------
// EEA ingestion via discodata SQL (paginated)
// ---------------------------------------------------------------------------

type EeaRow = {
  id: number;
  make: string;
  model: string;
  variant: string | null;
  fuel: string;
  mode: string;
  displacement: number | null;
  power_kw: number | null;
  mass_kg: number | null;
  co2_wltp: number | null;
};

async function fetchEeaMakeList(): Promise<string[]> {
  const q = `SELECT DISTINCT c.Mk AS make FROM [CO2Emission].[latest].[co2cars_${EEA_VERSION}] c WHERE c.MS = 'FR'`;
  const res = await fetch(`${EEA_URL}?query=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error(`EEA fetch ${res.status}`);
  const json = (await res.json()) as { results?: { make: string }[]; errors?: unknown };
  if (json.errors) throw new Error(`EEA error: ${JSON.stringify(json.errors)}`);
  return (json.results ?? []).map((r) => (r.make ?? '').trim()).filter((m) => m.length > 0);
}

async function fetchEeaTrimsForMake(make: string): Promise<EeaRow[]> {
  const escaped = make.replace(/'/g, "''");
  const q = `
    SELECT DISTINCT
      c.Mk AS make,
      c.Cn AS model,
      c.Va AS variant,
      c.Ft AS fuel,
      c.Fm AS mode,
      c."Ec (cm3)" AS displacement,
      c."Ep (KW)" AS power_kw,
      c."M (kg)" AS mass_kg,
      c."Ewltp (g/km)" AS co2_wltp
    FROM [CO2Emission].[latest].[co2cars_${EEA_VERSION}] c
    WHERE c.MS = 'FR' AND c.Mk = '${escaped}'
  `.trim();
  const res = await fetch(`${EEA_URL}?query=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error(`EEA fetch ${res.status}`);
  const json = (await res.json()) as { results?: EeaRow[]; errors?: unknown };
  if (json.errors) throw new Error(`EEA error (make=${make}): ${JSON.stringify(json.errors)}`);
  return (json.results ?? []).map((r) => ({
    make: r.make,
    model: r.model,
    variant: r.variant,
    fuel: r.fuel,
    mode: r.mode,
    displacement: r.displacement === null ? null : Number(r.displacement),
    power_kw: r.power_kw === null ? null : Number(r.power_kw),
    mass_kg: r.mass_kg === null ? null : Number(r.mass_kg),
    co2_wltp: r.co2_wltp === null ? null : Number(r.co2_wltp),
    id: 0,
  }));
}

async function seedEea(): Promise<{ rowCount: number; durationMs: number }> {
  const t0 = Date.now();
  console.log(`[eea] listing FR makes (${EEA_VERSION})`);
  const makes = await fetchEeaMakeList();
  console.log(`[eea] ${makes.length} makes to fetch`);

  const seen = new Map<
    string,
    {
      make: string;
      model: string;
      variant: string | null;
      fuel: string;
      mode: string;
      displacement: number | null;
      power_kw: number | null;
      mass_kg: number | null;
      co2_wltp: number | null;
    }
  >();
  let totalRows = 0;

  for (let i = 0; i < makes.length; i++) {
    const make = makes[i]!;
    try {
      const rows = await fetchEeaTrimsForMake(make);
      totalRows += rows.length;
      for (const row of rows) {
        if (!row.make || !row.model) continue;
        const key = [
          row.make,
          row.model,
          row.variant ?? '',
          row.fuel,
          row.mode,
          row.displacement ?? '',
          row.power_kw ?? '',
          row.co2_wltp ?? '',
          row.mass_kg ?? '',
        ].join('|');
        if (!seen.has(key)) seen.set(key, row);
      }
      if ((i + 1) % 10 === 0 || i === makes.length - 1) {
        console.log(
          `[eea]   ${i + 1}/${makes.length} makes · ${totalRows.toLocaleString()} rows · ${seen.size.toLocaleString()} unique trims`,
        );
      }
    } catch (err) {
      console.warn(`[eea]   skipped ${make}: ${(err as Error).message}`);
    }
  }
  console.log(
    `[eea] done: ${totalRows.toLocaleString()} rows collapsed into ${seen.size.toLocaleString()} trims`,
  );

  let created = 0;
  let skipped = 0;
  let i = 0;
  for (const v of seen.values()) {
    i++;
    const makeName = v.make.trim().toUpperCase();
    const modelName = v.model.trim().toUpperCase();
    const energy = mapEeaEnergy(v.fuel, v.mode);
    const fiscalCv = estimateFiscalCv({
      energy,
      powerKw: v.power_kw,
      co2GPerKm: v.co2_wltp,
    });
    if (fiscalCv === null) continue; // cannot compute without power

    const labelParts: string[] = [modelName];
    if (v.variant) labelParts.push(v.variant);
    if (v.power_kw) labelParts.push(`${Math.round(v.power_kw)}kW`);
    const label = labelParts.join(' ');

    const makeId = await upsertMake(makeName, 'eea');
    const modelId = await upsertModel(makeId, modelName);
    const result = await upsertTrim(
      modelId,
      {
        naturalKey: naturalKey({
          make: makeName,
          model: modelName,
          label,
          energy,
          fiscalCv,
          powerKw: v.power_kw,
          displacementCc: v.displacement,
          source: 'eea',
        }),
        label,
        energy,
        fiscalCv,
        fiscalCvApprox: true,
        co2GPerKm: v.co2_wltp,
        weightKg: v.mass_kg,
        powerKw: v.power_kw,
        displacementCc: v.displacement,
        bodyType: null,
        marketYear: 2023,
        source: 'eea',
      },
      /* overwrite: */ false, // never replace an ADEME row with EEA
    );
    if (result === 'created') created++;
    else skipped++;
    if (i % 2000 === 0) {
      console.log(`[eea]   upserted ${i.toLocaleString()} / ${seen.size.toLocaleString()}`);
    }
  }

  console.log(`[eea] ${created} created · ${skipped} skipped (already present)`);
  await prisma.catalogSeedState.upsert({
    where: { source: 'eea' },
    create: {
      source: 'eea',
      lastSeededAt: new Date(),
      rowCount: totalRows,
      durationMs: Date.now() - t0,
      version: EEA_VERSION,
    },
    update: {
      lastSeededAt: new Date(),
      rowCount: totalRows,
      durationMs: Date.now() - t0,
      version: EEA_VERSION,
    },
  });
  return { rowCount: totalRows, durationMs: Date.now() - t0 };
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

async function main() {
  const arg = process.argv[2];
  const runAdeme = !arg || arg === 'ademe' || arg === 'all';
  const runEea = !arg || arg === 'eea' || arg === 'all';

  if (runAdeme) {
    const r = await seedAdeme();
    console.log(`[ademe] took ${(r.durationMs / 1000).toFixed(1)}s`);
  }
  if (runEea) {
    const r = await seedEea();
    console.log(`[eea] took ${(r.durationMs / 1000).toFixed(1)}s`);
  }

  const counts = await Promise.all([
    prisma.catalogMake.count(),
    prisma.catalogModel.count(),
    prisma.catalogTrim.count(),
  ]);
  console.log(`[done] makes=${counts[0]} models=${counts[1]} trims=${counts[2]}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });

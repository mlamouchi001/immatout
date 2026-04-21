/**
 * Build the vehicle catalog by merging:
 *   - ADEME Car Labelling (FR, WLTP): https://data.ademe.fr/datasets/ademe-car-labelling
 *   - NHTSA vPIC (US, makes/models): https://vpic.nhtsa.dot.gov/api/
 *
 * ADEME is authoritative for French fiscal fields (puissance administrative, CO2
 * WLTP, masse ordre de marche). vPIC only supplements the makes list for brands
 * absent from ADEME.
 *
 * Writes data/catalog.json. Run via `pnpm --filter @immatout/vehicle-catalog build-catalog`.
 */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  type Catalog,
  CatalogSchema,
  type EnergyCode,
  type Make,
  type Model,
  type Trim,
} from '../src/schemas';

const ADEME_URL = 'https://data.ademe.fr/data-fair/api/v1/datasets/ademe-car-labelling/raw';
const VPIC_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json';

type AdemeRow = Record<string, string>;

// --- CSV parser (RFC-4180 minimal, handles quoted fields with embedded `;`) ---
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
      // skip
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

// French CSV uses `,` as decimal. Also some cells glue broken numbers across lines
// (e.g. "96\n000" joined back into "96000"). We strip everything non-numeric
// except a trailing decimal.
function parseFrNumber(raw: string | undefined): number | null {
  if (!raw) return null;
  const s = raw.replace(/\s/g, '').replace(',', '.');
  if (!s || s === '-') return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function parseFrInt(raw: string | undefined): number | null {
  const n = parseFrNumber(raw);
  return n === null ? null : Math.round(n);
}

function mapEnergy(raw: string): EnergyCode {
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

function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fetchAdemeCsv(): Promise<AdemeRow[]> {
  console.log(`[ademe] GET ${ADEME_URL}`);
  const res = await fetch(ADEME_URL);
  if (!res.ok) throw new Error(`ADEME fetch failed: ${res.status}`);
  const text = await res.text();
  const rows = parseCsv(text, ';');
  console.log(`[ademe] parsed ${rows.length} rows`);
  return rows;
}

type VpicMake = { Make_Name: string };
async function fetchVpicMakes(): Promise<string[]> {
  console.log(`[vpic]  GET ${VPIC_URL}`);
  const res = await fetch(VPIC_URL);
  if (!res.ok) throw new Error(`vPIC fetch failed: ${res.status}`);
  const json = (await res.json()) as { Results: VpicMake[] };
  const names = json.Results.map((m) => m.Make_Name.trim().toUpperCase()).filter(
    (n) => n.length > 0,
  );
  const unique = [...new Set(names)].sort();
  console.log(`[vpic]  got ${unique.length} makes`);
  return unique;
}

function buildFromAdeme(rows: AdemeRow[]): Map<string, Make> {
  const makes = new Map<string, Make>();

  for (const row of rows) {
    const makeName = (row['Marque'] ?? '').trim().toUpperCase();
    const modelName = (row['Modèle'] ?? row['Libellé modèle'] ?? '').trim().toUpperCase();
    if (!makeName || !modelName) continue;

    const fiscalCv = parseFrInt(row['Puissance fiscale']);
    if (fiscalCv === null) continue; // no CV fiscaux = unusable for our calc

    // ADEME "Essai CO2 type 1" is a normalized ratio, NOT g/km. The real
    // WLTP mixed-cycle CO2 lives in "CO2 vitesse mixte {Min,Max}" (g/km).
    // We prefer the average of min/max, falling back to either bound.
    const co2Min = parseFrNumber(row['CO2 vitesse mixte Min']);
    const co2Max = parseFrNumber(row['CO2 vitesse mixte Max']);
    let co2Avg: number | null = null;
    if (co2Min !== null && co2Max !== null) {
      co2Avg = Math.round((co2Min + co2Max) / 2);
    } else if (co2Max !== null) {
      co2Avg = Math.round(co2Max);
    } else if (co2Min !== null) {
      co2Avg = Math.round(co2Min);
    }
    const weightMax = parseFrInt(row['Masse OM Max']);
    const weightMin = parseFrInt(row['Masse OM Min']);
    const weightKg = weightMax ?? weightMin ?? parseFrInt(row['Poids à vide']);
    const powerKw = parseFrNumber(row['Puissance maximale']);
    const displacementCc = parseFrInt(row['Cylindrée']);
    const energy = mapEnergy(row['Energie'] ?? '');
    const bodyType = (row['Carrosserie'] ?? '').trim() || null;
    const description = (row['Description Commerciale'] ?? '').trim();
    const label = description || `${modelName} ${fiscalCv}CV`;

    const trim: Trim = {
      id: slugify(`${makeName}-${modelName}-${label}-${energy}-${fiscalCv}`),
      label,
      energy,
      fiscalCv,
      co2GPerKm: co2Avg,
      weightKg,
      powerKw,
      displacementCc,
      bodyType,
    };

    let make = makes.get(makeName);
    if (!make) {
      make = { name: makeName, models: [], sources: ['ademe'] };
      makes.set(makeName, make);
    }
    let model = make.models.find((m: Model) => m.name === modelName);
    if (!model) {
      model = { name: modelName, trims: [] };
      make.models.push(model);
    }
    // dedupe trims by id
    if (!model.trims.some((t: Trim) => t.id === trim.id)) {
      model.trims.push(trim);
    }
  }

  return makes;
}

/**
 * vPIC lists ~12k makes (US truck makers, trailers, heavy equipment, etc.).
 * For a French carte-grise calculator only European-relevant car makes matter,
 * so we allowlist brands that are (a) missing from ADEME but (b) plausibly
 * registered in France. This keeps the catalog UI usable.
 */
const VPIC_ALLOWLIST = new Set<string>([
  'SEAT',
  'JAGUAR',
  'MERCEDES-BENZ',
  'SMART',
  'BENTLEY',
  'ASTON MARTIN',
  'LOTUS',
  'MCLAREN',
  'BUGATTI',
  'PAGANI',
  'KOENIGSEGG',
  'POLESTAR',
  'LUCID',
  'RIVIAN',
  'BYD',
  'NIO',
  'XPENG',
  'LEAPMOTOR',
  'ZEEKR',
  'HONGQI',
  'AIWAYS',
  'MAXUS',
  'SSANGYONG',
  'KGM',
  'GENESIS',
  'INEOS',
]);

function mergeVpic(makes: Map<string, Make>, vpicMakes: string[]): number {
  let added = 0;
  for (const rawName of vpicMakes) {
    const name = rawName.trim().toUpperCase();
    if (!VPIC_ALLOWLIST.has(name)) continue;
    if (!makes.has(name)) {
      makes.set(name, { name, models: [], sources: ['vpic'] });
      added++;
    } else {
      const existing = makes.get(name);
      if (existing && !existing.sources.includes('vpic')) {
        existing.sources.push('vpic');
      }
    }
  }
  return added;
}

async function main(): Promise<void> {
  const [ademeRows, vpicMakes] = await Promise.all([fetchAdemeCsv(), fetchVpicMakes()]);

  const makes = buildFromAdeme(ademeRows);
  console.log(`[merge] ADEME gave ${makes.size} makes before vPIC`);
  const added = mergeVpic(makes, vpicMakes);
  console.log(`[merge] vPIC added ${added} makes from allowlist; total makes: ${makes.size}`);

  // Sort: makes alpha, models alpha, trims by fiscalCv asc then label
  const sortedMakes: Make[] = [...makes.values()]
    .sort((a: Make, b: Make) => a.name.localeCompare(b.name))
    .map((m: Make) => ({
      ...m,
      models: [...m.models]
        .sort((a: Model, b: Model) => a.name.localeCompare(b.name))
        .map((mo: Model) => ({
          ...mo,
          trims: [...mo.trims].sort((a: Trim, b: Trim) => {
            if (a.fiscalCv !== b.fiscalCv) return a.fiscalCv - b.fiscalCv;
            return a.label.localeCompare(b.label);
          }),
        })),
    }));

  const catalog: Catalog = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    sources: {
      ademe: { url: ADEME_URL, rows: ademeRows.length },
      vpic: { url: VPIC_URL, makes: vpicMakes.length },
    },
    makes: sortedMakes,
  };

  // Validate before writing
  CatalogSchema.parse(catalog);

  const out = resolve(__dirname, '../data/catalog.json');
  writeFileSync(out, JSON.stringify(catalog, null, 2) + '\n', 'utf8');
  const trimCount = sortedMakes.reduce(
    (acc: number, m: Make) =>
      acc + m.models.reduce((a: number, mo: Model) => a + mo.trims.length, 0),
    0,
  );
  const modelCount = sortedMakes.reduce((acc: number, m: Make) => acc + m.models.length, 0);
  console.log(
    `[done] wrote ${out}  (${sortedMakes.length} makes, ${modelCount} models, ${trimCount} trims)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

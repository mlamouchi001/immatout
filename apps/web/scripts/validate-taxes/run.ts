/**
 * Runs the 100-case dataset against (1) the production immatout API and
 * (2) the independent reference calculator, then writes a markdown report
 * comparing the two.
 *
 * Usage:
 *   pnpm tsx scripts/validate-taxes/run.ts                   # prod API
 *   pnpm tsx scripts/validate-taxes/run.ts http://localhost:3000
 *
 * The report goes to scripts/validate-taxes/report.md.
 */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { DATASET, type TestCase } from './dataset';
import { referenceCalculate, type ReferenceBreakdown } from './reference';

const API_BASE = process.argv[2] ?? 'https://immatcalc.fr';
const TOLERANCE_CENTS = 100; // 1 € — expected variance on rounding / ref-implementation simplifications

interface ImmatoutResponse {
  totalCents: number;
  taxes: {
    Y1_regionale: { amountCents: number; detail: string };
    Y2_formation: { amountCents: number; detail: string };
    Y3_malusCO2: { amountCents: number; detail: string };
    Y4_gestion: { amountCents: number; detail: string };
    Y5_acheminement: { amountCents: number; detail: string };
    Y6_malusPoids: { amountCents: number; detail: string };
  };
  applied: { exonerations: string[]; decote10ans: boolean; malusGlobalCapReached: boolean };
}

async function callImmatout(testCase: TestCase): Promise<ImmatoutResponse> {
  const res = await fetch(`${API_BASE}/api/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testCase.ctx),
  });
  if (!res.ok) {
    throw new Error(`[${testCase.id}] HTTP ${res.status}: ${await res.text()}`);
  }
  return (await res.json()) as ImmatoutResponse;
}

type TaxKey = 'Y1' | 'Y2' | 'Y3' | 'Y4' | 'Y5' | 'Y6';

interface TaxDiff {
  key: TaxKey;
  immatout: number;
  reference: number;
  deltaCents: number;
  within: boolean;
}

interface CaseResult {
  id: string;
  label: string;
  notes?: string;
  immatoutTotal: number;
  referenceTotal: number;
  deltaTotal: number;
  totalMatch: boolean;
  taxDiffs: TaxDiff[];
  error?: string;
}

function diffCase(
  testCase: TestCase,
  immatout: ImmatoutResponse,
  reference: ReferenceBreakdown,
): CaseResult {
  const map: Array<[TaxKey, number, number]> = [
    ['Y1', immatout.taxes.Y1_regionale.amountCents, reference.taxes.Y1.amountCents],
    ['Y2', immatout.taxes.Y2_formation.amountCents, reference.taxes.Y2.amountCents],
    ['Y3', immatout.taxes.Y3_malusCO2.amountCents, reference.taxes.Y3.amountCents],
    ['Y4', immatout.taxes.Y4_gestion.amountCents, reference.taxes.Y4.amountCents],
    ['Y5', immatout.taxes.Y5_acheminement.amountCents, reference.taxes.Y5.amountCents],
    ['Y6', immatout.taxes.Y6_malusPoids.amountCents, reference.taxes.Y6.amountCents],
  ];
  const taxDiffs = map.map(([key, a, b]) => {
    const delta = a - b;
    return {
      key,
      immatout: a,
      reference: b,
      deltaCents: delta,
      within: Math.abs(delta) <= TOLERANCE_CENTS,
    };
  });
  const deltaTotal = immatout.totalCents - reference.totalCents;

  const result: CaseResult = {
    id: testCase.id,
    label: testCase.label,
    immatoutTotal: immatout.totalCents,
    referenceTotal: reference.totalCents,
    deltaTotal,
    totalMatch: Math.abs(deltaTotal) <= TOLERANCE_CENTS,
    taxDiffs,
  };
  if (testCase.notes) result.notes = testCase.notes;
  return result;
}

function fmtEur(cents: number): string {
  return `${(cents / 100).toFixed(2)} €`;
}

function renderReport(results: CaseResult[]): string {
  const okCount = results.filter((r) => r.totalMatch && !r.error).length;
  const errCount = results.filter((r) => r.error).length;
  const mismatch = results.filter((r) => !r.totalMatch && !r.error);
  const byTax = { Y1: 0, Y2: 0, Y3: 0, Y4: 0, Y5: 0, Y6: 0 };
  for (const r of results) {
    for (const d of r.taxDiffs) {
      if (!d.within) byTax[d.key]++;
    }
  }

  const lines: string[] = [];
  lines.push('# Immatout — Rapport de validation des calculs');
  lines.push('');
  lines.push(`- **API testée** : ${API_BASE}`);
  lines.push(`- **Date du run** : ${new Date().toISOString()}`);
  lines.push(`- **Cas testés** : ${results.length}`);
  lines.push(
    `- **Tolérance** : ±${TOLERANCE_CENTS / 100} € (arrondis & simplifications du référentiel)`,
  );
  lines.push('');
  lines.push('## Synthèse');
  lines.push('');
  lines.push(`| Indicateur | Valeur |`);
  lines.push(`|---|---|`);
  lines.push(
    `| ✅ Total conforme | ${okCount} / ${results.length} (${((okCount / results.length) * 100).toFixed(1)} %) |`,
  );
  lines.push(`| ❌ Écarts de total | ${mismatch.length} |`);
  lines.push(`| 🔥 Erreurs HTTP | ${errCount} |`);
  for (const k of ['Y1', 'Y2', 'Y3', 'Y4', 'Y5', 'Y6'] as TaxKey[]) {
    lines.push(`| Cases avec écart ${k} | ${byTax[k]} |`);
  }
  lines.push('');

  if (mismatch.length > 0) {
    lines.push('## Divergences');
    lines.push('');
    lines.push("Cases où l'API et le référentiel s'écartent de plus de 1 €.");
    lines.push('');
    lines.push('| ID | Cas | Immatout | Référence | Δ total | Taxes divergentes |');
    lines.push('|---|---|---:|---:|---:|---|');
    for (const r of mismatch.slice(0, 50)) {
      const diverging = r.taxDiffs
        .filter((d) => !d.within)
        .map((d) => `${d.key}: ${(d.deltaCents / 100).toFixed(2)}€`)
        .join(', ');
      lines.push(
        `| ${r.id} | ${r.label} | ${fmtEur(r.immatoutTotal)} | ${fmtEur(r.referenceTotal)} | ${r.deltaTotal >= 0 ? '+' : ''}${fmtEur(r.deltaTotal)} | ${diverging} |`,
      );
    }
    lines.push('');
  }

  if (errCount > 0) {
    lines.push('## Erreurs HTTP');
    lines.push('');
    for (const r of results.filter((r) => r.error)) {
      lines.push(`- **${r.id}** — ${r.label}: ${r.error}`);
    }
    lines.push('');
  }

  lines.push('## Détail par cas');
  lines.push('');
  for (const r of results) {
    if (r.error) {
      lines.push(`### ❌ ${r.id} — ${r.label}`);
      lines.push('');
      lines.push('```');
      lines.push(r.error);
      lines.push('```');
      lines.push('');
      continue;
    }
    const badge = r.totalMatch ? '✅' : '⚠️';
    lines.push(`### ${badge} ${r.id} — ${r.label}`);
    if (r.notes) lines.push(`> ${r.notes}`);
    lines.push('');
    lines.push('| Taxe | Immatout | Référence | Écart |');
    lines.push('|---|---:|---:|---:|');
    for (const d of r.taxDiffs) {
      const mark = d.within ? '' : ' ⚠️';
      lines.push(
        `| ${d.key} | ${fmtEur(d.immatout)} | ${fmtEur(d.reference)} | ${d.deltaCents >= 0 ? '+' : ''}${fmtEur(d.deltaCents)}${mark} |`,
      );
    }
    lines.push(
      `| **Total** | **${fmtEur(r.immatoutTotal)}** | **${fmtEur(r.referenceTotal)}** | **${r.deltaTotal >= 0 ? '+' : ''}${fmtEur(r.deltaTotal)}** |`,
    );
    lines.push('');
  }
  return lines.join('\n');
}

async function main() {
  console.log(`[validate] running ${DATASET.length} cases against ${API_BASE}`);
  const results: CaseResult[] = [];
  for (let i = 0; i < DATASET.length; i++) {
    const tc = DATASET[i]!;
    try {
      const [immatout, reference] = await Promise.all([
        callImmatout(tc),
        Promise.resolve(referenceCalculate(tc.ctx)),
      ]);
      const r = diffCase(tc, immatout, reference);
      results.push(r);
      const mark = r.totalMatch ? '✓' : '⚠';
      process.stdout.write(
        `  [${i + 1}/${DATASET.length}] ${mark} ${tc.id} · immatout=${fmtEur(r.immatoutTotal)} · ref=${fmtEur(r.referenceTotal)} · Δ=${r.deltaTotal >= 0 ? '+' : ''}${fmtEur(r.deltaTotal)}\n`,
      );
    } catch (err) {
      const msg = (err as Error).message;
      const fallback: CaseResult = {
        id: tc.id,
        label: tc.label,
        immatoutTotal: 0,
        referenceTotal: 0,
        deltaTotal: 0,
        totalMatch: false,
        taxDiffs: [],
        error: msg,
      };
      if (tc.notes) fallback.notes = tc.notes;
      results.push(fallback);
      process.stdout.write(`  [${i + 1}/${DATASET.length}] ✗ ${tc.id} ERROR: ${msg}\n`);
    }
  }

  const md = renderReport(results);
  const out = resolve(__dirname, 'report.md');
  writeFileSync(out, md, 'utf8');
  const ok = results.filter((r) => r.totalMatch && !r.error).length;
  console.log(
    `\n[done] ${ok}/${results.length} cases match (tolerance ±${TOLERANCE_CENTS / 100}€)`,
  );
  console.log(`[done] report written to ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

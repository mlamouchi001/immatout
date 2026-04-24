/**
 * Reference calculator — deliberately independent from @immatout/calc.
 *
 * Re-implements the French vehicle-registration tax formulas straight from
 * the CIBS articles (L.421-29 to L.421-92) and the published 2026 reference
 * scales, relying only on the *data* JSON files (public barèmes) — not on
 * any logic already shipped in the calc package.
 *
 * This second, naive implementation serves as an oracle: any divergence
 * between immatout's production API and this function is a bug worth
 * investigating (either here or there).
 *
 * Revision 2: now reads the 12-tier decote grid from the data package,
 * applies Y3 exo on CMI-invalidité, and skips Y3/Y6 entirely on non-VP
 * genres (matching CIBS and immatout's behaviour).
 */
import {
  getRegionsScale,
  getCo2MalusScale,
  getCo2MalusScaleOrClosest,
  getWeightMalusScale,
  getDecoteGrid,
} from '@immatout/data';
import type { CalculationContext, EnergyType } from '@immatout/calc';

export interface ReferenceTax {
  amountCents: number;
  reason: string;
}

export interface ReferenceBreakdown {
  totalCents: number;
  taxes: {
    Y1: ReferenceTax;
    Y2: ReferenceTax;
    Y3: ReferenceTax;
    Y4: ReferenceTax;
    Y5: ReferenceTax;
    Y6: ReferenceTax;
  };
  evExonerated: boolean;
  tenYearDecote: boolean;
  capReached: boolean;
}

const Y4_FIXED_EUROS = 11;
const Y5_DELIVERY_EUROS = 2.76;

function yearOf(iso: string): number {
  return new Date(iso).getUTCFullYear();
}

function monthsBetween(from: string, to: string): number {
  const a = new Date(from);
  const b = new Date(to);
  if (b <= a) return 0;
  const years = b.getUTCFullYear() - a.getUTCFullYear();
  const months = b.getUTCMonth() - a.getUTCMonth();
  let total = years * 12 + months;
  if (b.getUTCDate() < a.getUTCDate()) total -= 1;
  return Math.max(0, total);
}

function isEv(energy: EnergyType): boolean {
  return energy === 'ELECTRIC' || energy === 'HYDROGEN';
}

function isUtilityGenre(genre: CalculationContext['vehicle']['genre']): boolean {
  return genre === 'VU' || genre === 'CTTE' || genre === 'CAM' || genre === 'TRR';
}

/**
 * Decote coefficient (0..1) from the unified 12-tier grid published in
 * packages/data/scales/decote-coefficients.json.
 * Returns the fraction to *abate*, so final amount = base × (1 − coef).
 */
function importDecoteCoefficient(ageMonths: number): number {
  if (ageMonths < 1) return 0;
  const grid = getDecoteGrid();
  if (ageMonths >= grid.fullExonerationAtMonths) return 1;
  for (const tier of grid.tiers) {
    const toMonths = tier.toMonths ?? Number.POSITIVE_INFINITY;
    if (ageMonths >= tier.fromMonths && ageMonths < toMonths) return tier.coefficient;
  }
  return 0;
}

// ---------------------------------------------------------------------------
// Y1 — taxe régionale (CIBS L.421-41 à L.421-54-1)
// ---------------------------------------------------------------------------

function computeY1(ctx: CalculationContext): ReferenceTax {
  const { vehicle, region, registrationDate, household } = ctx;
  if (isEv(vehicle.energy)) return { amountCents: 0, reason: 'EV/H2 exo Y1' };
  if (household.hasDisabilityCard) return { amountCents: 0, reason: 'CMI-invalidité exo Y1' };

  const scale = getRegionsScale(yearOf(registrationDate));
  const regionRow = scale.regions.find((r) => r.regionCode === region);
  if (!regionRow) throw new Error(`Region ${region} not found`);

  const coef = regionRow.energyCoefficients[vehicle.energy] ?? 1;
  let perCv = regionRow.perCvRateEuros * coef;

  // 10-year-old décote on Y1 — applies to FR_USED regardless of origin-at-purchase,
  // and also to imported used vehicles per art. L.421-48.
  const months = monthsBetween(vehicle.firstRegistrationDate, registrationDate);
  const tenYearDecote = months >= 120;
  if (
    tenYearDecote &&
    (ctx.vehicleCase === 'FR_USED' ||
      ctx.vehicleCase === 'IMPORT_EU_USED' ||
      ctx.vehicleCase === 'IMPORT_NON_EU_USED')
  ) {
    perCv *= 0.5;
  }

  const base = vehicle.fiscalHorsepower * perCv;

  let idfm = 0;
  if (region === 'IDF' && !isEv(vehicle.energy)) {
    const startsAt = scale.idfmSurchargeStartsAt ?? '2026-03-01';
    if (registrationDate >= startsAt) {
      idfm = vehicle.fiscalHorsepower * (scale.idfmSurchargeEurosPerCv ?? 14);
    }
  }

  const totalEuros = base + idfm;
  return {
    amountCents: Math.round(totalEuros * 100),
    reason: `${vehicle.fiscalHorsepower}CV × ${regionRow.perCvRateEuros}€ × coef ${coef}${
      tenYearDecote && ctx.vehicleCase !== 'FR_NEW' ? ' × 0.5 (>10ans)' : ''
    }${idfm > 0 ? ` + ${idfm}€ IDFM` : ''}`,
  };
}

// ---------------------------------------------------------------------------
// Y2 — taxe formation professionnelle (CIBS L.421-55 à L.421-57)
// Fixed amounts by PTAC tier:
//   TRR                         : 305 €
//   CAM/CTTE/VU ≤ 3.5 t         : 34 €
//   3.5 t < PTAC ≤ 6 t          : 127 €
//   PTAC > 6 t                  : 189 €
// ---------------------------------------------------------------------------

function computeY2(ctx: CalculationContext): ReferenceTax {
  const { genre, totalAuthorizedLadenMassKg: ptac } = ctx.vehicle;
  if (genre === 'TRR') return { amountCents: 30500, reason: '305 € (tracteur routier)' };
  if (!isUtilityGenre(genre)) {
    return { amountCents: 0, reason: 'non applicable (non utilitaire)' };
  }
  if (ptac === undefined) {
    return { amountCents: 0, reason: 'PTAC manquant, Y2 non calculable' };
  }
  if (ptac > 6000) return { amountCents: 18900, reason: `189 € (PTAC ${ptac} kg > 6 t)` };
  if (ptac > 3500) return { amountCents: 12700, reason: `127 € (3,5 t < PTAC ≤ 6 t)` };
  return { amountCents: 3400, reason: `34 € (PTAC ${ptac} kg ≤ 3,5 t)` };
}

// ---------------------------------------------------------------------------
// Y3 — malus CO₂ (CIBS L.421-58 à L.421-70)
// ---------------------------------------------------------------------------

function lookupCo2Malus(co2: number, year: number, allowFallback: boolean): number {
  const scale = allowFallback ? getCo2MalusScaleOrClosest(year) : getCo2MalusScale(year);
  const grid = scale.grid;
  if (!grid.length) return 0;
  const first = grid[0]!;
  const last = grid[grid.length - 1]!;
  if (co2 < first.co2GPerKm) return 0;
  if (co2 >= last.co2GPerKm) return Math.min(last.amountEuros, scale.globalMalusCapEuros);
  // Exact row match or previous row (step function).
  let amount = first.amountEuros;
  for (const row of grid) {
    if (row.co2GPerKm > co2) break;
    amount = row.amountEuros;
  }
  return Math.min(amount, scale.globalMalusCapEuros);
}

function computeY3(ctx: CalculationContext): ReferenceTax {
  const { vehicle, registrationDate, household, vehicleCase } = ctx;

  // Y3 only applies to passenger vehicles (VP) per CIBS L.421-58.
  if (vehicle.genre !== 'VP') {
    return { amountCents: 0, reason: `genre ${vehicle.genre} non éligible Y3` };
  }
  if (isEv(vehicle.energy)) return { amountCents: 0, reason: 'EV/H2 exo Y3' };
  if (household.hasDisabilityCard) return { amountCents: 0, reason: 'CMI-invalidité exo Y3' };
  if (vehicleCase === 'FR_USED') {
    return { amountCents: 0, reason: 'FR_USED: Y3 déjà acquitté' };
  }

  const isImportUsed = vehicleCase === 'IMPORT_EU_USED' || vehicleCase === 'IMPORT_NON_EU_USED';
  const scaleYear = yearOf(isImportUsed ? vehicle.firstRegistrationDate : registrationDate);
  const baseEuros = lookupCo2Malus(vehicle.co2WltpGPerKm, scaleYear, isImportUsed);

  if (
    vehicleCase === 'FR_NEW' ||
    vehicleCase === 'IMPORT_EU_NEW' ||
    vehicleCase === 'IMPORT_NON_EU_NEW'
  ) {
    return {
      amountCents: Math.round(baseEuros * 100),
      reason: `grille ${scaleYear} ${vehicle.co2WltpGPerKm}g/km → ${baseEuros}€`,
    };
  }

  // IMPORT_EU_USED / IMPORT_NON_EU_USED → official 12-tier decote.
  const months = monthsBetween(vehicle.firstRegistrationDate, registrationDate);
  const coef = importDecoteCoefficient(months);
  const amount = Math.round(baseEuros * (1 - coef));
  return {
    amountCents: Math.round(amount * 100),
    reason: `${baseEuros}€ × (1 − ${coef}) [décote ${months}m] = ${amount}€`,
  };
}

// ---------------------------------------------------------------------------
// Y4, Y5 — forfaits
// ---------------------------------------------------------------------------

function computeY4(): ReferenceTax {
  return { amountCents: Math.round(Y4_FIXED_EUROS * 100), reason: 'forfait 11€' };
}

function computeY5(): ReferenceTax {
  return { amountCents: Math.round(Y5_DELIVERY_EUROS * 100), reason: 'forfait 2,76€' };
}

// ---------------------------------------------------------------------------
// Y6 — malus au poids (CIBS L.421-71 à L.421-81-1)
// ---------------------------------------------------------------------------

function computeY6(ctx: CalculationContext): ReferenceTax {
  const { vehicle, registrationDate, household, vehicleCase } = ctx;

  // Y6 only applies to passenger vehicles (VP).
  if (vehicle.genre !== 'VP') {
    return { amountCents: 0, reason: `genre ${vehicle.genre} non éligible Y6` };
  }
  if (isEv(vehicle.energy)) return { amountCents: 0, reason: 'EV/H2 exo Y6' };
  if (household.hasDisabilityCard) return { amountCents: 0, reason: 'CMI-invalidité exo Y6' };
  if (vehicleCase === 'FR_USED') return { amountCents: 0, reason: 'FR_USED: Y6 déjà acquitté' };

  const scale = getWeightMalusScale(yearOf(registrationDate));
  const trigger = scale.triggerKg;

  let abatement = 0;
  if (vehicle.energy === 'HYBRID') abatement += scale.abatements.hybridKg;
  if (vehicle.energy === 'PHEV') abatement += scale.abatements.phevKg;
  if (vehicle.seats && vehicle.seats >= 8) {
    abatement += household.isLegalEntity
      ? scale.abatements.eightSeatsLegalEntityKg
      : scale.abatements.eightSeatsIndividualKg;
  }
  if (household.dependentChildren >= scale.abatements.familyMinChildren) {
    abatement += scale.abatements.perChildKg * household.dependentChildren;
  }

  const taxableMass = vehicle.massInRunningOrderKg - abatement;
  if (taxableMass <= trigger) {
    return { amountCents: 0, reason: `masse taxable ${taxableMass}kg ≤ seuil ${trigger}kg` };
  }

  let euros = 0;
  const parts: string[] = [];
  for (const tr of scale.tranches) {
    const from = tr.fromKg;
    const to = tr.toKg ?? Infinity;
    if (taxableMass <= from) break;
    const slice = Math.min(taxableMass, to) - from;
    if (slice > 0) {
      euros += slice * tr.ratePerKgEuros;
      parts.push(`${slice}kg @ ${tr.ratePerKgEuros}€`);
    }
  }

  // Apply import-used decote on Y6 (unified grid).
  if (vehicleCase === 'IMPORT_EU_USED' || vehicleCase === 'IMPORT_NON_EU_USED') {
    const months = monthsBetween(vehicle.firstRegistrationDate, registrationDate);
    const coef = importDecoteCoefficient(months);
    euros = Math.round(euros * (1 - coef));
    parts.push(`× (1 − ${coef}) décote ${months}m`);
  }

  return { amountCents: Math.round(euros * 100), reason: parts.join(' + ') || '—' };
}

// ---------------------------------------------------------------------------
// Orchestrator with Y3+Y6 cap
// ---------------------------------------------------------------------------

export function referenceCalculate(ctx: CalculationContext): ReferenceBreakdown {
  const scale = getCo2MalusScale(yearOf(ctx.registrationDate));
  const capEuros = scale.globalMalusCapEuros;
  const capCents = capEuros * 100;

  const y1 = computeY1(ctx);
  const y2 = computeY2(ctx);
  let y3 = computeY3(ctx);
  const y4 = computeY4();
  const y5 = computeY5();
  let y6 = computeY6(ctx);

  let capReached = false;
  if (y3.amountCents + y6.amountCents > capCents) {
    capReached = true;
    if (y3.amountCents >= capCents) {
      y3 = { ...y3, amountCents: capCents, reason: `${y3.reason} · plafonné à ${capEuros}€` };
      y6 = { ...y6, amountCents: 0, reason: `${y6.reason} · plafond global` };
    } else {
      y6 = {
        ...y6,
        amountCents: capCents - y3.amountCents,
        reason: `${y6.reason} · plafond global`,
      };
    }
  }

  const months = monthsBetween(ctx.vehicle.firstRegistrationDate, ctx.registrationDate);
  return {
    totalCents:
      y1.amountCents +
      y2.amountCents +
      y3.amountCents +
      y4.amountCents +
      y5.amountCents +
      y6.amountCents,
    taxes: { Y1: y1, Y2: y2, Y3: y3, Y4: y4, Y5: y5, Y6: y6 },
    evExonerated: isEv(ctx.vehicle.energy),
    tenYearDecote: months >= 120,
    capReached,
  };
}

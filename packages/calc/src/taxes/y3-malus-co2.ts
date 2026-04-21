/**
 * Y3 — Malus écologique CO₂ (taxe sur les émissions de dioxyde de carbone).
 *
 * Legal basis: CIBS articles L.421-58 à L.421-70 + Loi de Finances 2026.
 *
 * Three distinct cases:
 *
 *   Y3.A — Véhicule neuf immatriculé en France en 2026 (FR_NEW, IMPORT_EU_NEW,
 *           IMPORT_NON_EU_NEW)
 *     → Full malus based on 2026 WLTP grid (108 g → 50 €, ..., 192 g+ → 80 000 €).
 *
 *   Y3.B — Véhicule d'occasion importé depuis 2025-03-01 (IMPORT_EU_USED,
 *           IMPORT_NON_EU_USED)
 *     → malus_from(year_of_first_registration) × (1 − coef_décote).
 *     → Applies to vehicles < 15 years (≥ 15 ans = full exoneration).
 *
 *   Y3.C — FR_USED: no Y3 on a normal ownership transfer. Only the rare
 *           retroactive case (requalification N1→M1 post-2015) would apply;
 *           out of scope for v1.
 *
 * Exonérations totales : EV 100 %, H2, CMI-invalidité.
 *
 * Applies to VP only.
 *
 * The global Y3+Y6 cap (80 000 € in 2026) is applied by the orchestrator.
 */

import { getCo2MalusScale, getCo2MalusScaleOrClosest } from '@immatout/data';

import { getImportDecoteCoefficient, monthsBetween } from '../abatements/age-decote';
import { determineExonerations } from '../abatements/exonerations';
import type { CalculationContext, Y3MalusCo2 } from '../types';

const IMPORT_USED_CASES = new Set(['IMPORT_EU_USED', 'IMPORT_NON_EU_USED']);
const NEW_CASES = new Set(['FR_NEW', 'IMPORT_EU_NEW', 'IMPORT_NON_EU_NEW']);

/**
 * Picks the reference scale year:
 *   - new vehicles (case NEW_*): current registrationDate year
 *   - imported used: year of first registration abroad
 *   - FR_USED: not applicable
 */
function pickScaleYear(ctx: CalculationContext): number {
  if (IMPORT_USED_CASES.has(ctx.vehicleCase)) {
    return new Date(ctx.vehicle.firstRegistrationDate).getUTCFullYear();
  }
  return new Date(ctx.registrationDate).getUTCFullYear();
}

function lookupBaseMalusCents(year: number, co2: number, allowFallback: boolean): number {
  const scale = allowFallback ? getCo2MalusScaleOrClosest(year) : getCo2MalusScale(year);
  const rounded = Math.round(co2);
  if (rounded < scale.grid[0]!.co2GPerKm) return 0;

  // Find highest grid entry ≤ co2.
  let amountEuros = 0;
  for (const tier of scale.grid) {
    if (tier.co2GPerKm <= rounded) amountEuros = tier.amountEuros;
    else break;
  }

  // Cap at the global cap (80 000 € in 2026) for values above the top of grid.
  amountEuros = Math.min(amountEuros, scale.globalMalusCapEuros);
  return amountEuros * 100;
}

export function computeY3MalusCo2(ctx: CalculationContext): Y3MalusCo2 {
  const legalRef = 'CIBS L.421-58 à L.421-70';

  if (ctx.vehicle.genre !== 'VP') {
    return {
      amountCents: 0,
      applicable: false,
      detail: `Malus CO₂ : non applicable (genre ${ctx.vehicle.genre})`,
      legalRef,
      baseAmountCents: 0,
      decoteCoefficient: 0,
      scaleYear: 0,
      ageMonths: 0,
    };
  }

  const exo = determineExonerations(ctx);
  if (exo.y3) {
    return {
      amountCents: 0,
      applicable: false,
      detail: `Malus CO₂ : exonéré (${exo.reasons.join(', ')})`,
      legalRef,
      baseAmountCents: 0,
      decoteCoefficient: 0,
      scaleYear: 0,
      ageMonths: 0,
    };
  }

  if (ctx.vehicleCase === 'FR_USED') {
    return {
      amountCents: 0,
      applicable: false,
      detail: "Malus CO₂ : non applicable (véhicule d'occasion française déjà immatriculé)",
      legalRef,
      baseAmountCents: 0,
      decoteCoefficient: 0,
      scaleYear: 0,
      ageMonths: 0,
    };
  }

  const scaleYear = pickScaleYear(ctx);
  const allowFallback = IMPORT_USED_CASES.has(ctx.vehicleCase);
  const baseAmountCents = lookupBaseMalusCents(scaleYear, ctx.vehicle.co2WltpGPerKm, allowFallback);

  if (NEW_CASES.has(ctx.vehicleCase)) {
    return {
      amountCents: baseAmountCents,
      applicable: baseAmountCents > 0,
      detail:
        baseAmountCents === 0
          ? `Malus CO₂ : 0 € (CO₂ ${ctx.vehicle.co2WltpGPerKm} g/km < seuil ${scaleYear})`
          : `Malus CO₂ : ${(baseAmountCents / 100).toLocaleString('fr-FR')} € (barème ${scaleYear}, ${ctx.vehicle.co2WltpGPerKm} g/km)`,
      legalRef,
      baseAmountCents,
      decoteCoefficient: 0,
      scaleYear,
      ageMonths: 0,
    };
  }

  // IMPORT_EU_USED or IMPORT_NON_EU_USED → apply decote.
  const ageMonths = monthsBetween(ctx.vehicle.firstRegistrationDate, ctx.registrationDate);
  const decoteCoefficient = getImportDecoteCoefficient(ageMonths);
  const amountCents = Math.round(baseAmountCents * (1 - decoteCoefficient));

  const detail =
    decoteCoefficient >= 1
      ? `Malus CO₂ : 0 € (véhicule ≥ 15 ans, exonération totale)`
      : `Malus CO₂ : barème ${scaleYear} ${ctx.vehicle.co2WltpGPerKm} g/km = ${(baseAmountCents / 100).toLocaleString('fr-FR')} € − décote ${Math.round(decoteCoefficient * 100)} % (${ageMonths} mois) = ${(amountCents / 100).toLocaleString('fr-FR')} €`;

  return {
    amountCents,
    applicable: amountCents > 0,
    detail,
    legalRef,
    baseAmountCents,
    decoteCoefficient,
    scaleYear,
    ageMonths,
  };
}

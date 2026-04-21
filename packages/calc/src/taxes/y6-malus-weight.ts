/**
 * Y6 — Taxe sur la masse en ordre de marche (TMOM — malus au poids).
 *
 * Legal basis: CIBS articles L.421-71 à L.421-81-1 + Loi de Finances 2026.
 *
 * Threshold lowered to 1500 kg on 2026-01-01 (was 1600 kg).
 *
 * Tranches 2026 (€/kg above the trigger, marginal):
 *   1500 – 1699 kg : 10 €/kg
 *   1700 – 1799 kg : 15 €/kg
 *   1800 – 1899 kg : 20 €/kg
 *   1900 – 1999 kg : 25 €/kg
 *   ≥ 2000 kg      : 30 €/kg
 *
 * Abatements on the mass (applied before the tranche computation, cumulative):
 *   - Hybride (HEV/MHEV) : −100 kg
 *   - PHEV autonomie > 50 km : −200 kg
 *   - ≥ 8 places : −500 kg (personne physique), −600 kg (personne morale, LF 2026)
 *   - Famille nombreuse (≥ 3 enfants à charge) : −200 kg par enfant
 *
 * Exonérations totales (Y6 = 0):
 *   - Véhicule 100 % électrique (LF 2026 via 49-3 : EV restent exonérés 2026-2028)
 *   - Hydrogène
 *   - CMI-invalidité
 *
 * Applies to VP only (passenger vehicles).
 *
 * The global Y3+Y6 cap (80 000 € in 2026) is applied by the orchestrator.
 *
 * For imported used vehicles, the decote coefficient is applied the same way
 * as for Y3 (barème unifié, cf. decote-coefficients.json).
 */

import { getWeightMalusScale } from '@immatout/data';

import { getImportDecoteCoefficient, monthsBetween } from '../abatements/age-decote';
import { determineExonerations } from '../abatements/exonerations';
import { toCents } from '../money';
import type { CalculationContext, Y6WeightMalus, Y6WeightTranche } from '../types';

const IMPORT_USED_CASES = new Set([
  'IMPORT_EU_USED',
  'IMPORT_NON_EU_USED',
  // FR_USED only triggers Y6 in the narrow retroactive case (requalification
  // N1→M1). That is out of scope for the v1 engine; callers must pass
  // FR_USED = no Y6, which we implement by treating it like "not new in FR".
]);

export function computeY6WeightMalus(ctx: CalculationContext): Y6WeightMalus {
  const scaleYear = new Date(ctx.registrationDate).getUTCFullYear();
  const scale = getWeightMalusScale(scaleYear);

  // Only VP are subject to Y6.
  if (ctx.vehicle.genre !== 'VP') {
    return emptyResult(`Malus au poids : non applicable (genre ${ctx.vehicle.genre})`);
  }

  const exo = determineExonerations(ctx);
  if (exo.y6) {
    return emptyResult(`Malus au poids : exonéré (${exo.reasons.join(', ')})`, exo.reasons);
  }

  // EV/H2 blanket exoneration via scale file (redundant with determineExonerations
  // but keeps the scale as the source of truth).
  if (!scale.evApplicable && ctx.vehicle.energy === 'ELECTRIC') {
    return emptyResult('Malus au poids : exonéré (véhicule 100 % électrique — LF 2026)');
  }

  // FR_USED (no requalification) is not subject to Y6 on a new registration.
  if (ctx.vehicleCase === 'FR_USED') {
    return emptyResult(
      "Malus au poids : non applicable (véhicule d'occasion française déjà immatriculé)",
    );
  }

  // Build abatement breakdown.
  const abatementBreakdown: Array<{ reason: string; kg: number }> = [];

  if (ctx.vehicle.energy === 'HYBRID') {
    abatementBreakdown.push({
      reason: 'Véhicule hybride (HEV/MHEV)',
      kg: scale.abatements.hybridKg,
    });
  } else if (ctx.vehicle.energy === 'PHEV') {
    abatementBreakdown.push({
      reason: 'Véhicule hybride rechargeable (PHEV > 50 km)',
      kg: scale.abatements.phevKg,
    });
  }

  if (ctx.vehicle.seats !== undefined && ctx.vehicle.seats >= 8) {
    const eightSeatsKg = ctx.household.isLegalEntity
      ? scale.abatements.eightSeatsLegalEntityKg
      : scale.abatements.eightSeatsIndividualKg;
    abatementBreakdown.push({
      reason: `${ctx.vehicle.seats} places (${ctx.household.isLegalEntity ? 'personne morale' : 'personne physique'})`,
      kg: eightSeatsKg,
    });
  }

  if (ctx.household.dependentChildren >= scale.abatements.familyMinChildren) {
    const kg = ctx.household.dependentChildren * scale.abatements.perChildKg;
    abatementBreakdown.push({
      reason: `Famille nombreuse : ${ctx.household.dependentChildren} enfants à charge × 200 kg`,
      kg,
    });
  }

  const abatementKg = abatementBreakdown.reduce((sum, a) => sum + a.kg, 0);
  const taxableMassKg = Math.max(0, ctx.vehicle.massInRunningOrderKg - abatementKg);

  if (taxableMassKg <= scale.triggerKg) {
    return {
      amountCents: 0,
      applicable: false,
      detail: `Malus au poids : 0 € (masse taxable ${taxableMassKg} kg ≤ seuil ${scale.triggerKg} kg)`,
      legalRef: 'CIBS L.421-71 à L.421-81-1',
      taxableMassKg,
      abatementKg,
      abatementBreakdown,
      tranches: [],
    };
  }

  const tranches: Y6WeightTranche[] = [];
  let totalCents = 0;
  for (const t of scale.tranches) {
    if (taxableMassKg <= t.fromKg) break;
    const upper = t.toKg ?? Number.POSITIVE_INFINITY;
    const kgTaxed = Math.min(taxableMassKg, upper) - t.fromKg;
    if (kgTaxed <= 0) continue;
    const ratePerKgCents = toCents(t.ratePerKgEuros);
    const subtotalCents = Math.round(kgTaxed * ratePerKgCents);
    tranches.push({
      fromKg: t.fromKg,
      toKg: upper,
      kgTaxed,
      ratePerKgCents,
      subtotalCents,
    });
    totalCents += subtotalCents;
  }

  // Decote for imported used vehicles (CIBS barème unifié).
  let decoteApplied = 0;
  if (IMPORT_USED_CASES.has(ctx.vehicleCase)) {
    const ageMonths = monthsBetween(ctx.vehicle.firstRegistrationDate, ctx.registrationDate);
    decoteApplied = getImportDecoteCoefficient(ageMonths);
    if (decoteApplied > 0) {
      totalCents = Math.round(totalCents * (1 - decoteApplied));
    }
  }

  const detailParts = [
    `masse ${ctx.vehicle.massInRunningOrderKg} kg`,
    abatementKg > 0 ? `abattement ${abatementKg} kg` : null,
    `masse taxable ${taxableMassKg} kg`,
    tranches
      .map(
        (tr) =>
          `${tr.kgTaxed} kg × ${tr.ratePerKgCents / 100} €/kg = ${(tr.subtotalCents / 100).toFixed(2)} €`,
      )
      .join(' + '),
    decoteApplied > 0 ? `décote import ${Math.round(decoteApplied * 100)} %` : null,
  ].filter((s): s is string => s !== null);

  return {
    amountCents: totalCents,
    applicable: true,
    detail: `Malus au poids : ${detailParts.join(' · ')}`,
    legalRef: 'CIBS L.421-71 à L.421-81-1',
    taxableMassKg,
    abatementKg,
    abatementBreakdown,
    tranches,
  };
}

function emptyResult(detail: string, reasons?: string[]): Y6WeightMalus {
  return {
    amountCents: 0,
    applicable: false,
    detail,
    legalRef: 'CIBS L.421-71 à L.421-81-1',
    taxableMassKg: 0,
    abatementKg: 0,
    abatementBreakdown: reasons ? reasons.map((r) => ({ reason: r, kg: 0 })) : [],
    tranches: [],
  };
}

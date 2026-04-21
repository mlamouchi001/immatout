/**
 * Y1 — Taxe régionale sur les certificats d'immatriculation.
 *
 * Legal basis: CIBS articles L.421-41 à L.421-54-1.
 *
 * Formula:
 *   Y1 = CV × perCvRate × energyCoef × ageCoef + IDFMSurcharge
 *
 *   - perCvRate: set yearly by each region (CIBS L.421-48), legal ceiling 60 €/CV.
 *   - energyCoef: 0 (EV/H2 in every region; some regions 0 on hybrid/PHEV too),
 *                 0.5 (regions applying a "décote 50 %" on clean energies),
 *                 else 1.
 *   - ageCoef: 0.5 if vehicle ≥ 10 years since first registration (field B),
 *              else 1.
 *   - IDFMSurcharge (Île-de-France only): +14 €/CV since 2026-03-01
 *     (Loi de Finances 2026, taxe additionnelle IDFM), +12 €/CV from 2027.
 *
 * The Île-de-France surcharge is a separate statutory tax on top of the
 * regional rate — it does NOT uplift the legal 60 €/CV ceiling of Y1 itself.
 */

import { getRegionsScale } from '@immatout/data';

import { isTenYearsOrOlder } from '../abatements/age-decote';
import { determineExonerations } from '../abatements/exonerations';
import { toCents } from '../money';
import type { CalculationContext, Y1Regional } from '../types';

export function computeY1Regional(ctx: CalculationContext): Y1Regional {
  const scale = getRegionsScale(new Date(ctx.registrationDate).getUTCFullYear());
  const region = scale.regions.find((r) => r.regionCode === ctx.region);
  if (!region) {
    throw new Error(`No regional scale entry for region=${ctx.region}`);
  }

  const exo = determineExonerations(ctx);
  const perCvRateCents = toCents(region.perCvRateEuros);
  const energyCoefficient = region.energyCoefficients[ctx.vehicle.energy] ?? (exo.y1 ? 0 : 1);
  const ageCoefficient = isTenYearsOrOlder(ctx.vehicle.firstRegistrationDate, ctx.registrationDate)
    ? 0.5
    : 1;

  // Base = CV × rate × energy × age. Done in cents to avoid float drift.
  const baseAmountCents = exo.y1
    ? 0
    : Math.round(
        ctx.vehicle.fiscalHorsepower * perCvRateCents * energyCoefficient * ageCoefficient,
      );

  // IDFM surcharge: applies only in Île-de-France, only from idfmSurchargeStartsAt.
  // The surcharge follows the CV count but ignores age/energy coefs per the
  // Loi de Finances 2026 (flat €/CV), and is not remitted by CMI exoneration
  // on Y1 — see note below. To be conservative we also waive it when Y1 is
  // fully exonerated, as the IDFM taxe is attached to the Y1 title.
  let idfmSurchargeCents = 0;
  if (
    ctx.region === 'IDF' &&
    new Date(ctx.registrationDate) >= new Date(scale.idfmSurchargeStartsAt) &&
    !exo.y1
  ) {
    idfmSurchargeCents = Math.round(
      ctx.vehicle.fiscalHorsepower * toCents(scale.idfmSurchargeEurosPerCv),
    );
  }

  const amountCents = baseAmountCents + idfmSurchargeCents;

  const parts: string[] = [];
  parts.push(
    `${ctx.vehicle.fiscalHorsepower} CV × ${region.perCvRateEuros.toFixed(2)} €/CV (${region.regionName})`,
  );
  if (energyCoefficient !== 1) parts.push(`coef énergie ${energyCoefficient}`);
  if (ageCoefficient !== 1) parts.push('coef âge 0.5 (véhicule ≥ 10 ans)');
  if (idfmSurchargeCents > 0) {
    parts.push(`+ surcharge IDFM ${scale.idfmSurchargeEurosPerCv} €/CV`);
  }
  if (exo.y1) parts.push(`exonéré (${exo.reasons.join(', ')})`);

  return {
    amountCents,
    applicable: !exo.y1 || idfmSurchargeCents > 0,
    detail: `Taxe régionale : ${parts.join(' · ')}`,
    legalRef: 'CIBS L.421-41 à L.421-54-1',
    baseAmountCents,
    idfmSurchargeCents,
    energyCoefficient,
    ageCoefficient,
    perCvRateCents,
  };
}

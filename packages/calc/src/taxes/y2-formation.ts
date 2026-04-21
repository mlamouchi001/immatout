/**
 * Y2 — Taxe pour le développement de la formation professionnelle des transports.
 *
 * Legal basis: CIBS articles L.421-55 à L.421-57.
 *
 * Applies to utility vehicles (VU / CTTE / tracteur routier) only.
 * VP / MOTO → Y2 = 0.
 *
 * Flat amounts (2026):
 *   - CTTE / VU ≤ 3.5 t    : 34 €
 *   - 3.5 t < PTAC ≤ 6 t   : 127 €
 *   - PTAC > 6 t           : 189 €
 *   - Tracteur routier     : 305 €
 */

import type { CalculationContext, Y2Formation } from '../types';

const PTAC_TIER_35T_KG = 3500;
const PTAC_TIER_6T_KG = 6000;

const Y2_TRR_CENTS = 30500;
const Y2_OVER_6T_CENTS = 18900;
const Y2_3T5_TO_6T_CENTS = 12700;
const Y2_UP_TO_3T5_CENTS = 3400;

export function computeY2Formation(ctx: CalculationContext): Y2Formation {
  const { genre, totalAuthorizedLadenMassKg: ptac } = ctx.vehicle;

  if (genre === 'TRR') {
    return {
      amountCents: Y2_TRR_CENTS,
      applicable: true,
      detail: 'Taxe formation professionnelle : 305 € (tracteur routier)',
      legalRef: 'CIBS L.421-55 à L.421-57',
    };
  }

  if (genre !== 'VU' && genre !== 'CTTE' && genre !== 'CAM') {
    return {
      amountCents: 0,
      applicable: false,
      detail: 'Taxe formation professionnelle : non applicable (véhicule non utilitaire)',
      legalRef: 'CIBS L.421-55 à L.421-57',
    };
  }

  if (ptac === undefined) {
    throw new Error(`PTAC (totalAuthorizedLadenMassKg) is required to compute Y2 on a ${genre}`);
  }

  if (ptac > PTAC_TIER_6T_KG) {
    return {
      amountCents: Y2_OVER_6T_CENTS,
      applicable: true,
      detail: `Taxe formation professionnelle : 189 € (PTAC ${ptac} kg > 6 t)`,
      legalRef: 'CIBS L.421-55 à L.421-57',
    };
  }
  if (ptac > PTAC_TIER_35T_KG) {
    return {
      amountCents: Y2_3T5_TO_6T_CENTS,
      applicable: true,
      detail: `Taxe formation professionnelle : 127 € (3,5 t < PTAC ${ptac} kg ≤ 6 t)`,
      legalRef: 'CIBS L.421-55 à L.421-57',
    };
  }
  return {
    amountCents: Y2_UP_TO_3T5_CENTS,
    applicable: true,
    detail: `Taxe formation professionnelle : 34 € (PTAC ${ptac} kg ≤ 3,5 t)`,
    legalRef: 'CIBS L.421-55 à L.421-57',
  };
}

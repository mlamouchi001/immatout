/**
 * Y4 — Taxe fixe de gestion.
 *
 * Legal basis: CIBS article L.421-87.
 *
 * Flat amount: 11 € (national, 2026). Always due on a new registration,
 * regardless of vehicle type, origin, or exoneration of other taxes.
 */

import type { CalculationContext, Y4Gestion } from '../types';

const Y4_AMOUNT_EUROS = 11;
const Y4_AMOUNT_CENTS = Y4_AMOUNT_EUROS * 100;

export function computeY4Gestion(_ctx: CalculationContext): Y4Gestion {
  return {
    amountCents: Y4_AMOUNT_CENTS,
    applicable: true,
    detail: `Taxe fixe de gestion : ${Y4_AMOUNT_EUROS} € (montant national forfaitaire)`,
    legalRef: 'CIBS L.421-87',
  };
}

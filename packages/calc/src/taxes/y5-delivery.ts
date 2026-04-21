/**
 * Y5 — Redevance d'acheminement du certificat d'immatriculation.
 *
 * Legal basis: arrêté d'application du CIBS.
 *
 * Flat amount: 2,76 € (national, 2026). Covers postage of the paper certificate
 * by tracked letter (lettre suivie) since 2025-01-02.
 */

import type { CalculationContext, Y5Acheminement } from '../types';

const Y5_AMOUNT_CENTS = 276;

export function computeY5Acheminement(_ctx: CalculationContext): Y5Acheminement {
  return {
    amountCents: Y5_AMOUNT_CENTS,
    applicable: true,
    detail: "Redevance d'acheminement du certificat : 2,76 €",
    legalRef: "Arrêté d'application CIBS (acheminement)",
  };
}

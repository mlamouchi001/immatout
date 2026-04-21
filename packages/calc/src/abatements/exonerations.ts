/**
 * Exoneration rules.
 *
 * Total exonerations on Y1 + Y3 + Y6:
 *   - Véhicule 100 % électrique (EV) — CIBS L.421-52, L.421-66, L.421-80
 *   - Véhicule à hydrogène — idem
 *   - Titulaire CMI-invalidité (carte mobilité inclusion mention invalidité)
 *
 * Note (LF 2026, adopted via 49-3): the earlier proposal to subject EVs to
 * the weight malus Y6 from July 2026 was withdrawn. EV + H2 remain fully
 * exonerated from Y6 for 2026, 2027, 2028.
 *
 * Y1 energy coefficient 0 for EV/H2 is also applied at the region level
 * (see regions-cv-YYYY.json). We set the boolean here as a belt-and-braces
 * check and for explicit reasoning in the audit trail.
 */

import type { CalculationContext } from '../types';

export interface ExonerationDecision {
  y1: boolean;
  y3: boolean;
  y6: boolean;
  reasons: string[];
}

export function determineExonerations(ctx: CalculationContext): ExonerationDecision {
  const reasons: string[] = [];
  let y1 = false;
  let y3 = false;
  let y6 = false;

  if (ctx.vehicle.energy === 'ELECTRIC') {
    y1 = true;
    y3 = true;
    y6 = true;
    reasons.push('Véhicule 100 % électrique');
  } else if (ctx.vehicle.energy === 'HYDROGEN') {
    y1 = true;
    y3 = true;
    y6 = true;
    reasons.push('Véhicule à hydrogène');
  }

  if (ctx.household.hasDisabilityCard) {
    y1 = true;
    y3 = true;
    y6 = true;
    reasons.push('Titulaire CMI-invalidité');
  }

  return { y1, y3, y6, reasons };
}

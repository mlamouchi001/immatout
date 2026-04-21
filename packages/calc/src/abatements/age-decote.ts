/**
 * Age-based decote helpers.
 *
 * Two distinct concepts:
 *
 *   1. Y1 age discount (CIBS L.421-48): vehicles ≥ 10 years old since field B
 *      pay half of the regional tax.
 *
 *   2. Y3/Y6 import decote: monthly decote grid applied to the malus of an
 *      imported used vehicle, loaded from packages/data/decote-coefficients.json.
 *      Grid is unified across Y3 (CO2) and Y6 (weight) per the CIBS.
 */

import { getDecoteGrid } from '@immatout/data';

/**
 * Number of whole months between two ISO-8601 dates (from → to).
 * Returns 0 if `toIsoDate` is not after `fromIsoDate`.
 *
 * Uses pure UTC math so behavior is deterministic across timezones.
 */
export function monthsBetween(fromIsoDate: string, toIsoDate: string): number {
  const from = new Date(fromIsoDate);
  const to = new Date(toIsoDate);
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
    throw new Error(`Invalid ISO date: from="${fromIsoDate}" to="${toIsoDate}"`);
  }
  if (to <= from) return 0;

  const years = to.getUTCFullYear() - from.getUTCFullYear();
  const months = to.getUTCMonth() - from.getUTCMonth();
  let total = years * 12 + months;

  if (to.getUTCDate() < from.getUTCDate()) {
    total -= 1;
  }
  return Math.max(0, total);
}

/**
 * Whole years between two ISO dates (from → to). Uses same day-of-month anchor.
 */
export function yearsBetween(fromIsoDate: string, toIsoDate: string): number {
  return Math.floor(monthsBetween(fromIsoDate, toIsoDate) / 12);
}

/**
 * Whether Y1 must be halved: vehicle reached its 10-year mark at or before the
 * new registration date (CIBS L.421-48).
 */
export function isTenYearsOrOlder(
  firstRegistrationDate: string,
  registrationDate: string,
): boolean {
  return yearsBetween(firstRegistrationDate, registrationDate) >= 10;
}

/**
 * Returns the decote coefficient (0..1) to be applied to an imported used
 * vehicle's malus. 1 means full exoneration (≥ fullExonerationAtMonths).
 *
 * The grid uses half-open intervals `[fromMonths, toMonths)`.
 * Age 0 month (just registered) → 0 decote.
 */
export function getImportDecoteCoefficient(ageMonths: number): number {
  if (ageMonths < 0) {
    throw new Error(`Invalid negative ageMonths: ${ageMonths}`);
  }
  if (ageMonths < 1) return 0;

  const grid = getDecoteGrid();
  if (ageMonths >= grid.fullExonerationAtMonths) return 1;

  for (const tier of grid.tiers) {
    const toMonths = tier.toMonths ?? Number.POSITIVE_INFINITY;
    if (ageMonths >= tier.fromMonths && ageMonths < toMonths) {
      return tier.coefficient;
    }
  }
  // Fallthrough should never happen if grid covers [1, fullExonerationAtMonths).
  throw new Error(`No decote tier matched ageMonths=${ageMonths}`);
}

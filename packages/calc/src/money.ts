/**
 * Monetary helpers. All amounts internal to the calc engine are integer cents.
 */

export const toCents = (euros: number): number => Math.round(euros * 100);

export const fromCents = (cents: number): number => cents / 100;

/**
 * Multiply an integer cent amount by a decimal coefficient, keeping integer cents.
 * Uses standard half-away-from-zero rounding.
 */
export const applyCoefficient = (cents: number, coefficient: number): number =>
  Math.round(cents * coefficient);

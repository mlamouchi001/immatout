/**
 * Plate validation.
 *
 * Two formats are accepted:
 *   - SIV (post-2009): `AA-123-BC` — two letters, three digits, two letters.
 *   - FNI (pre-2009):  `1234 ZZ 12` / `1234 ZZ 2A` with optional hyphens.
 *     Department code is 2 digits for mainland, 2-letters mix (2A/2B)
 *     for Corsica, 3 digits for overseas.
 */

const SIV_RE = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/;
// Loose-ish FNI matcher. We normalize spaces/hyphens before applying it.
const FNI_RE = /^\d{1,4}[A-Z]{1,3}(?:\d{2,3}|2A|2B)$/;

export type PlateFormat = 'SIV' | 'FNI';

export interface NormalizedPlate {
  raw: string;
  normalized: string;
  format: PlateFormat;
}

export function normalizePlate(plate: string): NormalizedPlate | null {
  const cleaned = plate.trim().toUpperCase();

  // SIV: we allow input with spaces instead of hyphens.
  const sivCandidate = cleaned.replace(/\s+/g, '-');
  if (SIV_RE.test(sivCandidate)) {
    return { raw: plate, normalized: sivCandidate, format: 'SIV' };
  }

  // FNI: strip separators and match.
  const fniCandidate = cleaned.replace(/[\s-]+/g, '');
  if (FNI_RE.test(fniCandidate)) {
    return { raw: plate, normalized: fniCandidate, format: 'FNI' };
  }

  return null;
}

/**
 * Type-safe loaders for the JSON reference grids shipped in this package.
 *
 * JSON is validated at module load through Zod, so any downstream consumer
 * (calc engine, seed script, API) can trust the shape.
 */

import regionsScale2026 from '../scales/regions-cv-2026.json';
import malusCo22024 from '../scales/malus-co2-2024.json';
import malusCo22025 from '../scales/malus-co2-2025.json';
import malusCo22026 from '../scales/malus-co2-2026.json';
import malusWeight2026 from '../scales/malus-weight-2026.json';
import decoteCoefficients from '../scales/decote-coefficients.json';
import requiredDocuments from '../scales/required-documents.json';

import {
  Co2MalusFileSchema,
  DecoteFileSchema,
  RegionsScaleFileSchema,
  RequiredDocumentsFileSchema,
  WeightMalusFileSchema,
  type Co2MalusFile,
  type DecoteFile,
  type RegionsScaleFile,
  type RequiredDocumentsFile,
  type WeightMalusFile,
} from './schemas';

const RegionsByYear: Record<number, RegionsScaleFile> = {
  2026: RegionsScaleFileSchema.parse(regionsScale2026),
};

const Co2MalusByYear: Record<number, Co2MalusFile> = {
  2024: Co2MalusFileSchema.parse(malusCo22024),
  2025: Co2MalusFileSchema.parse(malusCo22025),
  2026: Co2MalusFileSchema.parse(malusCo22026),
};

const WeightMalusByYear: Record<number, WeightMalusFile> = {
  2026: WeightMalusFileSchema.parse(malusWeight2026),
};

const DecoteGrid: DecoteFile = DecoteFileSchema.parse(decoteCoefficients);

const RequiredDocuments: RequiredDocumentsFile =
  RequiredDocumentsFileSchema.parse(requiredDocuments);

export function getRegionsScale(year: number): RegionsScaleFile {
  const scale = RegionsByYear[year];
  if (!scale) {
    throw new Error(`No regional scale loaded for year ${year}`);
  }
  return scale;
}

export function getCo2MalusScale(year: number): Co2MalusFile {
  const scale = Co2MalusByYear[year];
  if (!scale) {
    throw new Error(`No CO2 malus scale loaded for year ${year}`);
  }
  return scale;
}

/**
 * Returns the CO2 malus scale that applies to a vehicle first registered in
 * `year`. If the exact year is not loaded (Phase 3 will ingest 2020-2025),
 * falls back to the closest **earlier** year available — this matches the
 * principle "on applique le barème en vigueur à l'année de 1ʳᵉ immatriculation".
 * If none is found (year older than any loaded scale), returns the earliest
 * loaded scale and logs the fallback in the return value's source string.
 */
export function getCo2MalusScaleOrClosest(year: number): Co2MalusFile {
  if (Co2MalusByYear[year]) return Co2MalusByYear[year]!;
  const loadedYears = Object.keys(Co2MalusByYear)
    .map(Number)
    .sort((a, b) => a - b);
  const earlierOrEqual = loadedYears.filter((y) => y <= year);
  const fallbackYear = earlierOrEqual.length
    ? earlierOrEqual[earlierOrEqual.length - 1]!
    : loadedYears[0]!;
  return Co2MalusByYear[fallbackYear]!;
}

export function getWeightMalusScale(year: number): WeightMalusFile {
  const scale = WeightMalusByYear[year];
  if (!scale) {
    throw new Error(`No weight malus scale loaded for year ${year}`);
  }
  return scale;
}

export function getDecoteGrid(): DecoteFile {
  return DecoteGrid;
}

export function getRequiredDocuments(): RequiredDocumentsFile {
  return RequiredDocuments;
}

export const SUPPORTED_SCALE_YEARS = Object.keys(RegionsByYear)
  .map(Number)
  .sort((a, b) => a - b);

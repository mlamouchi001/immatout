/**
 * Type-safe loaders for the JSON reference grids shipped in this package.
 *
 * JSON is validated lazily (first call) to avoid top-level parse work that
 * can break Next.js static analysis during docker builds.
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

let _regionsByYear: Record<number, RegionsScaleFile> | null = null;
let _co2ByYear: Record<number, Co2MalusFile> | null = null;
let _weightByYear: Record<number, WeightMalusFile> | null = null;
let _decote: DecoteFile | null = null;
let _documents: RequiredDocumentsFile | null = null;

function regionsByYear(): Record<number, RegionsScaleFile> {
  if (_regionsByYear) return _regionsByYear;
  _regionsByYear = {
    2026: RegionsScaleFileSchema.parse(regionsScale2026),
  };
  return _regionsByYear;
}

function co2ByYear(): Record<number, Co2MalusFile> {
  if (_co2ByYear) return _co2ByYear;
  _co2ByYear = {
    2024: Co2MalusFileSchema.parse(malusCo22024),
    2025: Co2MalusFileSchema.parse(malusCo22025),
    2026: Co2MalusFileSchema.parse(malusCo22026),
  };
  return _co2ByYear;
}

function weightByYear(): Record<number, WeightMalusFile> {
  if (_weightByYear) return _weightByYear;
  _weightByYear = {
    2026: WeightMalusFileSchema.parse(malusWeight2026),
  };
  return _weightByYear;
}

export function getRegionsScale(year: number): RegionsScaleFile {
  const scale = regionsByYear()[year];
  if (!scale) {
    throw new Error(`No regional scale loaded for year ${year}`);
  }
  return scale;
}

export function getCo2MalusScale(year: number): Co2MalusFile {
  const scale = co2ByYear()[year];
  if (!scale) {
    throw new Error(`No CO2 malus scale loaded for year ${year}`);
  }
  return scale;
}

/**
 * Returns the CO2 malus scale that applies to a vehicle first registered in
 * `year`. If the exact year is not loaded, falls back to the closest earlier
 * year available — matches "on applique le barème en vigueur à l'année de
 * 1ʳᵉ immatriculation".
 */
export function getCo2MalusScaleOrClosest(year: number): Co2MalusFile {
  const map = co2ByYear();
  if (map[year]) return map[year]!;
  const loadedYears = Object.keys(map)
    .map(Number)
    .sort((a, b) => a - b);
  const earlierOrEqual = loadedYears.filter((y) => y <= year);
  const fallbackYear = earlierOrEqual.length
    ? earlierOrEqual[earlierOrEqual.length - 1]!
    : loadedYears[0]!;
  return map[fallbackYear]!;
}

export function getWeightMalusScale(year: number): WeightMalusFile {
  const scale = weightByYear()[year];
  if (!scale) {
    throw new Error(`No weight malus scale loaded for year ${year}`);
  }
  return scale;
}

export function getDecoteGrid(): DecoteFile {
  if (_decote) return _decote;
  _decote = DecoteFileSchema.parse(decoteCoefficients);
  return _decote;
}

export function getRequiredDocuments(): RequiredDocumentsFile {
  if (_documents) return _documents;
  _documents = RequiredDocumentsFileSchema.parse(requiredDocuments);
  return _documents;
}

export const SUPPORTED_SCALE_YEARS: readonly number[] = [2026];

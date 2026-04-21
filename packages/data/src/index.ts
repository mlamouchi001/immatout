/**
 * @immatout/data — versioned reference scales.
 *
 * This package hosts the JSON grids used by @immatout/calc:
 *   - regions-cv-YYYY.json       : regional per-CV rate table
 *   - malus-co2-YYYY.json        : CO2 malus grid (one file per year)
 *   - malus-weight-YYYY.json     : weight malus grid (one file per year)
 *   - decote-coefficients.json   : monthly decote grid for imports
 *   - required-documents.json    : service-public.gouv.fr pieces by VehicleCase
 *
 * The JSON files are produced / validated by scripts/ingestion/build_seed.py
 * and checked in for reproducibility.
 *
 * Phase 1 ships the schemas only. JSON grids are filled in Phase 3.
 */

export * from './schemas';
export * from './loaders';

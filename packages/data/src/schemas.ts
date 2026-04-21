/**
 * Runtime-validated schemas for every reference-data JSON shipped in this package.
 *
 * Using Zod gives us (a) type safety at the loader boundary, (b) a clear
 * contract for the Python ingestion scripts that produce these files.
 */

import { z } from 'zod';

// ---------------------------------------------------------------------------
// regions-cv-2026.json
// ---------------------------------------------------------------------------

export const RegionScaleEntrySchema = z.object({
  regionCode: z.string().length(3),
  regionName: z.string(),
  /** Per-CV base rate in euros (the value published by the region). */
  perCvRateEuros: z.number().min(0).max(60),
  /**
   * Energy coefficients where different from the national default (1).
   * Example: { "GPL": 0.5, "E85": 0.5, "ELECTRIC": 0, "HYDROGEN": 0 }.
   */
  energyCoefficients: z.record(z.string(), z.number().min(0).max(1)),
  /** Collection-vehicle flat rate in euros, if the region publishes one. */
  collectionFlatRateEuros: z.number().optional(),
});

export const RegionsScaleFileSchema = z.object({
  scaleYear: z.number().int(),
  publishedAt: z.string(),
  source: z.string(),
  regions: z.array(RegionScaleEntrySchema),
  /**
   * Île-de-France IDFM surcharge, in €/CV. Additive on top of the regional rate.
   * Set to 14 for 2026, 12 for 2027 (Loi de Finances 2026).
   */
  idfmSurchargeEurosPerCv: z.number().min(0),
  idfmSurchargeStartsAt: z.string(),
});

// ---------------------------------------------------------------------------
// malus-co2-YYYY.json
// ---------------------------------------------------------------------------

export const Co2MalusTierSchema = z.object({
  /** CO2 value in g/km (inclusive lower bound). */
  co2GPerKm: z.number().int().nonnegative(),
  /** Flat amount in euros applying at this exact CO2 value. */
  amountEuros: z.number().int().nonnegative(),
});

export const Co2MalusFileSchema = z.object({
  scaleYear: z.number().int(),
  source: z.string(),
  /** Cap in euros applied to Y3 + Y6 combined (global malus cap). */
  globalMalusCapEuros: z.number().int().positive(),
  /** Monotonic non-decreasing grid, value-per-gram. */
  grid: z.array(Co2MalusTierSchema),
});

// ---------------------------------------------------------------------------
// malus-weight-YYYY.json
// ---------------------------------------------------------------------------

export const WeightMalusTrancheSchema = z.object({
  fromKg: z.number().int().positive(),
  /** Exclusive upper bound or null for the last tranche. */
  toKg: z.number().int().positive().nullable(),
  ratePerKgEuros: z.number().positive(),
});

export const WeightMalusFileSchema = z.object({
  scaleYear: z.number().int(),
  source: z.string(),
  triggerKg: z.number().int().positive(),
  tranches: z.array(WeightMalusTrancheSchema),
  abatements: z.object({
    hybridKg: z.number().int().nonnegative(),
    phevKg: z.number().int().nonnegative(),
    eightSeatsIndividualKg: z.number().int().nonnegative(),
    eightSeatsLegalEntityKg: z.number().int().nonnegative(),
    perChildKg: z.number().int().nonnegative(),
    familyMinChildren: z.number().int().positive(),
  }),
  /** Whether EVs owe Y6 in this scale year. LF 2026 confirms false for 2026-2028. */
  evApplicable: z.boolean(),
});

// ---------------------------------------------------------------------------
// decote-coefficients.json
// ---------------------------------------------------------------------------

export const DecoteTierSchema = z.object({
  fromMonths: z.number().int().nonnegative(),
  /** Exclusive upper bound or null. */
  toMonths: z.number().int().positive().nullable(),
  /** 0..1 — fraction discounted from the malus base. 1 means fully exonerated. */
  coefficient: z.number().min(0).max(1),
});

export const DecoteFileSchema = z.object({
  source: z.string(),
  /** Above this age in months the import is fully exonerated (currently 180 = 15 years). */
  fullExonerationAtMonths: z.number().int().positive(),
  tiers: z.array(DecoteTierSchema),
});

// ---------------------------------------------------------------------------
// required-documents.json
// ---------------------------------------------------------------------------

export const RequiredDocumentSchema = z.object({
  id: z.string(),
  label: z.string(),
  source: z.string().url().optional(),
  notes: z.string().optional(),
});

export const RequiredDocumentsFileSchema = z.record(
  z.string(), // VehicleCase
  z.array(RequiredDocumentSchema),
);

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type RegionScaleEntry = z.infer<typeof RegionScaleEntrySchema>;
export type RegionsScaleFile = z.infer<typeof RegionsScaleFileSchema>;
export type Co2MalusFile = z.infer<typeof Co2MalusFileSchema>;
export type WeightMalusFile = z.infer<typeof WeightMalusFileSchema>;
export type DecoteFile = z.infer<typeof DecoteFileSchema>;
export type RequiredDocumentsFile = z.infer<typeof RequiredDocumentsFileSchema>;

/**
 * Zod schemas for the calc engine inputs. Shared between front and back.
 */

import { z } from 'zod';

export const VehicleGenreSchema = z.enum(['VP', 'VU', 'CTTE', 'MOTO', 'CAM', 'TRR']);

export const EnergyTypeSchema = z.enum([
  'ESSENCE',
  'DIESEL',
  'ELECTRIC',
  'HYDROGEN',
  'HYBRID',
  'PHEV',
  'GPL',
  'GNV',
  'E85',
  'OTHER',
]);

export const VehicleCaseSchema = z.enum([
  'FR_NEW',
  'FR_USED',
  'IMPORT_EU_NEW',
  'IMPORT_EU_USED',
  'IMPORT_NON_EU_NEW',
  'IMPORT_NON_EU_USED',
]);

export const RegionCodeSchema = z.enum([
  'ARA',
  'BFC',
  'BRE',
  'CVL',
  'COR',
  'GES',
  'HDF',
  'IDF',
  'NOR',
  'NAQ',
  'OCC',
  'PDL',
  'PAC',
  'GUA',
  'GUF',
  'MAR',
  'MAY',
  'REU',
]);

export const IsoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/, {
    message: 'Must be an ISO-8601 date string',
  });

export const VehicleInputSchema = z.object({
  genre: VehicleGenreSchema,
  energy: EnergyTypeSchema,
  fiscalHorsepower: z.number().int().positive().max(99),
  firstRegistrationDate: IsoDateSchema,
  co2WltpGPerKm: z.number().nonnegative().max(1000),
  massInRunningOrderKg: z.number().int().positive().max(50000),
  totalAuthorizedLadenMassKg: z.number().int().positive().max(50000).optional(),
  seats: z.number().int().positive().max(60).optional(),
  cylinderCapacityCm3: z.number().int().nonnegative().optional(),
  enginePowerKw: z.number().nonnegative().optional(),
  cnit: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
});

export const HouseholdContextSchema = z.object({
  dependentChildren: z.number().int().nonnegative().max(20),
  hasDisabilityCard: z.boolean(),
  isLegalEntity: z.boolean(),
});

export const CalculationContextSchema = z.object({
  vehicle: VehicleInputSchema,
  vehicleCase: VehicleCaseSchema,
  region: RegionCodeSchema,
  registrationDate: IsoDateSchema,
  household: HouseholdContextSchema,
});

export type VehicleInputSchemaType = z.infer<typeof VehicleInputSchema>;
export type CalculationContextSchemaType = z.infer<typeof CalculationContextSchema>;

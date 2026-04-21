import { z } from 'zod';

export const EnergyCodeSchema = z.enum([
  'ES', // Essence
  'GO', // Gazole / Diesel
  'EH', // Hybride essence
  'GH', // Hybride diesel
  'EE', // Électrique
  'EL', // Électrique (alt)
  'GL', // GPL / bicarburation essence
  'GN', // GNV
  'H2', // Hydrogène
  'OTHER',
]);
export type EnergyCode = z.infer<typeof EnergyCodeSchema>;

export const TrimSchema = z.object({
  id: z.string(),
  label: z.string(),
  energy: EnergyCodeSchema,
  fiscalCv: z.number().int().nonnegative(),
  co2GPerKm: z.number().int().nonnegative().nullable(),
  weightKg: z.number().int().nonnegative().nullable(),
  powerKw: z.number().nonnegative().nullable(),
  displacementCc: z.number().int().nonnegative().nullable(),
  bodyType: z.string().nullable(),
});
export type Trim = z.infer<typeof TrimSchema>;

export const ModelSchema = z.object({
  name: z.string(),
  trims: z.array(TrimSchema),
});
export type Model = z.infer<typeof ModelSchema>;

export const MakeSchema = z.object({
  name: z.string(),
  models: z.array(ModelSchema),
  sources: z.array(z.enum(['ademe', 'vpic'])),
});
export type Make = z.infer<typeof MakeSchema>;

export const CatalogSchema = z.object({
  schemaVersion: z.literal(1),
  generatedAt: z.string(),
  sources: z.object({
    ademe: z.object({
      url: z.string(),
      rows: z.number().int().nonnegative(),
    }),
    vpic: z.object({
      url: z.string(),
      makes: z.number().int().nonnegative(),
    }),
  }),
  makes: z.array(MakeSchema),
});
export type Catalog = z.infer<typeof CatalogSchema>;

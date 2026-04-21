/**
 * Domain types for the French vehicle-registration cost engine.
 *
 * Legal basis: Code des impositions sur les biens et services (CIBS),
 * articles L.421-29 to L.421-92, plus Loi de Finances 2026.
 *
 * Every monetary value in this module is an integer number of **cents**
 * (centimes d'euro) to avoid floating-point drift. Conversion to euros
 * happens only at the presentation layer.
 */

// ---------------------------------------------------------------------------
// Vehicle taxonomy
// ---------------------------------------------------------------------------

/** Administrative genre as recorded on the Certificat d'Immatriculation (field J.1). */
export type VehicleGenre = 'VP' | 'VU' | 'CTTE' | 'MOTO' | 'CAM' | 'TRR';

/** Energy / fuel type as used by the CIBS for coefficient determination. */
export type EnergyType =
  | 'ESSENCE'
  | 'DIESEL'
  | 'ELECTRIC'
  | 'HYDROGEN'
  | 'HYBRID' // HEV / MHEV (self-charging)
  | 'PHEV' // plug-in
  | 'GPL'
  | 'GNV'
  | 'E85'
  | 'OTHER';

/** Origin + used/new matrix driving which tax rules apply. */
export type VehicleCase =
  | 'FR_NEW' // bought new in France
  | 'FR_USED' // bought used in France, already registered in FR
  | 'IMPORT_EU_NEW' // imported new from EU member state
  | 'IMPORT_EU_USED' // imported used from EU member state
  | 'IMPORT_NON_EU_NEW' // imported new from outside EU
  | 'IMPORT_NON_EU_USED'; // imported used from outside EU

/** The 18 French regions + overseas. Keys match INSEE region codes. */
export type RegionCode =
  | 'ARA' // Auvergne-Rhône-Alpes
  | 'BFC' // Bourgogne-Franche-Comté
  | 'BRE' // Bretagne
  | 'CVL' // Centre-Val de Loire
  | 'COR' // Corse
  | 'GES' // Grand Est
  | 'HDF' // Hauts-de-France
  | 'IDF' // Île-de-France
  | 'NOR' // Normandie
  | 'NAQ' // Nouvelle-Aquitaine
  | 'OCC' // Occitanie
  | 'PDL' // Pays de la Loire
  | 'PAC' // Provence-Alpes-Côte d'Azur
  | 'GUA' // Guadeloupe
  | 'GUF' // Guyane
  | 'MAR' // Martinique
  | 'MAY' // Mayotte
  | 'REU'; // La Réunion

// ---------------------------------------------------------------------------
// Input shape
// ---------------------------------------------------------------------------

/** Household situation affecting weight-malus abatements (TMOM). */
export interface HouseholdContext {
  /** Number of dependent children (≥ 3 triggers "famille nombreuse" abatement: −200 kg per child). */
  dependentChildren: number;
  /** Whether the titleholder holds a CMI-invalidité (full exoneration on Y1 / Y3 / Y6). */
  hasDisabilityCard: boolean;
  /**
   * Whether the titleholder is a legal entity (personne morale).
   * Relevant for the ≥8-seats enhanced abatement (600 kg for personnes morales,
   * 500 kg otherwise — Loi de Finances 2026).
   */
  isLegalEntity: boolean;
}

export interface VehicleInput {
  genre: VehicleGenre;
  energy: EnergyType;

  /** CV fiscaux (field P.6 of the carte grise). */
  fiscalHorsepower: number;

  /** Date of first registration worldwide (field B). ISO string. */
  firstRegistrationDate: string;

  /** CO₂ WLTP in g/km (field V.7). Required for Y3. */
  co2WltpGPerKm: number;

  /** Mass in running order in kg (field G.1). Required for Y6. */
  massInRunningOrderKg: number;

  /** Kerb weight / PTAC for VU. Optional (needed only for Y2 on VU). */
  totalAuthorizedLadenMassKg?: number;

  /** Number of seats (field S.1). Relevant for Y6 abatement if ≥ 8. */
  seats?: number;

  /** Optional fields for autocompletion / traceability only. */
  cylinderCapacityCm3?: number;
  enginePowerKw?: number;
  cnit?: string;
  make?: string;
  model?: string;
}

export interface CalculationContext {
  vehicle: VehicleInput;
  vehicleCase: VehicleCase;
  /** Region of residence of the new titleholder. */
  region: RegionCode;
  /** Date the registration is requested (drives the scale version). ISO string. */
  registrationDate: string;
  household: HouseholdContext;
}

// ---------------------------------------------------------------------------
// Result shape
// ---------------------------------------------------------------------------

/** Common metadata attached to every tax component. */
export interface TaxComponentBase {
  /** Amount in cents (integer). */
  amountCents: number;
  /** Human-readable explanation in French (UI tooltip). */
  detail: string;
  /** Reference to CIBS article or other legal source. */
  legalRef: string;
  /** Whether this tax applies to the current case. */
  applicable: boolean;
}

export interface Y1Regional extends TaxComponentBase {
  /** CV × base regional rate (cents). */
  baseAmountCents: number;
  /** Île-de-France IDFM surcharge (cents). 0 outside IDF. */
  idfmSurchargeCents: number;
  /** Energy coefficient used (0, 0.5 or 1). */
  energyCoefficient: number;
  /** Age coefficient used (0.5 if ≥ 10 years else 1). */
  ageCoefficient: number;
  /** Per-CV rate used (cents). */
  perCvRateCents: number;
}

export type Y2Formation = TaxComponentBase;

export interface Y3MalusCo2Tranche {
  co2GPerKm: number;
  marginalAmountCents: number;
}

export interface Y3MalusCo2 extends TaxComponentBase {
  /** Malus from CO2 grid BEFORE the decote. */
  baseAmountCents: number;
  /** Decote coefficient (0..1). 0 if new vehicle in FR. */
  decoteCoefficient: number;
  /** Year of the CO2 scale used (matters for imports). */
  scaleYear: number;
  /** Number of months since first registration (imports). */
  ageMonths: number;
}

export type Y4Gestion = TaxComponentBase;

export type Y5Acheminement = TaxComponentBase;

export interface Y6WeightTranche {
  fromKg: number;
  /** Exclusive upper bound; Infinity for the last tranche. */
  toKg: number;
  /** kg actually taxed in this tranche. */
  kgTaxed: number;
  /** €/kg rate in cents (e.g. 10 € → 1000 cents). */
  ratePerKgCents: number;
  /** Subtotal for this tranche (cents). */
  subtotalCents: number;
}

export interface Y6WeightMalus extends TaxComponentBase {
  /** Effective taxable mass = massInRunningOrderKg − abatement. */
  taxableMassKg: number;
  /** Total abatement applied (kg). */
  abatementKg: number;
  /** Detail of abatements for traceability. */
  abatementBreakdown: Array<{ reason: string; kg: number }>;
  tranches: Y6WeightTranche[];
}

export interface AppliedAdjustments {
  exonerations: string[];
  /** True if age ≥ 10 years triggered Y1 50% discount. */
  decote10ans: boolean;
  /** Global cap applied to Y3 + Y6 combined (cents). 80 000 € in 2026. */
  malusGlobalCapCents: number;
  /** Whether the cap actually truncated the result. */
  malusGlobalCapReached: boolean;
}

export interface CalculationMetadata {
  calculationDate: string;
  scaleVersion: string;
  vehicleCase: VehicleCase;
  engineVersion: string;
}

export interface RegistrationCostBreakdown {
  /** Total cost in cents (integer). */
  totalCents: number;
  taxes: {
    Y1_regionale: Y1Regional;
    Y2_formation: Y2Formation;
    Y3_malusCO2: Y3MalusCo2;
    Y4_gestion: Y4Gestion;
    Y5_acheminement: Y5Acheminement;
    Y6_malusPoids: Y6WeightMalus;
  };
  applied: AppliedAdjustments;
  metadata: CalculationMetadata;
}

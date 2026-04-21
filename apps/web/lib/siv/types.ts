/**
 * Shared contract for every SIV (Système d'Immatriculation des Véhicules)
 * provider. The spec listed several third-party APIs (apiplaqueimmatriculation,
 * autoways, API Particulier). We wrap them behind a single interface so the
 * app and tests don't care which one is wired in.
 */

import type { EnergyType, VehicleGenre } from '@immatout/calc';

/**
 * Subset of SIV-returned fields that are actually useful for the calc engine.
 * Kept deliberately small — anything else (make, model, CNIT) is metadata
 * that the app can display but never needs to compute with.
 */
export interface SivLookupResult {
  plate: string;
  genre: VehicleGenre;
  energy: EnergyType;
  fiscalHorsepower: number;
  firstRegistrationDate: string; // ISO
  co2WltpGPerKm: number;
  massInRunningOrderKg: number;
  totalAuthorizedLadenMassKg?: number;
  seats?: number;
  make?: string;
  model?: string;
  cnit?: string;
  /** The provider that produced the payload. */
  provider: string;
}

export interface ISivProvider {
  readonly name: string;
  lookup(plate: string): Promise<SivLookupResult>;
}

export class SivNotFoundError extends Error {
  constructor(public readonly plate: string) {
    super(`Plate not found in SIV: ${plate}`);
    this.name = 'SivNotFoundError';
  }
}

export class SivUnavailableError extends Error {
  constructor(
    public readonly provider: string,
    cause?: unknown,
  ) {
    super(`SIV provider ${provider} unavailable`);
    this.name = 'SivUnavailableError';
    if (cause) this.cause = cause;
  }
}

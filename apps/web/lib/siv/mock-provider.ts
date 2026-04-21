/**
 * Mock SIV provider — returns fixture data for a short list of plates.
 *
 * Intended for local dev and integration tests. The real providers (via
 * `SIV_API_PROVIDER` env) are plugged in with the same shape.
 */

import { ISivProvider, SivLookupResult, SivNotFoundError } from './types';

const FIXTURES: Record<string, Omit<SivLookupResult, 'plate' | 'provider'>> = {
  // Peugeot 308 1.2 essence neuve.
  'AA-123-BC': {
    genre: 'VP',
    energy: 'ESSENCE',
    fiscalHorsepower: 7,
    firstRegistrationDate: '2026-02-10',
    co2WltpGPerKm: 130,
    massInRunningOrderKg: 1400,
    make: 'Peugeot',
    model: '308',
  },
  // Renault Zoé électrique, occasion française.
  'BB-456-DE': {
    genre: 'VP',
    energy: 'ELECTRIC',
    fiscalHorsepower: 4,
    firstRegistrationDate: '2021-09-01',
    co2WltpGPerKm: 0,
    massInRunningOrderKg: 1480,
    make: 'Renault',
    model: 'Zoé',
  },
  // Audi Q5 PHEV, import UE récent.
  'CC-789-FG': {
    genre: 'VP',
    energy: 'PHEV',
    fiscalHorsepower: 11,
    firstRegistrationDate: '2022-11-20',
    co2WltpGPerKm: 45,
    massInRunningOrderKg: 2060,
    make: 'Audi',
    model: 'Q5 TFSI e',
  },
  // Vieux diesel, 12 ans, occasion FR (Y1 décote 50 %).
  'DD-321-HJ': {
    genre: 'VP',
    energy: 'DIESEL',
    fiscalHorsepower: 6,
    firstRegistrationDate: '2013-05-15',
    co2WltpGPerKm: 150,
    massInRunningOrderKg: 1350,
    make: 'Citroën',
    model: 'C4',
  },
};

export class MockSivProvider {
  public readonly name = 'mock';

  async lookup(plate: string): Promise<SivLookupResult> {
    const fixture = FIXTURES[plate];
    if (!fixture) {
      throw new SivNotFoundError(plate);
    }
    return { plate, provider: this.name, ...fixture };
  }
}

/** Plates for which the mock has data — exposed for tests and demos. */
export const MOCK_AVAILABLE_PLATES = Object.keys(FIXTURES);

// Type-level self-check: MockSivProvider must satisfy ISivProvider.
const _check: ISivProvider = new MockSivProvider();
void _check;

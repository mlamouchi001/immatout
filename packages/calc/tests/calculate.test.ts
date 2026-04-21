import { describe, expect, it } from 'vitest';

import { calculate, ENGINE_VERSION } from '../src/calculate';
import { buildCtx } from './helpers';

describe('calculate — orchestrator', () => {
  it('sums all 6 taxes and returns a well-formed breakdown', () => {
    const result = calculate(
      buildCtx({
        region: 'PAC',
        vehicle: { fiscalHorsepower: 6, co2WltpGPerKm: 120, massInRunningOrderKg: 1400 },
      }),
    );
    // Y1 = 6 × 60 = 360 €
    // Y2 = 0 (VP)
    // Y3 = 310 € (120 g)
    // Y4 = 11 €
    // Y5 = 2.76 €
    // Y6 = 0 (1400 kg)
    // Total = 683.76 €
    expect(result.totalCents).toBe(68376);
    expect(result.metadata.engineVersion).toBe(ENGINE_VERSION);
    expect(result.metadata.vehicleCase).toBe('FR_NEW');
  });

  it('returns 13.76 € (Y4 + Y5) for a fully exonerated electric VP in PACA', () => {
    const result = calculate(
      buildCtx({
        region: 'PAC',
        vehicle: {
          fiscalHorsepower: 4,
          energy: 'ELECTRIC',
          co2WltpGPerKm: 0,
          massInRunningOrderKg: 1800,
        },
      }),
    );
    expect(result.totalCents).toBe(1376);
    expect(result.applied.exonerations).toContain('Véhicule 100 % électrique');
  });

  it('applies the global Y3+Y6 cap of 80 000 € in 2026', () => {
    const result = calculate(
      buildCtx({
        region: 'PAC',
        vehicle: {
          fiscalHorsepower: 20,
          co2WltpGPerKm: 250, // Y3 capped alone at 80 000 €
          massInRunningOrderKg: 2500, // Y6 = around 20 500 €
        },
      }),
    );
    // Y3 alone reaches 80 000 € cap; Y6 should be zeroed by the global cap.
    expect(result.taxes.Y3_malusCO2.amountCents).toBe(8_000_000);
    expect(result.taxes.Y6_malusPoids.amountCents).toBe(0);
    expect(result.applied.malusGlobalCapReached).toBe(true);
  });

  it('distributes the cap when Y3 alone does not reach it', () => {
    const result = calculate(
      buildCtx({
        region: 'PAC',
        vehicle: {
          fiscalHorsepower: 20,
          co2WltpGPerKm: 190, // Y3 = 76 800 €
          massInRunningOrderKg: 2800, // Y6 ≈ 32 000 €
        },
      }),
    );
    // Y3 = 7 680 000 cents → leaves 320 000 cents for Y6 (= 3200 €)
    expect(result.taxes.Y3_malusCO2.amountCents).toBe(7_680_000);
    expect(result.taxes.Y6_malusPoids.amountCents).toBe(320_000);
    expect(result.applied.malusGlobalCapReached).toBe(true);
  });

  it('applies the 10-year Y1 discount and retains Y3 for a recent import', () => {
    const result = calculate(
      buildCtx({
        region: 'BFC',
        vehicleCase: 'IMPORT_EU_USED',
        vehicle: {
          fiscalHorsepower: 8,
          co2WltpGPerKm: 150,
          massInRunningOrderKg: 1400,
          firstRegistrationDate: '2015-06-01',
        },
        registrationDate: '2026-04-19',
      }),
    );
    // Y1 = 8 × 60 × 0.5 = 240 €
    expect(result.taxes.Y1_regionale.amountCents).toBe(24000);
    expect(result.applied.decote10ans).toBe(true);
  });

  it('returns all taxes non-zero for a typical IDF thermic new-car case', () => {
    const result = calculate(
      buildCtx({
        region: 'IDF',
        vehicle: {
          fiscalHorsepower: 7,
          co2WltpGPerKm: 140,
          massInRunningOrderKg: 1650,
          firstRegistrationDate: '2026-03-01',
        },
        registrationDate: '2026-04-19',
      }),
    );
    // Y1 base: 7 × 54.95 = 384.65 €
    // IDFM: 7 × 14 = 98 € → Y1 total 482.65 €
    // Y3: 140 g → 2205 €
    // Y4+Y5 = 13.76 €
    // Y6: 1650 − 0 = 1650 kg → 150 × 10 = 1500 €
    // Total: 482.65 + 2205 + 13.76 + 1500 = 4201.41 €
    expect(result.totalCents).toBe(420141);
  });

  it('metadata.scaleVersion follows the registration year', () => {
    const r = calculate(buildCtx({ registrationDate: '2026-07-12' }));
    expect(r.metadata.scaleVersion).toBe('2026-01-01');
  });
});

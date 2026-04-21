import { describe, expect, it } from 'vitest';

import { computeY6WeightMalus } from '../src/taxes/y6-malus-weight';
import { buildCtx } from './helpers';

describe('Y6 malus au poids', () => {
  it('is 0 below 1500 kg threshold', () => {
    const y6 = computeY6WeightMalus(buildCtx({ vehicle: { massInRunningOrderKg: 1400 } }));
    expect(y6.amountCents).toBe(0);
  });

  it('is 0 at exactly 1500 kg', () => {
    const y6 = computeY6WeightMalus(buildCtx({ vehicle: { massInRunningOrderKg: 1500 } }));
    expect(y6.amountCents).toBe(0);
  });

  it('charges 10 €/kg on the first tranche (1600 kg → 1000 €)', () => {
    const y6 = computeY6WeightMalus(buildCtx({ vehicle: { massInRunningOrderKg: 1600 } }));
    // (1600 − 1500) × 10 = 1000 €
    expect(y6.amountCents).toBe(100000);
    expect(y6.taxableMassKg).toBe(1600);
  });

  it('crosses tranche boundaries correctly at 1750 kg', () => {
    const y6 = computeY6WeightMalus(buildCtx({ vehicle: { massInRunningOrderKg: 1750 } }));
    // 200 kg × 10 = 2000 € + 50 kg × 15 = 750 € → 2750 €
    expect(y6.amountCents).toBe(275000);
    expect(y6.tranches).toHaveLength(2);
  });

  it('computes all 5 tranches for a 2200 kg vehicle', () => {
    const y6 = computeY6WeightMalus(buildCtx({ vehicle: { massInRunningOrderKg: 2200 } }));
    // 200×10 + 100×15 + 100×20 + 100×25 + 200×30 = 2000+1500+2000+2500+6000 = 14 000 €
    expect(y6.amountCents).toBe(1400000);
    expect(y6.tranches).toHaveLength(5);
  });

  it('applies the hybrid abatement of 100 kg', () => {
    const y6 = computeY6WeightMalus(
      buildCtx({ vehicle: { massInRunningOrderKg: 1600, energy: 'HYBRID' } }),
    );
    expect(y6.amountCents).toBe(0);
    expect(y6.abatementKg).toBe(100);
    expect(y6.taxableMassKg).toBe(1500);
  });

  it('applies the PHEV abatement of 200 kg', () => {
    const y6 = computeY6WeightMalus(
      buildCtx({ vehicle: { massInRunningOrderKg: 1800, energy: 'PHEV' } }),
    );
    // 1800 − 200 = 1600 kg taxable → 100 × 10 = 1000 €
    expect(y6.amountCents).toBe(100000);
    expect(y6.abatementKg).toBe(200);
  });

  it('applies the famille nombreuse abatement only from 3 children (cumulative)', () => {
    const two = computeY6WeightMalus(
      buildCtx({
        vehicle: { massInRunningOrderKg: 1900 },
        household: { dependentChildren: 2 },
      }),
    );
    const three = computeY6WeightMalus(
      buildCtx({
        vehicle: { massInRunningOrderKg: 1900 },
        household: { dependentChildren: 3 },
      }),
    );
    // 2 children → no abatement; 400 kg above threshold:
    //   200×10 + 100×15 + 100×20 = 5500 €
    expect(two.amountCents).toBe(550000);
    // 3 children → 600 kg abatement → taxable 1300 kg → 0 €
    expect(three.amountCents).toBe(0);
  });

  it('stacks PHEV + famille nombreuse abatements', () => {
    const y6 = computeY6WeightMalus(
      buildCtx({
        vehicle: { massInRunningOrderKg: 1900, energy: 'PHEV' },
        household: { dependentChildren: 3 },
      }),
    );
    // 1900 − 200 (PHEV) − 600 (3 kids) = 1100 kg → 0 €
    expect(y6.amountCents).toBe(0);
    expect(y6.abatementKg).toBe(800);
  });

  it('applies 500 kg abatement for ≥8 seats (personne physique)', () => {
    const y6 = computeY6WeightMalus(
      buildCtx({
        vehicle: { massInRunningOrderKg: 2000, seats: 9 },
      }),
    );
    // 2000 − 500 = 1500 kg → 0 €
    expect(y6.amountCents).toBe(0);
    expect(y6.abatementKg).toBe(500);
  });

  it('applies 600 kg abatement for ≥8 seats (personne morale, LF 2026)', () => {
    const y6 = computeY6WeightMalus(
      buildCtx({
        vehicle: { massInRunningOrderKg: 2100, seats: 9 },
        household: { isLegalEntity: true },
      }),
    );
    // 2100 − 600 = 1500 kg → 0 €
    expect(y6.amountCents).toBe(0);
    expect(y6.abatementKg).toBe(600);
  });

  it('exonerates electric vehicles (LF 2026)', () => {
    const y6 = computeY6WeightMalus(
      buildCtx({ vehicle: { massInRunningOrderKg: 2400, energy: 'ELECTRIC' } }),
    );
    expect(y6.amountCents).toBe(0);
    expect(y6.applicable).toBe(false);
  });

  it('exonerates hydrogen vehicles', () => {
    const y6 = computeY6WeightMalus(
      buildCtx({ vehicle: { massInRunningOrderKg: 2400, energy: 'HYDROGEN' } }),
    );
    expect(y6.amountCents).toBe(0);
  });

  it('exonerates CMI-invalidité titleholder', () => {
    const y6 = computeY6WeightMalus(
      buildCtx({
        vehicle: { massInRunningOrderKg: 2200 },
        household: { hasDisabilityCard: true },
      }),
    );
    expect(y6.amountCents).toBe(0);
  });

  it('is 0 for VU / MOTO / CAM', () => {
    expect(
      computeY6WeightMalus(buildCtx({ vehicle: { genre: 'VU', massInRunningOrderKg: 2500 } }))
        .amountCents,
    ).toBe(0);
  });

  it('is 0 for FR_USED (no Y6 on used-FR transfer)', () => {
    const y6 = computeY6WeightMalus(
      buildCtx({
        vehicleCase: 'FR_USED',
        vehicle: { massInRunningOrderKg: 2200 },
      }),
    );
    expect(y6.amountCents).toBe(0);
  });

  it('applies import decote on imported used vehicles', () => {
    const y6 = computeY6WeightMalus(
      buildCtx({
        vehicleCase: 'IMPORT_EU_USED',
        vehicle: {
          massInRunningOrderKg: 2000,
          firstRegistrationDate: '2022-01-01',
        },
        registrationDate: '2026-04-19',
      }),
    );
    // age: ~51 months → tier 49-60 → 38 %
    // base: 200×10 + 100×15 + 100×20 + 100×25 = 8000 €
    // after decote: 8000 × (1 − 0.38) = 4960 €
    expect(y6.amountCents).toBe(496000);
  });
});

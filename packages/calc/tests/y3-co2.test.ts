import { describe, expect, it } from 'vitest';

import { computeY3MalusCo2 } from '../src/taxes/y3-malus-co2';
import { buildCtx } from './helpers';

describe('Y3 malus CO₂', () => {
  it('is 0 below 108 g/km threshold in 2026', () => {
    const y3 = computeY3MalusCo2(buildCtx({ vehicle: { co2WltpGPerKm: 107 } }));
    expect(y3.amountCents).toBe(0);
  });

  it('matches the 2026 grid for specific values', () => {
    const e108 = computeY3MalusCo2(buildCtx({ vehicle: { co2WltpGPerKm: 108 } }));
    expect(e108.amountCents).toBe(5000); // 50 €

    const e125 = computeY3MalusCo2(buildCtx({ vehicle: { co2WltpGPerKm: 125 } }));
    expect(e125.amountCents).toBe(54000); // 540 €

    const e150 = computeY3MalusCo2(buildCtx({ vehicle: { co2WltpGPerKm: 150 } }));
    expect(e150.amountCents).toBe(427900); // 4 279 €
  });

  it('reaches the 80 000 € cap at 192 g/km in 2026', () => {
    const y3 = computeY3MalusCo2(buildCtx({ vehicle: { co2WltpGPerKm: 192 } }));
    expect(y3.amountCents).toBe(8_000_000);
  });

  it('stays capped above 192 g/km', () => {
    const y3 = computeY3MalusCo2(buildCtx({ vehicle: { co2WltpGPerKm: 250 } }));
    expect(y3.amountCents).toBe(8_000_000);
  });

  it('is 0 for electric vehicles', () => {
    const y3 = computeY3MalusCo2(buildCtx({ vehicle: { co2WltpGPerKm: 0, energy: 'ELECTRIC' } }));
    expect(y3.amountCents).toBe(0);
  });

  it('is 0 for CMI-invalidité', () => {
    const y3 = computeY3MalusCo2(
      buildCtx({
        vehicle: { co2WltpGPerKm: 200 },
        household: { hasDisabilityCard: true },
      }),
    );
    expect(y3.amountCents).toBe(0);
  });

  it('is 0 for FR_USED (no Y3 on used-FR transfer)', () => {
    const y3 = computeY3MalusCo2(
      buildCtx({
        vehicleCase: 'FR_USED',
        vehicle: { co2WltpGPerKm: 200 },
      }),
    );
    expect(y3.amountCents).toBe(0);
  });

  it('is 0 for VU / MOTO', () => {
    const y3 = computeY3MalusCo2(buildCtx({ vehicle: { genre: 'VU', co2WltpGPerKm: 200 } }));
    expect(y3.amountCents).toBe(0);
  });

  it('applies decote on imported used vehicle (45 months, coef 33 %)', () => {
    const y3 = computeY3MalusCo2(
      buildCtx({
        vehicleCase: 'IMPORT_EU_USED',
        vehicle: {
          co2WltpGPerKm: 150,
          firstRegistrationDate: '2022-07-01',
        },
        registrationDate: '2026-04-19',
      }),
    );
    // age: 45 months → tier 37-48 → 33 %
    // 2022 not loaded yet → fallback to closest earlier loaded scale: 2024.
    // 150 g in 2024 grid = 2205 €.
    // after decote: round(2205 × 0.67 × 100) = 147735 cents = 1477.35 €.
    expect(y3.decoteCoefficient).toBe(0.33);
    expect(y3.scaleYear).toBe(2022);
    expect(y3.amountCents).toBe(147735);
  });

  it('uses the 2025 scale verbatim when 1ʳᵉ immatriculation is 2025', () => {
    const y3 = computeY3MalusCo2(
      buildCtx({
        vehicleCase: 'IMPORT_EU_USED',
        vehicle: {
          co2WltpGPerKm: 155,
          firstRegistrationDate: '2025-06-01',
        },
        registrationDate: '2026-04-19',
      }),
    );
    // age: 10 months → tier 10-13 → 12 %.
    // 2025 grid @ 155 g = 4 279 €.
    // 4279 × 0.88 = 3765.52 → 376552 cents.
    expect(y3.decoteCoefficient).toBe(0.12);
    expect(y3.scaleYear).toBe(2025);
    expect(y3.amountCents).toBe(376552);
  });

  it('fully exonerates imported vehicles ≥ 15 years old', () => {
    const y3 = computeY3MalusCo2(
      buildCtx({
        vehicleCase: 'IMPORT_EU_USED',
        vehicle: {
          co2WltpGPerKm: 200,
          firstRegistrationDate: '2010-01-01',
        },
        registrationDate: '2026-04-19',
      }),
    );
    expect(y3.amountCents).toBe(0);
    expect(y3.decoteCoefficient).toBe(1);
  });
});

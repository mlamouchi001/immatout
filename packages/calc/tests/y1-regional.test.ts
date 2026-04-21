import { describe, expect, it } from 'vitest';

import { computeY1Regional } from '../src/taxes/y1-regional';
import { buildCtx } from './helpers';

describe('Y1 régionale', () => {
  it('computes a basic case: 7 CV × 60 €/CV in PACA = 420 €', () => {
    const y1 = computeY1Regional(buildCtx({ region: 'PAC', vehicle: { fiscalHorsepower: 7 } }));
    expect(y1.amountCents).toBe(42000);
    expect(y1.ageCoefficient).toBe(1);
    expect(y1.energyCoefficient).toBe(1);
    expect(y1.idfmSurchargeCents).toBe(0);
  });

  it('applies IDFM surcharge of +14 €/CV after 2026-03-01 on top of 54,95 €', () => {
    const y1 = computeY1Regional(
      buildCtx({
        region: 'IDF',
        vehicle: { fiscalHorsepower: 5 },
        registrationDate: '2026-04-19',
      }),
    );
    // Base: 5 × 54.95 = 274.75 €
    // IDFM: 5 × 14 = 70 €
    // Total: 344.75 € → 34475 cents
    expect(y1.baseAmountCents).toBe(27475);
    expect(y1.idfmSurchargeCents).toBe(7000);
    expect(y1.amountCents).toBe(34475);
  });

  it('does not apply IDFM surcharge before 2026-03-01', () => {
    const y1 = computeY1Regional(
      buildCtx({
        region: 'IDF',
        vehicle: { fiscalHorsepower: 5 },
        registrationDate: '2026-02-15',
      }),
    );
    expect(y1.idfmSurchargeCents).toBe(0);
  });

  it('halves the regional tax for vehicles ≥ 10 years old (CIBS L.421-48)', () => {
    const y1 = computeY1Regional(
      buildCtx({
        region: 'BFC',
        vehicle: { fiscalHorsepower: 8, firstRegistrationDate: '2015-06-01' },
        registrationDate: '2026-04-19',
      }),
    );
    // 8 × 60 × 0.5 = 240 €
    expect(y1.amountCents).toBe(24000);
    expect(y1.ageCoefficient).toBe(0.5);
  });

  it('returns 0 for a 100 % electric vehicle (energy coef 0)', () => {
    const y1 = computeY1Regional(
      buildCtx({ region: 'PAC', vehicle: { fiscalHorsepower: 4, energy: 'ELECTRIC' } }),
    );
    expect(y1.amountCents).toBe(0);
    expect(y1.energyCoefficient).toBe(0);
  });

  it('applies a 50 % discount on GPL in Bretagne', () => {
    const y1 = computeY1Regional(
      buildCtx({ region: 'BRE', vehicle: { fiscalHorsepower: 7, energy: 'GPL' } }),
    );
    // 7 × 60 × 0.5 = 210 €
    expect(y1.amountCents).toBe(21000);
    expect(y1.energyCoefficient).toBe(0.5);
  });

  it('does not charge IDFM on an exonerated (electric) vehicle in IDF', () => {
    const y1 = computeY1Regional(
      buildCtx({
        region: 'IDF',
        vehicle: { fiscalHorsepower: 6, energy: 'ELECTRIC' },
        registrationDate: '2026-04-19',
      }),
    );
    expect(y1.amountCents).toBe(0);
    expect(y1.idfmSurchargeCents).toBe(0);
  });

  it('includes Mayotte’s 30 €/CV special rate', () => {
    const y1 = computeY1Regional(buildCtx({ region: 'MAY', vehicle: { fiscalHorsepower: 10 } }));
    // 10 × 30 = 300 €
    expect(y1.amountCents).toBe(30000);
  });

  it('throws if the region code is unknown', () => {
    // Force-cast to bypass TypeScript for this hostile input.
    expect(() => computeY1Regional(buildCtx({ region: 'ZZZ' as unknown as 'IDF' }))).toThrow(
      /No regional scale entry/,
    );
  });
});

import { describe, expect, it } from 'vitest';

import { calculate } from '../src/calculate';
import type { CalculationContext } from '../src/types';

import goldenFixtures from './fixtures/golden-cases.json';

interface GoldenCase {
  id: string;
  description: string;
  input: CalculationContext;
  expected: {
    totalCents: number;
    breakdown: { Y1: number; Y2: number; Y3: number; Y4: number; Y5: number; Y6: number };
  };
}

const cases = goldenFixtures.cases as GoldenCase[];

describe('golden cases', () => {
  it.each(cases)('$id — $description', (c) => {
    const result = calculate(c.input);

    expect(result.taxes.Y1_regionale.amountCents).toBe(c.expected.breakdown.Y1);
    expect(result.taxes.Y2_formation.amountCents).toBe(c.expected.breakdown.Y2);
    expect(result.taxes.Y3_malusCO2.amountCents).toBe(c.expected.breakdown.Y3);
    expect(result.taxes.Y4_gestion.amountCents).toBe(c.expected.breakdown.Y4);
    expect(result.taxes.Y5_acheminement.amountCents).toBe(c.expected.breakdown.Y5);
    expect(result.taxes.Y6_malusPoids.amountCents).toBe(c.expected.breakdown.Y6);
    expect(result.totalCents).toBe(c.expected.totalCents);
  });

  it('ships at least 20 golden cases', () => {
    expect(cases.length).toBeGreaterThanOrEqual(20);
  });
});

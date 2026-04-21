import { describe, expect, it } from 'vitest';

import { applyCoefficient, fromCents, toCents } from '../src/money';

describe('money helpers', () => {
  it('converts euros to cents without float drift', () => {
    expect(toCents(11)).toBe(1100);
    expect(toCents(2.76)).toBe(276);
    expect(toCents(54.95)).toBe(5495);
    expect(toCents(59.5)).toBe(5950);
  });

  it('converts cents back to euros', () => {
    expect(fromCents(1100)).toBe(11);
    expect(fromCents(276)).toBe(2.76);
  });

  it('applies a coefficient with half-away rounding', () => {
    expect(applyCoefficient(1000, 0.5)).toBe(500);
    expect(applyCoefficient(333, 0.5)).toBe(167);
    expect(applyCoefficient(100, 0)).toBe(0);
  });
});

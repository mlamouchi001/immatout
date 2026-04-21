import { describe, expect, it } from 'vitest';

import {
  getImportDecoteCoefficient,
  isTenYearsOrOlder,
  monthsBetween,
  yearsBetween,
} from '../src/abatements/age-decote';

describe('date helpers', () => {
  it('counts whole months correctly', () => {
    expect(monthsBetween('2026-01-15', '2026-04-15')).toBe(3);
    expect(monthsBetween('2026-01-15', '2026-04-14')).toBe(2);
    expect(monthsBetween('2020-06-01', '2026-04-19')).toBe(70);
  });

  it('returns 0 if end date ≤ start date', () => {
    expect(monthsBetween('2026-04-19', '2026-04-19')).toBe(0);
    expect(monthsBetween('2026-04-19', '2025-01-01')).toBe(0);
  });

  it('rejects invalid ISO strings', () => {
    expect(() => monthsBetween('not-a-date', '2026-04-19')).toThrow(/Invalid ISO date/);
  });

  it('counts whole years', () => {
    expect(yearsBetween('2015-04-19', '2026-04-19')).toBe(11);
    expect(yearsBetween('2016-04-20', '2026-04-19')).toBe(9);
  });

  it('flags 10-year-old vehicles for Y1 decote', () => {
    expect(isTenYearsOrOlder('2016-04-19', '2026-04-19')).toBe(true);
    expect(isTenYearsOrOlder('2016-04-20', '2026-04-19')).toBe(false);
    expect(isTenYearsOrOlder('2020-01-01', '2026-04-19')).toBe(false);
  });
});

describe('import decote coefficient', () => {
  it('returns 0 for a 0-month vehicle', () => {
    expect(getImportDecoteCoefficient(0)).toBe(0);
  });

  it('matches the published tiers', () => {
    expect(getImportDecoteCoefficient(1)).toBe(0.03);
    expect(getImportDecoteCoefficient(5)).toBe(0.06);
    expect(getImportDecoteCoefficient(12)).toBe(0.12);
    expect(getImportDecoteCoefficient(45)).toBe(0.33);
    expect(getImportDecoteCoefficient(120)).toBe(0.64);
  });

  it('fully exonerates from 181 months (15 years)', () => {
    expect(getImportDecoteCoefficient(181)).toBe(1);
    expect(getImportDecoteCoefficient(240)).toBe(1);
  });

  it('rejects negative ages', () => {
    expect(() => getImportDecoteCoefficient(-1)).toThrow(/negative/);
  });
});

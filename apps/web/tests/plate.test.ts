import { describe, expect, it } from 'vitest';

import { normalizePlate } from '@/lib/siv/plate';

describe('normalizePlate', () => {
  it('accepts SIV format with hyphens', () => {
    expect(normalizePlate('AA-123-BC')).toEqual({
      raw: 'AA-123-BC',
      normalized: 'AA-123-BC',
      format: 'SIV',
    });
  });

  it('accepts SIV with spaces and lowercase', () => {
    expect(normalizePlate('aa 123 bc')?.normalized).toBe('AA-123-BC');
  });

  it('rejects an empty string', () => {
    expect(normalizePlate('')).toBeNull();
  });

  it('rejects garbage', () => {
    expect(normalizePlate('foo-bar')).toBeNull();
  });

  it('accepts FNI plates', () => {
    expect(normalizePlate('1234 ZZ 75')?.format).toBe('FNI');
    expect(normalizePlate('123AB2A')?.format).toBe('FNI'); // Corsica
  });
});

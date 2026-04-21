import { describe, expect, it } from 'vitest';

import { computeY4Gestion } from '../src/taxes/y4-fixed';
import { buildCtx } from './helpers';

describe('Y4 gestion', () => {
  it('returns flat 11 € (1100 cents)', () => {
    const y4 = computeY4Gestion(buildCtx());
    expect(y4.amountCents).toBe(1100);
    expect(y4.applicable).toBe(true);
    expect(y4.legalRef).toBe('CIBS L.421-87');
  });

  it('is unaffected by region, genre, or energy', () => {
    expect(
      computeY4Gestion(buildCtx({ region: 'MAY', vehicle: { genre: 'MOTO', energy: 'ELECTRIC' } }))
        .amountCents,
    ).toBe(1100);
  });
});

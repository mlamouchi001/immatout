import { describe, expect, it } from 'vitest';

import { computeY5Acheminement } from '../src/taxes/y5-delivery';
import { buildCtx } from './helpers';

describe('Y5 acheminement', () => {
  it('returns flat 2,76 € (276 cents)', () => {
    const y5 = computeY5Acheminement(buildCtx());
    expect(y5.amountCents).toBe(276);
    expect(y5.applicable).toBe(true);
  });
});

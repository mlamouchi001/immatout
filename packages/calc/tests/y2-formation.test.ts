import { describe, expect, it } from 'vitest';

import { computeY2Formation } from '../src/taxes/y2-formation';
import { buildCtx } from './helpers';

describe('Y2 formation professionnelle', () => {
  it('is 0 for VP', () => {
    expect(computeY2Formation(buildCtx()).amountCents).toBe(0);
  });

  it('is 34 € for VU ≤ 3,5 t', () => {
    const y2 = computeY2Formation(
      buildCtx({
        vehicle: { genre: 'VU', totalAuthorizedLadenMassKg: 2500 },
      }),
    );
    expect(y2.amountCents).toBe(3400);
  });

  it('is 127 € for VU 3,5 t < PTAC ≤ 6 t', () => {
    const y2 = computeY2Formation(
      buildCtx({
        vehicle: { genre: 'VU', totalAuthorizedLadenMassKg: 5000 },
      }),
    );
    expect(y2.amountCents).toBe(12700);
  });

  it('is 189 € for VU > 6 t', () => {
    const y2 = computeY2Formation(
      buildCtx({
        vehicle: { genre: 'VU', totalAuthorizedLadenMassKg: 7500 },
      }),
    );
    expect(y2.amountCents).toBe(18900);
  });

  it('is 305 € for a tracteur routier (TRR)', () => {
    const y2 = computeY2Formation(buildCtx({ vehicle: { genre: 'TRR' } }));
    expect(y2.amountCents).toBe(30500);
  });

  it('throws if PTAC missing for a VU', () => {
    expect(() => computeY2Formation(buildCtx({ vehicle: { genre: 'CTTE' } }))).toThrow(/PTAC/);
  });
});

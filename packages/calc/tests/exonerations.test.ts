import { describe, expect, it } from 'vitest';

import { determineExonerations } from '../src/abatements/exonerations';
import { buildCtx } from './helpers';

describe('exonerations', () => {
  it('does not exonerate a standard thermic vehicle', () => {
    const exo = determineExonerations(buildCtx());
    expect(exo.y1).toBe(false);
    expect(exo.y3).toBe(false);
    expect(exo.y6).toBe(false);
    expect(exo.reasons).toEqual([]);
  });

  it('fully exonerates electric vehicles', () => {
    const exo = determineExonerations(buildCtx({ vehicle: { energy: 'ELECTRIC' } }));
    expect(exo.y1).toBe(true);
    expect(exo.y3).toBe(true);
    expect(exo.y6).toBe(true);
    expect(exo.reasons).toContain('Véhicule 100 % électrique');
  });

  it('fully exonerates hydrogen vehicles', () => {
    const exo = determineExonerations(buildCtx({ vehicle: { energy: 'HYDROGEN' } }));
    expect(exo.y1 && exo.y3 && exo.y6).toBe(true);
  });

  it('stacks CMI-invalidité with energy reasons', () => {
    const exo = determineExonerations(
      buildCtx({
        vehicle: { energy: 'ELECTRIC' },
        household: { hasDisabilityCard: true },
      }),
    );
    expect(exo.reasons).toEqual(
      expect.arrayContaining(['Véhicule 100 % électrique', 'Titulaire CMI-invalidité']),
    );
  });

  it('exonerates a thermic car with CMI-invalidité', () => {
    const exo = determineExonerations(buildCtx({ household: { hasDisabilityCard: true } }));
    expect(exo.y1 && exo.y3 && exo.y6).toBe(true);
  });
});

/**
 * Main orchestrator for the vehicle-registration cost calculation.
 *
 * Runs every Yn in isolation, then applies the global Y3+Y6 cap
 * (80 000 € in 2026, 90 000 € in 2027, 100 000 € in 2028 — CIBS L.421-70).
 *
 * The engine is pure: no I/O, no clock, no framework code.
 * Caller must provide `registrationDate` explicitly.
 */

import { getCo2MalusScale } from '@immatout/data';

import { determineExonerations } from './abatements/exonerations';
import { isTenYearsOrOlder } from './abatements/age-decote';
import { computeY1Regional } from './taxes/y1-regional';
import { computeY2Formation } from './taxes/y2-formation';
import { computeY3MalusCo2 } from './taxes/y3-malus-co2';
import { computeY4Gestion } from './taxes/y4-fixed';
import { computeY5Acheminement } from './taxes/y5-delivery';
import { computeY6WeightMalus } from './taxes/y6-malus-weight';
import type { CalculationContext, RegistrationCostBreakdown } from './types';

export const ENGINE_VERSION = '0.2.0';

export function calculate(ctx: CalculationContext): RegistrationCostBreakdown {
  const scaleYear = new Date(ctx.registrationDate).getUTCFullYear();

  const y1 = computeY1Regional(ctx);
  const y2 = computeY2Formation(ctx);
  const y4 = computeY4Gestion(ctx);
  const y5 = computeY5Acheminement(ctx);
  let y3 = computeY3MalusCo2(ctx);
  let y6 = computeY6WeightMalus(ctx);

  // Global Y3 + Y6 cap.
  const capEuros = getCo2MalusScale(scaleYear).globalMalusCapEuros;
  const capCents = capEuros * 100;
  const combined = y3.amountCents + y6.amountCents;
  let malusGlobalCapReached = false;
  if (combined > capCents) {
    malusGlobalCapReached = true;
    // Distribute the cap: favor reducing Y6 first (it's the secondary tax),
    // keeping Y3 intact up to the cap. If Y3 alone already ≥ cap, keep Y3
    // at cap and zero Y6.
    if (y3.amountCents >= capCents) {
      y3 = { ...y3, amountCents: capCents, detail: `${y3.detail} · plafonné à ${capEuros} €` };
      y6 = { ...y6, amountCents: 0, detail: `${y6.detail} · plafond global atteint` };
    } else {
      const remaining = capCents - y3.amountCents;
      y6 = {
        ...y6,
        amountCents: remaining,
        detail: `${y6.detail} · plafond global Y3+Y6 (${capEuros} €) atteint`,
      };
    }
  }

  const totalCents =
    y1.amountCents +
    y2.amountCents +
    y3.amountCents +
    y4.amountCents +
    y5.amountCents +
    y6.amountCents;

  const exo = determineExonerations(ctx);
  const decote10ans = isTenYearsOrOlder(ctx.vehicle.firstRegistrationDate, ctx.registrationDate);

  return {
    totalCents,
    taxes: {
      Y1_regionale: y1,
      Y2_formation: y2,
      Y3_malusCO2: y3,
      Y4_gestion: y4,
      Y5_acheminement: y5,
      Y6_malusPoids: y6,
    },
    applied: {
      exonerations: exo.reasons,
      decote10ans,
      malusGlobalCapCents: capCents,
      malusGlobalCapReached,
    },
    metadata: {
      calculationDate: new Date().toISOString(),
      scaleVersion: `${scaleYear}-01-01`,
      vehicleCase: ctx.vehicleCase,
      engineVersion: ENGINE_VERSION,
    },
  };
}

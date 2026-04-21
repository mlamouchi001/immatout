import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { calculate, CalculationContextSchema, type RegionCode } from '@immatout/calc';
import { getRegionsScale, type RegionScaleEntry } from '@immatout/data';

import { fromZod } from '@/lib/api/errors';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/compare
 *
 * Body: a full CalculationContext (region is ignored — the endpoint rolls
 * through the 18 regions of the current scale and returns one breakdown per
 * region, sorted by total ascending).
 *
 * Keeps the 18 calculations server-side so the client only does one round-trip.
 */
export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Malformed JSON', code: 'BAD_REQUEST' }, { status: 400 });
  }

  let ctx: ReturnType<typeof CalculationContextSchema.parse>;
  try {
    ctx = CalculationContextSchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) return fromZod(err);
    throw err;
  }

  const year = new Date(ctx.registrationDate).getUTCFullYear();
  const scale = getRegionsScale(year);

  type RegionComparison = {
    regionCode: RegionCode;
    regionName: string;
    perCvRateEuros: number;
    totalCents: number;
    taxes: { Y1: number; Y3: number; Y6: number };
  };

  const comparisons: RegionComparison[] = scale.regions.map(
    (r: RegionScaleEntry): RegionComparison => {
      const code = r.regionCode as RegionCode;
      const breakdown = calculate({ ...ctx, region: code });
      return {
        regionCode: code,
        regionName: r.regionName,
        perCvRateEuros: r.perCvRateEuros,
        totalCents: breakdown.totalCents,
        taxes: {
          Y1: breakdown.taxes.Y1_regionale.amountCents,
          Y3: breakdown.taxes.Y3_malusCO2.amountCents,
          Y6: breakdown.taxes.Y6_malusPoids.amountCents,
        },
      };
    },
  );

  comparisons.sort((a: RegionComparison, b: RegionComparison) => a.totalCents - b.totalCents);
  return NextResponse.json({ comparisons });
}

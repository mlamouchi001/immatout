import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import type { Prisma } from '@prisma/client';

import { CalculationContextSchema, calculate } from '@immatout/calc';

import { fromZod, serverError } from '@/lib/api/errors';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/calculate
 *
 * Body: CalculationContextSchema (see @immatout/calc).
 * Returns: RegistrationCostBreakdown.
 *
 * Every successful call is persisted in `CalculationLog` for audit /
 * reproducibility. Failures to persist do NOT block the response — the
 * calculation itself is pure and deterministic, so returning it matters
 * more than logging it.
 */
export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return serverError('Malformed JSON body');
  }

  let ctx: ReturnType<typeof CalculationContextSchema.parse>;
  try {
    ctx = CalculationContextSchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) return fromZod(err);
    throw err;
  }

  const breakdown = calculate(ctx);

  // Fire-and-forget audit log.
  void prisma.calculationLog
    .create({
      data: {
        engineVersion: breakdown.metadata.engineVersion,
        scaleVersion: breakdown.metadata.scaleVersion,
        vehicleCase: breakdown.metadata.vehicleCase,
        regionCode: ctx.region,
        input: ctx as unknown as Prisma.InputJsonValue,
        output: breakdown as unknown as Prisma.InputJsonValue,
        totalCents: breakdown.totalCents,
      },
    })
    .catch((err: unknown) => {
      console.error('[api/calculate] audit log failed:', err);
    });

  return NextResponse.json(breakdown);
}

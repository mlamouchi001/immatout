import { NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';

import { badRequest, notFound, serviceUnavailable } from '@/lib/api/errors';
import { prisma } from '@/lib/prisma';
import { getSivProvider } from '@/lib/siv/factory';
import { normalizePlate } from '@/lib/siv/plate';
import { SivNotFoundError, SivUnavailableError } from '@/lib/siv/types';
import type { SivLookupResult } from '@/lib/siv/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/vehicle/[plate]
 *
 * Looks up vehicle characteristics by plate via the configured SIV provider.
 * Results are cached in `SivLookupCache` for `SIV_CACHE_TTL_SECONDS` (30 days
 * by default) to avoid repeat calls to a potentially metered third-party API.
 *
 * Fallback strategy if the provider is unavailable: returns HTTP 503 with a
 * clear code so the UI can transparently switch to manual entry without
 * surfacing a generic error.
 */

const DEFAULT_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ plate: string }> },
): Promise<Response> {
  const { plate: rawPlate } = await ctx.params;
  const normalized = normalizePlate(decodeURIComponent(rawPlate));
  if (!normalized) {
    return badRequest(`Invalid plate format. Accepts SIV (AA-123-BC) or FNI (1234 ZZ 12).`);
  }

  // Cache hit?
  const cached = await prisma.sivLookupCache.findUnique({
    where: { plate: normalized.normalized },
  });
  if (cached && cached.expiresAt > new Date()) {
    return NextResponse.json({
      source: 'cache',
      format: normalized.format,
      plate: normalized.normalized,
      payload: cached.payload,
      cachedAt: cached.fetchedAt.toISOString(),
      expiresAt: cached.expiresAt.toISOString(),
    });
  }

  const provider = getSivProvider();
  let result: SivLookupResult;
  try {
    result = await provider.lookup(normalized.normalized);
  } catch (err) {
    if (err instanceof SivNotFoundError) {
      return notFound(`Plate ${normalized.normalized} not found in SIV`);
    }
    if (err instanceof SivUnavailableError) {
      return serviceUnavailable(
        `SIV provider ${err.provider} unavailable — fall back to manual entry`,
      );
    }
    console.error('[api/vehicle] unexpected SIV error:', err);
    return serviceUnavailable('Unexpected SIV error — fall back to manual entry');
  }

  const ttlSeconds = Number(process.env.SIV_CACHE_TTL_SECONDS ?? DEFAULT_TTL_SECONDS);
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000);

  await prisma.sivLookupCache.upsert({
    where: { plate: normalized.normalized },
    update: {
      provider: provider.name,
      payload: result as unknown as Prisma.InputJsonValue,
      fetchedAt: new Date(),
      expiresAt,
    },
    create: {
      plate: normalized.normalized,
      provider: provider.name,
      payload: result as unknown as Prisma.InputJsonValue,
      expiresAt,
    },
  });

  return NextResponse.json({
    source: 'provider',
    format: normalized.format,
    plate: normalized.normalized,
    payload: result,
    cachedAt: new Date().toISOString(),
    expiresAt: expiresAt.toISOString(),
  });
}

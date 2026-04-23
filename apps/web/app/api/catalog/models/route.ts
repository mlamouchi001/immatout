import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/catalog/models?make=RENAULT
 *
 * Returns the alphabetical list of model names for a given make,
 * filtered to those that have at least one trim.
 */
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const make = url.searchParams.get('make');
  if (!make) {
    return NextResponse.json({ error: 'Missing ?make=', code: 'BAD_REQUEST' }, { status: 400 });
  }

  const normalized = make.trim().toUpperCase();
  const makeRow = await prisma.catalogMake.findUnique({
    where: { name: normalized },
    select: { id: true },
  });
  if (!makeRow) {
    return NextResponse.json({ make: normalized, models: [] });
  }

  const models = await prisma.catalogModel.findMany({
    where: { makeId: makeRow.id, trims: { some: {} } },
    select: { name: true },
    orderBy: { name: 'asc' },
  });
  return NextResponse.json({
    make: normalized,
    models: models.map((m) => m.name),
  });
}

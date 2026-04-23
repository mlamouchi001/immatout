import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/catalog/makes
 *
 * Returns all makes that have at least one model with trims. Sorted
 * alphabetically. Backed by the CatalogMake table (seeded from ADEME + EEA).
 */
export async function GET(): Promise<Response> {
  const makes = await prisma.catalogMake.findMany({
    where: { models: { some: { trims: { some: {} } } } },
    select: { name: true, slug: true, sources: true },
    orderBy: { name: 'asc' },
  });
  return NextResponse.json({ makes: makes.map((m) => m.name), meta: makes });
}

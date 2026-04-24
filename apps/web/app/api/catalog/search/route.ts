import type { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export interface CatalogSearchRow {
  id: number;
  make: string;
  model: string;
  label: string;
  energy: string;
  fiscalCv: number;
  fiscalCvApprox: boolean;
  co2GPerKm: number | null;
  weightKg: number | null;
  powerKw: number | null;
  source: string;
  marketYear: number | null;
}

const PAGE_SIZE = 25;

/**
 * GET /api/catalog/search?q=clio&energy=ES&make=RENAULT&source=ademe&page=0
 *
 * Returns paginated trims with make/model joined. Filters are all optional
 * and combine with AND. Results are ordered by make, model, fiscalCv.
 */
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const q = url.searchParams.get('q')?.trim() ?? '';
  const make = url.searchParams.get('make')?.trim().toUpperCase() ?? '';
  const energy = url.searchParams.get('energy')?.trim().toUpperCase() ?? '';
  const source = url.searchParams.get('source')?.trim().toLowerCase() ?? '';
  const page = Math.max(0, Number(url.searchParams.get('page') ?? 0));

  const where: Prisma.CatalogTrimWhereInput = {};
  if (energy) where.energy = energy;
  if (source) where.source = source;
  if (make) {
    where.model = { make: { name: make } };
  }
  if (q) {
    const qUpper = q.toUpperCase();
    where.OR = [
      { label: { contains: q, mode: 'insensitive' } },
      { model: { name: { contains: qUpper } } },
      { model: { make: { name: { contains: qUpper } } } },
    ];
  }

  const [total, trims] = await Promise.all([
    prisma.catalogTrim.count({ where }),
    prisma.catalogTrim.findMany({
      where,
      orderBy: [
        { model: { make: { name: 'asc' } } },
        { model: { name: 'asc' } },
        { fiscalCv: 'asc' },
        { label: 'asc' },
      ],
      include: { model: { include: { make: true } } },
      take: PAGE_SIZE,
      skip: page * PAGE_SIZE,
    }),
  ]);

  const rows: CatalogSearchRow[] = trims.map((t) => ({
    id: t.id,
    make: t.model.make.name,
    model: t.model.name,
    label: t.label,
    energy: t.energy,
    fiscalCv: t.fiscalCv,
    fiscalCvApprox: t.fiscalCvApprox,
    co2GPerKm: t.co2GPerKm,
    weightKg: t.weightKg,
    powerKw: t.powerKw,
    source: t.source,
    marketYear: t.marketYear,
  }));

  return NextResponse.json({
    total,
    page,
    pageSize: PAGE_SIZE,
    pageCount: Math.ceil(total / PAGE_SIZE),
    rows,
  });
}

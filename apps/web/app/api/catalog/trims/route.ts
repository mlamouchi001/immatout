import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export interface CatalogTrimDto {
  id: string;
  label: string;
  energy: string;
  fiscalCv: number;
  fiscalCvApprox: boolean;
  co2GPerKm: number | null;
  weightKg: number | null;
  powerKw: number | null;
  displacementCc: number | null;
  bodyType: string | null;
  marketYear: number | null;
  source: string;
}

/**
 * GET /api/catalog/trims?make=RENAULT&model=CLIO
 *
 * Returns the list of motorizations for the given (make, model). Sorted by
 * fiscal CV ascending, then by label. Each row carries ADEME or EEA-derived
 * specs and the `fiscalCvApprox` flag so the UI can disclose estimated values.
 */
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const make = url.searchParams.get('make');
  const model = url.searchParams.get('model');
  if (!make || !model) {
    return NextResponse.json(
      { error: 'Missing ?make= or ?model=', code: 'BAD_REQUEST' },
      { status: 400 },
    );
  }

  const normalizedMake = make.trim().toUpperCase();
  const normalizedModel = model.trim().toUpperCase();

  const makeRow = await prisma.catalogMake.findUnique({
    where: { name: normalizedMake },
    select: { id: true },
  });
  if (!makeRow) {
    return NextResponse.json({ make: normalizedMake, model: normalizedModel, trims: [] });
  }
  const modelRow = await prisma.catalogModel.findUnique({
    where: { makeId_name: { makeId: makeRow.id, name: normalizedModel } },
    select: { id: true },
  });
  if (!modelRow) {
    return NextResponse.json({ make: normalizedMake, model: normalizedModel, trims: [] });
  }

  const trims = await prisma.catalogTrim.findMany({
    where: { modelId: modelRow.id },
    orderBy: [{ fiscalCv: 'asc' }, { label: 'asc' }],
  });

  const dtos: CatalogTrimDto[] = trims.map((t) => ({
    id: t.naturalKey,
    label: t.label,
    energy: t.energy,
    fiscalCv: t.fiscalCv,
    fiscalCvApprox: t.fiscalCvApprox,
    co2GPerKm: t.co2GPerKm,
    weightKg: t.weightKg,
    powerKw: t.powerKw,
    displacementCc: t.displacementCc,
    bodyType: t.bodyType,
    marketYear: t.marketYear,
    source: t.source,
  }));

  return NextResponse.json({ make: normalizedMake, model: normalizedModel, trims: dtos });
}

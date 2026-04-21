import { NextResponse } from 'next/server';

import { getRegionsScale, SUPPORTED_SCALE_YEARS } from '@immatout/data';

/**
 * GET /api/regions?year=2026 (default: latest supported)
 *
 * Returns the regional CV-tax grid used by Y1 plus the IDFM surcharge
 * metadata. Useful for the region picker and the multi-region comparator.
 */
export function GET(request: Request): Response {
  const url = new URL(request.url);
  const yearParam = url.searchParams.get('year');
  const year = yearParam
    ? Number(yearParam)
    : SUPPORTED_SCALE_YEARS[SUPPORTED_SCALE_YEARS.length - 1]!;

  if (!SUPPORTED_SCALE_YEARS.includes(year)) {
    return NextResponse.json(
      {
        error: `Unsupported scale year ${year}. Supported: ${SUPPORTED_SCALE_YEARS.join(', ')}`,
        code: 'BAD_REQUEST',
      },
      { status: 400 },
    );
  }

  const scale = getRegionsScale(year);
  return NextResponse.json({
    scaleYear: scale.scaleYear,
    publishedAt: scale.publishedAt,
    source: scale.source,
    idfm: {
      surchargeEurosPerCv: scale.idfmSurchargeEurosPerCv,
      startsAt: scale.idfmSurchargeStartsAt,
    },
    regions: scale.regions,
  });
}

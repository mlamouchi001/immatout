import { NextResponse } from 'next/server';

import { listModels } from '@immatout/vehicle-catalog';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/catalog/models?make=RENAULT
 * Returns the list of model names for a given make. Empty array if the
 * make has no ADEME coverage (e.g. vPIC-only brands).
 */
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const make = url.searchParams.get('make');
  if (!make) {
    return NextResponse.json({ error: 'Missing ?make=', code: 'BAD_REQUEST' }, { status: 400 });
  }
  return NextResponse.json({ make, models: listModels(make) });
}

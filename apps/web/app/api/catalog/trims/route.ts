import { NextResponse } from 'next/server';

import { listTrims } from '@immatout/vehicle-catalog';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/catalog/trims?make=RENAULT&model=CLIO
 * Returns the list of trim/motorization rows from ADEME, each carrying the
 * fiscal power (CV), WLTP CO2 (g/km), and kerb mass (kg) needed for the
 * carte-grise calculation.
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
  return NextResponse.json({ make, model, trims: listTrims(make, model) });
}

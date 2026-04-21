import { NextResponse } from 'next/server';

import { listMakes } from '@immatout/vehicle-catalog';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/catalog/makes
 * Returns the alphabetical list of vehicle makes present in the merged
 * ADEME + vPIC catalog.
 */
export async function GET(): Promise<Response> {
  return NextResponse.json({ makes: listMakes() });
}

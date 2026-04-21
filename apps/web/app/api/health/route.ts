import { NextResponse } from 'next/server';
import { ENGINE_VERSION } from '@immatout/calc';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json({
    status: 'ok',
    engineVersion: ENGINE_VERSION,
    timestamp: new Date().toISOString(),
  });
}

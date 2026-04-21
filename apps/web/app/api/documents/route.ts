import { NextResponse } from 'next/server';

import { getRequiredDocuments } from '@immatout/data';

import { VehicleCaseSchema } from '@immatout/calc';

/**
 * GET /api/documents?case=FR_NEW
 *
 * Returns the list of official documents the user must provide for the given
 * vehicle case, sourced from service-public.gouv.fr and bundled in
 * packages/data/scales/required-documents.json.
 *
 * Omit the `case` query param to receive the full map.
 */
export function GET(request: Request): Response {
  const url = new URL(request.url);
  const caseParam = url.searchParams.get('case');
  const documents = getRequiredDocuments();

  if (!caseParam) {
    return NextResponse.json(documents);
  }

  const parsed = VehicleCaseSchema.safeParse(caseParam);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: `Unknown vehicle case "${caseParam}". Expected one of: ${VehicleCaseSchema.options.join(', ')}`,
        code: 'BAD_REQUEST',
      },
      { status: 400 },
    );
  }

  const list = documents[parsed.data];
  if (!list) {
    return NextResponse.json(
      { error: `No documents configured for case ${parsed.data}`, code: 'NOT_FOUND' },
      { status: 404 },
    );
  }

  return NextResponse.json({ vehicleCase: parsed.data, documents: list });
}

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

/** Standard problem+json-ish error body used across every API route. */
export interface ApiError {
  error: string;
  code: string;
  details?: unknown;
}

export function badRequest(message: string, details?: unknown): NextResponse<ApiError> {
  return NextResponse.json({ error: message, code: 'BAD_REQUEST', details }, { status: 400 });
}

export function notFound(message: string): NextResponse<ApiError> {
  return NextResponse.json({ error: message, code: 'NOT_FOUND' }, { status: 404 });
}

export function serverError(message: string, details?: unknown): NextResponse<ApiError> {
  return NextResponse.json({ error: message, code: 'INTERNAL_ERROR', details }, { status: 500 });
}

export function serviceUnavailable(message: string, details?: unknown): NextResponse<ApiError> {
  return NextResponse.json(
    { error: message, code: 'SERVICE_UNAVAILABLE', details },
    { status: 503 },
  );
}

/**
 * Formats a Zod error into a flat, UI-friendly list of field errors.
 * Returns an HTTP 400.
 */
export function fromZod(err: ZodError): NextResponse<ApiError> {
  return badRequest(
    'Validation error',
    err.issues.map((i) => ({
      path: i.path.join('.'),
      message: i.message,
      code: i.code,
    })),
  );
}

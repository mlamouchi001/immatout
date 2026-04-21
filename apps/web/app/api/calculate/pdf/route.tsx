import { renderToBuffer } from '@react-pdf/renderer';
import { ZodError } from 'zod';

import { CalculationContextSchema, calculate } from '@immatout/calc';

import { fromZod } from '@/lib/api/errors';
import { QuoteDocument } from '@/lib/pdf/quote-document';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/calculate/pdf
 *
 * Same body as /api/calculate. Returns a PDF `application/pdf` attachment
 * rendered server-side with @react-pdf/renderer.
 */
export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response('Malformed JSON', { status: 400 });
  }

  let ctx;
  try {
    ctx = CalculationContextSchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) return fromZod(err);
    throw err;
  }

  const breakdown = calculate(ctx);
  const buffer = await renderToBuffer(<QuoteDocument input={ctx} breakdown={breakdown} />);

  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="immatout-devis.pdf"',
    },
  });
}

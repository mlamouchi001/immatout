import { describe, expect, it } from 'vitest';

import { GET } from '@/app/api/documents/route';

function req(url: string): Request {
  return new Request(`http://test${url}`);
}

describe('GET /api/documents', () => {
  it('returns the full map when no case is given', async () => {
    const res = GET(req('/api/documents'));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(Object.keys(body)).toEqual(
      expect.arrayContaining([
        'FR_NEW',
        'FR_USED',
        'IMPORT_EU_NEW',
        'IMPORT_EU_USED',
        'IMPORT_NON_EU_NEW',
        'IMPORT_NON_EU_USED',
      ]),
    );
  });

  it('returns the list for a specific case', async () => {
    const res = GET(req('/api/documents?case=IMPORT_EU_USED'));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.vehicleCase).toBe('IMPORT_EU_USED');
    expect(body.documents.map((d: { id: string }) => d.id)).toEqual(
      expect.arrayContaining(['quitus', 'foreign-reg', 'coc']),
    );
  });

  it('rejects an unknown case with 400', async () => {
    const res = GET(req('/api/documents?case=FOO'));
    expect(res.status).toBe(400);
  });
});

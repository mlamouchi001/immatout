import { describe, expect, it } from 'vitest';

import { GET } from '@/app/api/regions/route';

function req(url: string): Request {
  return new Request(`http://test${url}`);
}

describe('GET /api/regions', () => {
  it('returns the 2026 scale by default with 18 regions', async () => {
    const res = GET(req('/api/regions'));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.scaleYear).toBe(2026);
    expect(body.regions).toHaveLength(18);
    expect(body.idfm.surchargeEurosPerCv).toBe(14);
  });

  it('rejects an unsupported year with 400', async () => {
    const res = GET(req('/api/regions?year=2019'));
    expect(res.status).toBe(400);
  });
});

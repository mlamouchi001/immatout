import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createFakePrisma } from './setup';

const fake = createFakePrisma();

vi.mock('@/lib/prisma', () => ({ prisma: fake.prisma }));

const { GET } = await import('@/app/api/vehicle/[plate]/route');

async function get(plate: string): Promise<Response> {
  return GET(new Request(`http://test/api/vehicle/${plate}`), {
    params: Promise.resolve({ plate }),
  });
}

describe('GET /api/vehicle/[plate]', () => {
  beforeEach(() => {
    fake.state.sivLookupCache.clear();
  });

  it('returns mock payload for a known plate and caches it', async () => {
    const res = await get('AA-123-BC');
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.source).toBe('provider');
    expect(body.payload.make).toBe('Peugeot');
    expect(body.payload.fiscalHorsepower).toBe(7);
    expect(fake.state.sivLookupCache.size).toBe(1);
  });

  it('returns cached payload on subsequent call', async () => {
    await get('AA-123-BC');
    const res = await get('AA-123-BC');
    const body = await res.json();
    expect(body.source).toBe('cache');
  });

  it('normalizes plate format (lowercase/spaces accepted)', async () => {
    const res = await get('aa 123 bc');
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.plate).toBe('AA-123-BC');
  });

  it('returns 404 for unknown plates', async () => {
    const res = await get('XX-999-XX');
    expect(res.status).toBe(404);
  });

  it('returns 400 for malformed plates', async () => {
    const res = await get('not-a-plate');
    expect(res.status).toBe(400);
  });
});

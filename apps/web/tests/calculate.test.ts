import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createFakePrisma } from './setup';

const fake = createFakePrisma();

vi.mock('@/lib/prisma', () => ({ prisma: fake.prisma }));

// Import AFTER the mock is registered.
const { POST } = await import('@/app/api/calculate/route');

function jsonRequest(body: unknown): Request {
  return new Request('http://test/api/calculate', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/calculate', () => {
  beforeEach(() => {
    fake.state.calculationLog.length = 0;
  });

  it('returns a full breakdown for a valid body', async () => {
    const res = await POST(
      jsonRequest({
        vehicle: {
          genre: 'VP',
          energy: 'ESSENCE',
          fiscalHorsepower: 7,
          firstRegistrationDate: '2026-02-01',
          co2WltpGPerKm: 130,
          massInRunningOrderKg: 1400,
        },
        vehicleCase: 'FR_NEW',
        region: 'PAC',
        registrationDate: '2026-04-19',
        household: { dependentChildren: 0, hasDisabilityCard: false, isLegalEntity: false },
      }),
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    // Peugeot 308 baseline (cf. golden-cases fr-new-vp-pac-berline)
    expect(body.totalCents).toBe(141676);
    expect(body.taxes.Y1_regionale.amountCents).toBe(42000);
    expect(body.taxes.Y3_malusCO2.amountCents).toBe(98300);
  });

  it('persists the audit log on success', async () => {
    await POST(
      jsonRequest({
        vehicle: {
          genre: 'VP',
          energy: 'ELECTRIC',
          fiscalHorsepower: 4,
          firstRegistrationDate: '2026-01-01',
          co2WltpGPerKm: 0,
          massInRunningOrderKg: 1500,
        },
        vehicleCase: 'FR_NEW',
        region: 'ARA',
        registrationDate: '2026-04-19',
        household: { dependentChildren: 0, hasDisabilityCard: false, isLegalEntity: false },
      }),
    );

    // Audit log is fire-and-forget — wait a tick for it to land.
    await new Promise((r) => setImmediate(r));
    expect(fake.state.calculationLog).toHaveLength(1);
    expect(fake.state.calculationLog[0]).toMatchObject({
      regionCode: 'ARA',
      vehicleCase: 'FR_NEW',
      totalCents: 1376,
    });
  });

  it('returns 400 for invalid body (bad region code)', async () => {
    const res = await POST(
      jsonRequest({
        vehicle: {
          genre: 'VP',
          energy: 'ESSENCE',
          fiscalHorsepower: 7,
          firstRegistrationDate: '2026-02-01',
          co2WltpGPerKm: 130,
          massInRunningOrderKg: 1400,
        },
        vehicleCase: 'FR_NEW',
        region: 'ZZZ',
        registrationDate: '2026-04-19',
        household: { dependentChildren: 0, hasDisabilityCard: false, isLegalEntity: false },
      }),
    );

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.code).toBe('BAD_REQUEST');
    expect(body.details).toEqual(
      expect.arrayContaining([expect.objectContaining({ path: 'region' })]),
    );
  });

  it('returns 400 for missing required fields', async () => {
    const res = await POST(jsonRequest({ vehicleCase: 'FR_NEW' }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.code).toBe('BAD_REQUEST');
  });
});

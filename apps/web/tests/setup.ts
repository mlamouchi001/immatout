/**
 * Test setup: mock `@/lib/prisma` with an in-memory fake so API routes can be
 * invoked without a running Postgres. Keeps tests hermetic.
 */

import { vi } from 'vitest';

type Row = Record<string, unknown>;

export interface FakePrismaState {
  sivLookupCache: Map<string, Row>;
  calculationLog: Row[];
}

export function createFakePrisma(): { state: FakePrismaState; prisma: unknown } {
  const state: FakePrismaState = {
    sivLookupCache: new Map(),
    calculationLog: [],
  };

  const prisma = {
    sivLookupCache: {
      findUnique: vi.fn(async ({ where }: { where: { plate: string } }) => {
        return state.sivLookupCache.get(where.plate) ?? null;
      }),
      upsert: vi.fn(
        async ({
          where,
          update,
          create,
        }: {
          where: { plate: string };
          update: Row;
          create: Row;
        }) => {
          const existing = state.sivLookupCache.get(where.plate);
          const base = existing ? { ...existing, ...update } : { fetchedAt: new Date(), ...create };
          // The real Prisma @default(now()) fills fetchedAt on create; mirror it.
          if (!('fetchedAt' in base) || base.fetchedAt === undefined) {
            base.fetchedAt = new Date();
          }
          state.sivLookupCache.set(where.plate, base);
          return base;
        },
      ),
    },
    calculationLog: {
      create: vi.fn(async ({ data }: { data: Row }) => {
        const row = { id: `cuid_${state.calculationLog.length}`, ...data };
        state.calculationLog.push(row);
        return row;
      }),
    },
  };

  return { state, prisma };
}

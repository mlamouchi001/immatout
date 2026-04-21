/**
 * Factory that resolves an `ISivProvider` based on `SIV_API_PROVIDER` env.
 *
 * Today only the mock is implemented. To wire a real provider later:
 *   1. create `lib/siv/<name>-provider.ts` implementing ISivProvider
 *   2. add a case in the switch below
 *   3. document its env vars in `.env.example`
 */

import { MockSivProvider } from './mock-provider';
import type { ISivProvider } from './types';

let cached: ISivProvider | null = null;

export function getSivProvider(): ISivProvider {
  if (cached) return cached;

  const provider = (process.env.SIV_API_PROVIDER ?? 'mock').toLowerCase();
  switch (provider) {
    case 'mock':
      cached = new MockSivProvider();
      return cached;
    default:
      throw new Error(`Unknown SIV_API_PROVIDER="${provider}". Supported providers: mock.`);
  }
}

/** Reset the memoized provider — tests use this to swap envs between cases. */
export function resetSivProvider(): void {
  cached = null;
}

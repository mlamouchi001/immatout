import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for the E2E suite. Tests live in `e2e/`, isolated from
 * the Vitest integration tests in `tests/`.
 *
 * The suite spawns a Next.js dev server on port 4321 to avoid colliding with
 * the 3000/3003 range where other local projects already run.
 */
const PORT = 4321;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  retries: process.env.CI ? 2 : 0,
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report' }]],
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `pnpm dev --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { SIV_API_PROVIDER: 'mock' },
  },
});

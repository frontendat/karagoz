import { defineConfig, devices } from '@playwright/test'

// `nuxt preview` runs `wrangler dev` on the production build (Cloudflare module preset), so the real route-rule
// COOP/COEP headers apply. Wrangler's default port is the only one it offers through the preview command.
const baseURL = 'http://localhost:8787'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm exec nuxt preview',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      // Never boots a WebContainer (see `e2e/fixtures.ts`), so it is deterministic: no retries.
      name: 'blocking',
      testDir: './e2e/blocking',
      retries: 0,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      // Boots the real WebContainer, so it needs outbound access to the StackBlitz hosts and is advisory. StackBlitz-side
      // flake is absorbed by the retries. One worker: only one WebContainer can run per browser anyway, and parallel
      // boots against the same hosts would only add load. The global timeout is set by the `e2e:smoke` script.
      name: 'smoke',
      testDir: './e2e/smoke',
      retries: 2,
      timeout: 60_000,
      workers: 1,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})

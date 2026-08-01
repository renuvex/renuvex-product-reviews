import { defineConfig } from '@playwright/test';

const dashboardOrigin = 'http://127.0.0.1:3211';
const harnessOrigin = 'http://127.0.0.1:3212';

export default defineConfig({
  testDir: './tests',
  testMatch: /admin-dashboard-contract\.spec\.ts/,
  timeout: 45_000,
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: process.env.CI ? [['list'], ['github']] : 'list',
  webServer: [
    {
      command: 'node scripts/run-ci-start.mjs',
      env: {
        ...process.env,
        RENUVEX_CI_HOSTNAME: '127.0.0.1',
        RENUVEX_CI_PORT: '3211',
      },
      name: 'Renuvex production server',
      url: `${dashboardOrigin}/dashboard`,
      timeout: 120_000,
      reuseExistingServer: false,
    },
    {
      command: 'node tests/admin-dashboard-harness-server.mjs',
      env: {
        ...process.env,
        RENUVEX_ADMIN_DASHBOARD_ORIGIN: dashboardOrigin,
        RENUVEX_ADMIN_HARNESS_HOSTNAME: '127.0.0.1',
        RENUVEX_ADMIN_HARNESS_PORT: '3212',
      },
      name: 'Cross-origin AppBridge harness',
      url: `${harnessOrigin}/__health`,
      timeout: 30_000,
      reuseExistingServer: false,
    },
  ],
  use: {
    baseURL: harnessOrigin,
    browserName: 'chromium',
    headless: true,
    serviceWorkers: 'block',
    viewport: { width: 1440, height: 1000 },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
});

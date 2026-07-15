import { defineConfig, devices } from '@playwright/test';

const port = 3210;

export default defineConfig({
  testDir: './tests',
  testMatch: /review-center-browser\.spec\.ts/,
  timeout: 90_000,
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['github']] : 'list',
  webServer: {
    command: `node node_modules/next/dist/bin/next dev --webpack --port ${port}`,
    url: `http://localhost:${port}/widget-runtime/build-manifest.json`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      ...process.env,
      REVIEW_EMAIL_ENABLED: 'true',
    },
  },
  use: {
    ...devices['Desktop Chrome'],
    baseURL: `http://localhost:${port}`,
    headless: true,
    trace: process.env.CI ? 'on-first-retry' : 'off',
    screenshot: 'only-on-failure',
  },
});

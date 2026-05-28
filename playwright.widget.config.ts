import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: /widget-network-smoke\.spec\.ts/,
  timeout: 30_000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['github']] : 'list',
  use: {
    browserName: 'chromium',
    headless: true,
    ignoreHTTPSErrors: true,
    viewport: { width: 1280, height: 900 },
    trace: 'retain-on-failure',
  },
});

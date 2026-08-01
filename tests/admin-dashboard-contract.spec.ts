import { expect, test, type FrameLocator } from '@playwright/test';
import {
  AUTHORIZED_APP_ID,
  DASHBOARD_ORIGIN,
  buildSyntheticAdminJwt,
  duplicateRequestKeys,
  getHarnessCounts,
  openAdminHarness,
  requestsFor,
  setupAdminDashboardRoutes,
} from './admin-dashboard-harness';

async function expectDashboardReady(dashboard: FrameLocator) {
  await expect(dashboard.getByRole('heading', { name: 'Değerlendirmeler' })).toBeVisible();
  await expect(dashboard.getByText('Kanıt Mağazası', { exact: true })).toBeVisible();
  await expect(dashboard.getByText('İlk Müşteri', { exact: true })).toBeVisible();
}

test('cold iframe start waits for AppBridge and performs one authorized bootstrap', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page);
  const dashboard = await openAdminHarness(page);

  await expectDashboardReady(dashboard);
  await expect.poll(() => requestsFor(log, 'GET', '/api/admin/reviews').length).toBe(5);

  const counts = await getHarnessCounts(page);
  expect(counts.CLOSE_LOADER).toBe(1);
  expect(counts.REQUEST_TOKEN).toBe(1);
  expect(requestsFor(log, 'GET', '/api/ikas/get-merchant')).toHaveLength(1);
  expect(requestsFor(log, 'POST', '/api/admin/storefront-theme/sync')).toEqual([
    expect.objectContaining({ body: { reason: 'dashboard_open' } }),
  ]);
  expect(requestsFor(log, 'GET', '/api/admin/settings')).toHaveLength(0);
  expect(duplicateRequestKeys(log.apiRequests)).toEqual([]);
  expect(log.authorizationFailures).toEqual([]);
  expect(log.unexpectedRequests).toEqual([]);
});

test('valid authorized-app cache avoids a token request', async ({ page }) => {
  const cachedToken = buildSyntheticAdminJwt();
  await page.context().addInitScript(({ dashboardOrigin, storageKey, token }) => {
    if (window.location.origin === dashboardOrigin) sessionStorage.setItem(storageKey, token);
  }, {
    dashboardOrigin: DASHBOARD_ORIGIN,
    storageKey: `token-${AUTHORIZED_APP_ID}`,
    token: cachedToken,
  });
  const log = await setupAdminDashboardRoutes(page);
  const dashboard = await openAdminHarness(page);

  await expectDashboardReady(dashboard);
  const counts = await getHarnessCounts(page);
  expect(counts.CLOSE_LOADER).toBe(1);
  expect(counts.REQUEST_TOKEN).toBe(0);
  expect(log.authorizationFailures).toEqual([]);
  expect(log.unexpectedRequests).toEqual([]);
});

for (const scenario of ['missing-id', 'missing-token'] as const) {
  test(`${scenario} fails closed without starting admin APIs`, async ({ page }) => {
    const log = await setupAdminDashboardRoutes(page);
    const dashboard = await openAdminHarness(page, scenario);

    await expect(dashboard.getByRole('heading', { name: 'Authentication Required' })).toBeVisible();
    const counts = await getHarnessCounts(page);
    expect(counts.CLOSE_LOADER).toBe(1);
    expect(counts.REQUEST_TOKEN).toBe(scenario === 'missing-token' ? 1 : 0);
    expect(log.apiRequests).toEqual([]);
    expect(log.unexpectedRequests).toEqual([]);
  });
}

test('top-level dashboard access fails closed without a dev credential', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page);
  await page.goto(`${DASHBOARD_ORIGIN}/dashboard`, { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('heading', { name: 'Authentication Required' })).toBeVisible();
  expect(log.apiRequests).toEqual([]);
  expect(log.authorizationFailures).toEqual([]);
  expect(log.unexpectedRequests).toEqual([]);
});

test('pagination and moderation preserve visible review behavior', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page);
  const dashboard = await openAdminHarness(page);
  await expectDashboardReady(dashboard);

  await dashboard.getByRole('button', { name: '2', exact: true }).click();
  await expect(dashboard.getByText('İkinci Sayfa Müşterisi', { exact: true })).toBeVisible();
  expect(log.apiRequests.filter((request) => request.method === 'GET' && request.path.includes('page=2'))).toHaveLength(1);

  await dashboard.getByRole('button', { name: '1', exact: true }).click();
  await expect(dashboard.getByText('İlk Müşteri', { exact: true })).toBeVisible();
  const actionStart = log.apiRequests.length;
  await dashboard.getByRole('button', { name: 'Onayla', exact: true }).click();

  await expect(dashboard.getByText('Sonraki Müşteri', { exact: true })).toBeVisible();
  const actionRequests = log.apiRequests.slice(actionStart);
  expect(actionRequests.filter((request) => request.method === 'PUT' && request.path === '/api/admin/reviews')).toEqual([
    expect.objectContaining({ body: { id: 'review-1', status: 'approved' } }),
  ]);
  expect(duplicateRequestKeys(actionRequests)).toEqual([]);
  expect(log.unexpectedRequests).toEqual([]);
});

test('widget settings load lazily, remain cached across tabs, and save through the preview protocol', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page);
  const dashboard = await openAdminHarness(page);
  await expectDashboardReady(dashboard);
  expect(requestsFor(log, 'GET', '/api/admin/settings')).toHaveLength(0);

  await dashboard.getByRole('tab', { name: 'Widgetlar' }).click();
  await expect.poll(() => requestsFor(log, 'GET', '/api/admin/settings').length).toBe(1);
  await expect(dashboard.getByText('Ürün Yorumları', { exact: true }).first()).toBeVisible();

  await dashboard.getByRole('tab', { name: 'Yorumlar' }).click();
  await dashboard.getByRole('tab', { name: 'Widgetlar' }).click();
  expect(requestsFor(log, 'GET', '/api/admin/settings')).toHaveLength(1);

  await dashboard.getByRole('button', { name: 'Özelleştir' }).first().click();
  const preview = dashboard.frameLocator('iframe[title="Widget Önizleme"]');
  await expect.poll(async () => Number(await preview.locator('body').getAttribute('data-render-count'))).toBeGreaterThan(0);
  await dashboard.getByRole('button', { name: 'Metin', exact: true }).click();
  await dashboard.getByRole('textbox', { name: 'Widget Başlığı' }).fill('Doğrulanmış Başlık');
  await dashboard.getByRole('button', { name: 'Kaydet', exact: true }).click();

  await expect.poll(() => requestsFor(log, 'PUT', '/api/admin/settings').length).toBe(1);
  expect(requestsFor(log, 'PUT', '/api/admin/settings')).toEqual([
    expect.objectContaining({
      body: expect.objectContaining({
        widgetId: 'reviews',
        settings: expect.objectContaining({ title: 'Doğrulanmış Başlık' }),
      }),
    }),
  ]);
  expect(requestsFor(log, 'GET', '/api/admin/settings')).toHaveLength(1);
  expect(log.previewRequests).toHaveLength(1);
  expect(log.unexpectedRequests).toEqual([]);
});

test('failed widget settings load retries only after the explicit user action', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page, { settingsFailures: 1 });
  const dashboard = await openAdminHarness(page);
  await expectDashboardReady(dashboard);

  await dashboard.getByRole('tab', { name: 'Widgetlar' }).click();
  await expect.poll(() => requestsFor(log, 'GET', '/api/admin/settings').length).toBe(1);
  await dashboard.getByRole('button', { name: 'Özelleştir' }).first().click();
  await expect(dashboard.getByRole('alert').filter({ hasText: 'Ayarlar yüklenemedi' })).toBeVisible();
  expect(requestsFor(log, 'GET', '/api/admin/settings')).toHaveLength(1);

  await dashboard.getByRole('button', { name: 'Tekrar Dene' }).click();
  await expect.poll(() => requestsFor(log, 'GET', '/api/admin/settings').length).toBe(2);
  await expect(dashboard.getByRole('heading', { name: 'Ürün Yorumları' })).toBeVisible();
  expect(log.unexpectedRequests).toEqual([]);
});

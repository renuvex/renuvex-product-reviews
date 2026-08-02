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

async function expectWorkspaceChrome(dashboard: FrameLocator) {
  await expect(dashboard.getByRole('navigation', { name: 'Yönetim alanları' })).toBeVisible();
  await expect(dashboard.getByRole('heading', { name: 'Değerlendirmeler' })).toBeVisible();
}

async function expectFocusedEditorChrome(dashboard: FrameLocator) {
  await expect(dashboard.getByRole('navigation', { name: 'Yönetim alanları' })).toHaveCount(0);
  await expect(dashboard.getByRole('heading', { name: 'Değerlendirmeler' })).toHaveCount(0);
  const [documentBounds, workspaceBounds] = await Promise.all([
    dashboard.locator('body').boundingBox(),
    dashboard.locator('main').boundingBox(),
  ]);
  expect(documentBounds).not.toBeNull();
  expect(workspaceBounds).not.toBeNull();
  expect(workspaceBounds!.width / documentBounds!.width).toBeGreaterThanOrEqual(0.98);
}

async function expectReviewCounts(
  dashboard: FrameLocator,
  counts: { pending: number; approved: number; rejected: number; total: number },
) {
  await expect(dashboard.getByRole('button', { name: `Onay Bekleyen Yorumlar (${counts.pending})` })).toBeVisible();
  await expect(dashboard.getByRole('button', { name: `Onaylanan Yorumlar (${counts.approved})` })).toBeVisible();
  await expect(dashboard.getByRole('button', { name: `Reddedilen Yorumlar (${counts.rejected})` })).toBeVisible();
  await expect(dashboard.getByRole('button', { name: `Tüm Yorumlar (${counts.total})` })).toBeVisible();
}

test('cold iframe start waits for AppBridge and performs one authorized bootstrap', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page);
  const dashboard = await openAdminHarness(page, 'success', '/');

  await expectDashboardReady(dashboard);
  await expect.poll(() => requestsFor(log, 'GET', '/api/admin/reviews/summary').length).toBe(1);
  await expect.poll(() => page.frames().some((frame) => new URL(frame.url()).pathname === '/dashboard/reviews')).toBe(true);

  const counts = await getHarnessCounts(page);
  expect(counts.CLOSE_LOADER).toBe(1);
  expect(counts.REQUEST_TOKEN).toBe(1);
  expect(requestsFor(log, 'GET', '/api/admin/reviews')).toHaveLength(1);
  expect(requestsFor(log, 'GET', '/api/admin/reviews/summary')).toHaveLength(1);
  expect(requestsFor(log, 'GET', '/api/ikas/get-merchant')).toHaveLength(1);
  expect(requestsFor(log, 'POST', '/api/admin/storefront-theme/sync')).toEqual([
    expect.objectContaining({ body: { reason: 'dashboard_open' } }),
  ]);
  expect(requestsFor(log, 'GET', '/api/admin/settings')).toHaveLength(0);
  expect(log.apiRequests).toHaveLength(4);
  expect(duplicateRequestKeys(log.apiRequests)).toEqual([]);
  expect(log.authorizationFailures).toEqual([]);
  expect(log.unexpectedRequests).toEqual([]);
});

test('review data does not wait for the independent merchant request', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page, { merchantDelayMs: 3_000 });
  const dashboard = await openAdminHarness(page);

  await expect(dashboard.getByText('İlk Müşteri', { exact: true })).toBeVisible();
  expect(log.merchantCompletions).toBe(0);
  await expect(dashboard.getByText('Kanıt Mağazası', { exact: true })).toBeVisible();
  expect(log.merchantCompletions).toBe(1);
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

  await dashboard.getByRole('button', { name: 'Onaylanan Yorumlar (4)' }).click();
  await expect(dashboard.getByText('Onaylı Müşteri', { exact: true })).toBeVisible();
  expect(requestsFor(log, 'GET', '/api/admin/reviews/summary')).toHaveLength(1);

  await dashboard.getByRole('button', { name: 'Onay Bekleyen Yorumlar (21)' }).click();
  await expect(dashboard.getByText('İlk Müşteri', { exact: true })).toBeVisible();

  await dashboard.getByRole('button', { name: '2', exact: true }).click();
  await expect(dashboard.getByText('İkinci Sayfa Müşterisi', { exact: true })).toBeVisible();
  expect(log.apiRequests.filter((request) => request.method === 'GET' && request.path.includes('page=2'))).toHaveLength(1);

  await dashboard.getByRole('button', { name: '1', exact: true }).click();
  await expect(dashboard.getByText('İlk Müşteri', { exact: true })).toBeVisible();
  await dashboard.getByRole('combobox', { name: 'Satır adedi' }).selectOption('50');
  await expect.poll(() => log.apiRequests.some((request) => (
    request.method === 'GET' && request.path.includes('limit=50')
  ))).toBe(true);
  expect(requestsFor(log, 'GET', '/api/admin/reviews/summary')).toHaveLength(1);
  const actionStart = log.apiRequests.length;
  await dashboard.getByRole('button', { name: 'Onayla', exact: true }).click();

  await expect(dashboard.getByText('Sonraki Müşteri', { exact: true })).toBeVisible();
  const actionRequests = log.apiRequests.slice(actionStart);
  expect(actionRequests.filter((request) => request.method === 'PUT' && request.path === '/api/admin/reviews')).toEqual([
    expect.objectContaining({ body: { id: 'review-1', status: 'approved' } }),
  ]);
  expect(requestsFor({ ...log, apiRequests: actionRequests }, 'GET', '/api/admin/reviews')).toHaveLength(1);
  expect(requestsFor({ ...log, apiRequests: actionRequests }, 'GET', '/api/admin/reviews/summary')).toHaveLength(1);
  await expectReviewCounts(dashboard, { pending: 20, approved: 5, rejected: 2, total: 27 });
  expect(duplicateRequestKeys(actionRequests)).toEqual([]);
  expect(log.unexpectedRequests).toEqual([]);
});

test('202 moderation refreshes list and summary without assuming final approval', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page, { moderationStatus: 202 });
  const dashboard = await openAdminHarness(page);
  await expectDashboardReady(dashboard);
  await expect.poll(() => requestsFor(log, 'GET', '/api/admin/reviews/summary').length).toBe(1);

  const actionStart = log.apiRequests.length;
  await dashboard.getByRole('button', { name: 'Onayla', exact: true }).click();
  await expect.poll(() => requestsFor(log, 'GET', '/api/admin/reviews/summary').length).toBe(2);
  await expect(dashboard.getByText('İlk Müşteri', { exact: true })).toBeVisible();

  const actionRequests = log.apiRequests.slice(actionStart);
  expect(actionRequests.filter((request) => request.method === 'PUT' && request.path === '/api/admin/reviews')).toHaveLength(1);
  expect(requestsFor({ ...log, apiRequests: actionRequests }, 'GET', '/api/admin/reviews')).toHaveLength(1);
  expect(requestsFor({ ...log, apiRequests: actionRequests }, 'GET', '/api/admin/reviews/summary')).toHaveLength(1);
  await expectReviewCounts(dashboard, { pending: 21, approved: 4, rejected: 2, total: 27 });
});

test('an older delayed summary cannot overwrite the newer moderation result', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page, { summaryDelaysMs: [400, 0] });
  const dashboard = await openAdminHarness(page);
  await expectDashboardReady(dashboard);

  await dashboard.getByRole('button', { name: 'Onayla', exact: true }).click();
  await expect.poll(() => log.summaryCompletions).toEqual([
    { call: 2, status: 200 },
    { call: 1, status: 200 },
  ]);
  await expectReviewCounts(dashboard, { pending: 20, approved: 5, rejected: 2, total: 27 });
});

test('a failed latest summary preserves the last verified counters', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page, { summaryFailureCalls: [2] });
  const dashboard = await openAdminHarness(page);
  await expectDashboardReady(dashboard);
  await expectReviewCounts(dashboard, { pending: 21, approved: 4, rejected: 2, total: 27 });

  await dashboard.getByRole('button', { name: 'Onayla', exact: true }).click();
  await expect.poll(() => log.summaryCompletions).toEqual([
    { call: 1, status: 200 },
    { call: 2, status: 500 },
  ]);
  await expect(dashboard.getByText('Sonraki Müşteri', { exact: true })).toBeVisible();
  await expectReviewCounts(dashboard, { pending: 21, approved: 4, rejected: 2, total: 27 });
});

test('failed moderation does not refresh the summary', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page, { moderationStatus: 500 });
  const dashboard = await openAdminHarness(page);
  await expectDashboardReady(dashboard);
  await expect.poll(() => log.summaryCompletions).toHaveLength(1);

  await dashboard.getByRole('button', { name: 'Onayla', exact: true }).click();
  await expect.poll(() => requestsFor(log, 'PUT', '/api/admin/reviews').length).toBe(1);
  await expect(dashboard.getByRole('button', { name: 'Onayla', exact: true })).toBeEnabled();
  expect(requestsFor(log, 'GET', '/api/admin/reviews/summary')).toHaveLength(1);
});

test('successful deletion refreshes list and summary once', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page);
  const dashboard = await openAdminHarness(page);
  await expectDashboardReady(dashboard);
  await expect.poll(() => log.summaryCompletions).toHaveLength(1);

  const actionStart = log.apiRequests.length;
  await dashboard.getByRole('button', { name: 'Yorum işlemleri' }).click();
  await dashboard.getByRole('menuitem', { name: 'Yorumu sil' }).click();
  await dashboard.getByRole('button', { name: 'Sil', exact: true }).click();

  await expect(dashboard.getByText('Sonraki Müşteri', { exact: true })).toBeVisible();
  const actionRequests = log.apiRequests.slice(actionStart);
  expect(requestsFor({ ...log, apiRequests: actionRequests }, 'DELETE', '/api/admin/reviews')).toHaveLength(1);
  expect(requestsFor({ ...log, apiRequests: actionRequests }, 'GET', '/api/admin/reviews')).toHaveLength(1);
  expect(requestsFor({ ...log, apiRequests: actionRequests }, 'GET', '/api/admin/reviews/summary')).toHaveLength(1);
  await expectReviewCounts(dashboard, { pending: 20, approved: 4, rejected: 2, total: 26 });
});

test('failed deletion refreshes only the list and keeps the verified summary', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page, { deletionStatus: 500 });
  const dashboard = await openAdminHarness(page);
  await expectDashboardReady(dashboard);
  await expect.poll(() => log.summaryCompletions).toHaveLength(1);

  await dashboard.getByRole('button', { name: 'Yorum işlemleri' }).click();
  await dashboard.getByRole('menuitem', { name: 'Yorumu sil' }).click();
  await dashboard.getByRole('button', { name: 'Sil', exact: true }).click();
  await expect.poll(() => requestsFor(log, 'DELETE', '/api/admin/reviews').length).toBe(1);
  await expect.poll(() => requestsFor(log, 'GET', '/api/admin/reviews').length).toBe(2);

  expect(requestsFor(log, 'GET', '/api/admin/reviews/summary')).toHaveLength(1);
  await expectReviewCounts(dashboard, { pending: 21, approved: 4, rejected: 2, total: 27 });
});

test('reply updates do not refresh the review summary', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page);
  const dashboard = await openAdminHarness(page);
  await expectDashboardReady(dashboard);
  await expect.poll(() => log.summaryCompletions).toHaveLength(1);

  await dashboard.getByRole('button', { name: 'Yorum işlemleri' }).click();
  await dashboard.getByRole('menuitem', { name: 'Cevapla' }).click();
  await dashboard.getByPlaceholder('Yanıtınızı yazın...').fill('Teşekkür ederiz.');
  await dashboard.getByRole('button', { name: 'Gönder', exact: true }).click();

  await expect.poll(() => requestsFor(log, 'PUT', '/api/admin/reviews').length).toBe(1);
  expect(requestsFor(log, 'PUT', '/api/admin/reviews')).toEqual([
    expect.objectContaining({
      body: { id: 'review-1', merchantReply: 'Teşekkür ederiz.' },
    }),
  ]);
  expect(requestsFor(log, 'GET', '/api/admin/reviews/summary')).toHaveLength(1);
  await expect(dashboard.getByRole('heading', { name: 'Müşteriye Yanıt Ver' })).toBeHidden();
});

test('review API failures stay inside the feature and preserve verified data', async ({ page }) => {
  const initialLog = await setupAdminDashboardRoutes(page, { reviewFailureCalls: [1] });
  const dashboard = await openAdminHarness(page);

  await expect(dashboard.getByRole('alert').filter({ hasText: 'Yorumlar yüklenemedi' })).toBeVisible();
  await expect(dashboard.getByText('Bu alan yüklenemedi.')).toHaveCount(0);
  await dashboard.getByRole('button', { name: 'Tekrar Dene' }).click();
  await expect(dashboard.getByText('İlk Müşteri', { exact: true })).toBeVisible();
  expect(requestsFor(initialLog, 'GET', '/api/admin/reviews')).toHaveLength(2);
});

test('planned widget deep links do not load settings or editor runtime', async ({ page }) => {
  const plannedLog = await setupAdminDashboardRoutes(page);
  const planned = await openAdminHarness(page, 'success', '/dashboard/widgets/carousel');

  await expect(planned.getByRole('heading', { name: 'Yorum Carousel' })).toBeVisible();
  await expect(planned.getByText('Bu widget yakında kullanıma açılacak.')).toBeVisible();
  await expectFocusedEditorChrome(planned);
  expect(requestsFor(plannedLog, 'GET', '/api/admin/settings')).toHaveLength(0);
  expect(plannedLog.previewRequests).toHaveLength(0);
  expect(plannedLog.nextAssetRequests.some((path) => path.includes('%5BwidgetId%5D') || path.includes('[widgetId]'))).toBe(false);
});

test('unknown widget deep links render the dashboard not-found boundary without feature work', async ({ page }) => {
  const unknownLog = await setupAdminDashboardRoutes(page);
  const unknown = await openAdminHarness(page, 'success', '/dashboard/widgets/not-a-widget');
  await expect(unknown.getByRole('heading', { name: 'Yönetim sayfası bulunamadı' })).toBeVisible();
  await expect(unknown.getByRole('link', { name: 'Widgetlara dön' })).toBeVisible();
  await expectFocusedEditorChrome(unknown);
  expect(requestsFor(unknownLog, 'GET', '/api/admin/settings')).toHaveLength(0);
  expect(unknownLog.previewRequests).toHaveLength(0);
  expect(unknownLog.nextAssetRequests.some((path) => path.includes('%5BwidgetId%5D') || path.includes('[widgetId]'))).toBe(false);
});

for (const widget of [
  { id: 'reviews', name: 'Ürün Yorumları' },
  { id: 'badge', name: 'Yıldız Rozeti' },
] as const) {
  test(`${widget.id} editor cold start loads only its configurable route`, async ({ page }) => {
    const log = await setupAdminDashboardRoutes(page);
    const dashboard = await openAdminHarness(page, 'success', `/dashboard/widgets/${widget.id}`);

    await expect(dashboard.getByRole('heading', { name: widget.name })).toBeVisible();
    await expectFocusedEditorChrome(dashboard);
    await expect.poll(() => requestsFor(log, 'GET', '/api/admin/settings').length).toBe(1);
    await expect.poll(() => log.previewRequests.length).toBe(1);
    expect(log.nextAssetRequests.some((path) => path.includes('%5BwidgetId%5D') || path.includes('[widgetId]'))).toBe(true);
    expect(log.unexpectedRequests).toEqual([]);
  });
}

test('widget routes isolate settings and save through the preview protocol', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page);
  const dashboard = await openAdminHarness(page);
  await expectDashboardReady(dashboard);
  expect(requestsFor(log, 'GET', '/api/admin/settings')).toHaveLength(0);

  expect(log.nextAssetRequests.some((path) => path.includes('%5BwidgetId%5D') || path.includes('[widgetId]'))).toBe(false);
  await dashboard.getByRole('link', { name: 'Widgetlar' }).click();
  await expectWorkspaceChrome(dashboard);
  await expect.poll(() => requestsFor(log, 'GET', '/api/admin/settings').length).toBe(1);
  await expect(dashboard.getByText('Ürün Yorumları', { exact: true }).first()).toBeVisible();
  await expect(dashboard.getByText('Yakında', { exact: true })).toHaveCount(4);
  await expect(dashboard.getByRole('link', { name: 'Özelleştir' })).toHaveCount(2);
  expect(log.nextAssetRequests.some((path) => path.includes('%5BwidgetId%5D') || path.includes('[widgetId]'))).toBe(false);

  await dashboard.getByRole('link', { name: 'Yorumlar' }).click();
  await dashboard.getByRole('link', { name: 'Widgetlar' }).click();
  await expect.poll(() => requestsFor(log, 'GET', '/api/admin/settings').length).toBe(2);

  await dashboard.getByRole('link', { name: 'Özelleştir' }).first().click();
  await expect.poll(() => log.nextAssetRequests.some((path) => path.includes('%5BwidgetId%5D') || path.includes('[widgetId]'))).toBe(true);
  await expectFocusedEditorChrome(dashboard);
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
  expect(requestsFor(log, 'GET', '/api/admin/settings')).toHaveLength(2);
  expect(log.previewRequests).toHaveLength(1);
  expect(log.unexpectedRequests).toEqual([]);
});

test('customize preserves the authenticated document and settings cache', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page);
  const dashboard = await openAdminHarness(page, 'success', '/dashboard/widgets');

  await expect(dashboard.getByRole('heading', { name: 'Widgetlar' })).toBeVisible();
  await expect.poll(() => requestsFor(log, 'GET', '/api/admin/settings').length).toBe(1);
  await dashboard.locator('body').evaluate(() => {
    (window as Window & { __renuvexCatalogDocument?: boolean }).__renuvexCatalogDocument = true;
  });

  await dashboard.getByRole('link', { name: 'Özelleştir' }).first().click();
  await expect(dashboard.getByRole('heading', { name: 'Ürün Yorumları' })).toBeVisible();
  await expectFocusedEditorChrome(dashboard);

  const catalogDocumentMarker = await dashboard.locator('body').evaluate(() => (
    (window as Window & { __renuvexCatalogDocument?: boolean }).__renuvexCatalogDocument
  ));
  expect(catalogDocumentMarker).toBe(true);
  expect(requestsFor(log, 'GET', '/api/ikas/get-merchant')).toHaveLength(1);
  expect(requestsFor(log, 'POST', '/api/admin/storefront-theme/sync')).toHaveLength(1);
  expect(requestsFor(log, 'GET', '/api/admin/settings')).toHaveLength(1);
  await expect.poll(() => log.previewRequests.length).toBe(1);

  const counts = await getHarnessCounts(page);
  expect(counts.CLOSE_LOADER).toBe(1);
  expect(counts.REQUEST_TOKEN).toBe(1);
  expect(log.authorizationFailures).toEqual([]);
  expect(log.unexpectedRequests).toEqual([]);
});

test('clean browser Back returns to the catalog without an unload warning', async ({ page }) => {
  await setupAdminDashboardRoutes(page);
  const dashboard = await openAdminHarness(page, 'success', '/dashboard/widgets');

  await expect(dashboard.getByRole('heading', { name: 'Widgetlar' })).toBeVisible();
  await dashboard.getByRole('link', { name: 'Özelleştir' }).first().click();
  await expect(dashboard.getByRole('heading', { name: 'Ürün Yorumları' })).toBeVisible();

  let beforeUnloadDialogs = 0;
  const handleDialog = async (dialog: import('@playwright/test').Dialog) => {
    if (dialog.type() === 'beforeunload') beforeUnloadDialogs += 1;
    await dialog.accept();
  };
  page.on('dialog', handleDialog);
  await dashboard.locator('body').evaluate(() => window.history.back()).catch(() => undefined);
  await expect(dashboard.getByRole('heading', { name: 'Widgetlar' })).toBeVisible();
  page.off('dialog', handleDialog);
  expect(beforeUnloadDialogs).toBe(0);
});

test('failed widget settings load retries only after the explicit user action', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page, { settingsFailures: 1 });
  const dashboard = await openAdminHarness(page);
  await expectDashboardReady(dashboard);

  await dashboard.getByRole('link', { name: 'Widgetlar' }).click();
  await expect.poll(() => requestsFor(log, 'GET', '/api/admin/settings').length).toBe(1);
  await expect(dashboard.getByRole('alert').filter({ hasText: 'Widget ayarları yüklenemedi' })).toBeVisible();
  expect(requestsFor(log, 'GET', '/api/admin/settings')).toHaveLength(1);

  await dashboard.getByRole('button', { name: 'Tekrar Dene' }).click();
  await expect.poll(() => requestsFor(log, 'GET', '/api/admin/settings').length).toBe(2);
  await expect(dashboard.getByText('Ürün Yorumları', { exact: true }).first()).toBeVisible();
  expect(log.unexpectedRequests).toEqual([]);
});

test('dirty editor back navigation uses one modal and discard leaves without saving', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page);
  const dashboard = await openAdminHarness(page, 'success', '/dashboard/widgets/reviews');

  await expect(dashboard.getByRole('heading', { name: 'Ürün Yorumları' })).toBeVisible();
  await expectFocusedEditorChrome(dashboard);
  await dashboard.getByRole('button', { name: 'Metin', exact: true }).click();
  await dashboard.getByRole('textbox', { name: 'Widget Başlığı' }).fill('Kaydedilmemiş Başlık');

  await dashboard.getByRole('button', { name: 'Geri', exact: true }).click();
  await expect(dashboard.getByRole('heading', { name: 'Kaydedilmemiş Değişiklikler' })).toBeVisible();
  await dashboard.getByRole('button', { name: 'Düzenlemeye Devam Et' }).click();
  await dashboard.getByRole('button', { name: 'Geri', exact: true }).click();
  await expect(dashboard.getByRole('heading', { name: 'Kaydedilmemiş Değişiklikler' })).toBeVisible();
  await dashboard.getByRole('button', { name: 'Kaydetmeden Çık' }).click();

  await expect(dashboard.getByRole('heading', { name: 'Widgetlar' })).toBeVisible();
  await expectWorkspaceChrome(dashboard);
  expect(requestsFor(log, 'PUT', '/api/admin/settings')).toHaveLength(0);
});

test('failed save keeps the dirty editor open', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page, { settingsSaveStatus: 500 });
  const dashboard = await openAdminHarness(page, 'success', '/dashboard/widgets/reviews');

  await expect(dashboard.getByRole('heading', { name: 'Ürün Yorumları' })).toBeVisible();
  await dashboard.getByRole('button', { name: 'Metin', exact: true }).click();
  await dashboard.getByRole('textbox', { name: 'Widget Başlığı' }).fill('Kaydedilemeyen Başlık');
  await dashboard.getByRole('button', { name: 'Kaydet', exact: true }).click();

  await expect.poll(() => requestsFor(log, 'PUT', '/api/admin/settings').length).toBe(1);
  await expect(dashboard.getByRole('heading', { name: 'Ürün Yorumları' })).toBeVisible();
  await expect(dashboard.getByText('Kaydedilmemiş değişiklik')).toBeVisible();
});

test('save-and-exit clears the native unload boundary before returning to the catalog', async ({ page }) => {
  const log = await setupAdminDashboardRoutes(page);
  const dashboard = await openAdminHarness(page, 'success', '/dashboard/widgets/reviews');

  await expect(dashboard.getByRole('heading', { name: 'Ürün Yorumları' })).toBeVisible();
  await expectFocusedEditorChrome(dashboard);
  await dashboard.getByRole('button', { name: 'Metin', exact: true }).click();
  await dashboard.getByRole('textbox', { name: 'Widget Başlığı' }).fill('Kaydedilen Başlık');
  await dashboard.getByRole('button', { name: 'Geri', exact: true }).click();
  await dashboard.getByRole('button', { name: 'Kaydet ve Çık' }).click();

  await expect(dashboard.getByRole('heading', { name: 'Widgetlar' })).toBeVisible();
  await expectWorkspaceChrome(dashboard);
  expect(requestsFor(log, 'PUT', '/api/admin/settings')).toHaveLength(1);

  let beforeUnloadDialogs = 0;
  const handleDialog = async (dialog: import('@playwright/test').Dialog) => {
    if (dialog.type() === 'beforeunload') beforeUnloadDialogs += 1;
    await dialog.accept();
  };
  page.on('dialog', handleDialog);
  await dashboard.locator('body').evaluate(() => window.location.reload()).catch(() => undefined);
  await expect(dashboard.getByRole('heading', { name: 'Widgetlar' })).toBeVisible();
  page.off('dialog', handleDialog);
  expect(beforeUnloadDialogs).toBe(0);
});

test('dirty hard reload uses the native beforeunload boundary', async ({ page }) => {
  await setupAdminDashboardRoutes(page);
  const dashboard = await openAdminHarness(page, 'success', '/dashboard/widgets/reviews');
  await expect(dashboard.getByRole('heading', { name: 'Ürün Yorumları' })).toBeVisible();
  await dashboard.getByRole('button', { name: 'Metin', exact: true }).click();
  await dashboard.getByRole('textbox', { name: 'Widget Başlığı' }).fill('Reload Uyarısı');

  let beforeUnloadDialogs = 0;
  const handleDialog = async (dialog: import('@playwright/test').Dialog) => {
    if (dialog.type() === 'beforeunload') beforeUnloadDialogs += 1;
    await dialog.dismiss();
  };
  page.on('dialog', handleDialog);
  await dashboard.locator('body').evaluate(() => window.location.reload());
  await expect.poll(() => beforeUnloadDialogs).toBe(1);
  page.off('dialog', handleDialog);
  await expect(dashboard.getByRole('heading', { name: 'Ürün Yorumları' })).toBeVisible();
});

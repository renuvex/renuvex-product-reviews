import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import {
  MERCHANT_ORIGIN,
  countUrls,
  hasChunk,
  hasJsonLd,
  hasPdpBadge,
  hasReviewsWidget,
  hasRuntime,
  setupExternalProductLikeLinksPage,
  setupGenericLinksPage,
  setupProductListingFallbackPage,
  setupWidgetRoutes,
  summarizeWidgetNetwork,
  waitForWidgetIdle,
  widgetErrors,
} from './widget-harness';

test('manifest points at the current widget surface hierarchy', async () => {
  const manifestPath = path.join(process.cwd(), 'public', 'widget-runtime', 'build-manifest.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as {
    outputs: Array<{ entryPoint: string | null }>;
  };
  const entryPoints = manifest.outputs.map((output) => output.entryPoint).filter(Boolean);
  expect(entryPoints).toContain('src/widget/reviews-section/bootstrap.js');
  expect(entryPoints).toContain('src/widget/reviews-section/render.js');
  expect(entryPoints).toContain('src/widget/rating-badge/index.js');
  expect(entryPoints.some((entryPoint) => entryPoint?.includes('product-widget'))).toBe(false);
});

test('review mount present loads reviews, photo strip, badge, and render chunk', async ({ page }) => {
  const log = await setupWidgetRoutes(page, { badgeEnabled: true, mountReviews: true });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasPdpBadge(page)).toBe(true);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);

  expect(await hasJsonLd(page)).toBe(true);
  expect(hasRuntime(log)).toBe(true);
  expect(hasChunk(log, 'rating-badge-')).toBe(true);
  expect(hasChunk(log, 'bootstrap-')).toBe(true);
  expect(hasChunk(log, 'render-')).toBe(true);
  expect(countUrls(log, '/api/public/settings')).toBe(1);
  expect(countUrls(log, '/api/public/ratings')).toBe(1);
  expect(countUrls(log, '/api/public/reviews?')).toBeGreaterThanOrEqual(2);
  expect(log.urls.some((url) => url.includes('/api/public/reviews?') && url.includes('hasImages=true'))).toBe(true);
  expect(widgetErrors(log)).toEqual([]);
});

test('review mount absent keeps badge but skips review render chunk and review APIs', async ({ page }) => {
  const log = await setupWidgetRoutes(page, { badgeEnabled: true, mountReviews: false });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasPdpBadge(page)).toBe(true);
  await waitForWidgetIdle(page);

  expect(await hasJsonLd(page)).toBe(true);
  expect(await hasReviewsWidget(page)).toBe(false);
  expect(hasChunk(log, 'rating-badge-')).toBe(true);
  expect(hasChunk(log, 'bootstrap-')).toBe(true);
  expect(hasChunk(log, 'render-')).toBe(false);
  expect(countUrls(log, '/api/public/settings')).toBe(1);
  expect(countUrls(log, '/api/public/ratings')).toBe(1);
  expect(countUrls(log, '/api/public/reviews?')).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('badge disabled skips ratings, badge DOM, and JSON-LD while reviews still render', async ({ page }) => {
  const log = await setupWidgetRoutes(page, { badgeEnabled: false, mountReviews: true });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await waitForWidgetIdle(page);

  expect(await hasPdpBadge(page)).toBe(false);
  expect(await hasJsonLd(page)).toBe(false);
  expect(hasChunk(log, 'rating-badge-')).toBe(true);
  expect(hasChunk(log, 'render-')).toBe(true);
  expect(countUrls(log, '/api/public/settings')).toBe(1);
  expect(countUrls(log, '/api/public/ratings')).toBe(0);
  expect(countUrls(log, '/api/public/reviews?')).toBeGreaterThanOrEqual(2);
  expect(widgetErrors(log)).toEqual([]);
});

test('unsupported theme keeps auto-placement closed but explicit review mount works', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    badgeEnabled: true,
    mountReviews: true,
    runtime: { themeAdapterKey: 'generic', autoPlacementEnabled: false, reviewsMountEnabled: true },
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await waitForWidgetIdle(page);

  expect(await hasPdpBadge(page)).toBe(false);
  expect(await hasJsonLd(page)).toBe(false);
  expect(hasChunk(log, 'rating-badge-')).toBe(true);
  expect(hasChunk(log, 'render-')).toBe(true);
  expect(countUrls(log, '/api/public/ratings')).toBe(0);
  expect(countUrls(log, '/api/public/reviews?')).toBeGreaterThanOrEqual(2);
  expect(widgetErrors(log)).toEqual([]);
});

test('generic link pages do not trigger the legacy listing fallback chunk', async ({ page }) => {
  const log = await setupGenericLinksPage(page);
  await page.goto(`${MERCHANT_ORIGIN}/about`);
  await page.waitForTimeout(2400);

  expect(hasRuntime(log)).toBe(true);
  expect(hasChunk(log, 'listing-badges-')).toBe(false);
  expect(countUrls(log, '/api/public/settings')).toBe(0);
  expect(countUrls(log, '/api/public/ratings')).toBe(0);
  expect(countUrls(log, '/api/public/reviews?')).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('external and system links with media do not trigger the listing fallback chunk', async ({ page }) => {
  const log = await setupExternalProductLikeLinksPage(page);
  await page.goto(`${MERCHANT_ORIGIN}/external-links`);
  await page.waitForTimeout(2400);

  expect(hasRuntime(log)).toBe(true);
  expect(hasChunk(log, 'listing-badges-')).toBe(false);
  expect(countUrls(log, '/api/public/settings')).toBe(0);
  expect(countUrls(log, '/api/public/ratings')).toBe(0);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('product-like listing DOM triggers the fallback chunk and slug ratings call', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page);
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 5000 }).toBe(1);

  expect(hasRuntime(log)).toBe(true);
  expect(hasChunk(log, 'listing-badges-')).toBe(true);
  expect(countUrls(log, '/api/public/settings')).toBe(1);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(1);
  expect(countUrls(log, '/api/public/reviews?')).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('records local widget transfer evidence without enforcing byte budgets', async ({ browser }, testInfo) => {
  async function measure(name: string, options: Parameters<typeof setupWidgetRoutes>[1]) {
    const context = await browser.newContext({ serviceWorkers: 'block' });
    const page = await context.newPage();
    const log = await setupWidgetRoutes(page, options);
    await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
    if (options?.mountReviews === false) {
      await waitForWidgetIdle(page);
    } else {
      await expect.poll(() => hasReviewsWidget(page)).toBe(true);
    }
    const summary = await summarizeWidgetNetwork(log);
    await context.close();
    return [name, summary] as const;
  }

  const entries = await Promise.all([
    measure('mount-present badge-on', { badgeEnabled: true, mountReviews: true }),
    measure('mount-absent badge-on', { badgeEnabled: true, mountReviews: false }),
    measure('mount-present badge-off', { badgeEnabled: false, mountReviews: true }),
    measure('mount-absent badge-off', { badgeEnabled: false, mountReviews: false }),
  ]);
  const table = Object.fromEntries(entries);

  await testInfo.attach('widget-transfer-evidence.json', {
    contentType: 'application/json',
    body: JSON.stringify(table, null, 2),
  });

  expect(table['mount-present badge-on'].reviewsCalls).toBeGreaterThan(0);
  expect(table['mount-absent badge-on'].reviewsCalls).toBe(0);
  expect(table['mount-present badge-off'].ratingsCalls).toBe(0);
  expect(table['mount-absent badge-on'].assetBytes).toBeLessThan(table['mount-present badge-on'].assetBytes);
});

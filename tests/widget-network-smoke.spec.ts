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
  setupGenericLinksPage,
  setupWidgetRoutes,
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

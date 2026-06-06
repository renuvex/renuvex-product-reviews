import { expect, test, type Page, type Route } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import {
  MERCHANT_ORIGIN,
  PUBLIC_KEY,
  PRODUCT_ID,
  PRODUCT_NAME,
  REVIEW_CLOUD_NAME,
  countJsonLd,
  countListingBadges,
  countListingPlaceholders,
  countPdpBadges,
  countUrls,
  hasChunk,
  hasJsonLd,
  hasPdpBadge,
  hasReviewsWidget,
  hasRuntime,
  listingIkasEvents,
  setupExternalProductLikeLinksPage,
  setupGenericLinksPage,
  setupNavFooterProductLikeLinksPage,
  setupProductLikeLinksWithoutMediaPage,
  setupProductListingFallbackPage,
  setupSingleProductLikeLinkPage,
  setupWidgetRoutes,
  summarizeWidgetNetwork,
  waitForWidgetIdle,
  widgetErrors,
} from './widget-harness';

function jsonHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };
}

function trustedReviewImage(name: string): string {
  return `https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/review_images/stores/${PUBLIC_KEY}/${name}.jpg`;
}

function reviewPayload(
  reviews: Array<Record<string, unknown>>,
  options: { allCount?: number; totalCount?: number; ratingCounts?: number[]; avgRating?: string; hasMore?: boolean } = {},
): unknown {
  const allCount = options.allCount ?? reviews.length;
  return {
    data: {
      reviews,
      allCount,
      totalCount: options.totalCount ?? allCount,
      ratingCounts: options.ratingCounts ?? [0, 0, 0, 0, allCount],
      avgRating: options.avgRating ?? (allCount > 0 ? '5.0' : '0.0'),
      hasMore: options.hasMore ?? false,
    },
  };
}

async function fulfillJson(route: Route, body: unknown): Promise<void> {
  await route.fulfill({
    status: 200,
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function reviewsWidgetState(page: Page): Promise<{
  productId: string;
  emptyText: string;
  photoThumbs: number;
  reviewCards: number;
}> {
  return page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews');
    const root = container?.shadowRoot || null;
    const widget = root?.querySelector('#renuvex-reviews-widget');
    return {
      productId: widget?.getAttribute('data-renuvex-product-id') || '',
      emptyText: root?.querySelector('.renuvex-pr-state-msg')?.textContent?.trim() || '',
      photoThumbs: root?.querySelectorAll('.renuvex-pr-photo-strip-thumb').length || 0,
      reviewCards: root?.querySelectorAll('.renuvex-pr-review').length || 0,
    };
  });
}

test('manifest points at the current widget surface hierarchy', async () => {
  const manifestPath = path.join(process.cwd(), 'public', 'widget-runtime', 'build-manifest.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as {
    outputs: Array<{ entryPoint: string | null }>;
  };
  const entryPoints = manifest.outputs.map((output) => output.entryPoint).filter(Boolean);
  expect(entryPoints).toContain('src/widget/reviews-section/bootstrap.js');
  expect(entryPoints).toContain('src/widget/reviews-section/render.js');
  expect(entryPoints).toContain('src/widget/rating-badge/index.js');
  expect(entryPoints).toContain('src/widget/structured-data/index.js');
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
  expect(hasChunk(log, 'structured-data-')).toBe(true);
  expect(hasChunk(log, 'bootstrap-')).toBe(true);
  expect(hasChunk(log, 'render-')).toBe(true);
  expect(countUrls(log, '/api/public/settings')).toBe(1);
  expect(countUrls(log, '/api/public/ratings')).toBe(1);
  expect(countUrls(log, '/api/public/reviews?')).toBeGreaterThanOrEqual(2);
  expect(log.urls.some((url) => url.includes('/api/public/reviews?') && url.includes('hasImages=true'))).toBe(true);
  expect(widgetErrors(log)).toEqual([]);
});

test('duplicate product contexts stay idempotent across PDP surfaces', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    badgeEnabled: true,
    mountReviews: true,
    ikasEvents: [
      { type: 'PRODUCT_VIEW', data: { productDetail: { id: PRODUCT_ID, name: PRODUCT_NAME } } },
      { type: 'PRODUCT_VIEW', data: { productDetail: { id: PRODUCT_ID, name: PRODUCT_NAME } } },
      { type: 'PAGE_VIEW', data: { pageType: 'PRODUCT' } },
    ],
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await waitForWidgetIdle(page);

  expect(await countPdpBadges(page)).toBe(1);
  expect(await countJsonLd(page)).toBe(1);
  expect(countUrls(log, '/api/public/settings')).toBe(1);
  expect(countUrls(log, '/api/public/ratings?')).toBe(1);
  expect(countUrls(log, '/api/public/reviews?')).toBe(2);
  expect(widgetErrors(log)).toEqual([]);
});

test('late review mount replays only the reviews-main surface', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    badgeEnabled: true,
    mountReviews: true,
    reviewsMountDelayMs: 250,
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasPdpBadge(page)).toBe(true);
  await expect.poll(() => hasReviewsWidget(page), { timeout: 3000 }).toBe(true);
  await waitForWidgetIdle(page);

  expect(await countPdpBadges(page)).toBe(1);
  expect(countUrls(log, '/api/public/ratings?')).toBe(1);
  expect(countUrls(log, '/api/public/reviews?')).toBe(2);
  expect(hasChunk(log, 'render-')).toBe(true);
  expect(widgetErrors(log)).toEqual([]);
});

test('stale product bootstrap cannot overwrite the current review widget', async ({ page }) => {
  const currentReview = {
    id: 'current-review',
    rating: 5,
    title: 'Current review',
    comment: 'Current product review.',
    author: 'Mert',
    createdAt: '2026-06-06T00:00:00.000Z',
    images: [trustedReviewImage('current-review')],
    merchantReply: null,
    recommendation: true,
  };
  const stalePhotoReview = {
    id: 'old-photo-review',
    rating: 5,
    title: 'Old photo',
    comment: 'Old product photo review.',
    author: 'Ada',
    createdAt: '2026-06-05T00:00:00.000Z',
    images: [trustedReviewImage('old-photo-review')],
    merchantReply: null,
    recommendation: true,
  };
  const log = await setupWidgetRoutes(page, {
    badgeEnabled: true,
    mountReviews: true,
    ikasEvents: [
      { type: 'PRODUCT_VIEW', data: { productDetail: { id: 'old-product', name: 'Old Product' } } },
      { type: 'PRODUCT_VIEW', data: { productDetail: { id: PRODUCT_ID, name: PRODUCT_NAME } }, delayMs: 100 },
      { type: 'PAGE_VIEW', data: { pageType: 'PRODUCT' } },
    ],
    reviewsGetHandler: async (route) => {
      const url = new URL(route.request().url());
      const productId = url.searchParams.get('productId');
      const hasImages = url.searchParams.get('hasImages') === 'true';
      if (productId === 'old-product') {
        await wait(300);
        await fulfillJson(route, hasImages
          ? reviewPayload([stalePhotoReview], { allCount: 1, totalCount: 1 })
          : reviewPayload([], { allCount: 0, totalCount: 0, ratingCounts: [0, 0, 0, 0, 0], avgRating: '0.0' }));
        return;
      }
      await wait(20);
      await fulfillJson(route, reviewPayload([currentReview], { allCount: 1, totalCount: 1 }));
    },
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await waitForWidgetIdle(page);

  const state = await reviewsWidgetState(page);
  expect(state.productId).toBe(PRODUCT_ID);
  expect(state.emptyText).toBe('');
  expect(state.reviewCards).toBeGreaterThanOrEqual(1);
  expect(state.photoThumbs).toBeGreaterThanOrEqual(1);
  expect(countUrls(log, '/api/public/reviews?')).toBe(4);
  expect(widgetErrors(log)).toEqual([]);
});

test('clean product PAGE_VIEW skips listing entry and side effects', async ({ page }) => {
  const log = await setupWidgetRoutes(page, { badgeEnabled: true, mountReviews: false });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasPdpBadge(page)).toBe(true);
  await page.waitForTimeout(2400);

  expect(hasChunk(log, 'listing-badges-')).toBe(false);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(0);
  expect(await countListingBadges(page)).toBe(0);
  expect(await countListingPlaceholders(page)).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('distinct PAGE_VIEW transitions inside the debounce window still start listing lifecycle', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    ikasEvents: [
      { type: 'PAGE_VIEW', data: { pageType: 'PRODUCT' } },
      { type: 'PAGE_VIEW', data: { pageType: 'CATEGORY' }, delayMs: 20 },
    ],
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);

  await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 1500 }).toBe(1);

  expect(hasChunk(log, 'listing-badges-')).toBe(true);
  expect(countUrls(log, '/api/public/settings')).toBe(1);
  expect(widgetErrors(log)).toEqual([]);
});

test('duplicate same-page PAGE_VIEW inside the debounce window remains idempotent', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    ikasEvents: [
      { type: 'PAGE_VIEW', data: { pageType: 'CATEGORY' } },
      { type: 'PAGE_VIEW', data: { pageType: 'CATEGORY' }, delayMs: 20 },
    ],
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);

  await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 1500 }).toBe(1);
  await page.waitForTimeout(1000);

  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(1);
  expect(hasChunk(log, 'listing-badges-')).toBe(true);
  expect(countUrls(log, '/api/public/settings')).toBe(1);
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
  expect(hasChunk(log, 'structured-data-')).toBe(true);
  expect(hasChunk(log, 'bootstrap-')).toBe(true);
  expect(hasChunk(log, 'render-')).toBe(false);
  expect(countUrls(log, '/api/public/settings')).toBe(1);
  expect(countUrls(log, '/api/public/ratings')).toBe(1);
  expect(countUrls(log, '/api/public/reviews?')).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('badge disabled skips badge DOM but keeps JSON-LD when reviews still render', async ({ page }) => {
  const log = await setupWidgetRoutes(page, { badgeEnabled: false, mountReviews: true });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await waitForWidgetIdle(page);

  expect(await hasPdpBadge(page)).toBe(false);
  expect(await hasJsonLd(page)).toBe(true);
  expect(hasChunk(log, 'rating-badge-')).toBe(true);
  expect(hasChunk(log, 'structured-data-')).toBe(true);
  expect(hasChunk(log, 'render-')).toBe(true);
  expect(countUrls(log, '/api/public/settings')).toBe(1);
  expect(countUrls(log, '/api/public/ratings')).toBe(1);
  expect(countUrls(log, '/api/public/reviews?')).toBeGreaterThanOrEqual(2);
  expect(widgetErrors(log)).toEqual([]);
});

test('unsupported theme keeps auto-placement closed but explicit review mount keeps JSON-LD', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    badgeEnabled: true,
    mountReviews: true,
    runtime: { themeAdapterKey: 'generic', autoPlacementEnabled: false, reviewsMountEnabled: true },
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await waitForWidgetIdle(page);

  expect(await hasPdpBadge(page)).toBe(false);
  expect(await hasJsonLd(page)).toBe(true);
  expect(hasChunk(log, 'rating-badge-')).toBe(true);
  expect(hasChunk(log, 'structured-data-')).toBe(true);
  expect(hasChunk(log, 'render-')).toBe(true);
  expect(countUrls(log, '/api/public/ratings')).toBe(1);
  expect(countUrls(log, '/api/public/reviews?')).toBeGreaterThanOrEqual(2);
  expect(widgetErrors(log)).toEqual([]);
});

test('badge disabled and review mount absent produce no JSON-LD or ratings fetch', async ({ page }) => {
  const log = await setupWidgetRoutes(page, { badgeEnabled: false, mountReviews: false });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await waitForWidgetIdle(page);

  expect(await hasPdpBadge(page)).toBe(false);
  expect(await hasReviewsWidget(page)).toBe(false);
  expect(await hasJsonLd(page)).toBe(false);
  expect(hasChunk(log, 'rating-badge-')).toBe(true);
  expect(hasChunk(log, 'structured-data-')).toBe(true);
  expect(hasChunk(log, 'render-')).toBe(false);
  expect(countUrls(log, '/api/public/ratings')).toBe(0);
  expect(countUrls(log, '/api/public/reviews?')).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('rich snippets toggle disables JSON-LD without disabling visual badge', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    badgeEnabled: true,
    mountReviews: true,
    reviewsSettings: { richSnippetsEnabled: false },
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasPdpBadge(page)).toBe(true);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await waitForWidgetIdle(page);

  expect(await hasJsonLd(page)).toBe(false);
  expect(hasChunk(log, 'rating-badge-')).toBe(true);
  expect(hasChunk(log, 'structured-data-')).toBe(true);
  expect(countUrls(log, '/api/public/ratings')).toBe(1);
  expect(countUrls(log, '/api/public/reviews?')).toBeGreaterThanOrEqual(2);
  expect(widgetErrors(log)).toEqual([]);
});

test('products without approved reviews do not emit badge or JSON-LD', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    badgeEnabled: true,
    mountReviews: true,
    approvedReviewCount: 0,
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await waitForWidgetIdle(page);

  expect(await hasPdpBadge(page)).toBe(false);
  expect(await hasJsonLd(page)).toBe(false);
  expect(hasChunk(log, 'structured-data-')).toBe(true);
  expect(countUrls(log, '/api/public/ratings')).toBe(1);
  expect(countUrls(log, '/api/public/reviews?')).toBeGreaterThanOrEqual(1);
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

test('a single product-like link with media does not trigger the listing fallback chunk', async ({ page }) => {
  const log = await setupSingleProductLikeLinkPage(page);
  await page.goto(`${MERCHANT_ORIGIN}/single-product-link`);
  await page.waitForTimeout(2400);

  expect(hasRuntime(log)).toBe(true);
  expect(hasChunk(log, 'listing-badges-')).toBe(false);
  expect(countUrls(log, '/api/public/settings')).toBe(0);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('nav and footer product-like links with media do not trigger the listing fallback chunk', async ({ page }) => {
  const log = await setupNavFooterProductLikeLinksPage(page);
  await page.goto(`${MERCHANT_ORIGIN}/nav-footer-links`);
  await page.waitForTimeout(2400);

  expect(hasRuntime(log)).toBe(true);
  expect(hasChunk(log, 'listing-badges-')).toBe(false);
  expect(countUrls(log, '/api/public/settings')).toBe(0);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('product-like links without nearby media do not trigger the listing fallback chunk', async ({ page }) => {
  const log = await setupProductLikeLinksWithoutMediaPage(page);
  await page.goto(`${MERCHANT_ORIGIN}/no-media-product-links`);
  await page.waitForTimeout(2400);

  expect(hasRuntime(log)).toBe(true);
  expect(hasChunk(log, 'listing-badges-')).toBe(false);
  expect(countUrls(log, '/api/public/settings')).toBe(0);
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

test('synchronous listing event is replayed after loader subscribes', async ({ page }) => {
  const listingOnlyEvent = listingIkasEvents().filter((event) => event.type === 'VIEW_LISTING');
  const log = await setupProductListingFallbackPage(page, {
    ikasEvents: listingOnlyEvent,
    ikasEventMode: 'sync',
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);

  await expect.poll(() => countUrls(log, '/api/public/ratings?'), { timeout: 1500 }).toBe(1);
  await expect.poll(() => countListingBadges(page), { timeout: 1500 }).toBe(2);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(0);
  expect(await countListingPlaceholders(page)).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('listing badge slots mount as title siblings instead of inside title elements', async ({ page }) => {
  const listingOnlyEvent = listingIkasEvents().filter((event) => event.type === 'VIEW_LISTING');
  const log = await setupProductListingFallbackPage(page, {
    ikasEvents: listingOnlyEvent,
    ikasEventMode: 'sync',
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);

  await expect.poll(() => countListingBadges(page), { timeout: 1500 }).toBe(2);
  const placements = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.product-card')).map((card) => {
      const title = card.querySelector('h2');
      const slot = card.querySelector('[data-renuvex-slot="listing-rating"]');
      return {
        hasTitle: !!title,
        hasSlot: !!slot,
        titleContainsSlot: !!(title && slot && title.contains(slot)),
        sameParent: !!(title && slot && title.parentElement === slot.parentElement),
        immediatelyAfterTitle: !!(title && slot && title.nextSibling === slot),
      };
    });
  });

  expect(placements).toEqual([
    {
      hasTitle: true,
      hasSlot: true,
      titleContainsSlot: false,
      sameParent: true,
      immediatelyAfterTitle: true,
    },
    {
      hasTitle: true,
      hasSlot: true,
      titleContainsSlot: false,
      sameParent: true,
      immediatelyAfterTitle: true,
    },
  ]);
  expect(countUrls(log, '/api/public/ratings?')).toBe(1);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('listing page stays idempotent when product data arrives before PAGE_VIEW', async ({ page }) => {
  const events = listingIkasEvents();
  const pageEvent = events.find((event) => event.type === 'PAGE_VIEW');
  const listingEvent = events.find((event) => event.type === 'VIEW_LISTING');
  if (!pageEvent || !listingEvent) throw new Error('Missing listing lifecycle test events');
  const log = await setupProductListingFallbackPage(page, {
    ikasEvents: [
      { ...listingEvent },
      { ...pageEvent, delayMs: 20 },
    ],
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);

  await expect.poll(() => countListingBadges(page), { timeout: 3000 }).toBe(2);
  await waitForWidgetIdle(page);

  expect(await countListingBadges(page)).toBe(2);
  expect(await countListingPlaceholders(page)).toBe(0);
  expect(countUrls(log, '/api/public/ratings?')).toBe(1);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('listing page stays idempotent when PAGE_VIEW arrives before product data', async ({ page }) => {
  const events = listingIkasEvents();
  const pageEvent = events.find((event) => event.type === 'PAGE_VIEW');
  const listingEvent = events.find((event) => event.type === 'VIEW_LISTING');
  if (!pageEvent || !listingEvent) throw new Error('Missing listing lifecycle test events');
  const log = await setupProductListingFallbackPage(page, {
    ikasEvents: [
      { ...pageEvent },
      { ...listingEvent, delayMs: 20 },
    ],
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);

  await expect.poll(() => countListingBadges(page), { timeout: 3000 }).toBe(2);
  await waitForWidgetIdle(page);

  expect(await countListingBadges(page)).toBe(2);
  expect(await countListingPlaceholders(page)).toBe(0);
  expect(countUrls(log, '/api/public/ratings?')).toBeLessThanOrEqual(1);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBeLessThanOrEqual(1);
  expect(widgetErrors(log)).toEqual([]);
});

test('unsupported theme listing lifecycle stays fail-closed before DOM and rating work', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    ikasEvents: listingIkasEvents(),
    runtime: { themeAdapterKey: 'generic', autoPlacementEnabled: false, reviewsMountEnabled: true },
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await waitForWidgetIdle(page);

  expect(countUrls(log, '/api/public/settings')).toBe(1);
  expect(countUrls(log, '/api/public/ratings?')).toBe(0);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(0);
  expect(await countListingBadges(page)).toBe(0);
  expect(await countListingPlaceholders(page)).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('badge-disabled listing lifecycle stays fail-closed before DOM and rating work', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    badgeEnabled: false,
    ikasEvents: listingIkasEvents(),
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await waitForWidgetIdle(page);

  expect(countUrls(log, '/api/public/settings')).toBe(1);
  expect(countUrls(log, '/api/public/ratings?')).toBe(0);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(0);
  expect(await countListingBadges(page)).toBe(0);
  expect(await countListingPlaceholders(page)).toBe(0);
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
  expect(table['mount-present badge-off'].ratingsCalls).toBe(1);
  expect(table['mount-absent badge-off'].ratingsCalls).toBe(0);
  expect(table['mount-absent badge-on'].assetBytes).toBeLessThan(table['mount-present badge-on'].assetBytes);
});

import { expect, test, type Page, type Route } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import {
  MERCHANT_ORIGIN,
  PUBLIC_KEY,
  PRODUCT_ID,
  PRODUCT_NAME,
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
  reviewImage,
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
  return reviewImage(name, PUBLIC_KEY);
}

function trustedReviewImageMediaFromUrl(url: string, position = 0): Record<string, unknown> {
  return {
    type: 'image',
    url,
    thumbnailUrl: url,
    posterUrl: null,
    durationMs: null,
    width: 1200,
    height: 1600,
    position,
    variants: [],
  };
}

function reviewPayload(
  reviews: Array<Record<string, unknown>>,
  options: {
    allCount?: number;
    totalCount?: number;
    ratingCounts?: number[];
    avgRating?: string;
    hasMore?: boolean;
    photoReviewCount?: number;
    mediaReviewCount?: number;
  } = {},
): unknown {
  const normalizedReviews = reviews.map((review) => {
    if (Array.isArray(review.media)) return review;
    const images = Array.isArray(review.images) ? review.images.filter((url): url is string => typeof url === 'string') : [];
    return {
      ...review,
      media: images.map((url, index) => trustedReviewImageMediaFromUrl(url, index)),
    };
  });
  const allCount = options.allCount ?? reviews.length;
  const inferredPhotoReviewCount = normalizedReviews.filter((review) => Array.isArray(review.images) && review.images.length > 0).length;
  const inferredMediaReviewCount = normalizedReviews.filter((review) => (
    (Array.isArray(review.images) && review.images.length > 0) ||
    (Array.isArray(review.media) && review.media.length > 0)
  )).length;
  return {
    data: {
      reviews: normalizedReviews,
      allCount,
      totalCount: options.totalCount ?? allCount,
      ratingCounts: options.ratingCounts ?? [0, 0, 0, 0, allCount],
      avgRating: options.avgRating ?? (allCount > 0 ? '5.0' : '0.0'),
      hasMore: options.hasMore ?? false,
      photoReviewCount: options.photoReviewCount ?? inferredPhotoReviewCount,
      mediaReviewCount: options.mediaReviewCount ?? inferredMediaReviewCount,
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
  mediaPlaceholders: number;
  mediaThumbs: number;
  reviewCards: number;
  text: string;
  transitioning: boolean;
}> {
  return page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews') as HTMLElement | null;
    const root = container?.shadowRoot || null;
    const widget = root?.querySelector('#renuvex-reviews-widget');
    return {
      productId: widget?.getAttribute('data-renuvex-product-id') || '',
      emptyText: root?.querySelector('.renuvex-pr-state-msg')?.textContent?.trim() || '',
      mediaPlaceholders: root?.querySelectorAll('.renuvex-pr-media-gallery-section--placeholder').length || 0,
      mediaThumbs: root?.querySelectorAll('.renuvex-pr-media-gallery-thumb:not(.renuvex-pr-media-gallery-thumb--placeholder)').length || 0,
      reviewCards: root?.querySelectorAll('.renuvex-pr-review').length || 0,
      text: root?.textContent?.trim() || '',
      transitioning: container?.getAttribute('data-renuvex-transitioning') === 'true',
    };
  });
}

async function reviewsShellState(page: Page): Promise<{
  exists: boolean;
  reserved: boolean;
  minHeight: number;
  hasWidget: boolean;
}> {
  return page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews') as HTMLElement | null;
    const root = container?.shadowRoot || null;
    return {
      exists: !!container,
      reserved: container?.getAttribute('data-renuvex-reserved') === 'true',
      minHeight: container ? parseFloat(container.style.minHeight || '0') : 0,
      hasWidget: !!(root && root.querySelector('#renuvex-reviews-widget')),
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

test('review mount present loads reviews, media gallery, badge, and render chunk', async ({ page }) => {
  const log = await setupWidgetRoutes(page, { badgeEnabled: true, mountReviews: true, approvedReviewCount: 12 });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasPdpBadge(page)).toBe(true);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await expect.poll(() => countUrls(log, '/api/public/reviews?')).toBeGreaterThanOrEqual(2);

  expect(await hasJsonLd(page)).toBe(true);
  expect(hasRuntime(log)).toBe(true);
  expect(hasChunk(log, 'rating-badge-')).toBe(true);
  expect(hasChunk(log, 'structured-data-')).toBe(true);
  expect(hasChunk(log, 'bootstrap-')).toBe(true);
  expect(hasChunk(log, 'render-')).toBe(true);
  expect(countUrls(log, '/api/public/settings')).toBe(1);
  expect(countUrls(log, '/api/public/storefront-theme/lazy-sync')).toBe(0);
  expect(countUrls(log, '/api/public/ratings')).toBe(1);
  expect(countUrls(log, '/api/public/reviews?')).toBeGreaterThanOrEqual(2);
  expect(log.urls.some((url) => url.includes('/api/public/reviews?') && url.includes('hasMedia=true'))).toBe(true);
  expect(widgetErrors(log)).toEqual([]);
});

test('settings runtime themeSyncDue schedules best-effort lazy sync on backend origin', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    badgeEnabled: true,
    mountReviews: true,
    runtime: { themeSyncDue: true },
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);

  expect(countUrls(log, '/api/public/settings')).toBe(1);
  await expect.poll(() => countUrls(log, '/api/public/storefront-theme/lazy-sync')).toBe(1);
  expect(widgetErrors(log)).toEqual([]);
});

test('review mount with zero media summary skips deferred media gallery request', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    badgeEnabled: true,
    mountReviews: true,
    reviewsGetHandler: async (route) => {
      await fulfillJson(route, reviewPayload([], {
        allCount: 0,
        totalCount: 0,
        ratingCounts: [0, 0, 0, 0, 0],
        avgRating: '0.0',
        photoReviewCount: 0,
        mediaReviewCount: 0,
      }));
    },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await waitForWidgetIdle(page);

  expect(countUrls(log, '/api/public/reviews?')).toBeGreaterThanOrEqual(1);
  expect(log.urls.some((url) => url.includes('/api/public/reviews?') && url.includes('hasMedia=true'))).toBe(false);
  await expect.poll(() => reviewsWidgetState(page)).toMatchObject({
    reviewCards: 0,
    mediaThumbs: 0,
  });
  expect(widgetErrors(log)).toEqual([]);
});

test('review mount reserves a stable shell before delayed reviews render', async ({ page }) => {
  let mainRequested = false;
  let releaseMain!: () => void;
  const mainGate = new Promise<void>((resolve) => {
    releaseMain = resolve;
  });

  const log = await setupWidgetRoutes(page, {
    badgeEnabled: true,
    mountReviews: true,
    reviewsGetHandler: async (route) => {
      const url = new URL(route.request().url());
      if (url.searchParams.get('hasMedia') === 'true') {
        await fulfillJson(route, reviewPayload([]));
        return;
      }
      mainRequested = true;
      await mainGate;
      await fulfillJson(route, reviewPayload([], {
        allCount: 0,
        totalCount: 0,
        ratingCounts: [0, 0, 0, 0, 0],
        avgRating: '0.0',
        mediaReviewCount: 0,
      }));
    },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => mainRequested).toBe(true);
  await expect.poll(() => reviewsShellState(page)).toMatchObject({
    exists: true,
    reserved: true,
    hasWidget: false,
  });
  expect((await reviewsShellState(page)).minHeight).toBeGreaterThanOrEqual(220);

  releaseMain();
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  expect(widgetErrors(log)).toEqual([]);
});

test('startup perf timeline is opt-in only', async ({ page }) => {
  await setupWidgetRoutes(page, { badgeEnabled: true, mountReviews: true });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);

  const timeline = await page.evaluate(() => (window as typeof window & { __renuvexPerfTimeline?: unknown }).__renuvexPerfTimeline || null);
  expect(timeline).toBeNull();
});

test('startup perf timeline records loader, import, API, and render marks when enabled', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('renuvexPerf', '1');
  });
  await setupWidgetRoutes(page, { badgeEnabled: true, mountReviews: true });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);

  const marks = await page.evaluate(() => {
    const timeline = (window as typeof window & { __renuvexPerfTimeline?: { marks?: Array<{ name: string }> } }).__renuvexPerfTimeline;
    return (timeline?.marks || []).map((mark) => mark.name);
  });
  expect(marks).toEqual(expect.arrayContaining([
    'classic-loader-start',
    'runtime-import-start',
    'runtime-import-done',
    'runtime-entry-start',
    'settings-start',
    'settings-done',
    'reviews-main-import-start',
    'reviews-main-import-done',
    'reviews-api-start',
    'reviews-api-done',
    'reviews-shell-reserved',
    'render-import-start',
    'render-import-done',
    'first-render-start',
    'first-render-done',
    'reviews-widget-visible',
  ]));
});

test('review section renders before delayed media gallery response', async ({ page }) => {
  let mediaRequested = false;
  let releaseMedia!: () => void;
  const mediaGate = new Promise<void>((resolve) => {
    releaseMedia = resolve;
  });
  const mainReviews = [
    {
      id: 'main-review-1',
      rating: 5,
      title: 'Fast render',
      comment: 'Main review content should render before the media gallery read finishes.',
      author: 'Mert W.',
      createdAt: '2026-06-29T00:00:00.000Z',
      images: [],
      merchantReply: null,
      recommendation: true,
    },
  ];
  const galleryReviews = [
    {
      id: 'media-gallery-review-1',
      rating: 5,
      title: 'Media review',
      comment: 'Representative media for the gallery.',
      author: 'Ada K.',
      createdAt: '2026-06-28T00:00:00.000Z',
      images: [trustedReviewImage('delayed-gallery-1')],
      merchantReply: null,
      recommendation: true,
    },
  ];

  await page.addInitScript(() => {
    const callbacks: Array<IdleRequestCallback> = [];
    Object.defineProperty(window, '__renuvexIdleCallbacks', {
      configurable: true,
      value: callbacks,
    });
    window.requestIdleCallback = ((callback: IdleRequestCallback) => {
      callbacks.push(callback);
      return callbacks.length;
    }) as typeof window.requestIdleCallback;
    window.cancelIdleCallback = (() => {}) as typeof window.cancelIdleCallback;
  });

  const log = await setupWidgetRoutes(page, {
    badgeEnabled: true,
    mountReviews: true,
    reviewsGetHandler: async (route) => {
      const url = new URL(route.request().url());
      if (url.searchParams.get('hasMedia') === 'true') {
        mediaRequested = true;
        await mediaGate;
        await fulfillJson(route, reviewPayload(galleryReviews));
        return;
      }
      await fulfillJson(route, reviewPayload(mainReviews, { mediaReviewCount: 1 }));
    },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await expect.poll(() => reviewsWidgetState(page)).toMatchObject({
    reviewCards: 1,
    mediaPlaceholders: 1,
    mediaThumbs: 0,
  });
  expect(mediaRequested).toBe(false);

  await page.evaluate(() => {
    const callbacks = (window as Window & { __renuvexIdleCallbacks?: IdleRequestCallback[] }).__renuvexIdleCallbacks || [];
    const callback = callbacks.shift();
    if (callback) callback({ didTimeout: false, timeRemaining: () => 50 });
  });
  await expect.poll(() => mediaRequested).toBe(true);

  releaseMedia();
  await expect.poll(() => reviewsWidgetState(page)).toMatchObject({
    mediaPlaceholders: 0,
    mediaThumbs: 1,
  });
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
  let oldReviewsRequested = false;
  let releaseOldReviews: () => void = () => {};
  const oldReviewsGate = new Promise<void>((resolve) => {
    releaseOldReviews = resolve;
  });
  const log = await setupWidgetRoutes(page, {
    badgeEnabled: true,
    mountReviews: true,
    ikasEvents: [
      { type: 'PRODUCT_VIEW', data: { productDetail: { id: 'old-product', name: 'Old Product' } } },
      { type: 'PAGE_VIEW', data: { pageType: 'PRODUCT' } },
    ],
    reviewsGetHandler: async (route) => {
      const url = new URL(route.request().url());
      const productId = url.searchParams.get('productId');
      const hasImages = url.searchParams.get('hasImages') === 'true';
      if (productId === 'old-product') {
        oldReviewsRequested = true;
        await oldReviewsGate;
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
  await expect.poll(() => oldReviewsRequested).toBe(true);

  try {
    const emitted = await page.evaluate(({ productId, productName }) => {
      const emit = (window as unknown as { __renuvexEmitIkasEvent?: (event: unknown) => void }).__renuvexEmitIkasEvent;
      if (typeof emit !== 'function') return false;
      emit({ type: 'PRODUCT_VIEW', data: { productDetail: { id: productId, name: productName } } });
      return true;
    }, { productId: PRODUCT_ID, productName: PRODUCT_NAME });
    expect(emitted).toBe(true);
    await expect.poll(() => reviewsWidgetState(page)).toMatchObject({
      productId: PRODUCT_ID,
      reviewCards: 1,
      transitioning: false,
    });
  } finally {
    releaseOldReviews();
  }

  await waitForWidgetIdle(page);
  await page.waitForTimeout(100);

  const state = await reviewsWidgetState(page);
  expect(state.productId).toBe(PRODUCT_ID);
  expect(state.emptyText).toBe('');
  expect(state.reviewCards).toBeGreaterThanOrEqual(1);
  expect(state.mediaThumbs).toBeGreaterThanOrEqual(1);
  expect(log.urls.some((url) => url.includes('/api/public/reviews?') && url.includes('productId=old-product') && url.includes('hasMedia=true'))).toBe(false);
  const reviewUrls = log.urls.filter((url) => url.includes('/api/public/reviews?'));
  expect(reviewUrls.filter((url) => url.includes('productId=old-product'))).toHaveLength(1);
  expect(reviewUrls.filter((url) => url.includes(`productId=${PRODUCT_ID}`))).toHaveLength(2);
  expect(widgetErrors(log)).toEqual([]);
});

test('product transition clears rendered stale reviews while next reviews are pending', async ({ page }) => {
  const oldReview = {
    id: 'old-rendered-review',
    rating: 5,
    title: 'Old rendered review',
    comment: 'Old product review should disappear during transition.',
    author: 'Ada',
    createdAt: '2026-06-05T00:00:00.000Z',
    images: [],
    merchantReply: null,
    recommendation: true,
  };
  const newReview = {
    id: 'new-rendered-review',
    rating: 5,
    title: 'New rendered review',
    comment: 'New product review should render after fetch.',
    author: 'Mert',
    createdAt: '2026-06-06T00:00:00.000Z',
    images: [],
    merchantReply: null,
    recommendation: true,
  };
  let releaseNewReviews: () => void = () => {};
  const newReviewsGate = new Promise<void>((resolve) => {
    releaseNewReviews = resolve;
  });
  let newReviewsRequested = false;

  const log = await setupWidgetRoutes(page, {
    badgeEnabled: true,
    mountReviews: true,
    ikasEvents: [
      { type: 'PRODUCT_VIEW', data: { productDetail: { id: 'old-product', name: 'Old Product' } } },
      { type: 'PAGE_VIEW', data: { pageType: 'PRODUCT' } },
    ],
    reviewsGetHandler: async (route) => {
      const url = new URL(route.request().url());
      const productId = url.searchParams.get('productId');
      if (productId === 'old-product') {
        await fulfillJson(route, reviewPayload([oldReview], { allCount: 1, totalCount: 1, mediaReviewCount: 0, photoReviewCount: 0 }));
        return;
      }
      if (productId === 'new-product') {
        newReviewsRequested = true;
        await newReviewsGate;
        await fulfillJson(route, reviewPayload([newReview], { allCount: 1, totalCount: 1, mediaReviewCount: 0, photoReviewCount: 0 }));
        return;
      }
      await fulfillJson(route, reviewPayload([], { allCount: 0, totalCount: 0, mediaReviewCount: 0, photoReviewCount: 0 }));
    },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => reviewsWidgetState(page)).toMatchObject({
    productId: 'old-product',
    reviewCards: 1,
    transitioning: false,
  });

  const emitted = await page.evaluate(() => {
    const emit = (window as unknown as { __renuvexEmitIkasEvent?: (event: unknown) => void }).__renuvexEmitIkasEvent;
    if (typeof emit !== 'function') return false;
    emit({ type: 'PRODUCT_VIEW', data: { productDetail: { id: 'new-product', name: 'New Product' } } });
    return true;
  });
  expect(emitted).toBe(true);

  await expect.poll(() => newReviewsRequested, { timeout: 1500 }).toBe(true);
  await expect.poll(() => reviewsWidgetState(page), { timeout: 1500 }).toMatchObject({
    productId: '',
    reviewCards: 0,
    transitioning: true,
  });
  const transitionState = await reviewsWidgetState(page);
  expect(transitionState.text).not.toContain('Old product review should disappear during transition.');

  releaseNewReviews();
  await expect.poll(() => reviewsWidgetState(page)).toMatchObject({
    productId: 'new-product',
    reviewCards: 1,
    transitioning: false,
  });
  const finalState = await reviewsWidgetState(page);
  expect(finalState.text).toContain('New product review should render after fetch.');
  expect(finalState.text).not.toContain('Old product review should disappear during transition.');
  expect(widgetErrors(log)).toEqual([]);
});

test('history route change clears rendered stale reviews before product event arrives', async ({ page }) => {
  const oldReview = {
    id: 'old-history-review',
    rating: 5,
    title: 'Old history review',
    comment: 'Old product review should be cleared on route change before product event.',
    author: 'Ada',
    createdAt: '2026-06-05T00:00:00.000Z',
    images: [],
    merchantReply: null,
    recommendation: true,
  };
  const newReview = {
    id: 'new-history-review',
    rating: 5,
    title: 'New history review',
    comment: 'New product review should render after the product event.',
    author: 'Mert',
    createdAt: '2026-06-06T00:00:00.000Z',
    images: [],
    merchantReply: null,
    recommendation: true,
  };

  const log = await setupWidgetRoutes(page, {
    badgeEnabled: true,
    mountReviews: true,
    ikasEvents: [
      { type: 'PRODUCT_VIEW', data: { productDetail: { id: 'old-product', name: 'Old Product' } } },
      { type: 'PAGE_VIEW', data: { pageType: 'PRODUCT' } },
    ],
    reviewsGetHandler: async (route) => {
      const url = new URL(route.request().url());
      const productId = url.searchParams.get('productId');
      if (productId === 'old-product') {
        await fulfillJson(route, reviewPayload([oldReview], { allCount: 1, totalCount: 1, mediaReviewCount: 0, photoReviewCount: 0 }));
        return;
      }
      if (productId === 'new-product') {
        await fulfillJson(route, reviewPayload([newReview], { allCount: 1, totalCount: 1, mediaReviewCount: 0, photoReviewCount: 0 }));
        return;
      }
      await fulfillJson(route, reviewPayload([], { allCount: 0, totalCount: 0, mediaReviewCount: 0, photoReviewCount: 0 }));
    },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => reviewsWidgetState(page)).toMatchObject({
    productId: 'old-product',
    reviewCards: 1,
    transitioning: false,
  });

  await page.evaluate(() => {
    window.history.pushState({}, '', '/new-product-route');
  });

  await expect.poll(() => reviewsWidgetState(page), { timeout: 1000 }).toMatchObject({
    productId: '',
    reviewCards: 0,
    transitioning: true,
  });
  const routeTransitionState = await reviewsWidgetState(page);
  expect(routeTransitionState.text).not.toContain('Old product review should be cleared on route change before product event.');
  await page.waitForTimeout(450);
  expect(countUrls(log, '/api/public/widget-error')).toBe(0);

  const emitted = await page.evaluate(() => {
    const emit = (window as unknown as { __renuvexEmitIkasEvent?: (event: unknown) => void }).__renuvexEmitIkasEvent;
    if (typeof emit !== 'function') return false;
    emit({ type: 'PRODUCT_VIEW', data: { productDetail: { id: 'new-product', name: 'New Product' } } });
    return true;
  });
  expect(emitted).toBe(true);

  await expect.poll(() => reviewsWidgetState(page)).toMatchObject({
    productId: 'new-product',
    reviewCards: 1,
    transitioning: false,
  });
  const finalState = await reviewsWidgetState(page);
  expect(finalState.text).toContain('New product review should render after the product event.');
  expect(finalState.text).not.toContain('Old product review should be cleared on route change before product event.');
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

test('review mount absent keeps badge but skips review bootstrap/render chunks and review APIs', async ({ page }) => {
  const log = await setupWidgetRoutes(page, { badgeEnabled: true, mountReviews: false });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasPdpBadge(page)).toBe(true);
  await waitForWidgetIdle(page);

  expect(await hasJsonLd(page)).toBe(true);
  expect(await hasReviewsWidget(page)).toBe(false);
  expect(hasChunk(log, 'rating-badge-')).toBe(true);
  expect(hasChunk(log, 'structured-data-')).toBe(true);
  expect(hasChunk(log, 'bootstrap-')).toBe(false);
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
  expect(hasChunk(log, 'bootstrap-')).toBe(false);
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
  await page.addInitScript(({ publicKey }) => {
    sessionStorage.setItem(`renuvex_pr_ratings_${publicKey}`, JSON.stringify({
      t: Date.now(),
      v: { 'premium-shorts': { avg: '5.0', count: 999 } },
    }));
  }, { publicKey: PUBLIC_KEY });
  const log = await setupProductListingFallbackPage(page);
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 5000 }).toBe(1);

  const cached = await page.evaluate((publicKey) => (
    sessionStorage.getItem(`renuvex_pr_ratings_v2_${publicKey}`)
  ), PUBLIC_KEY);
  expect(cached).not.toBeNull();
  expect(JSON.parse(cached!).v).toEqual({});

  expect(hasRuntime(log)).toBe(true);
  expect(hasChunk(log, 'listing-badges-')).toBe(true);
  expect(countUrls(log, '/api/public/settings')).toBe(1);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(1);
  expect(countUrls(log, '/api/public/reviews?')).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('below-the-fold product listing waits for viewport before loading listing badges', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, { listingOffsetTop: 2600 });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await page.waitForTimeout(2600);

  expect(hasRuntime(log)).toBe(true);
  expect(hasChunk(log, 'listing-badges-')).toBe(false);
  expect(countUrls(log, '/api/public/settings')).toBe(0);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(0);
  expect(await countListingBadges(page)).toBe(0);
  expect(await countListingPlaceholders(page)).toBe(0);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 5000 }).toBe(1);
  await expect.poll(() => countListingBadges(page), { timeout: 3000 }).toBe(2);

  expect(hasChunk(log, 'listing-badges-')).toBe(true);
  expect(countUrls(log, '/api/public/settings')).toBe(1);
  expect(widgetErrors(log)).toEqual([]);
});

test('listing fallback remains eager when IntersectionObserver is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      value: undefined,
    });
  });
  const log = await setupProductListingFallbackPage(page, { listingOffsetTop: 2600 });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);

  await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 5000 }).toBe(1);

  expect(hasChunk(log, 'listing-badges-')).toBe(true);
  expect(countUrls(log, '/api/public/settings')).toBe(1);
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

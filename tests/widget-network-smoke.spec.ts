import { expect, test, type Page, type Route } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const WIDGET_ORIGIN = 'https://widget.test';
const MERCHANT_ORIGIN = 'https://merchant.test';
const PUBLIC_KEY = 'ci-public-key';
const PRODUCT_ID = 'product-1';
const PRODUCT_NAME = 'Premium';

type RuntimeOptions = {
  autoPlacementEnabled?: boolean;
  reviewsMountEnabled?: boolean;
  themeAdapterKey?: string;
};

type SmokeOptions = {
  badgeEnabled?: boolean;
  reviewsEnabled?: boolean;
  mountReviews?: boolean;
  runtime?: RuntimeOptions;
};

type RequestLog = {
  urls: string[];
  consoleErrors: string[];
};

function jsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/javascript; charset=utf-8',
  };
}

function jsonHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
  };
}

function settingsResponse(options: SmokeOptions): unknown {
  const runtime = options.runtime || {};
  return {
    widgets: {
      badge: {
        enabled: options.badgeEnabled !== false,
        size: 'medium',
        mobileOverride: false,
        mobileSize: 'small',
      },
      reviews: {
        enabled: options.reviewsEnabled !== false,
        title: 'Musteri Yorumlari',
        showTitle: true,
        summaryLayout: 'classic',
        reviewLayout: 'card',
        borderRadius: 8,
        size: 'medium',
        thumbnailSize: 'medium',
        showPhotoGallery: true,
        showPhotoGalleryTitle: true,
        showRecommendation: true,
        reviewIcon: 'star',
        reviewStarColor: '#f59e0b',
        writeButtonText: 'Yorum Yap',
      },
    },
    runtime: {
      themeAdapterKey: runtime.themeAdapterKey || 'ozy',
      adapterSource: runtime.themeAdapterKey === 'generic' ? 'generic_unknown' : 'auto',
      autoPlacementEnabled: runtime.autoPlacementEnabled !== false,
      reviewsMountEnabled: runtime.reviewsMountEnabled !== false,
    },
  };
}

function reviewsResponse(hasImages: boolean): unknown {
  const images = hasImages
    ? ['https://res.cloudinary.com/renuvex/image/upload/v1/reviews/ci-review.jpg']
    : [];
  return {
    data: {
      reviews: [
        {
          id: hasImages ? 'review-photo-1' : 'review-1',
          rating: 5,
          title: 'Great',
          comment: 'Works well',
          author: 'Mert W.',
          createdAt: '2026-05-28T00:00:00.000Z',
          images,
          merchantReply: null,
          recommendation: true,
        },
      ],
      allCount: 12,
      ratingCounts: [0, 0, 0, 0, 12],
      avgRating: '4.8',
      hasMore: false,
    },
  };
}

function ratingsResponse(): unknown {
  return {
    data: {
      [PRODUCT_ID]: {
        avg: '4.8',
        count: 12,
      },
    },
  };
}

async function fulfillLocalPublicAsset(route: Route): Promise<void> {
  const url = new URL(route.request().url());
  const publicPath = url.pathname.replace(/^\/+/, '').replace(/\//g, path.sep);
  const filePath = path.join(process.cwd(), 'public', publicPath);
  const body = await readFile(filePath, 'utf8');
  await route.fulfill({
    status: 200,
    headers: jsHeaders(),
    body,
  });
}

async function setupWidgetRoutes(page: Page, options: SmokeOptions = {}): Promise<RequestLog> {
  const log: RequestLog = { urls: [], consoleErrors: [] };
  page.on('request', (request) => {
    log.urls.push(request.url());
  });
  page.on('console', (message) => {
    if (message.type() === 'error') {
      log.consoleErrors.push(message.text());
    }
  });
  page.on('pageerror', (error) => {
    log.consoleErrors.push(error.message);
  });

  await page.route(`${WIDGET_ORIGIN}/widget.js**`, fulfillLocalPublicAsset);
  await page.route(`${WIDGET_ORIGIN}/widget-runtime/**`, fulfillLocalPublicAsset);
  await page.route(`${WIDGET_ORIGIN}/api/public/settings**`, async (route) => {
    await route.fulfill({
      status: 200,
      headers: jsonHeaders(),
      body: JSON.stringify(settingsResponse(options)),
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/ratings**`, async (route) => {
    await route.fulfill({
      status: 200,
      headers: jsonHeaders(),
      body: JSON.stringify(ratingsResponse()),
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/reviews**`, async (route) => {
    const url = new URL(route.request().url());
    await route.fulfill({
      status: 200,
      headers: jsonHeaders(),
      body: JSON.stringify(reviewsResponse(url.searchParams.get('hasImages') === 'true')),
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/widget-error**`, async (route) => {
    await route.fulfill({
      status: 204,
      headers: jsonHeaders(),
      body: '',
    });
  });
  await page.route(`${MERCHANT_ORIGIN}/**`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'text/html; charset=utf-8',
      body: productHtml(options.mountReviews !== false),
    });
  });
  return log;
}

function productHtml(mountReviews: boolean): string {
  return `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8">
    <title>${PRODUCT_NAME}</title>
    <script>
      window.IkasEvents = {
        subscribe: function (subscription) {
          setTimeout(function () {
            subscription.callback({
              type: 'PRODUCT_VIEW',
              data: { productDetail: { id: '${PRODUCT_ID}', name: '${PRODUCT_NAME}' } }
            });
            subscription.callback({
              type: 'PAGE_VIEW',
              data: { pageType: 'PRODUCT' }
            });
          }, 0);
        }
      };
    </script>
    <script src="${WIDGET_ORIGIN}/widget.js?publicApiKey=${PUBLIC_KEY}" data-renuvex-app="product-reviews"></script>
  </head>
  <body>
    <main>
      <section class="product-detail">
        <h1>${PRODUCT_NAME}</h1>
        <p>CI product page.</p>
        ${mountReviews ? '<div data-renuvex-widget="reviews"></div>' : ''}
      </section>
    </main>
  </body>
</html>`;
}

async function setupGenericLinksPage(page: Page): Promise<RequestLog> {
  const log: RequestLog = { urls: [], consoleErrors: [] };
  page.on('request', (request) => {
    log.urls.push(request.url());
  });
  page.on('console', (message) => {
    if (message.type() === 'error') {
      log.consoleErrors.push(message.text());
    }
  });
  page.on('pageerror', (error) => {
    log.consoleErrors.push(error.message);
  });
  await page.route(`${WIDGET_ORIGIN}/widget.js**`, fulfillLocalPublicAsset);
  await page.route(`${WIDGET_ORIGIN}/widget-runtime/**`, fulfillLocalPublicAsset);
  await page.route(`${WIDGET_ORIGIN}/api/public/widget-error**`, async (route) => {
    await route.fulfill({ status: 204, headers: jsonHeaders(), body: '' });
  });
  await page.route(`${MERCHANT_ORIGIN}/**`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'text/html; charset=utf-8',
      body: `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8">
    <title>Generic Page</title>
    <script src="${WIDGET_ORIGIN}/widget.js?publicApiKey=${PUBLIC_KEY}" data-renuvex-app="product-reviews"></script>
  </head>
  <body>
    <main>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <a href="/support">Support</a>
    </main>
  </body>
</html>`,
    });
  });
  return log;
}

async function waitForWidgetIdle(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(800);
}

function countUrls(log: RequestLog, needle: string): number {
  return log.urls.filter((url) => url.includes(needle)).length;
}

function hasChunk(log: RequestLog, chunkName: string): boolean {
  return log.urls.some((url) => url.includes(`/widget-runtime/chunks/${chunkName}`));
}

function hasRuntime(log: RequestLog): boolean {
  return log.urls.some((url) => /\/widget-runtime\/runtime-[A-Z0-9]+\.js/.test(url));
}

async function hasPdpBadge(page: Page): Promise<boolean> {
  return page.evaluate(() => !!document.querySelector('[data-renuvex-slot="product-title-rating"] .renuvex-pr-rating-badge--pdp'));
}

async function hasJsonLd(page: Page): Promise<boolean> {
  return page.evaluate(() => !!document.getElementById('renuvex-pr-jsonld'));
}

async function hasReviewsWidget(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor && anchor.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot && slot.querySelector('#renuvex-reviews');
    const root = container && container.shadowRoot;
    return !!(root && root.querySelector('#renuvex-reviews-widget'));
  });
}

function widgetErrors(log: RequestLog): string[] {
  return log.consoleErrors.filter((message) => message.includes('[renuvex-pr]') || message.includes('Failed to load'));
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

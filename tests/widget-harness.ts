import { type Page, type Route } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const WIDGET_ORIGIN = 'https://widget.test';
export const API_ORIGIN = resolveWidgetApiOrigin();
export const READ_API_ORIGIN = resolveWidgetReadApiOrigin();
export const MERCHANT_ORIGIN = 'https://merchant.test';
export const PUBLIC_KEY = 'ci-public-key';
export const PRODUCT_ID = 'product-1';
export const PRODUCT_NAME = 'Premium';
export const REVIEW_CLOUD_NAME = resolveReviewCloudName();

export type RuntimeOptions = {
  autoPlacementEnabled?: boolean;
  reviewsMountEnabled?: boolean;
  themeAdapterKey?: string;
};

export type IkasEventSequenceItem = {
  type: string;
  data?: Record<string, unknown>;
  delayMs?: number;
};

export type SmokeOptions = {
  badgeEnabled?: boolean;
  reviewsEnabled?: boolean;
  mountReviews?: boolean;
  reviewsMountDelayMs?: number;
  runtime?: RuntimeOptions;
  ikasEvents?: IkasEventSequenceItem[];
  ikasEventMode?: 'async' | 'sync';
  reviewsSettings?: Record<string, unknown>;
  videoCapability?: {
    enabled?: boolean;
    reason?: string | null;
    status?: number;
    abort?: Parameters<Route['abort']>[0];
  };
  badgeSettings?: Record<string, unknown>;
  hasMore?: boolean;
  approvedReviewCount?: number;
  reviewsGetHandler?: (route: Route) => Promise<void>;
  reviewSubmitHandler?: (route: Route) => Promise<void>;
  /**
   * Hostile host-theme CSS injected into the merchant page <head>. When set, the page
   * also renders a light-DOM control image (`.renuvex-iso-control`) inside a 600px box so
   * a test can prove the rule is live in light DOM while the shadow-isolated review surface
   * stays unaffected. Reproduces the 2026-05-25 "Mine" theme thumbnail blow-up (ADR_0021).
   */
  hostileThemeCss?: string;
};

export type RequestLog = {
  urls: string[];
  consoleErrors: string[];
};

export type UploadFilePayload = {
  name: string;
  mimeType: string;
  buffer: Buffer;
};

export type WidgetNetworkSummary = {
  scriptCount: number;
  assetBytes: number;
  settingsCalls: number;
  ratingsCalls: number;
  ratingSlugCalls: number;
  reviewsCalls: number;
  chunks: string[];
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

function imageHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'image/svg+xml; charset=utf-8',
  };
}

export function baseReviewsSettings(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    enabled: true,
    title: 'Musteri Yorumlari',
    showTitle: true,
    summaryLayout: 'classic',
    reviewLayout: 'card',
    borderRadius: 8,
    size: 'medium',
    thumbnailSize: 'medium',
    showMediaGallery: true,
    showMediaGalleryTitle: true,
    showRecommendation: true,
    richSnippetsEnabled: true,
    reviewIcon: 'star',
    reviewStarColor: '#f59e0b',
    writeButtonText: 'Yorum Yap',
    formStepRatingTitle: 'Bu ürünü nasıl değerlendirirsiniz?',
    formStepPhotosTitle: 'Fotoğraflı değerlendirme',
    formStepPhotosSubtitle: 'Fotoğraf ekleyebilirsiniz.',
    formStepMediaTitle: 'Fotoğraf veya video ekleyin',
    formStepMediaSubtitle: 'En fazla 3 fotoğraf veya 60 saniyelik 1 video ekleyebilirsiniz.',
    formStepContentTitle: 'Deneyiminizi anlatın',
    formStepAuthorTitle: 'Hakkınızda',
    ...overrides,
  };
}

export function settingsResponse(options: SmokeOptions): unknown {
  const runtime = options.runtime || {};
  return {
    widgets: {
      badge: {
        enabled: options.badgeEnabled !== false,
        size: 'medium',
        mobileOverride: false,
        mobileSize: 'small',
        ...(options.badgeSettings || {}),
      },
      reviews: baseReviewsSettings({
        enabled: options.reviewsEnabled !== false,
        ...(options.reviewsSettings || {}),
      }),
    },
    runtime: {
      themeAdapterKey: runtime.themeAdapterKey || 'ozy',
      adapterSource: runtime.themeAdapterKey === 'generic' ? 'generic_unknown' : 'auto',
      autoPlacementEnabled: runtime.autoPlacementEnabled !== false,
      reviewsMountEnabled: runtime.reviewsMountEnabled !== false,
    },
  };
}

function readEnvFileValue(filePath: string, key: string): string {
  try {
    const body = readFileSync(filePath, 'utf8');
    const pattern = new RegExp(`^\\s*${key}\\s*=\\s*(.*)\\s*$`, 'm');
    const match = body.match(pattern);
    if (!match) return '';
    return match[1].trim().replace(/^['"]|['"]$/g, '');
  } catch {
    return '';
  }
}

function normalizeOrigin(raw: string): string {
  try {
    const parsed = new URL(raw);
    parsed.hash = '';
    parsed.search = '';
    parsed.pathname = '';
    return parsed.toString().replace(/\/$/, '');
  } catch {
    return '';
  }
}

function resolveWidgetApiOrigin(): string {
  return normalizeOrigin(
    process.env.STOREFRONT_WIDGET_API_BASE_URL ||
    readEnvFileValue(path.join(process.cwd(), '.env.local'), 'STOREFRONT_WIDGET_API_BASE_URL') ||
    readEnvFileValue(path.join(process.cwd(), '.env'), 'STOREFRONT_WIDGET_API_BASE_URL') ||
    'https://app.renuvex.app',
  ) || WIDGET_ORIGIN;
}

function resolveWidgetReadApiOrigin(): string {
  return normalizeOrigin(
    process.env.STOREFRONT_WIDGET_READ_API_BASE_URL ||
    readEnvFileValue(path.join(process.cwd(), '.env.local'), 'STOREFRONT_WIDGET_READ_API_BASE_URL') ||
    readEnvFileValue(path.join(process.cwd(), '.env'), 'STOREFRONT_WIDGET_READ_API_BASE_URL') ||
    API_ORIGIN,
  ) || API_ORIGIN || WIDGET_ORIGIN;
}

function apiOrigins(): string[] {
  return Array.from(new Set([WIDGET_ORIGIN, API_ORIGIN, READ_API_ORIGIN].filter(Boolean)));
}

export async function routeWidgetApi(page: Page, pathPattern: string, handler: (route: Route) => Promise<void>): Promise<void> {
  await Promise.all(apiOrigins().map((origin) => page.route(`${origin}${pathPattern}`, handler)));
}

function resolveReviewCloudName(): string {
  const raw = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME ||
    readEnvFileValue(path.join(process.cwd(), '.env.local'), 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME') ||
    readEnvFileValue(path.join(process.cwd(), '.env.local'), 'CLOUDINARY_CLOUD_NAME') ||
    readEnvFileValue(path.join(process.cwd(), '.env'), 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME') ||
    readEnvFileValue(path.join(process.cwd(), '.env'), 'CLOUDINARY_CLOUD_NAME') ||
    'renuvex';
  return /^[A-Za-z0-9_-]+$/.test(raw) ? raw : 'renuvex';
}

function reviewImage(name: string, storeId = PUBLIC_KEY): string {
  return `https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/review_images/stores/${storeId}/${name}.jpg`;
}

function reviewRows(_hasImages: boolean, storeId = PUBLIC_KEY): Array<Record<string, unknown>> {
  return [
    {
      id: 'review-photo-1',
      rating: 5,
      title: 'Great',
      comment: 'Works well with a longer comment for modal and layout smoke.',
      author: 'Mert W.',
      createdAt: '2026-05-28T00:00:00.000Z',
      images: [reviewImage('ci-review-1', storeId), reviewImage('ci-review-1b', storeId)],
      merchantReply: 'Thanks for the detailed review.',
      recommendation: true,
    },
    {
      id: 'review-photo-2',
      rating: 4,
      title: 'Solid',
      comment: 'Good quality and comfortable.',
      author: 'Ada K.',
      createdAt: '2026-05-27T00:00:00.000Z',
      images: [reviewImage('ci-review-2', storeId)],
      merchantReply: null,
      recommendation: true,
    },
    {
      id: 'review-text-1',
      rating: 3,
      title: 'Okay',
      comment: 'No photo review for read-more safety checks.',
      author: 'Can B.',
      createdAt: '2026-05-26T00:00:00.000Z',
      images: [],
      merchantReply: null,
      recommendation: false,
    },
  ];
}

export function reviewsResponse(hasImages: boolean, hasMore = false, storeId = PUBLIC_KEY, approvedReviewCount = 12): unknown {
  const hasApprovedReviews = approvedReviewCount > 0;
  const photoReviewCount = hasApprovedReviews ? 2 : 0;
  return {
    data: {
      reviews: hasApprovedReviews ? reviewRows(hasImages, storeId) : [],
      allCount: approvedReviewCount,
      totalCount: approvedReviewCount,
      ratingCounts: hasApprovedReviews ? [0, 0, 1, 2, 9] : [0, 0, 0, 0, 0],
      avgRating: hasApprovedReviews ? '4.8' : '0.0',
      hasMore,
      photoReviewCount,
      mediaReviewCount: photoReviewCount,
    },
  };
}

export function ratingsResponse(options: SmokeOptions = {}): unknown {
  const count = options.approvedReviewCount ?? 12;
  return {
    data: {
      [PRODUCT_ID]: {
        avg: count > 0 ? '4.8' : '0.0',
        count,
      },
      'product-2': {
        avg: count > 0 ? '4.6' : '0.0',
        count: count > 0 ? 7 : 0,
      },
    },
  };
}

function ratingsBySlugResponse(): unknown {
  return {
    data: {
      'premium-shorts': { avg: '4.8', count: 12 },
      'linen-shirt': { avg: '4.6', count: 7 },
    },
  };
}

export async function fulfillLocalPublicAsset(route: Route): Promise<void> {
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

export async function setupWidgetRoutes(page: Page, options: SmokeOptions = {}): Promise<RequestLog> {
  const log = createRequestLog(page);

  await page.route(`${WIDGET_ORIGIN}/widget.js**`, fulfillLocalPublicAsset);
  await page.route(`${WIDGET_ORIGIN}/widget-runtime/**`, fulfillLocalPublicAsset);
  await page.route('https://res.cloudinary.com/**', fulfillImage);
  await routeWidgetApi(page, '/api/public/settings**', async (route) => {
    await route.fulfill({
      status: 200,
      headers: jsonHeaders(),
      body: JSON.stringify(settingsResponse(options)),
    });
  });
  await routeWidgetApi(page, '/api/public/upload/video/capability**', async (route) => {
    const configured = options.videoCapability;
    if (configured?.abort) {
      await route.abort(configured.abort);
      return;
    }
    const enabled = configured
      ? configured.enabled === true
      : options.reviewsSettings?.videoReviewsEnabled === true;
    const status = configured?.status ?? 200;
    await route.fulfill({
      status,
      headers: { ...jsonHeaders(), 'Cache-Control': 'no-store' },
      body: JSON.stringify(status >= 400
        ? { error: 'video_capability_unavailable' }
        : { data: { enabled, reason: enabled ? null : configured?.reason || 'merchant_disabled' } }),
    });
  });
  await routeWidgetApi(page, '/api/public/upload/video/metrics**', async (route) => {
    await route.fulfill({
      status: 202,
      headers: jsonHeaders(),
      body: JSON.stringify({ data: { status: 'recorded' } }),
    });
  });
  await routeWidgetApi(page, '/api/public/ratings**', async (route) => {
    await route.fulfill({
      status: 200,
      headers: jsonHeaders(),
      body: JSON.stringify(ratingsResponse(options)),
    });
  });
  await routeWidgetApi(page, '/api/public/reviews**', async (route) => {
    if (route.request().method() === 'POST') {
      if (options.reviewSubmitHandler) {
        await options.reviewSubmitHandler(route);
        return;
      }
      await route.fulfill({
        status: 201,
        headers: jsonHeaders(),
        body: JSON.stringify({ message: 'Yorum alindi', data: { id: 'submitted-review', status: 'pending' } }),
      });
      return;
    }
    if (options.reviewsGetHandler) {
      await options.reviewsGetHandler(route);
      return;
    }
    const url = new URL(route.request().url());
    const hasMedia = url.searchParams.get('hasMedia') === 'true';
    await route.fulfill({
      status: 200,
      headers: jsonHeaders(),
      body: JSON.stringify(reviewsResponse(url.searchParams.get('hasImages') === 'true' || hasMedia, options.hasMore === true, PUBLIC_KEY, options.approvedReviewCount ?? 12)),
    });
  });
  await routeWidgetApi(page, '/api/public/widget-error**', async (route) => {
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
      body: productHtml(options),
    });
  });
  return log;
}

export async function setupPreviewRoutes(page: Page, options: SmokeOptions = {}): Promise<RequestLog> {
  const log = createRequestLog(page);

  await page.route(`${WIDGET_ORIGIN}/widget.js**`, fulfillLocalPublicAsset);
  await page.route(`${WIDGET_ORIGIN}/widget-runtime/**`, fulfillLocalPublicAsset);
  await page.route('https://res.cloudinary.com/**', fulfillImage);
  await routeWidgetApi(page, '/api/preview/settings**', async (route) => {
    await route.fulfill({
      status: 200,
      headers: jsonHeaders(),
      body: JSON.stringify(settingsResponse(options)),
    });
  });
  await routeWidgetApi(page, '/api/preview/reviews**', async (route) => {
    const url = new URL(route.request().url());
    await route.fulfill({
      status: 200,
      headers: jsonHeaders(),
      body: JSON.stringify(reviewsResponse(url.searchParams.get('hasImages') === 'true', options.hasMore === true, 'preview')),
    });
  });
  await routeWidgetApi(page, '/api/public/widget-error**', async (route) => {
    await route.fulfill({ status: 204, headers: jsonHeaders(), body: '' });
  });
  await page.route(`${MERCHANT_ORIGIN}/preview`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'text/html; charset=utf-8',
      body: previewHtml(options.reviewsSettings || {}),
    });
  });
  return log;
}

export async function setupGenericLinksPage(page: Page): Promise<RequestLog> {
  const log = createRequestLog(page);
  await page.route(`${WIDGET_ORIGIN}/widget.js**`, fulfillLocalPublicAsset);
  await page.route(`${WIDGET_ORIGIN}/widget-runtime/**`, fulfillLocalPublicAsset);
  await routeWidgetApi(page, '/api/public/widget-error**', async (route) => {
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

export async function setupProductListingFallbackPage(page: Page, options: SmokeOptions = {}): Promise<RequestLog> {
  const log = createRequestLog(page);
  await page.route(`${WIDGET_ORIGIN}/widget.js**`, fulfillLocalPublicAsset);
  await page.route(`${WIDGET_ORIGIN}/widget-runtime/**`, fulfillLocalPublicAsset);
  await page.route('https://res.cloudinary.com/**', fulfillImage);
  await routeWidgetApi(page, '/api/public/settings**', async (route) => {
    await route.fulfill({
      status: 200,
      headers: jsonHeaders(),
      body: JSON.stringify(settingsResponse(options)),
    });
  });
  await routeWidgetApi(page, '/api/public/ratings-by-slug**', async (route) => {
    await route.fulfill({
      status: 200,
      headers: jsonHeaders(),
      body: JSON.stringify(ratingsBySlugResponse()),
    });
  });
  await routeWidgetApi(page, '/api/public/ratings**', async (route) => {
    await route.fulfill({
      status: 200,
      headers: jsonHeaders(),
      body: JSON.stringify(ratingsResponse()),
    });
  });
  await routeWidgetApi(page, '/api/public/widget-error**', async (route) => {
    await route.fulfill({ status: 204, headers: jsonHeaders(), body: '' });
  });
  await page.route(`${MERCHANT_ORIGIN}/**`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'text/html; charset=utf-8',
      body: productListingFallbackHtml(options),
    });
  });
  return log;
}

export async function setupExternalProductLikeLinksPage(page: Page): Promise<RequestLog> {
  return setupListingProbePage(page, externalProductLikeLinksHtml());
}

export async function setupSingleProductLikeLinkPage(page: Page): Promise<RequestLog> {
  return setupListingProbePage(page, singleProductLikeLinkHtml());
}

export async function setupNavFooterProductLikeLinksPage(page: Page): Promise<RequestLog> {
  return setupListingProbePage(page, navFooterProductLikeLinksHtml());
}

export async function setupProductLikeLinksWithoutMediaPage(page: Page): Promise<RequestLog> {
  return setupListingProbePage(page, productLikeLinksWithoutMediaHtml());
}

async function setupListingProbePage(page: Page, body: string): Promise<RequestLog> {
  const log = createRequestLog(page);
  await page.route(`${WIDGET_ORIGIN}/widget.js**`, fulfillLocalPublicAsset);
  await page.route(`${WIDGET_ORIGIN}/widget-runtime/**`, fulfillLocalPublicAsset);
  await page.route('https://res.cloudinary.com/**', fulfillImage);
  await routeWidgetApi(page, '/api/public/settings**', async (route) => {
    await route.fulfill({
      status: 200,
      headers: jsonHeaders(),
      body: JSON.stringify(settingsResponse({})),
    });
  });
  await routeWidgetApi(page, '/api/public/ratings**', async (route) => {
    await route.fulfill({
      status: 200,
      headers: jsonHeaders(),
      body: JSON.stringify(ratingsResponse()),
    });
  });
  await routeWidgetApi(page, '/api/public/ratings-by-slug**', async (route) => {
    await route.fulfill({
      status: 200,
      headers: jsonHeaders(),
      body: JSON.stringify(ratingsBySlugResponse()),
    });
  });
  await routeWidgetApi(page, '/api/public/widget-error**', async (route) => {
    await route.fulfill({ status: 204, headers: jsonHeaders(), body: '' });
  });
  await page.route(`${MERCHANT_ORIGIN}/**`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'text/html; charset=utf-8',
      body,
    });
  });
  return log;
}

function createRequestLog(page: Page): RequestLog {
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
  return log;
}

async function fulfillImage(route: Route): Promise<void> {
  await route.fulfill({
    status: 200,
    headers: imageHeaders(),
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect width="24" height="24" fill="#ddd"/></svg>',
  });
}

function defaultProductEvents(): IkasEventSequenceItem[] {
  return [
    {
      type: 'PRODUCT_VIEW',
      data: { productDetail: { id: PRODUCT_ID, name: PRODUCT_NAME } },
    },
    {
      type: 'PAGE_VIEW',
      data: { pageType: 'PRODUCT' },
    },
  ];
}

export function listingIkasEvents(): IkasEventSequenceItem[] {
  return [
    {
      type: 'PAGE_VIEW',
      data: { pageType: 'CATEGORY' },
    },
    {
      type: 'VIEW_LISTING',
      data: {
        productDetails: [
          { id: PRODUCT_ID, name: 'Premium Shorts', slug: 'premium-shorts' },
          { id: 'product-2', name: 'Linen Shirt', slug: 'linen-shirt' },
        ],
      },
    },
  ];
}

function ikasEventsScript(events: IkasEventSequenceItem[], mode: 'async' | 'sync' = 'async'): string {
  const normalized = events.map((event) => ({
    type: event.type,
    data: event.data || {},
    delayMs: event.delayMs || 0,
  }));
  return `<script>
      (function () {
        var events = ${JSON.stringify(normalized)};
        var subscriptions = [];
        function emit(event) {
          subscriptions.slice().forEach(function (subscription) {
            subscription.callback(event);
          });
        }
        window.__renuvexEmitIkasEvent = emit;
        window.IkasEvents = {
          subscribe: function (subscription) {
            subscriptions.push(subscription);
            var elapsed = 0;
            events.forEach(function (event) {
              if (${JSON.stringify(mode)} === 'sync' && !event.delayMs) {
                emit({ type: event.type, data: event.data });
                return;
              }
              elapsed += event.delayMs || 0;
              setTimeout(function () {
                emit({ type: event.type, data: event.data });
              }, elapsed);
            });
          }
        };
      })();
    </script>`;
}

function productHtml(options: SmokeOptions): string {
  const hostileStyle = options.hostileThemeCss
    ? `<style data-test-hostile-theme>${options.hostileThemeCss}</style>`
    : '';
  // Light-DOM control: the hostile rule (e.g. img{width:100%!important}) balloons this to
  // its 600px container, proving the rule is live so the shadow assertion can't false-pass.
  const controlBlock = options.hostileThemeCss
    ? `<div style="width:600px"><img class="renuvex-iso-control" width="40" height="40" src="https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/iso-control.jpg" alt=""></div>`
    : '';
  const events = options.ikasEvents || defaultProductEvents();
  const reviewMountHtml = options.mountReviews === false
    ? ''
    : typeof options.reviewsMountDelayMs === 'number'
      ? `<script>
          setTimeout(function () {
            var mount = document.createElement('div');
            mount.setAttribute('data-renuvex-widget', 'reviews');
            document.querySelector('.product-detail').appendChild(mount);
          }, ${Math.max(0, Math.round(options.reviewsMountDelayMs))});
        </script>`
      : '<div data-renuvex-widget="reviews"></div>';
  return `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${PRODUCT_NAME}</title>
    ${hostileStyle}
    ${ikasEventsScript(events, options.ikasEventMode)}
    <script src="${WIDGET_ORIGIN}/widget.js?publicApiKey=${PUBLIC_KEY}" data-renuvex-app="product-reviews"></script>
  </head>
  <body>
    <main>
      <section class="product-detail">
        <h1>${PRODUCT_NAME}</h1>
        <p>CI product page.</p>
        ${controlBlock}
        ${reviewMountHtml}
      </section>
    </main>
  </body>
</html>`;
}

function productListingFallbackHtml(options: SmokeOptions = {}): string {
  const eventsScript = options.ikasEvents
    ? ikasEventsScript(options.ikasEvents, options.ikasEventMode)
    : '';
  return `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8">
    <title>Listing</title>
    ${eventsScript}
    <script src="${WIDGET_ORIGIN}/widget.js?publicApiKey=${PUBLIC_KEY}" data-renuvex-app="product-reviews"></script>
  </head>
  <body>
    <main>
      <section class="listing-grid">
        <article class="product-card">
          <a href="/premium-shorts">
            <img src="https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/review_images/stores/${PUBLIC_KEY}/listing-1.jpg" alt="">
            <h2>Premium Shorts</h2>
          </a>
        </article>
        <article class="product-card">
          <a href="/linen-shirt">
            <img src="https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/review_images/stores/${PUBLIC_KEY}/listing-2.jpg" alt="">
            <h2>Linen Shirt</h2>
          </a>
        </article>
      </section>
    </main>
  </body>
</html>`;
}

function externalProductLikeLinksHtml(): string {
  return `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8">
    <title>External Links</title>
    <script src="${WIDGET_ORIGIN}/widget.js?publicApiKey=${PUBLIC_KEY}" data-renuvex-app="product-reviews"></script>
  </head>
  <body>
    <main>
      <section>
        <a href="https://other-store.test/premium-shorts">
          <img src="https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/review_images/stores/${PUBLIC_KEY}/external-1.jpg" alt="">
          External premium shorts
        </a>
        <a href="https://other-store.test/linen-shirt">
          <img src="https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/review_images/stores/${PUBLIC_KEY}/external-2.jpg" alt="">
          External linen shirt
        </a>
        <a href="/cart">
          <img src="https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/review_images/stores/${PUBLIC_KEY}/cart.jpg" alt="">
          Cart
        </a>
        <a href="/account">
          <img src="https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/review_images/stores/${PUBLIC_KEY}/account.jpg" alt="">
          Account
        </a>
      </section>
    </main>
</body>
</html>`;
}

function singleProductLikeLinkHtml(): string {
  return `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8">
    <title>Single Product Link</title>
    <script src="${WIDGET_ORIGIN}/widget.js?publicApiKey=${PUBLIC_KEY}" data-renuvex-app="product-reviews"></script>
  </head>
  <body>
    <main>
      <section>
        <a href="/premium-shorts">
          <img src="https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/review_images/stores/${PUBLIC_KEY}/single-1.jpg" alt="">
          Premium Shorts
        </a>
      </section>
    </main>
  </body>
</html>`;
}

function navFooterProductLikeLinksHtml(): string {
  return `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8">
    <title>Nav Footer Links</title>
    <script src="${WIDGET_ORIGIN}/widget.js?publicApiKey=${PUBLIC_KEY}" data-renuvex-app="product-reviews"></script>
  </head>
  <body>
    <header>
      <nav>
        <a href="/premium-shorts">
          <img src="https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/review_images/stores/${PUBLIC_KEY}/nav-1.jpg" alt="">
          Premium Shorts
        </a>
      </nav>
    </header>
    <main>
      <p>Content without product cards.</p>
    </main>
    <footer>
      <a href="/linen-shirt">
        <img src="https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/review_images/stores/${PUBLIC_KEY}/footer-1.jpg" alt="">
        Linen Shirt
      </a>
    </footer>
  </body>
</html>`;
}

function productLikeLinksWithoutMediaHtml(): string {
  return `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8">
    <title>No Media Product Links</title>
    <script src="${WIDGET_ORIGIN}/widget.js?publicApiKey=${PUBLIC_KEY}" data-renuvex-app="product-reviews"></script>
  </head>
  <body>
    <main>
      <section>
        <a href="/premium-shorts">Premium Shorts</a>
        <a href="/linen-shirt">Linen Shirt</a>
      </section>
    </main>
  </body>
</html>`;
}

function previewHtml(settingsOverride: Record<string, unknown>): string {
  return `<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8">
    <title>Preview</title>
    <script>
      window.__ikasPreviewMode = true;
      window.__ikasPreviewBaseUrl = '${WIDGET_ORIGIN}';
      window.__renuvexProductReviewsPreviewSettings = ${JSON.stringify(JSON.stringify(settingsOverride))};
      window.__ikasPreviewSettings = window.__renuvexProductReviewsPreviewSettings;
    </script>
    <script src="${WIDGET_ORIGIN}/widget.js?publicApiKey=preview" data-renuvex-app="product-reviews"></script>
  </head>
  <body>
    <main>
      <div data-renuvex-widget="reviews"></div>
    </main>
  </body>
</html>`;
}

export async function waitForWidgetIdle(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(800);
}

export function countUrls(log: RequestLog, needle: string): number {
  return log.urls.filter((url) => url.includes(needle)).length;
}

export function hasChunk(log: RequestLog, chunkName: string): boolean {
  return log.urls.some((url) => url.includes(`/widget-runtime/chunks/${chunkName}`));
}

export function hasRuntime(log: RequestLog): boolean {
  return log.urls.some((url) => /\/widget-runtime\/runtime-[A-Z0-9]+\.js/.test(url));
}

export async function hasPdpBadge(page: Page): Promise<boolean> {
  return page.evaluate(() => !!document.querySelector('[data-renuvex-slot="product-title-rating"] .renuvex-pr-rating-badge--pdp'));
}

export async function hasJsonLd(page: Page): Promise<boolean> {
  return page.evaluate(() => !!document.getElementById('renuvex-pr-jsonld'));
}

export async function countJsonLd(page: Page): Promise<number> {
  return page.evaluate(() => document.querySelectorAll('#renuvex-pr-jsonld').length);
}

export async function countPdpBadges(page: Page): Promise<number> {
  return page.evaluate(() => document.querySelectorAll('[data-renuvex-slot="product-title-rating"] .renuvex-pr-rating-badge--pdp').length);
}

export async function countListingBadges(page: Page): Promise<number> {
  return page.evaluate(() => document.querySelectorAll('[data-renuvex-slot="listing-rating"]').length);
}

export async function countListingPlaceholders(page: Page): Promise<number> {
  return page.evaluate(() => document.querySelectorAll('[data-renuvex-slot="listing-rating-placeholder"]').length);
}

export async function hasReviewsWidget(page: Page): Promise<boolean> {
  return page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews');
    const root = container?.shadowRoot || null;
    return !!(root && root.querySelector('#renuvex-reviews-widget'));
  });
}

export function widgetErrors(log: RequestLog): string[] {
  return log.consoleErrors.filter((message) => message.includes('[renuvex-pr]') || message.includes('Failed to load'));
}

export async function summarizeWidgetNetwork(log: RequestLog): Promise<WidgetNetworkSummary> {
  const assetUrls = Array.from(new Set(log.urls.filter((url) => {
    return url.startsWith(`${WIDGET_ORIGIN}/widget.js`) || url.startsWith(`${WIDGET_ORIGIN}/widget-runtime/`);
  })));
  let assetBytes = 0;
  for (const assetUrl of assetUrls) {
    const url = new URL(assetUrl);
    const publicPath = url.pathname.replace(/^\/+/, '').replace(/\//g, path.sep);
    const filePath = path.join(process.cwd(), 'public', publicPath);
    try {
      const body = await readFile(filePath);
      assetBytes += body.byteLength;
    } catch {
      // Ignore non-local assets; this summary is evidence, not a hard budget gate.
    }
  }
  return {
    scriptCount: assetUrls.length,
    assetBytes,
    settingsCalls: countUrls(log, '/api/public/settings'),
    ratingsCalls: countUrls(log, '/api/public/ratings?'),
    ratingSlugCalls: countUrls(log, '/api/public/ratings-by-slug'),
    reviewsCalls: countUrls(log, '/api/public/reviews?'),
    chunks: assetUrls
      .map((url) => {
        const match = url.match(/\/widget-runtime\/chunks\/([^/?]+)/);
        return match ? match[1] : null;
      })
      .filter((chunk): chunk is string => !!chunk),
  };
}

export async function hasInReviewsShadow(page: Page, selector: string): Promise<boolean> {
  return page.evaluate((selector) => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews');
    const root = container?.shadowRoot || null;
    return !!(root && root.querySelector(selector));
  }, selector);
}

export async function countInReviewsShadow(page: Page, selector: string): Promise<number> {
  return page.evaluate((selector) => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews');
    const root = container?.shadowRoot || null;
    return root ? root.querySelectorAll(selector).length : 0;
  }, selector);
}

export async function textInReviewsShadow(page: Page, selector: string): Promise<string> {
  return page.evaluate((selector) => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews');
    const root = container?.shadowRoot || null;
    return root?.querySelector(selector)?.textContent?.trim() || '';
  }, selector);
}

export async function widthInReviewsShadow(page: Page, selector: string): Promise<number> {
  return page.evaluate((selector) => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews');
    const root = container?.shadowRoot || null;
    const el = root?.querySelector(selector) as HTMLElement | null;
    return el ? el.getBoundingClientRect().width : 0;
  }, selector);
}

export async function elementWidth(page: Page, selector: string): Promise<number> {
  return page.evaluate((selector) => {
    const el = document.querySelector(selector) as HTMLElement | null;
    return el ? el.getBoundingClientRect().width : 0;
  }, selector);
}

export async function clickInReviewsShadow(page: Page, selector: string): Promise<void> {
  await page.evaluate((selector) => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews');
    const root = container?.shadowRoot || null;
    const el = root?.querySelector<HTMLElement>(selector);
    if (!el) throw new Error(`Missing reviews shadow selector: ${selector}`);
    el.click();
  }, selector);
}

export async function dispatchPreviewSettingsUpdate(page: Page, settings: Record<string, unknown>): Promise<void> {
  await page.evaluate((settings) => {
    window.postMessage({ type: 'RENUVEX_PR_SETTINGS_UPDATE', settings }, '*');
  }, settings);
}

export async function hasOverlay(page: Page, selector: string): Promise<boolean> {
  return page.evaluate((selector) => {
    const roots = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => host.shadowRoot)
      .filter((root): root is ShadowRoot => !!root);
    return roots.some((root) => !!root.querySelector(selector));
  }, selector);
}

export async function clickInOverlay(page: Page, overlaySelector: string, selector: string): Promise<void> {
  await page.evaluate(({ overlaySelector, selector }) => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => host.shadowRoot)
      .filter((candidate): candidate is ShadowRoot => !!candidate)
      .find((candidate) => !!candidate.querySelector(overlaySelector));
    const el = root?.querySelector<HTMLElement>(selector);
    if (!el) throw new Error(`Missing overlay selector: ${selector}`);
    el.click();
  }, { overlaySelector, selector });
}

export async function fillInOverlay(page: Page, overlaySelector: string, selector: string, value: string): Promise<void> {
  await page.evaluate(({ overlaySelector, selector, value }) => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => host.shadowRoot)
      .filter((candidate): candidate is ShadowRoot => !!candidate)
      .find((candidate) => !!candidate.querySelector(overlaySelector));
    const el = root?.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector);
    if (!el) throw new Error(`Missing overlay input: ${selector}`);
    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, { overlaySelector, selector, value });
}

export async function textInOverlay(page: Page, overlaySelector: string, selector: string): Promise<string> {
  return page.evaluate(({ overlaySelector, selector }) => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => host.shadowRoot)
      .filter((candidate): candidate is ShadowRoot => !!candidate)
      .find((candidate) => !!candidate.querySelector(overlaySelector));
    return root?.querySelector(selector)?.textContent?.trim() || '';
  }, { overlaySelector, selector });
}

export async function setFileInputInOverlay(
  page: Page,
  overlaySelector: string,
  selector: string,
  files: UploadFilePayload | UploadFilePayload[],
): Promise<void> {
  const handle = await page.evaluateHandle(({ overlaySelector, selector }) => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => host.shadowRoot)
      .filter((candidate): candidate is ShadowRoot => !!candidate)
      .find((candidate) => !!candidate.querySelector(overlaySelector));
    return root?.querySelector<HTMLInputElement>(selector) || null;
  }, { overlaySelector, selector });
  const input = handle.asElement();
  if (!input) {
    await handle.dispose();
    throw new Error(`Missing overlay file input: ${selector}`);
  }
  await input.setInputFiles(files);
  await handle.dispose();
}

export async function stubVideoMetadata(page: Page, durationSeconds: number): Promise<void> {
  await page.addInitScript((durationSeconds) => {
    const nativeCreateElement = document.createElement.bind(document);
    document.createElement = ((tagName: string, options?: ElementCreationOptions) => {
      const element = nativeCreateElement(tagName, options);
      if (String(tagName).toLowerCase() === 'video') {
        setTimeout(() => {
          Object.defineProperty(element, 'duration', { configurable: true, get: () => durationSeconds });
          const event = new Event('loadedmetadata');
          const video = element as HTMLVideoElement;
          if (typeof video.onloadedmetadata === 'function') video.onloadedmetadata(event);
          element.dispatchEvent(event);
        }, 0);
      }
      return element;
    }) as typeof document.createElement;
  }, durationSeconds);
}

export async function isOverlayControlDisabled(page: Page, overlaySelector: string, selector: string): Promise<boolean> {
  return page.evaluate(({ overlaySelector, selector }) => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => host.shadowRoot)
      .filter((candidate): candidate is ShadowRoot => !!candidate)
      .find((candidate) => !!candidate.querySelector(overlaySelector));
    const el = root?.querySelector<HTMLButtonElement | HTMLInputElement | HTMLTextAreaElement>(selector);
    return !!el?.disabled;
  }, { overlaySelector, selector });
}

declare global {
  interface Window {
    __ikasPreviewMode?: boolean;
    __ikasPreviewBaseUrl?: string;
    __renuvexProductReviewsPreviewSettings?: string;
    __ikasPreviewSettings?: string;
    __renuvexEmitIkasEvent?: (event: { type: string; data?: Record<string, unknown> }) => void;
  }
}

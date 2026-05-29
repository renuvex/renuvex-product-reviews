import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const WIDGET_ORIGIN = process.env.MEASURE_WIDGET_ORIGIN || 'https://new-ikas-app.vercel.app';
const MERCHANT_ORIGIN = process.env.MEASURE_MERCHANT_ORIGIN || 'https://merchant-measure.test';
const PUBLIC_KEY = process.env.MEASURE_PUBLIC_API_KEY || 'ci-public-key';
const REVIEW_CLOUD_NAME = resolveReviewCloudName();
const PRODUCT_ID = 'product-1';
const PRODUCT_NAME = 'Premium';

const scenarios = [
  { key: 'mount-present badge-on', mountReviews: true, badgeEnabled: true },
  { key: 'mount-absent badge-on', mountReviews: false, badgeEnabled: true },
  { key: 'mount-present badge-off', mountReviews: true, badgeEnabled: false },
  { key: 'mount-absent badge-off', mountReviews: false, badgeEnabled: false },
];

function jsonHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  };
}

function imageHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'image/svg+xml; charset=utf-8',
  };
}

function settingsResponse(scenario) {
  return {
    widgets: {
      badge: {
        enabled: scenario.badgeEnabled,
        size: 'medium',
        mobileOverride: false,
        mobileSize: 'small',
      },
      reviews: {
        enabled: true,
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
        richSnippetsEnabled: true,
      },
    },
    runtime: {
      themeAdapterKey: 'ozy',
      adapterSource: 'auto',
      autoPlacementEnabled: true,
      reviewsMountEnabled: true,
    },
  };
}

function ratingsResponse() {
  return {
    data: {
      [PRODUCT_ID]: {
        avg: '4.8',
        count: 12,
      },
    },
  };
}

function reviewImage(name) {
  return `https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/review_images/stores/${PUBLIC_KEY}/${name}.jpg`;
}

function readEnvFileValue(filePath, key) {
  try {
    const body = readFileSync(filePath, 'utf8');
    const pattern = new RegExp(`^\\s*${key}\\s*=\\s*(.*)\\s*$`, 'm');
    const match = body.match(pattern);
    if (!match) return '';
    return match[1].trim().replace(/^['"]|['"]$/g, '');
  } catch (_) {
    return '';
  }
}

function resolveReviewCloudName() {
  const raw = process.env.MEASURE_CLOUDINARY_CLOUD_NAME ||
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME ||
    readEnvFileValue(resolve(process.cwd(), '.env.local'), 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME') ||
    readEnvFileValue(resolve(process.cwd(), '.env.local'), 'CLOUDINARY_CLOUD_NAME') ||
    readEnvFileValue(resolve(process.cwd(), '.env'), 'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME') ||
    readEnvFileValue(resolve(process.cwd(), '.env'), 'CLOUDINARY_CLOUD_NAME') ||
    'renuvex';
  return /^[A-Za-z0-9_-]+$/.test(raw) ? raw : 'renuvex';
}

function reviewsResponse() {
  return {
    data: {
      reviews: [
        {
          id: 'review-1',
          rating: 5,
          title: 'Great',
          comment: 'Works well in deployed transfer measurement.',
          author: 'Mert W.',
          createdAt: '2026-05-28T00:00:00.000Z',
          images: [reviewImage('deployed-measure-1')],
          merchantReply: null,
          recommendation: true,
        },
      ],
      allCount: 12,
      totalCount: 12,
      ratingCounts: [0, 0, 1, 2, 9],
      avgRating: '4.8',
      hasMore: false,
    },
  };
}

function productHtml(mountReviews) {
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
        <p>Controlled deployed widget measurement page.</p>
        ${mountReviews ? '<div data-renuvex-widget="reviews"></div>' : ''}
      </section>
    </main>
  </body>
</html>`;
}

function isWidgetAssetUrl(url) {
  return url.startsWith(`${WIDGET_ORIGIN}/widget.js`) || url.startsWith(`${WIDGET_ORIGIN}/widget-runtime/`);
}

function chunkName(url) {
  const match = url.match(/\/widget-runtime\/chunks\/([^/?]+)/);
  return match ? match[1] : null;
}

function countMatching(urls, needle) {
  return urls.filter((url) => url.includes(needle)).length;
}

function hasChunk(urls, prefix) {
  return urls.some((url) => {
    const name = chunkName(url);
    return name ? name.startsWith(prefix) : false;
  });
}

function pickHeaders(headers) {
  const lower = {};
  for (const [key, value] of Object.entries(headers || {})) {
    lower[key.toLowerCase()] = value;
  }
  return {
    'cache-control': lower['cache-control'] || '',
    'content-encoding': lower['content-encoding'] || '',
    'content-length': lower['content-length'] || '',
  };
}

async function configureRoutes(page, scenario) {
  await page.route(`${WIDGET_ORIGIN}/api/public/settings**`, async (route) => {
    await route.fulfill({
      status: 200,
      headers: jsonHeaders(),
      body: JSON.stringify(settingsResponse(scenario)),
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
    await route.fulfill({
      status: 200,
      headers: jsonHeaders(),
      body: JSON.stringify(reviewsResponse()),
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/widget-error**`, async (route) => {
    await route.fulfill({ status: 204, headers: jsonHeaders(), body: '' });
  });
  await page.route('https://res.cloudinary.com/**', async (route) => {
    await route.fulfill({
      status: 200,
      headers: imageHeaders(),
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect width="24" height="24" fill="#ddd"/></svg>',
    });
  });
  await page.route(`${MERCHANT_ORIGIN}/**`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'text/html; charset=utf-8',
      body: productHtml(scenario.mountReviews),
    });
  });
}

async function waitForScenario(page, scenario) {
  await page.waitForLoadState('domcontentloaded');
  if (scenario.badgeEnabled) {
    await page.waitForFunction(() => !!document.querySelector('[data-renuvex-slot="product-title-rating"] .renuvex-pr-rating-badge--pdp'), null, {
      timeout: 7000,
    }).catch(() => {});
  }
  if (scenario.mountReviews) {
    await page.waitForFunction(() => {
      const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
      const slot = anchor && anchor.querySelector('[data-renuvex-slot="product-reviews"]');
      const container = slot && slot.querySelector('#renuvex-reviews');
      const root = container && container.shadowRoot;
      return !!(root && root.querySelector('#renuvex-reviews-widget'));
    }, null, { timeout: 7000 }).catch(() => {});
  }
  await page.waitForTimeout(1000);
}

async function measureScenario(browser, scenario) {
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  const client = await context.newCDPSession(page);
  const requests = new Map();
  const urls = [];

  await client.send('Network.enable');
  await client.send('Network.setCacheDisabled', { cacheDisabled: true });

  client.on('Network.requestWillBeSent', (event) => {
    requests.set(event.requestId, {
      url: event.request.url,
      type: event.type,
      status: 0,
      headers: {},
      encodedDataLength: 0,
      decodedBytes: null,
    });
  });
  client.on('Network.responseReceived', (event) => {
    const existing = requests.get(event.requestId);
    if (!existing) return;
    existing.type = event.type || existing.type;
    existing.status = event.response.status;
    existing.headers = event.response.headers || {};
  });
  client.on('Network.loadingFinished', (event) => {
    const existing = requests.get(event.requestId);
    if (!existing) return;
    existing.encodedDataLength = event.encodedDataLength || 0;
  });
  page.on('request', (request) => urls.push(request.url()));

  await configureRoutes(page, scenario);
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`, { waitUntil: 'domcontentloaded' });
  await waitForScenario(page, scenario);

  const assetEntries = Array.from(requests.entries())
    .filter(([, item]) => isWidgetAssetUrl(item.url))
    .sort((a, b) => a[1].url.localeCompare(b[1].url));

  for (const [requestId, item] of assetEntries) {
    try {
      const body = await client.send('Network.getResponseBody', { requestId });
      item.decodedBytes = body.base64Encoded ? Buffer.from(body.body, 'base64').byteLength : Buffer.byteLength(body.body);
    } catch (_) {
      item.decodedBytes = null;
    }
  }

  const assetUrls = Array.from(new Set(assetEntries.map(([, item]) => item.url)));
  const chunks = assetUrls.map(chunkName).filter(Boolean);
  const apiCalls = {
    settings: countMatching(urls, '/api/public/settings'),
    ratings: countMatching(urls, '/api/public/ratings?'),
    reviews: countMatching(urls, '/api/public/reviews?'),
    widgetError: countMatching(urls, '/api/public/widget-error'),
  };
  const dom = await page.evaluate(() => ({
    badge: !!document.querySelector('[data-renuvex-slot="product-title-rating"] .renuvex-pr-rating-badge--pdp'),
    jsonLdCount: document.querySelectorAll('#renuvex-pr-jsonld').length,
    reviews: !!(() => {
      const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
      const slot = anchor && anchor.querySelector('[data-renuvex-slot="product-reviews"]');
      const container = slot && slot.querySelector('#renuvex-reviews');
      const root = container && container.shadowRoot;
      return root && root.querySelector('#renuvex-reviews-widget');
    })(),
  }));

  await context.close();

  return {
    scenario: scenario.key,
    scriptCount: assetUrls.length,
    chunks,
    encodedTransferBytes: assetEntries.reduce((sum, [, item]) => sum + (item.encodedDataLength || 0), 0),
    decodedBytes: assetEntries.reduce((sum, [, item]) => sum + (item.decodedBytes || 0), 0),
    apiCalls,
    dom,
    assets: assetEntries.map(([, item]) => ({
      url: item.url,
      status: item.status,
      encodedDataLength: item.encodedDataLength,
      decodedBytes: item.decodedBytes,
      headers: pickHeaders(item.headers),
    })),
  };
}

function validate(results) {
  const byName = Object.fromEntries(results.map((result) => [result.scenario, result]));
  const errors = [];

  if (!byName['mount-present badge-on'].chunks.some((name) => name.startsWith('render-'))) errors.push('mount-present badge-on must load render chunk');
  if (byName['mount-present badge-on'].apiCalls.reviews === 0) errors.push('mount-present badge-on must call reviews API');
  if (byName['mount-present badge-on'].apiCalls.ratings === 0) errors.push('mount-present badge-on must call ratings API');
  if (byName['mount-present badge-on'].dom.jsonLdCount !== 1) errors.push('mount-present badge-on must produce exactly one JSON-LD script');

  if (byName['mount-absent badge-on'].chunks.some((name) => name.startsWith('render-'))) errors.push('mount-absent badge-on must skip render chunk');
  if (byName['mount-absent badge-on'].apiCalls.reviews !== 0) errors.push('mount-absent badge-on must skip reviews API');
  if (!byName['mount-absent badge-on'].dom.badge) errors.push('mount-absent badge-on must still render PDP badge');
  if (byName['mount-absent badge-on'].dom.jsonLdCount !== 1) errors.push('mount-absent badge-on must produce one JSON-LD script');

  if (byName['mount-present badge-off'].apiCalls.ratings !== 1) errors.push('mount-present badge-off must call ratings API for structured data');
  if (byName['mount-present badge-off'].dom.badge) errors.push('mount-present badge-off must not render PDP badge');
  if (byName['mount-present badge-off'].dom.jsonLdCount !== 1) errors.push('mount-present badge-off must emit JSON-LD when reviews render');

  if (byName['mount-absent badge-off'].apiCalls.ratings !== 0) errors.push('mount-absent badge-off must skip ratings API');
  if (byName['mount-absent badge-off'].apiCalls.reviews !== 0) errors.push('mount-absent badge-off must skip reviews API');
  if (byName['mount-absent badge-off'].dom.jsonLdCount !== 0) errors.push('mount-absent badge-off must not emit JSON-LD');

  return errors;
}

function printReport(results) {
  console.log(`# Deployed widget network measurement`);
  console.log(``);
  console.log(`Widget origin: ${WIDGET_ORIGIN}`);
  console.log(`Measured at: ${new Date().toISOString()}`);
  console.log(``);
  console.log(`| Scenario | Scripts | Encoded bytes | Decoded bytes | API calls | Chunks |`);
  console.log(`|---|---:|---:|---:|---|---|`);
  for (const result of results) {
    const calls = `settings:${result.apiCalls.settings}, ratings:${result.apiCalls.ratings}, reviews:${result.apiCalls.reviews}, error:${result.apiCalls.widgetError}`;
    console.log(`| ${result.scenario} | ${result.scriptCount} | ${result.encodedTransferBytes} | ${result.decodedBytes} | ${calls} | ${result.chunks.join(', ')} |`);
  }
  console.log(``);
  console.log(`## JSON`);
  console.log(JSON.stringify(results, null, 2));
}

const browser = await chromium.launch({ headless: true });
try {
  const results = [];
  for (const scenario of scenarios) {
    results.push(await measureScenario(browser, scenario));
  }
  printReport(results);
  const errors = validate(results);
  if (errors.length > 0) {
    console.error(`\nContract failures:`);
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}

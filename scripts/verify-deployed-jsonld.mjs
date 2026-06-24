import { chromium } from '@playwright/test';

const WIDGET_ORIGIN = process.env.SEO_WIDGET_ORIGIN || 'https://widget.renuvex.app';
const MERCHANT_ORIGIN = process.env.SEO_MERCHANT_ORIGIN || 'https://merchant-seo.test';
const PUBLIC_KEY = process.env.SEO_PUBLIC_API_KEY || 'ci-public-key';
const REAL_PDP_URL = process.env.SEO_PDP_URL || '';
const PRODUCT_ID = 'product-1';
const PRODUCT_NAME = 'Premium';

const controlledScenarios = [
  { key: 'controlled badge enabled + review mount present', badgeEnabled: true, mountReviews: true, autoPlacementEnabled: true, richSnippetsEnabled: true, expectJsonLd: true },
  { key: 'controlled badge enabled + review mount absent', badgeEnabled: true, mountReviews: false, autoPlacementEnabled: true, richSnippetsEnabled: true, expectJsonLd: true },
  { key: 'controlled badge disabled + review mount present', badgeEnabled: false, mountReviews: true, autoPlacementEnabled: true, richSnippetsEnabled: true, expectJsonLd: true },
  { key: 'controlled badge disabled + review mount absent', badgeEnabled: false, mountReviews: false, autoPlacementEnabled: true, richSnippetsEnabled: true, expectJsonLd: false },
  { key: 'controlled unsupported theme + review mount present', badgeEnabled: true, mountReviews: true, autoPlacementEnabled: false, richSnippetsEnabled: true, expectJsonLd: true },
  { key: 'controlled rich snippets disabled', badgeEnabled: true, mountReviews: true, autoPlacementEnabled: true, richSnippetsEnabled: false, expectJsonLd: false },
];

function jsonHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
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
        showMediaGallery: true,
        reviewIcon: 'star',
        reviewStarColor: '#f59e0b',
        richSnippetsEnabled: scenario.richSnippetsEnabled !== false,
      },
    },
    runtime: {
      themeAdapterKey: scenario.autoPlacementEnabled ? 'ozy' : 'generic',
      adapterSource: scenario.autoPlacementEnabled ? 'auto' : 'generic_unknown',
      autoPlacementEnabled: scenario.autoPlacementEnabled,
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

function reviewsResponse() {
  return {
    data: {
      reviews: [],
      allCount: 12,
      totalCount: 12,
      ratingCounts: [0, 0, 1, 2, 9],
      avgRating: '4.8',
      hasMore: false,
    },
  };
}

function productHtml(scenario) {
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
        ${scenario.mountReviews === false ? '' : '<div data-renuvex-widget="reviews"></div>'}
      </section>
    </main>
  </body>
</html>`;
}

async function configureControlledRoutes(page, scenario) {
  await page.route(`${WIDGET_ORIGIN}/api/public/settings**`, async (route) => {
    await route.fulfill({ status: 200, headers: jsonHeaders(), body: JSON.stringify(settingsResponse(scenario)) });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/ratings**`, async (route) => {
    await route.fulfill({ status: 200, headers: jsonHeaders(), body: JSON.stringify(ratingsResponse()) });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/reviews**`, async (route) => {
    await route.fulfill({ status: 200, headers: jsonHeaders(), body: JSON.stringify(reviewsResponse()) });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/widget-error**`, async (route) => {
    await route.fulfill({ status: 204, headers: jsonHeaders(), body: '' });
  });
  await page.route('https://res.cloudinary.com/**', async (route) => {
    await route.fulfill({
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'image/svg+xml; charset=utf-8',
      },
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"></svg>',
    });
  });
  await page.route(`${MERCHANT_ORIGIN}/**`, async (route) => {
    await route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: productHtml(scenario) });
  });
}

async function waitForWidget(page, options = {}) {
  const expectJsonLd = Boolean(options.expectJsonLd);
  await page.waitForLoadState('domcontentloaded');

  if (expectJsonLd) {
    await page.waitForFunction(() => {
      return !!document.querySelector('#renuvex-pr-jsonld');
    }, null, { timeout: 10000 }).catch(() => {});
    return;
  }

  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(1000);
}

function validateProductJsonLd(parsed) {
  const errors = [];
  if (!parsed || parsed['@type'] !== 'Product') errors.push('JSON-LD @type must be Product');
  const aggregateRating = parsed && parsed.aggregateRating;
  if (!aggregateRating || aggregateRating['@type'] !== 'AggregateRating') errors.push('aggregateRating @type must be AggregateRating');
  const ratingValue = Number(aggregateRating && aggregateRating.ratingValue);
  const reviewCount = Number(aggregateRating && aggregateRating.reviewCount);
  if (!Number.isFinite(ratingValue) || ratingValue < 1 || ratingValue > 5) errors.push('aggregateRating.ratingValue must be a number from 1 to 5');
  if (!Number.isInteger(reviewCount) || reviewCount < 1) errors.push('aggregateRating.reviewCount must be a positive integer');
  return errors;
}

async function readJsonLdState(page) {
  return page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll('#renuvex-pr-jsonld'));
    return {
      count: nodes.length,
      texts: nodes.map((node) => node.textContent || ''),
    };
  });
}

async function runControlledScenario(browser, scenario) {
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  await configureControlledRoutes(page, scenario);
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`, { waitUntil: 'domcontentloaded' });
  await waitForWidget(page, { expectJsonLd: scenario.expectJsonLd });
  const state = await readJsonLdState(page);
  await context.close();

  const errors = [];
  let parsed = null;
  if (scenario.expectJsonLd) {
    if (state.count !== 1) {
      errors.push(`expected exactly one JSON-LD script, found ${state.count}`);
    } else {
      try {
        parsed = JSON.parse(state.texts[0]);
        errors.push(...validateProductJsonLd(parsed));
      } catch (error) {
        errors.push(`JSON-LD parse failed: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  } else if (state.count !== 0) {
    errors.push(`expected no JSON-LD script, found ${state.count}`);
  }

  return {
    scenario: scenario.key,
    url: `${MERCHANT_ORIGIN}/premium-shorts`,
    jsonLdCount: state.count,
    parsed,
    errors,
  };
}

async function runRealUrl(browser, url) {
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await waitForWidget(page, { expectJsonLd: true });
  const state = await readJsonLdState(page);
  await context.close();

  const errors = [];
  let parsed = null;
  if (state.count !== 1) {
    errors.push(`expected exactly one JSON-LD script, found ${state.count}`);
  } else {
    try {
      parsed = JSON.parse(state.texts[0]);
      errors.push(...validateProductJsonLd(parsed));
    } catch (error) {
      errors.push(`JSON-LD parse failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return {
    scenario: 'real PDP URL',
    url,
    jsonLdCount: state.count,
    parsed,
    errors,
  };
}

function printReport(results) {
  console.log(`# Deployed JSON-LD verification`);
  console.log(``);
  console.log(`Widget origin: ${WIDGET_ORIGIN}`);
  console.log(`Measured at: ${new Date().toISOString()}`);
  console.log(``);
  console.log(`| Scenario | URL | JSON-LD count | Result |`);
  console.log(`|---|---|---:|---|`);
  for (const result of results) {
    console.log(`| ${result.scenario} | ${result.url} | ${result.jsonLdCount} | ${result.errors.length === 0 ? 'pass' : result.errors.join('; ')} |`);
  }
  console.log(``);
  console.log(`Google Rich Results Test remains manual: https://search.google.com/test/rich-results`);
  console.log(``);
  console.log(`## JSON`);
  console.log(JSON.stringify(results, null, 2));
}

const browser = await chromium.launch({ headless: true });
try {
  const results = [];
  if (REAL_PDP_URL) {
    results.push(await runRealUrl(browser, REAL_PDP_URL));
  } else {
    for (const scenario of controlledScenarios) {
      results.push(await runControlledScenario(browser, scenario));
    }
  }
  printReport(results);
  const failures = results.flatMap((result) => result.errors.map((error) => `${result.scenario}: ${error}`));
  if (failures.length > 0) {
    console.error(`\nStructured data verification failures:`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}

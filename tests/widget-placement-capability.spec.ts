import { expect, test, type Page } from '@playwright/test';
import {
  MERCHANT_ORIGIN,
  LEGACY_PLACEMENT_RUNTIME_ENTRY,
  PRODUCT_NAME,
  PUBLIC_KEY,
  countListingBadges,
  countUrls,
  hasPdpBadge,
  settingsResponse,
  setupProductListingFallbackPage,
  setupWidgetRoutes,
  widgetErrors,
} from './widget-harness';

async function listingBadgeIdentities(page: Page) {
  return page.locator('[data-renuvex-slot="listing-rating"]').evaluateAll((slots) => slots.map((slot) => ({
    slotProductId: slot.getAttribute('data-renuvex-product-id'),
    badgeProductId: slot.querySelector('.renuvex-pr-rating-badge--listing')?.getAttribute('data-renuvex-product-id') ?? null,
  })));
}

test('provider-verified placement requires an exact Ozy PDP target', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: false,
    productMarkup: '<section class="product-detail"><h1>Premium</h1></section>',
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium`);
  await page.waitForTimeout(800);

  expect(await hasPdpBadge(page)).toBe(false);
  expect(countUrls(log, '/api/public/ratings')).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('runtime attestation enables the exact Ozy PDP target without provider adapter identity', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: false,
    runtime: {
      themeAdapterKey: 'generic',
      placementPolicy: { version: 1, mode: 'runtime_attestation' },
    },
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium`);
  await expect.poll(() => hasPdpBadge(page)).toBe(true);

  expect(countUrls(log, '/api/public/ratings')).toBe(1);
  expect(widgetErrors(log)).toEqual([]);
});

test('unknown or missing placement policy stays fail-closed even when legacy boolean is true', async ({ page }) => {
  const legacyPayload = settingsResponse({}) as {
    runtime: Record<string, unknown>;
  };
  delete legacyPayload.runtime.placementPolicy;
  legacyPayload.runtime.autoPlacementEnabled = true;

  const log = await setupWidgetRoutes(page, {
    mountReviews: false,
    settingsPayload: legacyPayload,
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium`);
  await page.waitForTimeout(800);

  expect(await hasPdpBadge(page)).toBe(false);
  expect(countUrls(log, '/api/public/ratings')).toBe(0);
});

test('an unknown placement policy version cannot fall back to the legacy boolean', async ({ page }) => {
  const payload = settingsResponse({}) as { runtime: Record<string, unknown> };
  payload.runtime.placementPolicy = { version: 2, mode: 'provider_verified' };
  payload.runtime.autoPlacementEnabled = true;
  const log = await setupWidgetRoutes(page, { mountReviews: false, settingsPayload: payload });
  await page.goto(`${MERCHANT_ORIGIN}/premium`);
  await page.waitForTimeout(800);

  expect(await hasPdpBadge(page)).toBe(false);
  expect(countUrls(log, '/api/public/ratings')).toBe(0);
});

test('PDP attestation waits for slow DOM insertion without a two-second correctness cutoff', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: false,
    productMarkup: `<section id="late-product"><h1>Loading</h1></section>
      <script>
        setTimeout(function () {
          var section = document.getElementById('late-product');
          section.className = 'product-detail product-name-main';
          section.querySelector('h1').className = 'product-name';
          section.querySelector('h1').textContent = ${JSON.stringify(PRODUCT_NAME)};
        }, 2300);
      </script>`,
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium`);
  await expect.poll(() => hasPdpBadge(page), { timeout: 7000 }).toBe(true);

  expect(countUrls(log, '/api/public/ratings')).toBe(1);
  expect(widgetErrors(log)).toEqual([]);
});

test('PDP attestation reacts when an existing title gains its strict selector', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: false,
    productMarkup: `<section class="product-detail"><h1 id="late-title">${PRODUCT_NAME}</h1></section>
      <script>
        setTimeout(function () {
          document.getElementById('late-title').className = 'product-name';
        }, 2300);
      </script>`,
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium`);
  await expect.poll(() => hasPdpBadge(page), { timeout: 7000 }).toBe(true);

  expect(countUrls(log, '/api/public/ratings')).toBe(1);
  expect(widgetErrors(log)).toEqual([]);
});

test('a rating response cannot inject after storefront navigation invalidates its proof', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: false,
    ratingDelayMs: 700,
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium`);
  await expect.poll(() => countUrls(log, '/api/public/ratings')).toBe(1);
  await page.evaluate(() => history.pushState({}, '', '/another-product'));
  await page.waitForTimeout(900);

  expect(await hasPdpBadge(page)).toBe(false);
  expect(widgetErrors(log)).toEqual([]);
});

test('rapid A to B to A navigation can mount the current A proof', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: false,
    ratingDelayMs: 700,
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium`);
  await expect.poll(() => countUrls(log, '/api/public/ratings')).toBe(1);
  await page.evaluate(() => {
    const emit = (window as Window & { __renuvexEmitIkasEvent?: (event: unknown) => void }).__renuvexEmitIkasEvent;
    history.pushState({}, '', '/linen');
    emit?.({ type: 'PRODUCT_VIEW', data: { productDetail: { id: 'product-2', name: 'Linen' } } });
    history.pushState({}, '', '/premium');
    emit?.({ type: 'PRODUCT_VIEW', data: { productDetail: { id: 'product-1', name: 'Premium' } } });
  });

  await expect.poll(() => hasPdpBadge(page), { timeout: 5000 }).toBe(true);
  expect(widgetErrors(log)).toEqual([]);
});

test('strict Ozy listing placement does not require product media', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    listingMarkup: `<section class="category-products-main">
      <article><a href="/premium-shorts"><h2 class="product-name">Premium Shorts</h2></a></article>
      <article><a href="/linen-shirt"><h2 class="product-name">Linen Shirt</h2></a></article>
    </section>`,
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(2);

  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(1);
  expect(await listingBadgeIdentities(page)).toEqual([
    { slotProductId: 'product-1', badgeProductId: 'product-1' },
    { slotProductId: 'product-2', badgeProductId: 'product-2' },
  ]);
  expect(widgetErrors(log)).toEqual([]);
});

test('a Product ID-less legacy slug response cannot create a visible badge', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    ratingsBySlugHandler: async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: { 'premium-shorts': { avg: '4.8', count: 12 } } }),
      });
    },
    listingMarkup: '<section class="category-products-main"><article><a href="/premium-shorts"><h2 class="product-name">Premium Shorts</h2></a></article></section>',
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 6000 }).toBe(1);
  await page.waitForTimeout(500);

  expect(await countListingBadges(page)).toBe(0);
  expect(await page.locator('[data-renuvex-slot="listing-rating-placeholder"]').count()).toBe(0);
});

test('the V2 slug cache is ignored by the Product ID runtime', async ({ page }) => {
  await page.addInitScript((key) => {
    sessionStorage.setItem(key, JSON.stringify({
      t: Date.now(),
      v: { 'premium-shorts': { avg: '4.8', count: 12 } },
    }));
  }, `renuvex_pr_ratings_v2_${PUBLIC_KEY}`);
  const log = await setupProductListingFallbackPage(page, {
    ratingsBySlugHandler: async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: {} }) });
    },
    listingMarkup: '<section class="category-products-main"><article><a href="/premium-shorts"><h2 class="product-name">Premium Shorts</h2></a></article></section>',
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 6000 }).toBe(1);
  await page.waitForTimeout(400);

  expect(await countListingBadges(page)).toBe(0);
  expect(await page.evaluate((key) => sessionStorage.getItem(key), `renuvex_pr_ratings_v2_${PUBLIC_KEY}`)).not.toBeNull();
});

test('one resolved Product ID can attest multiple cards for the same product', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    listingMarkup: `<section class="category-products-main">
      <article><a href="/premium-shorts"><h2 class="product-name">Premium Shorts</h2></a></article>
      <article><a href="/premium-shorts"><h2 class="product-name">Premium Shorts</h2></a></article>
    </section>`,
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(2);

  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(1);
  expect(await listingBadgeIdentities(page)).toEqual([
    { slotProductId: 'product-1', badgeProductId: 'product-1' },
    { slotProductId: 'product-1', badgeProductId: 'product-1' },
  ]);
});

test('duplicate storefront rows with the same slug and Product ID remain valid', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    listingMarkup: `<section class="category-products-main">
      <article><a href="/premium-shorts"><h2 class="product-name">Premium Shorts</h2></a></article>
      <article><a href="/premium-shorts"><h2 class="product-name">Premium Shorts</h2></a></article>
    </section>`,
    ikasEvents: [
      { type: 'PAGE_VIEW', data: { pageType: 'CATEGORY' } },
      { type: 'VIEW_LISTING', data: { productDetails: [
        { id: 'product-1', name: 'Premium Shorts', slug: 'premium-shorts' },
        { id: 'product-1', name: 'Premium Shorts', slug: 'premium-shorts' },
      ] } },
    ],
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(2);

  expect(countUrls(log, '/api/public/ratings?')).toBe(1);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(0);
  expect(await listingBadgeIdentities(page)).toEqual([
    { slotProductId: 'product-1', badgeProductId: 'product-1' },
    { slotProductId: 'product-1', badgeProductId: 'product-1' },
  ]);
});

const invalidSlugResponseCases = [
  {
    name: 'an unexpected response key',
    fulfill: { status: 200, body: { data: {
      'premium-shorts': { productId: 'product-1', avg: '4.8', count: 12 },
      'not-requested': { productId: 'other-product', avg: '5.0', count: 1 },
    } } },
  },
  {
    name: 'a malformed Product ID',
    fulfill: { status: 200, body: { data: {
      'premium-shorts': { productId: '   ', avg: '4.8', count: 12 },
    } } },
  },
  {
    name: 'a malformed rating',
    fulfill: { status: 200, body: { data: {
      'premium-shorts': { productId: 'product-1', avg: '8.0', count: 12 },
    } } },
  },
  {
    name: 'an HTTP 429 response',
    fulfill: { status: 429, body: { data: {} } },
  },
] as const;

for (const responseCase of invalidSlugResponseCases) {
  test(`${responseCase.name} cannot create a visible badge`, async ({ page }) => {
    const log = await setupProductListingFallbackPage(page, {
      listingMarkup: '<section class="category-products-main"><article><a href="/premium-shorts"><h2 class="product-name">Premium Shorts</h2></a></article></section>',
      ratingsBySlugHandler: async (route) => {
        await route.fulfill({
          status: responseCase.fulfill.status,
          contentType: 'application/json',
          body: JSON.stringify(responseCase.fulfill.body),
        });
      },
    });
    await page.goto(`${MERCHANT_ORIGIN}/clothing`);
    await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 6000 }).toBe(1);
    await page.waitForTimeout(500);

    expect(await countListingBadges(page)).toBe(0);
    expect(await page.locator('[data-renuvex-slot="listing-rating-placeholder"]').count()).toBe(0);
  });
}

test('mixed event and slug candidates use canonical and discovery batches independently', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    ikasEvents: [
      { type: 'PAGE_VIEW', data: { pageType: 'CATEGORY' } },
      { type: 'VIEW_LISTING', data: { productDetails: [
        { id: 'product-1', name: 'Premium Shorts', slug: 'premium-shorts' },
        { name: 'Linen Shirt', slug: 'linen-shirt' },
      ] } },
    ],
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(2);

  expect(countUrls(log, '/api/public/ratings?')).toBe(1);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(1);
  expect(await listingBadgeIdentities(page)).toEqual([
    { slotProductId: 'product-1', badgeProductId: 'product-1' },
    { slotProductId: 'product-2', badgeProductId: 'product-2' },
  ]);
});

test('conflicting event Product IDs block direct reads and slug fallback', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    listingMarkup: '<section class="category-products-main"><article><a href="/premium-shorts"><h2 class="product-name">Premium Shorts</h2></a></article></section>',
    ikasEvents: [
      { type: 'PAGE_VIEW', data: { pageType: 'CATEGORY' } },
      { type: 'VIEW_LISTING', data: { productDetails: [
        { id: 'product-1', name: 'Premium Shorts', slug: 'premium-shorts' },
        { id: 'product-2', name: 'Premium Shorts', slug: 'premium-shorts' },
      ] } },
    ],
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await page.waitForTimeout(2600);

  expect(await countListingBadges(page)).toBe(0);
  expect(countUrls(log, '/api/public/ratings?')).toBe(0);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(0);
});

test('a rendered card retires its old Product ID synchronously on a new event generation', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    listingMarkup: '<section class="category-products-main"><article><a href="/premium-shorts"><h2 class="product-name">Premium Shorts</h2></a></article></section>',
    ikasEvents: [
      { type: 'PAGE_VIEW', data: { pageType: 'CATEGORY' } },
      { type: 'VIEW_LISTING', data: { productDetails: [
        { id: 'product-1', name: 'Premium Shorts', slug: 'premium-shorts' },
      ] } },
    ],
    ratingsHandler: async (route) => {
      const ids = new URL(route.request().url()).searchParams.get('productIds')?.split(',') ?? [];
      const data = Object.fromEntries(ids.map((id) => [id, { avg: '4.8', count: 12 }]));
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data }) });
    },
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(1);

  const immediate = await page.evaluate(() => {
    const emit = (window as Window & { __renuvexEmitIkasEvent?: (event: unknown) => void }).__renuvexEmitIkasEvent;
    emit?.({ type: 'VIEW_LISTING', data: { productDetails: [
      { id: 'replacement-product', name: 'Premium Shorts', slug: 'premium-shorts' },
    ] } });
    return document.querySelectorAll('[data-renuvex-slot="listing-rating"]').length;
  });
  expect(immediate).toBe(0);
  await expect.poll(async () => (await listingBadgeIdentities(page))[0]?.slotProductId, { timeout: 6000 })
    .toBe('replacement-product');
  expect(countUrls(log, '/api/public/ratings?')).toBe(2);
});

test('a modal opened while slug identity is resolving receives only the promoted Product ID', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    ratingDelayMs: 800,
    listingMarkup: `<section class="category-products-main">
      <article><a id="trusted-pending-card" href="/premium-shorts" onclick="event.preventDefault();setTimeout(function(){document.body.insertAdjacentHTML('beforeend','<div class=&quot;add-to-basket-modal&quot;><h1 class=&quot;product-name&quot;>Premium Shorts</h1></div>')},0)"><h2 class="product-name">Premium Shorts</h2></a></article>
    </section>`,
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 6000 }).toBe(1);
  await page.click('#trusted-pending-card');

  await expect.poll(() => page.locator('.add-to-basket-modal [data-renuvex-slot="listing-rating"]').count(), { timeout: 6000 }).toBe(1);
  const identity = await page.locator('.add-to-basket-modal [data-renuvex-slot="listing-rating"]').evaluate((slot) => ({
    slotProductId: slot.getAttribute('data-renuvex-product-id'),
    badgeProductId: slot.querySelector('.renuvex-pr-rating-badge--listing')?.getAttribute('data-renuvex-product-id'),
  }));
  expect(identity).toEqual({ slotProductId: 'product-1', badgeProductId: 'product-1' });
});

test('a resolved quick-view survives same-link Product ID event enrichment', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    listingMarkup: `<section class="category-products-main">
      <article><a id="enriched-card" href="/premium-shorts" onclick="event.preventDefault();setTimeout(function(){document.body.insertAdjacentHTML('beforeend','<div class=&quot;add-to-basket-modal&quot;><h1 class=&quot;product-name&quot;>Premium Shorts</h1></div>')},0)"><h2 class="product-name">Premium Shorts</h2></a></article>
    </section>`,
    ikasEvents: [{ type: 'PAGE_VIEW', data: { pageType: 'CATEGORY' } }],
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(1);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(1);

  await page.click('#enriched-card');
  await page.evaluate(() => {
    const emit = (window as Window & { __renuvexEmitIkasEvent?: (event: unknown) => void }).__renuvexEmitIkasEvent;
    emit?.({ type: 'VIEW_LISTING', data: { productDetails: [
      { id: 'product-1', name: 'Premium Shorts', slug: 'premium-shorts' },
    ] } });
  });

  const modalSlot = page.locator('.add-to-basket-modal [data-renuvex-slot="listing-rating"]');
  await expect.poll(() => modalSlot.count(), { timeout: 6000 }).toBe(1);
  await expect(modalSlot).toHaveAttribute('data-renuvex-product-id', 'product-1');
  await expect(modalSlot.locator('.renuvex-pr-rating-badge--listing')).toHaveAttribute('data-renuvex-product-id', 'product-1');
});

test('a quick-view cannot cross an event generation with a different Product ID', async ({ page }) => {
  await setupProductListingFallbackPage(page, {
    listingMarkup: `<section class="category-products-main">
      <article><a id="changed-id-card" href="/premium-shorts" onclick="event.preventDefault();setTimeout(function(){document.body.insertAdjacentHTML('beforeend','<div class=&quot;add-to-basket-modal&quot;><h1 class=&quot;product-name&quot;>Premium Shorts</h1></div>')},0)"><h2 class="product-name">Premium Shorts</h2></a></article>
    </section>`,
    ikasEvents: [
      { type: 'PAGE_VIEW', data: { pageType: 'CATEGORY' } },
      { type: 'VIEW_LISTING', data: { productDetails: [
        { id: 'product-1', name: 'Premium Shorts', slug: 'premium-shorts' },
      ] } },
    ],
    ratingsHandler: async (route) => {
      const ids = new URL(route.request().url()).searchParams.get('productIds')?.split(',') ?? [];
      const data = Object.fromEntries(ids.map((id) => [id, { avg: '4.8', count: 12 }]));
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data }) });
    },
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(1);

  await page.click('#changed-id-card');
  await page.evaluate(() => {
    const emit = (window as Window & { __renuvexEmitIkasEvent?: (event: unknown) => void }).__renuvexEmitIkasEvent;
    emit?.({ type: 'VIEW_LISTING', data: { productDetails: [
      { id: 'replacement-product', name: 'Premium Shorts', slug: 'premium-shorts' },
    ] } });
  });

  await expect.poll(async () => (await listingBadgeIdentities(page))[0]?.slotProductId, { timeout: 6000 })
    .toBe('replacement-product');
  await expect(page.locator('.add-to-basket-modal')).toHaveCount(1);
  await expect(page.locator('.add-to-basket-modal [data-renuvex-slot="listing-rating"]')).toHaveCount(0);
});

test('carousel mutations do not duplicate an in-flight or resolved-empty slug read', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    ratingsBySlugHandler: async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: { 'premium-shorts': { productId: 'product-1', avg: '4.8', count: 12 } } }),
      });
    },
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 6000 }).toBe(1);

  await page.evaluate(() => {
    const listing = document.querySelector('.category-products-main');
    [100, 450, 1200].forEach((delay, index) => {
      setTimeout(() => listing?.setAttribute('style', `transform:translateX(-${index + 1}px)`), delay);
    });
  });

  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(1);
  await page.waitForTimeout(1200);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(1);
  expect(widgetErrors(log)).toEqual([]);
});

test('a new strict card added during an in-flight batch queues one follow-up read', async ({ page }) => {
  let attempts = 0;
  const log = await setupProductListingFallbackPage(page, {
    ratingsBySlugHandler: async (route) => {
      attempts += 1;
      if (attempts === 1) await new Promise((resolve) => setTimeout(resolve, 800));
      const slugs = new URL(route.request().url()).searchParams.get('slugs')?.split(',') ?? [];
      const data = Object.fromEntries(slugs.map((slug) => [slug, {
        productId: `resolved-${slug}`,
        avg: '4.7',
        count: 5,
      }]));
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data }) });
    },
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 6000 }).toBe(1);

  await page.evaluate(() => {
    document.querySelector('.category-products-main')?.insertAdjacentHTML(
      'beforeend',
      '<article class="product-card"><a href="/new-arrival"><h2 class="product-name">New Arrival</h2></a></article>',
    );
  });

  await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 6000 }).toBe(2);
  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(3);
  await page.waitForTimeout(700);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(2);
  expect(widgetErrors(log)).toEqual([]);
});

test('a failed slug read remains retryable and a successful empty retry is deduped', async ({ page }) => {
  let attempts = 0;
  const log = await setupProductListingFallbackPage(page, {
    ratingsBySlugHandler: async (route) => {
      attempts += 1;
      if (attempts === 1) {
        await route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'unavailable' }) });
        return;
      }
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: {} }) });
    },
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 6000 }).toBe(1);
  await page.waitForTimeout(500);

  await page.evaluate(() => {
    document.querySelector('.category-products-main')?.setAttribute('style', 'transform:translateX(-1px)');
  });
  await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 6000 }).toBe(2);
  await page.waitForTimeout(500);

  await page.evaluate(() => {
    document.querySelector('.category-products-main')?.setAttribute('style', 'transform:translateX(-2px)');
  });
  await page.waitForTimeout(800);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(2);
  expect(await countListingBadges(page)).toBe(0);
  expect(widgetErrors(log).filter((message) => !message.includes('503 (Service Unavailable)'))).toEqual([]);
});

test('a recycled product card cannot receive the previous slug rating response', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, { ratingDelayMs: 700 });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 6000 }).toBe(1);
  await page.evaluate(() => {
    const first = document.querySelector('.category-products-main article');
    const link = first?.querySelector('a');
    const title = first?.querySelector('.product-name');
    link?.setAttribute('href', '/new-arrival');
    if (title) title.textContent = 'New Arrival';
  });
  await page.waitForTimeout(1800);

  expect(await page.locator('.category-products-main article').first().locator('[data-renuvex-slot="listing-rating"]').count()).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('a changed current-event product id invalidates an in-flight listing proof', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    ratingDelayMs: 700,
    ikasEvents: [
      { type: 'PAGE_VIEW', data: { pageType: 'CATEGORY' } },
      {
        type: 'VIEW_LISTING',
        data: {
          productDetails: [
            { id: 'product-1', name: 'Premium Shorts', slug: 'premium-shorts' },
            { id: 'product-2', name: 'Linen Shirt', slug: 'linen-shirt' },
          ],
        },
      },
    ],
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countUrls(log, '/api/public/ratings?'), { timeout: 6000 }).toBeGreaterThanOrEqual(1);
  await page.evaluate(() => {
    const emit = (window as Window & { __renuvexEmitIkasEvent?: (event: unknown) => void }).__renuvexEmitIkasEvent;
    emit?.({
      type: 'VIEW_LISTING',
      data: {
        productDetails: [
          { id: 'replacement-product', name: 'Premium Shorts', slug: 'premium-shorts' },
          { id: 'product-2', name: 'Linen Shirt', slug: 'linen-shirt' },
        ],
      },
    });
  });
  await page.waitForTimeout(1800);

  expect(await page.locator('.category-products-main article').first().locator('[data-renuvex-slot="listing-rating"]').count()).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('legacy class-substring listing containers are not placement authority', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    listingMarkup: `<section class="merchant-product-list-grid">
      <a href="/premium-shorts"><h2 class="product-name">Premium Shorts</h2></a>
      <a href="/linen-shirt"><h2 class="product-name">Linen Shirt</h2></a>
    </section>`,
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await page.waitForTimeout(2600);

  expect(await countListingBadges(page)).toBe(0);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(0);
});

test('quick-view modal identity comes only from an attested product-card click', async ({ page }) => {
  await setupProductListingFallbackPage(page, {
    listingMarkup: `<section class="category-products-main">
      <article><a id="trusted-card" href="/premium-shorts" onclick="event.preventDefault();setTimeout(function(){document.body.insertAdjacentHTML('beforeend','<div class=&quot;add-to-basket-modal&quot;><h1 class=&quot;product-name&quot;>Premium Shorts</h1></div>')},0)"><h2 class="product-name">Premium Shorts</h2></a></article>
      <article><a href="/linen-shirt"><h2 class="product-name">Linen Shirt</h2></a></article>
    </section>`,
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(2);
  await page.click('#trusted-card');

  await expect.poll(() => page.locator('.add-to-basket-modal [data-renuvex-slot="listing-rating"]').count()).toBe(1);
});

test('a reused modal retires its old Product ID badge when the title changes', async ({ page }) => {
  await setupProductListingFallbackPage(page, {
    listingMarkup: `<section class="category-products-main">
      <article><a id="trusted-card" href="/premium-shorts" onclick="event.preventDefault();setTimeout(function(){document.body.insertAdjacentHTML('beforeend','<div class=&quot;add-to-basket-modal&quot;><h1 class=&quot;product-name&quot;>Premium Shorts</h1></div>')},0)"><h2 class="product-name">Premium Shorts</h2></a></article>
    </section>`,
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(1);
  await page.click('#trusted-card');
  await expect.poll(() => page.locator('.add-to-basket-modal [data-renuvex-slot="listing-rating"]').count()).toBe(1);

  await page.locator('.add-to-basket-modal .product-name').evaluate((title) => {
    title.textContent = 'Recycled Product';
  });

  await expect.poll(() => page.locator('.add-to-basket-modal [data-renuvex-slot="listing-rating"]').count()).toBe(0);
});

test('closing a modal invalidates its click context before another modal appears', async ({ page }) => {
  await setupProductListingFallbackPage(page, {
    listingMarkup: `<section class="category-products-main">
      <article><a id="trusted-card" href="/premium-shorts" onclick="event.preventDefault();setTimeout(function(){document.body.insertAdjacentHTML('beforeend','<div class=&quot;add-to-basket-modal&quot;><h1 class=&quot;product-name&quot;>Premium Shorts</h1></div>')},0)"><h2 class="product-name">Premium Shorts</h2></a></article>
      <article><a href="/linen-shirt"><h2 class="product-name">Linen Shirt</h2></a></article>
    </section>`,
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(2);
  await page.click('#trusted-card');
  await expect.poll(() => page.locator('.add-to-basket-modal [data-renuvex-slot="listing-rating"]').count()).toBe(1);

  await page.evaluate(() => {
    document.querySelector('.add-to-basket-modal')?.remove();
  });
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    document.body.insertAdjacentHTML('beforeend', '<div class="add-to-basket-modal"><h1 class="product-name">Premium Shorts</h1></div>');
  });
  await page.waitForTimeout(800);

  expect(await page.locator('.add-to-basket-modal [data-renuvex-slot="listing-rating"]').count()).toBe(0);
});

test('multiple visible modals cannot receive a badge from one click context', async ({ page }) => {
  await setupProductListingFallbackPage(page, {
    listingMarkup: `<section class="category-products-main">
      <article><a id="trusted-card" href="/premium-shorts" onclick="event.preventDefault()"><h2 class="product-name">Premium Shorts</h2></a></article>
    </section>`,
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(1);
  await page.click('#trusted-card');
  await page.evaluate(() => {
    document.body.insertAdjacentHTML('beforeend', '<div class="add-to-basket-modal"><h1 class="product-name">Premium Shorts</h1></div>');
    document.body.insertAdjacentHTML('beforeend', '<div class="add-to-basket-modal"><h1 class="product-name">Premium Shorts</h1></div>');
  });
  await page.waitForTimeout(800);

  expect(await page.locator('.add-to-basket-modal [data-renuvex-slot="listing-rating"]').count()).toBe(0);
  await page.locator('.add-to-basket-modal').first().evaluate((modal) => modal.remove());
  await page.waitForTimeout(800);
  expect(await page.locator('.add-to-basket-modal [data-renuvex-slot="listing-rating"]').count()).toBe(0);
});

test('a replacement modal cannot reuse context closed before slug resolution', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    ratingDelayMs: 800,
    listingMarkup: `<section class="category-products-main">
      <article><a id="trusted-card" href="/premium-shorts" onclick="event.preventDefault();setTimeout(function(){document.body.insertAdjacentHTML('beforeend','<div id=&quot;first-modal&quot; class=&quot;add-to-basket-modal&quot;><h1 class=&quot;product-name&quot;>Premium Shorts</h1></div>');setTimeout(function(){document.getElementById('first-modal')?.remove();document.body.insertAdjacentHTML('beforeend','<div id=&quot;replacement-modal&quot; class=&quot;add-to-basket-modal&quot;><h1 class=&quot;product-name&quot;>Premium Shorts</h1></div>')},100)},0)"><h2 class="product-name">Premium Shorts</h2></a></article>
    </section>`,
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 6000 }).toBe(1);
  await page.click('#trusted-card');
  await page.waitForTimeout(1400);

  expect(await page.locator('#replacement-modal [data-renuvex-slot="listing-rating"]').count()).toBe(0);
});

test('a modal hidden before its delayed rating response cannot receive a badge', async ({ page }) => {
  await setupProductListingFallbackPage(page, {
    ratingDelayMs: 700,
    listingMarkup: `<section class="category-products-main">
      <article><a id="trusted-card" href="/premium-shorts" onclick="event.preventDefault();setTimeout(function(){document.body.insertAdjacentHTML('beforeend','<div class=&quot;add-to-basket-modal&quot;><h1 class=&quot;product-name&quot;>Premium Shorts</h1></div>');setTimeout(function(){var modal=document.querySelector('.add-to-basket-modal');if(modal)modal.style.display='none'},100)},0)"><h2 class="product-name">Premium Shorts</h2></a></article>
      <article><a href="/linen-shirt"><h2 class="product-name">Linen Shirt</h2></a></article>
    </section>`,
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(2);
  await page.click('#trusted-card');
  await page.waitForTimeout(1200);

  expect(await page.locator('.add-to-basket-modal [data-renuvex-slot="listing-rating"]').count()).toBe(0);
});

test('an untrusted product-like click cannot authorize modal placement by matching title text', async ({ page }) => {
  await setupProductListingFallbackPage(page, {
    listingMarkup: `<a id="untrusted-card" href="/premium-shorts" onclick="event.preventDefault();setTimeout(function(){document.body.insertAdjacentHTML('beforeend','<div class=&quot;add-to-basket-modal&quot;><h1 class=&quot;product-name&quot;>Premium Shorts</h1></div>')},0)">Open product</a>
      <section class="category-products-main">
        <article><a href="/linen-shirt"><h2 class="product-name">Linen Shirt</h2></a></article>
      </section>`,
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(1);
  await page.click('#untrusted-card');
  await page.waitForTimeout(800);

  expect(await page.locator('.add-to-basket-modal [data-renuvex-slot="listing-rating"]').count()).toBe(0);
});

test('network-error stale settings preserve widget data but disable placement authority', async ({ page }) => {
  const payload = settingsResponse({});
  await page.addInitScript(({ key, value }) => {
    sessionStorage.setItem(key, value);
  }, {
    key: `renuvex_pr_settings_v2_${PUBLIC_KEY}`,
    value: JSON.stringify({ t: Date.now() - (6 * 60 * 1000), v: payload }),
  });
  const log = await setupWidgetRoutes(page, {
    mountReviews: false,
    settingsAbort: 'failed',
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium`);
  await page.waitForTimeout(900);

  expect(await hasPdpBadge(page)).toBe(false);
  expect(countUrls(log, '/api/public/ratings')).toBe(0);
});

test('fresh v2 settings remain usable without a network refetch', async ({ page }) => {
  const payload = settingsResponse({});
  await page.addInitScript(({ key, value }) => {
    sessionStorage.setItem(key, value);
  }, {
    key: `renuvex_pr_settings_v2_${PUBLIC_KEY}`,
    value: JSON.stringify({ t: Date.now() - (4 * 60 * 1000), v: payload }),
  });
  const log = await setupWidgetRoutes(page, { mountReviews: false, settingsAbort: 'failed' });
  await page.goto(`${MERCHANT_ORIGIN}/premium`);
  await expect.poll(() => hasPdpBadge(page)).toBe(true);

  expect(countUrls(log, '/api/public/settings')).toBe(0);
  expect(countUrls(log, '/api/public/ratings')).toBe(1);
});

test('expired v2 settings cannot authorize placement during a network failure', async ({ page }) => {
  const payload = settingsResponse({});
  await page.addInitScript(({ key, value }) => {
    sessionStorage.setItem(key, value);
  }, {
    key: `renuvex_pr_settings_v2_${PUBLIC_KEY}`,
    value: JSON.stringify({ t: Date.now() - (25 * 60 * 60 * 1000), v: payload }),
  });
  const log = await setupWidgetRoutes(page, { mountReviews: false, settingsAbort: 'failed' });
  await page.goto(`${MERCHANT_ORIGIN}/premium`);
  await page.waitForTimeout(900);

  expect(await hasPdpBadge(page)).toBe(false);
  expect(countUrls(log, '/api/public/ratings')).toBe(0);
});

test('the retained legacy runtime is safe-disabled by a new backend payload', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: false,
    widgetRuntimeEntry: LEGACY_PLACEMENT_RUNTIME_ENTRY,
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium`);
  await page.waitForTimeout(1000);

  expect(await hasPdpBadge(page)).toBe(false);
  expect(countUrls(log, '/api/public/ratings')).toBe(0);
});

test('the retained legacy runtime ignores the new slug response Product ID field', async ({ page }) => {
  const payload = settingsResponse({}) as { runtime: Record<string, unknown> };
  payload.runtime.autoPlacementEnabled = true;
  await page.addInitScript(({ key, value }) => {
    sessionStorage.setItem(key, value);
  }, {
    key: `renuvex_pr_settings_${PUBLIC_KEY}`,
    value: JSON.stringify({ t: Date.now() - (4 * 60 * 1000), v: payload }),
  });
  const log = await setupProductListingFallbackPage(page, {
    settingsAbort: 'failed',
    widgetRuntimeEntry: LEGACY_PLACEMENT_RUNTIME_ENTRY,
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(2);

  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(1);
});

test('the retained legacy runtime can keep a fresh pre-cutover true cache entry', async ({ page }) => {
  const payload = settingsResponse({}) as { runtime: Record<string, unknown> };
  payload.runtime.autoPlacementEnabled = true;
  await page.addInitScript(({ key, value }) => {
    sessionStorage.setItem(key, value);
  }, {
    key: `renuvex_pr_settings_${PUBLIC_KEY}`,
    value: JSON.stringify({ t: Date.now() - (4 * 60 * 1000), v: payload }),
  });
  const log = await setupWidgetRoutes(page, {
    mountReviews: false,
    settingsAbort: 'failed',
    widgetRuntimeEntry: LEGACY_PLACEMENT_RUNTIME_ENTRY,
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium`);
  await expect.poll(() => hasPdpBadge(page), { timeout: 5000 }).toBe(true);

  expect(countUrls(log, '/api/public/settings')).toBe(0);
  expect(countUrls(log, '/api/public/ratings')).toBe(1);
});

test('the retained legacy runtime documents its bounded stale-cache cutover risk', async ({ page }) => {
  const payload = settingsResponse({}) as { runtime: Record<string, unknown> };
  payload.runtime.autoPlacementEnabled = true;
  await page.addInitScript(({ key, value }) => {
    sessionStorage.setItem(key, value);
  }, {
    key: `renuvex_pr_settings_${PUBLIC_KEY}`,
    value: JSON.stringify({ t: Date.now() - (6 * 60 * 1000), v: payload }),
  });
  const log = await setupWidgetRoutes(page, {
    mountReviews: false,
    settingsAbort: 'failed',
    widgetRuntimeEntry: LEGACY_PLACEMENT_RUNTIME_ENTRY,
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium`);
  await expect.poll(() => hasPdpBadge(page), { timeout: 5000 }).toBe(true);

  expect(countUrls(log, '/api/public/ratings')).toBe(1);
});

test('the retained legacy runtime rejects settings older than its stale window', async ({ page }) => {
  const payload = settingsResponse({}) as { runtime: Record<string, unknown> };
  payload.runtime.autoPlacementEnabled = true;
  await page.addInitScript(({ key, value }) => {
    sessionStorage.setItem(key, value);
  }, {
    key: `renuvex_pr_settings_${PUBLIC_KEY}`,
    value: JSON.stringify({ t: Date.now() - (25 * 60 * 60 * 1000), v: payload }),
  });
  const log = await setupWidgetRoutes(page, {
    mountReviews: false,
    settingsAbort: 'failed',
    widgetRuntimeEntry: LEGACY_PLACEMENT_RUNTIME_ENTRY,
  });
  await page.goto(`${MERCHANT_ORIGIN}/premium`);
  await page.waitForTimeout(1000);

  expect(await hasPdpBadge(page)).toBe(false);
  expect(countUrls(log, '/api/public/ratings')).toBe(0);
});

test('the first valid v1 policy removes the legacy settings cache key', async ({ page }) => {
  await page.addInitScript((key) => {
    sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v: { runtime: { autoPlacementEnabled: true } } }));
  }, `renuvex_pr_settings_${PUBLIC_KEY}`);
  await setupWidgetRoutes(page, { mountReviews: false });
  await page.goto(`${MERCHANT_ORIGIN}/premium`);
  await expect.poll(() => hasPdpBadge(page)).toBe(true);

  const legacyValue = await page.evaluate((key) => sessionStorage.getItem(key), `renuvex_pr_settings_${PUBLIC_KEY}`);
  expect(legacyValue).toBeNull();
});

import { expect, test, type Page } from '@playwright/test';
import {
  MERCHANT_ORIGIN,
  PRODUCT_ID,
  countListingBadges,
  countUrls,
  hasPdpBadge,
  setupProductListingFallbackPage,
  setupWidgetRoutes,
} from './widget-harness';

test.afterEach(async ({ page }) => {
  await page.unrouteAll({ behavior: 'wait' });
  await page.close();
});

async function visibleListingIdentities(page: Page) {
  return page.locator('[data-renuvex-slot="listing-rating"]').evaluateAll((slots) => slots.map((slot) => ({
    slotProductId: slot.getAttribute('data-renuvex-product-id'),
    badgeProductId: slot.querySelector('.renuvex-pr-rating-badge--listing')?.getAttribute('data-renuvex-product-id') ?? null,
  })));
}

test('PDP badge and slot carry the event Product ID', async ({ page }) => {
  await setupWidgetRoutes(page, { mountReviews: false });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasPdpBadge(page)).toBe(true);

  const identity = await page.locator('[data-renuvex-slot="product-title-rating"]').evaluate((slot) => ({
    slotProductId: slot.getAttribute('data-renuvex-product-id'),
    badgeProductId: slot.querySelector('.renuvex-pr-rating-badge--pdp')?.getAttribute('data-renuvex-product-id'),
  }));
  expect(identity).toEqual({ slotProductId: PRODUCT_ID, badgeProductId: PRODUCT_ID });
});

test('DOM-only listing candidates are promoted to Product ID proofs', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page);
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(2);

  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(1);
  expect(await visibleListingIdentities(page)).toEqual([
    { slotProductId: PRODUCT_ID, badgeProductId: PRODUCT_ID },
    { slotProductId: 'product-2', badgeProductId: 'product-2' },
  ]);
});

test('event Product ID remains exact through listing and quick-view placement', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    listingMarkup: `<section class="category-products-main">
      <article><a id="quick-view-card" href="/premium-shorts" onclick="event.preventDefault();setTimeout(function(){document.body.insertAdjacentHTML('beforeend','<div class=&quot;add-to-basket-modal&quot;><h1 class=&quot;product-name&quot;>Premium Shorts</h1><button id=&quot;modal-variant&quot; type=&quot;button&quot;>M</button></div>')},0)"><h2 class="product-name">Premium Shorts</h2></a></article>
    </section>`,
    ikasEvents: [
      { type: 'PAGE_VIEW', data: { pageType: 'CATEGORY' } },
      { type: 'VIEW_LISTING', data: { productDetails: [
        { id: PRODUCT_ID, name: 'Premium Shorts', slug: 'premium-shorts' },
      ] } },
    ],
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countListingBadges(page), { timeout: 6000 }).toBe(1);
  expect(countUrls(log, '/api/public/ratings?')).toBe(1);
  expect(countUrls(log, '/api/public/ratings-by-slug')).toBe(0);

  await page.click('#quick-view-card');
  await page.evaluate((productId) => {
    const emit = (window as Window & { __renuvexEmitIkasEvent?: (event: unknown) => void }).__renuvexEmitIkasEvent;
    emit?.({ type: 'VIEW_LISTING', data: { productDetails: [
      { id: productId, name: 'Premium Shorts', slug: 'premium-shorts' },
    ] } });
  }, PRODUCT_ID);
  const modalSlot = page.locator('.add-to-basket-modal [data-renuvex-slot="listing-rating"]');
  await expect.poll(() => modalSlot.count()).toBe(1);
  await expect(modalSlot).toHaveAttribute('data-renuvex-product-id', PRODUCT_ID);
  await expect(modalSlot.locator('.renuvex-pr-rating-badge--listing')).toHaveAttribute('data-renuvex-product-id', PRODUCT_ID);

  await page.click('#modal-variant');
  await page.evaluate(() => {
    document.body.insertAdjacentHTML('beforeend', '<div id="post-modal-discovery-mutation"></div>');
  });
  await page.waitForTimeout(500);

  await expect(modalSlot).toHaveCount(1);
  await expect(modalSlot).toHaveAttribute('data-renuvex-product-id', PRODUCT_ID);
  await expect(modalSlot.locator('.renuvex-pr-rating-badge--listing')).toHaveAttribute('data-renuvex-product-id', PRODUCT_ID);
});

test('a legacy slug response without Product ID remains fail-closed', async ({ page }) => {
  const log = await setupProductListingFallbackPage(page, {
    listingMarkup: '<section class="category-products-main"><article><a href="/premium-shorts"><h2 class="product-name">Premium Shorts</h2></a></article></section>',
    ratingsBySlugHandler: async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: { 'premium-shorts': { avg: '4.8', count: 12 } } }),
      });
    },
  });
  await page.goto(`${MERCHANT_ORIGIN}/clothing`);
  await expect.poll(() => countUrls(log, '/api/public/ratings-by-slug'), { timeout: 6000 }).toBe(1);
  await page.waitForTimeout(500);

  expect(await countListingBadges(page)).toBe(0);
});

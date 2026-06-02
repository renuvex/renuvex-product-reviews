import { expect, test, type Page, type Route } from '@playwright/test';
import {
  MERCHANT_ORIGIN,
  PUBLIC_KEY,
  REVIEW_CLOUD_NAME,
  clickInReviewsShadow,
  countInReviewsShadow,
  elementWidth,
  hasInReviewsShadow,
  hasJsonLd,
  hasPdpBadge,
  hasReviewsWidget,
  setupWidgetRoutes,
  textInReviewsShadow,
  waitForWidgetIdle,
  widgetErrors,
  widthInReviewsShadow,
} from './widget-harness';

type LayoutCase = {
  name: string;
  summaryLayout: 'classic' | 'compact' | 'hero' | 'minimal' | 'split';
  summarySelector: string;
  reviewLayout: 'card' | 'list' | 'gallery';
  reviewSelector: string;
  expectsTitle: boolean;
};

const LAYOUT_MATRIX: LayoutCase[] = [
  {
    name: 'classic summary with card reviews',
    summaryLayout: 'classic',
    summarySelector: '.renuvex-pr-summary:not(.renuvex-pr-summary-compact):not(.renuvex-pr-summary-minimal):not(.renuvex-pr-summary-hero):not(.renuvex-pr-summary-split)',
    reviewLayout: 'card',
    reviewSelector: '.renuvex-pr-review-card',
    expectsTitle: true,
  },
  {
    name: 'compact summary with list reviews',
    summaryLayout: 'compact',
    summarySelector: '.renuvex-pr-summary-compact',
    reviewLayout: 'list',
    reviewSelector: '.renuvex-pr-review-list',
    expectsTitle: true,
  },
  {
    name: 'hero summary with gallery reviews',
    summaryLayout: 'hero',
    summarySelector: '.renuvex-pr-summary-hero',
    reviewLayout: 'gallery',
    reviewSelector: '.renuvex-pr-review-gallery',
    expectsTitle: true,
  },
  {
    name: 'minimal summary with card reviews',
    summaryLayout: 'minimal',
    summarySelector: '.renuvex-pr-summary-minimal',
    reviewLayout: 'card',
    reviewSelector: '.renuvex-pr-review-card',
    expectsTitle: true,
  },
  {
    name: 'split summary with list reviews',
    summaryLayout: 'split',
    summarySelector: '.renuvex-pr-summary-split',
    reviewLayout: 'list',
    reviewSelector: '.renuvex-pr-review-list',
    expectsTitle: true,
  },
];

type RuntimeReview = {
  id: string;
  rating?: number;
  title: string;
  comment?: string;
  author?: string;
  createdAt?: string;
  images?: string[];
  merchantReply?: string | null;
  recommendation?: boolean;
};

function trustedReviewImage(name: string, storeId = PUBLIC_KEY): string {
  return `https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/review_images/stores/${storeId}/${name}.jpg`;
}

function runtimeReview(input: RuntimeReview): Record<string, unknown> {
  return {
    rating: 5,
    comment: `${input.title} body`,
    author: 'Runtime T.',
    createdAt: '2026-05-28T00:00:00.000Z',
    images: [],
    merchantReply: null,
    recommendation: true,
    ...input,
  };
}

function reviewsPayload(
  reviews: RuntimeReview[],
  options: { allCount?: number; totalCount?: number; ratingCounts?: number[]; avgRating?: string; hasMore?: boolean } = {},
): unknown {
  const allCount = options.allCount ?? Math.max(reviews.length, 1);
  const ratingCounts = options.ratingCounts ?? [0, 0, 0, 0, allCount];
  return {
    data: {
      reviews: reviews.map(runtimeReview),
      allCount,
      totalCount: options.totalCount ?? allCount,
      ratingCounts,
      avgRating: options.avgRating ?? (allCount > 0 ? '5.0' : '0.0'),
      hasMore: options.hasMore === true,
    },
  };
}

async function fulfillJson(route: Route, body: unknown, status = 200): Promise<void> {
  await route.fulfill({
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  });
}

async function clickFilterItemAt(page: Page, index: number): Promise<void> {
  await page.evaluate((index) => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews');
    const root = container?.shadowRoot || null;
    const filterBtn = root?.querySelector<HTMLElement>('.renuvex-pr-filter-btn');
    filterBtn?.click();
    const item = Array.from(root?.querySelectorAll<HTMLElement>('.renuvex-pr-filter-item') || [])[index];
    if (!item) throw new Error(`Missing filter item index: ${index}`);
    item.focus();
    item.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
  }, index);
}

async function reviewTitles(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews');
    const root = container?.shadowRoot || null;
    return Array.from(root?.querySelectorAll<HTMLElement>('.renuvex-pr-review-title,.renuvex-pr-review-list-title,.renuvex-pr-review-gallery-title') || [])
      .map((el) => el.textContent?.trim() || '')
      .filter(Boolean);
  });
}

async function pdpBadgeText(page: Page): Promise<string> {
  return page.evaluate(() => document.querySelector('[data-renuvex-slot="product-title-rating"]')?.textContent?.trim() || '');
}

async function focusBarRow(page: Page, index: number): Promise<void> {
  await page.evaluate((index) => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews');
    const root = container?.shadowRoot || null;
    const row = Array.from(root?.querySelectorAll<HTMLElement>('.renuvex-pr-bar-row') || [])[index];
    if (!row) throw new Error(`Missing bar row index: ${index}`);
    row.focus();
  }, index);
}

async function barRowsState(page: Page): Promise<Array<{
  ariaPressed: string | null;
  ariaLabel: string | null;
  className: string;
  count: string;
  fillWidth: string;
  opacity: string;
  pointerEvents: string;
}>> {
  return page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews');
    const root = container?.shadowRoot || null;
    return Array.from(root?.querySelectorAll<HTMLElement>('.renuvex-pr-bar-row') || []).map((row) => ({
      ariaPressed: row.getAttribute('aria-pressed'),
      ariaLabel: row.getAttribute('aria-label'),
      className: row.className,
      count: row.querySelector<HTMLElement>('.renuvex-pr-bar-count')?.textContent?.trim() || '',
      fillWidth: (row.querySelector<HTMLElement>('.renuvex-pr-bar-fill')?.style.width || ''),
      opacity: getComputedStyle(row).opacity,
      pointerEvents: getComputedStyle(row).pointerEvents,
    }));
  });
}

async function compactPanelMotionState(page: Page): Promise<{ animationName: string; position: string; transitionProperty: string; maxHeight: string }> {
  return page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews');
    const root = container?.shadowRoot || null;
    const panel = root?.querySelector<HTMLElement>('.renuvex-pr-compact-panel.renuvex-pr-open');
    if (!panel) throw new Error('Missing open compact panel');
    const style = getComputedStyle(panel);
    return {
      animationName: style.animationName,
      position: style.position,
      transitionProperty: style.transitionProperty,
      maxHeight: style.maxHeight,
    };
  });
}

async function clickFilterItemByText(page: Page, text: string): Promise<void> {
  await page.evaluate((text) => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews');
    const root = container?.shadowRoot || null;
    const filterBtn = root?.querySelector<HTMLElement>('.renuvex-pr-filter-btn');
    filterBtn?.click();
    const item = Array.from(root?.querySelectorAll<HTMLElement>('.renuvex-pr-filter-item') || [])
      .find((el) => (el.textContent || '').trim() === text);
    if (!item) throw new Error(`Missing filter item: ${text}`);
    item.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, button: 0, pointerType: 'touch' }));
  }, text);
}

async function activateFilterItemByTextAndReadInactiveBarState(page: Page, text: string): Promise<{ shielded: boolean; opacity: string; pointerEvents: string }> {
  return page.evaluate((text) => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews');
    const root = container?.shadowRoot || null;
    const filterBtn = root?.querySelector<HTMLElement>('.renuvex-pr-filter-btn');
    filterBtn?.click();
    const item = Array.from(root?.querySelectorAll<HTMLElement>('.renuvex-pr-filter-item') || [])
      .find((el) => (el.textContent || '').trim() === text);
    const inactiveRow = Array.from(root?.querySelectorAll<HTMLElement>('.renuvex-pr-bar-row') || [])
      .find((el) => el.getAttribute('aria-pressed') === 'false');
    const content = root?.querySelector<HTMLElement>('[data-renuvex-shadow-content]');
    if (!item || !inactiveRow || !content) throw new Error('Missing filter item, inactive bar row, or shadow content');
    item.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, button: 0, pointerType: 'touch' }));
    const rowStyle = getComputedStyle(inactiveRow);
    return {
      shielded: content.hasAttribute('data-renuvex-pr-dismiss-gesture'),
      opacity: rowStyle.opacity,
      pointerEvents: rowStyle.pointerEvents,
    };
  }, text);
}

async function firstBarCountMetrics(page: Page): Promise<{
  text: string;
  width: number;
  scrollWidth: number;
  trackWidth: number;
  fontVariantNumeric: string;
  fontFeatureSettings: string;
}> {
  return page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews');
    const root = container?.shadowRoot || null;
    const count = root?.querySelector<HTMLElement>('.renuvex-pr-bar-count');
    const track = root?.querySelector<HTMLElement>('.renuvex-pr-bar-track');
    if (!count || !track) throw new Error('Missing bar count or track');
    const countStyle = getComputedStyle(count);
    return {
      text: count.textContent?.trim() || '',
      width: count.getBoundingClientRect().width,
      scrollWidth: count.scrollWidth,
      trackWidth: track.getBoundingClientRect().width,
      fontVariantNumeric: countStyle.fontVariantNumeric,
      fontFeatureSettings: countStyle.fontFeatureSettings,
    };
  });
}

async function reviewImageUrls(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews');
    const root = container?.shadowRoot || null;
    return Array.from(root?.querySelectorAll<HTMLElement>('[data-renuvex-img-url]') || [])
      .map((el) => el.getAttribute('data-renuvex-img-url') || '')
      .filter(Boolean);
  });
}

async function firstPhotoStripSrc(page: Page): Promise<string> {
  return page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const slot = anchor?.querySelector('[data-renuvex-slot="product-reviews"]');
    const container = slot?.querySelector('#renuvex-reviews');
    const root = container?.shadowRoot || null;
    return (root?.querySelector<HTMLImageElement>('.renuvex-pr-photo-strip-thumb')?.src || '');
  });
}

for (const layoutCase of LAYOUT_MATRIX) {
  test(`${layoutCase.name} renders the complete review surface`, async ({ page }) => {
    const log = await setupWidgetRoutes(page, {
      mountReviews: true,
      reviewsSettings: {
        summaryLayout: layoutCase.summaryLayout,
        reviewLayout: layoutCase.reviewLayout,
      },
    });

    await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
    await expect.poll(() => hasPdpBadge(page)).toBe(true);
    await expect.poll(() => hasReviewsWidget(page)).toBe(true);

    expect(await hasJsonLd(page)).toBe(true);
    expect(await hasInReviewsShadow(page, layoutCase.summarySelector)).toBe(true);
    expect(await countInReviewsShadow(page, layoutCase.reviewSelector)).toBeGreaterThanOrEqual(1);
    expect(await hasInReviewsShadow(page, '.renuvex-pr-write-btn')).toBe(true);
    expect(await hasInReviewsShadow(page, '.renuvex-pr-photo-section')).toBe(true);
    expect(await countInReviewsShadow(page, '.renuvex-pr-photo-strip-thumb')).toBeGreaterThanOrEqual(1);

    if (layoutCase.expectsTitle) {
      expect(await textInReviewsShadow(page, '.renuvex-pr-title')).toBe('Musteri Yorumlari');
    } else {
      expect(await hasInReviewsShadow(page, '.renuvex-pr-title')).toBe(false);
    }

    expect(widgetErrors(log)).toEqual([]);
  });
}

test('compact summary filter panel remains interactive after render', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'compact', reviewLayout: 'list' },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-compact-trigger');
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-compact-panel.renuvex-pr-open')).toBe(true);

  expect(widgetErrors(log)).toEqual([]);
});

test('compact mobile rating bar filter keeps panel open until trigger closes it', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'compact', reviewLayout: 'list' },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-compact-trigger');
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-compact-panel.renuvex-pr-open')).toBe(true);

  await clickInReviewsShadow(page, '.renuvex-pr-compact-panel .renuvex-pr-bar-track');
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-compact-panel.renuvex-pr-open')).toBe(true);
  await expect.poll(async () => {
    const rows = await barRowsState(page);
    return rows[0]?.ariaPressed || '';
  }).toBe('true');
  await expect.poll(async () => {
    const rows = await barRowsState(page);
    return rows.slice(1).every((row) =>
      row.className.includes('renuvex-pr-bar-dimmed') &&
      row.opacity === '0.35' &&
      row.pointerEvents === 'auto'
    );
  }).toBe(true);
  await expect.poll(async () => {
    const motion = await compactPanelMotionState(page);
    return motion.animationName;
  }).toBe('none');
  const motion = await compactPanelMotionState(page);
  expect(motion.position).toBe('static');
  expect(motion.transitionProperty).toContain('max-height');
  expect(motion.maxHeight).not.toBe('0px');

  await clickInReviewsShadow(page, '.renuvex-pr-compact-trigger');
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-compact-panel.renuvex-pr-open')).toBe(false);

  expect(widgetErrors(log)).toEqual([]);
});

test('compact mobile keeps bar panel stable when sort changes after rating filter', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'compact', reviewLayout: 'list' },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-compact-trigger');
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-compact-panel.renuvex-pr-open')).toBe(true);

  await clickInReviewsShadow(page, '.renuvex-pr-compact-panel .renuvex-pr-bar-track');
  await expect.poll(async () => {
    const rows = await barRowsState(page);
    return rows[0]?.ariaPressed || '';
  }).toBe('true');

  const shieldedInactiveBar = await activateFilterItemByTextAndReadInactiveBarState(page, 'En Yüksek Puan');
  expect(shieldedInactiveBar).toEqual({
    shielded: true,
    opacity: '0.35',
    pointerEvents: 'none',
  });
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-filter-menu.renuvex-pr-open')).toBe(false);
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-compact-panel.renuvex-pr-open')).toBe(true);
  await expect.poll(async () => {
    const rows = await barRowsState(page);
    return rows[0]?.ariaPressed || '';
  }).toBe('true');
  await expect.poll(async () => {
    const rows = await barRowsState(page);
    return rows.slice(1).every((row) =>
      row.className.includes('renuvex-pr-bar-dimmed') &&
      row.opacity === '0.35' &&
      row.pointerEvents === 'none'
    );
  }).toBe(true);
  await expect.poll(async () => {
    const motion = await compactPanelMotionState(page);
    return motion.animationName;
  }).toBe('none');
  const motion = await compactPanelMotionState(page);
  expect(motion.position).toBe('static');
  expect(motion.transitionProperty).toContain('max-height');

  expect(widgetErrors(log)).toEqual([]);
});

test('photo gallery toggle removes strip without breaking reviews', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: {
      summaryLayout: 'classic',
      reviewLayout: 'card',
      showPhotoGallery: false,
    },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await waitForWidgetIdle(page);

  expect(await hasInReviewsShadow(page, '.renuvex-pr-photo-section')).toBe(false);
  expect(await countInReviewsShadow(page, '.renuvex-pr-review-card')).toBeGreaterThanOrEqual(1);
  expect(widgetErrors(log)).toEqual([]);
});

for (const photoLayout of [
  { reviewLayout: 'list' as const, itemPhotoSelector: '.renuvex-pr-review-list-media img' },
  { reviewLayout: 'gallery' as const, itemPhotoSelector: '.renuvex-pr-review-gallery-media img' },
]) {
  test(`${photoLayout.reviewLayout} photo strip thumbnail size follows the photo gallery setting`, async ({ page }) => {
    const log = await setupWidgetRoutes(page, {
      mountReviews: true,
      reviewsSettings: {
        summaryLayout: 'classic',
        reviewLayout: photoLayout.reviewLayout,
        size: 'small',
        thumbnailSize: 'large',
      },
    });

    await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
    await expect.poll(() => hasReviewsWidget(page)).toBe(true);
    await expect.poll(() => countInReviewsShadow(page, '.renuvex-pr-photo-strip-thumb')).toBeGreaterThanOrEqual(1);
    await waitForWidgetIdle(page);

    const stripThumbWidth = await widthInReviewsShadow(page, '.renuvex-pr-photo-strip-thumb');
    const itemPhotoWidth = await widthInReviewsShadow(page, photoLayout.itemPhotoSelector);

    expect(stripThumbWidth).toBeGreaterThan(130);
    expect(stripThumbWidth).toBeLessThan(150);
    expect(itemPhotoWidth).toBeGreaterThan(70);
    expect(itemPhotoWidth).toBeLessThan(90);
    expect(widgetErrors(log)).toEqual([]);
  });
}

test('rating bar chart filters from keyboard without changing badge or summary totals', async ({ page }) => {
  const ratingCounts = [0, 0, 1, 2, 9];
  const allCount = 12;
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    badgeEnabled: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
    reviewsGetHandler: async (route) => {
      const url = new URL(route.request().url());
      const hasImages = url.searchParams.get('hasImages') === 'true';
      const rating = url.searchParams.get('rating');

      if (hasImages) {
        await fulfillJson(route, reviewsPayload([
          { id: 'strip-keyboard', title: 'Strip Keyboard', images: [trustedReviewImage('strip-keyboard')] },
        ], { allCount, totalCount: 1, ratingCounts, avgRating: '4.8' }));
        return;
      }

      if (rating === '5') {
        await fulfillJson(route, reviewsPayload([
          { id: 'filtered-five', rating: 5, title: 'Only five star review' },
        ], { allCount, totalCount: 9, ratingCounts, avgRating: '4.8' }));
        return;
      }

      await fulfillJson(route, reviewsPayload([
        { id: 'all-five', rating: 5, title: 'All five star review' },
        { id: 'all-four', rating: 4, title: 'All four star review' },
        { id: 'all-three', rating: 3, title: 'All three star review' },
      ], { allCount, totalCount: allCount, ratingCounts, avgRating: '4.8' }));
    },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasPdpBadge(page)).toBe(true);
  await expect.poll(() => reviewTitles(page)).toEqual(['All five star review', 'All four star review', 'All three star review']);

  const initialBadgeText = await pdpBadgeText(page);
  const initialSummaryCount = await textInReviewsShadow(page, '.renuvex-pr-summary-count');
  const initialBars = await barRowsState(page);

  expect(initialSummaryCount).toBe('12 Yorum');
  expect(initialBars.map((row) => row.count)).toEqual(['(9)', '(2)', '(1)', '(0)', '(0)']);
  expect(initialBars[0].ariaPressed).toBe('false');
  expect(initialBars[0].ariaLabel).toContain('5 yıldız');

  await focusBarRow(page, 0);
  await page.keyboard.press('Enter');
  await expect.poll(() => reviewTitles(page)).toEqual(['Only five star review']);

  const filteredBars = await barRowsState(page);
  expect(filteredBars.map((row) => row.count)).toEqual(initialBars.map((row) => row.count));
  expect(filteredBars[0].ariaPressed).toBe('true');
  expect(filteredBars[0].ariaLabel).toContain('filtreyi kaldır');
  expect(await pdpBadgeText(page)).toBe(initialBadgeText);
  expect(await textInReviewsShadow(page, '.renuvex-pr-summary-count')).toBe(initialSummaryCount);

  await focusBarRow(page, 0);
  await page.keyboard.press('Space');
  await expect.poll(() => reviewTitles(page)).toEqual(['All five star review', 'All four star review', 'All three star review']);
  expect((await barRowsState(page))[0].ariaPressed).toBe('false');
  expect(await pdpBadgeText(page)).toBe(initialBadgeText);
  expect(await textInReviewsShadow(page, '.renuvex-pr-summary-count')).toBe(initialSummaryCount);
  expect(widgetErrors(log)).toEqual([]);
});

test('rating bar count column fits large localized counts on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
    reviewsGetHandler: async (route) => {
      const url = new URL(route.request().url());
      const hasImages = url.searchParams.get('hasImages') === 'true';

      if (hasImages) {
        await fulfillJson(route, reviewsPayload([], { allCount: 10000, totalCount: 0, ratingCounts: [0, 0, 0, 0, 10000], avgRating: '5.0' }));
        return;
      }

      await fulfillJson(route, reviewsPayload([
        { id: 'large-count', rating: 5, title: 'Large count review' },
      ], { allCount: 10000, totalCount: 10000, ratingCounts: [0, 0, 0, 0, 10000], avgRating: '5.0' }));
    },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await expect.poll(() => barRowsState(page)).toHaveLength(5);

  const metrics = await firstBarCountMetrics(page);
  expect(metrics.text).toBe('(10.000)');
  expect(metrics.width + 1).toBeGreaterThanOrEqual(metrics.scrollWidth);
  expect(metrics.trackWidth).toBeGreaterThan(20);
  expect(metrics.fontVariantNumeric === 'tabular-nums' || metrics.fontFeatureSettings.includes('tnum')).toBe(true);
  expect(widgetErrors(log)).toEqual([]);
});

test('sort responses cannot overwrite the newest selected order', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
    reviewsGetHandler: async (route) => {
      const url = new URL(route.request().url());
      const hasImages = url.searchParams.get('hasImages') === 'true';
      const orderBy = url.searchParams.get('orderBy') || 'newest';

      if (hasImages) {
        await fulfillJson(route, reviewsPayload([
          { id: 'strip-1', title: 'Strip Photo', images: [trustedReviewImage('strip-1')] },
        ]));
        return;
      }

      if (orderBy === 'highest') {
        await new Promise((resolve) => setTimeout(resolve, 450));
        await fulfillJson(route, reviewsPayload([{ id: 'highest-1', title: 'Highest stale response' }]));
        return;
      }

      if (orderBy === 'lowest') {
        await fulfillJson(route, reviewsPayload([{ id: 'lowest-1', title: 'Lowest current response' }]));
        return;
      }

      await fulfillJson(route, reviewsPayload([{ id: 'newest-1', title: 'Newest initial response' }]));
    },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await expect.poll(() => reviewTitles(page)).toContain('Newest initial response');

  await clickFilterItemAt(page, 1);
  await clickFilterItemAt(page, 2);

  await expect.poll(() => reviewTitles(page)).toContain('Lowest current response');
  await page.waitForTimeout(700);

  const titles = await reviewTitles(page);
  expect(titles).toContain('Lowest current response');
  expect(titles).not.toContain('Highest stale response');
  expect(widgetErrors(log)).toEqual([]);
});

test('stale load-more completion cannot advance the active sorted page', async ({ page }) => {
  const lowestLoadMorePages: string[] = [];
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
    reviewsGetHandler: async (route) => {
      const url = new URL(route.request().url());
      const hasImages = url.searchParams.get('hasImages') === 'true';
      const orderBy = url.searchParams.get('orderBy') || 'newest';
      const pageParam = url.searchParams.get('page') || '1';

      if (hasImages) {
        await fulfillJson(route, reviewsPayload([
          { id: 'strip-1', title: 'Strip Photo', images: [trustedReviewImage('strip-1')] },
        ]));
        return;
      }

      if (orderBy === 'lowest') {
        if (pageParam !== '1') lowestLoadMorePages.push(pageParam);
        await fulfillJson(route, reviewsPayload([
          { id: `lowest-${pageParam}`, title: `Lowest page ${pageParam}` },
        ], { hasMore: pageParam === '1' }));
        return;
      }

      if (pageParam === '2') {
        await new Promise((resolve) => setTimeout(resolve, 450));
        await fulfillJson(route, reviewsPayload([{ id: 'newest-2', title: 'Newest stale page 2' }], { hasMore: false }));
        return;
      }

      await fulfillJson(route, reviewsPayload([{ id: 'newest-1', title: 'Newest page 1' }], { hasMore: true }));
    },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await expect.poll(() => reviewTitles(page)).toContain('Newest page 1');

  await clickInReviewsShadow(page, '.renuvex-pr-load-more');
  await clickFilterItemAt(page, 2);
  await expect.poll(() => reviewTitles(page)).toContain('Lowest page 1');
  await page.waitForTimeout(700);

  await clickInReviewsShadow(page, '.renuvex-pr-load-more');
  await expect.poll(() => lowestLoadMorePages[0] || '').toBe('2');
  expect(widgetErrors(log)).toEqual([]);
});

test('load-more ignores duplicate review ids already rendered in the list', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
    reviewsGetHandler: async (route) => {
      const url = new URL(route.request().url());
      const hasImages = url.searchParams.get('hasImages') === 'true';
      const pageParam = url.searchParams.get('page') || '1';

      if (hasImages) {
        await fulfillJson(route, reviewsPayload([]));
        return;
      }

      if (pageParam === '2') {
        await fulfillJson(route, reviewsPayload([
          { id: 'duplicate-id', title: 'First review' },
          { id: 'second-id', title: 'Second review' },
        ], { hasMore: false }));
        return;
      }

      await fulfillJson(route, reviewsPayload([{ id: 'duplicate-id', title: 'First review' }], { hasMore: true }));
    },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await expect.poll(() => reviewTitles(page)).toEqual(['First review']);

  await clickInReviewsShadow(page, '.renuvex-pr-load-more');
  await expect.poll(() => reviewTitles(page)).toContain('Second review');

  const titles = await reviewTitles(page);
  expect(titles.filter((title) => title === 'First review')).toHaveLength(1);
  expect(titles).toEqual(['First review', 'Second review']);
  expect(widgetErrors(log)).toEqual([]);
});

test('initial review fetch failure renders a retry state and recovers on retry', async ({ page }) => {
  let mainCalls = 0;
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
    reviewsGetHandler: async (route) => {
      const url = new URL(route.request().url());
      const hasImages = url.searchParams.get('hasImages') === 'true';

      if (hasImages) {
        await fulfillJson(route, reviewsPayload([]));
        return;
      }

      mainCalls += 1;
      if (mainCalls === 1) {
        await fulfillJson(route, { error: 'temporary failure' }, 503);
        return;
      }

      await fulfillJson(route, reviewsPayload([{ id: 'retry-ok', title: 'Recovered review' }]));
    },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-state-error')).toBe(true);
  expect(await hasInReviewsShadow(page, '.renuvex-pr-state-retry')).toBe(true);
  expect(await hasInReviewsShadow(page, '.renuvex-pr-review-card')).toBe(false);

  await clickInReviewsShadow(page, '.renuvex-pr-state-retry');
  await expect.poll(() => reviewTitles(page)).toEqual(['Recovered review']);
  expect(widgetErrors(log).filter((message) => message.includes('[renuvex-pr]'))).toEqual([]);
});

test('photo strip remains independent across sort and load-more, then hides for photo filter', async ({ page }) => {
  let stripCalls = 0;
  let highestLoadMoreCalls = 0;
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
    reviewsGetHandler: async (route) => {
      const url = new URL(route.request().url());
      const hasImages = url.searchParams.get('hasImages') === 'true';
      const limit = url.searchParams.get('limit');
      const orderBy = url.searchParams.get('orderBy') || 'newest';
      const pageParam = url.searchParams.get('page') || '1';

      if (hasImages && limit === '15') {
        stripCalls += 1;
        await fulfillJson(route, reviewsPayload([
          { id: 'strip-alpha', title: 'Strip Alpha', images: [trustedReviewImage('strip-alpha')] },
        ]));
        return;
      }

      if (hasImages) {
        await fulfillJson(route, reviewsPayload([
          { id: 'photo-filtered', title: 'Photo filtered review', images: [trustedReviewImage('photo-filtered')] },
        ], { hasMore: false }));
        return;
      }

      if (orderBy === 'highest' && pageParam === '2') {
        highestLoadMoreCalls += 1;
        await fulfillJson(route, reviewsPayload([{ id: 'highest-2', title: 'Highest page 2' }], { hasMore: false }));
        return;
      }

      if (orderBy === 'highest') {
        await fulfillJson(route, reviewsPayload([{ id: 'highest-1', title: 'Highest page 1' }], { hasMore: true }));
        return;
      }

      await fulfillJson(route, reviewsPayload([{ id: 'newest-1', title: 'Newest page 1' }], { hasMore: true }));
    },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await expect.poll(() => countInReviewsShadow(page, '.renuvex-pr-photo-strip-thumb')).toBe(1);
  const initialStripSrc = await firstPhotoStripSrc(page);
  expect(initialStripSrc).toContain('strip-alpha');
  expect(stripCalls).toBe(1);

  await clickFilterItemAt(page, 1);
  await expect.poll(() => reviewTitles(page)).toEqual(['Highest page 1']);
  expect(await firstPhotoStripSrc(page)).toBe(initialStripSrc);
  expect(stripCalls).toBe(1);

  await clickInReviewsShadow(page, '.renuvex-pr-load-more');
  await expect.poll(() => highestLoadMoreCalls).toBe(1);
  expect(await firstPhotoStripSrc(page)).toBe(initialStripSrc);
  expect(stripCalls).toBe(1);

  await clickFilterItemAt(page, 3);
  await expect.poll(() => reviewTitles(page)).toEqual(['Photo filtered review']);
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-photo-section')).toBe(false);
  expect(stripCalls).toBe(1);
  expect(widgetErrors(log)).toEqual([]);
});

for (const reviewLayout of ['card', 'list', 'gallery'] as const) {
  test(`${reviewLayout} review layout renders only trusted tenant image URLs`, async ({ page }) => {
    const trusted = trustedReviewImage(`trusted-${reviewLayout}`);
    const wrongTenant = trustedReviewImage(`wrong-${reviewLayout}`, 'other-store');
    const log = await setupWidgetRoutes(page, {
      mountReviews: true,
      reviewsSettings: { summaryLayout: 'classic', reviewLayout },
      reviewsGetHandler: async (route) => {
        const url = new URL(route.request().url());
        const hasImages = url.searchParams.get('hasImages') === 'true';

        if (hasImages) {
          await fulfillJson(route, reviewsPayload([]));
          return;
        }

        await fulfillJson(route, reviewsPayload([
          { id: `trusted-policy-${reviewLayout}`, title: `Trusted ${reviewLayout}`, images: [wrongTenant, trusted] },
        ]));
      },
    });

    await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
    await expect.poll(() => hasReviewsWidget(page)).toBe(true);
    await expect.poll(() => reviewImageUrls(page)).toEqual([trusted]);
    expect((await reviewImageUrls(page)).some((url) => url.includes('/other-store/'))).toBe(false);
    expect(widgetErrors(log)).toEqual([]);
  });
}

// Regression for the 2026-05-25 "Mine" theme bug: `.hOHcRx img{width:100%!important}` blew up
// review thumbnails to ~1200px. ADR_0021 moved the review surface into an open Shadow DOM so
// selector-targeted host CSS can no longer cross the boundary. This pins that guarantee.
test('hostile host-theme img rule cannot cross the review shadow boundary', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
    hostileThemeCss: 'img{width:100%!important;max-width:none!important;height:auto!important}',
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await expect.poll(() => countInReviewsShadow(page, '.renuvex-pr-photo-strip-thumb')).toBeGreaterThanOrEqual(1);
  await waitForWidgetIdle(page);

  // The hostile rule IS live: the light-DOM control image ballooned to its 600px container.
  // Without this, a shadow assertion could false-pass if the rule never applied.
  const controlWidth = await elementWidth(page, '.renuvex-iso-control');
  expect(controlWidth).toBeGreaterThan(400);

  // The review thumbnail lives inside the shadow root, so the same rule cannot reach it.
  // It stays at its widget-defined size (medium thumbnail = 110px), far below the control.
  const thumbWidth = await widthInReviewsShadow(page, '.renuvex-pr-photo-strip-thumb');
  expect(thumbWidth).toBeGreaterThan(0);
  expect(thumbWidth).toBeLessThan(200);
  expect(thumbWidth).toBeLessThan(controlWidth / 2);

  expect(widgetErrors(log)).toEqual([]);
});

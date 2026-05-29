import { expect, test } from '@playwright/test';
import {
  MERCHANT_ORIGIN,
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

import { expect, test } from '@playwright/test';
import {
  MERCHANT_ORIGIN,
  clickInOverlay,
  clickInReviewsShadow,
  fillInOverlay,
  hasOverlay,
  hasReviewsWidget,
  isOverlayControlDisabled,
  setupWidgetRoutes,
  textInOverlay,
  widgetErrors,
} from './widget-harness';

test('photo strip lightbox opens, navigates, and closes without console errors', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(false);
  await clickInReviewsShadow(page, '.renuvex-pr-photo-strip-thumb');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(true);
  expect(await textInOverlay(page, '.renuvex-pr-modal-overlay', '.renuvex-pr-modal-title')).toBe('Great');

  await clickInOverlay(page, '.renuvex-pr-modal-overlay', '.renuvex-pr-modal-nav-next');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-modal-overlay', '.renuvex-pr-modal-close');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(false);

  expect(widgetErrors(log)).toEqual([]);
});

test('review card image opens the lightbox and Escape closes it', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-review-card .renuvex-pr-img');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(true);

  await page.keyboard.press('Escape');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(false);
  expect(widgetErrors(log)).toEqual([]);
});

test('review wizard validates required fields and submits through mocked public API', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);

  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-star:nth-child(5)');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-photos')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-footer-skip');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-content')).toBe(true);

  expect(await isOverlayControlDisabled(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-footer-next')).toBe(true);
  await fillInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-textarea', 'Comfortable fabric and clean stitching.');
  expect(await isOverlayControlDisabled(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-footer-next')).toBe(false);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-footer-next');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-author')).toBe(true);

  expect(await isOverlayControlDisabled(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-submit-btn')).toBe(true);
  await fillInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-author input[type="text"]', 'Mert');
  expect(await isOverlayControlDisabled(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-submit-btn')).toBe(false);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-submit-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-thanks')).toBe(true);

  expect(widgetErrors(log)).toEqual([]);
});

// Regression for the cross-theme scroll-lock bug: the wizard previously had its own weak
// lock that set only `body { overflow:hidden }`, so on themes whose scroll container is
// <html> (or that override body overflow) the background still scrolled. Both overlays now
// use the shared robust lock that pins <html> AND <body>. Asserting the <html> lock is the
// part the old wizard code did not do — it fails on the old code and passes now.
test('opening an overlay locks scroll on both <html> and <body>', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);

  const overflow = () => page.evaluate(() => ({
    html: getComputedStyle(document.documentElement).overflow,
    body: getComputedStyle(document.body).overflow,
  }));

  // Wizard — the surface that regressed.
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);
  const wizardLocked = await overflow();
  expect(wizardLocked.html).toBe('hidden');
  expect(wizardLocked.body).toBe('hidden');

  await page.keyboard.press('Escape');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(false);
  const wizardRestored = await overflow();
  expect(wizardRestored.html).not.toBe('hidden');
  expect(wizardRestored.body).not.toBe('hidden');

  // Lightbox — same shared lock; parity check.
  await clickInReviewsShadow(page, '.renuvex-pr-photo-strip-thumb');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(true);
  const lightboxLocked = await overflow();
  expect(lightboxLocked.html).toBe('hidden');
  expect(lightboxLocked.body).toBe('hidden');

  await page.keyboard.press('Escape');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(false);
  const lightboxRestored = await overflow();
  expect(lightboxRestored.html).not.toBe('hidden');
  expect(lightboxRestored.body).not.toBe('hidden');

  expect(widgetErrors(log)).toEqual([]);
});

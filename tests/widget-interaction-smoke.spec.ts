import { expect, test, type Page } from '@playwright/test';
import {
  MERCHANT_ORIGIN,
  clickInOverlay,
  clickInReviewsShadow,
  fillInOverlay,
  hasInReviewsShadow,
  hasOverlay,
  hasReviewsWidget,
  isOverlayControlDisabled,
  setupWidgetRoutes,
  textInOverlay,
  widgetErrors,
} from './widget-harness';

function overlayActiveState(page: Page, overlaySelector: string) {
  return page.evaluate((overlaySelector) => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => (host as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot)
      .filter((candidate): candidate is ShadowRoot => !!candidate)
      .find((candidate) => !!candidate.querySelector(overlaySelector));
    const overlay = root?.querySelector(overlaySelector) as HTMLElement | null;
    const active = root?.activeElement as HTMLElement | null;
    return {
      ariaLabel: active?.getAttribute('aria-label') || null,
      className: active && typeof active.className === 'string' ? active.className : '',
      insideOverlay: !!(overlay && active && overlay.contains(active)),
    };
  }, overlaySelector);
}

function reviewsActiveState(page: Page) {
  return page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const container = anchor?.querySelector('[data-renuvex-slot="product-reviews"] #renuvex-reviews');
    const root = (container as Element & { shadowRoot: ShadowRoot | null } | null)?.shadowRoot || null;
    const active = root?.activeElement as HTMLElement | null;
    return {
      ariaLabel: active?.getAttribute('aria-label') || null,
      className: active && typeof active.className === 'string' ? active.className : '',
      role: active?.getAttribute('role') || null,
      tabIndex: active?.tabIndex ?? null,
    };
  });
}

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

test('photo strip thumbnails open the lightbox from keyboard and restore focus', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);

  await page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const container = anchor?.querySelector('[data-renuvex-slot="product-reviews"] #renuvex-reviews');
    const root = (container as Element & { shadowRoot: ShadowRoot | null } | null)?.shadowRoot || null;
    (root?.querySelector('.renuvex-pr-photo-strip-thumb') as HTMLElement | null)?.focus();
  });
  await expect.poll(() => reviewsActiveState(page)).toMatchObject({
    ariaLabel: 'Yorum fotoğrafını büyüt',
    className: 'renuvex-pr-photo-strip-thumb',
    role: 'button',
    tabIndex: 0,
  });

  await page.keyboard.press('Enter');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(true);
  await page.keyboard.press('Escape');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(false);
  await expect.poll(() => reviewsActiveState(page)).toMatchObject({
    className: 'renuvex-pr-photo-strip-thumb',
  });

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

test('initial Shift+Tab stays trapped in wizard and lightbox dialogs', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);

  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);
  await expect.poll(() => overlayActiveState(page, '.renuvex-pr-fwizard-overlay')).toMatchObject({
    insideOverlay: true,
  });
  await page.keyboard.press('Shift+Tab');
  await expect.poll(() => overlayActiveState(page, '.renuvex-pr-fwizard-overlay')).toMatchObject({
    ariaLabel: 'Kapat',
    insideOverlay: true,
  });
  await page.keyboard.press('Escape');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(false);

  await clickInReviewsShadow(page, '.renuvex-pr-photo-strip-thumb');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(true);
  await expect.poll(() => overlayActiveState(page, '.renuvex-pr-modal-overlay')).toMatchObject({
    insideOverlay: true,
  });
  await page.keyboard.press('Shift+Tab');
  await expect.poll(() => overlayActiveState(page, '.renuvex-pr-modal-overlay')).toMatchObject({
    ariaLabel: 'Kapat',
    insideOverlay: true,
  });
  await page.keyboard.press('Escape');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(false);

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

// Regression for the filter dropdown after Shadow DOM isolation (ADR_0021/ADR_0025). The
// light-dismiss listener lives on `document`, where a click inside the shadow root has its
// target retargeted to the host — popover-registry now uses composedPath so the filter
// toggles correctly, and it swallows the dismiss click so tapping the photo strip under an
// open menu only closes the menu instead of also opening the lightbox.
test('classic summary filter toggles on re-tap and dismiss does not open the lightbox', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);

  // Open, then re-tap the trigger → it must CLOSE (was stuck open after isolation).
  await clickInReviewsShadow(page, '.renuvex-pr-filter-btn');
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-filter-menu.renuvex-pr-open')).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-filter-btn');
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-filter-menu.renuvex-pr-open')).toBe(false);

  // Open again, then tap a photo-strip thumbnail (outside the menu): the tap dismisses the
  // menu and must NOT also open the lightbox.
  await clickInReviewsShadow(page, '.renuvex-pr-filter-btn');
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-filter-menu.renuvex-pr-open')).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-photo-strip-thumb');
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-filter-menu.renuvex-pr-open')).toBe(false);
  expect(await hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(false);

  expect(widgetErrors(log)).toEqual([]);
});

// Regression: caret/X icons are <use> references to a sprite <symbol>. iconUseNode once
// built the <svg><use> via DOMParser('image/svg+xml') + importNode; such a <use> does NOT
// instance its symbol after being moved into a live shadow tree, so the button rendered a
// blank box (non-zero bounding rect, but getBBox() empty). Behavior tests passed because the
// buttons still clicked. Assert the glyph actually paints by checking rendered geometry.
test('photo-strip + lightbox icons instance their sprite symbol (non-empty geometry)', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);

  const stripIconBBoxWidth = await page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const container = anchor?.querySelector('[data-renuvex-slot="product-reviews"] #renuvex-reviews');
    const root = (container as Element & { shadowRoot: ShadowRoot | null } | null)?.shadowRoot || null;
    const svg = root?.querySelector('.renuvex-pr-photo-strip-arrow-prev svg') as SVGGraphicsElement | null;
    if (!svg) return -1;
    try { return svg.getBBox().width; } catch { return 0; }
  });
  expect(stripIconBBoxWidth).toBeGreaterThan(0);

  await clickInReviewsShadow(page, '.renuvex-pr-photo-strip-thumb');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(true);

  const closeIconBBoxWidth = await page.evaluate(() => {
    const host = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .find((h) => (h as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot?.querySelector('.renuvex-pr-modal-overlay'));
    const root = host ? (host as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot : null;
    const svg = root?.querySelector('.renuvex-pr-modal-close svg') as SVGGraphicsElement | null;
    if (!svg) return -1;
    try { return svg.getBBox().width; } catch { return 0; }
  });
  expect(closeIconBBoxWidth).toBeGreaterThan(0);

  expect(widgetErrors(log)).toEqual([]);
});

// Accessibility regression: the rating stars must be keyboard-navigable — BOTH Tab and the
// arrow keys move between them — and closing must return focus to the "Yorum Yap" trigger.
// Esc previously lost focus because getReturnFocusElement read the shadow HOST, not the real
// trigger inside the review shadow.
test('rating stars: Tab + arrow navigation, and Esc returns focus to the trigger', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);

  // Open via keyboard so the focus-return path is exercised.
  await page.evaluate(() => {
    const a = document.querySelector('[data-renuvex-widget="reviews"]');
    const c = a?.querySelector('[data-renuvex-slot="product-reviews"] #renuvex-reviews');
    const root = (c as Element & { shadowRoot: ShadowRoot | null } | null)?.shadowRoot || null;
    (root?.querySelector('.renuvex-pr-write-btn') as HTMLElement | null)?.focus();
  });
  await page.keyboard.press('Enter');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);

  const wizardActiveLabel = () => page.evaluate(() => {
    const host = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .find((h) => (h as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot?.querySelector('.renuvex-pr-fwizard-overlay'));
    const root = host ? (host as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot : null;
    const el = root?.activeElement as HTMLElement | null;
    return el ? (el.getAttribute('aria-label') || el.className) : null;
  });

  // On open the dialog itself holds focus (no star pre-focused), so the FIRST Tab lands on
  // star 1 — not star 2.
  await page.keyboard.press('Tab');
  await expect.poll(wizardActiveLabel).toBe('1 yıldız');
  // Arrow keys move within the star group.
  await page.keyboard.press('ArrowRight');
  await expect.poll(wizardActiveLabel).toBe('2 yıldız');
  // Tab continues to the next star.
  await page.keyboard.press('Tab');
  await expect.poll(wizardActiveLabel).toBe('3 yıldız');

  await page.keyboard.press('Escape');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(false);
  const restored = await page.evaluate(() => {
    const a = document.querySelector('[data-renuvex-widget="reviews"]');
    const c = a?.querySelector('[data-renuvex-slot="product-reviews"] #renuvex-reviews');
    const root = (c as Element & { shadowRoot: ShadowRoot | null } | null)?.shadowRoot || null;
    const el = root?.activeElement as HTMLElement | null;
    return el ? el.className : null;
  });
  expect(restored).toContain('renuvex-pr-write-btn');

  expect(widgetErrors(log)).toEqual([]);
});

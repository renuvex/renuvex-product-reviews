import { expect, test, type Page } from '@playwright/test';
import {
  MERCHANT_ORIGIN,
  PUBLIC_KEY,
  REVIEW_CLOUD_NAME,
  WIDGET_ORIGIN,
  clickInOverlay,
  clickInReviewsShadow,
  fillInOverlay,
  hasInReviewsShadow,
  hasOverlay,
  hasReviewsWidget,
  isOverlayControlDisabled,
  setFileInputInOverlay,
  setupPreviewRoutes,
  setupWidgetRoutes,
  stubVideoMetadata,
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

async function blobAudit(page: Page) {
  return page.evaluate(() => {
    const win = window as Window & {
      __renuvexBlobAudit?: {
        created: string[];
        revoked: string[];
      };
    };
    return win.__renuvexBlobAudit || { created: [], revoked: [] };
  });
}

async function countInOverlay(page: Page, overlaySelector: string, selector: string) {
  return page.evaluate(({ overlaySelector, selector }) => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => (host as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot)
      .filter((candidate): candidate is ShadowRoot => !!candidate)
      .find((candidate) => !!candidate.querySelector(overlaySelector));
    return root?.querySelectorAll(selector).length || 0;
  }, { overlaySelector, selector });
}

async function countNestedInOverlay(page: Page, overlaySelector: string, selector: string, nestedSelector: string) {
  return page.evaluate(({ overlaySelector, selector, nestedSelector }) => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => (host as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot)
      .filter((candidate): candidate is ShadowRoot => !!candidate)
      .find((candidate) => !!candidate.querySelector(overlaySelector));
    return root?.querySelector(selector)?.querySelectorAll(nestedSelector).length ?? -1;
  }, { overlaySelector, selector, nestedSelector });
}

async function overflowMetricsInOverlay(page: Page, overlaySelector: string, selector: string) {
  return page.evaluate(({ overlaySelector, selector }) => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => (host as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot)
      .filter((candidate): candidate is ShadowRoot => !!candidate)
      .find((candidate) => !!candidate.querySelector(overlaySelector));
    const wrap = root?.querySelector<HTMLElement>('.renuvex-pr-fwizard-step-wrap');
    const el = root?.querySelector<HTMLElement>(selector);
    if (!wrap || !el) throw new Error(`Missing overlay selector: ${selector}`);
    return {
      elementClientWidth: el.clientWidth,
      elementScrollWidth: el.scrollWidth,
      wrapClientWidth: wrap.clientWidth,
      wrapScrollWidth: wrap.scrollWidth,
    };
  }, { overlaySelector, selector });
}

async function styleInOverlay(page: Page, overlaySelector: string, selector: string, properties: string[]) {
  return page.evaluate(({ overlaySelector, selector, properties }) => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => (host as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot)
      .filter((candidate): candidate is ShadowRoot => !!candidate)
      .find((candidate) => !!candidate.querySelector(overlaySelector));
    const el = root?.querySelector<HTMLElement>(selector);
    if (!el) throw new Error(`Missing overlay selector: ${selector}`);
    const style = getComputedStyle(el);
    return Object.fromEntries(properties.map((property) => [property, style.getPropertyValue(property)]));
  }, { overlaySelector, selector, properties });
}

async function rectInOverlay(page: Page, overlaySelector: string, selector: string) {
  return page.evaluate(({ overlaySelector, selector }) => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => (host as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot)
      .filter((candidate): candidate is ShadowRoot => !!candidate)
      .find((candidate) => !!candidate.querySelector(overlaySelector));
    const el = root?.querySelector<HTMLElement>(selector);
    if (!el) throw new Error(`Missing overlay selector: ${selector}`);
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  }, { overlaySelector, selector });
}

async function hoverInOverlay(page: Page, overlaySelector: string, selector: string) {
  const box = await page.evaluate(({ overlaySelector, selector }) => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => (host as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot)
      .filter((candidate): candidate is ShadowRoot => !!candidate)
      .find((candidate) => !!candidate.querySelector(overlaySelector));
    const el = root?.querySelector<HTMLElement>(selector);
    if (!el) throw new Error(`Missing overlay selector: ${selector}`);
    var rect = el.getBoundingClientRect();
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
  }, { overlaySelector, selector });

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
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

test('pointer-opened lightbox leaves no focus ring on the trigger after Escape', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);

  // No keyboard navigation has happened (a mouse/touch shopper), so opening the
  // lightbox is a pointer open. Closing with Esc must NOT return focus to the photo
  // trigger — otherwise a :focus-visible ring stays stuck on the thumbnail (the
  // reported bug). Keyboard opens still restore focus (covered by the test above).
  await clickInReviewsShadow(page, '.renuvex-pr-photo-strip-thumb');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(true);
  await page.keyboard.press('Escape');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(false);

  // Pointer open => focus is not restored, so the reviews shadow root has no focused
  // element (focus fell back to <body> when the overlay host was removed).
  expect(await reviewsActiveState(page)).toMatchObject({ className: '', ariaLabel: null, role: null });

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

test('review wizard uses merchant step copy as safe text', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: {
      summaryLayout: 'classic',
      reviewLayout: 'card',
      formStepRatingTitle: '<b>Puanınızı seçin</b>',
      formStepPhotosTitle: 'Fotoğraf ekleri',
      formStepPhotosSubtitle: '<i>Fotoğraf eklemek isteğe bağlıdır.</i>',
      formStepContentTitle: 'Yorumunuzu yazın',
      formStepAuthorTitle: 'Bilgileriniz',
    },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);

  expect(await textInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-title')).toBe('<b>Puanınızı seçin</b>');
  expect(await countNestedInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-title', 'b')).toBe(0);

  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-star:nth-child(5)');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-photos')).toBe(true);
  expect(await textInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-title')).toBe('Fotoğraf ekleri');
  expect(await textInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-subtitle')).toBe('<i>Fotoğraf eklemek isteğe bağlıdır.</i>');
  expect(await countNestedInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-subtitle', 'i')).toBe(0);

  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-footer-skip');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-content')).toBe(true);
  expect(await textInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-title')).toBe('Yorumunuzu yazın');

  await fillInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-textarea', 'Custom copy check.');
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-footer-next');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-author')).toBe(true);
  expect(await textInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-title')).toBe('Bilgileriniz');

  await page.keyboard.press('Escape');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(false);
  expect(widgetErrors(log)).toEqual([]);
});

test('review wizard whitespace-only step copy falls back to defaults', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: {
      summaryLayout: 'classic',
      reviewLayout: 'card',
      formStepRatingTitle: '   ',
      formStepPhotosTitle: '   ',
      formStepPhotosSubtitle: '   ',
      formStepContentTitle: '   ',
      formStepAuthorTitle: '   ',
    },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);

  expect(await textInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-title')).toBe('Bu ürünü nasıl değerlendirirsiniz?');

  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-star:nth-child(5)');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-photos')).toBe(true);
  expect(await textInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-title')).toBe('Fotoğraflı değerlendirme');
  expect(await textInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-subtitle')).toBe('Fotoğraf ekleyebilirsiniz.');

  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-footer-skip');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-content')).toBe(true);
  expect(await textInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-title')).toBe('Deneyiminizi anlatın');

  await fillInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-textarea', 'Fallback copy check.');
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-footer-next');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-author')).toBe(true);
  expect(await textInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-title')).toBe('Hakkınızda');

  await page.keyboard.press('Escape');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(false);
  expect(widgetErrors(log)).toEqual([]);
});

test('review wizard step copy wraps long unbroken words without horizontal overflow', async ({ page }) => {
  const longTitle = 'X'.repeat(60);
  const longSubtitle = 'Y'.repeat(90);
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: {
      summaryLayout: 'classic',
      reviewLayout: 'card',
      formStepRatingTitle: longTitle,
      formStepPhotosTitle: longTitle,
      formStepPhotosSubtitle: longSubtitle,
    },
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);

  expect(await textInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-title')).toBe(longTitle);
  let metrics = await overflowMetricsInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-title');
  expect(metrics.elementScrollWidth).toBeLessThanOrEqual(metrics.elementClientWidth + 1);
  expect(metrics.wrapScrollWidth).toBeLessThanOrEqual(metrics.wrapClientWidth + 1);

  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-star:nth-child(5)');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-photos')).toBe(true);
  expect(await textInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-title')).toBe(longTitle);
  expect(await textInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-subtitle')).toBe(longSubtitle);

  metrics = await overflowMetricsInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-title');
  expect(metrics.elementScrollWidth).toBeLessThanOrEqual(metrics.elementClientWidth + 1);
  expect(metrics.wrapScrollWidth).toBeLessThanOrEqual(metrics.wrapClientWidth + 1);

  metrics = await overflowMetricsInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-subtitle');
  expect(metrics.elementScrollWidth).toBeLessThanOrEqual(metrics.elementClientWidth + 1);
  expect(metrics.wrapScrollWidth).toBeLessThanOrEqual(metrics.wrapClientWidth + 1);

  await page.keyboard.press('Escape');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(false);
  expect(widgetErrors(log)).toEqual([]);
});

test('wizard close control derives icon and hover colors from form background', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: {
      summaryLayout: 'classic',
      reviewLayout: 'card',
      formBgColor: '#111111',
      formPrimaryTextColor: '#111111',
    },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);

  const rootVars = await page.evaluate(() => ({
    closeText: getComputedStyle(document.documentElement).getPropertyValue('--renuvex-pr-fwizard-close-text').trim(),
    closeHoverBg: getComputedStyle(document.documentElement).getPropertyValue('--renuvex-pr-fwizard-close-hover-bg').trim(),
  }));
  expect(rootVars).toEqual({
    closeText: '#ffffff',
    closeHoverBg: 'rgba(255,255,255,0.1)',
  });

  await expect.poll(() => styleInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-close', ['color']))
    .toMatchObject({ color: 'rgb(255, 255, 255)' });

  await hoverInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-close');
  await expect.poll(() => styleInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-close', ['color', 'background-color']))
    .toMatchObject({
      color: 'rgb(255, 255, 255)',
      'background-color': 'rgba(255, 255, 255, 0.1)',
    });

  expect(widgetErrors(log)).toEqual([]);
});

test('photo upload submit waits for completion and posts trusted image URLs', async ({ page }) => {
  const uploadedUrl = `https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/review_images/stores/${PUBLIC_KEY}/submit-photo.jpg`;
  const submittedBodies: Array<Record<string, unknown>> = [];
  const registerBodies: Array<Record<string, unknown>> = [];
  let uploadRequests = 0;
  let releaseUpload: () => void = () => {};
  const uploadGate = new Promise<void>((resolve) => {
    releaseUpload = resolve;
  });

  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
    reviewSubmitHandler: async (route) => {
      submittedBodies.push(JSON.parse(route.request().postData() || '{}') as Record<string, unknown>);
      await route.fulfill({
        status: 201,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ message: 'Yorum alindi', data: { id: 'submitted-review', status: 'pending' } }),
      });
    },
  });

  await page.route(`${WIDGET_ORIGIN}/api/public/upload/sign**`, async (route) => {
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        signature: 'ci-signature',
        timestamp: 1790000000,
        cloud_name: REVIEW_CLOUD_NAME,
        api_key: 'ci-api-key',
        folder: `review_images/stores/${PUBLIC_KEY}`,
      }),
    });
  });
  await page.route('https://api.cloudinary.com/v1_1/**', async (route) => {
    uploadRequests += 1;
    await uploadGate;
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        secure_url: uploadedUrl,
        public_id: `review_images/stores/${PUBLIC_KEY}/submit-photo`,
        version: 1790000001,
        resource_type: 'image',
        format: 'jpg',
        width: 1200,
        height: 1600,
        bytes: 450000,
        asset_id: 'ci-submit-asset',
        signature: 'ci-upload-response-signature',
      }),
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/register**`, async (route) => {
    registerBodies.push(JSON.parse(route.request().postData() || '{}') as Record<string, unknown>);
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-star:nth-child(5)');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-photos')).toBe(true);

  await setFileInputInOverlay(page, '.renuvex-pr-fwizard-overlay', 'input[type="file"]', {
    name: 'submit-photo.jpg',
    mimeType: 'image/jpeg',
    buffer: Buffer.from([0xff, 0xd8, 0xff, 0xd9]),
  });
  await expect.poll(() => uploadRequests).toBe(1);
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-content')).toBe(true);

  await fillInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-textarea', 'Photo upload contract check.');
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-footer-next');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-author')).toBe(true);
  await fillInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-author input[type="text"]', 'Mert');
  expect(await isOverlayControlDisabled(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-submit-btn')).toBe(true);

  releaseUpload();
  await expect.poll(() => isOverlayControlDisabled(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-submit-btn')).toBe(false);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-submit-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-thanks')).toBe(true);

  expect(registerBodies).toEqual([{
    storeId: PUBLIC_KEY,
    secureUrl: uploadedUrl,
    metadata: {
      assetId: 'ci-submit-asset',
      publicId: `review_images/stores/${PUBLIC_KEY}/submit-photo`,
      version: 1790000001,
      resourceType: 'image',
      format: 'jpg',
      width: 1200,
      height: 1600,
      bytes: 450000,
      signature: 'ci-upload-response-signature',
    },
  }]);
  expect(submittedBodies).toHaveLength(1);
  expect(submittedBodies[0]).toMatchObject({
    storeId: PUBLIC_KEY,
    productId: 'product-1',
    author: 'Mert',
    comment: 'Photo upload contract check.',
    rating: 5,
    images: [uploadedUrl],
  });
  expect((submittedBodies[0].images as string[]).every((url) => !url.startsWith('blob:'))).toBe(true);
  expect(widgetErrors(log)).toEqual([]);
});

test('quota-aware capability hides video while keeping the photo review flow available', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { videoReviewsEnabled: true },
    videoCapability: { enabled: false, reason: 'quota_exceeded' },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-star:nth-child(5)');

  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-photos')).toBe(true);
  expect(await hasOverlay(page, '.renuvex-pr-fwizard-step-media')).toBe(false);
  expect(log.urls.some((url) => url.includes('/api/public/upload/video/capability'))).toBe(true);
  expect(widgetErrors(log)).toEqual([]);
});

test('capability rate limits fail closed to the photo-only wizard', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { videoReviewsEnabled: true },
    videoCapability: { enabled: false, status: 429 },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-star:nth-child(5)');

  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-photos')).toBe(true);
  expect(await hasOverlay(page, '.renuvex-pr-fwizard-step-media')).toBe(false);
  expect(widgetErrors(log).filter((message) => !message.includes('status of 429'))).toEqual([]);
});

test('quota races show specific non-retryable video upload copy', async ({ page }) => {
  await stubVideoMetadata(page, 12);
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { videoReviewsEnabled: true },
    videoCapability: { enabled: true },
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/initiate**`, async (route) => {
    await route.fulfill({
      status: 429,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ error: 'video_quota_exceeded' }),
    });
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-star:nth-child(5)');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-media')).toBe(true);

  await setFileInputInOverlay(page, '.renuvex-pr-fwizard-overlay', 'input[accept*="video"]', {
    name: 'quota-video.mp4',
    mimeType: 'video/mp4',
    buffer: Buffer.from([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70]),
  });

  await expect.poll(() => textInOverlay(
    page,
    '.renuvex-pr-fwizard-overlay',
    '.renuvex-pr-fwizard-video-status',
  )).toBe('Bu mağaza bu ayki video yorum limitine ulaştı.');
  expect(await countInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-video-retry')).toBe(0);
  expect(await countInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-video-remove')).toBe(1);
  expect(widgetErrors(log).filter((message) => !message.includes('status of 429'))).toEqual([]);
});

test('video upload wizard posts a ready video token without photo media', async ({ page }) => {
  await stubVideoMetadata(page, 12);
  const submittedBodies: Array<Record<string, unknown>> = [];
  const initiateBodies: Array<Record<string, unknown>> = [];
  const completeBodies: Array<Record<string, unknown>> = [];
  const videoToken = 'video-token-opaque-abcdefghijklmnopqrstuvwxyz1234567890';
  let muxPutCalls = 0;

  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: {
      summaryLayout: 'classic',
      reviewLayout: 'card',
      videoReviewsEnabled: true,
      formStepMediaTitle: 'Medya ekle',
      formStepMediaSubtitle: 'Fotoğraf veya kısa video ekleyebilirsiniz.',
    },
    reviewSubmitHandler: async (route) => {
      submittedBodies.push(JSON.parse(route.request().postData() || '{}') as Record<string, unknown>);
      await route.fulfill({
        status: 201,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ message: 'Yorum alindi', data: { id: 'submitted-video-review', status: 'pending' } }),
      });
    },
  });

  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/initiate**`, async (route) => {
    initiateBodies.push(JSON.parse(route.request().postData() || '{}') as Record<string, unknown>);
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        data: {
          token: videoToken,
          uploadUrl: 'https://mux-upload.test/review-video',
          chunkSize: 8192,
          chunkAttempts: 5,
          expiresAt: '2099-01-01T00:00:00.000Z',
        },
      }),
    });
  });
  await page.route('https://mux-upload.test/**', async (route) => {
    if (route.request().method() === 'OPTIONS') {
      await route.fulfill({
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'PUT,OPTIONS',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Expose-Headers': 'ETag',
        },
        body: '',
      });
      return;
    }
    muxPutCalls += 1;
    await route.fulfill({
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: '',
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/complete**`, async (route) => {
    completeBodies.push(JSON.parse(route.request().postData() || '{}') as Record<string, unknown>);
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ data: { status: 'processing' } }),
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/status**`, async (route) => {
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        data: {
          status: 'ready',
          durationMs: 12000,
          posterUrl: 'https://image.mux.com/signed-playback-1/thumbnail.jpg',
        },
      }),
    });
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-star:nth-child(5)');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-media')).toBe(true);
  expect(await textInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-title')).toBe('Medya ekle');
  expect(await textInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-media-action:nth-child(1) span')).toBe('Fotoğraf Ekle');
  expect(await textInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-media-action:nth-child(2) span')).toBe('Video Ekle');
  expect(await countInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-media-action')).toBe(2);

  const initialPhotoRect = await rectInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-media-action:nth-child(1)');
  const initialVideoRect = await rectInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-media-action:nth-child(2)');
  await page.evaluate(() => {
    const win = window as Window & { __renuvexNativeInputClick?: typeof HTMLInputElement.prototype.click };
    win.__renuvexNativeInputClick = HTMLInputElement.prototype.click;
    HTMLInputElement.prototype.click = function () {
      if (this.type === 'file') return;
      return win.__renuvexNativeInputClick?.call(this);
    };
  });
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-media-action:nth-child(1)');
  expect(await countInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-media-action')).toBe(2);
  expect(await countInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-media-content .renuvex-pr-fwizard-photo-add')).toBe(0);
  expect(await countInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-media-content .renuvex-pr-fwizard-photo-card--embedded')).toBe(1);
  expect((await rectInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-media-action:nth-child(1)')).top).toBeCloseTo(initialPhotoRect.top, 0);
  expect((await rectInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-media-action:nth-child(2)')).top).toBeCloseTo(initialVideoRect.top, 0);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-media-action:nth-child(2)');
  expect((await rectInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-media-action:nth-child(1)')).top).toBeCloseTo(initialPhotoRect.top, 0);
  expect((await rectInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-media-action:nth-child(2)')).top).toBeCloseTo(initialVideoRect.top, 0);
  await page.evaluate(() => {
    const win = window as Window & { __renuvexNativeInputClick?: typeof HTMLInputElement.prototype.click };
    if (win.__renuvexNativeInputClick) HTMLInputElement.prototype.click = win.__renuvexNativeInputClick;
    delete win.__renuvexNativeInputClick;
  });

  await setFileInputInOverlay(page, '.renuvex-pr-fwizard-overlay', 'input[accept*="video"]', {
    name: 'review-video.mp4',
    mimeType: 'video/mp4',
    buffer: Buffer.from([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d]),
  });
  await expect.poll(() => initiateBodies.length).toBe(1);
  await expect.poll(() => muxPutCalls).toBe(1);
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-content')).toBe(true);

  await fillInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-textarea', 'Video upload contract check.');
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-footer-next');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-author')).toBe(true);
  await fillInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-author input[type="text"]', 'Mert');
  await expect.poll(() => isOverlayControlDisabled(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-submit-btn')).toBe(false);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-submit-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-thanks')).toBe(true);

  expect(initiateBodies[0]).toMatchObject({
    storeId: PUBLIC_KEY,
    productId: 'product-1',
    mimeType: 'video/mp4',
    bytes: 12,
  });
  expect(completeBodies).toEqual([{ token: videoToken }]);
  expect(submittedBodies).toHaveLength(1);
  expect(submittedBodies[0]).toMatchObject({
    storeId: PUBLIC_KEY,
    productId: 'product-1',
    author: 'Mert',
    comment: 'Video upload contract check.',
    rating: 5,
    images: [],
    videoToken,
  });
  expect(log.urls.some((url) => url.includes('api.cloudinary.com') || url.includes('api.mux.com'))).toBe(false);
  expect(widgetErrors(log)).toEqual([]);
});

test('video upload retries transient Mux PUT failures before showing shopper retry', async ({ page }) => {
  await stubVideoMetadata(page, 12);
  const videoToken = 'video-token-transient-abcdefghijklmnopqrstuvwxyz1234567890';
  let initiateCalls = 0;
  let muxPutCalls = 0;

  await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: {
      summaryLayout: 'classic',
      reviewLayout: 'card',
      videoReviewsEnabled: true,
    },
  });

  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/initiate**`, async (route) => {
    initiateCalls += 1;
    await route.fulfill({
      status: 201,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        data: {
          token: videoToken,
          uploadUrl: 'https://mux-upload.test/transient-video',
          chunkSize: 8192,
          chunkAttempts: 5,
          expiresAt: '2099-01-01T00:00:00.000Z',
        },
      }),
    });
  });
  await page.route('https://mux-upload.test/transient-video**', async (route) => {
    muxPutCalls += 1;
    if (muxPutCalls <= 3) {
      await route.fulfill({ status: 503, body: '' });
      return;
    }
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: '',
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/complete**`, async (route) => {
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ data: { status: 'processing' } }),
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/status**`, async (route) => {
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        data: {
          status: 'ready',
          durationMs: 12000,
          posterUrl: 'https://image.mux.com/signed-playback-1/thumbnail.jpg',
        },
      }),
    });
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-star:nth-child(5)');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-media')).toBe(true);

  await setFileInputInOverlay(page, '.renuvex-pr-fwizard-overlay', 'input[accept*="video"]', {
    name: 'transient-video.mp4',
    mimeType: 'video/mp4',
    buffer: Buffer.from([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70]),
  });

  await expect.poll(() => muxPutCalls).toBe(4);
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-content')).toBe(true);
  expect(await countInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-video-retry')).toBe(0);
  expect(initiateCalls).toBe(1);
});

test('video retry preserves the Mux direct upload session after chunk attempts are exhausted', async ({ page }) => {
  await stubVideoMetadata(page, 12);
  const videoToken = 'video-token-resume-abcdefghijklmnopqrstuvwxyz1234567890';
  let initiateCalls = 0;
  let statusCalls = 0;
  let muxPutCalls = 0;

  await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: {
      summaryLayout: 'classic',
      reviewLayout: 'card',
      videoReviewsEnabled: true,
    },
  });

  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/initiate**`, async (route) => {
    initiateCalls += 1;
    await route.fulfill({
      status: 201,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        data: {
          token: videoToken,
          uploadUrl: 'https://mux-upload.test/resume-video',
          chunkSize: 8192,
          chunkAttempts: 5,
          expiresAt: '2099-01-01T00:00:00.000Z',
        },
      }),
    });
  });
  await page.route('https://mux-upload.test/resume-video**', async (route) => {
    muxPutCalls += 1;
    if (muxPutCalls <= 5) {
      await route.fulfill({ status: 503, body: '' });
      return;
    }
    await route.fulfill({
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: '',
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/status**`, async (route) => {
    statusCalls += 1;
    if (statusCalls === 1) {
      await route.abort('failed');
      return;
    }
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        data: statusCalls === 2
          ? { status: 'uploading' }
          : { status: 'ready', durationMs: 12000, posterUrl: 'https://image.mux.com/signed-playback-1/thumbnail.jpg' },
      }),
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/complete**`, async (route) => {
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ data: { status: 'processing' } }),
    });
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-star:nth-child(5)');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-media')).toBe(true);

  await setFileInputInOverlay(page, '.renuvex-pr-fwizard-overlay', 'input[accept*="video"]', {
    name: 'resume-video.mp4',
    mimeType: 'video/mp4',
    buffer: Buffer.from([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70]),
  });
  await expect.poll(() => muxPutCalls, { timeout: 15000 }).toBe(5);
  await expect.poll(() => textInOverlay(
    page,
    '.renuvex-pr-fwizard-overlay',
    '.renuvex-pr-fwizard-video-status',
  ), { timeout: 10000 }).toContain('Video yüklenemedi');
  expect(await page.evaluate(() => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => host.shadowRoot)
      .find((candidate) => !!candidate?.querySelector('.renuvex-pr-fwizard-overlay'));
    return typeof (root?.querySelector('.renuvex-pr-fwizard-video-retry') as HTMLButtonElement | null)?.onclick === 'function';
  })).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-video-retry');
  await expect.poll(() => textInOverlay(
    page,
    '.renuvex-pr-fwizard-overlay',
    '.renuvex-pr-fwizard-video-status',
  )).toContain('Video yükleniyor');
  await expect.poll(() => statusCalls).toBeGreaterThanOrEqual(3);
  await expect.poll(() => muxPutCalls).toBe(6);
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-content')).toBe(true);

  expect(initiateCalls).toBe(1);
});

test('video upload card remove cancels pending video selection', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await stubVideoMetadata(page, 12);
  const videoToken = 'video-token-remove-abcdefghijklmnopqrstuvwxyz1234567890';
  let cancelCalls = 0;
  let statusCalls = 0;

  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: {
      summaryLayout: 'classic',
      reviewLayout: 'card',
      videoReviewsEnabled: true,
    },
  });

  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/initiate**`, async (route) => {
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        data: {
          token: videoToken,
          uploadUrl: 'https://mux-upload.test/remove-video',
          chunkSize: 8192,
          chunkAttempts: 5,
          expiresAt: '2099-01-01T00:00:00.000Z',
        },
      }),
    });
  });
  await page.route('https://mux-upload.test/remove-video**', async (route) => {
    await route.fulfill({
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: '',
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/complete**`, async (route) => {
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ data: { status: 'processing' } }),
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/status**`, async (route) => {
    statusCalls += 1;
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ data: { status: 'processing' } }),
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video`, async (route) => {
    if (route.request().method() === 'DELETE') cancelCalls += 1;
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ data: { status: 'cancelling' } }),
    });
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-star:nth-child(5)');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-media')).toBe(true);

  await setFileInputInOverlay(page, '.renuvex-pr-fwizard-overlay', 'input[accept*="video"]', {
    name: 'remove-video.mp4',
    mimeType: 'video/mp4',
    buffer: Buffer.from([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70]),
  });

  await expect.poll(() => countInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-video-card')).toBe(1);
  await page.evaluate(() => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => host.shadowRoot)
      .find((candidate) => !!candidate?.querySelector('.renuvex-pr-fwizard-overlay'));
    (window as Window & { __renuvexVideoPreviewNode?: Element | null }).__renuvexVideoPreviewNode =
      root?.querySelector('.renuvex-pr-fwizard-video-preview') || null;
  });
  await expect.poll(() => statusCalls).toBeGreaterThanOrEqual(2);
  expect(await page.evaluate(() => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => host.shadowRoot)
      .find((candidate) => !!candidate?.querySelector('.renuvex-pr-fwizard-overlay'));
    return (window as Window & { __renuvexVideoPreviewNode?: Element | null }).__renuvexVideoPreviewNode ===
      root?.querySelector('.renuvex-pr-fwizard-video-preview');
  })).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-video-remove');

  await expect.poll(() => countInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-video-card')).toBe(0);
  await expect.poll(() => cancelCalls).toBe(1);
  expect(await isOverlayControlDisabled(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-media-action:nth-child(2)')).toBe(false);
  expect(widgetErrors(log)).toEqual([]);
});

test('offline video removal persists cancellation and flushes it when connectivity returns', async ({ page }) => {
  await stubVideoMetadata(page, 12);
  const videoToken = 'video-token-offline-cancel-abcdefghijklmnopqrstuvwxyz1234567890';
  let cancelCalls = 0;
  let statusCalls = 0;
  let cancelDeliveryAvailable = false;

  await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: {
      summaryLayout: 'classic',
      reviewLayout: 'card',
      videoReviewsEnabled: true,
    },
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/initiate**`, async (route) => {
    await route.fulfill({
      status: 201,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        data: {
          token: videoToken,
          uploadUrl: 'https://mux-upload.test/offline-cancel',
          chunkSize: 8192,
          chunkAttempts: 5,
          expiresAt: '2099-01-01T00:00:00.000Z',
        },
      }),
    });
  });
  await page.route('https://mux-upload.test/offline-cancel**', async (route) => {
    await route.fulfill({
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: '',
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/complete**`, async (route) => {
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ data: { status: 'processing' } }),
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/status**`, async (route) => {
    statusCalls += 1;
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ data: { status: 'processing' } }),
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video`, async (route) => {
    if (route.request().method() === 'DELETE') {
      cancelCalls += 1;
      if (!cancelDeliveryAvailable) {
        await route.abort('failed');
        return;
      }
      await route.fulfill({
        status: 409,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ error: 'upload_terminal' }),
      });
      return;
    }
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ data: { status: 'cancelling' } }),
    });
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-star:nth-child(5)');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-media')).toBe(true);
  await setFileInputInOverlay(page, '.renuvex-pr-fwizard-overlay', 'input[accept*="video"]', {
    name: 'offline-cancel.mp4',
    mimeType: 'video/mp4',
    buffer: Buffer.from([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70]),
  });
  await expect.poll(() => statusCalls).toBeGreaterThanOrEqual(1);

  await page.context().setOffline(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-video-remove');
  await expect.poll(() => countInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-video-card')).toBe(0);
  expect(cancelCalls).toBe(0);
  expect(await page.evaluate(() => (
    Array.from({ length: sessionStorage.length }, (_, index) => sessionStorage.key(index))
      .filter((key) => key?.startsWith('renuvex_pr_video_cancel_')).length
  ))).toBe(1);

  await page.context().setOffline(false);
  cancelDeliveryAvailable = true;
  await page.evaluate(() => window.dispatchEvent(new Event('online')));
  await expect.poll(() => cancelCalls).toBe(1);
  await expect.poll(() => page.evaluate(() => (
    Array.from({ length: sessionStorage.length }, (_, index) => sessionStorage.key(index))
      .filter((key) => key?.startsWith('renuvex_pr_video_cancel_')).length
  ))).toBe(0);
});

test('preview video media step simulates upload without public video endpoints', async ({ page }) => {
  await stubVideoMetadata(page, 10);
  let publicVideoUploadCalls = 0;
  const log = await setupPreviewRoutes(page, {
    reviewsSettings: {
      summaryLayout: 'classic',
      reviewLayout: 'card',
      videoReviewsEnabled: true,
      formStepMediaTitle: 'Önizleme medya',
      formStepMediaSubtitle: 'Fotoğraf veya video ekleyebilirsiniz.',
    },
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/**`, async (route) => {
    publicVideoUploadCalls += 1;
    await route.fulfill({
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ error: 'preview_must_not_call_public_video_upload' }),
    });
  });

  await page.goto(`${MERCHANT_ORIGIN}/preview`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-star:nth-child(5)');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-media')).toBe(true);
  expect(await textInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-title')).toBe('Önizleme medya');

  await setFileInputInOverlay(page, '.renuvex-pr-fwizard-overlay', 'input[accept*="video"]', {
    name: 'preview-video.mp4',
    mimeType: 'video/mp4',
    buffer: Buffer.from([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70]),
  });
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-content')).toBe(true);

  expect(publicVideoUploadCalls).toBe(0);
  expect(log.urls.some((url) => url.includes('/api/public/upload/video/'))).toBe(false);
  expect(widgetErrors(log)).toEqual([]);
});

test('closing wizard during a pending photo upload revokes local blob previews', async ({ page }) => {
  await page.addInitScript(() => {
    const win = window as Window & {
      __renuvexBlobAudit?: {
        created: string[];
        revoked: string[];
      };
    };
    const created: string[] = [];
    const revoked: string[] = [];
    const nativeCreate = URL.createObjectURL.bind(URL);
    const nativeRevoke = URL.revokeObjectURL.bind(URL);
    URL.createObjectURL = ((value: Blob | MediaSource) => {
      const url = nativeCreate(value);
      created.push(url);
      return url;
    }) as typeof URL.createObjectURL;
    URL.revokeObjectURL = ((url: string) => {
      revoked.push(url);
      return nativeRevoke(url);
    }) as typeof URL.revokeObjectURL;
    win.__renuvexBlobAudit = { created, revoked };
  });

  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
  });
  const uploadedUrl = `https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/review_images/stores/${PUBLIC_KEY}/pending-close.jpg`;

  await page.route(`${WIDGET_ORIGIN}/api/public/upload/sign**`, async (route) => {
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        signature: 'ci-signature',
        timestamp: 1790000000,
        cloud_name: REVIEW_CLOUD_NAME,
        api_key: 'ci-api-key',
        folder: `review_images/stores/${PUBLIC_KEY}`,
      }),
    });
  });
  await page.route('https://api.cloudinary.com/v1_1/**', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        secure_url: uploadedUrl,
        public_id: `review_images/stores/${PUBLIC_KEY}/pending-close`,
        version: 1790000002,
        resource_type: 'image',
        format: 'jpg',
        width: 1200,
        height: 1600,
        bytes: 450000,
        asset_id: 'ci-pending-close-asset',
        signature: 'ci-upload-response-signature',
      }),
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/register**`, async (route) => {
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-star:nth-child(5)');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-photos')).toBe(true);

  await setFileInputInOverlay(page, '.renuvex-pr-fwizard-overlay', 'input[type="file"]', {
    name: 'review-photo.jpg',
    mimeType: 'image/jpeg',
    buffer: Buffer.from([0xff, 0xd8, 0xff, 0xd9]),
  });

  await expect.poll(() => blobAudit(page)).toMatchObject({ created: [expect.stringContaining('blob:')] });
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-content')).toBe(true);
  await page.keyboard.press('Escape');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(false);

  const audit = await blobAudit(page);
  expect(audit.revoked).toEqual(expect.arrayContaining(audit.created));
  expect(widgetErrors(log)).toEqual([]);
});

test('removing one pending photo does not abort later selected uploads', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
  });
  let cloudUploadCalls = 0;

  await page.route(`${WIDGET_ORIGIN}/api/public/upload/sign**`, async (route) => {
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        signature: 'ci-signature',
        timestamp: 1790000000,
        cloud_name: REVIEW_CLOUD_NAME,
        api_key: 'ci-api-key',
        folder: `review_images/stores/${PUBLIC_KEY}`,
      }),
    });
  });
  await page.route('https://api.cloudinary.com/v1_1/**', async (route) => {
    cloudUploadCalls += 1;
    const callIndex = cloudUploadCalls;
    if (callIndex === 1) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        secure_url: `https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/review_images/stores/${PUBLIC_KEY}/multi-${callIndex}.jpg`,
        public_id: `review_images/stores/${PUBLIC_KEY}/multi-${callIndex}`,
        version: 1790000100 + callIndex,
        resource_type: 'image',
        format: 'jpg',
        width: 1200,
        height: 1600,
        bytes: 450000 + callIndex,
        asset_id: `ci-multi-${callIndex}-asset`,
        signature: 'ci-upload-response-signature',
      }),
    });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/register**`, async (route) => {
    await route.fulfill({
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-star:nth-child(5)');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-photos')).toBe(true);

  await setFileInputInOverlay(page, '.renuvex-pr-fwizard-overlay', 'input[type="file"]', [
    { name: 'first-photo.jpg', mimeType: 'image/jpeg', buffer: Buffer.from([0xff, 0xd8, 0xff, 0xd9]) },
    { name: 'second-photo.jpg', mimeType: 'image/jpeg', buffer: Buffer.from([0xff, 0xd8, 0xff, 0xd9, 0x00]) },
  ]);

  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-content')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-footer-back');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-photos')).toBe(true);
  await expect.poll(() => countInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-photo-thumb')).toBe(2);

  await clickInOverlay(
    page,
    '.renuvex-pr-fwizard-overlay',
    '.renuvex-pr-fwizard-photo-thumb:first-child .renuvex-pr-fwizard-photo-remove',
  );

  await expect.poll(() => cloudUploadCalls, { timeout: 4000 }).toBe(2);
  await page.keyboard.press('Escape');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(false);

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

// Regression for the popover-registry lifecycle/contract rework. A full re-render (sort)
// rebuilds the actions block and registers a NEW filter popover while the one-shot producer
// never unregisters the old one; the registry must reclaim the disconnected old entry
// (purgeDisconnected) so the live filter's light-dismiss still works exactly once. The
// registry array is module-local and intentionally NOT exported, so this is proven at the
// behavior level: after a sort-driven re-render, opening the freshly-mounted filter and
// tapping outside must dismiss ONLY the menu (no lightbox), with no console error — a leaked
// registry of stale entries would corrupt that single dismiss pass.
test('filter popover light-dismiss survives a summary re-render (no registry leak)', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);

  // Trigger a full re-render via a sort selection (rebuilds the actions block → a new
  // registerPopover; the previous filterMenu is detached, leaving a disconnected entry).
  await clickInReviewsShadow(page, '.renuvex-pr-filter-btn');
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-filter-menu.renuvex-pr-open')).toBe(true);
  await page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const container = anchor?.querySelector('[data-renuvex-slot="product-reviews"] #renuvex-reviews');
    const root = (container as Element & { shadowRoot: ShadowRoot | null } | null)?.shadowRoot || null;
    const item = Array.from(root?.querySelectorAll<HTMLElement>('.renuvex-pr-filter-item') || [])
      .find((el) => (el.textContent || '').trim() === 'En Yüksek Puan');
    if (!item) throw new Error('Missing sort item: En Yüksek Puan');
    item.focus();
    item.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
  });
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-filter-menu.renuvex-pr-open')).toBe(false);
  // The summary is rebuilt — the new hidden menu marks the selected sort as active.
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-filter-btn')).toBe(true);
  await expect.poll(() => page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const container = anchor?.querySelector('[data-renuvex-slot="product-reviews"] #renuvex-reviews');
    const root = (container as Element & { shadowRoot: ShadowRoot | null } | null)?.shadowRoot || null;
    return (root?.querySelector<HTMLElement>('.renuvex-pr-filter-item-active')?.textContent || '').trim();
  })).toBe('En Yüksek Puan');

  // The freshly-mounted filter's light-dismiss must still work: open, then tap a photo-strip
  // thumbnail outside the menu → the tap dismisses ONLY the menu, never opening the lightbox.
  await clickInReviewsShadow(page, '.renuvex-pr-filter-btn');
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-filter-menu.renuvex-pr-open')).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-photo-strip-thumb');
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-filter-menu.renuvex-pr-open')).toBe(false);
  expect(await hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(false);

  expect(widgetErrors(log)).toEqual([]);
});

test('filter pointer activation shields write button from same-gesture press-through', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'classic', reviewLayout: 'card' },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);

  await clickInReviewsShadow(page, '.renuvex-pr-filter-btn');
  await expect.poll(() => hasInReviewsShadow(page, '.renuvex-pr-filter-menu.renuvex-pr-open')).toBe(true);

  const armed = await page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const container = anchor?.querySelector('[data-renuvex-slot="product-reviews"] #renuvex-reviews');
    const root = (container as Element & { shadowRoot: ShadowRoot | null } | null)?.shadowRoot || null;
    const item = Array.from(root?.querySelectorAll<HTMLElement>('.renuvex-pr-filter-item') || [])
      .find((el) => (el.textContent || '').trim() === 'En Yüksek Puan');
    if (!root || !item) throw new Error('Missing filter item');

    const event = typeof PointerEvent === 'function'
      ? new PointerEvent('pointerdown', { bubbles: true, cancelable: true, button: 0, pointerType: 'touch' })
      : new MouseEvent('mousedown', { bubbles: true, cancelable: true, button: 0 });
    item.dispatchEvent(event);

    const content = root.querySelector<HTMLElement>('[data-renuvex-shadow-content]');
    const writeBtn = root.querySelector<HTMLElement>('.renuvex-pr-write-btn');
    const writeStyle = writeBtn ? getComputedStyle(writeBtn) : null;
    return {
      shielded: content?.hasAttribute('data-renuvex-pr-dismiss-gesture') || false,
      menuOpen: !!root.querySelector('.renuvex-pr-filter-menu.renuvex-pr-open'),
      pointerEvents: writeStyle?.pointerEvents || '',
      opacity: writeStyle?.opacity || '',
    };
  });

  expect(armed).toEqual({
    shielded: true,
    menuOpen: false,
    pointerEvents: 'none',
    opacity: '1',
  });

  const cleared = await page.evaluate(() => {
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true }));
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const container = anchor?.querySelector('[data-renuvex-slot="product-reviews"] #renuvex-reviews');
    const root = (container as Element & { shadowRoot: ShadowRoot | null } | null)?.shadowRoot || null;
    const content = root?.querySelector<HTMLElement>('[data-renuvex-shadow-content]');
    const writeBtn = root?.querySelector<HTMLElement>('.renuvex-pr-write-btn');
    return {
      shielded: content?.hasAttribute('data-renuvex-pr-dismiss-gesture') || false,
      pointerEvents: writeBtn ? getComputedStyle(writeBtn).pointerEvents : '',
    };
  });

  expect(cleared).toEqual({ shielded: false, pointerEvents: 'auto' });
  expect(await hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(false);
  await expect.poll(() => page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const container = anchor?.querySelector('[data-renuvex-slot="product-reviews"] #renuvex-reviews');
    const root = (container as Element & { shadowRoot: ShadowRoot | null } | null)?.shadowRoot || null;
    return (root?.querySelector<HTMLElement>('.renuvex-pr-filter-item-active')?.textContent || '').trim();
  })).toBe('En Yüksek Puan');
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

// Regression: the compact summary trigger wraps the rating stars + count (content). The
// global press-feedback (base-reset `button:active{opacity:.85}`) used to dim that whole
// trigger on tap while the bar chart opened — read as an unwanted hover on the stars/count.
// The trigger now opts out of the press-dim (chevron rotation + panel toggle are the
// affordance). Assert the rating content stays at full opacity while the trigger is pressed.
test('compact summary trigger keeps its rating content at full opacity while pressed', async ({ page }) => {
  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: { summaryLayout: 'compact', reviewLayout: 'card' },
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);

  const triggerCenter = await page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const container = anchor?.querySelector('[data-renuvex-slot="product-reviews"] #renuvex-reviews');
    const root = (container as (Element & { shadowRoot: ShadowRoot | null }) | null)?.shadowRoot || null;
    const el = root?.querySelector<HTMLElement>('.renuvex-pr-compact-trigger') || null;
    if (!el) throw new Error('Missing compact trigger');
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  });

  const triggerOpacity = () => page.evaluate(() => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const container = anchor?.querySelector('[data-renuvex-slot="product-reviews"] #renuvex-reviews');
    const root = (container as (Element & { shadowRoot: ShadowRoot | null }) | null)?.shadowRoot || null;
    const el = root?.querySelector<HTMLElement>('.renuvex-pr-compact-trigger') || null;
    return el ? getComputedStyle(el).opacity : null;
  });

  // Hold the press so :active is active during the measurement.
  await page.mouse.move(triggerCenter.x, triggerCenter.y);
  await page.mouse.down();
  expect(await triggerOpacity()).toBe('1'); // was '0.85' before the opt-out
  await page.mouse.up();

  expect(widgetErrors(log)).toEqual([]);
});

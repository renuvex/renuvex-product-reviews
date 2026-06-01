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
  setupWidgetRoutes,
  textInOverlay,
  widgetErrors,
} from './widget-harness';

type UploadFilePayload = {
  name: string;
  mimeType: string;
  buffer: Buffer;
};

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

async function setFileInputInOverlay(
  page: Page,
  overlaySelector: string,
  selector: string,
  files: UploadFilePayload | UploadFilePayload[],
) {
  const handle = await page.evaluateHandle(({ overlaySelector, selector }) => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => (host as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot)
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
      body: JSON.stringify({ secure_url: uploadedUrl }),
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

  expect(registerBodies).toEqual([{ storeId: PUBLIC_KEY, secureUrl: uploadedUrl }]);
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
      body: JSON.stringify({ secure_url: uploadedUrl }),
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

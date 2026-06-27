import { expect, test, type Page, type Route, type TestInfo } from '@playwright/test';
import {
  MERCHANT_ORIGIN,
  PUBLIC_KEY,
  REVIEW_CLOUD_NAME,
  WIDGET_ORIGIN,
  clickInOverlay,
  clickInReviewsShadow,
  fillInOverlay,
  hasOverlay,
  hasReviewsWidget,
  isOverlayControlDisabled,
  setFileInputInOverlay,
  setupWidgetRoutes,
  stubVideoMetadata,
  widgetErrors,
} from './widget-harness';

type ReviewLayout = 'card' | 'list' | 'gallery';
type WidgetSize = 'small' | 'medium' | 'large';

const LAYOUT_SIZE_CASES: Array<{
  layout: ReviewLayout;
  size: WidgetSize;
  selector: string;
  desktopWidth: number;
  mobileWidth: number;
}> = [
  {
    layout: 'card',
    size: 'small',
    selector: '.renuvex-pr-review-card .renuvex-pr-media-video-thumb',
    desktopWidth: 80,
    mobileWidth: 80,
  },
  {
    layout: 'list',
    size: 'medium',
    selector: '.renuvex-pr-review-list-media .renuvex-pr-media-video-thumb',
    desktopWidth: 110,
    mobileWidth: 100,
  },
  {
    layout: 'gallery',
    size: 'large',
    selector: '.renuvex-pr-review-gallery-media .renuvex-pr-media-video-thumb',
    desktopWidth: 140,
    mobileWidth: 110,
  },
];

function isMobileProject(testInfo: TestInfo): boolean {
  return testInfo.project.name === 'pixel-android' || testInfo.project.name === 'iphone-webkit';
}

function expectedMediaPlaySizes(thumbnailWidth: number) {
  const container = Math.round(Math.max(36, Math.min(52, thumbnailWidth * 0.38)));
  return {
    container,
    icon: Math.round(container * 0.5),
  };
}

function videoMedia(uid: string, position = 0) {
  const posterUrl = `https://image.mux.com/${uid}/thumbnail.jpg`;
  return {
    type: 'video',
    playbackId: uid,
    url: `https://stream.mux.com/${uid}.m3u8`,
    posterUrl,
    thumbnailUrl: posterUrl,
    durationMs: 45_000,
    width: 1080,
    height: 1920,
    position,
  };
}

function imageMedia(name: string, position = 0) {
  const url = `https://res.cloudinary.com/${REVIEW_CLOUD_NAME}/image/upload/v1/review_images/stores/${PUBLIC_KEY}/${name}.jpg`;
  return {
    type: 'image',
    url,
    thumbnailUrl: url,
    posterUrl: null,
    durationMs: null,
    width: 1200,
    height: 1600,
    position,
  };
}

function review(id: string, media: Array<Record<string, unknown>>) {
  return {
    id,
    rating: 5,
    title: `Review ${id}`,
    comment: 'Cross-browser media contract.',
    author: 'Media T.',
    createdAt: '2026-06-14T00:00:00.000Z',
    images: [],
    media,
    merchantReply: null,
    recommendation: true,
  };
}

function reviewsPayload(reviews: Array<Record<string, unknown>>) {
  return {
    data: {
      reviews,
      allCount: reviews.length,
      totalCount: reviews.length,
      ratingCounts: [0, 0, 0, 0, reviews.length],
      avgRating: '5.0',
      hasMore: false,
      nextCursor: null,
      page: 1,
      totalPages: 1,
    },
  };
}

async function fulfillJson(route: Route, body: unknown): Promise<void> {
  await route.fulfill({
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  });
}

async function routeMuxAssets(page: Page): Promise<void> {
  await page.route('https://stream.mux.com/**', async (route) => {
    const pathname = new URL(route.request().url()).pathname;
    if (pathname.endsWith('.m3u8')) {
      await route.fulfill({
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/vnd.apple.mpegurl',
        },
        body: '#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-TARGETDURATION:6\n#EXT-X-MEDIA-SEQUENCE:0\n#EXT-X-ENDLIST\n',
      });
      return;
    }
    await route.fallback();
  });
  await page.route('https://image.mux.com/**', async (route) => {
    await route.fulfill({
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'image/svg+xml; charset=utf-8',
      },
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="120"><rect width="160" height="120" fill="#111"/></svg>',
    });
  });
}

async function setupVideoWidget(
  page: Page,
  options: {
    layout?: ReviewLayout;
    size?: WidgetSize;
    reviews?: Array<Record<string, unknown>>;
  } = {},
) {
  await routeMuxAssets(page);
  const rows = options.reviews ?? [review('video-1', [videoMedia('video-1')])];
  return setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: {
      summaryLayout: 'classic',
      reviewLayout: options.layout ?? 'card',
      size: options.size ?? 'medium',
      thumbnailSize: options.size ?? 'medium',
      videoReviewsEnabled: true,
    },
    reviewsGetHandler: async (route) => {
      await fulfillJson(route, reviewsPayload(rows));
    },
  });
}

async function mediaBox(page: Page, selector: string) {
  return page.evaluate((selector) => {
    const anchor = document.querySelector('[data-renuvex-widget="reviews"]');
    const container = anchor?.querySelector('[data-renuvex-slot="product-reviews"] #renuvex-reviews');
    const root = (container as Element & { shadowRoot: ShadowRoot | null } | null)?.shadowRoot || null;
    const element = root?.querySelector<HTMLElement>(selector);
    const widget = root?.querySelector<HTMLElement>('#renuvex-reviews-widget');
    if (!element || !widget) throw new Error(`Missing media selector: ${selector}`);
    const rect = element.getBoundingClientRect();
    const computedStyle = getComputedStyle(element);
    const computedWidth = Number.parseFloat(computedStyle.width);
    const computedHeight = Number.parseFloat(computedStyle.height);
    const poster = element.querySelector<HTMLImageElement>('.renuvex-pr-media-poster');
    const play = element.querySelector<HTMLElement>('.renuvex-pr-media-play');
    const playIcon = play?.querySelector<SVGElement>('svg');
    const playRect = play?.getBoundingClientRect();
    const playIconRect = playIcon?.getBoundingClientRect();
    const playStyle = play ? getComputedStyle(play) : null;
    return {
      width: rect.width || computedWidth,
      height: rect.height || computedHeight,
      duration: element.querySelector('.renuvex-pr-media-duration')?.textContent?.trim() || '',
      hasPlayIcon: !!playIcon,
      playWidth: playRect?.width || 0,
      playIconWidth: playIconRect?.width || 0,
      playBackground: playStyle?.backgroundColor || '',
      posterTag: poster?.tagName || '',
      posterSrc: poster?.getAttribute('src') || '',
      posterSrcset: poster?.getAttribute('srcset') || '',
      widgetClientWidth: widget.clientWidth,
      widgetScrollWidth: widget.scrollWidth,
    };
  }, selector);
}

async function lightboxVideoState(page: Page) {
  return page.evaluate(() => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => host.shadowRoot)
      .filter((candidate): candidate is ShadowRoot => !!candidate)
      .find((candidate) => !!candidate.querySelector('.renuvex-pr-modal-overlay'));
    const overlay = root?.querySelector<HTMLElement>('.renuvex-pr-modal-overlay');
    const wrap = root?.querySelector<HTMLElement>('.renuvex-pr-modal-wrap');
    const player = root?.querySelector<HTMLElement>('mux-player.renuvex-pr-modal-main-video');
    if (!overlay || !wrap || !player) throw new Error('Missing Mux Player lightbox');
    const style = getComputedStyle(player);
    const ThemeConstructor = customElements.get('media-theme-renuvex-review-storefront') as
      | (CustomElementConstructor & { template?: HTMLTemplateElement })
      | undefined;
    const RenditionMenuButton = customElements.get('media-rendition-menu-button') as
      | (CustomElementConstructor & { getTooltipContentHTML?: () => string })
      | undefined;
    const PlaybackRateMenuButton = customElements.get('media-playback-rate-menu-button') as
      | (CustomElementConstructor & { getTooltipContentHTML?: () => string })
      | undefined;
    const themeTemplate = ThemeConstructor?.template;
    const themeMarkup = themeTemplate?.innerHTML || themeTemplate?.content.textContent || '';
    const contextMenuEvent = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
    player.dispatchEvent(contextMenuEvent);
    return {
      tagName: player.tagName,
      playbackId: player.getAttribute('playback-id') || '',
      preload: player.getAttribute('preload') || '',
      streamType: player.getAttribute('stream-type') || '',
      mutedAttr: player.hasAttribute('muted'),
      playsInlineAttr: player.hasAttribute('playsinline'),
      disableTracking: player.hasAttribute('disable-tracking'),
      disableCookies: player.hasAttribute('disable-cookies'),
      hotkeys: player.getAttribute('hotkeys') || '',
      nohotkeys: player.hasAttribute('nohotkeys'),
      poster: player.getAttribute('poster') || '',
      autoplayAttr: player.hasAttribute('autoplay'),
      playerLang: player.getAttribute('lang') || '',
      theme: player.getAttribute('theme') || '',
      themeRegistered: !!ThemeConstructor,
      themeHasTurkishController:
        themeMarkup.includes('<media-controller') && themeMarkup.includes('lang="tr"'),
      renditionMenuTooltip: RenditionMenuButton?.getTooltipContentHTML?.() || '',
      playbackRateMenuTooltip: PlaybackRateMenuButton?.getTooltipContentHTML?.() || '',
      themeUsesLightboxProgressColor:
        themeMarkup.includes('--media-range-bar-color: var(--renuvex-pr-review-lightbox-video-progress, #ffffff)'),
      themeHasContrastThumb:
        themeMarkup.includes('--media-range-thumb-background: radial-gradient') &&
        themeMarkup.includes('#000000 32%') &&
        themeMarkup.includes('var(--renuvex-pr-review-lightbox-video-progress, #ffffff) 32%') &&
        themeMarkup.includes('--media-range-thumb-box-shadow: 0 0 0 1px rgba(0,0,0,0.45)'),
      themeUsesLightboxProgressTrack:
        themeMarkup.includes('--media-range-track-background: var(--renuvex-pr-review-lightbox-video-progress-track, #000000)'),
      themeHasPointerContrast:
        themeMarkup.includes('--media-range-track-pointer-background: rgba(255,255,255,0.72)') &&
        themeMarkup.includes('--media-range-track-pointer-border-right: 1px solid rgba(0,0,0,0.55)'),
      themeHidesTimelinePreviewThumbnail:
        themeMarkup.includes('--media-preview-thumbnail-display: none'),
      themeHasPreviewTimeContrast:
        themeMarkup.includes('--media-preview-time-background: #000000') &&
        themeMarkup.includes('--media-preview-time-text-shadow: none') &&
        themeMarkup.includes('--media-text-background: #000000') &&
        themeMarkup.includes('--media-control-background: #000000') &&
        themeMarkup.includes('--media-text-color: var(--renuvex-pr-review-lightbox-video-icon, #ffffff)'),
      themeHasFilledCenterPlayButton:
        themeMarkup.includes('media-control-bar,') &&
        themeMarkup.includes('media-control-bar *,') &&
        themeMarkup.includes('.center-controls.pre-playback media-play-button') &&
        themeMarkup.includes('--media-control-background: rgba(0,0,0,0.20)') &&
        themeMarkup.includes('--media-control-hover-background: rgba(0,0,0,0.28)') &&
        themeMarkup.includes('--media-control-padding: 0') &&
        themeMarkup.includes('--media-button-icon-width: 34px') &&
        themeMarkup.includes('width: 72px') &&
        themeMarkup.includes('border-radius: 50%') &&
        themeMarkup.includes('--media-icon-color: var(--renuvex-pr-review-lightbox-video-icon, #ffffff)') &&
        themeMarkup.includes('--media-text-color: var(--renuvex-pr-review-lightbox-video-icon, #ffffff)'),
      accentColor: player.getAttribute('accent-color') || '',
      primaryColor: player.getAttribute('primary-color') || '',
      secondaryColor: player.getAttribute('secondary-color') || '',
      contextMenuPrevented: contextMenuEvent.defaultPrevented,
      seekBackwardButton: style.getPropertyValue('--seek-backward-button').trim(),
      seekForwardButton: style.getPropertyValue('--seek-forward-button').trim(),
      pipButton: style.getPropertyValue('--pip-button').trim(),
      fullscreenButton: style.getPropertyValue('--fullscreen-button').trim(),
      renditionMenuButton: style.getPropertyValue('--rendition-menu-button').trim(),
      controlsBackdropColor: style.getPropertyValue('--controls-backdrop-color').trim(),
      centerPlayButton: style.getPropertyValue('--center-play-button').trim(),
      dialogRole: wrap.getAttribute('role'),
      ariaModal: wrap.getAttribute('aria-modal'),
      overlayClientWidth: overlay.clientWidth,
      overlayScrollWidth: overlay.scrollWidth,
    };
  });
}

async function swipeVideoLightbox(page: Page, options: { startXRatio: number; endXRatio: number; yRatio: number }) {
  await page.evaluate(({ startXRatio, endXRatio, yRatio }) => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => host.shadowRoot)
      .filter((candidate): candidate is ShadowRoot => !!candidate)
      .find((candidate) => !!candidate.querySelector('.renuvex-pr-modal-overlay'));
    const player = root?.querySelector<HTMLElement>('mux-player.renuvex-pr-modal-main-video');
    if (!player) throw new Error('Missing video player for swipe');
    const targetPlayer = player;
    const rect = targetPlayer.getBoundingClientRect();
    const y = rect.top + rect.height * yRatio;
    const startX = rect.left + rect.width * startXRatio;
    const endX = rect.left + rect.width * endXRatio;

    function dispatchTouch(type: 'touchstart' | 'touchend', x: number) {
      const event = new Event(type, { bubbles: true, cancelable: true });
      const touch = {
        identifier: 1,
        target: targetPlayer,
        clientX: x,
        clientY: y,
        screenX: x,
        screenY: y,
        pageX: x,
        pageY: y,
      };
      Object.defineProperty(event, 'touches', { value: type === 'touchend' ? [] : [touch] });
      Object.defineProperty(event, 'targetTouches', { value: type === 'touchend' ? [] : [touch] });
      Object.defineProperty(event, 'changedTouches', { value: [touch] });
      targetPlayer.dispatchEvent(event);
    }

    dispatchTouch('touchstart', startX);
    dispatchTouch('touchend', endX);
  }, options);
}

for (const layoutCase of LAYOUT_SIZE_CASES) {
  test(`${layoutCase.layout} ${layoutCase.size} renders a poster-first video tile without preloading playback`, async ({ page }, testInfo) => {
    const log = await setupVideoWidget(page, {
      layout: layoutCase.layout,
      size: layoutCase.size,
    });

    await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
    await expect.poll(() => hasReviewsWidget(page)).toBe(true);

    const box = await mediaBox(page, layoutCase.selector);
    const expectedWidth = isMobileProject(testInfo) ? layoutCase.mobileWidth : layoutCase.desktopWidth;
    expect(box.width).toBeGreaterThan(expectedWidth - 2);
    expect(box.width).toBeLessThan(expectedWidth + 2);
    expect(box.height).toBeGreaterThan(0);
    expect(box.duration).toBe('0:45');
    expect(box.hasPlayIcon).toBe(true);
    expect(box.playBackground).toBe('rgba(0, 0, 0, 0.68)');
    const expectedPlay = expectedMediaPlaySizes(expectedWidth);
    expect(box.playWidth).toBeGreaterThan(expectedPlay.container - 1);
    expect(box.playWidth).toBeLessThan(expectedPlay.container + 1);
    expect(box.playIconWidth).toBeGreaterThan(expectedPlay.icon - 1);
    expect(box.playIconWidth).toBeLessThan(expectedPlay.icon + 1);
    expect(box.posterTag).toBe('IMG');
    expect(box.posterSrc).toContain('/video-1/thumbnail.jpg');
    expect(box.posterSrc).toMatch(/[?&]width=\d+/);
    expect(box.posterSrc).toMatch(/[?&]height=\d+/);
    expect(box.posterSrc).toContain('fit_mode=crop');
    expect(box.posterSrcset).toContain(' 1x');
    expect(box.posterSrcset).toContain(' 2x');
    expect(box.widgetScrollWidth).toBeLessThanOrEqual(box.widgetClientWidth + 1);

    expect(log.urls.some((url) => url.endsWith('/video-1.m3u8'))).toBe(false);
    expect(widgetErrors(log)).toEqual([]);
  });
}

test('video lightbox uses Mux Player contract and closes on browser back', async ({ page }) => {
  const log = await setupVideoWidget(page);

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-review-card .renuvex-pr-media-video-thumb');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(true);
  await expect.poll(async () => (await lightboxVideoState(page)).themeRegistered).toBe(true);

  const state = await lightboxVideoState(page);
  expect(state).toMatchObject({
    tagName: 'MUX-PLAYER',
    playbackId: 'video-1',
    preload: 'metadata',
    streamType: 'on-demand',
    mutedAttr: true,
    playsInlineAttr: true,
    disableTracking: true,
    disableCookies: true,
    autoplayAttr: false,
    playerLang: 'tr',
    theme: 'renuvex-review-storefront',
    themeRegistered: true,
    themeHasTurkishController: true,
    renditionMenuTooltip: 'Kalite',
    playbackRateMenuTooltip: 'Oynatma hızı',
    themeUsesLightboxProgressColor: true,
    themeHasContrastThumb: true,
    themeUsesLightboxProgressTrack: true,
    themeHasPointerContrast: true,
    themeHidesTimelinePreviewThumbnail: true,
    themeHasPreviewTimeContrast: true,
    themeHasFilledCenterPlayButton: true,
    accentColor: 'var(--renuvex-pr-review-lightbox-video-icon, #ffffff)',
    primaryColor: 'var(--renuvex-pr-review-lightbox-video-icon, #ffffff)',
    secondaryColor: '#000000',
    contextMenuPrevented: true,
    hotkeys: '',
    nohotkeys: true,
    seekBackwardButton: 'none',
    seekForwardButton: 'none',
    pipButton: 'none',
    fullscreenButton: 'none',
    renditionMenuButton: 'none',
    controlsBackdropColor: 'rgba(0,0,0,0.58)',
    centerPlayButton: '',
    dialogRole: 'dialog',
    ariaModal: 'true',
  });
  expect(state.poster).toContain('/video-1/thumbnail.jpg');
  expect(state.poster).toContain('width=1280');
  expect(state.poster).toContain('height=720');
  expect(state.poster).toContain('fit_mode=preserve');
  expect(state.overlayScrollWidth).toBeLessThanOrEqual(state.overlayClientWidth + 1);

  await page.evaluate(() => history.back());
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(false);
  await expect.poll(() => page.locator('mux-player').count()).toBe(0);
  expect(widgetErrors(log)).toEqual([]);
});

test('video lightbox derives playback id from trusted legacy m3u8 URLs', async ({ page }) => {
  const log = await setupVideoWidget(page, {
    reviews: [review('video-legacy', [{
      ...videoMedia('legacy-playback-id'),
      playbackId: undefined,
    }])],
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-review-card .renuvex-pr-media-video-thumb');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(true);
  await expect.poll(async () => (await lightboxVideoState(page)).playbackId).toBe('legacy-playback-id');

  await page.keyboard.press('Escape');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(false);
  expect(widgetErrors(log)).toEqual([]);
});

test('video control-band drags do not trigger lightbox swipe navigation', async ({ page }) => {
  const log = await setupVideoWidget(page, {
    reviews: [
      review('video-1', [videoMedia('video-1')]),
      review('video-2', [videoMedia('video-2')]),
    ],
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-review-card .renuvex-pr-media-video-thumb');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(true);
  await expect.poll(async () => (await lightboxVideoState(page)).playbackId).toBe('video-1');

  await swipeVideoLightbox(page, { startXRatio: 0.82, endXRatio: 0.18, yRatio: 0.94 });
  expect((await lightboxVideoState(page)).playbackId).toBe('video-1');

  await swipeVideoLightbox(page, { startXRatio: 0.82, endXRatio: 0.18, yRatio: 0.42 });
  await expect.poll(async () => (await lightboxVideoState(page)).playbackId).toBe('video-2');

  await page.keyboard.press('Escape');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(false);
  expect(widgetErrors(log)).toEqual([]);
});

test('video wizard completes Mux direct upload and submits only the ready video token', async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name === 'firefox-desktop' || testInfo.project.name === 'webkit-desktop',
    'The PR matrix runs the wizard on Chromium desktop, Android Chrome emulation, and iPhone WebKit emulation.',
  );
  await routeMuxAssets(page);
  await stubVideoMetadata(page, 12);
  const submittedBodies: Array<Record<string, unknown>> = [];
  const completeBodies: Array<Record<string, unknown>> = [];
  const videoToken = 'video-token-opaque-abcdefghijklmnopqrstuvwxyz1234567890';
  let muxPutCalls = 0;

  const log = await setupWidgetRoutes(page, {
    mountReviews: true,
    reviewsSettings: {
      summaryLayout: 'classic',
      reviewLayout: 'card',
      videoReviewsEnabled: true,
    },
    reviewSubmitHandler: async (route) => {
      submittedBodies.push(JSON.parse(route.request().postData() || '{}') as Record<string, unknown>);
      await route.fulfill({
        status: 201,
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ message: 'Review received', data: { id: 'submitted-video-review', status: 'pending' } }),
      });
    },
  });

  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/initiate**`, async (route) => {
    await fulfillJson(route, {
      data: {
        token: videoToken,
        uploadUrl: 'https://mux-upload.test/review-video',
        chunkSize: 8192,
        chunkAttempts: 5,
        expiresAt: '2099-01-01T00:00:00.000Z',
      },
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
    await fulfillJson(route, { data: { status: 'processing' } });
  });
  await page.route(`${WIDGET_ORIGIN}/api/public/upload/video/status**`, async (route) => {
    await fulfillJson(route, {
      data: {
        status: 'ready',
        durationMs: 12_000,
        posterUrl: 'https://image.mux.com/signed-playback-1/thumbnail.jpg',
      },
    });
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-write-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-star:nth-child(5)');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-media')).toBe(true);

  const mediaStepMetrics = await page.evaluate(() => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => host.shadowRoot)
      .filter((candidate): candidate is ShadowRoot => !!candidate)
      .find((candidate) => !!candidate.querySelector('.renuvex-pr-fwizard-overlay'));
    const wrap = root?.querySelector<HTMLElement>('.renuvex-pr-fwizard-step-wrap');
    if (!wrap) throw new Error('Missing media step');
    return { clientWidth: wrap.clientWidth, scrollWidth: wrap.scrollWidth };
  });
  expect(mediaStepMetrics.scrollWidth).toBeLessThanOrEqual(mediaStepMetrics.clientWidth + 1);

  await setFileInputInOverlay(page, '.renuvex-pr-fwizard-overlay', 'input[accept*="video"]', {
    name: 'review-video.mp4',
    mimeType: 'video/mp4',
    buffer: Buffer.from([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d]),
  });
  await expect.poll(() => muxPutCalls).toBe(1);
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-content')).toBe(true);

  await fillInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-textarea', 'Cross-browser video upload.');
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-footer-next');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-author')).toBe(true);
  await fillInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-step-author input[type="text"]', 'Mert');
  await expect.poll(() => isOverlayControlDisabled(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-submit-btn')).toBe(false);
  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-submit-btn');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-step-thanks')).toBe(true);

  expect(completeBodies).toEqual([{ token: videoToken }]);
  expect(submittedBodies).toHaveLength(1);
  expect(submittedBodies[0]).toMatchObject({
    storeId: PUBLIC_KEY,
    productId: 'product-1',
    images: [],
    videoToken,
  });
  expect(log.urls.some((url) => url.includes('api.cloudinary.com') || url.includes('api.mux.com'))).toBe(false);
  expect(widgetErrors(log)).toEqual([]);

  await clickInOverlay(page, '.renuvex-pr-fwizard-overlay', '.renuvex-pr-fwizard-close');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-fwizard-overlay')).toBe(false);
});

test('video to image navigation disposes the previous player before rendering the next review', async ({ page }) => {
  const log = await setupVideoWidget(page, {
    reviews: [
      review('video-1', [videoMedia('video-1')]),
      review('image-2', [imageMedia('image-2')]),
    ],
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-review-card .renuvex-pr-media-video-thumb');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-modal-overlay', '.renuvex-pr-modal-nav-next');
  await expect.poll(() => page.evaluate(() => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => host.shadowRoot)
      .filter((candidate): candidate is ShadowRoot => !!candidate)
      .find((candidate) => !!candidate.querySelector('.renuvex-pr-modal-overlay'));
    return {
      players: root?.querySelectorAll('mux-player.renuvex-pr-modal-main-video').length || 0,
      images: root?.querySelectorAll('.renuvex-pr-modal-main-img').length || 0,
    };
  })).toEqual({ players: 0, images: 1 });

  await page.keyboard.press('Escape');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(false);
  expect(widgetErrors(log)).toEqual([]);
});

test('video to video navigation keeps Mux Player centered during the transition', async ({ page }) => {
  const log = await setupVideoWidget(page, {
    reviews: [
      review('video-1', [videoMedia('video-1')]),
      review('video-2', [videoMedia('video-2')]),
    ],
  });

  await page.goto(`${MERCHANT_ORIGIN}/premium-shorts`);
  await expect.poll(() => hasReviewsWidget(page)).toBe(true);
  await clickInReviewsShadow(page, '.renuvex-pr-review-card .renuvex-pr-media-video-thumb');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(true);
  await clickInOverlay(page, '.renuvex-pr-modal-overlay', '.renuvex-pr-modal-nav-next');
  await expect.poll(async () => {
    const state = await lightboxVideoState(page);
    return state.playbackId === 'video-2' && state.fullscreenButton === 'none';
  }).toBe(true);

  const transition = await page.evaluate(() => {
    const root = Array.from(document.querySelectorAll('[data-renuvex-shadow-overlay]'))
      .map((host) => host.shadowRoot)
      .filter((candidate): candidate is ShadowRoot => !!candidate)
      .find((candidate) => !!candidate.querySelector('.renuvex-pr-modal-overlay'));
    const player = root?.querySelector<HTMLElement>('mux-player.renuvex-pr-modal-main-video');
    if (!player) throw new Error('Missing navigated player');
    const style = getComputedStyle(player);
    return {
      className: player.className,
      playbackId: player.getAttribute('playback-id') || '',
      animationName: style.animationName,
      transform: style.transform,
      fullscreenButton: style.getPropertyValue('--fullscreen-button').trim(),
    };
  });

  expect(transition.className).toContain('renuvex-pr-modal-video-enter');
  expect(transition.className).not.toContain('renuvex-pr-modal-img-enter');
  expect(transition.playbackId).toBe('video-2');
  expect(transition.animationName).toBe('renuvexPrVideoFadeIn');
  expect(transition.transform).toBe('none');
  expect(transition.fullscreenButton).toBe('none');

  await page.keyboard.press('Escape');
  await expect.poll(() => hasOverlay(page, '.renuvex-pr-modal-overlay')).toBe(false);
  expect(widgetErrors(log)).toEqual([]);
});

import { getIconFromSettings } from '../icons/index.js';
import {
  SIZE_MAP,
  ensureBadgeTokens,
} from '../core/badge.js';
import {
  currentOrderBy,
  currentPage,
  currentProductId,
  currentProductName,
  currentReviewsData,
} from '../core/state.js';
import {
  setPreviewReviewsPages,
  setPreviewSettingsPayload,
  dispatchPreviewSettingsUpdated,
} from '../core/namespace.js';
import { loadReviewsMainModule, loadReviewsRenderModule } from '../core/lazy-modules.js';
import { cleanupPdpRatingBadgeDom, injectRatingBadge } from '../rating-badge/inject.js';
import {
  clearBadgePlaceholders,
  disconnectListingBadgeRemovalObservers,
  injectBadgeOnLink,
} from '../listing-badges/inject.js';
import {
  setAutoPlacementEnabled,
  setReviewsMountEnabled,
  setThemeAdapterKey,
} from '../themes/current-adapter.js';
import { createPreviewReviewPages, PREVIEW_LISTING_RATINGS } from './fixtures.js';

var reviewsInitialized = false;
var pendingPayload = null;
var renderPromise = null;

function runtimePayload(widgets) {
  return {
    widgets: widgets,
    runtime: {
      themeAdapterKey: 'generic',
      themeAdapterSource: 'preview_fixture',
      autoPlacementEnabled: true,
      reviewsMountEnabled: true,
    },
  };
}

function installPreviewPayload(payload) {
  var resolved = runtimePayload(payload.widgets || {});
  setPreviewSettingsPayload(resolved);
  setPreviewReviewsPages(createPreviewReviewPages());
  setThemeAdapterKey('generic');
  setAutoPlacementEnabled(true);
  setReviewsMountEnabled(true);
  return resolved;
}

function cleanupListingPreview() {
  disconnectListingBadgeRemovalObservers();
  clearBadgePlaceholders();
  document.querySelectorAll('[data-renuvex-listing-badge]').forEach(function (node) {
    node.remove();
  });
  document.querySelectorAll('[data-renuvex-preview-product-card]').forEach(function (node) {
    node.removeAttribute('data-renuvex-badge');
    node.querySelectorAll('[data-renuvex-badge]').forEach(function (child) {
      child.removeAttribute('data-renuvex-badge');
    });
  });
}

function configureBadgeVisuals(widgets) {
  var reviewsSettings = widgets.reviews || {};
  var badgeSettings = widgets.badge || {};
  var starColor = /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(reviewsSettings.reviewStarColor || '')
    ? reviewsSettings.reviewStarColor
    : '#f59e0b';
  document.documentElement.style.setProperty('--renuvex-pr-review-star-color', starColor);

  var sizeKey = badgeSettings.size || 'medium';
  var sizes = SIZE_MAP[sizeKey] || SIZE_MAP.medium;
  var mobileSizes = null;
  if (badgeSettings.mobileOverride === true) {
    mobileSizes = SIZE_MAP[badgeSettings.mobileSize || 'small'] || SIZE_MAP.small;
  }
  ensureBadgeTokens(sizes, mobileSizes);
  return {
    badgeSettings: badgeSettings,
    iconPair: getIconFromSettings(reviewsSettings),
  };
}

async function renderReviews(payload) {
  var widgets = payload.widgets || {};
  if (!reviewsInitialized) {
    var mainModule = await loadReviewsMainModule();
    await mainModule.bootstrap('preview-product', 'Örnek Ürün');
    reviewsInitialized = true;
    return;
  }

  var renderModule = await loadReviewsRenderModule();
  await renderModule.render(
    currentProductId || 'preview-product',
    widgets.reviews || {},
    currentReviewsData,
    currentProductName || 'Örnek Ürün',
    currentOrderBy || 'newest',
    currentPage || 1,
    widgets.badge || {},
  );
  dispatchPreviewSettingsUpdated(widgets.reviews || {});
}

function renderPdpBadge(payload) {
  var widgets = payload.widgets || {};
  var visuals = configureBadgeVisuals(widgets);
  cleanupPdpRatingBadgeDom();
  cleanupListingPreview();
  injectRatingBadge(
    '4.8',
    42,
    'Örnek Ürün',
    visuals.badgeSettings,
    visuals.iconPair,
    'preview-product',
  );
}

function renderListingBadges(payload) {
  var widgets = payload.widgets || {};
  var visuals = configureBadgeVisuals(widgets);
  cleanupPdpRatingBadgeDom();
  cleanupListingPreview();
  if (visuals.badgeSettings.enabled === false) return;

  PREVIEW_LISTING_RATINGS.forEach(function (fixture) {
    var card = document.querySelector(
      '[data-renuvex-preview-product-card="' + fixture.slug + '"]',
    );
    if (!card) return;
    injectBadgeOnLink(
      card,
      { avg: fixture.avg, count: fixture.count, _productId: fixture.productId },
      fixture.name,
      '',
      visuals.iconPair,
      visuals.badgeSettings,
    );
  });
}

async function performRender(payload) {
  installPreviewPayload(payload);
  if (payload.widgetId === 'reviews' && payload.scene === 'reviews') {
    await renderReviews(payload);
    return;
  }
  if (payload.widgetId === 'badge' && payload.scene === 'pdp') {
    renderPdpBadge(payload);
    return;
  }
  if (payload.widgetId === 'badge' && payload.scene === 'listing') {
    renderListingBadges(payload);
    return;
  }
  throw new Error('unsupported_preview_scene');
}

async function drainRenderQueue() {
  try {
    while (pendingPayload) {
      var payload = pendingPayload;
      pendingPayload = null;
      await performRender(payload);
    }
  } finally {
    renderPromise = null;
  }
}

export function renderPreview(payload) {
  pendingPayload = payload;
  if (!renderPromise) renderPromise = drainRenderQueue();
  return renderPromise;
}

// loader.js - widget orchestration layer.
//
// Phase 2 keeps this module in the always-loaded ESM runtime. Heavy surfaces are
// loaded through registry descriptors and core/lazy-modules.js.

import { attachHistoryListener, attachModalBadgeListener } from './events.js';
import { startMutationObserver } from './observer.js';
import {
  initStorefrontContext,
  onProductView,
  onPageView,
  onListingView,
} from './core/storefront-context.js';
import { mountMatching } from './core/registry.js';
import { registerCoreSurfaces } from './surfaces/index.js';
import { loadListingBadgesModule, loadReviewsRenderModule, loadReviewsMainModule } from './core/lazy-modules.js';
import { hasListingFallbackCandidates } from './listing-badges/fallback-candidates.js';
import {
  dispatchPreviewSettingsUpdated,
  isPreviewSettingsUpdateMessage,
  postPreviewWidgetReady,
} from './core/namespace.js';
import { ls } from './core/state.js';
import {
  currentSettings,
  currentProductId,
  currentProductName,
  currentOrderBy,
  currentPage,
  currentReviewsData,
} from './core/state.js';

var lastPreviewSettingsFingerprint = '';
var lastPreviewSettingsAt = 0;

function renderListingBadgesFallback() {
  return loadListingBadgesModule().then(function (mod) {
    mod.renderListingBadges();
  });
}

function initWidget() {
  // 1) Register lightweight surface descriptors.
  registerCoreSurfaces();

  // 2) Start the single ikas Storefront Events context layer.
  initStorefrontContext();

  // 3) SPA navigation + quick-view modal plumbing. These are independent from
  // IkasEvents and must remain always-loaded.
  attachHistoryListener();
  attachModalBadgeListener();

  // 4) Product sliders / infinite-scroll content need a small always-on observer.
  startMutationObserver();

  // 5) Context -> registry routing.
  onProductView(function (product) {
    mountMatching({ trigger: 'product', product: product });
  });
  onPageView(function (page) {
    mountMatching({ trigger: 'page', pageType: page.pageType });
  });
  onListingView(function (listing) {
    mountMatching({ trigger: 'listing-products', listing: listing });
  });

  // 6) Fallback for older storefronts where PAGE_VIEW is missing or late.
  // ADR_0024: guard against firing on pages with no listing-shaped DOM. The
  // probe requires at least two same-origin product-like links with nearby media,
  // which is stricter than the old generic-link check but still conservative.
  // The listing entry chunk keeps its own settings/theme gates as defense in depth.
  setTimeout(function () {
    if (ls.rendered) return;
    if (!hasListingFallbackCandidates()) return;
    renderListingBadgesFallback().catch(function (err) {
      console.error('[renuvex-pr] listing badge fallback error:', err);
    });
  }, 2000);
}

export function startWidget() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
}

function onPreviewMessage(event) {
  var data = event.data;
  if (!isPreviewSettingsUpdateMessage(data)) return;
  var s = data.settings;
  if (!s || !currentSettings) return;
  var fingerprint = '';
  try { fingerprint = JSON.stringify(s); } catch (_) {}
  var now = Date.now();
  if (fingerprint && fingerprint === lastPreviewSettingsFingerprint && now - lastPreviewSettingsAt < 100) return;
  lastPreviewSettingsFingerprint = fingerprint;
  lastPreviewSettingsAt = now;
  var merged = Object.assign({}, currentSettings, s);
  loadReviewsRenderModule().then(function (mod) {
    mod.render(currentProductId, merged, currentReviewsData, currentProductName, currentOrderBy, currentPage);
    dispatchPreviewSettingsUpdated(merged);
  }).catch(function (err) {
    console.error('[renuvex-pr] preview render load error:', err);
  });
}

function initPreview() {
  loadReviewsMainModule().then(function (mod) {
    return mod.bootstrap('mock-product', 'Ornek Urun');
  }).then(function () {
    try { postPreviewWidgetReady(window.parent); } catch (e) {}
  }).catch(function (err) {
    console.error('[renuvex-pr] preview bootstrap load error:', err);
  });
}

export function startPreview() {
  window.addEventListener('message', onPreviewMessage);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreview);
  } else {
    initPreview();
  }
}

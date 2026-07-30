// loader.js - widget orchestration layer.
//
// Phase 2 keeps this module in the always-loaded ESM runtime. Heavy surfaces are
// loaded through registry descriptors and core/lazy-modules.js.

import { attachHistoryListener, attachModalBadgeListener } from './events.js';
import { startMutationObserver } from './observer.js';
import {
  initStorefrontContext,
  getProductContext,
  onProductView,
  onPageView,
  onListingView,
} from './core/storefront-context.js';
import { mountMatching, mountSurfaceByKey } from './core/registry.js';
import { registerCoreSurfaces } from './surfaces/index.js';
import { scheduleListingBadgeHydration } from './core/listing-viewport-gate.js';
import { hasListingFallbackCandidates } from './listing-badges/fallback-candidates.js';
import {
  isPreviewContext,
  isPreviewRenderMessage,
  isPreviewResetScrollMessage,
  postPreviewError,
  postPreviewRendered,
  postPreviewWidgetReady,
} from './core/namespace.js';
import { ls } from './core/state.js';

var reviewMountReplayObserver = null;
var previewRuntimePromise = null;

function collectReviewMountsFromNode(node, mounts) {
  if (!node || node.nodeType !== 1) return;
  if (node.matches && node.matches('[data-renuvex-widget="reviews"]')) {
    mounts.push(node);
  }
  if (node.querySelectorAll) {
    node.querySelectorAll('[data-renuvex-widget="reviews"]').forEach(function (mount) {
      mounts.push(mount);
    });
  }
}

function hasRenderedReviewsWidget(anchorEl, productId) {
  var slot = anchorEl && anchorEl.querySelector ? anchorEl.querySelector('[data-renuvex-slot="product-reviews"]') : null;
  var container = slot && slot.querySelector ? slot.querySelector('#renuvex-reviews') : null;
  var root = container && container.shadowRoot;
  var widget = root && root.querySelector ? root.querySelector('#renuvex-reviews-widget') : null;
  if (!widget) return false;
  return !productId || widget.getAttribute('data-renuvex-product-id') === String(productId);
}

function replayReviewsMainForMount(anchorEl, attempt) {
  attempt = attempt || 0;
  if (!anchorEl || !anchorEl.isConnected || anchorEl.__renuvexPrReviewsReplayDone) return;
  if (attempt === 0 && anchorEl.__renuvexPrReviewsReplayInProgress) return;
  var product = getProductContext();
  if (!product || !product.id) return;

  anchorEl.__renuvexPrReviewsReplayInProgress = true;
  mountSurfaceByKey('reviews-main', { trigger: 'product', product: product });
  setTimeout(function () {
    if (!anchorEl.isConnected) return;
    if (hasRenderedReviewsWidget(anchorEl, product.id)) {
      anchorEl.__renuvexPrReviewsReplayDone = true;
      anchorEl.__renuvexPrReviewsReplayInProgress = false;
      return;
    }
    if (attempt < 6) {
      replayReviewsMainForMount(anchorEl, attempt + 1);
      return;
    }
    anchorEl.__renuvexPrReviewsReplayInProgress = false;
  }, 150);
}

function startReviewMountReplayObserver() {
  if (reviewMountReplayObserver || typeof MutationObserver === 'undefined') return;
  if (!document.body) return;

  reviewMountReplayObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      var mounts = [];
      Array.from(mutation.addedNodes).forEach(function (node) {
        collectReviewMountsFromNode(node, mounts);
      });
      mounts.forEach(replayReviewsMainForMount);
    });
  });
  reviewMountReplayObserver.observe(document.body, { childList: true, subtree: true });
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
  startReviewMountReplayObserver();

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
    scheduleListingBadgeHydration().catch(function (err) {
      console.error('[renuvex-pr] listing badge fallback schedule error:', err);
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

function getPreviewContext() {
  var context = window.__renuvexPreviewContext;
  return isPreviewContext(context) ? context : null;
}

function loadPreviewRuntime() {
  if (!previewRuntimePromise) {
    previewRuntimePromise = import('./preview/index.js');
  }
  return previewRuntimePromise;
}

function matchesPreviewContext(data, context) {
  return Boolean(
    context &&
    data.widgetId === context.widgetId &&
    data.scene === context.scene,
  );
}

function onPreviewMessage(event) {
  var context = getPreviewContext();
  if (!context) return;
  if (event.source !== window.parent || event.origin !== window.location.origin) return;

  var data = event.data;
  if (isPreviewResetScrollMessage(data) && matchesPreviewContext(data, context)) {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return;
  }
  if (!isPreviewRenderMessage(data) || !matchesPreviewContext(data, context)) return;

  loadPreviewRuntime().then(function (mod) {
    return mod.renderPreview(data);
  }).then(function () {
    postPreviewRendered(window.parent, window.location.origin, context);
  }).catch(function () {
    postPreviewError(window.parent, window.location.origin, context);
  });
}

function initPreview() {
  var context = getPreviewContext();
  if (!context) return;
  postPreviewWidgetReady(window.parent, window.location.origin, context);
}

export function startPreview() {
  window.addEventListener('message', onPreviewMessage);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreview);
  } else {
    initPreview();
  }
}

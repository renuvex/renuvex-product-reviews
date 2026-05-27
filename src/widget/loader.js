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
import { loadListingBadgesModule, loadProductRenderModule, loadReviewsMainModule } from './core/lazy-modules.js';
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

function getPathnameFromHref(href) {
  try {
    var url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return '';
    return url.pathname;
  } catch (_) {
    return '';
  }
}

function isLikelyProductPath(pathname) {
  if (!pathname || pathname === '/') return false;
  var parts = pathname.split('/').filter(Boolean);
  if (parts.length !== 1) return false;
  var slug = parts[0].toLowerCase();
  if (
    slug === 'account' ||
    slug === 'cart' ||
    slug === 'checkout' ||
    slug === 'login' ||
    slug === 'register' ||
    slug === 'search' ||
    slug === 'pages'
  ) {
    return false;
  }
  return slug.length > 2;
}

function hasNearbyImage(anchor) {
  var el = anchor;
  var depth = 0;
  while (el && depth < 5) {
    if (typeof el.querySelector === 'function' && el.querySelector('img,picture')) return true;
    el = el.parentElement;
    depth++;
  }
  return false;
}

function isIgnoredListingScope(anchor) {
  var el = anchor;
  while (el && el !== document.body) {
    var tag = el.tagName ? el.tagName.toLowerCase() : '';
    if (tag === 'header' || tag === 'nav' || tag === 'footer') return true;
    var label = String(el.getAttribute && el.getAttribute('aria-label') || '').toLowerCase();
    var className = String(el.className || '').toLowerCase();
    if (
      label.indexOf('breadcrumb') !== -1 ||
      className.indexOf('breadcrumb') !== -1 ||
      className.indexOf('account') !== -1 ||
      className.indexOf('cart') !== -1 ||
      className.indexOf('basket') !== -1 ||
      className.indexOf('menu') !== -1
    ) {
      return true;
    }
    el = el.parentElement;
  }
  return false;
}

function hasListingFallbackCandidates() {
  var scope = document.querySelector('main') || document.body;
  if (!scope) return false;
  var anchors = scope.querySelectorAll('a[href]');
  var seen = {};
  var count = 0;
  for (var i = 0; i < anchors.length; i++) {
    var a = anchors[i];
    if (isIgnoredListingScope(a)) continue;
    var pathname = getPathnameFromHref(a.href);
    if (!isLikelyProductPath(pathname)) continue;
    if (!hasNearbyImage(a)) continue;
    if (seen[pathname]) continue;
    seen[pathname] = true;
    count++;
    if (count >= 2) return true;
  }
  return false;
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
  loadProductRenderModule().then(function (mod) {
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

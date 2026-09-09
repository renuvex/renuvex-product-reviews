// core/storefront-context.js — ikas Storefront Events bağlam katmanı
//
// Bu modül widget'ın TEK `window.IkasEvents` abonelik noktasıdır. Sayfa ve
// ürün bağlamını sahiplenir; IkasEvents-not-ready polling fallback'ini ve
// DOM tabanlı ürün tespiti fallback'ini içerir.
//
// Loader bu modülün event'lerine (`onProductView` / `onPageView`) abone olur.
// Widget yüzeyleri (surfaces) bu modülü doğrudan import etmez — bağlamı
// registry context'i üzerinden alır.
//
// ikas Storefront Events resmî dokümantasyonu:
//   https://builders.ikas.com/docs/storefront-events
//   Bkz. docs/wiki/07_Ikas/Ikas_Storefront_Events.md ve ADR_0013.

import { clearStorefrontProductMaps, replaceStorefrontProductMaps } from './state.js';
import {
  getStorefrontContextEpoch,
  noteStorefrontProduct,
  noteStorefrontRoute,
  onStorefrontContextInvalidated,
} from './context-epoch.js';

// ── Olay tipi sabitleri — TEK kaynak ─────────────────────────────────────────
// Resmî olay tipleri (IKAS_EVENT_TYPE): PAGE_VIEW, PRODUCT_VIEW, ADD_TO_CART,
//   REMOVE_FROM_CART, BEGIN_CHECKOUT, CHECKOUT_STEP, COMPLETE_CHECKOUT,
//   ADD_TO_WISHLIST, SEARCH, VIEW_CART, VIEW_CATEGORY, VIEW_SEARCH_RESULTS,
//   CUSTOMER_REGISTER, CUSTOMER_LOGIN, CUSTOMER_LOGOUT, CUSTOMER_VISIT,
//   CONTACT_FORM
// Resmî sayfa tipleri (IKAS_PAGE_TYPE): INDEX, CATEGORY, BRAND, PRODUCT,
//   CUSTOM, ACCOUNT, CART, CHECKOUT, SEARCH
var IKAS_EVENT = Object.freeze({
  PAGE_VIEW:    'PAGE_VIEW',
  PRODUCT_VIEW: 'PRODUCT_VIEW',
  // Runtime-verified on the dev store (2026-05-17): VIEW_LISTING carries
  // category productDetails[]. VIEW_CATEGORY also fires, but without products.
  // Search pages emit VIEW_SEARCH_RESULTS with the same productDetails[] shape.
  // See ADR_0013 and docs/wiki/10_Research/Phase_1_Widget_Runtime_Audit.md.
  LISTING_VIEW: 'VIEW_LISTING',
  SEARCH_RESULTS: 'VIEW_SEARCH_RESULTS',
});

// ── Modül durumu ─────────────────────────────────────────────────────────────
var initStarted = false;
var subscribed = false;
var epochSubscriptionAttached = false;

var latestProduct = null;   // { id, name } | null — son bilinen ürün
var latestPage = null;      // { pageType } | null — son bilinen sayfa
var latestListing = null;   // { eventType, products } | null — son bilinen listing/search

var PAGE_VIEW_DEDUPE_MS = 800;
var lastPageViewKey = null;
var lastPageViewAt = 0;

var productViewSubs = [];
var pageViewSubs = [];
var listingViewSubs = [];

function retireListingIdentityDom() {
  if (typeof document === 'undefined') return;
  document
    .querySelectorAll('[data-renuvex-slot="listing-rating"],[data-renuvex-slot="listing-rating-placeholder"]')
    .forEach(function (slot) { slot.remove(); });
  document.querySelectorAll('[data-renuvex-badge],[data-renuvex-badge-product-id]').forEach(function (link) {
    link.removeAttribute('data-renuvex-badge');
    link.removeAttribute('data-renuvex-badge-product-id');
  });
}

// ── Public API ───────────────────────────────────────────────────────────────

// Idempotent. IkasEvents'e abone olur (not-ready ise polling), ve DOM tabanlı
// ürün tespitini başlatır.
export function initStorefrontContext() {
  if (initStarted) return;
  initStarted = true;
  if (!epochSubscriptionAttached) {
    epochSubscriptionAttached = true;
    onStorefrontContextInvalidated(function () {
      latestProduct = null;
      latestPage = null;
      latestListing = null;
      clearStorefrontProductMaps();
      retireListingIdentityDom();
    });
  }
  attachIkasEvents();
  startDomProductDetection();
}

// Ürün görüntüleme bağlamına abone olur. cb({ id, name }).
// Geç-abone replay: kayıt anında bir ürün zaten biliniyorsa cb hemen tetiklenir
// (loader, initStorefrontContext'ten SONRA abone olabilir; senkron fırlatılan
// PRODUCT_VIEW veya senkron DOM tespiti kaybolmasın diye).
export function onProductView(cb) {
  if (typeof cb !== 'function') return;
  productViewSubs.push(cb);
  if (latestProduct) {
    try { cb(latestProduct); } catch (err) { console.error('[renuvex-pr] onProductView replay error:', err); }
  }
}

// Sayfa görüntüleme bağlamına abone olur. cb({ pageType }).
// Geç-abone replay: aynı gerekçeyle, bir sayfa zaten biliniyorsa cb hemen tetiklenir.
export function onPageView(cb) {
  if (typeof cb !== 'function') return;
  pageViewSubs.push(cb);
  if (latestPage) {
    try { cb(latestPage); } catch (err) { console.error('[renuvex-pr] onPageView replay error:', err); }
  }
}

// Listing/search product arrays. cb({ eventType, products }).
export function onListingView(cb) {
  if (typeof cb !== 'function') return;
  listingViewSubs.push(cb);
  if (latestListing) {
    try { cb(latestListing); } catch (err) { console.error('[renuvex-pr] onListingView replay error:', err); }
  }
}

// Son bilinen ürün — events öncelikli, yoksa DOM heuristic fallback.
export function getProductContext() {
  if (latestProduct) return latestProduct;
  return detectProductFromDOM();
}

export function getCurrentContext() {
  return {
    pageType: latestPage ? latestPage.pageType : null,
    product: getProductContext(),
    epoch: getStorefrontContextEpoch(),
  };
}

// ── IkasEvents aboneliği ─────────────────────────────────────────────────────

function attachIkasEvents() {
  if (subscribed) return;
  if (window.IkasEvents) {
    subscribed = true;
    window.IkasEvents.subscribe({ id: 'renuvex-reviews-widget', callback: handleIkasEvent });
    return;
  }
  // IkasEvents henüz yüklenmedi — 50ms aralıklarla tekrar dene (max 5sn)
  var attempts = 0;
  (function tryAttach() {
    if (subscribed) return;
    if (window.IkasEvents) {
      subscribed = true;
      window.IkasEvents.subscribe({ id: 'renuvex-reviews-widget', callback: handleIkasEvent });
    } else if (attempts < 100) {
      attempts++;
      setTimeout(tryAttach, 50);
    }
  })();
}

function handleIkasEvent(event) {
  if (!event) return;

  if (event.type === IKAS_EVENT.LISTING_VIEW || event.type === IKAS_EVENT.SEARCH_RESULTS) {
    noteStorefrontRoute();
    var products = event.data && event.data.productDetails;
    var normalizedProducts = Array.isArray(products) ? products : [];
    var slugMap = {};
    var productMap = {};
    var conflictMap = {};

    normalizedProducts.forEach(function (p) {
      var rawSlug = p && (p.slug || (p.metaData && p.metaData.slug));
      var slug = typeof rawSlug === 'string' ? rawSlug.trim() : '';
      if (!slug) return;
      if (p.name) slugMap[slug] = String(p.name);

      if (p.id === undefined || p.id === null || p.id === '') return;
      var productId = typeof p.id === 'string' ? p.id.trim() : '';
      if (!productId || productId.length > 128) {
        conflictMap[slug] = 'malformed_event_product_id';
        delete productMap[slug];
        return;
      }
      if (conflictMap[slug]) return;
      if (productMap[slug] && productMap[slug].productId !== productId) {
        conflictMap[slug] = 'duplicate_slug_product_ids';
        delete productMap[slug];
        return;
      }
      productMap[slug] = {
        productId: productId,
        name: p.name || null,
      };
    });

    var listingGeneration = replaceStorefrontProductMaps(slugMap, productMap, conflictMap);
    retireListingIdentityDom();
    emitListingView({
      eventType: event.type,
      products: normalizedProducts,
      epoch: getStorefrontContextEpoch(),
      generation: listingGeneration,
    });
    return;
  }

  if (event.type === IKAS_EVENT.PRODUCT_VIEW) {
    noteStorefrontRoute();
    var pd = event.data && event.data.productDetail;
    var productId = pd && pd.id;
    var productName = pd && pd.name;
    if (productId) {
      emitProductView({ id: productId, name: productName || null });
    }
    return;
  }

  if (event.type === IKAS_EVENT.PAGE_VIEW) {
    noteStorefrontRoute();
    var page = buildPageContext(event);
    if (isDuplicatePageView(page)) return;
    latestPage = page;
    emitPageView(latestPage);
    return;
  }
}

function buildPageContext(event) {
  return {
    pageType: (event.data && event.data.pageType) || null,
    routeKey: getCurrentRouteKey(),
    epoch: getStorefrontContextEpoch(),
  };
}

function isDuplicatePageView(page) {
  var now = Date.now();
  var key = buildPageViewKey(page);
  if (lastPageViewKey === key && lastPageViewAt && now - lastPageViewAt < PAGE_VIEW_DEDUPE_MS) {
    return true;
  }
  lastPageViewKey = key;
  lastPageViewAt = now;
  return false;
}

function buildPageViewKey(page) {
  var pageType = page && page.pageType ? String(page.pageType).toUpperCase() : '';
  var routeKey = page && page.routeKey ? page.routeKey : '';
  return pageType + '|' + routeKey;
}

function getCurrentRouteKey() {
  try {
    return window.location.pathname + window.location.search;
  } catch (_) {
    return '';
  }
}

// ── Emit ─────────────────────────────────────────────────────────────────────

function emitProductView(product) {
  var productEpoch = noteStorefrontProduct(product && product.id);
  latestProduct = Object.assign({}, product, { epoch: productEpoch });
  productViewSubs.forEach(function (cb) {
    try { cb(latestProduct); } catch (err) { console.error('[renuvex-pr] onProductView callback error:', err); }
  });
}

function emitPageView(page) {
  pageViewSubs.forEach(function (cb) {
    try { cb(page); } catch (err) { console.error('[renuvex-pr] onPageView callback error:', err); }
  });
}

function emitListingView(listing) {
  latestListing = listing;
  listingViewSubs.forEach(function (cb) {
    try { cb(listing); } catch (err) { console.error('[renuvex-pr] onListingView callback error:', err); }
  });
}

// ── DOM tabanlı ürün tespiti (fallback) ──────────────────────────────────────
// IkasEvents PRODUCT_VIEW geç gelebilir veya gelmeyebilir. Sayfa yüklenince
// ürünü DOM/__NEXT_DATA__ üzerinden bulmayı dener; bulunca productView emit eder.
// PRODUCT_VIEW event'inden bağımsız çalışır (mevcut davranış aynen korunur:
// her iki yol da ürün bulununca tetiklenir; bootstrap kendi in-flight guard'ıyla
// çift çağrıyı yutar).

function startDomProductDetection() {
  var product = detectProductFromDOM();
  if (product) {
    emitProductView(product);
    return;
  }
  // __NEXT_DATA__ henüz hazır olmayabilir — kısa polling ile tekrar dene (max 2sn)
  var attempts = 0;
  (function tryDetect() {
    var p = detectProductFromDOM();
    if (p) {
      emitProductView(p);
    } else if (attempts < 20) {
      attempts++;
      setTimeout(tryDetect, 100);
    }
  })();
}

function detectProductFromDOM() {
  var fromNextDataScript = detectProductFromNextDataScript();
  if (fromNextDataScript) return fromNextDataScript;

  try {
    var fromGlobalNextData = detectProductFromNextData(window.__NEXT_DATA__);
    if (fromGlobalNextData) return fromGlobalNextData;
  } catch (_) {}
  if (window.IkasStorefront && window.IkasStorefront.product && window.IkasStorefront.product.id) {
    return { id: window.IkasStorefront.product.id, name: window.IkasStorefront.product.name || null };
  }
  var fromJsonLd = detectProductFromJsonLd();
  if (fromJsonLd) return fromJsonLd;
  var match = window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);
  if (match) {
    return { id: match[1], name: null };
  }
  var qp = new URLSearchParams(window.location.search).get('productId');
  if (qp) {
    return { id: qp, name: null };
  }
  return null;
}

function detectProductFromNextDataScript() {
  try {
    var el = document.getElementById('__NEXT_DATA__');
    if (!el || !el.textContent) return null;
    return detectProductFromNextData(JSON.parse(el.textContent));
  } catch (_) {
    return null;
  }
}

function detectProductFromNextData(nextData) {
  var pageProps = nextData && nextData.props && nextData.props.pageProps;
  if (!pageProps || pageProps.pageType !== 'PRODUCT') return null;
  var product = pageProps.pageSpecificData;
  if (!product || !product.id) return null;
  return { id: String(product.id), name: product.name || null };
}

function detectProductFromJsonLd() {
  try {
    var scripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < scripts.length; i++) {
      var found = findProductInJsonLd(JSON.parse(scripts[i].textContent || 'null'));
      if (found) return found;
    }
  } catch (_) {}
  return null;
}

function findProductInJsonLd(value) {
  if (!value) return null;
  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      var item = findProductInJsonLd(value[i]);
      if (item) return item;
    }
    return null;
  }
  if (value['@graph']) return findProductInJsonLd(value['@graph']);
  var type = value['@type'];
  var isProduct = type === 'Product' || (Array.isArray(type) && type.indexOf('Product') !== -1);
  if (!isProduct) return null;
  var id = value.productID || value.productId || value.sku || value['@id'];
  if (typeof id === 'string') {
    var uuid = id.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i);
    if (uuid) return { id: uuid[0], name: value.name || null };
  }
  return null;
}

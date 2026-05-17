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

import { PUBLIC_API_KEY } from './config.js';
import { cacheSet } from './cache.js';
import { ls, ikrSlugMap } from './state.js';

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

var latestProduct = null;   // { id, name } | null — son bilinen ürün
var latestPage = null;      // { pageType } | null — son bilinen sayfa

var productViewSubs = [];
var pageViewSubs = [];
var listingViewSubs = [];

// ── Public API ───────────────────────────────────────────────────────────────

// Idempotent. IkasEvents'e abone olur (not-ready ise polling), ve DOM tabanlı
// ürün tespitini başlatır.
export function initStorefrontContext() {
  if (initStarted) return;
  initStarted = true;
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
    try { cb(latestProduct); } catch (err) { console.error('[ikr] onProductView replay error:', err); }
  }
}

// Sayfa görüntüleme bağlamına abone olur. cb({ pageType }).
// Geç-abone replay: aynı gerekçeyle, bir sayfa zaten biliniyorsa cb hemen tetiklenir.
export function onPageView(cb) {
  if (typeof cb !== 'function') return;
  pageViewSubs.push(cb);
  if (latestPage) {
    try { cb(latestPage); } catch (err) { console.error('[ikr] onPageView replay error:', err); }
  }
}

// Listing/search product arrays. cb({ eventType, products }).
export function onListingView(cb) {
  if (typeof cb !== 'function') return;
  listingViewSubs.push(cb);
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
  };
}

// ── IkasEvents aboneliği ─────────────────────────────────────────────────────

function attachIkasEvents() {
  if (subscribed) return;
  if (window.IkasEvents) {
    subscribed = true;
    window.IkasEvents.subscribe({ id: 'ikas-reviews-widget', callback: handleIkasEvent });
    return;
  }
  // IkasEvents henüz yüklenmedi — 50ms aralıklarla tekrar dene (max 5sn)
  var attempts = 0;
  (function tryAttach() {
    if (subscribed) return;
    if (window.IkasEvents) {
      subscribed = true;
      window.IkasEvents.subscribe({ id: 'ikas-reviews-widget', callback: handleIkasEvent });
    } else if (attempts < 100) {
      attempts++;
      setTimeout(tryAttach, 50);
    }
  })();
}

function handleIkasEvent(event) {
  if (!event) return;

  if (event.type === IKAS_EVENT.LISTING_VIEW || event.type === IKAS_EVENT.SEARCH_RESULTS) {
    var products = event.data && event.data.productDetails;
    if (Array.isArray(products)) {
      products.forEach(function (p) {
        if (p && p.metaData && p.metaData.slug && p.name) {
          ikrSlugMap[p.metaData.slug] = p.name;
        }
      });
      emitListingView({ eventType: event.type, products: products });
    }
    return;
  }

  if (event.type === IKAS_EVENT.PRODUCT_VIEW) {
    var pd = event.data && event.data.productDetail;
    var productId = pd && pd.id;
    var productName = pd && pd.name;
    if (productId) {
      cacheSet('ikr_reviews_' + PUBLIC_API_KEY + '_' + productId, '');
      emitProductView({ id: productId, name: productName || null });
    }
    return;
  }

  if (event.type === IKAS_EVENT.PAGE_VIEW) {
    // 800ms içinde gelen ikinci PAGE_VIEW'ı yoksay — ikas ilk girişte çift tetikliyor
    var now = Date.now();
    if (ls.lastPageView && now - ls.lastPageView < 800) return;
    ls.lastPageView = now;
    latestPage = { pageType: (event.data && event.data.pageType) || null };
    emitPageView(latestPage);
    return;
  }
}

// ── Emit ─────────────────────────────────────────────────────────────────────

function emitProductView(product) {
  latestProduct = product;
  productViewSubs.forEach(function (cb) {
    try { cb(product); } catch (err) { console.error('[ikr] onProductView callback error:', err); }
  });
}

function emitPageView(page) {
  pageViewSubs.forEach(function (cb) {
    try { cb(page); } catch (err) { console.error('[ikr] onPageView callback error:', err); }
  });
}

function emitListingView(listing) {
  listingViewSubs.forEach(function (cb) {
    try { cb(listing); } catch (err) { console.error('[ikr] onListingView callback error:', err); }
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
  try {
    var pageProps = window.__NEXT_DATA__ && window.__NEXT_DATA__.props && window.__NEXT_DATA__.props.pageProps;
    if (pageProps && pageProps.pageType === 'PRODUCT' && pageProps.pageSpecificData && pageProps.pageSpecificData.id) {
      return { id: pageProps.pageSpecificData.id, name: pageProps.pageSpecificData.name || null };
    }
  } catch (_) {}
  if (window.IkasStorefront && window.IkasStorefront.product && window.IkasStorefront.product.id) {
    return { id: window.IkasStorefront.product.id, name: window.IkasStorefront.product.name || null };
  }
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

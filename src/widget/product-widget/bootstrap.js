// product-widget/bootstrap.js — Settings + Reviews fetch, bootstrap orchestration

import { PUBLIC_API_KEY, API_BASE } from '../core/config.js';
import { cacheGet, cacheSet } from '../core/cache.js';
import { fetchWithTimeout } from '../core/fetch.js';
import { render } from './render.js';
import {
  currentOrderBy, currentPage, currentRatingFilter,
  setCurrentOrderBy, setCurrentPage, setCurrentRatingFilter,
} from '../core/state.js';

// ── Settings ─────────────────────────────────────────────────────────────────

var SETTINGS_CACHE_KEY = 'ikr_settings_' + PUBLIC_API_KEY;
var SETTINGS_CACHE_TTL = 5 * 60 * 1000;  // 5 dakika
var SETTINGS_404_TTL  = 30 * 1000;       // 404 için kısa TTL

export async function fetchSettings() {
  // Preview modunda sessionStorage'dan ayarları oku — flash olmaz
  if (window.__ikasPreviewMode) {
    try {
      var previewBase = window.__ikasPreviewBaseUrl || API_BASE;
      var savedSettings = window.__ikasPreviewSettings || sessionStorage.getItem('ikr_preview_settings') || '';
      var settingsOverride = {};
      if (savedSettings) {
        try { settingsOverride = JSON.parse(savedSettings); } catch (_) {}
      }
      var previewRes = await fetchWithTimeout(previewBase + '/api/preview/settings');
      if (previewRes.ok) {
        var previewData = await previewRes.json();
        if (previewData.widgets && previewData.widgets.reviews && Object.keys(settingsOverride).length) {
          previewData.widgets.reviews = Object.assign({}, previewData.widgets.reviews, settingsOverride);
        }
        return previewData;
      }
    } catch (_) {}
    return null;
  }

  var staleEntry = null;
  var cached = cacheGet(SETTINGS_CACHE_KEY);
  if (cached) {
    try {
      var entry = JSON.parse(cached);
      if (entry && entry.t !== undefined) {
        if (entry.notFound) {
          if (Date.now() - entry.t < SETTINGS_404_TTL) return null;
          cacheSet(SETTINGS_CACHE_KEY, '');
        } else if (entry.v) {
          if (Date.now() - entry.t < SETTINGS_CACHE_TTL) return entry.v;
          staleEntry = entry.v;
          cacheSet(SETTINGS_CACHE_KEY, '');
        } else {
          cacheSet(SETTINGS_CACHE_KEY, '');
        }
      } else {
        cacheSet(SETTINGS_CACHE_KEY, '');
      }
    } catch (_) { cacheSet(SETTINGS_CACHE_KEY, ''); }
  }
  try {
    var res = await fetchWithTimeout(API_BASE + '/api/public/settings?publicApiKey=' + encodeURIComponent(PUBLIC_API_KEY));
    if (!res.ok) {
      if (res.status === 404) {
        cacheSet(SETTINGS_CACHE_KEY, JSON.stringify({ t: Date.now(), notFound: true }));
      }
      return staleEntry || null;
    }
    var settings = await res.json();
    cacheSet(SETTINGS_CACHE_KEY, JSON.stringify({ t: Date.now(), v: settings }));
    return settings;
  } catch (err) {
    console.error('[ikr] fetchSettings error:', err);
    return staleEntry || null;
  }
}

// ── Reviews ───────────────────────────────────────────────────────────────────

var REVIEWS_CACHE_TTL = 60 * 1000; // 1 dakika

export async function fetchReviews(productId, orderBy, page, ratingFilter, hasImages) {
  // Preview modunda mock endpoint kullan
  if (window.__ikasPreviewMode) {
    try {
      var previewBase = window.__ikasPreviewBaseUrl || API_BASE;
      var previewRes = await fetchWithTimeout(previewBase + '/api/preview/reviews');
      if (previewRes.ok) return await previewRes.json();
    } catch (_) {}
    return null;
  }

  orderBy = orderBy || 'newest';
  page = page || 1;
  var key = 'ikr_reviews_' + PUBLIC_API_KEY + '_' + productId + '_' + orderBy + '_' + page + '_' + (ratingFilter || '') + '_' + (hasImages ? '1' : '0');
  var staleReviews = null;
  var cached = cacheGet(key);
  if (cached) {
    try {
      var entry = JSON.parse(cached);
      if (entry && entry.t !== undefined && entry.v) {
        if (Date.now() - entry.t < REVIEWS_CACHE_TTL) return entry.v;
        staleReviews = entry.v;
        cacheSet(key, '');
      } else {
        cacheSet(key, '');
      }
    } catch (_) { cacheSet(key, ''); }
  }
  try {
    var url = API_BASE + '/api/public/reviews?storeId=' + encodeURIComponent(PUBLIC_API_KEY) +
      '&productId=' + encodeURIComponent(productId) +
      '&orderBy=' + encodeURIComponent(orderBy) +
      '&page=' + encodeURIComponent(page) +
      (ratingFilter ? '&rating=' + encodeURIComponent(ratingFilter) : '') +
      (hasImages ? '&hasImages=true' : '');
    var res = await fetchWithTimeout(url);
    if (!res.ok) return staleReviews || null;
    var data = await res.json();
    cacheSet(key, JSON.stringify({ t: Date.now(), v: data }));
    return data;
  } catch (err) {
    console.error('[ikr] fetchReviews error:', err);
    return staleReviews || null;
  }
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────

var bootstrapCache = {};

export async function bootstrap(productId, productName) {
  if (bootstrapCache[productId]) return;
  bootstrapCache[productId] = true;
  // Fallback: reviews widget ayarları için varsayılan değerler
  var FALLBACK = { primaryColor: '#111111', title: 'Müşteri Yorumları', showHelpful: true, enabled: true };
  try {
    var response = await fetchSettings();
    if (!response) return;

    // API { widgets: { reviews: {...}, badge: {...} } } döndürüyor
    var reviewsSettings = (response.widgets && response.widgets.reviews) || FALLBACK;

    // Widget devre dışıysa render etme
    if (reviewsSettings.enabled === false) return;

    setCurrentOrderBy('newest');
    setCurrentPage(1);
    setCurrentRatingFilter(null);
    var reviewsData = await fetchReviews(productId, 'newest', 1, null);
    await render(productId, reviewsSettings, reviewsData, productName, 'newest', 1);
  } catch (err) {
    console.error('[ikr] bootstrap error:', err);
    await render(productId, FALLBACK, null, productName);
  } finally {
    delete bootstrapCache[productId];
  }
}

export function getProductFromPage() {
  try {
    var pageProps = window.__NEXT_DATA__ && window.__NEXT_DATA__.props && window.__NEXT_DATA__.props.pageProps;
    if (pageProps && pageProps.pageType === 'PRODUCT' && pageProps.pageSpecificData && pageProps.pageSpecificData.id) {
      console.debug('[ikr] product detected via __NEXT_DATA__:', pageProps.pageSpecificData.id);
      return { id: pageProps.pageSpecificData.id, name: pageProps.pageSpecificData.name || null };
    }
  } catch (_) {}
  if (window.IkasStorefront && window.IkasStorefront.product && window.IkasStorefront.product.id) {
    console.debug('[ikr] product detected via IkasStorefront:', window.IkasStorefront.product.id);
    return { id: window.IkasStorefront.product.id, name: window.IkasStorefront.product.name || null };
  }
  var match = window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);
  if (match) {
    console.debug('[ikr] product detected via URL regex:', match[1]);
    return { id: match[1], name: null };
  }
  var qp = new URLSearchParams(window.location.search).get('productId');
  if (qp) {
    console.debug('[ikr] product detected via query param:', qp);
    return { id: qp, name: null };
  }
  console.warn('[ikr] product not detected — widget will not render');
  return null;
}

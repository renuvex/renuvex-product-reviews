// product-widget/bootstrap.js — Settings + Reviews fetch, bootstrap orchestration

import { PUBLIC_API_KEY, API_BASE } from '../core/config.js';
import { cacheGet, cacheSet } from '../core/cache.js';
import { fetchWithTimeout } from '../core/fetch.js';
import { setTrustedReviewImageCloudName } from '../core/helpers.js';
import { render } from './render.js';
import {
  currentOrderBy, currentPage, currentRatingFilter,
  setCurrentOrderBy, setCurrentPage, setCurrentRatingFilter,
  setPhotoStripReviews,
} from '../core/state.js';

// Fotoğraf şeridi cap'i — ADR_0007 (sabit 15, admin ayarı yok, Yotpo/Judge.me bandı).
var PHOTO_STRIP_LIMIT = 15;

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
        setTrustedReviewImageCloudName(previewData.imagePolicy && previewData.imagePolicy.cloudName);
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
          if (Date.now() - entry.t < SETTINGS_CACHE_TTL) {
            setTrustedReviewImageCloudName(entry.v.imagePolicy && entry.v.imagePolicy.cloudName);
            return entry.v;
          }
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
      if (staleEntry) setTrustedReviewImageCloudName(staleEntry.imagePolicy && staleEntry.imagePolicy.cloudName);
      return staleEntry || null;
    }
    var settings = await res.json();
    setTrustedReviewImageCloudName(settings.imagePolicy && settings.imagePolicy.cloudName);
    cacheSet(SETTINGS_CACHE_KEY, JSON.stringify({ t: Date.now(), v: settings }));
    return settings;
  } catch (err) {
    console.error('[ikr] fetchSettings error:', err);
    if (staleEntry) setTrustedReviewImageCloudName(staleEntry.imagePolicy && staleEntry.imagePolicy.cloudName);
    return staleEntry || null;
  }
}

// ── Reviews ───────────────────────────────────────────────────────────────────

var REVIEWS_CACHE_TTL = 60 * 1000; // 1 dakika
var REVIEWS_FETCH_ERROR = '__ikrReviewsFetchError';

export function createReviewsFetchError(message) {
  return {
    type: REVIEWS_FETCH_ERROR,
    message: message || 'Yorumlar şu anda yüklenemiyor.',
  };
}

export function isReviewsFetchError(value) {
  return !!(value && value.type === REVIEWS_FETCH_ERROR);
}

export async function fetchReviews(productId, orderBy, page, ratingFilter, hasImages, limit) {
  // Preview modunda mock endpoint kullan — page parametresi load more testi için
  if (window.__ikasPreviewMode) {
    try {
      var previewBase = window.__ikasPreviewBaseUrl || API_BASE;
      var previewUrl = previewBase + '/api/preview/reviews?page=' + encodeURIComponent(page || 1);
      var previewRes = await fetchWithTimeout(previewUrl);
      if (previewRes.ok) return await previewRes.json();
    } catch (_) {}
    return createReviewsFetchError();
  }

  orderBy = orderBy || 'newest';
  page = page || 1;
  // limit query param — strip 15 yorum çekerken ana listenin 10'luk cache anahtarıyla
  // çakışmasını önlemek için cache key'e dahil ediliyor.
  var limitKey = limit ? '_l' + limit : '';
  var key = 'ikr_reviews_' + PUBLIC_API_KEY + '_' + productId + '_' + orderBy + '_' + page + '_' + (ratingFilter || '') + '_' + (hasImages ? '1' : '0') + limitKey;
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
      (hasImages ? '&hasImages=true' : '') +
      (limit ? '&limit=' + encodeURIComponent(limit) : '');
    var res = await fetchWithTimeout(url);
    if (!res.ok) return staleReviews || createReviewsFetchError();
    var data = await res.json();
    cacheSet(key, JSON.stringify({ t: Date.now(), v: data }));
    return data;
  } catch (err) {
    console.error('[ikr] fetchReviews error:', err);
    return staleReviews || createReviewsFetchError();
  }
}

// Photo strip için ayrı fetch — newest-first cap 15 fotoğraflı yorum.
// Ana liste fetch'inden bağımsız: sort/filter/load-more değişikliklerinde strip
// re-fetch yapmaz. Yeni onaylı yorum geldiğinde REVIEWS_CACHE_TTL (1 dk) sonra
// otomatik rotation çalışır (en eski strip görseli düşer, yeni baş tarafa girer).
// Backend `hasImages=true` cloudName guard yapıyor; trusted URL doğrulaması
// helpers.js:getTrustedReviewImages içinde tekrarlanıyor.
export async function fetchPhotoStripReviews(productId) {
  var data = await fetchReviews(productId, 'newest', 1, null, true, PHOTO_STRIP_LIMIT);
  if (!data || !data.data || !Array.isArray(data.data.reviews)) return [];
  return data.data.reviews;
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────

var bootstrapCache = {};

export async function bootstrap(productId, productName) {
  // Yeni ürüne geçilince eski badge'i hemen temizle — bootstrapCache kontrolünden önce
  var oldBadge = document.getElementById('ikr-rating-badge');
  if (oldBadge) oldBadge.remove();
  var oldJsonLd = document.getElementById('ikr-jsonld');
  if (oldJsonLd) oldJsonLd.remove();
  if (bootstrapCache[productId]) return;
  bootstrapCache[productId] = true;
  // Fallback: reviews widget ayarları için varsayılan değerler
  var FALLBACK = { title: 'Müşteri Yorumları', enabled: true };
  var BADGE_FALLBACK = { enabled: true, icon: 'star', size: 'medium', color: '#f59e0b' };
  try {
    var response = await fetchSettings();
    if (!response) return;

    // API { widgets: { reviews: {...}, badge: {...} } } döndürüyor
    var reviewsSettings = (response.widgets && response.widgets.reviews) || FALLBACK;
    var badgeSettings = (response.widgets && response.widgets.badge) || BADGE_FALLBACK;

    // Widget devre dışıysa render etme
    if (reviewsSettings.enabled === false) return;

    setCurrentOrderBy('newest');
    setCurrentPage(1);
    setCurrentRatingFilter(null);
    // Ana liste ve photo-strip dataset'lerini paralel çek — strip filter/sort'tan bağımsız
    var fetchResults = await Promise.all([
      fetchReviews(productId, 'newest', 1, null),
      fetchPhotoStripReviews(productId),
    ]);
    var reviewsData = fetchResults[0];
    setPhotoStripReviews(fetchResults[1]);
    await render(productId, reviewsSettings, reviewsData, productName, 'newest', 1, badgeSettings);
  } catch (err) {
    console.error('[ikr] bootstrap error:', err);
    await render(productId, FALLBACK, createReviewsFetchError(), productName, undefined, undefined, BADGE_FALLBACK);
  } finally {
    delete bootstrapCache[productId];
  }
}

export function getProductFromPage() {
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

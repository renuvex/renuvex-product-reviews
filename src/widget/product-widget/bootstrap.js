// product-widget/bootstrap.js - reviews fetch and PDP render orchestration.

import { PUBLIC_API_KEY, API_BASE } from '../core/config.js';
import { cacheGet, cacheSet } from '../core/cache.js';
import { fetchWithTimeout } from '../core/fetch.js';
import { fetchSettings } from '../core/settings.js';
import { render } from './render.js';
import {
  setCurrentOrderBy, setCurrentPage, setCurrentRatingFilter,
  setPhotoStripReviews,
} from '../core/state.js';

var PHOTO_STRIP_LIMIT = 15;
var REVIEWS_CACHE_TTL = 60 * 1000;
var REVIEWS_FETCH_ERROR = '__ikrReviewsFetchError';
var bootstrapCache = {};

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

export async function fetchPhotoStripReviews(productId) {
  var data = await fetchReviews(productId, 'newest', 1, null, true, PHOTO_STRIP_LIMIT);
  if (!data || !data.data || !Array.isArray(data.data.reviews)) return [];
  return data.data.reviews;
}

export async function bootstrap(productId, productName) {
  var oldBadge = document.getElementById('ikr-rating-badge');
  if (oldBadge) oldBadge.remove();
  var oldJsonLd = document.getElementById('ikr-jsonld');
  if (oldJsonLd) oldJsonLd.remove();
  if (bootstrapCache[productId]) return;
  bootstrapCache[productId] = true;

  var FALLBACK = { title: 'Müşteri Yorumları', enabled: true };
  // Badge widget'ı yalnızca görünürlük + boyut taşır; yıldız ikonu/rengi
  // tek kaynaktan ("Ürün Yorumları" → reviewIcon/reviewStarColor) gelir.
  var BADGE_FALLBACK = { enabled: true, size: 'medium' };

  try {
    var response = await fetchSettings();
    if (!response) return;

    var reviewsSettings = (response.widgets && response.widgets.reviews) || FALLBACK;
    var badgeSettings = (response.widgets && response.widgets.badge) || BADGE_FALLBACK;
    if (reviewsSettings.enabled === false) return;

    setCurrentOrderBy('newest');
    setCurrentPage(1);
    setCurrentRatingFilter(null);

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

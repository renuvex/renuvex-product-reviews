// reviews-section/reviews-api.js - public reviews data helpers.
//
// Kept separate from bootstrap/render so orchestration and UI code can share
// review fetching without creating a bootstrap <-> render ownership cycle.

import { PUBLIC_API_KEY, API_BASE } from '../core/config.js';
import { cacheGet, cacheSet } from '../core/cache.js';
import { fetchWithTimeout } from '../core/fetch.js';

var MEDIA_GALLERY_LIMIT = 15;
var REVIEWS_CACHE_TTL = 60 * 1000;
var REVIEWS_FETCH_ERROR = '__renuvexProductReviewsFetchError';

export function createReviewsFetchError(message) {
  return {
    type: REVIEWS_FETCH_ERROR,
    message: message || 'Yorumlar şu anda yüklenemiyor.',
  };
}

export function isReviewsFetchError(value) {
  return !!(value && value.type === REVIEWS_FETCH_ERROR);
}

function normalizeMediaFilter(mediaFilter) {
  return mediaFilter === 'images' || mediaFilter === 'media' ? mediaFilter : 'none';
}

export async function fetchReviews(productId, orderBy, page, ratingFilter, mediaFilter, limit, cursor) {
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
  mediaFilter = normalizeMediaFilter(mediaFilter);
  var hasImages = mediaFilter === 'images';
  var hasMedia = mediaFilter === 'media';
  var limitKey = limit ? '_l' + limit : '';
  var cursorKey = cursor ? '_c' + cursor : '';
  var key = 'renuvex_pr_reviews_' + PUBLIC_API_KEY + '_' + productId + '_' + orderBy + '_' + page + '_' + (ratingFilter || '') + '_' + (hasImages ? '1' : '0') + '_' + (hasMedia ? '1' : '0') + limitKey + cursorKey;
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
      (hasMedia ? '&hasMedia=true' : '') +
      (limit ? '&limit=' + encodeURIComponent(limit) : '') +
      (cursor ? '&cursor=' + encodeURIComponent(cursor) : '');
    var res = await fetchWithTimeout(url);
    if (!res.ok) return staleReviews || createReviewsFetchError();
    var data = await res.json();
    cacheSet(key, JSON.stringify({ t: Date.now(), v: data }));
    return data;
  } catch (err) {
    console.error('[renuvex-pr] fetchReviews error:', err);
    return staleReviews || createReviewsFetchError();
  }
}

export async function fetchImageMediaGalleryReviews(productId) {
  var data = await fetchReviews(productId, 'newest', 1, null, 'images', MEDIA_GALLERY_LIMIT);
  if (!data || !data.data || !Array.isArray(data.data.reviews)) return [];
  return data.data.reviews;
}

export async function fetchMixedMediaGalleryReviews(productId) {
  var data = await fetchReviews(productId, 'newest', 1, null, 'media', MEDIA_GALLERY_LIMIT);
  if (!data || !data.data || !Array.isArray(data.data.reviews)) return [];
  return data.data.reviews;
}

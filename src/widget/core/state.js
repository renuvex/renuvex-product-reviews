// state.js — Tüm global state tek yerde

// Ürün sayfası widget state'i
export var currentOrderBy = 'newest';
export var currentPage = 1;
export var currentRatingFilter = null;
export var currentMediaFilter = 'none';
export var currentProductId = null;
export var currentSettings = null;
export var currentBadgeSettings = null;
export var currentProductName = null;
export var currentReviewsData = null;
export var currentNextCursor = null;
export var loadedLightboxReviews = [];

// Media gallery dataset. Media-enabled stores use `hasMedia=true`; image-only
// stores use `hasImages=true`. It is filled once in bootstrap and is not
// re-fetched on sort/filter/load-more changes.
// Strateji A (newest-first rotation): yeni onaylı medya yorumları
// REVIEWS_CACHE_TTL (1 dk) süresince stale kalır, sonra otomatik yenilenir.
export var mediaStripReviews = [];

export function setCurrentOrderBy(v) { currentOrderBy = v; }
export function setCurrentPage(v) { currentPage = v; }
export function setCurrentRatingFilter(v) { currentRatingFilter = v; }
export function setCurrentMediaFilter(v) { currentMediaFilter = v === 'images' || v === 'media' ? v : 'none'; }
export function setCurrentProductId(v) { currentProductId = v; }
export function setCurrentSettings(v) { currentSettings = v; }
export function setCurrentBadgeSettings(v) { currentBadgeSettings = v; }
export function setCurrentProductName(v) { currentProductName = v; }
export function setCurrentReviewsData(v) { currentReviewsData = v; }
export function setCurrentNextCursor(v) { currentNextCursor = v || null; }
export function setMediaStripReviews(v) { mediaStripReviews = Array.isArray(v) ? v : []; }

export function resetReviewStateForProduct(productId) {
  currentOrderBy = 'newest';
  currentPage = 1;
  currentRatingFilter = null;
  currentMediaFilter = 'none';
  currentProductId = productId || null;
  currentReviewsData = null;
  currentNextCursor = null;
  mediaStripReviews = [];
  replaceLoadedLightboxReviews([]);
}

function getReviewIdentity(review) {
  if (!review || typeof review !== 'object') return '';
  if (review.id !== undefined && review.id !== null) return 'id:' + String(review.id);
  if (review._id !== undefined && review._id !== null) return '_id:' + String(review._id);
  return '';
}

function dedupeReviews(reviews) {
  var source = Array.isArray(reviews) ? reviews : [];
  var seen = {};
  var result = [];

  source.forEach(function (review) {
    if (!review) return;
    var key = getReviewIdentity(review);
    if (key && seen[key]) return;
    if (key) seen[key] = true;
    result.push(review);
  });

  return result;
}

function replaceLoadedLightboxReviews(reviews) {
  loadedLightboxReviews.length = 0;
  reviews.forEach(function (review) {
    loadedLightboxReviews.push(review);
  });
}

export function setLoadedLightboxReviews(v) {
  replaceLoadedLightboxReviews(dedupeReviews(v));
}

export function getNewLoadedLightboxReviews(v) {
  var source = Array.isArray(v) ? v : [];
  var seen = {};
  var result = [];

  loadedLightboxReviews.forEach(function (review) {
    var key = getReviewIdentity(review);
    if (key) seen[key] = true;
  });

  source.forEach(function (review) {
    if (!review) return;
    var key = getReviewIdentity(review);
    if (key && seen[key]) return;
    if (key) seen[key] = true;
    result.push(review);
  });

  return result;
}

export function appendLoadedLightboxReviews(v) {
  replaceLoadedLightboxReviews(dedupeReviews(loadedLightboxReviews.concat(Array.isArray(v) ? v : [])));
}

// render() race condition koruması
export var renderInProgress = false;
export var pendingRender = null;
export function setRenderInProgress(v) { renderInProgress = v; }
export function setPendingRender(v) { pendingRender = v; }

// Listing badge state
export var ls = {
  rendered:     false,
  inProgress:   false,
  queued:       false,
  navCleanup:   false,
};

// VIEW_LISTING'den gelen slug→name map
export var renuvexPrSlugMap = {};

// VIEW_LISTING/VIEW_SEARCH_RESULTS'den gelen slug -> canonical product context.
// productId is the stable ikas product UUID; slug/name are display snapshots.
export var renuvexPrProductMap = {};

// Quick-view modal için son tıklanan ürün slug'ı
export var lastClickedSlug = null;
export function setLastClickedSlug(v) { lastClickedSlug = v; }

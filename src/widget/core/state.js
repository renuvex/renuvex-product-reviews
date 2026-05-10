// state.js — Tüm global state tek yerde

// Ürün sayfası widget state'i
export var currentOrderBy = 'newest';
export var currentPage = 1;
export var currentRatingFilter = null;
export var currentHasImages = false;
export var currentProductId = null;
export var currentSettings = null;
export var currentBadgeSettings = null;
export var currentProductName = null;
export var currentReviewsData = null;

// Fotoğraf şeridi için ayrı dataset — bootstrap'ta `hasImages=true&limit=15&orderBy=newest`
// çağrısıyla bir kere doldurulur, sort/filter/load-more değişikliklerinde yeniden
// fetch edilmez. Strateji A (newest-first rotation): yeni onaylı fotoğraflı yorumlar
// REVIEWS_CACHE_TTL (1 dk) süresince stale kalır, sonra otomatik yenilenir.
export var photoStripReviews = [];

export function setCurrentOrderBy(v) { currentOrderBy = v; }
export function setCurrentPage(v) { currentPage = v; }
export function setCurrentRatingFilter(v) { currentRatingFilter = v; }
export function setCurrentHasImages(v) { currentHasImages = v; }
export function setCurrentProductId(v) { currentProductId = v; }
export function setCurrentSettings(v) { currentSettings = v; }
export function setCurrentBadgeSettings(v) { currentBadgeSettings = v; }
export function setCurrentProductName(v) { currentProductName = v; }
export function setCurrentReviewsData(v) { currentReviewsData = v; }
export function setPhotoStripReviews(v) { photoStripReviews = Array.isArray(v) ? v : []; }

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
  lastPageView: 0,
};

// VIEW_LISTING'den gelen slug→name map
export var ikrSlugMap = {};

// Quick-view modal için son tıklanan ürün slug'ı
export var lastClickedSlug = null;
export function setLastClickedSlug(v) { lastClickedSlug = v; }

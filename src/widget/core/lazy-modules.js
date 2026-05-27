// core/lazy-modules.js - Phase 2 lazy module boundaries.
//
// Keep this file light. Static imports here would pull code back into the
// always-loaded runtime. These dynamic imports are the esbuild splitting points.

var reviewsMainPromise = null;
var listingBadgesPromise = null;
var productRenderPromise = null;
var ratingBadgePromise = null;

export function loadReviewsMainModule() {
  if (!reviewsMainPromise) {
    reviewsMainPromise = import('../product-widget/bootstrap.js');
  }
  return reviewsMainPromise;
}

export function loadListingBadgesModule() {
  if (!listingBadgesPromise) {
    listingBadgesPromise = import('../listing-badges/index.js');
  }
  return listingBadgesPromise;
}

export function loadProductRenderModule() {
  if (!productRenderPromise) {
    productRenderPromise = import('../product-widget/render.js');
  }
  return productRenderPromise;
}

// ADR_0024: rating badge surface is independent of reviews-main so the BIG
// review-section content chunk (~158 KB) is NOT loaded when the merchant has
// no review mount on the PDP.
export function loadRatingBadgeModule() {
  if (!ratingBadgePromise) {
    ratingBadgePromise = import('../rating-badge/index.js');
  }
  return ratingBadgePromise;
}

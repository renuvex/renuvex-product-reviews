// core/lazy-modules.js - Phase 2 lazy module boundaries.
//
// Keep this file light. Static imports here would pull code back into the
// always-loaded runtime. These dynamic imports are the esbuild splitting points.

var reviewsMainPromise = null;
var listingBadgesPromise = null;
var productRenderPromise = null;

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

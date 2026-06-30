// core/lazy-modules.js - Phase 2 lazy module boundaries.
//
// Keep this file light. Static imports here would pull code back into the
// always-loaded runtime. These dynamic imports are the esbuild splitting points.

import { markWidgetPerf } from './perf-timeline.js';

var reviewsMainPromise = null;
var listingBadgesPromise = null;
var reviewsRenderPromise = null;
var ratingBadgePromise = null;
var structuredDataPromise = null;

export function loadReviewsMainModule() {
  if (!reviewsMainPromise) {
    markWidgetPerf('reviews-main-import-start');
    reviewsMainPromise = import('../reviews-section/bootstrap.js').then(function (mod) {
      markWidgetPerf('reviews-main-import-done');
      return mod;
    }, function (err) {
      markWidgetPerf('reviews-main-import-error');
      throw err;
    });
  }
  return reviewsMainPromise;
}

export function loadListingBadgesModule() {
  if (!listingBadgesPromise) {
    listingBadgesPromise = import('../listing-badges/index.js');
  }
  return listingBadgesPromise;
}

export function loadReviewsRenderModule() {
  if (!reviewsRenderPromise) {
    markWidgetPerf('render-import-start');
    reviewsRenderPromise = import('../reviews-section/render.js').then(function (mod) {
      markWidgetPerf('render-import-done');
      return mod;
    }, function (err) {
      markWidgetPerf('render-import-error');
      throw err;
    });
  }
  return reviewsRenderPromise;
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

export function loadStructuredDataModule() {
  if (!structuredDataPromise) {
    structuredDataPromise = import('../structured-data/index.js');
  }
  return structuredDataPromise;
}

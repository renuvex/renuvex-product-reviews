// reviews-section/render/handlers.js — review interaction handlers (DI factory).
//
// The three handlers that re-run render() — fetch-error retry, rating filter,
// and sort change — were inline closures inside render(). Extracting them here
// keeps render() readable while preserving behavior exactly.
//
// Cycle break: render() is INJECTED via createReviewHandlers({ render }); this
// module never imports render.js, so a handlers<->render circular import is
// physically impossible (mirrors the review-form-modal shell/state DI pattern).
//
// Live state: core/state.js uses ESM live bindings (`export var currentX` +
// setters). Importing those bindings here keeps the original "read the latest
// state after await" behavior — the handlers re-read currentProductId/
// currentSettings/... at call time, NOT a captured snapshot. The request token
// (request-token.js) is shared module-wide, so stale responses are still
// discarded by isCurrentReviewRequest exactly as before.

import { fetchReviews } from '../reviews-api.js';
import { beginReviewRequest, isCurrentReviewRequest } from './request-token.js';
import {
  currentOrderBy, currentRatingFilter, currentHasImages,
  currentProductId, currentSettings, currentBadgeSettings, currentProductName,
  setCurrentOrderBy, setCurrentPage, setCurrentRatingFilter, setCurrentHasImages,
  setCurrentNextCursor,
} from '../../core/state.js';

// opts: { render } — render injected so this module never imports render.js.
export function createReviewHandlers(opts) {
  var render = opts.render;

  async function onRetry() {
    var token = beginReviewRequest();
    var productIdSnapshot = currentProductId;
    var orderBySnapshot = currentOrderBy;
    var ratingFilterSnapshot = currentRatingFilter;
    var hasImagesSnapshot = currentHasImages;
    setCurrentNextCursor(null);
    var retried = await fetchReviews(currentProductId, currentOrderBy, 1, currentRatingFilter, currentHasImages);
    if (!isCurrentReviewRequest(token, {
      productId: productIdSnapshot,
      orderBy: orderBySnapshot,
      ratingFilter: ratingFilterSnapshot,
      hasImages: hasImagesSnapshot,
    })) return;
    await render(currentProductId, currentSettings, retried, currentProductName, currentOrderBy, 1, currentBadgeSettings);
  }

  async function onFilterChange(starVal) {
    var token = beginReviewRequest();
    var nextRatingFilter = currentRatingFilter === starVal ? null : starVal;
    var productIdSnapshot = currentProductId;
    var orderBySnapshot = currentOrderBy;
    var hasImagesSnapshot = currentHasImages;
    setCurrentRatingFilter(nextRatingFilter);
    setCurrentPage(1);
    setCurrentNextCursor(null);
    var filtered = await fetchReviews(currentProductId, currentOrderBy, 1, nextRatingFilter, currentHasImages);
    if (!isCurrentReviewRequest(token, {
      productId: productIdSnapshot,
      orderBy: orderBySnapshot,
      page: 1,
      ratingFilter: nextRatingFilter,
      hasImages: hasImagesSnapshot,
    })) return;
    await render(currentProductId, currentSettings, filtered, currentProductName, currentOrderBy, 1);
  }

  async function onSortChange(orderBy, isPhotos) {
    var token = beginReviewRequest();
    var productIdSnapshot = currentProductId;
    var ratingFilterSnapshot = currentRatingFilter;
    setCurrentPage(1);
    setCurrentNextCursor(null);
    var nextOrderBy = orderBy;
    var nextHasImages = false;
    if (isPhotos) {
      nextHasImages = true;
      nextOrderBy = 'newest';
    }
    setCurrentHasImages(nextHasImages);
    setCurrentOrderBy(nextOrderBy);
    var newData = await fetchReviews(currentProductId, nextOrderBy, 1, currentRatingFilter, nextHasImages);
    if (!isCurrentReviewRequest(token, {
      productId: productIdSnapshot,
      orderBy: nextOrderBy,
      page: 1,
      ratingFilter: ratingFilterSnapshot,
      hasImages: nextHasImages,
    })) return;
    await render(currentProductId, currentSettings, newData, currentProductName, nextOrderBy, 1);
  }

  // Numbered pagination: jump to an arbitrary page via the OFFSET path (no cursor),
  // replacing the list with that page's slice. Mirrors onSortChange's token + state
  // pattern; sort/filter still reset to page 1 through their own handlers.
  async function onPageChange(nextPage) {
    var token = beginReviewRequest();
    var productIdSnapshot = currentProductId;
    var orderBySnapshot = currentOrderBy;
    var ratingFilterSnapshot = currentRatingFilter;
    var hasImagesSnapshot = currentHasImages;
    // Set page BEFORE fetch so the stale-guard compares against the new page.
    setCurrentPage(nextPage);
    setCurrentNextCursor(null);
    var data = await fetchReviews(currentProductId, currentOrderBy, nextPage, currentRatingFilter, currentHasImages);
    if (!isCurrentReviewRequest(token, {
      productId: productIdSnapshot,
      orderBy: orderBySnapshot,
      page: nextPage,
      ratingFilter: ratingFilterSnapshot,
      hasImages: hasImagesSnapshot,
    })) return;
    await render(currentProductId, currentSettings, data, currentProductName, currentOrderBy, nextPage);
    // Pagination UX: re-anchor the review section to the top so the new page is
    // read from the start. Skipped inside the admin preview iframe.
    if (typeof window !== 'undefined' && !window.__ikasPreviewMode) {
      var anchor = document.getElementById('renuvex-reviews');
      if (anchor && typeof anchor.scrollIntoView === 'function') {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  return { onRetry: onRetry, onFilterChange: onFilterChange, onSortChange: onSortChange, onPageChange: onPageChange };
}

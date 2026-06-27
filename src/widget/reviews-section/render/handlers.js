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
import { announcePageChange } from './pagination.js';
import { beginReviewRequest, isCurrentReviewRequest } from './request-token.js';
import {
  currentOrderBy, currentRatingFilter, currentMediaFilter,
  currentProductId, currentSettings, currentBadgeSettings, currentProductName,
  setCurrentOrderBy, setCurrentPage, setCurrentRatingFilter, setCurrentMediaFilter,
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
    var mediaFilterSnapshot = currentMediaFilter;
    setCurrentNextCursor(null);
    var retried = await fetchReviews(currentProductId, currentOrderBy, 1, currentRatingFilter, currentMediaFilter);
    if (!isCurrentReviewRequest(token, {
      productId: productIdSnapshot,
      orderBy: orderBySnapshot,
      ratingFilter: ratingFilterSnapshot,
      mediaFilter: mediaFilterSnapshot,
    })) return;
    await render(currentProductId, currentSettings, retried, currentProductName, currentOrderBy, 1, currentBadgeSettings);
  }

  async function onFilterChange(starVal) {
    var token = beginReviewRequest();
    var nextRatingFilter = currentRatingFilter === starVal ? null : starVal;
    var productIdSnapshot = currentProductId;
    var orderBySnapshot = currentOrderBy;
    var mediaFilterSnapshot = currentMediaFilter;
    setCurrentRatingFilter(nextRatingFilter);
    setCurrentPage(1);
    setCurrentNextCursor(null);
    var filtered = await fetchReviews(currentProductId, currentOrderBy, 1, nextRatingFilter, currentMediaFilter);
    if (!isCurrentReviewRequest(token, {
      productId: productIdSnapshot,
      orderBy: orderBySnapshot,
      page: 1,
      ratingFilter: nextRatingFilter,
      mediaFilter: mediaFilterSnapshot,
    })) return;
    await render(currentProductId, currentSettings, filtered, currentProductName, currentOrderBy, 1);
  }

  async function onSortChange(orderBy, mediaFilter) {
    var token = beginReviewRequest();
    var productIdSnapshot = currentProductId;
    var ratingFilterSnapshot = currentRatingFilter;
    setCurrentPage(1);
    setCurrentNextCursor(null);
    var nextOrderBy = orderBy;
    var nextMediaFilter = mediaFilter === 'images' || mediaFilter === 'media' ? mediaFilter : 'none';
    if (nextMediaFilter !== 'none') {
      nextOrderBy = 'newest';
    }
    setCurrentMediaFilter(nextMediaFilter);
    setCurrentOrderBy(nextOrderBy);
    var newData = await fetchReviews(currentProductId, nextOrderBy, 1, currentRatingFilter, nextMediaFilter);
    if (!isCurrentReviewRequest(token, {
      productId: productIdSnapshot,
      orderBy: nextOrderBy,
      page: 1,
      ratingFilter: ratingFilterSnapshot,
      mediaFilter: nextMediaFilter,
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
    var mediaFilterSnapshot = currentMediaFilter;
    // Set page BEFORE fetch so the stale-guard compares against the new page.
    setCurrentPage(nextPage);
    setCurrentNextCursor(null);
    var data = await fetchReviews(currentProductId, currentOrderBy, nextPage, currentRatingFilter, currentMediaFilter);
    if (!isCurrentReviewRequest(token, {
      productId: productIdSnapshot,
      orderBy: orderBySnapshot,
      page: nextPage,
      ratingFilter: ratingFilterSnapshot,
      mediaFilter: mediaFilterSnapshot,
    })) return;
    await render(currentProductId, currentSettings, data, currentProductName, currentOrderBy, nextPage);

    // A11y continuity: render() replaced the DOM, dropping focus to <body>.
    // Restore it to the NEW active page button (preventScroll so the visual
    // anchor below stays in charge of scroll) and announce the page politely.
    // On a fetch error the control is absent (error state rendered) — skip both.
    var container = document.getElementById('renuvex-reviews');
    var sRoot = container && container.shadowRoot;
    var activeBtn = sRoot && sRoot.querySelector && sRoot.querySelector('.renuvex-pr-pagination-btn[aria-current="page"]');
    if (activeBtn) {
      try { activeBtn.focus({ preventScroll: true }); } catch (_) { try { activeBtn.focus(); } catch (_) { /* best-effort */ } }
      announcePageChange(sRoot, nextPage);
    }

    // Pagination UX: re-anchor the review section to the top so the new page is
    // read from the start. Honors prefers-reduced-motion; skipped inside the
    // admin preview iframe.
    if (typeof window !== 'undefined' && !window.__ikasPreviewMode) {
      var anchor = document.getElementById('renuvex-reviews');
      if (anchor && typeof anchor.scrollIntoView === 'function') {
        var reduceMotion = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        anchor.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    }
  }

  return { onRetry: onRetry, onFilterChange: onFilterChange, onSortChange: onSortChange, onPageChange: onPageChange };
}

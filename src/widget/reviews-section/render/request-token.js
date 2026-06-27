// reviews-section/render/request-token.js — review fetch race-token.
//
// A monotonic sequence guards against stale review responses overwriting the
// currently selected sort/filter/page (see Bug_Review_Read_Lifecycle_Stale_
// Responses). The token is module-local on purpose: every review request flow
// (filter, sort, load-more, retry) shares this single counter so a slow earlier
// response can be detected and discarded. isCurrentReviewRequest also re-reads
// core state so a response is rejected when the user moved on, even if the token
// matches (e.g. productId changed underneath).

import {
  currentOrderBy, currentPage, currentRatingFilter, currentMediaFilter, currentProductId, currentNextCursor,
} from '../../core/state.js';

var reviewRequestSeq = 0;

export function beginReviewRequest() {
  reviewRequestSeq++;
  return reviewRequestSeq;
}

export function isCurrentReviewRequest(token, expected) {
  if (token !== reviewRequestSeq) return false;
  if (!expected) return true;
  if (expected.productId !== undefined && currentProductId !== expected.productId) return false;
  if (expected.orderBy !== undefined && currentOrderBy !== expected.orderBy) return false;
  if (expected.page !== undefined && currentPage !== expected.page) return false;
  if (expected.ratingFilter !== undefined && currentRatingFilter !== expected.ratingFilter) return false;
  if (expected.mediaFilter !== undefined && currentMediaFilter !== expected.mediaFilter) return false;
  if (expected.nextCursor !== undefined && currentNextCursor !== expected.nextCursor) return false;
  return true;
}

// rating-badge/index.js — PDP rating badge surface entry function.
//
// ADR_0024: badge is its own surface, independent of the review section. This
// entry function is the chunk loaded by the rating-badge surface descriptor
// (src/widget/surfaces/rating-badge.surface.js) when a ProductView event fires.
// It is intentionally lightweight: settings fetch (shared cache), gates, a
// single rating-summary fetch (LIGHT endpoint, not full reviews), and the
// badge inject. The heavy review-section bundle is NOT pulled in here.
//
// Coordination with reviews-main surface:
// - Both surfaces fire on ctx.trigger === 'product'.
// - Badge is registered FIRST in surfaces/index.js so it renders before the
//   review section bootstrap runs.
// - render.js no longer calls injectRatingBadge (removed in same commit).
//   This file is the SOLE caller of injectRatingBadge now.
//
// Gates (ADR_0023 layering):
// 1. widgets.badge.enabled === false → return (settings layer)
// 2. !isAutoPlacementEnabled() → return (capability layer, ADR_0022). Defense
//    in depth; injectRatingBadge also enforces this.
// 3. No mount/anchor gate — badge is auto-placed by definition.

import { PUBLIC_API_KEY, API_BASE } from '../core/config.js';
import { fetchWithTimeout } from '../core/fetch.js';
import { fetchSettings } from '../core/settings.js';
import { getIconFromSettings } from '../icons/index.js';
import { isAutoPlacementEnabled } from '../themes/current-adapter.js';
import { cleanupPdpRatingBadgeDom, injectRatingBadge } from './inject.js';

var BADGE_FALLBACK = { enabled: true, size: 'medium' };

// In-flight dedupe per productId. Storefront-context dedupes PRODUCT_VIEW
// within 800ms but defense-in-depth: if two callers somehow race for the
// same productId, share the same fetch+inject promise.
var inflightByProductId = {};

function currentPathname() {
  try {
    return window.location && window.location.pathname ? window.location.pathname : '';
  } catch (_) {
    return '';
  }
}

// Fetch rating summary { avg, count } for ONE productId from the existing
// /api/public/ratings endpoint (also used by listing-badges). Returns null on
// failure so the caller can skip badge gracefully.
async function fetchRatingSummary(productId) {
  if (!productId) return null;
  try {
    var url = API_BASE + '/api/public/ratings?storeId=' + encodeURIComponent(PUBLIC_API_KEY) +
      '&productIds=' + encodeURIComponent(productId);
    var res = await fetchWithTimeout(url);
    if (!res.ok) return null;
    var json = await res.json();
    var record = json && json.data && json.data[productId];
    if (!record) return null;
    // The endpoint returns { avg: string '4.5', count: int }. Normalize for
    // injectRatingBadge which accepts avg as a string-or-number and count as
    // a number. Treat 0-count as "no badge" because injectRatingBadge skips
    // anyway when !avgRating, but be explicit so the gate is readable.
    if (!record.count || record.count <= 0) return null;
    return { avg: record.avg, count: record.count };
  } catch (err) {
    console.error('[renuvex-pr] rating badge summary fetch failed:', err);
    return null;
  }
}

async function renderInternal(productId, productName) {
  var startedPathname = currentPathname();
  cleanupPdpRatingBadgeDom();

  var response = await fetchSettings();
  if (!response) return;

  var widgets = (response.widgets) || {};
  var badgeSettings = widgets.badge || BADGE_FALLBACK;
  // Settings-layer gate (ADR_0023): merchant disabled the badge feature.
  if (badgeSettings.enabled === false) return;

  // Capability-layer gate (ADR_0022 defense in depth). injectRatingBadge also
  // checks this but failing fast here avoids the rating fetch on unsupported
  // themes — the same logic the listing-badges entry function uses.
  if (!isAutoPlacementEnabled()) return;

  // Icon comes from the REVIEWS widget settings (ADR_0016 — one global rating
  // visual; badge and review surfaces share reviewIcon/reviewStarColor).
  // Do NOT introduce a badge.icon field — that was the ADR_0016 bug fix.
  var reviewsSettings = widgets.reviews || {};
  var iconPair = getIconFromSettings(reviewsSettings);

  var summary = await fetchRatingSummary(productId);
  if (!summary) return; // No reviews yet or fetch failed — silent skip.

  if (startedPathname && currentPathname() !== startedPathname) return;
  injectRatingBadge(summary.avg, summary.count, productName, badgeSettings, iconPair, productId);
}

export async function renderRatingBadge(productId, productName) {
  if (!productId) return;
  if (inflightByProductId[productId]) return inflightByProductId[productId];
  var promise = (async function () {
    try {
      await renderInternal(productId, productName);
    } catch (err) {
      console.error('[renuvex-pr] rating badge surface error:', err);
    } finally {
      delete inflightByProductId[productId];
    }
  })();
  inflightByProductId[productId] = promise;
  return promise;
}

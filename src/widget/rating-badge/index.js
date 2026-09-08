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
// 2. !isAutoPlacementEnabled() → return (ADR_0038 policy layer). Defense in
//    depth; injectRatingBadge also enforces this.
// 3. No mount/anchor gate — badge is auto-placed by definition.

import { fetchRatingSummary } from '../core/rating-summary.js';
import { fetchSettings } from '../core/settings.js';
import { getIconFromSettings } from '../icons/index.js';
import { isAutoPlacementEnabled } from '../themes/current-adapter.js';
import { cleanupPdpRatingBadgeDom, injectRatingBadge } from './inject.js';
import {
  validatePdpPlacementProof,
  waitForPdpPlacementProof,
} from '../placement/capability.js';
import { getStorefrontContextEpoch, isStorefrontContextCurrent } from '../core/context-epoch.js';

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

async function renderInternal(productId, productName, expectedEpoch) {
  var startedPathname = currentPathname();
  var epoch = expectedEpoch || getStorefrontContextEpoch();
  cleanupPdpRatingBadgeDom();

  var response = await fetchSettings();
  if (!response) return;

  var widgets = (response.widgets) || {};
  var badgeSettings = widgets.badge || BADGE_FALLBACK;
  // Settings-layer gate (ADR_0023): merchant disabled the badge feature.
  if (badgeSettings.enabled === false) return;

  // ADR_0038 policy gate. Failing fast avoids a rating request before the
  // selected placement provider has produced a strict target proof.
  if (!isAutoPlacementEnabled()) return;

  var placementProof = await waitForPdpPlacementProof(productId, productName, epoch);
  if (!placementProof || !validatePdpPlacementProof(placementProof)) return;

  // Icon comes from the REVIEWS widget settings (ADR_0016 — one global rating
  // visual; badge and review surfaces share reviewIcon/reviewStarColor).
  // Do NOT introduce a badge.icon field — that was the ADR_0016 bug fix.
  var reviewsSettings = widgets.reviews || {};
  var iconPair = getIconFromSettings(reviewsSettings);

  var summary = await fetchRatingSummary(productId);
  if (!summary) return; // No reviews yet or fetch failed — silent skip.

  if (!isStorefrontContextCurrent(epoch)) return;
  if (startedPathname && currentPathname() !== startedPathname) return;
  if (!validatePdpPlacementProof(placementProof)) return;
  injectRatingBadge(summary.avg, summary.count, productName, badgeSettings, iconPair, productId, false, placementProof);
}

export async function renderRatingBadge(productId, productName, expectedEpoch) {
  if (!productId) return;
  var epoch = expectedEpoch || getStorefrontContextEpoch();
  var inflightKey = String(productId) + '@' + String(epoch);
  if (inflightByProductId[inflightKey]) return inflightByProductId[inflightKey];
  var promise = (async function () {
    try {
      await renderInternal(productId, productName, epoch);
    } catch (err) {
      console.error('[renuvex-pr] rating badge surface error:', err);
    } finally {
      delete inflightByProductId[inflightKey];
    }
  })();
  inflightByProductId[inflightKey] = promise;
  return promise;
}

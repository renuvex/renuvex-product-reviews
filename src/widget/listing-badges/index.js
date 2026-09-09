// listing-badges/index.js - listing badge orchestration and state.

import { ls } from '../core/state.js';
import { fetchSettings } from '../core/settings.js';
import { getIconFromSettings } from '../icons/index.js';
import { SIZE_MAP, ensureBadgeTokens } from '../core/badge.js';
import { isAutoPlacementEnabled } from '../themes/current-adapter.js';
import { fetchRatings } from './ratings.js';
import {
  clearStrictBadgePlaceholders,
  disconnectStrictListingObservers,
  injectStrictBadges,
  reserveStrictBadgeSlots,
} from './strict-inject.js';
import {
  collectListingPlacementCandidates,
  getResolvedListingPlacementProof,
  promoteListingPlacementProof,
} from '../placement/capability.js';
import { getStorefrontContextEpoch, isStorefrontContextCurrent } from '../core/context-epoch.js';
import {
  getListingProofRequestStatus,
  markListingProofRequestsInFlight,
  settleListingProofRequests,
} from '../core/listing-proof-request-state.js';
import { reportWidgetHealth } from '../core/health.js';

function cleanupListingBadges() {
  disconnectStrictListingObservers();
  document.querySelectorAll('[data-renuvex-listing-badge]').forEach(function(el) { el.remove(); });
  document.querySelectorAll('[data-renuvex-badge]').forEach(function(el) {
    el.removeAttribute('data-renuvex-badge');
  });
  clearStrictBadgePlaceholders();
}

export async function renderListingBadges() {
  if (ls.inProgress) { ls.queued = true; return; }
  if (ls.rendered) return;
  ls.rendered = true;
  ls.inProgress = true;
  try {
    var epoch = getStorefrontContextEpoch();
    var doCleanup = ls.navCleanup;
    if (doCleanup) ls.navCleanup = false;

    var response = await fetchSettings();
    if (!response) { ls.rendered = false; return; }

    var widgets = (response && response.widgets) || {};

    // Do not inject listing badges when the badge widget is disabled.
    if (widgets.badge && widgets.badge.enabled === false) {
      if (doCleanup) cleanupListingBadges();
      ls.rendered = false;
      return;
    }

    // Skip all heavy work until a valid placement policy is applied. Strict
    // proofs below independently gate the ratings request and DOM mutation.
    if (!isAutoPlacementEnabled()) {
      if (doCleanup) cleanupListingBadges();
      ls.rendered = false;
      return;
    }

    // Rating görseli tek kaynaktan: "Ürün Yorumları" widget'ı (reviewIcon +
    // reviewStarColor). Listing rozetleri PDP render.js'e bağlı olmadan kendi
    // yıldız renk değişkenini kurar — soğuk listing girişinde de doğru renk.
    // Dolu + boş yıldız (outline) tek --renuvex-pr-review-star-color'dan beslenir.
    var placementCandidates = collectListingPlacementCandidates(epoch);
    if (doCleanup) cleanupListingBadges();
    reserveStrictBadgeSlots(placementCandidates);

    var requestCandidates = placementCandidates.filter(function (candidate) {
      var status = getListingProofRequestStatus(candidate);
      return status !== 'in_flight' && status !== 'empty' && status !== 'unresolved';
    });
    var productTargets = {};
    requestCandidates.forEach(function (candidate) {
      if (candidate.identityBlockReason) {
        reportWidgetHealth('identity-conflict', 'Conflicting storefront product identity', {
          surface: 'listing',
          adapterKey: candidate.adapterKey,
          reason: candidate.identityBlockReason,
        });
      }
      var resolvedProof = getResolvedListingPlacementProof(candidate);
      var productId = resolvedProof ? resolvedProof.productId : candidate.eventProductId;
      var identitySource = resolvedProof ? resolvedProof.identitySource :
        candidate.eventProductId ? 'storefront_event' : null;
      if (!productTargets[candidate.slug] || (!productTargets[candidate.slug].productId && productId)) {
        productTargets[candidate.slug] = {
          productId: productId,
          identitySource: identitySource,
          identityBlockReason: candidate.identityBlockReason,
          adapterKey: candidate.adapterKey,
        };
      }
    });
    var slugs = Object.keys(productTargets);
    if (!slugs.length) {
      clearStrictBadgePlaceholders();
      return;
    }
    markListingProofRequestsInFlight(requestCandidates);
    var ratingsPromise = fetchRatings(productTargets).catch(function() {
      return { outcomes: {} };
    });

    var reviewsSettings = widgets.reviews || {};
    var iconPair = getIconFromSettings(reviewsSettings);
    var starColor = /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(reviewsSettings.reviewStarColor || '')
      ? reviewsSettings.reviewStarColor
      : '#f59e0b';
    document.documentElement.style.setProperty('--renuvex-pr-review-star-color', starColor);

    // Rozet boyutu — "Yıldız Rozeti" → badge.size; SIZE_MAP core/badge.js'te tek kaynak.
    // Merchant'ın Küçük/Orta/Büyük seçimi PDP başlık rozetiyle aynı şekilde
    // (hem ikon hem metin boyutuna) uygulanır. Yüzeye özel olan tek şey çevre
    // boşlukları (gap/margin) — listing dar kart, PDP ferah başlık.
    // PR-3: sizing component-scope CSS variable üzerinden akıyor;
    // ensureBadgeTokens `<style id="renuvex-pr-badge-tokens">` etiketini günceller.
    // PR-4: mobileOverride açıksa `@media (max-width:640px)` bloğu da yazılır.
    var badgeSettings = widgets.badge || {};
    var sizeKey = badgeSettings.size || 'medium';
    var sizes = SIZE_MAP[sizeKey] || SIZE_MAP.medium;
    var mobileSizes = null;
    if (badgeSettings.mobileOverride === true) {
      var mobileSizeKey = badgeSettings.mobileSize || 'small';
      mobileSizes = SIZE_MAP[mobileSizeKey] || SIZE_MAP.small;
    }
    ensureBadgeTokens(sizes, mobileSizes);

    var ratingResult = await ratingsPromise;
    if (!isStorefrontContextCurrent(epoch)) {
      clearStrictBadgePlaceholders();
      return;
    }
    var settlement = settleListingProofRequests(
      requestCandidates,
      ratingResult.outcomes,
      promoteListingPlacementProof,
    );
    settlement.rejected.forEach(function (candidate) {
      reportWidgetHealth('placement-attestation-miss', 'Listing proof changed before placement', {
        surface: 'listing',
        adapterKey: candidate.adapterKey,
        reason: 'stale_after_resolution',
      });
    });
    injectStrictBadges(settlement.resolved, iconPair, badgeSettings);
  } finally {
    ls.inProgress = false;
    if (ls.queued) {
      ls.queued = false;
      ls.rendered = false;
      renderListingBadges();
    }
  }
}

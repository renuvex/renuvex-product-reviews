// rating-badge/inject.js — PDP rating badge DOM injection.
//
// Shared with the rating-badge surface entry. The product title finder lives in
// core because PDP title placement is a cross-surface concern.

import { findProductTitleEl } from '../core/product-title.js';
import { partialStarsHTML, buildRatingA11yLabel } from '../core/helpers.js';
// Boyut haritası tek kaynak — hem PDP başlık rozeti hem listing kartları
// aynı SIZE_MAP'i kullanır; merchant'ın badge.size seçimi her iki yüzeye uygulanır.
// PR-3: sizing artık CSS variable üzerinden akıyor; ensureBadgeTokens scope'lu
// `<style>` etiketine yazar, .renuvex-pr-rating-badge .renuvex-pr-star CSS'i değişkenden okur.
import {
  SIZE_MAP,
  ensureBadgeTokens,
  ensureBadgeStyles,
  formatVisibleBadgeLabel,
  resolveBadgeJustify,
} from '../core/badge.js';
import { probeWidgetVisibility, reportWidgetHealth, watchOneTimeRemoval } from '../core/health.js';
import { createOwnedSlot, removeOwnedSlots, setSlotContext } from '../core/slot.js';
import { getAfterElementMountPoint, placeOwnedSlot, watchOwnedSlotPosition } from '../core/slot-position.js';
import { getThemeAdapter, isAutoPlacementEnabled } from '../themes/current-adapter.js';
import { validatePdpPlacementProof } from '../placement/capability.js';

var ratingBadgeRemovalObserver = null;
var ratingBadgePositionObserver = null;

export function cleanupPdpRatingBadgeDom() {
  if (ratingBadgeRemovalObserver) {
    ratingBadgeRemovalObserver.disconnect();
    ratingBadgeRemovalObserver = null;
  }
  if (ratingBadgePositionObserver) {
    ratingBadgePositionObserver.disconnect();
    ratingBadgePositionObserver = null;
  }

  removeOwnedSlots('product-title-rating');

  var legacyBadge = document.getElementById('renuvex-pr-rating-badge');
  if (legacyBadge) legacyBadge.remove();

  document.querySelectorAll('.renuvex-pr-rating-badge--pdp').forEach(function (node) {
    node.remove();
  });
}

if (typeof window !== 'undefined') {
  window.__renuvexPrCleanupPdpBadge = cleanupPdpRatingBadgeDom;
}

function getProductBadgeMountPoint(titleEl) {
  var adapter = getThemeAdapter();
  if (adapter && typeof adapter.getProductBadgeMountPoint === 'function') {
    try {
      var byTheme = adapter.getProductBadgeMountPoint(titleEl);
      if (byTheme && byTheme.parent) return byTheme;
    } catch (_) {}
  }
  return getAfterElementMountPoint(titleEl);
}

export function injectRatingBadge(avgRating, totalCount, productName, badgeSettings, iconPair, productId, selfHealAttempt, placementProof) {
  // Cleanup runs before the policy gate so a badge from the previous product
  // cannot survive a navigation that disables placement.
  cleanupPdpRatingBadgeDom();
  // ADR_0038: placementPolicy selects a provider, but production injection
  // still requires that provider's exact, current target proof. Explicit
  // review mounts and preview rendering use separate contracts.
  if (!isAutoPlacementEnabled()) return;
  var normalizedProductId = typeof productId === 'string' ? productId.trim() : '';
  if (!normalizedProductId || normalizedProductId.length > 128) return;
  if (!window.__ikasPreviewMode && (
    !validatePdpPlacementProof(placementProof) || placementProof.productId !== normalizedProductId
  )) return;

  if (!avgRating) return;

  // Badge widget devre dışıysa hiç inject etme
  if (badgeSettings && badgeSettings.enabled === false) return;

  // PARTIAL_STARS_CSS'i head'e garanti et. ADR_0021 sonrası CLASSIC_CSS shadow
  // root'a taşındı; soğuk PDP girişinde (kategori sayfası olmadan) bu CSS
  // hiçbir başka yoldan head'e gelmiyor → badge yıldızları boyutsuz patlar.
  // Idempotent; her render'da güvenle çağrılabilir.
  ensureBadgeStyles();

  var titleEl = placementProof ? placementProof.titleEl : findProductTitleEl(productName);
  if (!titleEl || !titleEl.parentNode) {
    reportWidgetHealth('dom-conflict', 'PDP product title could not be found for badge placement', {
      surface: 'pdp-badge',
      reason: 'title_not_found',
      productName: productName || '',
      productId: productId || '',
    });
    return;
  }

  var mountPoint = placementProof ? placementProof.mountPoint : getProductBadgeMountPoint(titleEl);
  if (!mountPoint || !mountPoint.parent) {
    reportWidgetHealth('dom-conflict', 'PDP badge mount point could not be resolved', {
      surface: 'pdp-badge',
      reason: 'mount_not_found',
      productName: productName || '',
      productId: productId || '',
    });
    return;
  }

  // Boyut "Yıldız Rozeti" widget'ından; yıldız ikonu + rengi tek kaynaktan
  // ("Ürün Yorumları") gelir — iconPair render.js tarafından geçirilir.
  // ensureBadgeTokens scoped `<style id="renuvex-pr-badge-tokens">` etiketini günceller;
  // hem PDP hem listing aynı etiketi paylaşır (settings tek kaynak, çakışmaz).
  // PR-4: mobileOverride açıksa `@media (max-width:640px)` bloğu da yazılır.
  var sizeKey = (badgeSettings && badgeSettings.size) || 'medium';
  var sizes = SIZE_MAP[sizeKey] || SIZE_MAP.medium;
  var mobileSizes = null;
  if (badgeSettings && badgeSettings.mobileOverride === true) {
    var mobileSizeKey = badgeSettings.mobileSize || 'small';
    mobileSizes = SIZE_MAP[mobileSizeKey] || SIZE_MAP.small;
  }
  ensureBadgeTokens(sizes, mobileSizes);

  var identityContext = { surface: 'pdp', productId: normalizedProductId };
  var slot = createOwnedSlot({
    slot: 'product-title-rating',
    className: 'renuvex-pr-product-badge-slot',
    context: identityContext,
  });

  var badge = document.createElement('a');
  badge.className = 'renuvex-pr-rating-badge renuvex-pr-rating-badge--pdp';
  badge.href = '#renuvex-reviews';
  // A11y: a real text label (sr-only) referenced via aria-labelledby — translation
  // friendly. The element is a scroll-to-reviews LINK, so it keeps its link role
  // (no role=figure override). The star row is decorative (aria-hidden).
  var a11y = buildRatingA11yLabel(avgRating, totalCount);
  badge.setAttribute('aria-labelledby', a11y.id);
  badge.setAttribute('data-renuvex-rating', String(avgRating));
  badge.setAttribute('data-renuvex-count', String(totalCount));
  setSlotContext(badge, identityContext);
  // Alignment follows the product title, expressed as a data-attr + CSS
  // (Loox-style data-alignment) instead of an inline style.
  var titleAlign = window.getComputedStyle(titleEl).textAlign;
  var titleJustify = titleAlign === 'center' ? 'center' : titleAlign === 'right' ? 'flex-end' : 'flex-start';
  var badgeJustify = resolveBadgeJustify(badgeSettings && badgeSettings.alignment, titleJustify);
  var alignMap = { 'center': 'center', 'flex-end': 'right', 'flex-start': 'left' };
  badge.setAttribute('data-renuvex-align', alignMap[badgeJustify] || 'left');

  badge.insertAdjacentHTML('beforeend', a11y.html + partialStarsHTML(avgRating, iconPair));

  var visibleLabel = formatVisibleBadgeLabel(
    { avg: avgRating, count: totalCount },
    badgeSettings,
    'pdp',
  );
  if (visibleLabel) {
    var labelEl = document.createElement('span');
    labelEl.className = 'renuvex-pr-rating-badge__label';
    // Font-size .renuvex-pr-rating-badge { font-size:var(--renuvex-pr-badge-text-size) } üzerinden
    // gelir (inheritance). Inline yok — ensureBadgeTokens merchant değerini set eder.
    labelEl.textContent = visibleLabel;
    badge.appendChild(labelEl);
  }

  badge.onclick = function(e) {
    e.preventDefault();
    var rev = document.getElementById('renuvex-reviews-widget') || document.getElementById('renuvex-reviews');
    if (!rev) return;
    var stickyHeader = document.querySelector('header');
    var headerH = stickyHeader ? stickyHeader.getBoundingClientRect().height : 0;
    var top = rev.getBoundingClientRect().top + window.pageYOffset - headerH - 16;
    window.scrollTo({ top: top, behavior: 'smooth' });
  };
  slot.appendChild(badge);
  placeOwnedSlot(slot, mountPoint);
  var healthContext = { productName: productName || '', productId: normalizedProductId };
  ratingBadgePositionObserver = watchOwnedSlotPosition(slot, mountPoint, {
    surface: 'pdp-badge',
    reason: 'position_reanchored',
    message: 'PDP badge slot reordered after render',
    extra: healthContext,
  });
  probeWidgetVisibility(slot, 'pdp-badge', healthContext, function () {
    return document.querySelector('[data-renuvex-slot="product-title-rating"]');
  });
  if (!selfHealAttempt) {
    ratingBadgeRemovalObserver = watchOneTimeRemoval(slot, 'pdp-badge', function () {
      injectRatingBadge(avgRating, totalCount, productName, badgeSettings, iconPair, productId, true, placementProof);
    }, healthContext);
  }
}

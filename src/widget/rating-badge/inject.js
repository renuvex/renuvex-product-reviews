// rating-badge/inject.js — PDP rating badge DOM injection + JSON-LD writer.
//
// Shared with the rating-badge surface entry. The product title finder lives in
// core because PDP title placement is a cross-surface concern.

import { findProductTitleEl } from '../core/product-title.js';
import { partialStarsHTML, buildRatingA11yLabel } from '../core/helpers.js';
// Boyut haritası tek kaynak — hem PDP başlık rozeti hem listing kartları
// aynı SIZE_MAP'i kullanır; merchant'ın badge.size seçimi her iki yüzeye uygulanır.
// PR-3: sizing artık CSS variable üzerinden akıyor; ensureBadgeTokens scope'lu
// `<style>` etiketine yazar, .renuvex-pr-rating-badge .renuvex-pr-star CSS'i değişkenden okur.
import { SIZE_MAP, ensureBadgeTokens, ensureBadgeStyles } from '../core/badge.js';
import { probeWidgetVisibility, reportWidgetHealth, watchOneTimeRemoval } from '../core/health.js';
import { createOwnedSlot, removeOwnedSlots, setSlotContext } from '../core/slot.js';
import { getAfterElementMountPoint, placeOwnedSlot, watchOwnedSlotPosition } from '../core/slot-position.js';
import { getThemeAdapter, isAutoPlacementEnabled } from '../themes/current-adapter.js';

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

  var oldJsonLd = document.getElementById('renuvex-pr-jsonld');
  if (oldJsonLd) oldJsonLd.remove();
}

if (typeof window !== 'undefined') {
  window.__renuvexPrCleanupPdpBadge = cleanupPdpRatingBadgeDom;
}

// SVG yıldız dizisi — rating'e göre yarım yıldız desteği (overlay tekniği).
// iconPair tek kaynaktan ("Ürün Yorumları" → reviewIcon) gelir; rating-badge/index.js geçirir.
// Yıldız boyutu .renuvex-pr-rating-badge scope'undaki CSS variable'dan okunur.
function buildStars(rating, iconPair) {
  return partialStarsHTML(rating, iconPair);
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

export function injectRatingBadge(avgRating, totalCount, productName, badgeSettings, iconPair, productId, selfHealAttempt) {
  // Önceki üründen kalan eski badge'i temizle. Cleanup, ADR_0022 gate'inden
  // ÖNCE çalışır: bir önceki sayfada placement açıkken inject olmuş eski bir
  // badge varsa, gate kapanmış olsa bile temizlenmesi gerek.
  cleanupPdpRatingBadgeDom();
  // ADR_0022 — Placement allowlist. Unknown themes (or any state where
  // `adapterMatchedBy !== 'theme_id'`) silently skip auto-placement. The
  // explicit-mount review section continues to render via its own opt-in
  // path; only the heuristic PDP/listing/modal badges are gated here.
  // Skip after cleanup but BEFORE any DOM probe / style injection / JSON-LD
  // write so "placement off" means "no badge surface at all", matching the
  // contract documented in ADR_0022.
  if (!isAutoPlacementEnabled()) return;

  if (!avgRating) return;

  // Badge widget devre dışıysa hiç inject etme
  if (badgeSettings && badgeSettings.enabled === false) return;

  // PARTIAL_STARS_CSS'i head'e garanti et. ADR_0021 sonrası CLASSIC_CSS shadow
  // root'a taşındı; soğuk PDP girişinde (kategori sayfası olmadan) bu CSS
  // hiçbir başka yoldan head'e gelmiyor → badge yıldızları boyutsuz patlar.
  // Idempotent; her render'da güvenle çağrılabilir.
  ensureBadgeStyles();

  // JSON-LD structured data — Google rich snippet (badge devre dışı olsa bile render edilmeli,
  // ama burada zaten enabled !== false yolundayız)
  var jsonLdEl = document.createElement('script');
  jsonLdEl.id = 'renuvex-pr-jsonld';
  jsonLdEl.type = 'application/ld+json';
  jsonLdEl.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': productName || document.title,
    'url': window.location.href,
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': avgRating,
      'reviewCount': totalCount,
      'bestRating': '5',
      'worstRating': '1',
    },
  });
  document.head.appendChild(jsonLdEl);

  var titleEl = findProductTitleEl(productName);
  if (!titleEl || !titleEl.parentNode) {
    reportWidgetHealth('dom-conflict', 'PDP product title could not be found for badge placement', {
      surface: 'pdp-badge',
      reason: 'title_not_found',
      productName: productName || '',
      productId: productId || '',
    });
    return;
  }

  var mountPoint = getProductBadgeMountPoint(titleEl);
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

  var slot = createOwnedSlot({
    slot: 'product-title-rating',
    className: 'renuvex-pr-product-badge-slot',
    context: { surface: 'pdp', productId: productId || '' },
  });

  var badge = document.createElement('a');
  badge.className = 'renuvex-pr-rating-badge renuvex-pr-rating-badge--pdp';
  badge.href = '#renuvex-reviews';
  // A11y: a real text label (sr-only) referenced via aria-labelledby — translation
  // friendly. The element is a scroll-to-reviews LINK, so it keeps its link role
  // (no role=figure override). The star row is decorative (aria-hidden).
  var a11y = buildRatingA11yLabel(avgRating, totalCount);
  badge.setAttribute('aria-labelledby', a11y.id);
  badge.setAttribute('data-renuvex-surface', 'pdp');
  badge.setAttribute('data-renuvex-rating', String(avgRating));
  badge.setAttribute('data-renuvex-count', String(totalCount));
  setSlotContext(badge, { surface: 'pdp', productId: productId || '' });
  // Alignment follows the product title, expressed as a data-attr + CSS
  // (Loox-style data-alignment) instead of an inline style.
  var titleAlign = window.getComputedStyle(titleEl).textAlign;
  var badgeAlign = titleAlign === 'center' ? 'center' : titleAlign === 'right' ? 'right' : 'left';
  badge.setAttribute('data-renuvex-align', badgeAlign);

  badge.insertAdjacentHTML('beforeend', a11y.html + buildStars(avgRating, iconPair));

  var labelEl = document.createElement('span');
  labelEl.className = 'renuvex-pr-rating-badge__label';
  // Font-size .renuvex-pr-rating-badge { font-size:var(--renuvex-pr-badge-text-size) } üzerinden
  // gelir (inheritance). Inline yok — ensureBadgeTokens merchant değerini set eder.
  labelEl.textContent = avgRating + ' (' + totalCount + ' yorum)';
  badge.appendChild(labelEl);

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
  ratingBadgePositionObserver = watchOwnedSlotPosition(slot, mountPoint, {
    surface: 'pdp-badge',
    reason: 'position_reanchored',
    message: 'PDP badge slot reordered after render',
    extra: { productName: productName || '', productId: productId || '' },
  });
  probeWidgetVisibility(slot, 'pdp-badge', { productName: productName || '', productId: productId || '' }, function () {
    return document.querySelector('[data-renuvex-slot="product-title-rating"]');
  });
  if (!selfHealAttempt) {
    ratingBadgeRemovalObserver = watchOneTimeRemoval(slot, 'pdp-badge', function () {
      injectRatingBadge(avgRating, totalCount, productName, badgeSettings, iconPair, productId, true);
    }, { productName: productName || '', productId: productId || '' });
  }
}

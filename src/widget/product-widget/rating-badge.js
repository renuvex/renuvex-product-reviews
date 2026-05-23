// product-widget/rating-badge.js — Ürün başlığının altına rating badge + JSON-LD inject

import { findProductTitleEl } from './title-finder.js';
import { partialStarsHTML } from '../core/helpers.js';
// Boyut haritası tek kaynak — hem PDP başlık rozeti hem listing kartları
// aynı SIZE_MAP'i kullanır; merchant'ın badge.size seçimi her iki yüzeye uygulanır.
// PR-3: sizing artık CSS variable üzerinden akıyor; ensureBadgeTokens scope'lu
// `<style>` etiketine yazar, .ikr-rating-badge .ikr-star CSS'i değişkenden okur.
import { SIZE_MAP, ensureBadgeTokens } from '../core/badge.js';
import { probeWidgetVisibility, watchOneTimeRemoval } from '../core/health.js';
import { createOwnedSlot, removeOwnedSlots, setSlotContext } from '../core/slot.js';

var ratingBadgeRemovalObserver = null;

// SVG yıldız dizisi — rating'e göre yarım yıldız desteği (overlay tekniği).
// iconPair tek kaynaktan ("Ürün Yorumları" → reviewIcon) gelir; render.js geçirir.
// Yıldız boyutu .ikr-rating-badge scope'undaki CSS variable'dan okunur.
function buildStars(rating, iconPair) {
  return partialStarsHTML(rating, iconPair);
}

export function injectRatingBadge(avgRating, totalCount, productName, badgeSettings, iconPair, productId, selfHealAttempt) {
  if (ratingBadgeRemovalObserver) {
    ratingBadgeRemovalObserver.disconnect();
    ratingBadgeRemovalObserver = null;
  }

  // Önceki üründen kalan eski badge'i temizle
  removeOwnedSlots('product-title-rating', 'product-title-badge');
  var oldBadge = document.getElementById('ikr-rating-badge');
  if (oldBadge) oldBadge.remove();

  if (!avgRating) return;

  // Badge widget devre dışıysa hiç inject etme
  if (badgeSettings && badgeSettings.enabled === false) return;

  // JSON-LD structured data — Google rich snippet (badge devre dışı olsa bile render edilmeli,
  // ama burada zaten enabled !== false yolundayız)
  var oldJsonLd = document.getElementById('ikr-jsonld');
  if (oldJsonLd) oldJsonLd.remove();
  var jsonLdEl = document.createElement('script');
  jsonLdEl.id = 'ikr-jsonld';
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
  if (!titleEl || !titleEl.parentNode) return;

  // Boyut "Yıldız Rozeti" widget'ından; yıldız ikonu + rengi tek kaynaktan
  // ("Ürün Yorumları") gelir — iconPair render.js tarafından geçirilir.
  // ensureBadgeTokens scoped `<style id="ikr-badge-tokens">` etiketini günceller;
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
    legacySlot: 'product-title-badge',
    className: 'renuvex-pr-product-badge-slot ikr-product-badge-slot',
    context: { surface: 'pdp', productId: productId || '' },
  });

  var badge = document.createElement('a');
  badge.id = 'ikr-rating-badge';
  badge.className = 'renuvex-pr-rating-badge ikr-rating-badge ikr-rating-badge--pdp';
  badge.href = '#ikas-reviews';
  // A11y + data attrs (ADR_0017 draft) — role=figure standart endüstri kalıbı.
  badge.setAttribute('role', 'figure');
  badge.setAttribute('aria-label', avgRating + ' üzerinden 5 yıldız, ' + totalCount + ' yorum');
  badge.setAttribute('data-ikr-surface', 'pdp');
  badge.setAttribute('data-renuvex-surface', 'pdp');
  badge.setAttribute('data-ikr-rating', String(avgRating));
  badge.setAttribute('data-renuvex-rating', String(avgRating));
  badge.setAttribute('data-ikr-count', String(totalCount));
  badge.setAttribute('data-renuvex-count', String(totalCount));
  setSlotContext(badge, { surface: 'pdp', productId: productId || '' });
  var titleAlign = window.getComputedStyle(titleEl).textAlign;
  var justifyVal = titleAlign === 'center' ? 'center' : titleAlign === 'right' ? 'flex-end' : 'flex-start';
  // Layout (display, gap, margin, text-decoration, cursor, font-weight, color)
  // .ikr-rating-badge + .ikr-rating-badge--pdp class'larından okunur. Inline'da
  // sadece per-mount justify-content kalır.
  badge.style.cssText = 'justify-content:' + justifyVal + ';';

  badge.insertAdjacentHTML('beforeend', buildStars(avgRating, iconPair));

  var labelEl = document.createElement('span');
  labelEl.className = 'ikr-rating-badge__label';
  // Font-size .ikr-rating-badge { font-size:var(--ikr-badge-text-size) } üzerinden
  // gelir (inheritance). Inline yok — ensureBadgeTokens merchant değerini set eder.
  labelEl.textContent = avgRating + ' (' + totalCount + ' yorum)';
  badge.appendChild(labelEl);

  badge.onclick = function(e) {
    e.preventDefault();
    var rev = document.getElementById('ikas-reviews-widget') || document.getElementById('ikas-reviews');
    if (!rev) return;
    var stickyHeader = document.querySelector('header');
    var headerH = stickyHeader ? stickyHeader.getBoundingClientRect().height : 0;
    var top = rev.getBoundingClientRect().top + window.pageYOffset - headerH - 16;
    window.scrollTo({ top: top, behavior: 'smooth' });
  };
  slot.appendChild(badge);
  titleEl.parentNode.insertBefore(slot, titleEl.nextSibling);
  probeWidgetVisibility(slot, 'pdp-badge', { productName: productName || '', productId: productId || '' });
  if (!selfHealAttempt) {
    ratingBadgeRemovalObserver = watchOneTimeRemoval(slot, 'pdp-badge', function () {
      injectRatingBadge(avgRating, totalCount, productName, badgeSettings, iconPair, productId, true);
    }, { productName: productName || '', productId: productId || '' });
  }
}

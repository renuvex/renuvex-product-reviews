// product-widget/rating-badge.js — Ürün başlığının altına rating badge + JSON-LD inject

import { findProductTitleEl } from './title-finder.js';
import { partialStarsHTML } from '../core/helpers.js';
// Boyut haritası tek kaynak — hem PDP başlık rozeti hem listing kartları
// aynı SIZE_MAP'i kullanır; merchant'ın badge.size seçimi her iki yüzeye uygulanır.
import { SIZE_MAP } from '../core/badge.js';

// SVG yıldız dizisi — rating'e göre yarım yıldız desteği (overlay tekniği).
// iconPair tek kaynaktan ("Ürün Yorumları" → reviewIcon) gelir; render.js geçirir.
// Yıldız rengi .ikr-star-* sınıfları üzerinden --ikr-review-star-color'dan gelir.
function buildStars(rating, iconPair, iconSize) {
  var sizeStyle = 'width:' + iconSize + 'px;height:' + iconSize + 'px;';
  return partialStarsHTML(rating, iconPair, { sizeStyle: sizeStyle });
}

export function injectRatingBadge(avgRating, totalCount, productName, badgeSettings, iconPair) {
  // Önceki üründen kalan eski badge'i temizle
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
  var sizeKey = (badgeSettings && badgeSettings.size) || 'medium';
  var sizes = SIZE_MAP[sizeKey] || SIZE_MAP.medium;

  var badge = document.createElement('a');
  badge.id = 'ikr-rating-badge';
  badge.className = 'ikr-rating-badge ikr-rating-badge--pdp';
  badge.href = '#ikas-reviews';
  // A11y + data attrs (ADR_0017 draft) — role=figure standart endüstri kalıbı.
  badge.setAttribute('role', 'figure');
  badge.setAttribute('aria-label', avgRating + ' üzerinden 5 yıldız, ' + totalCount + ' yorum');
  badge.setAttribute('data-ikr-surface', 'pdp');
  badge.setAttribute('data-ikr-rating', String(avgRating));
  badge.setAttribute('data-ikr-count', String(totalCount));
  var titleAlign = window.getComputedStyle(titleEl).textAlign;
  var justifyVal = titleAlign === 'center' ? 'center' : titleAlign === 'right' ? 'flex-end' : 'flex-start';
  // Layout (display, gap, margin, text-decoration, cursor, font-weight, color)
  // .ikr-rating-badge + .ikr-rating-badge--pdp class'larından okunur. Inline'da
  // sadece per-mount justify-content kalır.
  badge.style.cssText = 'justify-content:' + justifyVal + ';';

  badge.insertAdjacentHTML('beforeend', buildStars(avgRating, iconPair, sizes.icon));

  var labelEl = document.createElement('span');
  labelEl.className = 'ikr-rating-badge__label';
  // font-size sizing token — PR-3'te component-scope CSS variable'a taşınacak.
  labelEl.style.cssText = 'font-size:' + sizes.text + ';';
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
  titleEl.parentNode.insertBefore(badge, titleEl.nextSibling);
}

// product-widget/rating-badge.js — Ürün başlığının altına rating badge + JSON-LD inject

import { findProductTitleEl } from './title-finder.js';
import { partialStarsHTML } from '../core/helpers.js';

// Boyut map — badge widget ayarındaki "size" değeri bu piksel değerlerini üretir
var SIZE_MAP = {
  small:  { icon: 14, text: '12px' },
  medium: { icon: 16, text: '14px' },
  large:  { icon: 20, text: '16px' },
};

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
  badge.href = '#ikas-reviews';
  var titleAlign = window.getComputedStyle(titleEl).textAlign;
  var justifyVal = titleAlign === 'center' ? 'center' : titleAlign === 'right' ? 'flex-end' : 'flex-start';
  badge.style.cssText = 'display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;font-weight:400;justify-content:' + justifyVal + ';';
  badge.innerHTML = buildStars(avgRating, iconPair, sizes.icon) +
    '<span style="font-size:' + sizes.text + ';font-weight:400;color:#555;">' + avgRating + ' (' + totalCount + ' yorum)</span>';
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

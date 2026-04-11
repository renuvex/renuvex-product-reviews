// product-widget/rating-badge.js — Ürün başlığının altına rating badge + JSON-LD inject

import { findProductTitleEl } from './title-finder.js';
import { PUBLIC_API_KEY } from '../core/config.js';

// İkon map — badge widget ayarındaki "icon" değeri bu karakterleri üretir
var ICON_CHARS = {
  star:   { filled: '★', empty: '☆' },
  heart:  { filled: '♥', empty: '♡' },
  circle: { filled: '●', empty: '○' },
};

// Boyut map — badge widget ayarındaki "size" değeri bu font-size değerlerini üretir
var SIZE_MAP = {
  small:  { icon: '14px', text: '12px' },
  medium: { icon: '16px', text: '14px' },
  large:  { icon: '20px', text: '16px' },
};

function buildStars(rating, iconKey, color, size) {
  var chars = ICON_CHARS[iconKey] || ICON_CHARS.star;
  var r = Math.round(parseFloat(rating)) || 0;
  var filled = chars.filled.repeat(Math.min(r, 5));
  var empty = chars.empty.repeat(Math.max(5 - r, 0));
  return '<span style="color:' + color + ';font-size:' + size + ';line-height:1;">' + filled + empty + '</span>';
}

export function injectRatingBadge(avgRating, totalCount, productName, badgeSettings) {
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

  // Badge ayarları — admin "Yıldız Rozeti" widget'ından
  var iconKey = (badgeSettings && badgeSettings.icon) || 'star';
  var sizeKey = (badgeSettings && badgeSettings.size) || 'medium';
  var color = (badgeSettings && badgeSettings.color) || '#f59e0b';
  var sizes = SIZE_MAP[sizeKey] || SIZE_MAP.medium;

  var badge = document.createElement('a');
  badge.id = 'ikr-rating-badge';
  badge.href = '#ikas-reviews';
  var titleAlign = window.getComputedStyle(titleEl).textAlign;
  var justifyVal = titleAlign === 'center' ? 'center' : titleAlign === 'right' ? 'flex-end' : 'flex-start';
  badge.style.cssText = 'display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;font-weight:400;justify-content:' + justifyVal + ';';
  badge.innerHTML = buildStars(avgRating, iconKey, color, sizes.icon) +
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

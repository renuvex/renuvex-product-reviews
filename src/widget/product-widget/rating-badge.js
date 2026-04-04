// product-widget/rating-badge.js — Ürün başlığının altına rating badge + JSON-LD inject

import { starsHTML } from '../core/helpers.js';
import { findProductTitleEl } from './title-finder.js';
import { PUBLIC_API_KEY } from '../core/config.js';

export function injectRatingBadge(avgRating, totalCount, productName) {
  // Önceki üründen kalan eski badge'i temizle
  var oldBadge = document.getElementById('ikr-rating-badge');
  if (oldBadge) oldBadge.remove();

  if (!avgRating) return;

  // JSON-LD structured data — Google rich snippet
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

  var badge = document.createElement('a');
  badge.id = 'ikr-rating-badge';
  badge.href = '#ikas-reviews';
  var titleAlign = window.getComputedStyle(titleEl).textAlign;
  var justifyVal = titleAlign === 'center' ? 'center' : titleAlign === 'right' ? 'flex-end' : 'flex-start';
  badge.style.cssText = 'display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;justify-content:' + justifyVal + ';';
  badge.innerHTML = starsHTML(avgRating, '16px') +
    '<span style="font-size:14px;color:#555;">' + avgRating + ' (' + totalCount + ' yorum)</span>';
  badge.onclick = function(e) {
    e.preventDefault();
    var rev = document.getElementById('ikas-reviews');
    if (rev) rev.scrollIntoView({ behavior: 'smooth' });
  };
  titleEl.parentNode.insertBefore(badge, titleEl.nextSibling);
}

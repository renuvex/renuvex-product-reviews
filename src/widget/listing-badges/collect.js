// listing-badges/collect.js — Sayfadaki ürün linklerinden slug→name map oluşturur

import { extractSlug } from '../core/helpers.js';
import { ikrSlugMap } from '../core/state.js';

var SYSTEM_SLUGS = /^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;

export function collectSlugs() {
  var map = {};
  var seen = {};
  document.querySelectorAll('a[href]').forEach(function(a) {
    try {
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || href.charAt(0) === '?') return;
      var slug = extractSlug(a.href);
      if (!slug || seen[slug]) return;
      if (!/^[a-z0-9][a-z0-9-]{2,}$/.test(slug)) return;
      if (SYSTEM_SLUGS.test(slug)) return;
      seen[slug] = true;
      map[slug] = null;
    } catch(_) {}
  });
  // VIEW_LISTING'den gelen isimler DOM fallback'i override eder
  Object.keys(ikrSlugMap).forEach(function(slug) { map[slug] = ikrSlugMap[slug]; });
  return map;
}

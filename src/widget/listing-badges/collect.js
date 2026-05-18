// listing-badges/collect.js - builds listing product targets from DOM and ikas events.

import { extractSlug, SYSTEM_SLUGS } from '../core/helpers.js';
import { ikrProductMap, ikrSlugMap } from '../core/state.js';
import { getThemeAdapter } from '../themes/current-adapter.js';
import { collectListingLinks } from './dom.js';

export function collectProductTargets() {
  var map = {};
  var seen = {};
  var adapter = getThemeAdapter();

  collectListingLinks(adapter).forEach(function(a) {
    try {
      if (adapter.isNavigationLink(a) || adapter.isCartLink(a) || adapter.isBannerLink(a)) return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || href.charAt(0) === '?') return;
      var slug = extractSlug(a.href);
      if (!slug || seen[slug]) return;
      if (!/^[a-z0-9][a-z0-9-]{2,}$/.test(slug)) return;
      if (SYSTEM_SLUGS.test(slug)) return;
      seen[slug] = true;
      map[slug] = { productId: null, name: null };
    } catch (_) {}
  });

  Object.keys(ikrSlugMap).forEach(function(slug) {
    if (!map[slug]) map[slug] = { productId: null, name: null };
    map[slug].name = ikrSlugMap[slug] || null;
  });

  Object.keys(ikrProductMap).forEach(function(slug) {
    var product = ikrProductMap[slug] || {};
    if (!map[slug]) map[slug] = { productId: null, name: null };
    map[slug].productId = product.productId || null;
    if (product.name) map[slug].name = product.name;
  });

  return map;
}

export function collectSlugs() {
  var targets = collectProductTargets();
  var map = {};

  Object.keys(targets).forEach(function(slug) {
    map[slug] = targets[slug] ? targets[slug].name : null;
  });

  return map;
}

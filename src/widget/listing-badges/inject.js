// listing-badges/inject.js - inject listing badges into product cards.

import { extractSlug } from '../core/helpers.js';
import { createBadgeEl } from '../core/badge.js';
import { getThemeAdapter } from '../themes/current-adapter.js';
import { lastClickedSlug } from '../core/state.js';

var TITLE_CLASS_SELECTOR = '[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]';
var STOCK_LABELS = /^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;

function isVisibleForBadge(el) {
  if (!el || typeof el.getClientRects !== 'function' || el.getClientRects().length === 0) return false;
  var style = window.getComputedStyle(el);
  return style.display !== 'none' && style.visibility !== 'hidden';
}

export function findTitleEl(scope, productName) {
  var adapter = getThemeAdapter();

  var byTheme = adapter.findListingTitle(scope);
  if (byTheme) return byTheme;

  if (scope.matches && scope.matches(TITLE_CLASS_SELECTOR)) return scope;
  var byClass = scope.querySelector(TITLE_CLASS_SELECTOR);
  if (byClass) return byClass;

  if (productName) {
    var all = scope.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      if (all[i].children.length === 0 && all[i].textContent.trim() === productName) return all[i];
    }
  }

  var candidates = scope.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
  for (var j = 0; j < candidates.length; j++) {
    var cel = candidates[j];
    var text = cel.textContent.trim();
    if (!text || text.length < 2 || text.length > 150) continue;
    if (/^[\d\s.,₺$€£%]+$/.test(text)) continue;
    if (STOCK_LABELS.test(text)) continue;
    if (cel.closest('figure') || cel.closest('picture')) continue;
    if (cel.children.length > 1) continue;
    return cel;
  }
  return null;
}

export function injectBadgeOnLink(a, rating, productName, currentSlug) {
  if (a.getAttribute('data-ikr-badge')) return;
  if (!isVisibleForBadge(a)) return;
  var adapter = getThemeAdapter();
  var slug = extractSlug(a.href);

  if (a.id === 'ikr-rating-badge') { a.setAttribute('data-ikr-badge', '1'); return; }
  if (slug === currentSlug && a.getAttribute('href') && a.getAttribute('href').charAt(0) === '#') { a.setAttribute('data-ikr-badge', '1'); return; }
  if (adapter.isNavigationLink(a)) { a.setAttribute('data-ikr-badge', '1'); return; }
  if (adapter.isCartLink(a)) { a.setAttribute('data-ikr-badge', '1'); return; }
  if (adapter.isDisallowedSingleProductLink(a, currentSlug, slug)) { a.setAttribute('data-ikr-badge', '1'); return; }
  if (adapter.isBannerLink(a)) { a.setAttribute('data-ikr-badge', '1'); return; }

  var hasNestedA = !!a.querySelector('a[href]');
  var realText = Array.from(a.childNodes).filter(function(n) { return n.nodeType === 3; }).map(function(n) { return n.textContent.trim(); }).join('').trim();
  var hasTitleEl = !!findTitleEl(a, productName);

  if (!realText && !hasTitleEl && !hasNestedA) { a.setAttribute('data-ikr-badge', '1'); return; }

  a.setAttribute('data-ikr-badge', '1');

  if (hasNestedA) {
    a.querySelectorAll('a[href]').forEach(function(inner) { inner.setAttribute('data-ikr-badge', '1'); });
    var nameEl = findTitleEl(a, productName);
    if (!nameEl || nameEl.querySelector('[data-ikr-listing-badge]')) return;
    var justify = window.getComputedStyle(nameEl).textAlign;
    nameEl.appendChild(createBadgeEl(rating, justify === 'center' ? 'center' : justify === 'right' ? 'flex-end' : 'flex-start'));
    return;
  }

  var titleEl = findTitleEl(a, productName);
  if (titleEl && titleEl.querySelector('[data-ikr-listing-badge]')) return;

  if (titleEl) {
    var tAlign = window.getComputedStyle(titleEl).textAlign;
    titleEl.appendChild(createBadgeEl(rating, tAlign === 'center' ? 'center' : tAlign === 'right' ? 'flex-end' : 'flex-start'));
  } else {
    var badge = createBadgeEl(rating, 'flex-start');
    var first = a.firstElementChild;
    first ? a.insertBefore(badge, first) : a.appendChild(badge);
  }
}

function injectModalBadge(slugNameMap, ratings) {
  var adapter = getThemeAdapter();
  var modal = adapter.findModal();
  if (!modal) return;
  var h1 = adapter.findModalTitle(modal);
  if (!h1 || h1.querySelector('[data-ikr-listing-badge]')) return;

  var slug = null;

  if (lastClickedSlug && ratings[lastClickedSlug]) {
    slug = lastClickedSlug;
  }

  if (!slug) {
    var pageSlug = extractSlug(window.location.pathname);
    if (pageSlug && ratings[pageSlug]) slug = pageSlug;
  }

  if (!slug) {
    var h1Text = h1.textContent.trim();
    Object.keys(slugNameMap).forEach(function(s) {
      if (slug) return;
      var name = slugNameMap[s];
      if (name && name.trim() === h1Text && ratings[s]) slug = s;
    });
  }

  if (!slug) {
    var spContainer = adapter.findSingleProductContainer();
    if (spContainer) {
      var spLink = spContainer.querySelector('a[href]');
      if (spLink) {
        var s = extractSlug(spLink.href);
        if (s && ratings[s]) slug = s;
      }
    }
  }

  if (!slug) {
    var h1Lower = h1.textContent.trim().toLowerCase();
    document.querySelectorAll('a[href]').forEach(function(a) {
      if (slug) return;
      if (adapter.isNavigationLink(a)) return;
      if (adapter.isInsideSingleProductContainer(a)) return;
      var aText = a.textContent.trim().toLowerCase();
      if (aText && aText === h1Lower) {
        var s2 = extractSlug(a.href);
        if (s2 && ratings[s2]) slug = s2;
      }
    });
  }

  if (!slug || !ratings[slug] || ratings[slug]._empty || ratings[slug].count === 0) return;
  h1.appendChild(createBadgeEl(ratings[slug], 'flex-start'));
}

export function injectBadges(slugNameMap, ratings) {
  var adapter = getThemeAdapter();
  var currentSlug = extractSlug(window.location.pathname);
  var containers = adapter.findListingContainers();
  var links = [];

  containers.forEach(function(c) {
    if (c.tagName === 'A' && c.href) {
      if (!isVisibleForBadge(c)) return;
      links.push(c);
    } else {
      c.querySelectorAll('a[href]').forEach(function(a) {
        if (isVisibleForBadge(a)) links.push(a);
      });
    }
  });

  Object.keys(slugNameMap).forEach(function(slug) {
    var rating = ratings[slug];
    if (!rating || rating._empty || rating.count === 0) return;
    var productName = slugNameMap[slug];
    links.forEach(function(a) {
      if (extractSlug(a.href) !== slug) return;
      injectBadgeOnLink(a, rating, productName, currentSlug);
    });
  });

  injectModalBadge(slugNameMap, ratings);
}

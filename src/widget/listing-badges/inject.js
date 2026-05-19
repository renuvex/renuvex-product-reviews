// listing-badges/inject.js - inject listing badges into product cards.

import { extractSlug } from '../core/helpers.js';
import { createBadgeEl, createBadgePlaceholderEl } from '../core/badge.js';
import { getThemeAdapter } from '../themes/current-adapter.js';
import { lastClickedSlug } from '../core/state.js';
import { collectListingLinks, isVisibleForBadge } from './dom.js';

var TITLE_CLASS_SELECTOR = '[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]';
var STOCK_LABELS = /^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;

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

function shouldSkipLink(a, adapter, currentSlug, slug) {
  if (!slug) return true;
  if (!isVisibleForBadge(a)) return true;
  if (a.id === 'ikr-rating-badge') return true;
  if (slug === currentSlug && a.getAttribute('href') && a.getAttribute('href').charAt(0) === '#') return true;
  if (adapter.isNavigationLink(a)) return true;
  if (adapter.isCartLink(a)) return true;
  if (adapter.isDisallowedSingleProductLink(a, currentSlug, slug)) return true;
  if (adapter.isBannerLink(a)) return true;
  return false;
}

function getJustify(el) {
  var align = window.getComputedStyle(el).textAlign;
  return align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';
}

function replacePlaceholderOrAppend(parent, badge) {
  var placeholder = parent.querySelector('[data-ikr-listing-badge-placeholder]');
  if (placeholder) {
    placeholder.replaceWith(badge);
    return;
  }
  parent.appendChild(badge);
}

function insertPlaceholder(parent, justify, beforeEl) {
  if (!parent || parent.querySelector('[data-ikr-listing-badge],[data-ikr-listing-badge-placeholder]')) return;
  var placeholder = createBadgePlaceholderEl(justify);
  beforeEl ? parent.insertBefore(placeholder, beforeEl) : parent.appendChild(placeholder);
}

function reserveBadgeSlotOnLink(a, productName, currentSlug) {
  if (a.getAttribute('data-ikr-badge')) return;
  var adapter = getThemeAdapter();
  var slug = extractSlug(a.href);
  if (shouldSkipLink(a, adapter, currentSlug, slug)) return;

  var hasNestedA = !!a.querySelector('a[href]');
  var titleEl = findTitleEl(a, productName);
  var realText = Array.from(a.childNodes).filter(function(n) { return n.nodeType === 3; }).map(function(n) { return n.textContent.trim(); }).join('').trim();

  if (!realText && !titleEl && !hasNestedA) return;

  if (hasNestedA) {
    if (!titleEl) return;
    insertPlaceholder(titleEl, getJustify(titleEl));
    return;
  }

  if (titleEl) {
    insertPlaceholder(titleEl, getJustify(titleEl));
    return;
  }

  if (realText) insertPlaceholder(a, 'flex-start', a.firstElementChild || null);
}

export function reserveBadgeSlots(slugNameMap) {
  var currentSlug = extractSlug(window.location.pathname);
  var links = collectListingLinks(getThemeAdapter());

  Object.keys(slugNameMap).forEach(function(slug) {
    var productName = slugNameMap[slug];
    links.forEach(function(a) {
      if (extractSlug(a.href) !== slug) return;
      reserveBadgeSlotOnLink(a, productName, currentSlug);
    });
  });
}

export function clearBadgePlaceholders() {
  document.querySelectorAll('[data-ikr-listing-badge-placeholder]').forEach(function(el) { el.remove(); });
}

export function injectBadgeOnLink(a, rating, productName, currentSlug, iconPair) {
  if (a.getAttribute('data-ikr-badge')) return;
  var adapter = getThemeAdapter();
  var slug = extractSlug(a.href);

  if (shouldSkipLink(a, adapter, currentSlug, slug)) { a.setAttribute('data-ikr-badge', '1'); return; }

  var hasNestedA = !!a.querySelector('a[href]');
  var realText = Array.from(a.childNodes).filter(function(n) { return n.nodeType === 3; }).map(function(n) { return n.textContent.trim(); }).join('').trim();
  var hasTitleEl = !!findTitleEl(a, productName);

  if (!realText && !hasTitleEl && !hasNestedA) { a.setAttribute('data-ikr-badge', '1'); return; }

  a.setAttribute('data-ikr-badge', '1');

  if (hasNestedA) {
    a.querySelectorAll('a[href]').forEach(function(inner) { inner.setAttribute('data-ikr-badge', '1'); });
    var nameEl = findTitleEl(a, productName);
    if (!nameEl || nameEl.querySelector('[data-ikr-listing-badge]')) return;
    replacePlaceholderOrAppend(nameEl, createBadgeEl(rating, getJustify(nameEl), iconPair));
    return;
  }

  var titleEl = findTitleEl(a, productName);
  if (titleEl && titleEl.querySelector('[data-ikr-listing-badge]')) return;

  if (titleEl) {
    replacePlaceholderOrAppend(titleEl, createBadgeEl(rating, getJustify(titleEl), iconPair));
  } else {
    var badge = createBadgeEl(rating, 'flex-start', iconPair);
    var placeholder = a.querySelector('[data-ikr-listing-badge-placeholder]');
    if (placeholder) { placeholder.replaceWith(badge); return; }
    var first = a.firstElementChild;
    first ? a.insertBefore(badge, first) : a.appendChild(badge);
  }
}

function injectModalBadge(slugNameMap, ratings, iconPair) {
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
    collectListingLinks(adapter).forEach(function(a) {
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
  h1.appendChild(createBadgeEl(ratings[slug], 'flex-start', iconPair));
}

export function injectBadges(slugNameMap, ratings, iconPair) {
  var adapter = getThemeAdapter();
  var currentSlug = extractSlug(window.location.pathname);
  var links = collectListingLinks(adapter).filter(isVisibleForBadge);

  Object.keys(slugNameMap).forEach(function(slug) {
    var rating = ratings[slug];
    if (!rating || rating._empty || rating.count === 0) return;
    var productName = slugNameMap[slug];
    links.forEach(function(a) {
      if (extractSlug(a.href) !== slug) return;
      injectBadgeOnLink(a, rating, productName, currentSlug, iconPair);
    });
  });

  clearBadgePlaceholders();
  injectModalBadge(slugNameMap, ratings, iconPair);
}

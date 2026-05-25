// listing-badges/inject.js - inject listing badges into product cards.

import { extractSlug } from '../core/helpers.js';
import { createBadgeEl, createBadgePlaceholderEl } from '../core/badge.js';
import { getThemeAdapter } from '../themes/current-adapter.js';
import { lastClickedSlug } from '../core/state.js';
import { isSiblingMountEnabled } from '../core/rollout.js';
import { probeWidgetVisibility, watchOneTimeRemoval } from '../core/health.js';
import { getAfterElementMountPoint, placeOwnedSlot, watchOwnedSlotPosition } from '../core/slot-position.js';
import { collectListingLinks, isVisibleForBadge } from './dom.js';

var listingBadgeRemovalObservers = [];
var listingBadgePositionObservers = [];

function watchListingBadgeRemoval(root, surface, remount, extra) {
  var observer = watchOneTimeRemoval(root, surface, remount, extra);
  if (observer) listingBadgeRemovalObservers.push(observer);
}

function watchListingBadgePosition(root, mountPoint, extra) {
  var observer = watchOwnedSlotPosition(root, mountPoint, {
    surface: 'listing-badge',
    reason: 'position_reanchored',
    message: 'Listing badge slot reordered after render',
    extra: extra || {},
  });
  if (observer) listingBadgePositionObservers.push(observer);
}

export function disconnectListingBadgeRemovalObservers() {
  listingBadgeRemovalObservers.forEach(function(observer) { observer.disconnect(); });
  listingBadgePositionObservers.forEach(function(observer) { observer.disconnect(); });
  listingBadgeRemovalObservers = [];
  listingBadgePositionObservers = [];
}

// resolveMount — listing badge için yerleştirme hedefi.
// Sıra (ADR_0017 draft):
//   1. Adapter `getListingBadgeMountPoint(titleEl)` override eder → o eleman.
//   2. isSiblingMountEnabled() true → titleEl'in next sibling'i (h2'nin yanına, dışına).
//   3. Aksi halde → titleEl içine (legacy davranış, h2 içinde div).
// Allowlist gate'i (core/rollout.js) deploy 1'de yalnızca dev store'u sibling'e
// alır; üretim default olarak legacy yolda kalır (deploy 2'de default flip).
function resolveMount(titleEl) {
  var adapter = getThemeAdapter();
  var custom = adapter.getListingBadgeMountPoint(titleEl);
  if (custom && custom.parent) return custom;
  if (custom) return { parent: custom, beforeEl: null, position: 'before' };
  if (isSiblingMountEnabled() && titleEl && titleEl.parentNode) {
    return getAfterElementMountPoint(titleEl);
  }
  return { parent: titleEl, beforeEl: null, position: 'before' };
}

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
  if (a.id === 'renuvex-pr-rating-badge') return true;
  if (slug === currentSlug && a.getAttribute('href') && a.getAttribute('href').charAt(0) === '#') return true;
  if (adapter.isNavigationLink(a)) return true;
  if (adapter.isCartLink(a)) return true;
  if (adapter.isDisallowedSingleProductLink(a, currentSlug, slug)) return true;
  if (adapter.isBannerLink(a)) return true;
  return false;
}

function isLinkProcessed(a) {
  return !!(a && (a.getAttribute('data-renuvex-badge')));
}

function markLinkProcessed(a) {
  if (!a) return;
  a.setAttribute('data-renuvex-badge', '1');
}

function getJustify(el) {
  var align = window.getComputedStyle(el).textAlign;
  return align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';
}

function matchesListingContext(node, slug, productId) {
  if (!node) return false;
  if (slug && node.getAttribute('data-renuvex-product-slug') !== String(slug)) return false;
  if (productId && node.getAttribute('data-renuvex-product-id') !== String(productId)) return false;
  return true;
}

function findOwnedListingNode(parent, slotName, slug, productId) {
  if (!parent) return null;
  var selector = '[data-renuvex-slot="' + slotName + '"]';
  var nodes = parent.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; i++) {
    if (matchesListingContext(nodes[i], slug, productId)) return nodes[i];
  }
  return null;
}

function hasOwnedListingBadge(parent, slug, productId) {
  return !!findOwnedListingNode(parent, 'listing-rating', slug, productId);
}

function hasOwnedListingPlaceholder(parent, slug, productId) {
  return !!findOwnedListingNode(parent, 'listing-rating-placeholder', slug, productId);
}

function hasOwnedListingSlot(parent, slug, productId) {
  return hasOwnedListingBadge(parent, slug, productId) || hasOwnedListingPlaceholder(parent, slug, productId);
}

function replacePlaceholderOrPlace(mountPoint, badge, slug) {
  if (!mountPoint || !mountPoint.parent) return null;
  var placeholder = findOwnedListingNode(mountPoint.parent, 'listing-rating-placeholder', slug, null);
  if (placeholder) {
    placeholder.replaceWith(badge);
  } else {
    placeOwnedSlot(badge, mountPoint);
  }
  placeOwnedSlot(badge, mountPoint);
  return badge;
}

function insertPlaceholder(mountPoint, justify, slug, productId) {
  if (!mountPoint || !mountPoint.parent || hasOwnedListingSlot(mountPoint.parent, slug, productId)) return;
  var placeholder = createBadgePlaceholderEl(justify, { slug: slug || '', productId: productId || '' });
  placeOwnedSlot(placeholder, mountPoint);
}

function createListingBadge(rating, justify, iconPair, slug) {
  var productId = rating && rating._productId ? rating._productId : '';
  return createBadgeEl(rating, justify, iconPair, { slug: slug || '', productId: productId });
}

function setupListingBadgeGuards(badge, mountPoint, slug, remount) {
  if (!badge || !mountPoint || !mountPoint.parent) return;
  var extra = { slug: slug || '' };
  probeWidgetVisibility(badge, 'listing-badge', extra, function () {
    return mountPoint.parent ? findOwnedListingNode(mountPoint.parent, 'listing-rating', slug, null) : null;
  });
  watchListingBadgePosition(badge, mountPoint, extra);
  watchListingBadgeRemoval(badge, 'listing-badge', function () {
    if (!mountPoint.parent || hasOwnedListingBadge(mountPoint.parent, slug)) return;
    remount();
  }, extra);
}

function reserveBadgeSlotOnLink(a, productName, currentSlug) {
  if (isLinkProcessed(a)) return;
  var adapter = getThemeAdapter();
  var slug = extractSlug(a.href);
  if (shouldSkipLink(a, adapter, currentSlug, slug)) return;

  var hasNestedA = !!a.querySelector('a[href]');
  var titleEl = findTitleEl(a, productName);
  var realText = Array.from(a.childNodes).filter(function(n) { return n.nodeType === 3; }).map(function(n) { return n.textContent.trim(); }).join('').trim();

  if (!realText && !titleEl && !hasNestedA) return;

  if (hasNestedA) {
    if (!titleEl) return;
    var mountNested = resolveMount(titleEl);
    insertPlaceholder(mountNested, getJustify(titleEl), slug);
    return;
  }

  if (titleEl) {
    var mountTitle = resolveMount(titleEl);
    insertPlaceholder(mountTitle, getJustify(titleEl), slug);
    return;
  }

  if (realText) insertPlaceholder({ parent: a, beforeEl: a.firstElementChild || null, position: 'before' }, 'flex-start', slug);
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
  document.querySelectorAll('[data-renuvex-listing-badge-placeholder]').forEach(function(el) { el.remove(); });
}

export function injectBadgeOnLink(a, rating, productName, currentSlug, iconPair) {
  if (isLinkProcessed(a)) return;
  var adapter = getThemeAdapter();
  var slug = extractSlug(a.href);

  if (shouldSkipLink(a, adapter, currentSlug, slug)) { markLinkProcessed(a); return; }

  var hasNestedA = !!a.querySelector('a[href]');
  var realText = Array.from(a.childNodes).filter(function(n) { return n.nodeType === 3; }).map(function(n) { return n.textContent.trim(); }).join('').trim();
  var hasTitleEl = !!findTitleEl(a, productName);

  if (!realText && !hasTitleEl && !hasNestedA) { markLinkProcessed(a); return; }

  markLinkProcessed(a);

  if (hasNestedA) {
    a.querySelectorAll('a[href]').forEach(markLinkProcessed);
    var nameEl = findTitleEl(a, productName);
    if (!nameEl) return;
    var mountNested = resolveMount(nameEl);
    if (mountNested.parent && hasOwnedListingBadge(mountNested.parent, slug)) return;
    var nestedBadge = replacePlaceholderOrPlace(mountNested, createListingBadge(rating, getJustify(nameEl), iconPair, slug), slug);
    if (nestedBadge) {
      setupListingBadgeGuards(nestedBadge, mountNested, slug, function () {
        replacePlaceholderOrPlace(mountNested, createListingBadge(rating, getJustify(nameEl), iconPair, slug), slug);
      });
    }
    return;
  }

  var titleEl = findTitleEl(a, productName);
  var mountTitle = titleEl ? resolveMount(titleEl) : null;
  if (mountTitle && mountTitle.parent && hasOwnedListingBadge(mountTitle.parent, slug)) return;

  if (titleEl) {
    var titleBadge = replacePlaceholderOrPlace(mountTitle, createListingBadge(rating, getJustify(titleEl), iconPair, slug), slug);
    if (titleBadge) {
      setupListingBadgeGuards(titleBadge, mountTitle, slug, function () {
        replacePlaceholderOrPlace(mountTitle, createListingBadge(rating, getJustify(titleEl), iconPair, slug), slug);
      });
    }
  } else {
    var fallbackMount = { parent: a, beforeEl: a.firstElementChild || null, position: 'before' };
    if (hasOwnedListingBadge(a, slug)) return;
    var badge = replacePlaceholderOrPlace(fallbackMount, createListingBadge(rating, 'flex-start', iconPair, slug), slug);
    if (badge) {
      setupListingBadgeGuards(badge, fallbackMount, slug, function () {
        replacePlaceholderOrPlace(fallbackMount, createListingBadge(rating, 'flex-start', iconPair, slug), slug);
      });
    }
  }
}

function injectModalBadge(slugNameMap, ratings, iconPair) {
  var adapter = getThemeAdapter();
  var modal = adapter.findModal();
  if (!modal) return;
  var h1 = adapter.findModalTitle(modal);
  if (!h1 || h1.querySelector('[data-renuvex-listing-badge]')) return;

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
  var modalBadge = createBadgeEl(ratings[slug], 'flex-start', iconPair, { slug: slug || '' });
  h1.appendChild(modalBadge);
  probeWidgetVisibility(modalBadge, 'listing-modal-badge', { slug: slug || '' }, function () {
    return h1 && h1.isConnected ? h1.querySelector('[data-renuvex-listing-badge]') : null;
  });
  watchListingBadgeRemoval(modalBadge, 'listing-modal-badge', function () {
    if (!h1.isConnected || h1.querySelector('[data-renuvex-listing-badge]')) return;
    h1.appendChild(createBadgeEl(ratings[slug], 'flex-start', iconPair, { slug: slug || '' }));
  }, { slug: slug || '' });
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

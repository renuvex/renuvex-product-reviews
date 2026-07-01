// core/listing-viewport-gate.js - viewport-aware hydration gate for listing badges.
//
// Keeps below-the-fold listing/product-slider badge work from loading its chunk
// or read API until the product cards approach the viewport. Critical PDP
// surfaces stay outside this gate.

import { extractSlug, SYSTEM_SLUGS } from './helpers.js';
import { collectLinksFromScopes, getMainContentScopes } from './link-scope.js';
import { loadListingBadgesModule } from './lazy-modules.js';
import { ls } from './state.js';
import { getThemeAdapter } from '../themes/current-adapter.js';

var LISTING_VIEWPORT_ROOT_MARGIN = '900px 0px';
var LISTING_VIEWPORT_MARGIN_PX = 900;
var listingViewportObserver = null;
var observedTargets = [];
var scheduledHydrationPromise = null;
var viewportFallbackBound = false;

function renderListingBadgesNow() {
  if (scheduledHydrationPromise) return scheduledHydrationPromise;
  ls.viewportScheduled = false;
  disconnectListingViewportGate();
  scheduledHydrationPromise = loadListingBadgesModule().then(function (mod) {
    return mod.renderListingBadges();
  }).finally(function () {
    scheduledHydrationPromise = null;
  });
  return scheduledHydrationPromise;
}

function isTargetNearViewport(target) {
  if (!target || typeof target.getBoundingClientRect !== 'function') return false;
  var rect = target.getBoundingClientRect();
  var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  var viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;

  return rect.bottom >= -LISTING_VIEWPORT_MARGIN_PX
    && rect.top <= viewportHeight + LISTING_VIEWPORT_MARGIN_PX
    && rect.right >= 0
    && rect.left <= viewportWidth;
}

function hasNearViewportTarget() {
  return observedTargets.some(function (target) {
    return isTargetNearViewport(target);
  });
}

function onViewportFallbackCheck() {
  if (!hasNearViewportTarget()) return;
  renderListingBadgesNow().catch(function (err) {
    console.error('[renuvex-pr] listing badge viewport fallback render error:', err);
  });
}

function bindViewportFallbackListeners() {
  if (viewportFallbackBound || typeof window === 'undefined' || typeof window.addEventListener !== 'function') return;
  viewportFallbackBound = true;
  window.addEventListener('scroll', onViewportFallbackCheck, { passive: true });
  window.addEventListener('resize', onViewportFallbackCheck);
}

function unbindViewportFallbackListeners() {
  if (!viewportFallbackBound || typeof window === 'undefined' || typeof window.removeEventListener !== 'function') return;
  window.removeEventListener('scroll', onViewportFallbackCheck);
  window.removeEventListener('resize', onViewportFallbackCheck);
  viewportFallbackBound = false;
}

function isProductCandidateLink(anchor, adapter) {
  try {
    if (!anchor || anchor.getAttribute('data-renuvex-badge')) return false;
    if (anchor.closest('[data-renuvex-slot],[data-renuvex-listing-badge],#renuvex-pr-reviews-widget,#renuvex-pr-rating-badge')) return false;
    if (adapter && (adapter.isNavigationLink(anchor) || adapter.isCartLink(anchor) || adapter.isBannerLink(anchor))) return false;
    var href = anchor.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#' || href.charAt(0) === '?') return false;
    var slug = extractSlug(anchor.href);
    return !!(slug && slug.length >= 3 && !SYSTEM_SLUGS.test(slug));
  } catch (_) {
    return false;
  }
}

function hasProductCandidateLink(scope, adapter) {
  if (!scope) return false;
  if (scope.tagName === 'A' && isProductCandidateLink(scope, adapter)) return true;
  if (typeof scope.querySelectorAll !== 'function') return false;
  return Array.from(scope.querySelectorAll('a[href]')).some(function (anchor) {
    return isProductCandidateLink(anchor, adapter);
  });
}

function getCandidateRoot(anchor) {
  var node = anchor ? anchor.parentElement : null;
  var depth = 0;
  while (node && node !== document.body && depth < 5) {
    if (node.querySelector && node.querySelector('img,picture')) return node;
    node = node.parentElement;
    depth++;
  }
  return anchor;
}

function pushTarget(targets, seen, target) {
  if (!target || seen.indexOf(target) !== -1) return;
  seen.push(target);
  targets.push(target);
}

function collectViewportTargets() {
  var adapter = getThemeAdapter();
  var containers = adapter && adapter.findListingContainers
    ? adapter.findListingContainers()
    : [];
  var targets = [];
  var seen = [];

  if (containers && containers.length) {
    containers.forEach(function (container) {
      if (hasProductCandidateLink(container, adapter)) pushTarget(targets, seen, container);
    });
    return targets;
  }

  collectLinksFromScopes(getMainContentScopes()).forEach(function (anchor) {
    if (!isProductCandidateLink(anchor, adapter)) return;
    pushTarget(targets, seen, getCandidateRoot(anchor));
  });

  return targets;
}

function ensureListingViewportObserver() {
  if (listingViewportObserver || typeof IntersectionObserver === 'undefined') return listingViewportObserver;
  listingViewportObserver = new IntersectionObserver(function (entries) {
    var shouldHydrate = entries.some(function (entry) {
      return entry.isIntersecting || entry.intersectionRatio > 0;
    });
    if (!shouldHydrate) return;
    renderListingBadgesNow().catch(function (err) {
      console.error('[renuvex-pr] listing badge viewport render error:', err);
    });
  }, {
    root: null,
    rootMargin: LISTING_VIEWPORT_ROOT_MARGIN,
    threshold: 0,
  });
  return listingViewportObserver;
}

export function disconnectListingViewportGate() {
  if (listingViewportObserver) {
    listingViewportObserver.disconnect();
    listingViewportObserver = null;
  }
  unbindViewportFallbackListeners();
  observedTargets = [];
}

export function scheduleListingBadgeHydration() {
  if (scheduledHydrationPromise) return scheduledHydrationPromise;
  if (ls.inProgress) { ls.queued = true; return Promise.resolve(); }
  if (ls.rendered) return Promise.resolve();

  var targets = collectViewportTargets();
  if (!targets.length) {
    ls.viewportScheduled = false;
    return Promise.resolve();
  }

  if (typeof IntersectionObserver === 'undefined') {
    return renderListingBadgesNow();
  }

  var observer = ensureListingViewportObserver();
  if (!observer) return renderListingBadgesNow();

  ls.viewportScheduled = true;
  targets.forEach(function (target) {
    if (observedTargets.indexOf(target) !== -1) return;
    observedTargets.push(target);
    observer.observe(target);
  });

  if (hasNearViewportTarget()) return renderListingBadgesNow();
  bindViewportFallbackListeners();

  return Promise.resolve();
}

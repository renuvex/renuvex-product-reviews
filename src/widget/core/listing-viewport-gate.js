// core/listing-viewport-gate.js - viewport-aware hydration gate for listing badges.
//
// Keeps below-the-fold listing/product-slider badge work from loading its chunk
// or read API until the product cards approach the viewport. Critical PDP
// surfaces stay outside this gate.

import { loadListingBadgesModule } from './lazy-modules.js';
import { ls } from './state.js';
import { fetchSettings } from './settings.js';
import { isAutoPlacementEnabled } from '../themes/current-adapter.js';
import { collectRuntimeDetectableListingProofs } from '../placement/capability.js';

var LISTING_VIEWPORT_ROOT_MARGIN = '400px 0px';
var LISTING_VIEWPORT_MARGIN_PX = 400;
var listingViewportObserver = null;
var observedTargets = [];
var scheduledHydrationPromise = null;
var viewportFallbackBound = false;

function renderListingBadgesNow() {
  if (scheduledHydrationPromise) return scheduledHydrationPromise;
  ls.viewportScheduled = false;
  disconnectListingViewportGate();
  scheduledHydrationPromise = fetchSettings().then(function (settings) {
    if (!settings || !isAutoPlacementEnabled()) return;
    return loadListingBadgesModule();
  }).then(function (mod) {
    return mod ? mod.renderListingBadges() : undefined;
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

function pushTarget(targets, seen, target) {
  if (!target || seen.indexOf(target) !== -1) return;
  seen.push(target);
  targets.push(target);
}

function collectViewportTargets() {
  var targets = [];
  var seen = [];
  collectRuntimeDetectableListingProofs().forEach(function (proof) {
    pushTarget(targets, seen, proof.cardEl || proof.containerEl);
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

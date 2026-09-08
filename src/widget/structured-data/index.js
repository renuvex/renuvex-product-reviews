// structured-data/index.js - Product AggregateRating JSON-LD surface.
//
// SEO structured data is independent from visual badge styling, but it still
// represents visible rating/review content per Google's structured data
// policies. Therefore this surface emits only after an eligible Renuvex rating
// surface is visible or expected to be visible on the PDP.

import { fetchRatingSummary } from '../core/rating-summary.js';
import { fetchSettings } from '../core/settings.js';
import { isAutoPlacementEnabled, isReviewsMountEnabled } from '../themes/current-adapter.js';
import { buildProductAggregateRatingJsonLd, cleanupStructuredDataDom, injectProductAggregateRatingJsonLd } from './jsonld.js';
import {
  getStorefrontContextEpoch,
  isStorefrontContextCurrent,
  onStorefrontContextInvalidated,
} from '../core/context-epoch.js';

var VISIBLE_SURFACE_WAIT_MS = 4000;

function currentPathname() {
  try {
    return window.location && window.location.pathname ? window.location.pathname : '';
  } catch (_) {
    return '';
  }
}

function hasReviewsMount() {
  return !!document.querySelector('[data-renuvex-widget="reviews"]');
}

function hasVisibleReviewSection() {
  var anchor = document.querySelector('[data-renuvex-widget="reviews"]');
  var slot = anchor && anchor.querySelector('[data-renuvex-slot="product-reviews"]');
  var container = slot && slot.querySelector('#renuvex-reviews');
  var root = container && container.shadowRoot;
  return !!(root && root.querySelector('#renuvex-reviews-widget'));
}

function hasVisiblePdpBadge() {
  return !!document.querySelector('[data-renuvex-slot="product-title-rating"] .renuvex-pr-rating-badge--pdp');
}

function hasVisibleRatingSurface() {
  return hasVisiblePdpBadge() || hasVisibleReviewSection();
}

function waitForVisibleRatingSurface() {
  if (hasVisibleRatingSurface()) return Promise.resolve(true);
  return new Promise(function (resolve) {
    var done = false;
    var observer = null;
    var timer = null;
    var unsubscribe = onStorefrontContextInvalidated(function () { finish(false); });

    function finish(value) {
      if (done) return;
      done = true;
      if (observer) observer.disconnect();
      if (timer) clearTimeout(timer);
      unsubscribe();
      resolve(value);
    }

    observer = new MutationObserver(function () {
      if (hasVisibleRatingSurface()) finish(true);
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    timer = setTimeout(function () {
      finish(hasVisibleRatingSurface());
    }, VISIBLE_SURFACE_WAIT_MS);
  });
}

async function renderInternal(productId, productName, expectedEpoch) {
  var startedPathname = currentPathname();
  var epoch = expectedEpoch || getStorefrontContextEpoch();
  cleanupStructuredDataDom();

  var response = await fetchSettings();
  if (!response) return;

  var widgets = response.widgets || {};
  var reviewsSettings = widgets.reviews || {};
  var badgeSettings = widgets.badge || {};
  if (reviewsSettings.richSnippetsEnabled === false) return;

  var reviewsSurfaceExpected =
    reviewsSettings.enabled !== false &&
    isReviewsMountEnabled() &&
    hasReviewsMount();
  var badgeSurfaceExpected =
    badgeSettings.enabled !== false &&
    isAutoPlacementEnabled();

  if (!reviewsSurfaceExpected && !badgeSurfaceExpected) return;

  var visible = await waitForVisibleRatingSurface();
  if (!visible) return;
  if (!isStorefrontContextCurrent(epoch)) return;
  if (startedPathname && currentPathname() !== startedPathname) return;

  var summary = await fetchRatingSummary(productId);
  if (!summary) return;
  if (!isStorefrontContextCurrent(epoch)) return;
  if (startedPathname && currentPathname() !== startedPathname) return;

  injectProductAggregateRatingJsonLd(buildProductAggregateRatingJsonLd({
    productName: productName,
    productId: productId,
    ratingValue: summary.avg,
    reviewCount: summary.count,
  }));
}

export async function renderStructuredData(productId, productName, expectedEpoch) {
  if (!productId) return;
  try {
    await renderInternal(productId, productName, expectedEpoch);
  } catch (err) {
    console.error('[renuvex-pr] structured data surface error:', err);
  }
}


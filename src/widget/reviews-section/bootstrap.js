// reviews-section/bootstrap.js - reviews mount gate and PDP render orchestration.

import { fetchSettings } from '../core/settings.js';
import { getProductContext } from '../core/storefront-context.js';
import { resetReviewStateForProduct, setMediaStripReviews } from '../core/state.js';
import { createReviewsFetchError, fetchImageMediaGalleryReviews, fetchMixedMediaGalleryReviews, fetchReviews } from './reviews-api.js';

var bootstrapCache = {};
var bootstrapSeq = 0;

function loadRenderModule() {
  return import('./render.js');
}

function currentPathname() {
  try {
    return window.location && window.location.pathname ? window.location.pathname : '';
  } catch (_) {
    return '';
  }
}

function isPreviewMode() {
  return typeof window !== 'undefined' && window.__ikasPreviewMode === true;
}

function isCurrentBootstrap(token, productId, startedPathname) {
  if (token !== bootstrapSeq) return false;
  if (startedPathname && currentPathname() !== startedPathname) return false;
  if (isPreviewMode()) return true;
  var product = getProductContext();
  return !!(product && String(product.id) === String(productId));
}

export async function bootstrap(productId, productName) {
  if (bootstrapCache[productId]) return;
  bootstrapCache[productId] = true;
  bootstrapSeq++;
  var token = bootstrapSeq;
  var startedPathname = currentPathname();

  var FALLBACK = { title: 'M\u00fc\u015fteri Yorumlar\u0131', enabled: true };
  // Badge widget carries visibility + sizing only. Rating icon/color still
  // come from the reviews widget settings (ADR_0016).
  var BADGE_FALLBACK = { enabled: true, size: 'medium' };

  try {
    var response = await fetchSettings();
    if (!isCurrentBootstrap(token, productId, startedPathname)) return;
    if (!response) return;

    var reviewsSettings = (response.widgets && response.widgets.reviews) || FALLBACK;
    var badgeSettings = (response.widgets && response.widgets.badge) || BADGE_FALLBACK;
    if (reviewsSettings.enabled === false) return;

    // ADR_0024: review section is opt-in via an explicit mount. If the mount is
    // absent, stop before reviews/media-gallery fetches and before render.js loads.
    if (!document.querySelector('[data-renuvex-widget="reviews"]')) return;
    if (!isCurrentBootstrap(token, productId, startedPathname)) return;

    resetReviewStateForProduct(productId);

    var mediaGalleryFetch = reviewsSettings.videoReviewsEnabled === true
      ? fetchMixedMediaGalleryReviews(productId)
      : fetchImageMediaGalleryReviews(productId);
    var fetchResults = await Promise.all([
      fetchReviews(productId, 'newest', 1, null),
      mediaGalleryFetch,
    ]);
    if (!isCurrentBootstrap(token, productId, startedPathname)) return;

    var reviewsData = fetchResults[0];
    var renderModule = await loadRenderModule();
    if (!isCurrentBootstrap(token, productId, startedPathname)) return;

    setMediaStripReviews(fetchResults[1]);
    await renderModule.render(productId, reviewsSettings, reviewsData, productName, 'newest', 1, badgeSettings);
  } catch (err) {
    if (!isCurrentBootstrap(token, productId, startedPathname)) return;
    console.error('[renuvex-pr] bootstrap error:', err);
    // Render fetch-error state only when the merchant has an explicit mount.
    if (document.querySelector('[data-renuvex-widget="reviews"]')) {
      var fallbackRenderModule = await loadRenderModule();
      if (!isCurrentBootstrap(token, productId, startedPathname)) return;
      await fallbackRenderModule.render(productId, FALLBACK, createReviewsFetchError(), productName, undefined, undefined, BADGE_FALLBACK);
    }
  } finally {
    delete bootstrapCache[productId];
  }
}

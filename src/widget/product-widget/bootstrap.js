// product-widget/bootstrap.js - reviews mount gate and PDP render orchestration.

import { fetchSettings } from '../core/settings.js';
import { createReviewsFetchError, fetchPhotoStripReviews, fetchReviews } from './reviews-api.js';
import {
  setCurrentOrderBy, setCurrentPage, setCurrentRatingFilter,
  setPhotoStripReviews,
} from '../core/state.js';

var bootstrapCache = {};

function loadRenderModule() {
  return import('./render.js');
}

export async function bootstrap(productId, productName) {
  if (bootstrapCache[productId]) return;
  bootstrapCache[productId] = true;

  var FALLBACK = { title: 'Müşteri Yorumları', enabled: true };
  // Badge widget carries visibility + sizing only. Rating icon/color still
  // come from the reviews widget settings (ADR_0016).
  var BADGE_FALLBACK = { enabled: true, size: 'medium' };

  try {
    var response = await fetchSettings();
    if (!response) return;

    var reviewsSettings = (response.widgets && response.widgets.reviews) || FALLBACK;
    var badgeSettings = (response.widgets && response.widgets.badge) || BADGE_FALLBACK;
    if (reviewsSettings.enabled === false) return;

    // ADR_0024: review section is opt-in via an explicit mount. If the mount is
    // absent, stop before reviews/photoStrip fetches and before render.js loads.
    if (!document.querySelector('[data-renuvex-widget="reviews"]')) return;

    setCurrentOrderBy('newest');
    setCurrentPage(1);
    setCurrentRatingFilter(null);

    var fetchResults = await Promise.all([
      fetchReviews(productId, 'newest', 1, null),
      fetchPhotoStripReviews(productId),
    ]);
    var reviewsData = fetchResults[0];
    setPhotoStripReviews(fetchResults[1]);
    var renderModule = await loadRenderModule();
    await renderModule.render(productId, reviewsSettings, reviewsData, productName, 'newest', 1, badgeSettings);
  } catch (err) {
    console.error('[renuvex-pr] bootstrap error:', err);
    // Render fetch-error state only when the merchant has an explicit mount.
    if (document.querySelector('[data-renuvex-widget="reviews"]')) {
      var fallbackRenderModule = await loadRenderModule();
      await fallbackRenderModule.render(productId, FALLBACK, createReviewsFetchError(), productName, undefined, undefined, BADGE_FALLBACK);
    }
  } finally {
    delete bootstrapCache[productId];
  }
}

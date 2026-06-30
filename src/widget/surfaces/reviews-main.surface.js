// surfaces/reviews-main.surface.js - PDP review block surface descriptor.
//
// Phase 2: the descriptor is intentionally light. The reviews-section module is
// imported only when a product context and explicit reviews mount are detected.

import { loadReviewsMainModule } from '../core/lazy-modules.js';

function hasExplicitReviewsMount() {
  return typeof document !== 'undefined' && !!document.querySelector('[data-renuvex-widget="reviews"]');
}

export var reviewsMainSurface = {
  key: 'reviews-main',
  detect: function (ctx) {
    return ctx.trigger === 'product' && !!(ctx.product && ctx.product.id) && hasExplicitReviewsMount();
  },
  mount: function (ctx) {
    return loadReviewsMainModule().then(function (mod) {
      mod.bootstrap(ctx.product.id, ctx.product.name);
    });
  },
};

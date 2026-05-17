// surfaces/reviews-main.surface.js - PDP review block surface descriptor.
//
// Phase 2: the descriptor is intentionally light. The product-widget module is
// imported only when a product context is detected.

import { loadReviewsMainModule } from '../core/lazy-modules.js';

export var reviewsMainSurface = {
  key: 'reviews-main',
  detect: function (ctx) {
    return ctx.trigger === 'product' && !!(ctx.product && ctx.product.id);
  },
  mount: function (ctx) {
    return loadReviewsMainModule().then(function (mod) {
      mod.bootstrap(ctx.product.id, ctx.product.name);
    });
  },
};

// surfaces/rating-badge.surface.js — PDP rating badge surface descriptor.
//
// ADR_0024: PDP rating badge is its own surface, independent of reviews-main.
// Both surfaces detect on ctx.trigger === 'product'; the registry mounts both
// when ProductView fires. Badge entry chunk is ~10 KB; review-section entry +
// content bundle is ~165 KB. Splitting lets a merchant who enables badge but
// does NOT add the review mount (<div data-renuvex-widget="reviews">) save
// the entire review-section bundle.

import { loadRatingBadgeModule } from '../core/lazy-modules.js';

export var ratingBadgeSurface = {
  key: 'rating-badge',
  detect: function (ctx) {
    return ctx.trigger === 'product' && !!(ctx.product && ctx.product.id);
  },
  mount: function (ctx) {
    return loadRatingBadgeModule().then(function (mod) {
      return mod.renderRatingBadge(ctx.product.id, ctx.product.name);
    });
  },
};

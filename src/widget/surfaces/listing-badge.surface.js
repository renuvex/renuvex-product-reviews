// surfaces/listing-badge.surface.js - listing badge surface descriptor.
//
// Phase 2: the listing badge module is lazy-loaded for page/listing contexts.
// The verified ikas events are:
// - VIEW_LISTING: category productDetails[]
// - VIEW_SEARCH_RESULTS: search productDetails[]

import { ls } from '../core/state.js';
import { loadListingBadgesModule } from '../core/lazy-modules.js';

export var listingBadgeSurface = {
  key: 'listing-badge',
  detect: function (ctx) {
    return ctx.trigger === 'page' || ctx.trigger === 'listing-products';
  },
  mount: function (ctx) {
    if (ctx.trigger === 'page') {
      // Page navigation: clean old badges atomically after fresh data is ready.
      ls.navCleanup = true;
    }
    // Listing/search product events can arrive after PAGE_VIEW. Re-run without
    // cleanup so newly available product names can improve placement fallback.
    ls.rendered = false;
    return loadListingBadgesModule().then(function (mod) {
      mod.renderListingBadges();
    });
  },
};

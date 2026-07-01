// surfaces/listing-badge.surface.js - listing badge surface descriptor.
//
// Phase 2: the listing badge module is lazy-loaded for listing-like page/listing contexts.
// The verified ikas events are:
// - VIEW_LISTING: category productDetails[]
// - VIEW_SEARCH_RESULTS: search productDetails[]

import { ls } from '../core/state.js';
import { scheduleListingBadgeHydration } from '../core/listing-viewport-gate.js';

var LISTING_PAGE_TYPES = {
  INDEX: true,
  CATEGORY: true,
  BRAND: true,
  SEARCH: true,
};

function isListingPageType(pageType) {
  if (!pageType) return false;
  return !!LISTING_PAGE_TYPES[String(pageType).toUpperCase()];
}

export var listingBadgeSurface = {
  key: 'listing-badge',
  detect: function (ctx) {
    return ctx.trigger === 'listing-products' ||
      (ctx.trigger === 'page' && isListingPageType(ctx.pageType));
  },
  mount: function (ctx) {
    if (ctx.trigger === 'page') {
      // Page navigation: clean old badges atomically after fresh data is ready.
      ls.navCleanup = true;
    }
    // Listing/search product events can arrive after PAGE_VIEW. Re-run without
    // cleanup so newly available product names can improve placement fallback.
    ls.rendered = false;
    return scheduleListingBadgeHydration();
  },
};

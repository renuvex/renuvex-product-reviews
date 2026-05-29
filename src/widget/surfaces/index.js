// surfaces/index.js - register core widget surfaces.
//
// Phase 2 registry members are lightweight descriptors. Heavy implementation
// modules are lazy-loaded from the descriptor mount() functions.
//
// Registration order matters: the registry iterates in push order. Surfaces
// that should render visibly first are registered first. ratingBadgeSurface
// is registered before reviewsMainSurface so the lightweight badge mount
// happens before the heavier review-section bootstrap (ADR_0024).

import { register } from '../core/registry.js';
import { ratingBadgeSurface } from './rating-badge.surface.js';
import { reviewsMainSurface } from './reviews-main.surface.js';
import { listingBadgeSurface } from './listing-badge.surface.js';
import { structuredDataSurface } from './structured-data.surface.js';

export function registerCoreSurfaces() {
  register(ratingBadgeSurface);
  register(reviewsMainSurface);
  register(structuredDataSurface);
  register(listingBadgeSurface);
}

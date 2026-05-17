// surfaces/index.js - register core widget surfaces.
//
// Phase 2 registry members are lightweight descriptors. Heavy implementation
// modules are lazy-loaded from the descriptor mount() functions.

import { register } from '../core/registry.js';
import { reviewsMainSurface } from './reviews-main.surface.js';
import { listingBadgeSurface } from './listing-badge.surface.js';

export function registerCoreSurfaces() {
  register(reviewsMainSurface);
  register(listingBadgeSurface);
}

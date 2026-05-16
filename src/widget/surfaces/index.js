// surfaces/index.js — Çekirdek widget yüzeylerini registry'ye kaydeder
//
// Phase 1 registry üyeliği: reviews-main + listing-badge.
// - rating-badge Phase 1'de yüzey DEĞİL: injectRatingBadge() render.js içinde
//   kalır (avg/count o render pass'inden geliyor — bağımsız mount çift fetch
//   veya sıralama yarışı doğurur). Phase 2'de bağımsız yüzey olacak.
// - review-form / media-gallery sayfa-bağlamıyla değil, reviews-main içinden
//   on-demand açılır; yüzey değil.
// Bkz. ADR_0013.

import { register } from '../core/registry.js';
import { reviewsMainSurface } from './reviews-main.surface.js';
import { listingBadgeSurface } from './listing-badge.surface.js';

export function registerCoreSurfaces() {
  register(reviewsMainSurface);
  register(listingBadgeSurface);
}

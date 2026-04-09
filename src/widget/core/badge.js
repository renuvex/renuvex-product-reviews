// core/badge.js — Merkezi listing badge factory
// Tüm widgetlar (listing, carousel, popup, modal) bu fonksiyonu kullanır.

import { starsHTML } from './helpers.js';

var BADGE_STAR_COLOR = 'var(--ikr-badge-color,#f59e0b)';

var BADGE_CSS = 'display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;font-weight:400;color:#555;pointer-events:none;';

/**
 * Listing badge DOM elementi oluşturur.
 * @param {{ avg: string, count: number }} rating
 * @param {'flex-start'|'center'|'flex-end'} justify
 * @returns {HTMLElement}
 */
export function createBadgeEl(rating, justify) {
  var el = document.createElement('div');
  el.setAttribute('data-ikr-listing-badge', '1');
  el.style.cssText = BADGE_CSS + 'justify-content:' + (justify || 'flex-start') + ';';
  el.innerHTML = '<span style="color:' + BADGE_STAR_COLOR + ';">' + '★'.repeat(Math.min(Math.round(parseFloat(rating.avg)) || 0, 5)) + '☆'.repeat(Math.max(5 - (Math.round(parseFloat(rating.avg)) || 0), 0)) + '</span>' + '<span style="font-weight:400;">' + rating.avg + ' (' + rating.count + ')</span>';
  return el;
}

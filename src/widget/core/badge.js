// core/badge.js — Merkezi listing badge factory
// Tüm widgetlar (listing, carousel, popup, modal) bu fonksiyonu kullanır.

import { getIconStyle } from '../icons.js';
import { partialStarsHTML } from './helpers.js';

var BADGE_STAR_COLOR = 'var(--ikr-badge-color,#f59e0b)';
var BADGE_ICON_SIZE = 13; // px

var BADGE_CSS = 'display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;font-weight:400;color:#555;pointer-events:none;';

function buildBadgeStars(rating) {
  // Listing badge — sabit olarak varsayılan star/classic + yarım yıldız desteği
  var pair = getIconStyle('star', 'classic');
  var sizeStyle = 'width:' + BADGE_ICON_SIZE + 'px;height:' + BADGE_ICON_SIZE + 'px;';
  return '<span style="color:' + BADGE_STAR_COLOR + ';display:inline-flex;align-items:center;">' +
           partialStarsHTML(rating, pair, { sizeStyle: sizeStyle }) +
         '</span>';
}

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
  el.innerHTML = buildBadgeStars(rating.avg) +
    '<span style="font-weight:400;">' + rating.avg + ' (' + rating.count + ')</span>';
  return el;
}

// icons/star-sprite.js — single SVG <symbol> sprite for rating stars.
//
// Why: the rating star is the most-repeated icon on every storefront surface.
// Inlining its full <path d="…"> per star bloated the live DOM (measured ~76 KB
// of duplicated path data on a busy PDP, ~4.6 KB per listing badge). This module
// defines the ACTIVE icon's geometry once as two <symbol>s (full + outline) and
// lets every read-only star render as a tiny <use href="#…"> reference.
//
// The icon geometry/color stay single-sourced from the ICONS registry (ADR_0016);
// only the delivery mechanism changes. Symbols are DERIVED from the same trusted
// SVG strings the admin preview also consumes, so there is one source of truth.
//
// Correct-by-construction: ensureStarSprite() runs at the top of every star
// renderer, BEFORE the returned <use> markup is inserted into the DOM, so a
// <use> can never resolve against a missing <symbol> (no race, no flag/gate).

export var STAR_SYMBOL_FULL_ID = 'ikr-sym-star-full';
export var STAR_SYMBOL_OUTLINE_ID = 'ikr-sym-star-outline';

var SPRITE_ID = 'ikr-icon-sprite';

// Turn one trusted ICONS SVG string into a <symbol> with the given id, keeping
// viewBox + fill/stroke presentation attrs so the rendered <use> is visually
// identical to the old inline <svg>. xmlns is dropped (the wrapping sprite <svg>
// carries it) and aria-hidden is dropped (the sprite root + each <use> set it).
function svgStringToSymbol(svgString, symbolId) {
  if (typeof svgString !== 'string') return '';
  return svgString
    .replace(/^\s*<svg\b/, '<symbol id="' + symbolId + '"')
    .replace(/\s+xmlns="[^"]*"/g, '')
    .replace(/\s+aria-hidden="[^"]*"/g, '')
    .replace(/<\/svg>\s*$/, '</symbol>');
}

// Cheap stable key so the sprite is re-injected only when the active icon
// actually changes (e.g. live preview icon swap). Keyed on the geometry itself.
function spriteKeyFor(iconPair) {
  var s = (iconPair.filled || '') + '|' + (iconPair.empty || '');
  var h = 0;
  for (var i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; }
  return (h >>> 0).toString(36);
}

// Inject (or refresh) the hidden sprite holding the active icon's two symbols.
// Idempotent: re-running with the same icon is a no-op; a changed icon swaps the
// symbol set in place. Built with DOMParser + importNode (no innerHTML).
export function ensureStarSprite(iconPair) {
  if (typeof document === 'undefined' || typeof DOMParser === 'undefined') return;
  if (!iconPair || !iconPair.filled || !iconPair.empty) return;

  var key = spriteKeyFor(iconPair);
  var sprite = document.getElementById(SPRITE_ID);
  if (sprite && sprite.getAttribute('data-ikr-icon-key') === key) return;

  var markup = '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">' +
    svgStringToSymbol(iconPair.filled, STAR_SYMBOL_FULL_ID) +
    svgStringToSymbol(iconPair.empty, STAR_SYMBOL_OUTLINE_ID) +
    '</svg>';

  var parsed = new DOMParser().parseFromString(markup, 'image/svg+xml');
  var svgEl = parsed && parsed.documentElement;
  // Bail if the parser produced an error document instead of an <svg> root.
  if (!svgEl || String(svgEl.nodeName).toLowerCase() !== 'svg') return;

  if (!sprite) {
    sprite = document.createElement('div');
    sprite.id = SPRITE_ID;
    sprite.setAttribute('aria-hidden', 'true');
    // Hide without display:none — display:none on the sprite container stops
    // some engines from rendering <use> references to its symbols.
    sprite.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';
    (document.body || document.documentElement).appendChild(sprite);
  } else {
    while (sprite.firstChild) sprite.removeChild(sprite.firstChild);
  }
  sprite.setAttribute('data-ikr-icon-key', key);
  sprite.appendChild(document.importNode(svgEl, true));
}

// Markup for one star as a <use> reference. state: 'full' | 'outline'.
// Sizing/color come from CSS (.ikr-star-svg + currentColor), same as before.
export function starUseSvg(state) {
  var id = state === 'outline' ? STAR_SYMBOL_OUTLINE_ID : STAR_SYMBOL_FULL_ID;
  return '<svg class="ikr-star-svg" viewBox="0 0 256 256" aria-hidden="true"><use href="#' + id + '"/></svg>';
}

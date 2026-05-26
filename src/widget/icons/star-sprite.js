// icons/star-sprite.js — unified SVG <symbol> sprite for ALL widget icons.
//
// Why: icons were inlined as full SVG markup at every use site. The rating star
// is the worst offender (repeated 5× per row across badges, cards, summary, bar
// chart — measured ~76 KB of duplicated path data on a busy PDP), but the goal
// here is one global icon system: every widget icon is defined once as a
// <symbol> and referenced via <use href="#…">.
//
// Single sprite container (`#renuvex-pr-icon-sprite`), symbols added individually and
// idempotently. The star symbols use fixed ids and are swapped in place when the
// merchant changes the icon (live preview) WITHOUT clobbering other icons'
// symbols. Generic one-off icons get a content-hashed id and are injected once.
//
// Correct-by-construction: the ensure* helpers run before the returned <use>
// markup is inserted, so a <use> never resolves against a missing <symbol>.
// SSR-safe: every entry point guards on `document`/`DOMParser`.

export var STAR_SYMBOL_FULL_ID = 'renuvex-pr-sym-star-full';
export var STAR_SYMBOL_OUTLINE_ID = 'renuvex-pr-sym-star-outline';

var SPRITE_ID = 'renuvex-pr-icon-sprite';
var currentStarKey = null;

function hashStr(s, seed) {
  var h = seed || 0;
  for (var i = 0; i < s.length; i++) { h = (h * 31 + s.charCodeAt(i)) | 0; }
  return (h >>> 0).toString(36);
}

function symbolKey(svgString) {
  return svgString.length.toString(36) + '-' + hashStr(svgString, 0) + '-' + hashStr(svgString, 5381);
}

function getAttr(svgString, attr) {
  var m = svgString.match(new RegExp('\\b' + attr + '="([^"]*)"'));
  return m ? m[1] : null;
}

// Convert one trusted SVG string into a <symbol> with the given id. Keeps viewBox
// + fill/stroke presentation attrs (so the geometry renders identically); drops
// xmlns/aria-hidden/width/height (the wrapping sprite carries xmlns; the outer
// <svg> at each use site carries size + aria-hidden).
function svgStringToSymbol(svgString, symbolId) {
  if (typeof svgString !== 'string') return '';
  return svgString
    .replace(/^\s*<svg\b/, '<symbol id="' + symbolId + '"')
    .replace(/\s+xmlns="[^"]*"/g, '')
    .replace(/\s+aria-hidden="[^"]*"/g, '')
    .replace(/\s+width="[^"]*"/g, '')
    .replace(/\s+height="[^"]*"/g, '')
    .replace(/<\/svg>\s*$/, '</symbol>');
}

// Return the inner <svg> of the hidden sprite container, creating it if needed.
function getSpriteSvg() {
  if (typeof document === 'undefined' || typeof DOMParser === 'undefined') return null;
  var container = document.getElementById(SPRITE_ID);
  if (!container) {
    container = document.createElement('div');
    container.id = SPRITE_ID;
    container.setAttribute('aria-hidden', 'true');
    // Hide without display:none — display:none on the container stops some
    // engines from rendering <use> references to its symbols.
    container.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';
    (document.body || document.documentElement).appendChild(container);
    var parsed = new DOMParser().parseFromString(
      '<svg xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"></svg>',
      'image/svg+xml',
    );
    var root = parsed && parsed.documentElement;
    if (root && String(root.nodeName).toLowerCase() === 'svg') {
      container.appendChild(document.importNode(root, true));
    }
  }
  return container.firstChild || null;
}

// Inject (or replace) one <symbol> by id. Replacing only touches that one
// symbol, so swapping the star icon never clobbers other icons.
function putSymbol(svgString, symbolId, replace) {
  if (typeof document === 'undefined' || typeof DOMParser === 'undefined') return false;
  var key = symbolKey(svgString);
  var existing = document.getElementById(symbolId);
  if (existing && !replace) return existing.getAttribute('data-renuvex-symbol-key') === key;
  var svgRoot = getSpriteSvg();
  if (!svgRoot) return false;
  var parsed = new DOMParser().parseFromString(
    '<svg xmlns="http://www.w3.org/2000/svg">' + svgStringToSymbol(svgString, symbolId) + '</svg>',
    'image/svg+xml',
  );
  var wrapper = parsed && parsed.documentElement;
  if (!wrapper || String(wrapper.nodeName).toLowerCase() !== 'svg' || !wrapper.firstChild) return false;
  var symbol = wrapper.firstChild;
  symbol.setAttribute('data-renuvex-symbol-key', key);
  if (existing && replace && existing.parentNode) existing.parentNode.removeChild(existing);
  svgRoot.appendChild(document.importNode(symbol, true));
  return true;
}

// ── Rating star (fixed ids, swapped in place when the icon changes) ──────────
export function ensureStarSprite(iconPair) {
  if (typeof document === 'undefined' || !iconPair || !iconPair.filled || !iconPair.empty) return;
  var key = symbolKey(iconPair.filled + '|' + iconPair.empty);
  if (key === currentStarKey && document.getElementById(STAR_SYMBOL_FULL_ID)) return;
  var okFull = putSymbol(iconPair.filled, STAR_SYMBOL_FULL_ID, true);
  var okOutline = putSymbol(iconPair.empty, STAR_SYMBOL_OUTLINE_ID, true);
  if (okFull && okOutline) currentStarKey = key;
}

export function starUseSvg(state) {
  var id = state === 'outline' ? STAR_SYMBOL_OUTLINE_ID : STAR_SYMBOL_FULL_ID;
  return '<svg class="renuvex-pr-star-svg" viewBox="0 0 256 256" aria-hidden="true"><use href="#' + id + '"/></svg>';
}

// ── Generic one-off icon (content-hashed id, injected once) ──────────────────
// Returns a <use>-based svg that renders identically to the inline source
// (viewBox + width/height preserved). Falls back to the original string if the
// DOM/parser is unavailable (SSR) or injection fails.
export function iconUseSvg(svgString, className) {
  if (typeof document === 'undefined' || typeof DOMParser === 'undefined' || typeof svgString !== 'string' || !svgString) {
    return svgString || '';
  }
  var id = 'renuvex-pr-sym-' + symbolKey(svgString);
  putSymbol(svgString, id, false);
  if (!document.getElementById(id)) return svgString;
  var vb = getAttr(svgString, 'viewBox') || '0 0 24 24';
  var w = getAttr(svgString, 'width');
  var h = getAttr(svgString, 'height');
  var out = '<svg class="' + (className || 'renuvex-pr-icon-svg') + '" viewBox="' + vb + '"';
  if (w) out += ' width="' + w + '"';
  if (h) out += ' height="' + h + '"';
  out += ' aria-hidden="true"><use href="#' + id + '"/></svg>';
  return out;
}

// ── Sprite mirroring into shadow roots ───────────────────────────────────────
// SVG <use href="#id"> fragment refs resolve only within the same DOM tree.
// Review/lightbox/wizard surfaces render inside their own shadow roots, so the
// global sprite in document.body is unreachable from <use> refs inside them.
// Mirror the global sprite into each registered shadow root and keep mirrors
// in sync via a MutationObserver — covers lazy one-off icon symbols and live
// preview star swaps without threading a "root" arg through every call site.

var mirrorRoots = [];
var spriteObserver = null;
var SPRITE_MIRROR_MARKER = 'data-renuvex-sprite-mirror';

function cloneSpriteInto(root) {
  if (!root || typeof document === 'undefined') return;
  var globalSvg = getSpriteSvg();
  if (!globalSvg) return;
  var prev = root.querySelector('[' + SPRITE_MIRROR_MARKER + ']');
  if (prev && prev.parentNode) prev.parentNode.removeChild(prev);
  var wrap = document.createElement('div');
  wrap.setAttribute(SPRITE_MIRROR_MARKER, '');
  wrap.setAttribute('aria-hidden', 'true');
  wrap.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';
  wrap.appendChild(globalSvg.cloneNode(true));
  root.appendChild(wrap);
}

function ensureSpriteObserver() {
  if (spriteObserver || typeof MutationObserver === 'undefined') return;
  var container = document.getElementById(SPRITE_ID);
  if (!container) return;
  spriteObserver = new MutationObserver(function () {
    for (var i = 0; i < mirrorRoots.length; i++) cloneSpriteInto(mirrorRoots[i]);
  });
  spriteObserver.observe(container, { childList: true, subtree: true, attributes: true });
}

export function registerSpriteRoot(root) {
  if (!root) return;
  if (mirrorRoots.indexOf(root) === -1) mirrorRoots.push(root);
  cloneSpriteInto(root);
  ensureSpriteObserver();
}

export function unregisterSpriteRoot(root) {
  var i = mirrorRoots.indexOf(root);
  if (i !== -1) mirrorRoots.splice(i, 1);
}

// widget/shared/base-reset.js
// Widget-scope base reset injected once at bundle entry.
//
// Scope:
//   Selectors target canonical `renuvex-pr-` classes and legacy `renuvex-pr-` classes
//   during the namespace expand phase. This keeps touch behavior identical for
//   old cached widget chunks and new Renuvex-owned DOM.

var BASE_RESET_CSS = [
  // 1) Kill the browser-managed tap highlight inside the widget scope.
  '[class^="renuvex-pr-"],[class*=" renuvex-pr-"],[class^="renuvex-pr-"],[class*=" renuvex-pr-"]{-webkit-tap-highlight-color:transparent;}',

  // 2) Touch ergonomics on interactive controls.
  'button[class^="renuvex-pr-"],button[class*=" renuvex-pr-"],button[class^="renuvex-pr-"],button[class*=" renuvex-pr-"],' +
    '[class^="renuvex-pr-"][role="button"],[class*=" renuvex-pr-"][role="button"],[class^="renuvex-pr-"][role="button"],[class*=" renuvex-pr-"][role="button"],' +
    '[class^="renuvex-pr-"][role="menuitem"],[class*=" renuvex-pr-"][role="menuitem"],[class^="renuvex-pr-"][role="menuitem"],[class*=" renuvex-pr-"][role="menuitem"]' +
    '{touch-action:manipulation;-webkit-touch-callout:none;user-select:none;}',

  // 3) Deterministic pressed feedback that replaces the disabled tap highlight.
  'button[class^="renuvex-pr-"]:active,button[class*=" renuvex-pr-"]:active,button[class^="renuvex-pr-"]:active,button[class*=" renuvex-pr-"]:active,' +
    '[class^="renuvex-pr-"][role="button"]:active,[class*=" renuvex-pr-"][role="button"]:active,[class^="renuvex-pr-"][role="button"]:active,[class*=" renuvex-pr-"][role="button"]:active,' +
    '[class^="renuvex-pr-"][role="menuitem"]:active,[class*=" renuvex-pr-"][role="menuitem"]:active,[class^="renuvex-pr-"][role="menuitem"]:active,[class*=" renuvex-pr-"][role="menuitem"]:active' +
    '{opacity:0.85;}',

  // 4) Same-gesture shield for popovers that close on pointerdown. It does not remove
  // ADR_0011 press feedback globally; it only neutralizes controls under the dismissed
  // popover until the trailing click is swallowed (or the short fallback timer expires).
  // Pointer blocking is broad, but visual opacity reset is narrower: rating bar rows carry
  // their own selected-filter opacity state and must not flash back to full opacity.
  '[data-renuvex-pr-dismiss-gesture] button[class^="renuvex-pr-"],[data-renuvex-pr-dismiss-gesture] button[class*=" renuvex-pr-"],' +
    '[data-renuvex-pr-dismiss-gesture] [class^="renuvex-pr-"][role="button"],[data-renuvex-pr-dismiss-gesture] [class*=" renuvex-pr-"][role="button"],' +
    '[data-renuvex-pr-dismiss-gesture] [class^="renuvex-pr-"][role="menuitem"],[data-renuvex-pr-dismiss-gesture] [class*=" renuvex-pr-"][role="menuitem"]' +
    '{pointer-events:none;}',
  '[data-renuvex-pr-dismiss-gesture] button[class^="renuvex-pr-"],[data-renuvex-pr-dismiss-gesture] button[class*=" renuvex-pr-"],' +
    '[data-renuvex-pr-dismiss-gesture] [class^="renuvex-pr-"][role="menuitem"],[data-renuvex-pr-dismiss-gesture] [class*=" renuvex-pr-"][role="menuitem"],' +
    '[data-renuvex-pr-dismiss-gesture] [class^="renuvex-pr-"][role="button"]:not(.renuvex-pr-bar-row),[data-renuvex-pr-dismiss-gesture] [class*=" renuvex-pr-"][role="button"]:not(.renuvex-pr-bar-row)' +
    '{opacity:1!important;}',

  // 5) Utility classes for non-button interactives.
  '.renuvex-pr-press-dim:active,.renuvex-pr-press-dim:active{opacity:0.85;}',
  '.renuvex-pr-press-scale,.renuvex-pr-press-scale{transition:transform 90ms ease-out;}',
  '.renuvex-pr-press-scale:active,.renuvex-pr-press-scale:active{transform:scale(0.97);}',
].join('\n');

var injected = false;

export function ensureBaseReset() {
  if (injected || typeof document === 'undefined') return;
  if (!document.head) {
    document.addEventListener('DOMContentLoaded', ensureBaseReset, { once: true });
    return;
  }
  if (document.getElementById('renuvex-pr-base-reset')) {
    injected = true;
    return;
  }
  var el = document.createElement('style');
  el.id = 'renuvex-pr-base-reset';
  el.setAttribute('data-renuvex-pr-style', 'base-reset');
  el.textContent = BASE_RESET_CSS;
  document.head.insertBefore(el, document.head.firstChild);
  injected = true;
}

export { BASE_RESET_CSS };

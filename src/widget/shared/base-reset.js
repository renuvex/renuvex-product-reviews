// widget/shared/base-reset.js
// Widget-scope base reset injected once at bundle entry.
//
// Why this exists:
//   Mobile browsers (especially Chrome Android) paint a translucent overlay on
//   tap (`-webkit-tap-highlight-color`) and may leave `:focus` rings sticky
//   after touch. The result is an inconsistent blue/gray flash on interactive
//   controls and lingering focus rings after popovers close. The canonical
//   fix is to disable the browser overlay widget-wide, then provide our own
//   deterministic `:active` feedback and use `:focus-visible` (not `:focus`)
//   for keyboard outlines.
//
// Scope:
//   Selectors target any element whose class list contains an `ikr-` prefixed
//   class — current and future widget code inherits these rules automatically
//   so long as the project keeps its `ikr-` naming convention.
//
// Performance:
//   - Tap-highlight overlay paint pass removed (small gain).
//   - `:active` opacity / scale changes are composite-only (no layout).
//   - Attribute selector style match is cached after the first recalc.

var BASE_RESET_CSS = [
  // 1) Kill the browser-managed tap highlight inside the widget scope.
  '[class^="ikr-"],[class*=" ikr-"]{-webkit-tap-highlight-color:transparent;}',

  // 2) Touch ergonomics on interactive controls — removes legacy 300ms tap
  //    delay, suppresses long-press context menu, prevents text-selection
  //    flicker. Targets buttons / role=button / role=menuitem inside widget.
  'button[class^="ikr-"],button[class*=" ikr-"],' +
    '[class^="ikr-"][role="button"],[class*=" ikr-"][role="button"],' +
    '[class^="ikr-"][role="menuitem"],[class*=" ikr-"][role="menuitem"]' +
    '{touch-action:manipulation;-webkit-touch-callout:none;user-select:none;}',

  // 3) Deterministic pressed feedback that replaces the disabled tap highlight.
  //    Composite-only opacity dip; cheap and consistent across browsers.
  'button[class^="ikr-"]:active,button[class*=" ikr-"]:active,' +
    '[class^="ikr-"][role="button"]:active,[class*=" ikr-"][role="button"]:active,' +
    '[class^="ikr-"][role="menuitem"]:active,[class*=" ikr-"][role="menuitem"]:active' +
    '{opacity:0.85;}',

  // 4) Utility classes for non-button interactives (image thumbs, photo strip).
  //    Opt-in: add `ikr-press-dim` or `ikr-press-scale` to the element.
  '.ikr-press-dim:active{opacity:0.85;}',
  '.ikr-press-scale{transition:transform 90ms ease-out;}',
  '.ikr-press-scale:active{transform:scale(0.97);}',
].join('\n');

var injected = false;

export function ensureBaseReset() {
  if (injected || typeof document === 'undefined') return;
  // SSR / preview guard — document.head can be missing very briefly.
  if (!document.head) {
    document.addEventListener('DOMContentLoaded', ensureBaseReset, { once: true });
    return;
  }
  if (document.getElementById('ikr-base-reset')) {
    injected = true;
    return;
  }
  var el = document.createElement('style');
  el.id = 'ikr-base-reset';
  el.textContent = BASE_RESET_CSS;
  // Prepend so per-widget styles can override if needed.
  document.head.insertBefore(el, document.head.firstChild);
  injected = true;
}

export { BASE_RESET_CSS };

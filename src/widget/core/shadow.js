// core/shadow.js - Shadow DOM isolation primitives for review surfaces.
//
// ikas has no sandboxed storefront slot, so the widget renders into arbitrary
// merchant themes. Host-theme selector rules (e.g. `.hOHcRx img{width:100%
// !important}`) bleed into our light-DOM UI. Moving each self-contained review
// surface into its own open shadow root blocks those rules at the boundary.
//
// Notes:
// - Style RULES do NOT cross the shadow boundary, so per-root <style> is required.
// - CSS custom properties (--renuvex-pr-*) DO inherit across the boundary from
//   :root, so theme tokens set on document.documentElement still resolve inside.
// - Inherited typography (font-family/color/line-height) is re-admitted on :host
//   so supported-theme parity is preserved while selector bleed stays blocked.

// :host reset. `inherit` re-admits the host page's body typography (parity with
// the pre-shadow light-DOM behavior); selector-targeted theme rules cannot reach
// inside :host regardless.
export var HOST_RESET_CSS =
  ':host{display:block;box-sizing:border-box;font-family:inherit;color:inherit;line-height:inherit;font-size:inherit;letter-spacing:inherit;text-align:start;}' +
  ':host *,:host *::before,:host *::after{box-sizing:border-box;}';

// Attach (or reuse) an open shadow root on an existing light-DOM host element.
// The host element stays in light DOM so external references (badge scroll-to,
// health probe, observer, owned-slot guards) keep working by id/selector.
export function attachShadowHost(hostEl) {
  if (!hostEl) return null;
  return hostEl.shadowRoot || hostEl.attachShadow({ mode: 'open' });
}

// Find/create the single <style> inside a shadow root and set its text.
// Mirror of injectStyles() in helpers.js, scoped to `root` instead of <head>.
export function injectShadowStyles(root, css) {
  if (!root) return;
  var el = root.querySelector('style[data-renuvex-shadow-style]');
  if (!el) {
    el = document.createElement('style');
    el.setAttribute('data-renuvex-shadow-style', '');
    root.appendChild(el);
  }
  el.textContent = css || '';
}

// Create a body-level light-DOM host carrying its own shadow root, for overlays
// that must escape the review section's stacking/scope (lightbox, form wizard).
// Caller injects styles and removes `host` on close.
export function createOverlayShadowHost() {
  var host = document.createElement('div');
  host.setAttribute('data-renuvex-shadow-overlay', '');
  document.body.appendChild(host);
  var root = host.attachShadow({ mode: 'open' });
  return { host: host, root: root };
}

// Focus-trap helper. Inside an open shadow root, document.activeElement returns
// the HOST element, not the focused inner control; read the root's activeElement
// in that case so trap math (first/last/contains) stays correct.
export function getActiveElementWithin(root) {
  var active = document.activeElement;
  if (root && active === root.host) {
    return root.activeElement || active;
  }
  return active;
}

// Persistent content wrapper inside a shadow root. Render flows that need to
// clear/replace content target this wrapper, not the shadow root itself —
// otherwise sRoot.replaceChildren() would wipe the injected <style> and the
// sprite mirror, which are kept as sRoot direct children. Idempotent.
export function getOrCreateShadowContent(root) {
  if (!root) return null;
  var el = root.querySelector('[data-renuvex-shadow-content]');
  if (el) return el;
  el = document.createElement('div');
  el.setAttribute('data-renuvex-shadow-content', '');
  root.appendChild(el);
  return el;
}

// Shared trigger wiring for photo elements that open the review lightbox.
// Keeping click + keyboard semantics in one place prevents layout-specific
// drift: every visible photo trigger must be reachable by keyboard and expose
// button semantics to assistive tech.

export function wireLightboxTrigger(el, open, label) {
  if (!el || typeof open !== 'function') return;
  el.setAttribute('role', 'button');
  el.setAttribute('tabindex', '0');
  el.setAttribute('aria-label', label || 'Yorum fotoğrafını büyüt');
  el.onclick = open;
  el.onkeydown = function(e) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      open();
    }
  };
}

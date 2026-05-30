// shared/focus-trap.js
// Shared focus management for body-level overlays (photo lightbox, review-form wizard).
//
// These helpers were previously duplicated verbatim in review-modal.js and
// review-form-modal/modal-shell.js. They are shadow-DOM aware: inside an open shadow root
// `document.activeElement` returns the HOST, so trap math reads the root's activeElement
// via getActiveElementWithin, and `restoreFocus` uses `el.isConnected` (not
// document.contains, which reports shadow-tree nodes as absent).

import { getActiveElementWithin } from '../core/shadow.js';

// Deepest focused element, drilling through shadow boundaries. `document.activeElement`
// only reports the OUTERMOST shadow host, so a trigger living inside a shadow root (e.g.
// the review section's "Yorum Yap" button) would otherwise be captured as the host — which
// is not focusable, so focus is lost on close instead of returning to the trigger.
function deepActiveElement() {
  var el = document.activeElement;
  while (el && el.shadowRoot && el.shadowRoot.activeElement) {
    el = el.shadowRoot.activeElement;
  }
  return el;
}

export function getReturnFocusElement() {
  var el = deepActiveElement();
  if (!el || el === document.body || el === document.documentElement) return null;
  return el;
}

export function restoreFocus(el) {
  // isConnected (not document.contains) so focus works for elements living
  // inside a shadow root, which document.contains() reports as not present.
  if (!el || !el.isConnected || typeof el.focus !== 'function') return;
  try {
    el.focus({ preventScroll: true });
  } catch (_) {
    try { el.focus(); } catch (_) {}
  }
}

export function isVisibleFocusable(el) {
  if (!el || el.disabled) return false;
  if (el.getAttribute('aria-hidden') === 'true') return false;
  // Exclude roving-tabindex inactive controls (e.g. the rating stars' non-current
  // radios are tabindex="-1"): they are programmatically focusable but NOT in the Tab
  // order, so the trap's first/last math must skip them or Tab can escape the overlay.
  if (typeof el.tabIndex === 'number' && el.tabIndex < 0) return false;
  return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}

export function getFocusableElements(container) {
  var selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');
  return Array.prototype.slice.call(container.querySelectorAll(selector)).filter(isVisibleFocusable);
}

// Focus the first focusable control inside `primary`; if none and a `fallback`
// container is given, try that; otherwise focus the container element itself.
// (Lightbox calls focusFirst(overlay); wizard calls focusFirst(content, overlay) so the
// first STEP control is focused before the close button.)
export function focusFirst(primary, fallback) {
  var container = primary;
  var focusables = getFocusableElements(primary);
  if (!focusables.length && fallback) {
    container = fallback;
    focusables = getFocusableElements(fallback);
  }
  var target = focusables[0] || (container && container.querySelector('[role="dialog"]')) || container;
  restoreFocus(target);
}

// Tab focus trap for an overlay rendered inside an open shadow root.
// `container` is the focusable region; `root` is the shadow root (for activeElement).
export function trapFocus(e, container, root) {
  if (e.key !== 'Tab') return;
  var focusables = getFocusableElements(container);
  if (!focusables.length) {
    e.preventDefault();
    focusFirst(container);
    return;
  }

  var first = focusables[0];
  var last = focusables[focusables.length - 1];
  // Inside an open shadow root document.activeElement is the host, not the
  // focused control; read the root's activeElement so trap math is correct.
  var active = getActiveElementWithin(root);

  if (!container.contains(active)) {
    e.preventDefault();
    restoreFocus(first);
    return;
  }

  if (e.shiftKey && active === first) {
    e.preventDefault();
    restoreFocus(last);
  } else if (!e.shiftKey && active === last) {
    e.preventDefault();
    restoreFocus(first);
  }
}

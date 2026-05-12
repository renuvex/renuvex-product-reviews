// widget/shared/input-modality.js
// Global "last input modality" tracker — the canonical pattern used by
// :focus-visible, React Spectrum, Material UI, etc.
//
// Why:
//   When a popover or modal closes, restoring focus to the opening trigger is
//   correct for keyboard users (so Tab continues from where it left off) but
//   unwanted for pointer/touch users (the lingering focus ring is read as a
//   stuck pressed state on mobile). Routing every close through this tracker
//   gives every dropdown, menu, modal, and lightbox the same canonical
//   behavior without per-component bookkeeping.
//
// Contract:
//   - wasLastInputKeyboard() returns true when the user's most recent
//     interaction was a navigation key (Tab/Enter/Space/Arrow/Escape).
//   - Mouse and touch interactions flip the flag back to false.
//
// Side effect:
//   Importing this module attaches two passive listeners on `document` in the
//   capture phase. They are idempotent — re-imports are free.

var lastWasKeyboard = false;
var attached = false;

var NAV_KEYS = {
  Tab: 1,
  Enter: 1,
  ' ': 1,
  Spacebar: 1,
  ArrowUp: 1,
  ArrowDown: 1,
  ArrowLeft: 1,
  ArrowRight: 1,
  Home: 1,
  End: 1,
  PageUp: 1,
  PageDown: 1,
  Escape: 1,
};

function onKeyDown(e) {
  if (NAV_KEYS[e.key]) lastWasKeyboard = true;
}

function onPointerDown() {
  lastWasKeyboard = false;
}

export function attachInputModalityListeners() {
  if (attached || typeof document === 'undefined') return;
  document.addEventListener('keydown', onKeyDown, true);
  document.addEventListener('pointerdown', onPointerDown, true);
  // Older browsers without PointerEvents — fall back to mousedown/touchstart.
  if (typeof window !== 'undefined' && !('PointerEvent' in window)) {
    document.addEventListener('mousedown', onPointerDown, true);
    document.addEventListener('touchstart', onPointerDown, true);
  }
  attached = true;
}

export function wasLastInputKeyboard() {
  return lastWasKeyboard;
}

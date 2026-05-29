// core/modal-history.js
// Shared back-button / history handling for body-level overlays so the mobile Back
// button closes the overlay instead of navigating the storefront away.
//
// Previously duplicated and divergent: the lightbox used an id-based entry
// (`renuvexPrModal`) in review-modal.js, while the wizard used a boolean state
// (`renuvexPrReviewModal`) in review-form-modal/index.js. Unified here under one state key
// with the lightbox's safer id-based strategy.
//
// Usage: on open, `entry = pushModalHistoryEntry()` and add a `popstate` listener that
// closes the overlay (the browser has already popped the pushed entry). On a MANUAL close
// (ESC / backdrop / X button), call `restoreModalHistoryEntry(entry)` to neutralize the
// pushed entry without a visible navigation.

var STATE_KEY = 'renuvexPrOverlay';

export function pushModalHistoryEntry() {
  var entry = {
    id: 'renuvex-pr-overlay-' + Date.now() + '-' + Math.random().toString(36).slice(2),
    previousState: null,
    pushed: false,
    url: window.location.href,
  };

  try {
    entry.previousState = history.state;
    var state = {};
    state[STATE_KEY] = entry.id;
    history.pushState(state, '', entry.url);
    entry.pushed = true;
  } catch (_) {}

  return entry;
}

function isCurrentModalHistoryEntry(entry) {
  return !!(
    entry &&
    entry.pushed &&
    window.location.href === entry.url &&
    history.state &&
    history.state[STATE_KEY] === entry.id
  );
}

export function restoreModalHistoryEntry(entry) {
  if (!isCurrentModalHistoryEntry(entry)) return;
  try {
    history.replaceState(entry.previousState, '', entry.url);
  } catch (_) {}
}

// summary-layouts/shared/popover-registry.js
// Lightweight popover registry — light dismiss + one-at-a-time + ESC.
// Only elements that want overlay "popover" behavior register here (e.g. the filter
// dropdown). Flow-in elements like an accordion do not register.
//
// Shadow-DOM aware: the trigger/element live inside the review-section shadow root, so a
// document-level listener sees `event.target` RETARGETED to the shadow host
// (#renuvex-reviews). `element.contains(event.target)` is therefore always false for a
// shadow-hosted popover, which made every click — including the trigger and clicks inside
// the menu — read as "outside" and close the menu (toggle looked broken). We use
// `event.composedPath()`, which crosses the shadow boundary and lists the real inner
// nodes, so trigger/element membership is detected correctly.
//
// Light-dismiss must ONLY dismiss: the dismiss click is swallowed so a tap that lands on a
// photo-strip thumbnail (or any control) under an open menu just closes the menu instead of
// also activating that element (opening the lightbox). Pointer-driven option activation
// (which closes the menu on `pointerdown`, before the trailing `click`) arms the same
// one-shot swallow so its trailing click cannot fall through either.

var registered = []; // { trigger, element, close }
var listenersAttached = false;
var swallowNextClick = false;

function eventPathHas(e, node) {
  if (!node) return false;
  if (typeof e.composedPath === 'function') {
    var path = e.composedPath();
    if (path && path.length) return path.indexOf(node) !== -1;
  }
  return node.contains(e.target);
}

function handleDocClick(e) {
  // A pointerdown-driven option activation already closed the menu; swallow the trailing
  // click so it does not reach whatever is now under the pointer (e.g. a thumbnail).
  if (swallowNextClick) {
    swallowNextClick = false;
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  var dismissed = false;
  for (var i = registered.length - 1; i >= 0; i--) {
    var p = registered[i];
    // Click on the trigger → its own toggle handler manages open/close.
    if (eventPathHas(e, p.trigger)) continue;
    // Click inside the popover → keep it open.
    if (eventPathHas(e, p.element)) continue;
    // Click outside → dismiss. close() returns true only if it was actually open.
    if (p.close()) dismissed = true;
  }

  // An outside click that dismissed an open popover should ONLY dismiss — not also
  // activate the element it landed on.
  if (dismissed) {
    e.preventDefault();
    e.stopPropagation();
  }
}

function handleKeydown(e) {
  if (e.key !== 'Escape') return;
  for (var i = registered.length - 1; i >= 0; i--) registered[i].close();
}

function ensureListeners() {
  if (listenersAttached || typeof document === 'undefined') return;
  document.addEventListener('click', handleDocClick, true);
  document.addEventListener('keydown', handleKeydown);
  listenersAttached = true;
}

// One-at-a-time: closing other popovers when one opens. Called by a trigger handler as
// the "I am opening" signal.
export function notifyOpening(self) {
  for (var i = 0; i < registered.length; i++) {
    if (registered[i] !== self) registered[i].close();
  }
}

// Arm a one-shot swallow of the next document click. Called by a popover that activates +
// closes on `pointerdown` (before the click fires) so the trailing click cannot fall
// through to an element under the now-closed popover. Auto-disarms if no click follows
// (e.g. a canceled tap) so a later, unrelated click is not eaten.
export function swallowNextDismissClick() {
  swallowNextClick = true;
  if (typeof setTimeout === 'function') {
    setTimeout(function () { swallowNextClick = false; }, 700);
  }
}

export function registerPopover(opts) {
  ensureListeners();
  var entry = { trigger: opts.trigger, element: opts.element, close: opts.close };
  registered.push(entry);
  return function unregister() {
    var idx = registered.indexOf(entry);
    if (idx !== -1) registered.splice(idx, 1);
  };
}

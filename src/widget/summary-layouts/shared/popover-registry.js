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
// also activating that element (opening the lightbox). Touch/pen option activation
// (which closes the menu on `pointerdown`, before the trailing `click`) arms the same
// one-shot swallow so its trailing click cannot fall through either. On real phones, the
// same gesture can also synthesize compat mouse events after the popover disappeared; the
// optional gesture shield scopes a short-lived pointer/active suppression to the review
// shadow content so those stray events cannot visually press an exposed control underneath.
//
// Lifecycle contract (see docs/wiki/03_Architecture/Widget_Architecture.md):
//   - registerPopover(opts) returns a HANDLE { unregister, notifyOpening } — never a bare
//     function. Consumers call handle.notifyOpening() on open and handle.unregister() ONLY
//     at a real teardown point (e.g. compact's media-query swap). One-shot producers with
//     no owner (the filter dropdown built fresh on every summary render) must NOT unregister
//     on dismiss — that would remove the still-mounted popover and kill light-dismiss on the
//     next open. Their stale entries are reclaimed centrally instead (purgeDisconnected:
//     once the old shadow content is replaced, entry.element.isConnected becomes false and
//     the entry is dropped on the next registry pass). This is defense-in-depth, not a
//     substitute for unregister at genuine teardown points.
//   - opts.close() MUST return true only if the popover was actually open (and is now
//     closed), false otherwise. The dismiss-swallow logic depends on this boolean.

var GESTURE_SHIELD_ATTR = 'data-renuvex-pr-dismiss-gesture';

var registered = []; // [{ trigger, element, close }]
var listenersAttached = false;
var swallowNextClick = false;
var shieldScopes = [];
var shieldTimer = null;

function eventPathHas(e, node) {
  if (!node) return false;
  if (typeof e.composedPath === 'function') {
    var path = e.composedPath();
    if (path && path.length) return path.indexOf(node) !== -1;
  }
  return node.contains(e.target);
}

// Drop entries whose popover element has left the DOM (old shadow content replaced on a
// re-render). Keeps the registry from growing across summary rebuilds even when a one-shot
// producer never calls unregister. Returns the live entry list.
function purgeDisconnected() {
  for (var i = registered.length - 1; i >= 0; i--) {
    var el = registered[i].element;
    if (el && el.isConnected === false) registered.splice(i, 1);
  }
  return registered;
}

function armGestureShield(scope) {
  if (!scope || typeof scope.setAttribute !== 'function') return;
  if (shieldScopes.indexOf(scope) === -1) shieldScopes.push(scope);
  scope.setAttribute(GESTURE_SHIELD_ATTR, '');
}

function clearGestureShield() {
  for (var i = 0; i < shieldScopes.length; i++) {
    var scope = shieldScopes[i];
    if (scope && typeof scope.removeAttribute === 'function') {
      scope.removeAttribute(GESTURE_SHIELD_ATTR);
    }
  }
  shieldScopes = [];
  if (shieldTimer && typeof clearTimeout === 'function') {
    clearTimeout(shieldTimer);
  }
  shieldTimer = null;
}

function handleDocClick(e) {
  // A touch/pen option activation already closed the menu; swallow the trailing
  // click so it does not reach whatever is now under the pointer (e.g. a thumbnail).
  if (swallowNextClick) {
    swallowNextClick = false;
    clearGestureShield();
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  var live = purgeDisconnected();
  var dismissed = false;
  for (var i = live.length - 1; i >= 0; i--) {
    var p = live[i];
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
  var live = purgeDisconnected();
  for (var i = live.length - 1; i >= 0; i--) live[i].close();
}

function ensureListeners() {
  if (listenersAttached || typeof document === 'undefined') return;
  document.addEventListener('click', handleDocClick, true);
  document.addEventListener('keydown', handleKeydown);
  listenersAttached = true;
}

function armNextDismiss(scope) {
  ensureListeners();
  swallowNextClick = true;
  armGestureShield(scope);
  if (shieldTimer && typeof clearTimeout === 'function') {
    clearTimeout(shieldTimer);
  }
  if (typeof setTimeout === 'function') {
    shieldTimer = setTimeout(function () {
      swallowNextClick = false;
      clearGestureShield();
    }, 700);
  }
}

// Touch/pen option activation can also leak compat mouse/active state to the control
// revealed under the now-closed menu before the trailing click is swallowed. Scope the
// temporary shield to the review shadow content wrapper so true future taps keep normal
// ADR_0011 press feedback, while same-gesture stray events cannot press through.
export function swallowNextDismissGesture(scope) {
  armNextDismiss(scope);
}

export function registerPopover(opts) {
  ensureListeners();
  var entry = { trigger: opts.trigger, element: opts.element, close: opts.close };
  registered.push(entry);
  return {
    // Remove this popover from the registry. Call only at a real teardown point.
    unregister: function () {
      var idx = registered.indexOf(entry);
      if (idx !== -1) registered.splice(idx, 1);
    },
    // One-at-a-time: closing every OTHER registered popover as this one opens.
    // Compares by entry reference (closure) so the caller never has to thread an
    // identity argument — fixes the old notifyOpening(fn) vs entry mismatch.
    notifyOpening: function () {
      var live = purgeDisconnected();
      for (var i = 0; i < live.length; i++) {
        if (live[i] !== entry) live[i].close();
      }
    },
  };
}

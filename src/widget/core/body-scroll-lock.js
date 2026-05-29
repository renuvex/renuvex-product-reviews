// core/body-scroll-lock.js
// Robust, ref-counted body scroll lock for body-level overlays (photo lightbox,
// review-form wizard).
//
// Why this is shared and robust (provenance: lifted verbatim from review-modal.js,
// hardened by Bug_Lightbox_Mobile_Pull_To_Refresh, Bug_Lightbox_Mobile_Review_Switch_
// Scroll_State, Bug_Lightbox_Tablet_Viewport_And_Scroll):
//   - Locks BOTH <html> and <body> with `!important` so themes that scroll on the
//     documentElement (or override body overflow with !important) are still locked. A
//     body-only `overflow:hidden` is theme-dependent and silently fails on such themes.
//   - Sets `overscroll-behavior-y:none` to stop scroll chaining / pull-to-refresh.
//   - Compensates for the scrollbar width so locking does not shift the page.
//   - On iOS Safari (where `overflow:hidden` does NOT stop touch scrolling) it pins the
//     body with `position:fixed` + `top:-scrollY` and restores the scroll position on
//     unlock — the only reliable way to lock background scroll there.
//   - Ref-counted: the FIRST lock captures + applies the page state, the LAST unlock
//     restores it. Overlapping overlays therefore never clobber each other's saved state.
//
// This module makes NO assumption about which element is the theme's scroll container —
// that is exactly why it works across arbitrary merchant themes.

function captureBodyScrollState() {
  var bodyStyle = document.body.style;
  var rootStyle = document.documentElement.style;
  return {
    scrollX: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
    scrollY: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
    fixedBodyLock: false,
    bodyOverflow: bodyStyle.getPropertyValue('overflow'),
    bodyOverflowPriority: bodyStyle.getPropertyPriority('overflow'),
    bodyPaddingRight: bodyStyle.getPropertyValue('padding-right'),
    bodyPaddingRightPriority: bodyStyle.getPropertyPriority('padding-right'),
    bodyPosition: bodyStyle.getPropertyValue('position'),
    bodyPositionPriority: bodyStyle.getPropertyPriority('position'),
    bodyTop: bodyStyle.getPropertyValue('top'),
    bodyTopPriority: bodyStyle.getPropertyPriority('top'),
    bodyLeft: bodyStyle.getPropertyValue('left'),
    bodyLeftPriority: bodyStyle.getPropertyPriority('left'),
    bodyRight: bodyStyle.getPropertyValue('right'),
    bodyRightPriority: bodyStyle.getPropertyPriority('right'),
    bodyWidth: bodyStyle.getPropertyValue('width'),
    bodyWidthPriority: bodyStyle.getPropertyPriority('width'),
    bodyOverscrollBehaviorY: bodyStyle.getPropertyValue('overscroll-behavior-y'),
    bodyOverscrollBehaviorYPriority: bodyStyle.getPropertyPriority('overscroll-behavior-y'),
    rootOverflow: rootStyle.getPropertyValue('overflow'),
    rootOverflowPriority: rootStyle.getPropertyPriority('overflow'),
    rootOverscrollBehaviorY: rootStyle.getPropertyValue('overscroll-behavior-y'),
    rootOverscrollBehaviorYPriority: rootStyle.getPropertyPriority('overscroll-behavior-y'),
  };
}

function restoreStyleProperty(style, propertyName, value, priority) {
  if (value) {
    style.setProperty(propertyName, value, priority || '');
  } else {
    style.removeProperty(propertyName);
  }
}

function shouldUseFixedBodyLock() {
  if (typeof navigator === 'undefined') return false;
  var platform = navigator.platform || '';
  var ua = navigator.userAgent || '';
  var maxTouchPoints = navigator.maxTouchPoints || 0;
  var isIOS = /iP(ad|hone|od)/.test(platform) || (platform === 'MacIntel' && maxTouchPoints > 1);
  return isIOS && /AppleWebKit/i.test(ua);
}

function applyLock(previousState) {
  var bodyStyle = document.body.style;
  var rootStyle = document.documentElement.style;
  var scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
  var isBodyAlreadyFixed = window.getComputedStyle(document.body).position === 'fixed';
  var shouldFixBody = shouldUseFixedBodyLock() && !isBodyAlreadyFixed;

  if (scrollbarWidth > 0) {
    var currentPaddingRight = parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
    bodyStyle.setProperty('padding-right', (currentPaddingRight + scrollbarWidth) + 'px', 'important');
  }
  rootStyle.setProperty('overflow', 'hidden', 'important');
  rootStyle.setProperty('overscroll-behavior-y', 'none', 'important');
  bodyStyle.setProperty('overflow', 'hidden', 'important');
  bodyStyle.setProperty('overscroll-behavior-y', 'none', 'important');

  if (shouldFixBody) {
    previousState.fixedBodyLock = true;
    bodyStyle.setProperty('position', 'fixed', 'important');
    bodyStyle.setProperty('top', (-previousState.scrollY) + 'px', 'important');
    bodyStyle.setProperty('left', (-previousState.scrollX) + 'px', 'important');
    bodyStyle.setProperty('right', '0', 'important');
    bodyStyle.setProperty('width', '100%', 'important');
  }
}

function applyRestore(previousState) {
  var bodyStyle = document.body.style;
  var rootStyle = document.documentElement.style;
  restoreStyleProperty(rootStyle, 'overflow', previousState.rootOverflow, previousState.rootOverflowPriority);
  restoreStyleProperty(rootStyle, 'overscroll-behavior-y', previousState.rootOverscrollBehaviorY, previousState.rootOverscrollBehaviorYPriority);
  restoreStyleProperty(bodyStyle, 'overflow', previousState.bodyOverflow, previousState.bodyOverflowPriority);
  restoreStyleProperty(bodyStyle, 'padding-right', previousState.bodyPaddingRight, previousState.bodyPaddingRightPriority);
  restoreStyleProperty(bodyStyle, 'overscroll-behavior-y', previousState.bodyOverscrollBehaviorY, previousState.bodyOverscrollBehaviorYPriority);
  restoreStyleProperty(bodyStyle, 'position', previousState.bodyPosition, previousState.bodyPositionPriority);
  restoreStyleProperty(bodyStyle, 'top', previousState.bodyTop, previousState.bodyTopPriority);
  restoreStyleProperty(bodyStyle, 'left', previousState.bodyLeft, previousState.bodyLeftPriority);
  restoreStyleProperty(bodyStyle, 'right', previousState.bodyRight, previousState.bodyRightPriority);
  restoreStyleProperty(bodyStyle, 'width', previousState.bodyWidth, previousState.bodyWidthPriority);
  if (previousState.fixedBodyLock) {
    window.scrollTo(previousState.scrollX, previousState.scrollY);
  }
}

var lockCount = 0;
var savedState = null;

// Lock background scroll. Ref-counted: only the first call captures and applies the
// page state. Returns the saved state (mainly for debugging; callers do not need it —
// restoreBodyScroll() uses the module-held state).
export function lockBodyScroll() {
  lockCount += 1;
  if (lockCount > 1) return savedState;
  savedState = captureBodyScrollState();
  applyLock(savedState);
  return savedState;
}

// Release one lock. Only the last release restores the page. Any argument is ignored
// (kept for call-site backwards-compatibility); the module restores its own saved state.
export function restoreBodyScroll() {
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount > 0) return;
  var previousState = savedState;
  savedState = null;
  if (previousState) applyRestore(previousState);
}

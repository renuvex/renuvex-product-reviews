// core/health.js - storefront runtime health and conflict diagnostics.

/* global __IKR_WIDGET_VERSION__ */

import { API_BASE, PUBLIC_API_KEY } from './config.js';

var MAX_HEALTH_EVENTS_PER_SESSION = 8;
var sentCount = 0;
var sentKeys = {};

function getWidgetVersion() {
  try {
    return typeof __IKR_WIDGET_VERSION__ !== 'undefined' ? __IKR_WIDGET_VERSION__ : 'dev';
  } catch (_) {
    return 'dev';
  }
}

function currentPath() {
  try {
    return window.location ? window.location.pathname : '';
  } catch (_) {
    return '';
  }
}

function shouldReport(type, extra) {
  if (!API_BASE || sentCount >= MAX_HEALTH_EVENTS_PER_SESSION) return false;
  var key = [
    'ikr-health',
    PUBLIC_API_KEY || 'unknown',
    type || 'unknown',
    (extra && extra.surface) || 'unknown',
    (extra && extra.reason) || 'unknown',
    currentPath(),
  ].join(':');

  if (sentKeys[key]) return false;
  sentKeys[key] = true;

  try {
    if (window.sessionStorage && window.sessionStorage.getItem(key)) return false;
    if (window.sessionStorage) window.sessionStorage.setItem(key, String(Date.now()));
  } catch (_) {}

  sentCount += 1;
  return true;
}

function send(payload) {
  try {
    var body = JSON.stringify(payload);
    var reportUrl = API_BASE + '/api/public/widget-error';
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon(reportUrl, new Blob([body], { type: 'application/json' }));
      return;
    }
    if (typeof fetch === 'function') {
      fetch(reportUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
        keepalive: true,
      }).catch(function () {});
    }
  } catch (_) {}
}

export function markWidgetLoaded() {
  if (typeof window === 'undefined') return;
  var loadedAt = Date.now();
  window.__IKR_WIDGET__ = {
    loadedAt: loadedAt,
    publicApiKey: PUBLIC_API_KEY || null,
    version: getWidgetVersion(),
  };
}

export function reportWidgetHealth(type, message, extra) {
  if (typeof window === 'undefined') return;
  var payloadExtra = Object.assign(
    {
      type: type,
      version: getWidgetVersion(),
      path: currentPath(),
    },
    extra || {},
  );
  if (!shouldReport(type, payloadExtra)) return;
  send({
    message: String(message || 'Widget health event').slice(0, 500),
    url: window.location ? String(window.location.href).slice(0, 2000) : undefined,
    userAgent: typeof navigator !== 'undefined' ? String(navigator.userAgent || '').slice(0, 500) : undefined,
    publicApiKey: PUBLIC_API_KEY || null,
    timestamp: Date.now(),
    extra: payloadExtra,
  });
}

export function probeWidgetVisibility(root, surface, extra) {
  if (typeof window === 'undefined') return;
  setTimeout(function () {
    try {
      if (!root || !root.isConnected) {
        reportWidgetHealth('dom-conflict', 'Widget node missing after render', Object.assign({ surface: surface, reason: 'missing_after_render' }, extra || {}));
        return;
      }

      var style = window.getComputedStyle(root);
      var rect = root.getBoundingClientRect();
      var opacity = parseFloat(style.opacity || '1');
      if (style.display === 'none') {
        reportWidgetHealth('visibility-health', 'Widget node hidden by display:none', Object.assign({ surface: surface, reason: 'display_none' }, extra || {}));
        return;
      }
      if (style.visibility === 'hidden' || style.visibility === 'collapse') {
        reportWidgetHealth('visibility-health', 'Widget node hidden by visibility', Object.assign({ surface: surface, reason: 'visibility_hidden' }, extra || {}));
        return;
      }
      if (opacity <= 0.01) {
        reportWidgetHealth('visibility-health', 'Widget node hidden by opacity', Object.assign({ surface: surface, reason: 'opacity_zero' }, extra || {}));
        return;
      }
      if (rect.width <= 0 || rect.height <= 0) {
        reportWidgetHealth('visibility-health', 'Widget node has zero visible size', Object.assign({ surface: surface, reason: 'zero_rect' }, extra || {}));
        return;
      }

      var stars = root.querySelectorAll ? root.querySelectorAll('.ikr-star') : [];
      for (var i = 0; i < stars.length; i++) {
        var starRect = stars[i].getBoundingClientRect();
        if (starRect.width <= 0 || starRect.height <= 0) {
          reportWidgetHealth('visibility-health', 'Widget star has zero visible size', Object.assign({ surface: surface, reason: 'zero_star' }, extra || {}));
          return;
        }
      }
    } catch (_) {}
  }, 350);
}

export function watchOneTimeRemoval(root, surface, remount, extra) {
  if (typeof MutationObserver === 'undefined' || !root || !root.parentNode || typeof remount !== 'function') return;
  var parent = root.parentNode;
  var used = false;
  var observer = new MutationObserver(function () {
    if (used || root.isConnected) return;
    used = true;
    observer.disconnect();
    setTimeout(function () {
      if (!parent.isConnected) return;
      reportWidgetHealth('dom-conflict', 'Widget node removed after render', Object.assign({ surface: surface, reason: 'removed_after_render' }, extra || {}));
      try {
        remount();
      } catch (error) {
        reportWidgetHealth('dom-conflict', 'Widget self-heal remount failed', Object.assign({ surface: surface, reason: 'self_heal_failed', error: error && error.message }, extra || {}));
      }
    }, 100);
  });
  observer.observe(parent, { childList: true });
  return observer;
}

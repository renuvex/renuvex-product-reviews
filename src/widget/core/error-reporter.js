// error-reporter.js — Forward uncaught widget errors to the panel server.
//
// The widget bundle stays SDK-free for storefront bundle-size and customer
// privacy reasons (see ADR_0009 and ADR_0010). Instead, uncaught errors that
// originate from widget.js are POSTed to /api/public/widget-error, where the
// panel's server-side Sentry SDK records them with `source: widget` tag.
//
// Filtering: we only forward events whose filename/stack mentions widget.js,
// to avoid capturing unrelated noise from the merchant's theme or other
// third-party scripts on the storefront.

import { API_BASE, PUBLIC_API_KEY } from './config.js';

var hasWindow = typeof window !== 'undefined';

if (hasWindow && API_BASE) {
  var REPORT_URL = API_BASE + '/api/public/widget-error';
  var MAX_PER_SESSION = 5;
  var MIN_INTERVAL_MS = 2000;

  var sentCount = 0;
  var lastSentAt = 0;
  var seen = {};

  function isWidgetError(filename, stack) {
    if (filename && filename.indexOf('/widget.js') !== -1) return true;
    if (stack && stack.indexOf('widget.js') !== -1) return true;
    return false;
  }

  function shouldSend(message, stack) {
    if (sentCount >= MAX_PER_SESSION) return false;
    var now = Date.now();
    if (now - lastSentAt < MIN_INTERVAL_MS) return false;
    var key = String(message) + '|' + String(stack || '').slice(0, 200);
    if (seen[key]) return false;
    seen[key] = true;
    lastSentAt = now;
    sentCount += 1;
    return true;
  }

  function send(payload) {
    try {
      var body = JSON.stringify(payload);
      if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
        var blob = new Blob([body], { type: 'application/json' });
        navigator.sendBeacon(REPORT_URL, blob);
        return;
      }
      if (typeof fetch === 'function') {
        fetch(REPORT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body,
          keepalive: true,
        }).catch(function () { /* swallow */ });
      }
    } catch (e) { /* swallow — reporter must never crash the widget */ }
  }

  function buildPayload(message, stack, extra) {
    return {
      message: String(message || 'unknown').slice(0, 500),
      stack: stack ? String(stack).slice(0, 4000) : undefined,
      url: hasWindow && window.location ? String(window.location.href).slice(0, 2000) : undefined,
      userAgent: typeof navigator !== 'undefined' ? String(navigator.userAgent || '').slice(0, 500) : undefined,
      publicApiKey: PUBLIC_API_KEY || null,
      timestamp: Date.now(),
      extra: extra || undefined,
    };
  }

  window.addEventListener('error', function (event) {
    if (!event) return;
    var filename = event.filename || (event.error && event.error.fileName) || '';
    var stack = event.error && event.error.stack;
    if (!isWidgetError(filename, stack)) return;
    var message = event.message || (event.error && event.error.message) || 'window.onerror';
    if (!shouldSend(message, stack)) return;
    send(buildPayload(message, stack, {
      type: 'error',
      filename: filename || undefined,
      lineno: event.lineno || undefined,
      colno: event.colno || undefined,
    }));
  });

  window.addEventListener('unhandledrejection', function (event) {
    if (!event) return;
    var reason = event.reason;
    var stack = reason && reason.stack;
    var filename = (reason && reason.fileName) || '';
    if (!isWidgetError(filename, stack)) return;
    var message = (reason && reason.message) || String(reason || 'unhandled rejection');
    if (!shouldSend(message, stack)) return;
    send(buildPayload(message, stack, { type: 'unhandledrejection' }));
  });
}

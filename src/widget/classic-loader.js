// classic-loader.js - ikas-compatible storefront entry.
//
// ikas currently injects a classic script record such as:
//   <script src=".../widget.js?publicApiKey=..."></script>
//
// Phase 2 keeps that URL stable. The classic loader discovers its own URL,
// derives the project base URL, then loads the ESM runtime/chunks from the same
// origin. The runtime still reads publicApiKey from the original widget.js tag.

import { getWidgetApiBaseUrl } from './core/origins.js';
import { markWidgetPerf } from './core/perf-timeline.js';
import { findRenuvexWidgetScript, getPublicApiKeyFromScript, getWidgetScriptBaseUrl } from './core/script-identity.js';

var hasWindow = typeof window !== 'undefined';
var hasDocument = typeof document !== 'undefined';

function findCurrentScript() {
  if (!hasDocument) return null;
  return findRenuvexWidgetScript();
}

function postRuntimeError(baseUrl, publicApiKey, message, stack, runtimeUrl) {
  if (!baseUrl) return;
  try {
    var extra = {
      type: 'runtime-import',
      runtimeUrl: runtimeUrl,
      route: hasWindow && window.location ? String(window.location.pathname + window.location.search).slice(0, 500) : undefined,
      visibilityState: hasDocument ? document.visibilityState : undefined,
      readyState: hasDocument ? document.readyState : undefined,
      online: typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' ? navigator.onLine : undefined,
    };
    var body = JSON.stringify({
      message: String(message || 'Widget runtime failed to load').slice(0, 500),
      stack: stack ? String(stack).slice(0, 4000) : undefined,
      url: hasWindow && window.location ? String(window.location.href).slice(0, 2000) : undefined,
      userAgent: typeof navigator !== 'undefined' ? String(navigator.userAgent || '').slice(0, 500) : undefined,
      publicApiKey: publicApiKey || null,
      timestamp: Date.now(),
      extra: extra,
    });
    var reportUrl = baseUrl + '/api/public/widget-error';
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

if (hasWindow && hasDocument) {
  markWidgetPerf('classic-loader-start');
  var script = findCurrentScript();
  if (script && script.src) markWidgetPerf('script-tag-present');
  var scriptSrc = script && script.src ? script.src : '';
  var scriptBase = getWidgetScriptBaseUrl(script);
  var apiBase = getWidgetApiBaseUrl(script);
  var publicApiKey = getPublicApiKeyFromScript(script);

  if (scriptSrc && scriptBase && publicApiKey && !window.__renuvexProductReviewsRuntimeLoading) {
    window.__renuvexProductReviewsRuntimeLoading = true;
    var runtimePath = typeof __RENUVEX_PR_RUNTIME_PATH__ !== 'undefined'
      ? __RENUVEX_PR_RUNTIME_PATH__
      : 'widget-runtime/runtime.js';
    var runtimeUrl = scriptBase + '/' + runtimePath;
    markWidgetPerf('runtime-import-start');
    import(runtimeUrl).then(function () {
      markWidgetPerf('runtime-import-done');
    }).catch(function (err) {
      window.__renuvexProductReviewsRuntimeLoading = false;
      markWidgetPerf('runtime-import-error');
      postRuntimeError(apiBase || scriptBase, publicApiKey, err && err.message, err && err.stack, runtimeUrl);
      try { console.error('[renuvex-pr] runtime import failed:', err); } catch (_) {}
    });
  }
}

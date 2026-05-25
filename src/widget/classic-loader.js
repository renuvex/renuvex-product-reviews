// classic-loader.js - ikas-compatible storefront entry.
//
// ikas currently injects a classic script record such as:
//   <script src=".../widget.js?publicApiKey=..."></script>
//
// Phase 2 keeps that URL stable. The classic loader discovers its own URL,
// derives the project base URL, then loads the ESM runtime/chunks from the same
// origin. The runtime still reads publicApiKey from the original widget.js tag.

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
    var body = JSON.stringify({
      message: String(message || 'Widget runtime failed to load').slice(0, 500),
      stack: stack ? String(stack).slice(0, 4000) : undefined,
      url: hasWindow && window.location ? String(window.location.href).slice(0, 2000) : undefined,
      userAgent: typeof navigator !== 'undefined' ? String(navigator.userAgent || '').slice(0, 500) : undefined,
      publicApiKey: publicApiKey || null,
      timestamp: Date.now(),
      extra: { type: 'runtime-import', runtimeUrl: runtimeUrl },
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
  var script = findCurrentScript();
  var scriptSrc = script && script.src ? script.src : '';
  var scriptBase = getWidgetScriptBaseUrl(script);
  var publicApiKey = getPublicApiKeyFromScript(script);

  if (scriptSrc && scriptBase && publicApiKey && !window.__renuvexProductReviewsRuntimeLoading) {
    window.__renuvexProductReviewsRuntimeLoading = true;
    var runtimePath = typeof __RENUVEX_PR_RUNTIME_PATH__ !== 'undefined'
      ? __RENUVEX_PR_RUNTIME_PATH__
      : 'widget-runtime/runtime.js';
    var runtimeUrl = scriptBase + '/' + runtimePath;
    import(runtimeUrl).catch(function (err) {
      window.__renuvexProductReviewsRuntimeLoading = false;
      postRuntimeError(scriptBase, publicApiKey, err && err.message, err && err.stack, runtimeUrl);
      try { console.error('[renuvex-pr] runtime import failed:', err); } catch (_) {}
    });
  }
}

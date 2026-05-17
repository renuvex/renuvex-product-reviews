// classic-loader.js - ikas-compatible storefront entry.
//
// ikas currently injects a classic script record such as:
//   <script src=".../widget.js?publicApiKey=..."></script>
//
// Phase 2 keeps that URL stable. The classic loader discovers its own URL,
// derives the project base URL, then loads the ESM runtime/chunks from the same
// origin. The runtime still reads publicApiKey from the original widget.js tag.

var hasWindow = typeof window !== 'undefined';
var hasDocument = typeof document !== 'undefined';

function findCurrentScript() {
  if (!hasDocument) return null;
  if (document.currentScript && document.currentScript.src) return document.currentScript;
  var scripts = document.getElementsByTagName('script');
  for (var i = scripts.length - 1; i >= 0; i--) {
    if (scripts[i].src && scripts[i].src.indexOf('/widget.js') !== -1) return scripts[i];
  }
  return scripts[scripts.length - 1] || null;
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
  var scriptBase = scriptSrc ? scriptSrc.split('?')[0].replace(/\/widget\.js$/, '') : '';
  var query = scriptSrc.split('?')[1] || '';
  var publicApiKey = new URLSearchParams(query).get('publicApiKey');

  if (scriptBase && !window.__ikrRuntimeLoading) {
    window.__ikrRuntimeLoading = true;
    var runtimePath = typeof __IKR_RUNTIME_PATH__ !== 'undefined'
      ? __IKR_RUNTIME_PATH__
      : 'widget-runtime/runtime.js';
    var runtimeUrl = scriptBase + '/' + runtimePath;
    import(runtimeUrl).catch(function (err) {
      window.__ikrRuntimeLoading = false;
      postRuntimeError(scriptBase, publicApiKey, err && err.message, err && err.stack, runtimeUrl);
      try { console.error('[ikr] runtime import failed:', err); } catch (_) {}
    });
  }
}

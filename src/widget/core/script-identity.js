export var RENUVEX_APP_MARKER = 'product-reviews';
export var LEGACY_IKR_APP_MARKER = 'yorum-paneli';

function getDatasetValue(script, key) {
  try {
    return script && script.dataset ? script.dataset[key] : null;
  } catch (_) {
    return null;
  }
}

function getSrc(script) {
  return script && script.src ? String(script.src) : '';
}

function getLocationHref() {
  try {
    return window.location && window.location.href ? window.location.href : undefined;
  } catch (_) {
    return undefined;
  }
}

function hasWidgetPath(src) {
  try {
    return /\/widget\.js$/.test(new URL(src, getLocationHref()).pathname);
  } catch (_) {
    return src.split('?')[0].indexOf('/widget.js') !== -1;
  }
}

function getSearchParams(src) {
  try {
    return new URL(src, getLocationHref()).searchParams;
  } catch (_) {
    return new URLSearchParams(src.split('?')[1] || '');
  }
}

export function hasOwnedWidgetMarker(script) {
  return getDatasetValue(script, 'renuvexApp') === RENUVEX_APP_MARKER || getDatasetValue(script, 'ikrApp') === LEGACY_IKR_APP_MARKER;
}

export function getPublicApiKeyFromScript(script) {
  var src = getSrc(script);
  if (!src) return null;
  return getSearchParams(src).get('publicApiKey');
}

export function isRenuvexWidgetScript(script) {
  var src = getSrc(script);
  if (!src || !hasWidgetPath(src)) return false;
  if (hasOwnedWidgetMarker(script)) return true;
  return Boolean(getPublicApiKeyFromScript(script));
}

export function findRenuvexWidgetScript() {
  if (typeof document === 'undefined') return null;

  if (document.currentScript && isRenuvexWidgetScript(document.currentScript)) {
    return document.currentScript;
  }

  var scripts = document.getElementsByTagName('script');

  for (var i = scripts.length - 1; i >= 0; i--) {
    if (scripts[i].src && hasOwnedWidgetMarker(scripts[i]) && isRenuvexWidgetScript(scripts[i])) return scripts[i];
  }

  for (var j = scripts.length - 1; j >= 0; j--) {
    if (scripts[j].src && isRenuvexWidgetScript(scripts[j])) return scripts[j];
  }

  return null;
}

export function getWidgetScriptBaseUrl(script) {
  var src = getSrc(script);
  if (!src) return '';
  return src.split('?')[0].replace(/\/widget\.js$/, '');
}

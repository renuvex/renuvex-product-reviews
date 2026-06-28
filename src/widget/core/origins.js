import { getWidgetScriptBaseUrl } from './script-identity.js';

function getConfiguredApiBaseUrl() {
  try {
    if (typeof __RENUVEX_PR_API_BASE_URL__ !== 'undefined') {
      return String(__RENUVEX_PR_API_BASE_URL__ || '').trim();
    }
  } catch (_) {}
  return '';
}

function normalizeBaseUrl(raw, fallbackHref) {
  var value = typeof raw === 'string' ? raw.trim() : '';
  if (!value) return '';

  try {
    var parsed = new URL(value, fallbackHref || undefined);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return '';
    parsed.hash = '';
    parsed.search = '';
    parsed.pathname = '';
    return parsed.toString().replace(/\/$/, '');
  } catch (_) {
    return '';
  }
}

export function getWidgetAssetBaseUrl(script) {
  return getWidgetScriptBaseUrl(script);
}

export function getWidgetApiBaseUrl(script) {
  var assetBaseUrl = getWidgetAssetBaseUrl(script);
  var configured = normalizeBaseUrl(getConfiguredApiBaseUrl(), assetBaseUrl);
  return configured || assetBaseUrl;
}

export function normalizeWidgetApiBaseUrlForTest(raw, fallbackHref) {
  return normalizeBaseUrl(raw, fallbackHref);
}

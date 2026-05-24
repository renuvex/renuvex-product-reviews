// core/settings.js - public widget settings fetch/cache.
//
// Shared by product reviews and listing badges. Keeping this out of
// product-widget/bootstrap.js prevents listing-only pages from loading the full
// review widget chunk just to read settings.

import { PUBLIC_API_KEY, API_BASE } from './config.js';
import { cacheGet, cacheSet } from './cache.js';
import { fetchWithTimeout } from './fetch.js';
import { setThemeAdapterKey } from '../themes/current-adapter.js';
import { getPreviewSettingsStorage } from './namespace.js';

var SETTINGS_CACHE_KEY = 'renuvex_pr_settings_' + PUBLIC_API_KEY;
var SETTINGS_CACHE_TTL = 5 * 60 * 1000;
var SETTINGS_CACHE_STALE_TTL = 24 * 60 * 60 * 1000;
var SETTINGS_404_TTL = 30 * 1000;

// On a PDP with product carousels the reviews-main and listing-badge surfaces
// both call fetchSettings() before either has populated the cache. Sharing the
// in-flight promise collapses that race into a single network request.
var inflightSettings = null;

function applyRuntimeSettings(settings) {
  var runtime = settings && settings.runtime ? settings.runtime : {};
  setThemeAdapterKey(runtime.themeAdapterKey);
  return settings;
}

export function fetchSettings() {
  if (window.__ikasPreviewMode) {
    return loadPreviewSettings();
  }
  if (inflightSettings) return inflightSettings;
  inflightSettings = loadSettings();
  inflightSettings.then(resetInflightSettings, resetInflightSettings);
  return inflightSettings;
}

function resetInflightSettings() {
  inflightSettings = null;
}

async function loadPreviewSettings() {
  try {
    var previewBase = window.__ikasPreviewBaseUrl || API_BASE;
    var savedSettings = getPreviewSettingsStorage();
    var settingsOverride = {};
    if (savedSettings) {
      try { settingsOverride = JSON.parse(savedSettings); } catch (_) {}
    }
    var previewRes = await fetchWithTimeout(previewBase + '/api/preview/settings');
    if (previewRes.ok) {
      var previewData = await previewRes.json();
      if (previewData.widgets && previewData.widgets.reviews && Object.keys(settingsOverride).length) {
        previewData.widgets.reviews = Object.assign({}, previewData.widgets.reviews, settingsOverride);
      }
      return applyRuntimeSettings(previewData);
    }
  } catch (_) {}
  return null;
}

async function loadSettings() {
  var staleEntry = null;
  var cached = cacheGet(SETTINGS_CACHE_KEY);
  if (cached) {
    try {
      var entry = JSON.parse(cached);
      if (entry && entry.t !== undefined) {
        if (entry.notFound) {
          if (Date.now() - entry.t < SETTINGS_404_TTL) return null;
          cacheSet(SETTINGS_CACHE_KEY, '');
        } else if (entry.v) {
          var cacheAge = Date.now() - entry.t;
          if (cacheAge < SETTINGS_CACHE_TTL) return applyRuntimeSettings(entry.v);
          if (cacheAge < SETTINGS_CACHE_STALE_TTL) {
            staleEntry = entry.v;
          } else {
            cacheSet(SETTINGS_CACHE_KEY, '');
          }
        } else {
          cacheSet(SETTINGS_CACHE_KEY, '');
        }
      } else {
        cacheSet(SETTINGS_CACHE_KEY, '');
      }
    } catch (_) { cacheSet(SETTINGS_CACHE_KEY, ''); }
  }

  try {
    var res = await fetchWithTimeout(API_BASE + '/api/public/settings?publicApiKey=' + encodeURIComponent(PUBLIC_API_KEY));
    if (!res.ok) {
      if (res.status === 404) {
        cacheSet(SETTINGS_CACHE_KEY, JSON.stringify({ t: Date.now(), notFound: true }));
      }
      return staleEntry ? applyRuntimeSettings(staleEntry) : null;
    }
    var settings = await res.json();
    cacheSet(SETTINGS_CACHE_KEY, JSON.stringify({ t: Date.now(), v: settings }));
    return applyRuntimeSettings(settings);
  } catch (err) {
    console.error('[renuvex-pr] fetchSettings error:', err);
    return staleEntry ? applyRuntimeSettings(staleEntry) : null;
  }
}

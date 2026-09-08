// core/settings.js - public widget settings fetch/cache.
//
// Shared by product reviews and listing badges. Keeping this out of
// reviews-section/bootstrap.js prevents listing-only pages from loading the full
// review widget chunk just to read settings.

import { PUBLIC_API_KEY, API_BASE, READ_API_BASE } from './config.js';
import { cacheGet, cacheRemove, cacheSet } from './cache.js';
import { fetchWithTimeout } from './fetch.js';
import { setPlacementPolicy, setReviewsMountEnabled, setThemeAdapterKey } from '../themes/current-adapter.js';
import { getPreviewSettingsPayload } from './namespace.js';
import { markWidgetPerf } from './perf-timeline.js';

var SETTINGS_CACHE_KEY = 'renuvex_pr_settings_v2_' + PUBLIC_API_KEY;
var LEGACY_SETTINGS_CACHE_KEY = 'renuvex_pr_settings_' + PUBLIC_API_KEY;
var THEME_LAZY_SYNC_CACHE_KEY = 'renuvex_pr_theme_lazy_sync_' + PUBLIC_API_KEY;
var SETTINGS_CACHE_TTL = 5 * 60 * 1000;
var SETTINGS_CACHE_STALE_TTL = 24 * 60 * 60 * 1000;
var SETTINGS_404_TTL = 30 * 1000;
var THEME_LAZY_SYNC_TTL = 30 * 60 * 1000;

// On a PDP with product carousels the reviews-main and listing-badge surfaces
// both call fetchSettings() before either has populated the cache. Sharing the
// in-flight promise collapses that race into a single network request.
var inflightSettings = null;

function applyRuntimeSettings(settings, options) {
  options = options || {};
  var runtime = settings && settings.runtime ? settings.runtime : {};
  setThemeAdapterKey(runtime.themeAdapterKey);
  // The versioned policy is the sole production placement authority. Missing,
  // malformed, unknown-version, and stale policies all resolve to disabled.
  var validPolicy = setPlacementPolicy(runtime.placementPolicy);
  if (options.disablePlacement === true) {
    setPlacementPolicy({ version: 1, mode: 'disabled' });
  }
  if (validPolicy && !window.__ikasPreviewMode) {
    cacheRemove(LEGACY_SETTINGS_CACHE_KEY);
  }
  setReviewsMountEnabled(runtime.reviewsMountEnabled === true);
  scheduleThemeLazySync(runtime);
  return settings;
}

function scheduleThemeLazySync(runtime) {
  if (window.__ikasPreviewMode || !(runtime && runtime.themeSyncDue === true)) return;
  var cachedAttempt = cacheGet(THEME_LAZY_SYNC_CACHE_KEY);
  if (cachedAttempt) {
    var lastAttemptAt = Number(cachedAttempt);
    if (Number.isFinite(lastAttemptAt) && Date.now() - lastAttemptAt < THEME_LAZY_SYNC_TTL) return;
  }

  cacheSet(THEME_LAZY_SYNC_CACHE_KEY, String(Date.now()));
  void fetchWithTimeout(API_BASE + '/api/public/storefront-theme/lazy-sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ publicApiKey: PUBLIC_API_KEY }),
  }, 3000).catch(function () {});
}

export function fetchSettings() {
  markWidgetPerf('settings-start');
  var promise;
  if (window.__ikasPreviewMode) {
    promise = loadPreviewSettings();
  } else if (inflightSettings) {
    promise = inflightSettings;
  } else {
    inflightSettings = loadSettings();
    inflightSettings.then(resetInflightSettings, resetInflightSettings);
    promise = inflightSettings;
  }
  promise.then(function () {
    markWidgetPerf('settings-done');
  }, function () {
    markWidgetPerf('settings-error');
  });
  return promise;
}

function resetInflightSettings() {
  inflightSettings = null;
}

async function loadPreviewSettings() {
  var previewSettings = getPreviewSettingsPayload();
  return previewSettings ? applyRuntimeSettings(previewSettings) : null;
}

async function loadSettings() {
  var staleEntry = null;
  var cached = cacheGet(SETTINGS_CACHE_KEY);
  if (cached) {
    try {
      var entry = JSON.parse(cached);
      if (entry && entry.t !== undefined) {
        if (entry.notFound) {
          if (Date.now() - entry.t < SETTINGS_404_TTL) {
            setPlacementPolicy({ version: 1, mode: 'disabled' });
            return null;
          }
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
    var res = await fetchWithTimeout(READ_API_BASE + '/api/public/settings?publicApiKey=' + encodeURIComponent(PUBLIC_API_KEY));
    if (!res.ok) {
      if (res.status === 404) {
        cacheSet(SETTINGS_CACHE_KEY, JSON.stringify({ t: Date.now(), notFound: true }));
      }
      if (staleEntry) return applyRuntimeSettings(staleEntry, { disablePlacement: true });
      setPlacementPolicy({ version: 1, mode: 'disabled' });
      return null;
    }
    var settings = await res.json();
    cacheSet(SETTINGS_CACHE_KEY, JSON.stringify({ t: Date.now(), v: settings }));
    return applyRuntimeSettings(settings);
  } catch (err) {
    console.error('[renuvex-pr] fetchSettings error:', err);
    if (staleEntry) return applyRuntimeSettings(staleEntry, { disablePlacement: true });
    setPlacementPolicy({ version: 1, mode: 'disabled' });
    return null;
  }
}

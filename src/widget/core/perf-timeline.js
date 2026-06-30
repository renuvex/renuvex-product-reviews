// core/perf-timeline.js - opt-in storefront startup timing markers.

var TIMELINE_KEY = '__renuvexPerfTimeline';

function now() {
  try {
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      return performance.now();
    }
  } catch (_) {}
  return Date.now();
}

function isEnabledFromSearch(search) {
  return /(?:^|[?&])renuvexPerf=1(?:&|$)/.test(String(search || ''));
}

function isEnabledFromStorage(value) {
  return String(value || '') === '1';
}

export function isWidgetPerfTimelineEnabled() {
  try {
    if (typeof window === 'undefined') return false;
    if (window.__renuvexPerfEnabled === true) return true;
    if (window.location && isEnabledFromSearch(window.location.search)) return true;
    if (window.localStorage && isEnabledFromStorage(window.localStorage.getItem('renuvexPerf'))) return true;
  } catch (_) {}
  return false;
}

function getTimeline() {
  try {
    if (!isWidgetPerfTimelineEnabled()) return null;
    var root = window;
    if (!root[TIMELINE_KEY] || !Array.isArray(root[TIMELINE_KEY].marks)) {
      root[TIMELINE_KEY] = {
        version: 1,
        startedAt: now(),
        marks: [],
      };
    }
    return root[TIMELINE_KEY];
  } catch (_) {
    return null;
  }
}

export function markWidgetPerf(name, detail) {
  try {
    var timeline = getTimeline();
    if (!timeline) return;
    var entry = {
      name: String(name || '').slice(0, 120),
      at: now(),
    };
    if (detail && typeof detail === 'object') {
      entry.detail = detail;
    }
    timeline.marks.push(entry);
  } catch (_) {}
}

export function isWidgetPerfTimelineFlagEnabledForTest(search, storageValue) {
  return isEnabledFromSearch(search) || isEnabledFromStorage(storageValue);
}

// cache.js — sessionStorage wrapper (private browsing / quota exceeded koruması)

var _memCache = {};

export function cacheGet(key) {
  try { return sessionStorage.getItem(key); } catch (_) { return _memCache[key] || null; }
}

export function cacheSet(key, val) {
  try { sessionStorage.setItem(key, val); } catch (_) { _memCache[key] = val; }
}

// fetch.js — Timeout destekli fetch wrapper (8sn sonra abort)

export function fetchWithTimeout(url, options, ms) {
  var ctrl = new AbortController();
  var timer = setTimeout(function () { ctrl.abort(); }, ms || 8000);
  return fetch(url, Object.assign({}, options, { signal: ctrl.signal }))
    .finally(function () { clearTimeout(timer); });
}

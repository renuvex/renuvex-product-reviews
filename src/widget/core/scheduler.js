// core/scheduler.js - small browser scheduling helpers for non-critical widget work.

export function scheduleIdleTask(task, options) {
  var timeout = options && Number.isFinite(options.timeout) ? options.timeout : 1500;
  var fallbackDelay = options && Number.isFinite(options.fallbackDelay) ? options.fallbackDelay : 250;

  if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
    return window.requestIdleCallback(function () {
      task();
    }, { timeout: timeout });
  }

  return setTimeout(function () {
    task();
  }, fallbackDelay);
}

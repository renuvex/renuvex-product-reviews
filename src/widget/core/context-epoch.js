// Monotonic storefront context ownership for SPA navigation and async work.

var epoch = 1;
var routeKey = currentRouteKey();
var productId = null;
var awaitingProduct = false;
var subscribers = [];

function currentRouteKey() {
  try {
    return window.location && window.location.pathname ? window.location.pathname : '';
  } catch (_) {
    return '';
  }
}

function emitInvalidation() {
  subscribers.slice().forEach(function (subscriber) {
    try { subscriber(epoch); } catch (_) {}
  });
}

function invalidate() {
  epoch += 1;
  emitInvalidation();
  return epoch;
}

export function noteStorefrontRoute() {
  var nextRouteKey = currentRouteKey();
  if (nextRouteKey === routeKey) return epoch;
  routeKey = nextRouteKey;
  productId = null;
  awaitingProduct = true;
  return invalidate();
}

export function noteStorefrontProduct(nextProductId) {
  var normalized = nextProductId === undefined || nextProductId === null
    ? null
    : String(nextProductId);
  if (!normalized) return epoch;

  if (awaitingProduct || !productId) {
    awaitingProduct = false;
    productId = normalized;
    return epoch;
  }

  if (productId !== normalized) {
    productId = normalized;
    return invalidate();
  }
  return epoch;
}

export function getStorefrontContextEpoch() {
  return epoch;
}

export function isStorefrontContextCurrent(expectedEpoch) {
  return expectedEpoch === epoch;
}

export function onStorefrontContextInvalidated(subscriber) {
  if (typeof subscriber !== 'function') return function () {};
  subscribers.push(subscriber);
  return function () {
    subscribers = subscribers.filter(function (candidate) {
      return candidate !== subscriber;
    });
  };
}

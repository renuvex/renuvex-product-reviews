// structured-data/jsonld.js - Product AggregateRating JSON-LD ownership.
//
// This module owns only the Renuvex structured-data script. It never mutates
// ikas/theme/native Product JSON-LD blocks; when possible it reuses their @id
// so search engines can merge entity hints without us editing host markup.

export var STRUCTURED_DATA_SCRIPT_ID = 'renuvex-pr-jsonld';

export function cleanupStructuredDataDom() {
  if (typeof document === 'undefined') return;
  document.querySelectorAll('#' + STRUCTURED_DATA_SCRIPT_ID).forEach(function (node) {
    node.remove();
  });
}

if (typeof window !== 'undefined') {
  window.__renuvexPrCleanupStructuredData = cleanupStructuredDataDom;
}

function withoutHash(url) {
  return String(url || '').split('#')[0];
}

function getCanonicalUrl() {
  try {
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && canonical.href) return withoutHash(canonical.href);
  } catch (_) {}
  try {
    return withoutHash(window.location.href);
  } catch (_) {
    return '';
  }
}

function findProductEntityIdInValue(value) {
  if (!value) return null;
  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      var found = findProductEntityIdInValue(value[i]);
      if (found) return found;
    }
    return null;
  }
  if (value['@graph']) return findProductEntityIdInValue(value['@graph']);
  var type = value['@type'];
  var isProduct = type === 'Product' || (Array.isArray(type) && type.indexOf('Product') !== -1);
  if (!isProduct) return null;
  return typeof value['@id'] === 'string' && value['@id'] ? value['@id'] : null;
}

function findExistingProductEntityId() {
  if (typeof document === 'undefined') return null;
  try {
    var scripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < scripts.length; i++) {
      var script = scripts[i];
      if (script.id === STRUCTURED_DATA_SCRIPT_ID) continue;
      var found = findProductEntityIdInValue(JSON.parse(script.textContent || 'null'));
      if (found) return found;
    }
  } catch (_) {}
  return null;
}

export function buildProductAggregateRatingJsonLd(input) {
  var url = input && input.url ? withoutHash(input.url) : getCanonicalUrl();
  var entityId = (input && input.entityId) || findExistingProductEntityId() || (url ? url + '#product' : undefined);
  var ratingValue = Number(input && input.ratingValue);
  var reviewCount = Number(input && input.reviewCount);

  var payload = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: (input && input.productName) || (typeof document !== 'undefined' ? document.title : ''),
    url: url,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: Number.isFinite(ratingValue) ? ratingValue : input.ratingValue,
      reviewCount: Number.isFinite(reviewCount) ? reviewCount : input.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
  };
  if (entityId) payload['@id'] = entityId;
  return payload;
}

export function injectProductAggregateRatingJsonLd(payload) {
  if (typeof document === 'undefined' || !payload) return;
  cleanupStructuredDataDom();
  var jsonLdEl = document.createElement('script');
  jsonLdEl.id = STRUCTURED_DATA_SCRIPT_ID;
  jsonLdEl.type = 'application/ld+json';
  jsonLdEl.textContent = JSON.stringify(payload);
  document.head.appendChild(jsonLdEl);
}

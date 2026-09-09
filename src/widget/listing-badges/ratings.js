// listing-badges/ratings.js - canonical Product ID rating reads and one-shot
// lifecycle-safe slug discovery for strict listing candidates.

import { PUBLIC_API_KEY, READ_API_BASE } from '../core/config.js';
import { cacheGet, cacheSet } from '../core/cache.js';
import { fetchWithTimeout } from '../core/fetch.js';
import { reportWidgetHealth } from '../core/health.js';

var RATINGS_CACHE_TTL = 5 * 60 * 1000;
var RATINGS_BATCH_SIZE = 50;

function normalizeProductId(value) {
  if (typeof value !== 'string') return null;
  var normalized = value.trim();
  return normalized && normalized.length <= 128 ? normalized : null;
}

function normalizeTargets(input) {
  if (Array.isArray(input)) {
    var legacy = {};
    input.forEach(function (slug) {
      legacy[slug] = { productId: null, identitySource: null, adapterKey: 'unknown' };
    });
    return legacy;
  }
  return input || {};
}

function normalizeRating(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  if (typeof value.avg !== 'string' && typeof value.avg !== 'number') return null;
  if (typeof value.count !== 'number') return null;
  var avg = Number(value.avg);
  var count = value.count;
  if (!Number.isFinite(avg) || avg < 0 || avg > 5) return null;
  if (!Number.isInteger(count) || count < 0) return null;
  return {
    avg: avg.toFixed(1),
    count: count,
    _empty: count === 0,
  };
}

function batch(values) {
  var batches = [];
  for (var i = 0; i < values.length; i += RATINGS_BATCH_SIZE) {
    batches.push(values.slice(i, i + RATINGS_BATCH_SIZE));
  }
  return batches;
}

function fetchJsonData(url) {
  return fetchWithTimeout(url)
    .then(function (res) {
      if (!res.ok) {
        return {
          ok: false,
          data: {},
          reason: res.status === 429 ? 'http_429' : res.status >= 500 ? 'http_5xx' : 'http_error',
        };
      }
      return res.json()
        .then(function (json) {
          if (!json || !json.data || typeof json.data !== 'object' || Array.isArray(json.data)) {
            return { ok: false, data: {}, reason: 'malformed_response' };
          }
          return { ok: true, data: json.data, reason: null };
        })
        .catch(function () { return { ok: false, data: {}, reason: 'malformed_response' }; });
    })
    .catch(function () { return { ok: false, data: {}, reason: 'network_error' }; });
}

function readProductRatingCache(cacheKey) {
  var raw = cacheGet(cacheKey);
  if (!raw) return {};
  try {
    var parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('invalid cache');
    var now = Date.now();
    var valid = {};
    Object.keys(parsed).forEach(function (productId) {
      var entry = parsed[productId];
      var rating = normalizeRating(entry);
      if (!normalizeProductId(productId) || !rating || !entry || typeof entry.cachedAt !== 'number') return;
      if (now - entry.cachedAt >= RATINGS_CACHE_TTL) return;
      valid[productId] = Object.assign({}, rating, { cachedAt: entry.cachedAt });
    });
    return valid;
  } catch (_) {
    cacheSet(cacheKey, '');
    return {};
  }
}

function writeProductRatingCache(cacheKey, cache) {
  cacheSet(cacheKey, JSON.stringify(cache));
}

function reportResolution(type, target, reason) {
  reportWidgetHealth(type, type === 'identity-resolution-miss'
    ? 'Product identity could not be resolved'
    : 'Product identity resolution failed', {
    surface: 'listing',
    adapterKey: (target && target.adapterKey) || 'unknown',
    reason: reason || 'unknown',
  });
}

function resolvedOutcome(productId, identitySource, rating) {
  return {
    status: 'resolved',
    productId: productId,
    identitySource: identitySource,
    rating: rating,
  };
}

function errorOutcome(reason) {
  return { status: 'error', reason: reason };
}

export async function fetchRatings(input) {
  var targets = normalizeTargets(input);
  var slugs = Object.keys(targets);
  var ratingsKey = 'renuvex_pr_ratings_v3_' + PUBLIC_API_KEY;
  var cache = readProductRatingCache(ratingsKey);
  var outcomes = {};
  var missingProductIds = [];
  var productIdTargets = {};
  var slugOnly = [];

  slugs.forEach(function (slug) {
    var target = targets[slug] || {};
    if (target.identityBlockReason) {
      outcomes[slug] = { status: 'unresolved', reason: 'identity_conflict' };
      return;
    }

    var productId = normalizeProductId(target.productId);
    if (target.productId && !productId) {
      outcomes[slug] = errorOutcome('malformed_product_id');
      reportResolution('identity-resolution-error', target, 'malformed_product_id');
      return;
    }
    if (!productId) {
      slugOnly.push(slug);
      return;
    }

    var source = target.identitySource || 'storefront_event';
    if (cache[productId]) {
      outcomes[slug] = resolvedOutcome(productId, source, normalizeRating(cache[productId]));
      return;
    }
    if (!productIdTargets[productId]) {
      productIdTargets[productId] = [];
      missingProductIds.push(productId);
    }
    productIdTargets[productId].push(slug);
  });

  var productBatchResults = await Promise.all(batch(missingProductIds).map(function (productBatch) {
    var url = READ_API_BASE + '/api/public/ratings?storeId=' + encodeURIComponent(PUBLIC_API_KEY) +
      '&productIds=' + productBatch.map(encodeURIComponent).join(',');
    return fetchJsonData(url).then(function (result) {
      return { productIds: productBatch, result: result };
    });
  }));

  productBatchResults.forEach(function (batchResult) {
    var result = batchResult.result;
    var unexpectedKey = result.ok && Object.keys(result.data).some(function (key) {
      return batchResult.productIds.indexOf(key) === -1;
    });
    batchResult.productIds.forEach(function (productId) {
      var targetSlugs = productIdTargets[productId] || [];
      if (!result.ok || unexpectedKey) {
        var reason = unexpectedKey ? 'unexpected_response_key' : result.reason;
        targetSlugs.forEach(function (slug) {
          outcomes[slug] = errorOutcome(reason);
        });
        return;
      }

      var hasRating = Object.prototype.hasOwnProperty.call(result.data, productId);
      var rating = hasRating ? normalizeRating(result.data[productId]) : normalizeRating({ avg: '0.0', count: 0 });
      if (!rating) {
        targetSlugs.forEach(function (slug) {
          outcomes[slug] = errorOutcome('malformed_rating');
        });
        return;
      }
      cache[productId] = Object.assign({}, rating, { cachedAt: Date.now() });
      targetSlugs.forEach(function (slug) {
        outcomes[slug] = resolvedOutcome(
          productId,
          targets[slug].identitySource || 'storefront_event',
          rating,
        );
      });
    });
  });

  var slugFallbackResults = await Promise.all(batch(slugOnly).map(function (slugBatch) {
    var url = READ_API_BASE + '/api/public/ratings-by-slug?storeId=' + encodeURIComponent(PUBLIC_API_KEY) +
      '&slugs=' + slugBatch.map(encodeURIComponent).join(',');
    return fetchJsonData(url).then(function (result) {
      return { slugs: slugBatch, result: result };
    });
  }));

  slugFallbackResults.forEach(function (batchResult) {
    var result = batchResult.result;
    var unexpectedKey = result.ok && Object.keys(result.data).some(function (key) {
      return batchResult.slugs.indexOf(key) === -1;
    });
    batchResult.slugs.forEach(function (slug) {
      var target = targets[slug] || {};
      if (!result.ok || unexpectedKey) {
        var reason = unexpectedKey ? 'unexpected_response_key' : result.reason;
        outcomes[slug] = errorOutcome(reason);
        reportResolution('identity-resolution-error', target, reason);
        return;
      }
      if (!Object.prototype.hasOwnProperty.call(result.data, slug)) {
        outcomes[slug] = { status: 'unresolved', reason: 'not_resolved' };
        reportResolution('identity-resolution-miss', target, 'not_resolved');
        return;
      }

      var entry = result.data[slug];
      var productId = normalizeProductId(entry && entry.productId);
      var rating = normalizeRating(entry);
      if (!productId || !rating) {
        var invalidReason = !productId ? 'missing_product_id' : 'malformed_rating';
        outcomes[slug] = errorOutcome(invalidReason);
        reportResolution('identity-resolution-error', target, invalidReason);
        return;
      }

      cache[productId] = Object.assign({}, rating, { cachedAt: Date.now() });
      outcomes[slug] = resolvedOutcome(productId, 'lifecycle_resolver', rating);
    });
  });

  writeProductRatingCache(ratingsKey, cache);
  return { outcomes: outcomes };
}

// listing-badges/ratings.js - fetches listing ratings from cache and public APIs.

import { PUBLIC_API_KEY, READ_API_BASE } from '../core/config.js';
import { cacheGet, cacheSet } from '../core/cache.js';
import { fetchWithTimeout } from '../core/fetch.js';

var RATINGS_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
var RATINGS_BATCH_SIZE = 50;

function normalizeTargets(input) {
  if (Array.isArray(input)) {
    var legacy = {};
    input.forEach(function(slug) {
      legacy[slug] = { productId: null, name: null };
    });
    return legacy;
  }
  return input || {};
}

function applyProductRatingsToSlugs(ratings, targets, productRatings) {
  Object.keys(targets).forEach(function(slug) {
    var productId = targets[slug] && targets[slug].productId;
    if (productId && productRatings[productId]) {
      ratings[slug] = Object.assign({}, productRatings[productId], { _productId: productId });
    }
  });
}

function markEmpty(ratings, slugs, targets) {
  slugs.forEach(function(slug) {
    var productId = targets[slug] && targets[slug].productId;
    var existing = ratings[slug];
    if (!existing || (productId && existing._productId !== productId)) {
      ratings[slug] = { avg: '0.0', count: 0, _empty: true };
      if (productId) ratings[slug]._productId = productId;
    }
  });
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
    .then(function(res) {
      if (!res.ok) return { ok: false, data: {} };
      return res.json()
        .then(function(json) {
          if (!json || !json.data || typeof json.data !== 'object' || Array.isArray(json.data)) {
            return { ok: false, data: {} };
          }
          return { ok: true, data: json.data };
        })
        .catch(function() { return { ok: false, data: {} }; });
    })
    .catch(function() { return { ok: false, data: {} }; });
}

export async function fetchRatings(input) {
  var targets = normalizeTargets(input);
  var slugs = Object.keys(targets);
  var ratingsKey = 'renuvex_pr_ratings_v2_' + PUBLIC_API_KEY;
  var ratings = {};
  var resolvedTargets = {};

  var cached = cacheGet(ratingsKey);
  if (cached) {
    try {
      var entry = JSON.parse(cached);
      if (entry && entry.t !== undefined && Date.now() - entry.t < RATINGS_CACHE_TTL) {
        ratings = entry.v || {};
      } else {
        cacheSet(ratingsKey, '');
      }
    } catch (_) { cacheSet(ratingsKey, ''); }
  }

  var missing = slugs.filter(function(slug) {
    var productId = targets[slug] && targets[slug].productId;
    if (!ratings[slug]) return true;
    return !!(productId && ratings[slug]._productId !== productId);
  });
  slugs.forEach(function(slug) {
    if (missing.indexOf(slug) === -1) resolvedTargets[slug] = targets[slug].productId || null;
  });
  if (!missing.length) return { ratings: ratings, resolvedTargets: resolvedTargets };

  var missingWithProductId = missing.filter(function(slug) {
    return !!(targets[slug] && targets[slug].productId);
  });
  var missingBySlugOnly = missing.filter(function(slug) {
    return !(targets[slug] && targets[slug].productId);
  });

  var productIds = [];
  var seenProductIds = {};
  missingWithProductId.forEach(function(slug) {
    var productId = targets[slug].productId;
    if (!seenProductIds[productId]) {
      seenProductIds[productId] = true;
      productIds.push(productId);
    }
  });

  var productBatchResults = await Promise.all(batch(productIds).map(function(productBatch) {
    var url = READ_API_BASE + '/api/public/ratings?storeId=' + encodeURIComponent(PUBLIC_API_KEY) +
      '&productIds=' + productBatch.map(encodeURIComponent).join(',');
    return fetchJsonData(url).then(function(result) {
      return { productIds: productBatch, result: result };
    });
  }));

  productBatchResults.forEach(function(batchResult) {
    if (!batchResult.result.ok) return;
    var resolvedSlugs = missingWithProductId.filter(function(slug) {
      return batchResult.productIds.indexOf(targets[slug].productId) !== -1;
    });
    applyProductRatingsToSlugs(ratings, targets, batchResult.result.data);
    markEmpty(ratings, resolvedSlugs, targets);
    resolvedSlugs.forEach(function(slug) {
      resolvedTargets[slug] = targets[slug].productId;
    });
  });

  var slugFallbackResults = await Promise.all(batch(missingBySlugOnly).map(function(slugBatch) {
    var url = READ_API_BASE + '/api/public/ratings-by-slug?storeId=' + encodeURIComponent(PUBLIC_API_KEY) +
      '&slugs=' + slugBatch.map(encodeURIComponent).join(',');
    return fetchJsonData(url).then(function(result) {
      return { slugs: slugBatch, result: result };
    });
  }));

  slugFallbackResults.forEach(function(batchResult) {
    if (!batchResult.result.ok) return;
    batchResult.slugs.forEach(function(slug) {
      if (batchResult.result.data[slug]) ratings[slug] = batchResult.result.data[slug];
      resolvedTargets[slug] = null;
    });
    markEmpty(ratings, batchResult.slugs, targets);
  });

  var exactIdRatings = {};
  Object.keys(ratings).forEach(function(slug) {
    if (ratings[slug] && ratings[slug]._productId) exactIdRatings[slug] = ratings[slug];
  });
  cacheSet(ratingsKey, JSON.stringify({ t: Date.now(), v: exactIdRatings }));
  return { ratings: ratings, resolvedTargets: resolvedTargets };
}

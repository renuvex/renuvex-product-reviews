// listing-badges/ratings.js — Slug bazlı rating'leri cache + API'den çeker

import { PUBLIC_API_KEY, API_BASE } from '../core/config.js';
import { cacheGet, cacheSet } from '../core/cache.js';
import { fetchWithTimeout } from '../core/fetch.js';

var RATINGS_CACHE_TTL = 60 * 1000; // 1 dakika
var RATINGS_BATCH_SIZE = 50;

export async function fetchRatings(slugs) {
  var ratingsKey = 'ikr_ratings_' + PUBLIC_API_KEY;
  var ratings = {};

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

  var missing = slugs.filter(function(s) { return !ratings[s]; });
  if (!missing.length) return ratings;

  var batches = [];
  for (var i = 0; i < missing.length; i += RATINGS_BATCH_SIZE) {
    batches.push(missing.slice(i, i + RATINGS_BATCH_SIZE));
  }

  var batchResults = await Promise.all(batches.map(function(batch) {
    var url = API_BASE + '/api/public/ratings-by-slug?storeId=' + encodeURIComponent(PUBLIC_API_KEY) +
      '&slugs=' + batch.map(encodeURIComponent).join(',');
    return fetchWithTimeout(url)
      .then(function(res) { return res.ok ? res.json().then(function(j) { return j.data || {}; }) : {}; })
      .catch(function() { return {}; });
  }));

  batchResults.forEach(function(data) {
    Object.keys(data).forEach(function(slug) { ratings[slug] = data[slug]; });
  });
  cacheSet(ratingsKey, JSON.stringify({ t: Date.now(), v: ratings }));
  return ratings;
}

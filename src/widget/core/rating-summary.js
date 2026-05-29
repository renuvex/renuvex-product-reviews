// core/rating-summary.js - shared one-product rating summary fetch.
//
// PDP badge and structured-data both need the same approved review average/count.
// Keep the request here so those surfaces do not race into duplicate
// /api/public/ratings calls for the same product.

import { PUBLIC_API_KEY, API_BASE } from './config.js';
import { fetchWithTimeout } from './fetch.js';

var summaryCacheByProductId = {};
var inflightByProductId = {};

function normalizeSummary(record) {
  if (!record || !record.count || record.count <= 0) return null;
  return {
    avg: record.avg,
    count: record.count,
  };
}

export async function fetchRatingSummary(productId) {
  if (!productId) return null;
  if (summaryCacheByProductId[productId]) return summaryCacheByProductId[productId];
  if (inflightByProductId[productId]) return inflightByProductId[productId];

  var promise = (async function () {
    try {
      var url = API_BASE + '/api/public/ratings?storeId=' + encodeURIComponent(PUBLIC_API_KEY) +
        '&productIds=' + encodeURIComponent(productId);
      var res = await fetchWithTimeout(url);
      if (!res.ok) return null;
      var json = await res.json();
      var record = json && json.data && json.data[productId];
      var summary = normalizeSummary(record);
      if (summary) summaryCacheByProductId[productId] = summary;
      return summary;
    } catch (err) {
      console.error('[renuvex-pr] rating summary fetch failed:', err);
      return null;
    } finally {
      delete inflightByProductId[productId];
    }
  })();

  inflightByProductId[productId] = promise;
  return promise;
}


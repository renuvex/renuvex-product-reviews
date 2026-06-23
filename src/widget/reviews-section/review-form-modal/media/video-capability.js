import { PUBLIC_API_KEY, API_BASE } from '../../../core/config.js';
import { fetchWithTimeout } from '../../../core/fetch.js';

var CAPABILITY_TIMEOUT_MS = 4000;

export async function fetchReviewVideoCapability() {
  var response = await fetchWithTimeout(
    API_BASE + '/api/public/upload/video/capability?storeId=' + encodeURIComponent(PUBLIC_API_KEY),
    { method: 'GET', cache: 'no-store' },
    CAPABILITY_TIMEOUT_MS,
  );
  if (!response.ok) {
    var error = new Error('video_capability_unavailable');
    error.code = 'video_capability_http';
    error.status = response.status;
    throw error;
  }
  var payload = await response.json().catch(function () { return {}; });
  var data = payload && payload.data;
  if (!data || typeof data.enabled !== 'boolean') {
    var invalidError = new Error('video_capability_invalid');
    invalidError.code = 'video_capability_invalid';
    throw invalidError;
  }
  return {
    enabled: data.enabled === true,
    reason: typeof data.reason === 'string' ? data.reason : null,
  };
}

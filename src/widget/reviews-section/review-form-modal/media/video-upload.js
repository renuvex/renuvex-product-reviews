import { PUBLIC_API_KEY, API_BASE } from '../../../core/config.js';
import { fetchWithTimeout } from '../../../core/fetch.js';

var VIDEO_MAX_BYTES = 150 * 1024 * 1024;
var VIDEO_MIN_DURATION_SECONDS = 2;
var VIDEO_MAX_DURATION_SECONDS = 60;
var DEFAULT_VIDEO_UPLOAD_CHUNK_SIZE_KB = 8192;
var DEFAULT_VIDEO_UPLOAD_CHUNK_ATTEMPTS = 5;
var DEFAULT_VIDEO_UPLOAD_STALL_TIMEOUT_MS = 30000;
var VIDEO_UPLOAD_AUTO_RECOVERY_LIMIT = 1;
var ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime'];
var SESSION_STORAGE_PREFIX = 'renuvex_pr_video_upload_';
var PENDING_CANCEL_STORAGE_PREFIX = 'renuvex_pr_video_cancel_';
var cancelFlushPromise = null;
var cancelOnlineListenerInstalled = false;

var VIDEO_UPLOAD_ERROR_MESSAGES = {
  video_quota_exceeded: 'Bu mağaza bu ayki video yorum limitine ulaştı.',
  rate_limited: 'Çok fazla deneme yapıldı. Lütfen biraz sonra tekrar deneyin.',
  video_upload_disabled: 'Video yükleme şu anda kullanılamıyor.',
  video_provider_unavailable: 'Video yükleme geçici olarak kullanılamıyor.',
  video_processing_delayed: 'Video hazırlanması beklenenden uzun sürüyor. Biraz sonra tekrar deneyin.',
};

var NON_RETRYABLE_VIDEO_UPLOAD_ERRORS = {
  video_quota_exceeded: true,
  rate_limited: true,
  video_upload_disabled: true,
};

export class VideoUploadRequestError extends Error {
  constructor(code, status, retryAfterSec) {
    super(code || 'video_request_failed');
    this.name = 'VideoUploadRequestError';
    this.code = code || 'video_request_failed';
    this.status = status || 0;
    this.retryAfterSec = retryAfterSec || null;
  }
}

export function describeVideoUploadError(error) {
  var code = error && typeof error.code === 'string'
    ? error.code
    : error && typeof error.message === 'string'
      ? error.message
      : 'video_request_failed';
  return {
    code: code,
    message: VIDEO_UPLOAD_ERROR_MESSAGES[code] || 'Video yüklenemedi. Tekrar deneyin.',
    retryable: NON_RETRYABLE_VIDEO_UPLOAD_ERRORS[code] !== true,
    retryAfterSec: error && Number.isFinite(error.retryAfterSec) ? error.retryAfterSec : null,
  };
}

export function shouldDiscardStoredVideoSession(error) {
  if (!error || Number(error.status) !== 404) return false;
  return error.code === 'upload_not_found' || error.code === 'invalid_or_expired_upload';
}

function sleep(ms) {
  return new Promise(function (resolve) { setTimeout(resolve, ms); });
}

function nowMs() {
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') return performance.now();
  return Date.now();
}

function elapsedMs(start) {
  return Math.max(0, Math.round(nowMs() - start));
}

function uploadStallTimeoutMs() {
  if (typeof window !== 'undefined') {
    var override = Number(window.__renuvexPrVideoUploadStallMs);
    if (Number.isFinite(override) && override >= 250) return override;
  }
  return DEFAULT_VIDEO_UPLOAD_STALL_TIMEOUT_MS;
}

function sleepWithSignal(ms, signal) {
  return new Promise(function (resolve, reject) {
    var timer = setTimeout(finish, ms);
    function finish() {
      if (signal) signal.removeEventListener('abort', abort);
      resolve();
    }
    function abort() {
      clearTimeout(timer);
      if (signal) signal.removeEventListener('abort', abort);
      reject(new DOMException('Aborted', 'AbortError'));
    }
    if (signal) signal.addEventListener('abort', abort, { once: true });
  });
}

function fingerprint(file) {
  return [file.name, file.size, file.lastModified, file.type].join('_').slice(0, 128);
}

function sessionStorageKey(productId, file) {
  return SESSION_STORAGE_PREFIX + PUBLIC_API_KEY + '_' + productId + '_' + fingerprint(file);
}

function readStoredSession(productId, file) {
  try {
    var raw = window.sessionStorage.getItem(sessionStorageKey(productId, file));
    var value = raw ? JSON.parse(raw) : null;
    if (!value || typeof value.token !== 'string' || !value.expiresAt) return null;
    if (new Date(value.expiresAt).getTime() <= Date.now()) return null;
    return value;
  } catch (_) {
    return null;
  }
}

function storeSession(productId, file, value) {
  try { window.sessionStorage.setItem(sessionStorageKey(productId, file), JSON.stringify(value)); } catch (_) {}
}

function clearStoredSession(productId, file) {
  try { window.sessionStorage.removeItem(sessionStorageKey(productId, file)); } catch (_) {}
}

function pendingCancelStorageKey(productId, file) {
  return PENDING_CANCEL_STORAGE_PREFIX + PUBLIC_API_KEY + '_' + productId + '_' + fingerprint(file);
}

function storePendingCancel(token, productId, file, expiresAt) {
  if (!token || !productId || !file) return;
  var value = {
    token: token,
    productId: productId,
    expiresAt: expiresAt || null,
  };
  try {
    window.sessionStorage.setItem(pendingCancelStorageKey(productId, file), JSON.stringify(value));
  } catch (_) {}
}

function pendingCancelEntries() {
  var entries = [];
  try {
    for (var index = 0; index < window.sessionStorage.length; index += 1) {
      var key = window.sessionStorage.key(index);
      if (!key || key.indexOf(PENDING_CANCEL_STORAGE_PREFIX + PUBLIC_API_KEY + '_') !== 0) continue;
      var raw = window.sessionStorage.getItem(key);
      var value = raw ? JSON.parse(raw) : null;
      if (!value || typeof value.token !== 'string') {
        window.sessionStorage.removeItem(key);
        index -= 1;
        continue;
      }
      entries.push({ key: key, token: value.token });
    }
  } catch (_) {}
  return entries;
}

function clearPendingCancel(key) {
  try { window.sessionStorage.removeItem(key); } catch (_) {}
}

async function jsonRequest(path, options, timeoutMs) {
  var response = await fetchWithTimeout(API_BASE + path, options, timeoutMs || 20000);
  var payload = await response.json().catch(function () { return {}; });
  if (!response.ok) {
    var retryAfter = Number(response.headers.get('Retry-After'));
    throw new VideoUploadRequestError(
      payload.error || 'video_request_failed',
      response.status,
      Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : null,
    );
  }
  return payload.data || {};
}

async function submitUploadMetrics(token, metrics, finalStatus) {
  if (!token || typeof window === 'undefined' || window.__ikasPreviewMode) return;
  try {
    await jsonRequest('/api/public/upload/video/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: token,
        chunkSizeKb: metrics.chunkSizeKb || 0,
        chunkAttempts: metrics.chunkAttempts || 0,
        retryClicks: metrics.retryClicks || 0,
        upchunkErrors: metrics.upchunkErrors || 0,
        firstErrorCode: metrics.firstErrorCode || null,
        directUploadMs: metrics.directUploadMs,
        completeMs: metrics.completeMs,
        processingPollMs: metrics.processingPollMs,
        totalClientMs: elapsedMs(metrics.startedAt),
        finalStatus: finalStatus,
      }),
    }, 4000);
  } catch (_) {}
}

async function sendPendingCancel(entry) {
  try {
    await jsonRequest('/api/public/upload/video', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: entry.token }),
    }, 8000);
    clearPendingCancel(entry.key);
    return true;
  } catch (error) {
    if (error && (Number(error.status) === 404 || Number(error.status) === 409)) {
      clearPendingCancel(entry.key);
      return true;
    }
    return false;
  }
}

export function flushPendingVideoCancellations() {
  if (typeof window === 'undefined' || window.__ikasPreviewMode) return Promise.resolve();
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return Promise.resolve();
  if (cancelFlushPromise) return cancelFlushPromise;
  cancelFlushPromise = (async function () {
    var entries = pendingCancelEntries();
    for (var index = 0; index < entries.length; index += 1) {
      await sendPendingCancel(entries[index]);
    }
  })().finally(function () {
    cancelFlushPromise = null;
  });
  return cancelFlushPromise;
}

export function ensurePendingVideoCancelDelivery() {
  if (typeof window === 'undefined' || cancelOnlineListenerInstalled) return;
  cancelOnlineListenerInstalled = true;
  window.addEventListener('online', function () {
    flushPendingVideoCancellations();
  });
  flushPendingVideoCancellations();
}

async function loadUpChunkCreateUpload() {
  var upchunkModule = await import('@mux/upchunk');
  if (upchunkModule && typeof upchunkModule.createUpload === 'function') return upchunkModule.createUpload;
  if (upchunkModule && upchunkModule.UpChunk && typeof upchunkModule.UpChunk.createUpload === 'function') {
    return upchunkModule.UpChunk.createUpload.bind(upchunkModule.UpChunk);
  }
  throw new Error('video_upload_sdk_unavailable');
}

function upchunkErrorCode(detail) {
  var response = detail && detail.response;
  var statusCode = response && Number(response.statusCode);
  if (Number.isFinite(statusCode) && statusCode > 0) return 'http_' + statusCode;
  if (detail && typeof detail.message === 'string' && detail.message) return 'upchunk_error';
  return 'upload_attempt_failed';
}

function isAutoRecoverableDirectUploadError(error) {
  if (!(error instanceof VideoUploadRequestError)) return false;
  return error.code === 'video_upload_stalled';
}

async function uploadToMuxDirectUrl(input) {
  var createUpload = await loadUpChunkCreateUpload();
  return new Promise(function (resolve, reject) {
    var settled = false;
    var upload = null;
    var stallTimer = null;
    var networkProbeTimer = null;
    var stallTimeout = uploadStallTimeoutMs();
    var removeWindowNetworkListeners = null;
    function finish(error) {
      if (settled) return;
      settled = true;
      if (stallTimer) clearTimeout(stallTimer);
      if (networkProbeTimer) clearInterval(networkProbeTimer);
      if (input.signal) input.signal.removeEventListener('abort', abort);
      if (removeWindowNetworkListeners) removeWindowNetworkListeners();
      if (error) reject(error);
      else resolve();
    }
    function scheduleStallWatch(forceOnline) {
      if (settled) return;
      if (stallTimer) clearTimeout(stallTimer);
      if (!forceOnline && typeof navigator !== 'undefined' && navigator.onLine === false) return;
      stallTimer = setTimeout(function () {
        if (settled) return;
        if (input.onUploadError) input.onUploadError('video_upload_stalled');
        finish(new VideoUploadRequestError('video_upload_stalled', 0, null));
        try { if (upload) upload.abort(); } catch (_) {}
      }, stallTimeout);
    }
    function noteActivity() {
      if (settled) return;
      scheduleStallWatch();
    }
    function pauseStallWatch() {
      if (stallTimer) clearTimeout(stallTimer);
      stallTimer = null;
    }
    function clearNetworkProbe() {
      if (networkProbeTimer) clearInterval(networkProbeTimer);
      networkProbeTimer = null;
    }
    function startNetworkProbe() {
      if (networkProbeTimer || settled) return;
      networkProbeTimer = setInterval(function () {
        if (settled) return clearNetworkProbe();
        if (typeof navigator === 'undefined' || navigator.onLine !== false) markOnline();
      }, 1000);
    }
    function markOffline() {
      pauseStallWatch();
      input.onStatus('uploading_offline');
      startNetworkProbe();
    }
    function markOnline() {
      clearNetworkProbe();
      input.onStatus('uploading');
      scheduleStallWatch(true);
    }
    function abort() {
      try { if (upload) upload.abort(); } catch (_) {}
      finish(new DOMException('Aborted', 'AbortError'));
    }
    if (input.signal) {
      if (input.signal.aborted) return reject(new DOMException('Aborted', 'AbortError'));
      input.signal.addEventListener('abort', abort, { once: true });
    }
    upload = createUpload({
      endpoint: input.uploadUrl,
      file: input.file,
      method: 'PUT',
      chunkSize: input.chunkSize || DEFAULT_VIDEO_UPLOAD_CHUNK_SIZE_KB,
      attempts: input.chunkAttempts || DEFAULT_VIDEO_UPLOAD_CHUNK_ATTEMPTS,
      dynamicChunkSize: true,
    });
    if (
      typeof window !== 'undefined'
      && typeof window.addEventListener === 'function'
      && typeof window.removeEventListener === 'function'
    ) {
      window.addEventListener('offline', markOffline);
      window.addEventListener('online', markOnline);
      removeWindowNetworkListeners = function () {
        window.removeEventListener('offline', markOffline);
        window.removeEventListener('online', markOnline);
      };
    }
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      input.onStatus('uploading_offline');
    }
    scheduleStallWatch();
    upload.on('attempt', function () {
      noteActivity();
      input.onStatus('uploading');
    });
    upload.on('attemptFailure', function (event) {
      noteActivity();
      var detail = event && event.detail;
      if (input.onAttemptFailure) input.onAttemptFailure(upchunkErrorCode(detail));
      input.onStatus('upload_retrying');
    });
    upload.on('chunkSuccess', function () { noteActivity(); });
    upload.on('progress', function (event) {
      noteActivity();
      var progress = Number(event && event.detail);
      if (Number.isFinite(progress)) {
        var mapped = Math.min(95, Math.max(0, Math.round(progress * 0.95)));
        if (Number.isFinite(input.minProgress)) mapped = Math.max(input.minProgress, mapped);
        input.onProgress(mapped);
      }
    });
    upload.on('offline', markOffline);
    upload.on('online', markOnline);
    upload.on('error', function (event) {
      noteActivity();
      var detail = event && event.detail;
      var code = upchunkErrorCode(detail);
      if (input.onUploadError) input.onUploadError(code);
      finish(new VideoUploadRequestError(code, 0, null));
    });
    upload.on('success', function () {
      noteActivity();
      input.onProgress(95);
      finish();
    });
  });
}

export function videoProcessingPollDelayMs(elapsedMs) {
  if (elapsedMs < 30 * 1000) return 2000;
  if (elapsedMs < 2 * 60 * 1000) return 5000;
  return 10 * 1000;
}

async function pollUntilReady(token, signal, onStatus) {
  var startedAt = Date.now();
  var deadline = startedAt + 10 * 60 * 1000;
  var consecutiveErrors = 0;
  while (Date.now() < deadline) {
    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
    var elapsedMs = Date.now() - startedAt;
    try {
      var status = await jsonRequest(
        '/api/public/upload/video/status?token=' + encodeURIComponent(token),
        { method: 'GET', signal: signal },
      );
      consecutiveErrors = 0;
      if (onStatus) onStatus(elapsedMs >= 30 * 1000 ? 'processing_slow' : (status.status || 'processing'));
      if (status.status === 'ready') return status;
      if (status.status === 'failed' || status.status === 'aborted') {
        throw new VideoUploadRequestError(status.errorCode || 'video_processing_failed', 409, null);
      }
    } catch (error) {
      if (signal.aborted) throw error;
      if (error instanceof VideoUploadRequestError && error.status === 409) throw error;
      if (shouldDiscardStoredVideoSession(error)) throw error;
      consecutiveErrors += 1;
      if (consecutiveErrors >= 3) throw error;
    }
    await sleepWithSignal(videoProcessingPollDelayMs(elapsedMs), signal);
  }
  throw new VideoUploadRequestError('video_processing_delayed', 0, null);
}

async function readStoredUploadStatus(token) {
  var lastError = null;
  for (var attempt = 1; attempt <= 3; attempt += 1) {
    try {
      return await jsonRequest(
        '/api/public/upload/video/status?token=' + encodeURIComponent(token),
        { method: 'GET' },
        8000,
      );
    } catch (error) {
      if (shouldDiscardStoredVideoSession(error)) return null;
      lastError = error;
      if (attempt < 3) await sleep(400 * attempt);
    }
  }
  throw lastError || new Error('video_status_failed');
}

async function simulatePreviewUpload(file, signal, onProgress, onStatus) {
  for (var progress = 10; progress <= 90; progress += 20) {
    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
    onProgress(progress);
    await sleep(120);
  }
  onStatus('processing');
  await sleep(500);
  onProgress(100);
  return {
    token: 'preview-video-token-' + Date.now(),
    status: 'ready',
    durationMs: null,
    posterUrl: URL.createObjectURL(file),
    previewOnly: true,
  };
}

export function validateVideoFile(file) {
  if (!file || ALLOWED_VIDEO_TYPES.indexOf(String(file.type || '').toLowerCase()) === -1) return { ok: false, message: 'MP4 veya MOV formatında bir video seçin.' };
  if (file.size <= 0 || file.size > VIDEO_MAX_BYTES) return { ok: false, message: 'Video en fazla 150 MB olabilir.' };
  return { ok: true };
}

export function readVideoDuration(file) {
  return new Promise(function (resolve) {
    var url = URL.createObjectURL(file);
    var video = document.createElement('video');
    var settled = false;
    function finish(value) {
      if (settled) return;
      settled = true;
      video.removeAttribute('src');
      try { video.load(); } catch (_) {}
      URL.revokeObjectURL(url);
      resolve(value);
    }
    video.preload = 'metadata';
    video.onloadedmetadata = function () { finish(Number.isFinite(video.duration) ? video.duration : null); };
    video.onerror = function () { finish(null); };
    video.src = url;
    setTimeout(function () { finish(null); }, 8000);
  });
}

export function validateKnownVideoDuration(durationSeconds) {
  if (durationSeconds === null) return { ok: true };
  if (durationSeconds < VIDEO_MIN_DURATION_SECONDS || durationSeconds > VIDEO_MAX_DURATION_SECONDS) {
    return { ok: false, message: 'Video 2 ile 60 saniye arasında olmalı.' };
  }
  return { ok: true };
}

export async function uploadReviewVideo(input) {
  if (typeof window !== 'undefined' && window.__ikasPreviewMode) {
    return simulatePreviewUpload(input.file, input.signal, input.onProgress, input.onStatus);
  }
  var metrics = {
    startedAt: nowMs(),
    chunkSizeKb: 0,
    chunkAttempts: 0,
    retryClicks: input.retryClicks || 0,
    upchunkErrors: 0,
    firstErrorCode: null,
    directUploadMs: null,
    completeMs: null,
    processingPollMs: null,
  };
  function recordUploadError(code) {
    metrics.upchunkErrors += 1;
    if (!metrics.firstErrorCode) metrics.firstErrorCode = code || 'upload_attempt_failed';
  }
  function discardStoredSession() {
    clearStoredSession(input.productId, input.file);
    if (input.onSessionReset) input.onSessionReset();
  }
  async function settleKnownStatus(currentToken, currentSession) {
    var storedStatus = await readStoredUploadStatus(currentToken);
    if (!storedStatus) return { action: 'discard' };
    if (storedStatus.status === 'ready') {
      if (input.onToken) input.onToken(currentToken);
      input.onProgress(100);
      clearStoredSession(input.productId, input.file);
      await submitUploadMetrics(currentToken, metrics, 'ready');
      return { action: 'return', value: Object.assign({ token: currentToken }, storedStatus) };
    }
    if (storedStatus.status === 'uploaded' || storedStatus.status === 'processing') {
      if (input.onToken) input.onToken(currentToken);
      input.onStatus('processing');
      var resumedPollStartedAt = nowMs();
      var resumedReady = await pollUntilReady(currentToken, input.signal, input.onStatus);
      metrics.processingPollMs = elapsedMs(resumedPollStartedAt);
      clearStoredSession(input.productId, input.file);
      input.onProgress(100);
      await submitUploadMetrics(currentToken, metrics, 'ready');
      return { action: 'return', value: Object.assign({ token: currentToken }, resumedReady) };
    }
    if (storedStatus.status === 'failed' || storedStatus.status === 'aborted') return { action: 'discard' };
    if (!currentSession || typeof currentSession.uploadUrl !== 'string' || !currentSession.uploadUrl) return { action: 'discard' };
    return { action: 'upload' };
  }
  ensurePendingVideoCancelDelivery();
  await flushPendingVideoCancellations();
  var stored = readStoredSession(input.productId, input.file);
  var token = stored && stored.token;
  var session = stored;
  if (token) {
    var storedDecision = await settleKnownStatus(token, session);
    if (storedDecision.action === 'return') return storedDecision.value;
    if (storedDecision.action === 'discard') {
      discardStoredSession();
      token = null;
      session = null;
    }
  }
  var autoRecoveries = 0;
  while (true) {
    if (!token) {
      var initiated = await jsonRequest('/api/public/upload/video/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId: PUBLIC_API_KEY,
          productId: input.productId,
          mimeType: input.file.type,
          bytes: input.file.size,
          fileFingerprint: fingerprint(input.file),
        }),
      });
      token = initiated.token;
      session = initiated;
      storeSession(input.productId, input.file, initiated);
    }
    if (input.onToken) input.onToken(token);
    metrics.chunkSizeKb = session.chunkSize || DEFAULT_VIDEO_UPLOAD_CHUNK_SIZE_KB;
    metrics.chunkAttempts = session.chunkAttempts || DEFAULT_VIDEO_UPLOAD_CHUNK_ATTEMPTS;
    input.onStatus('uploading');
    var uploadStartedAt = nowMs();
    try {
      await uploadToMuxDirectUrl({
        uploadUrl: session.uploadUrl,
        file: input.file,
        chunkSize: session.chunkSize,
        chunkAttempts: session.chunkAttempts,
        minProgress: input.minProgress || 0,
        signal: input.signal,
        onProgress: input.onProgress,
        onStatus: input.onStatus,
        onAttemptFailure: recordUploadError,
        onUploadError: recordUploadError,
      });
      metrics.directUploadMs = (metrics.directUploadMs || 0) + elapsedMs(uploadStartedAt);
      input.onStatus('processing');
      var completeStartedAt = nowMs();
      await jsonRequest('/api/public/upload/video/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token }),
      }, 30000);
      metrics.completeMs = elapsedMs(completeStartedAt);
      var pollStartedAt = nowMs();
      var ready = await pollUntilReady(token, input.signal, input.onStatus);
      metrics.processingPollMs = elapsedMs(pollStartedAt);
      clearStoredSession(input.productId, input.file);
      input.onProgress(100);
      await submitUploadMetrics(token, metrics, 'ready');
      return Object.assign({ token: token }, ready);
    } catch (error) {
      metrics.directUploadMs = (metrics.directUploadMs || 0) + elapsedMs(uploadStartedAt);
      if (input.signal && input.signal.aborted) {
        await submitUploadMetrics(token, metrics, 'aborted');
        throw error;
      }
      if (isAutoRecoverableDirectUploadError(error) && autoRecoveries < VIDEO_UPLOAD_AUTO_RECOVERY_LIMIT) {
        autoRecoveries += 1;
        var recoveryDecision = null;
        try {
          recoveryDecision = await settleKnownStatus(token, session);
        } catch (_) {
          recoveryDecision = session && typeof session.uploadUrl === 'string' && session.uploadUrl
            ? { action: 'upload' }
            : { action: 'discard' };
        }
        if (recoveryDecision.action === 'return') return recoveryDecision.value;
        if (recoveryDecision.action === 'discard') {
          discardStoredSession();
          token = null;
          session = null;
        }
        continue;
      }
      await submitUploadMetrics(token, metrics, 'failed');
      throw error;
    }
  }
}

export async function cancelReviewVideoUpload(token, productId, file) {
  var stored = productId && file ? readStoredSession(productId, file) : null;
  if (token && productId && file) storePendingCancel(token, productId, file, stored && stored.expiresAt);
  if (productId && file) clearStoredSession(productId, file);
  if (!token || (typeof window !== 'undefined' && window.__ikasPreviewMode)) return;
  ensurePendingVideoCancelDelivery();
  await flushPendingVideoCancellations();
}

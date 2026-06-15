import { PUBLIC_API_KEY, API_BASE } from '../../../core/config.js';
import { fetchWithTimeout } from '../../../core/fetch.js';

var VIDEO_MAX_BYTES = 150 * 1024 * 1024;
var VIDEO_MIN_DURATION_SECONDS = 2;
var VIDEO_MAX_DURATION_SECONDS = 60;
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

function uploadPartWithProgress(url, blob, signal, onProgress) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    var aborted = false;
    function cleanup() {
      if (signal) signal.removeEventListener('abort', abort);
    }
    function abort() {
      aborted = true;
      xhr.abort();
    }
    if (signal) {
      if (signal.aborted) return reject(new DOMException('Aborted', 'AbortError'));
      signal.addEventListener('abort', abort, { once: true });
    }
    xhr.open('PUT', url, true);
    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable && onProgress) onProgress(event.loaded);
    };
    xhr.onload = function () {
      cleanup();
      if (xhr.status < 200 || xhr.status >= 300) return reject(new Error('video_part_upload_failed'));
      var etag = xhr.getResponseHeader('ETag');
      if (!etag) return reject(new Error('video_part_missing_etag'));
      resolve(etag);
    };
    xhr.onerror = function () { cleanup(); reject(new Error('video_part_network_error')); };
    xhr.onabort = function () {
      cleanup();
      reject(aborted ? new DOMException('Aborted', 'AbortError') : new Error('video_part_aborted'));
    };
    xhr.send(blob);
  });
}

async function requestPartUrls(token, partNumbers) {
  return jsonRequest('/api/public/upload/video/parts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: token, partNumbers: partNumbers }),
  });
}

async function uploadOnePart(input) {
  var attempt = 0;
  while (attempt < 3) {
    attempt += 1;
    try {
      var signed = await requestPartUrls(input.token, [input.partNumber]);
      var part = signed.parts && signed.parts[0];
      if (!part || !part.uploadUrl) throw new Error('video_part_url_missing');
      var etag = await uploadPartWithProgress(part.uploadUrl, input.blob, input.signal, input.onProgress);
      return { partNumber: input.partNumber, etag: etag };
    } catch (error) {
      if (input.signal && input.signal.aborted) throw error;
      if (attempt >= 3) throw error;
      await sleep(400 * attempt);
    }
  }
  throw new Error('video_part_upload_failed');
}

export function videoUploadProgressPercent(fileSize, partSize, completedPartNumbers, loadedByPart) {
  if (!Number.isFinite(fileSize) || fileSize <= 0) return 0;
  var completedBytes = (completedPartNumbers || []).reduce(function (sum, number) {
    var start = (Number(number) - 1) * partSize;
    return sum + Math.max(0, Math.min(partSize, fileSize - start));
  }, 0);
  var uploadingBytes = Object.keys(loadedByPart || {}).reduce(function (sum, key) {
    return sum + Math.max(0, Number(loadedByPart[key]) || 0);
  }, 0);
  return Math.min(95, Math.round(((completedBytes + uploadingBytes) / fileSize) * 95));
}

async function uploadMissingParts(input) {
  var completedMap = {};
  (input.completed || []).forEach(function (part) {
    completedMap[part.partNumber] = { partNumber: part.partNumber, etag: part.etag };
  });
  var loadedByPart = {};
  var queue = [];
  for (var partNumber = 1; partNumber <= input.partCount; partNumber += 1) {
    if (!completedMap[partNumber]) queue.push(partNumber);
  }
  function reportProgress() {
    input.onProgress(videoUploadProgressPercent(
      input.file.size,
      input.partSize,
      Object.keys(completedMap).map(Number),
      loadedByPart,
    ));
  }
  reportProgress();
  async function worker() {
    while (queue.length > 0) {
      if (input.signal.aborted) throw new DOMException('Aborted', 'AbortError');
      var number = queue.shift();
      var start = (number - 1) * input.partSize;
      var result = await uploadOnePart({
        token: input.token,
        partNumber: number,
        blob: input.file.slice(start, Math.min(input.file.size, start + input.partSize)),
        signal: input.signal,
        onProgress: function (loaded) { loadedByPart[number] = loaded; reportProgress(); },
      });
      delete loadedByPart[number];
      completedMap[number] = result;
      reportProgress();
    }
  }
  var workers = [];
  var workerCount = Math.min(input.maxParallelParts || 3, queue.length || 1);
  for (var i = 0; i < workerCount; i += 1) workers.push(worker());
  await Promise.all(workers);
  return Object.keys(completedMap).map(function (key) { return completedMap[key]; })
    .sort(function (a, b) { return a.partNumber - b.partNumber; });
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
  ensurePendingVideoCancelDelivery();
  await flushPendingVideoCancellations();
  var stored = readStoredSession(input.productId, input.file);
  var token = stored && stored.token;
  var session = stored;
  if (token) {
    var storedStatus = await readStoredUploadStatus(token);
    if (!storedStatus) {
      clearStoredSession(input.productId, input.file);
      token = null;
      session = null;
    } else if (storedStatus.status === 'ready') {
      if (input.onToken) input.onToken(token);
      input.onProgress(100);
      return Object.assign({ token: token }, storedStatus);
    } else if (storedStatus.status === 'uploaded' || storedStatus.status === 'processing') {
      if (input.onToken) input.onToken(token);
      input.onStatus('processing');
      var resumedReady = await pollUntilReady(token, input.signal, input.onStatus);
      clearStoredSession(input.productId, input.file);
      input.onProgress(100);
      return Object.assign({ token: token }, resumedReady);
    } else if (storedStatus.status === 'failed' || storedStatus.status === 'aborted') {
      clearStoredSession(input.productId, input.file);
      token = null;
      session = null;
    }
  }
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
  input.onStatus('uploading');
  var partsData = await requestPartUrls(token);
  var completed = await uploadMissingParts({
    token: token,
    file: input.file,
    partSize: session.partSize,
    partCount: session.partCount,
    maxParallelParts: session.maxParallelParts,
    completed: partsData.completed,
    signal: input.signal,
    onProgress: input.onProgress,
  });
  input.onStatus('processing');
  await jsonRequest('/api/public/upload/video/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: token, parts: completed }),
  }, 30000);
  var ready = await pollUntilReady(token, input.signal, input.onStatus);
  clearStoredSession(input.productId, input.file);
  input.onProgress(100);
  return Object.assign({ token: token }, ready);
}

export async function cancelReviewVideoUpload(token, productId, file) {
  var stored = productId && file ? readStoredSession(productId, file) : null;
  if (token && productId && file) storePendingCancel(token, productId, file, stored && stored.expiresAt);
  if (productId && file) clearStoredSession(productId, file);
  if (!token || (typeof window !== 'undefined' && window.__ikasPreviewMode)) return;
  ensurePendingVideoCancelDelivery();
  await flushPendingVideoCancellations();
}

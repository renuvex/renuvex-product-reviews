import { PUBLIC_API_KEY, API_BASE } from '../../../core/config.js';
import { fetchWithTimeout } from '../../../core/fetch.js';

var VIDEO_MAX_BYTES = 150 * 1024 * 1024;
var VIDEO_MIN_DURATION_SECONDS = 2;
var VIDEO_MAX_DURATION_SECONDS = 60;
var ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/quicktime'];
var SESSION_STORAGE_PREFIX = 'renuvex_pr_video_upload_';

function sleep(ms) {
  return new Promise(function (resolve) { setTimeout(resolve, ms); });
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

async function jsonRequest(path, options, timeoutMs) {
  var response = await fetchWithTimeout(API_BASE + path, options, timeoutMs || 20000);
  var payload = await response.json().catch(function () { return {}; });
  if (!response.ok) throw new Error(payload.error || 'video_request_failed');
  return payload.data || {};
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
    var completedBytes = Object.keys(completedMap).reduce(function (sum, key) {
      var number = Number(key);
      var start = (number - 1) * input.partSize;
      return sum + Math.min(input.partSize, input.file.size - start);
    }, 0);
    var uploadingBytes = Object.keys(loadedByPart).reduce(function (sum, key) { return sum + loadedByPart[key]; }, 0);
    input.onProgress(Math.min(95, Math.round(((completedBytes + uploadingBytes) / input.file.size) * 95)));
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

async function pollUntilReady(token, signal, onStatus) {
  var deadline = Date.now() + 10 * 60 * 1000;
  while (Date.now() < deadline) {
    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
    var status = await jsonRequest('/api/public/upload/video/status?token=' + encodeURIComponent(token), { method: 'GET' });
    if (onStatus) onStatus(status.status || 'processing');
    if (status.status === 'ready') return status;
    if (status.status === 'failed' || status.status === 'aborted') throw new Error(status.errorCode || 'video_processing_failed');
    await sleep(2000);
  }
  throw new Error('video_processing_timeout');
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
  var stored = readStoredSession(input.productId, input.file);
  var token = stored && stored.token;
  var session = stored;
  if (token) {
    var storedStatus = await jsonRequest('/api/public/upload/video/status?token=' + encodeURIComponent(token), { method: 'GET' }).catch(function () { return null; });
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
  if (productId && file) clearStoredSession(productId, file);
  if (!token || (typeof window !== 'undefined' && window.__ikasPreviewMode)) return;
  await jsonRequest('/api/public/upload/video', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: token }),
  }).catch(function () {});
}

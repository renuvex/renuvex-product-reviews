import { iconUseSvg, iconUseNode } from '../../../icons/star-sprite.js';
import { PHOTO_ICON, PLAY_ICON, UI_CLOSE } from '../../../icons/index.js';
import { reviewFormCopy } from '../copy.js';
import {
  cancelReviewVideoUpload,
  describeVideoUploadError,
  readVideoDuration,
  uploadReviewVideo,
  validateKnownVideoDuration,
  validateVideoFile,
} from '../media/video-upload.js';
import { createStepPhotos, MAX_PHOTOS } from './step-photos.js';

function videoFailureText() {
  return 'Video yüklenemedi';
}

function videoViewMode(video) {
  if (!video) return 'empty';
  if (video.status === 'ready') return 'ready';
  if (video.status === 'failed') return 'failed';
  return 'busy';
}

function videoBusyText(video) {
  return 'Video yükleniyor';
}

function videoBusyShowsDots(video) {
  return true;
}

export function createStepMedia(state, opts) {
  opts = opts || {};
  var destroyed = false;
  var photoInstance = null;
  var videoView = null;

  var root = document.createElement('div');
  root.className = 'renuvex-pr-fwizard-step renuvex-pr-fwizard-step-media';

  var title = document.createElement('div');
  title.className = 'renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg';
  title.textContent = reviewFormCopy('formStepMediaTitle');
  root.appendChild(title);

  var subtitle = document.createElement('div');
  subtitle.className = 'renuvex-pr-fwizard-step-subtitle';
  subtitle.textContent = reviewFormCopy('formStepMediaSubtitle');
  root.appendChild(subtitle);

  var mediaCard = document.createElement('div');
  mediaCard.className = 'renuvex-pr-fwizard-media-card';
  var photoButton = document.createElement('button');
  photoButton.type = 'button';
  photoButton.className = 'renuvex-pr-fwizard-photo-add renuvex-pr-fwizard-media-action';
  photoButton.setAttribute('aria-label', 'Fotoğraf ekle');
  photoButton.innerHTML = iconUseSvg(PHOTO_ICON) + '<span>Fotoğraf Ekle</span>';
  var videoButton = document.createElement('button');
  videoButton.type = 'button';
  videoButton.className = 'renuvex-pr-fwizard-photo-add renuvex-pr-fwizard-media-action';
  videoButton.setAttribute('aria-label', 'Video ekle');
  videoButton.innerHTML = iconUseSvg(PLAY_ICON) + '<span>Video Ekle</span>';
  mediaCard.appendChild(photoButton);
  mediaCard.appendChild(videoButton);

  var content = document.createElement('div');
  content.className = 'renuvex-pr-fwizard-media-content';
  mediaCard.appendChild(content);
  root.appendChild(mediaCard);

  var videoInput = document.createElement('input');
  videoInput.type = 'file';
  videoInput.accept = 'video/mp4,video/quicktime,.mp4,.mov';
  videoInput.style.display = 'none';
  root.appendChild(videoInput);

  function hasPhotos() {
    var snapshot = state.get();
    return (snapshot.images || []).length > 0 || (snapshot.pendingImages || []).length > 0;
  }

  function photoCount() {
    var snapshot = state.get();
    return (snapshot.images || []).length + (snapshot.pendingImages || []).length;
  }

  function currentVideo() {
    return state.get().videoUpload || null;
  }

  function clearVideoView() {
    if (!videoView) {
      content.innerHTML = '';
      return;
    }
    videoView.retry.onclick = null;
    content.innerHTML = '';
    videoView = null;
  }

  function destroyPhotoPicker() {
    if (!photoInstance) return;
    if (photoInstance.destroy) photoInstance.destroy();
    photoInstance = null;
  }

  function createVideoView(video) {
    destroyPhotoPicker();
    content.innerHTML = '';
    var mode = videoViewMode(video);
    var card = document.createElement('div');
    card.className = mode === 'ready'
      ? 'renuvex-pr-fwizard-photo-thumb renuvex-pr-fwizard-video-thumb'
      : mode === 'failed'
        ? 'renuvex-pr-fwizard-video-card renuvex-pr-fwizard-video-card--failed'
        : 'renuvex-pr-fwizard-video-uploading-card';

    var preview = null;
    var details = null;
    var name = null;
    var status = null;
    var retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'renuvex-pr-fwizard-video-retry';
    retry.textContent = 'Tekrar dene';

    if (mode === 'ready') {
      var posterUrl = video.posterUrl || video.localUrl || '';
      if (posterUrl && posterUrl !== video.localUrl) {
        preview = document.createElement('img');
        preview.alt = '';
        preview.src = posterUrl;
      } else {
        preview = document.createElement('video');
        preview.muted = true;
        preview.playsInline = true;
        preview.preload = 'metadata';
        preview.src = video.localUrl || '';
      }
      preview.className = 'renuvex-pr-fwizard-video-preview';
      card.appendChild(preview);
    } else if (mode === 'busy') {
      status = document.createElement('div');
      status.className = 'renuvex-pr-fwizard-video-uploading-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      card.appendChild(status);
    } else {
      details = document.createElement('div');
      details.className = 'renuvex-pr-fwizard-video-details renuvex-pr-fwizard-video-details--failed';
      status = document.createElement('div');
      status.className = 'renuvex-pr-fwizard-video-status renuvex-pr-fwizard-video-status--error';
      status.setAttribute('role', 'alert');
      status.setAttribute('aria-live', 'assertive');
      details.appendChild(status);
      card.appendChild(details);
    }

    if (mode === 'ready') {
      var remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'renuvex-pr-fwizard-photo-remove renuvex-pr-fwizard-video-remove';
      remove.setAttribute('aria-label', 'Videoyu kaldır');
      var removeIcon = iconUseNode(UI_CLOSE);
      if (removeIcon) remove.appendChild(removeIcon);
      function onRemove(event) {
        if (event) {
          event.preventDefault();
          event.stopPropagation();
        }
        removeVideo();
      }
      remove.addEventListener('pointerdown', onRemove);
      remove.addEventListener('click', onRemove);
      card.appendChild(remove);
    }
    content.appendChild(card);

    videoView = {
      mode: mode,
      card: card,
      preview: preview,
      previewUrl: mode === 'ready' ? (video.posterUrl || video.localUrl || '') : '',
      details: details,
      name: name,
      status: status,
      retry: retry,
    };
  }

  function renderVideo() {
    if (destroyed) return;
    var video = currentVideo();
    if (!video) {
      clearVideoView();
      return;
    }
    var mode = videoViewMode(video);
    var previewUrl = mode === 'ready' ? (video.posterUrl || video.localUrl || '') : '';
    if (!videoView || videoView.mode !== mode || videoView.previewUrl !== previewUrl) createVideoView(video);

    if (videoView.name) videoView.name.textContent = video.file ? video.file.name : 'Video';
    if (videoView.status && mode === 'busy') {
      var busyText = videoBusyText(video);
      var busyMarkup = videoBusyShowsDots(video)
        ? '<span class="renuvex-pr-fwizard-video-dots" aria-hidden="true">' +
          '<span></span><span></span><span></span>' +
          '</span><span>' + busyText + '</span>'
        : '<span>' + busyText + '</span>';
      if (videoView.status.innerHTML !== busyMarkup) videoView.status.innerHTML = busyMarkup;
    }
    if (videoView.status && mode === 'failed') {
      videoView.status.className = 'renuvex-pr-fwizard-video-status renuvex-pr-fwizard-video-status--error';
      videoView.status.setAttribute('role', 'alert');
      videoView.status.textContent = videoFailureText(video);
    }

    var canRetry = mode === 'failed' && !!(video.error && video.file && video.retryable !== false);
    videoView.retry.onclick = canRetry
      ? function () { startUpload(video.file, video.localUrl, video.durationMs); }
      : null;
    if (canRetry && videoView.details && !videoView.retry.isConnected) {
      videoView.details.appendChild(videoView.retry);
    } else if (!canRetry && videoView.retry.isConnected) {
      videoView.retry.remove();
    }
  }

  function updateChoices() {
    var photosSelected = hasPhotos();
    var photosFull = photoCount() >= MAX_PHOTOS;
    var videoSelected = !!currentVideo();
    var hasMedia = photosSelected || videoSelected;
    photoButton.disabled = videoSelected || photosFull;
    videoButton.disabled = photosSelected || videoSelected;
    mediaCard.classList.toggle('renuvex-pr-fwizard-media-card--has-media', hasMedia);
    mediaCard.classList.toggle('renuvex-pr-fwizard-media-card--photo-selected', photosSelected);
    mediaCard.classList.toggle('renuvex-pr-fwizard-media-card--video-selected', videoSelected);
    photoButton.classList.toggle('renuvex-pr-fwizard-media-action--active', photosSelected);
    videoButton.classList.toggle('renuvex-pr-fwizard-media-action--active', videoSelected);
  }

  function updateVideoState(patch) {
    var existing = currentVideo();
    if (!existing) return;
    var keys = Object.keys(patch);
    var changed = keys.some(function (key) { return existing[key] !== patch[key]; });
    if (!changed) return;
    state.set({ videoUpload: Object.assign({}, existing, patch) });
  }

  async function startUpload(file, existingLocalUrl, knownDurationMs) {
    var previousVideo = currentVideo();
    var isRetry = !!(existingLocalUrl && previousVideo && previousVideo.file === file);
    var initialProgress = isRetry ? Math.max(0, Math.min(95, Number(previousVideo.progress) || 0)) : 0;
    var retryClicks = isRetry ? (Number(previousVideo.retryClicks) || 0) + 1 : 0;
    var validation = validateVideoFile(file);
    if (!validation.ok) {
      if (opts.showToast) opts.showToast(validation.message, 'error');
      return;
    }
    var localUrl = existingLocalUrl || URL.createObjectURL(file);
    var initialDurationMs = Number.isFinite(knownDurationMs) ? knownDurationMs : null;
    var controller = new AbortController();
    state.set({
      videoUpload: {
        file: file,
        localUrl: localUrl,
        token: isRetry ? previousVideo.token || null : null,
        status: 'uploading',
        progress: initialProgress,
        durationMs: initialDurationMs,
        error: null,
        errorCode: null,
        retryable: true,
        retryAfterSec: null,
        retryClicks: retryClicks,
        controller: controller,
      },
    });
    if (!isRetry && !destroyed && (!opts.canNavigate || opts.canNavigate())) state.goNext();
    try {
      var duration = knownDurationMs !== undefined
        ? (Number.isFinite(knownDurationMs) ? knownDurationMs / 1000 : null)
        : await readVideoDuration(file);
      var durationValidation = validateKnownVideoDuration(duration);
      if (!durationValidation.ok) {
        throw Object.assign(new Error('invalid_video_duration'), {
          code: 'invalid_video_duration',
          message: durationValidation.message,
        });
      }
      var result = await uploadReviewVideo({
        file: file,
        productId: state.get().productId,
        signal: controller.signal,
        minProgress: initialProgress,
        retryClicks: retryClicks,
        onToken: function (token) { updateVideoState({ token: token }); },
        onProgress: function (progress) { updateVideoState({ progress: progress }); },
        onStatus: function (status) { updateVideoState({ status: status }); },
        onSessionReset: function () { updateVideoState({ token: null, progress: 0 }); },
      });
      if (result.previewOnly && result.posterUrl && result.posterUrl !== localUrl) {
        try { URL.revokeObjectURL(result.posterUrl); } catch (_) {}
      }
      updateVideoState({
        token: result.token,
        status: 'ready',
        progress: 100,
        posterUrl: result.previewOnly ? localUrl : result.posterUrl,
        durationMs: result.durationMs || (duration === null ? null : Math.round(duration * 1000)),
        error: null,
        errorCode: null,
        retryable: true,
        retryAfterSec: null,
        controller: null,
      });
      if (isRetry && !destroyed && (!opts.canNavigate || opts.canNavigate())) state.goNext();
    } catch (error) {
      if (controller.signal.aborted) return;
      var failure = describeVideoUploadError(error);
      if (error && error.code === 'invalid_video_duration') {
        failure = {
          code: 'invalid_video_duration',
          message: error.message || 'Video süresi geçersiz.',
          retryable: false,
          retryAfterSec: null,
        };
      }
      updateVideoState({
        status: 'failed',
        error: failure.message,
        errorCode: failure.code,
        retryable: failure.retryable,
        retryAfterSec: failure.retryAfterSec,
        controller: null,
      });
      if (opts.showToast) {
        var toastMessage = failure.code === 'invalid_video_duration'
          ? failure.message
          : videoFailureText();
        opts.showToast(toastMessage, 'error');
      }
    }
  }

  function removeVideo() {
    var video = currentVideo();
    if (!video) return;
    if (video.controller) video.controller.abort();
    cancelReviewVideoUpload(video.token, state.get().productId, video.file);
    if (opts.revokeBlobUrl) opts.revokeBlobUrl(video.localUrl);
    state.set({ videoUpload: null });
  }

  function mountPhotoPicker(openImmediately) {
    if (photoInstance) {
      if (openImmediately && photoInstance.openPicker) photoInstance.openPicker();
      return;
    }
    videoView = null;
    content.innerHTML = '';
    photoInstance = createStepPhotos(state, {
      canNavigate: opts.canNavigate,
      blobMap: opts.blobMap,
      urlToFinger: opts.urlToFinger,
      revokeBlobUrl: opts.revokeBlobUrl,
      showToast: opts.showToast,
      hideHeading: true,
      hideAddButton: true,
      revealAddButtonAfterMedia: true,
      embeddedMedia: true,
    });
    content.appendChild(photoInstance.el);
    if (openImmediately && photoInstance.openPicker) photoInstance.openPicker();
  }

  photoButton.onclick = function () {
    if (photoButton.disabled) return;
    mountPhotoPicker(true);
  };
  videoButton.onclick = function () {
    if (videoButton.disabled) return;
    destroyPhotoPicker();
    content.innerHTML = '';
    videoInput.click();
  };
  videoInput.onchange = function () {
    var file = videoInput.files && videoInput.files[0];
    videoInput.value = '';
    if (file) startUpload(file, null, undefined);
  };

  var hadVideo = !!currentVideo();
  var unsubscribe = state.onChange(function () {
    updateChoices();
    var hasVideo = !!currentVideo();
    if (hasVideo || hadVideo) renderVideo();
    hadVideo = hasVideo;
  });
  updateChoices();
  if (hasPhotos()) mountPhotoPicker(false);
  if (currentVideo()) renderVideo();

  return {
    el: root,
    destroy: function () {
      destroyed = true;
      photoButton.onclick = null;
      videoButton.onclick = null;
      videoInput.onchange = null;
      if (photoInstance && photoInstance.destroy) photoInstance.destroy();
      if (unsubscribe) unsubscribe();
    },
  };
}

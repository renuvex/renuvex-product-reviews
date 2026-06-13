import { iconUseSvg, iconUseNode } from '../../../icons/star-sprite.js';
import { PHOTO_ICON, PLAY_ICON, UI_CLOSE } from '../../../icons/index.js';
import { reviewFormCopy } from '../copy.js';
import {
  cancelReviewVideoUpload,
  readVideoDuration,
  uploadReviewVideo,
  validateKnownVideoDuration,
  validateVideoFile,
} from '../media/video-upload.js';
import { createStepPhotos } from './step-photos.js';

function videoStatusText(video) {
  if (!video) return '';
  if (video.error) return video.error;
  if (video.status === 'processing') return 'Video işleniyor...';
  if (video.status === 'ready') return 'Video hazır';
  return 'Video yükleniyor: %' + Math.max(0, Math.min(100, video.progress || 0));
}

export function createStepMedia(state, opts) {
  opts = opts || {};
  var destroyed = false;
  var photoInstance = null;

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

  var choices = document.createElement('div');
  choices.className = 'renuvex-pr-fwizard-media-choices';
  var photoButton = document.createElement('button');
  photoButton.type = 'button';
  photoButton.className = 'renuvex-pr-fwizard-media-choice';
  photoButton.innerHTML = iconUseSvg(PHOTO_ICON) + '<span>Fotoğraf Ekle</span>';
  var videoButton = document.createElement('button');
  videoButton.type = 'button';
  videoButton.className = 'renuvex-pr-fwizard-media-choice';
  videoButton.innerHTML = iconUseSvg(PLAY_ICON) + '<span>Video Ekle</span>';
  choices.appendChild(photoButton);
  choices.appendChild(videoButton);
  root.appendChild(choices);

  var content = document.createElement('div');
  content.className = 'renuvex-pr-fwizard-media-content';
  root.appendChild(content);

  var videoInput = document.createElement('input');
  videoInput.type = 'file';
  videoInput.accept = 'video/mp4,video/quicktime,.mp4,.mov';
  videoInput.style.display = 'none';
  root.appendChild(videoInput);

  function hasPhotos() {
    var snapshot = state.get();
    return (snapshot.images || []).length > 0 || (snapshot.pendingImages || []).length > 0;
  }

  function currentVideo() {
    return state.get().videoUpload || null;
  }

  function renderVideo() {
    if (destroyed) return;
    var video = currentVideo();
    content.innerHTML = '';
    if (!video) return;
    var card = document.createElement('div');
    card.className = 'renuvex-pr-fwizard-video-card';
    var preview = document.createElement('video');
    preview.className = 'renuvex-pr-fwizard-video-preview';
    preview.muted = true;
    preview.playsInline = true;
    preview.preload = 'metadata';
    preview.src = video.localUrl || '';
    card.appendChild(preview);
    var details = document.createElement('div');
    details.className = 'renuvex-pr-fwizard-video-details';
    var name = document.createElement('div');
    name.className = 'renuvex-pr-fwizard-video-name';
    name.textContent = video.file ? video.file.name : 'Video';
    var status = document.createElement('div');
    status.className = 'renuvex-pr-fwizard-video-status' + (video.error ? ' renuvex-pr-fwizard-video-status--error' : '');
    status.setAttribute('role', video.error ? 'alert' : 'status');
    status.setAttribute('aria-live', 'polite');
    status.textContent = videoStatusText(video);
    details.appendChild(name);
    details.appendChild(status);
    if (video.status === 'uploading') {
      var progress = document.createElement('progress');
      progress.className = 'renuvex-pr-fwizard-video-progress';
      progress.max = 100;
      progress.value = video.progress || 0;
      progress.setAttribute('aria-label', 'Video yükleme ilerlemesi');
      details.appendChild(progress);
    }
    if (video.error && video.file) {
      var retry = document.createElement('button');
      retry.type = 'button';
      retry.className = 'renuvex-pr-fwizard-video-retry';
      retry.textContent = 'Tekrar Dene';
      retry.onclick = function () { startUpload(video.file, video.localUrl); };
      details.appendChild(retry);
    }
    card.appendChild(details);
    var remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'renuvex-pr-fwizard-photo-remove renuvex-pr-fwizard-video-remove';
    remove.setAttribute('aria-label', 'Videoyu kaldır');
    var removeIcon = iconUseNode(UI_CLOSE);
    if (removeIcon) remove.appendChild(removeIcon);
    remove.onclick = removeVideo;
    card.appendChild(remove);
    content.appendChild(card);
  }

  function updateChoices() {
    var photosSelected = hasPhotos();
    var videoSelected = !!currentVideo();
    photoButton.disabled = videoSelected;
    videoButton.disabled = photosSelected || videoSelected;
    photoButton.classList.toggle('renuvex-pr-fwizard-media-choice--active', photosSelected);
    videoButton.classList.toggle('renuvex-pr-fwizard-media-choice--active', videoSelected);
  }

  function updateVideoState(patch) {
    var existing = currentVideo();
    if (!existing) return;
    state.set({ videoUpload: Object.assign({}, existing, patch) });
  }

  async function startUpload(file, existingLocalUrl) {
    var validation = validateVideoFile(file);
    if (!validation.ok) {
      if (opts.showToast) opts.showToast(validation.message, 'error');
      return;
    }
    var duration = await readVideoDuration(file);
    var durationValidation = validateKnownVideoDuration(duration);
    if (!durationValidation.ok) {
      if (opts.showToast) opts.showToast(durationValidation.message, 'error');
      return;
    }
    var localUrl = existingLocalUrl || URL.createObjectURL(file);
    var controller = new AbortController();
    state.set({
      videoUpload: {
        file: file,
        localUrl: localUrl,
        token: null,
        status: 'uploading',
        progress: 0,
        durationMs: duration === null ? null : Math.round(duration * 1000),
        error: null,
        controller: controller,
      },
    });
    try {
      var result = await uploadReviewVideo({
        file: file,
        productId: state.get().productId,
        signal: controller.signal,
        onToken: function (token) { updateVideoState({ token: token }); },
        onProgress: function (progress) { updateVideoState({ progress: progress }); },
        onStatus: function (status) { updateVideoState({ status: status }); },
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
        controller: null,
      });
      if (!destroyed && (!opts.canNavigate || opts.canNavigate())) state.goNext();
    } catch (error) {
      if (controller.signal.aborted) return;
      updateVideoState({ status: 'failed', error: 'Video yüklenemedi. Tekrar deneyin.', controller: null });
      if (opts.showToast) opts.showToast('Video yüklenemedi. Tekrar deneyin.', 'error');
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
    if (photoInstance) return;
    content.innerHTML = '';
    photoInstance = createStepPhotos(state, {
      canNavigate: opts.canNavigate,
      blobMap: opts.blobMap,
      urlToFinger: opts.urlToFinger,
      revokeBlobUrl: opts.revokeBlobUrl,
      showToast: opts.showToast,
      hideHeading: true,
    });
    content.appendChild(photoInstance.el);
    if (openImmediately && photoInstance.openPicker) photoInstance.openPicker();
  }

  photoButton.onclick = function () {
    if (photoButton.disabled) return;
    mountPhotoPicker(true);
  };
  videoButton.onclick = function () {
    if (!videoButton.disabled) videoInput.click();
  };
  videoInput.onchange = function () {
    var file = videoInput.files && videoInput.files[0];
    videoInput.value = '';
    if (file) startUpload(file, null);
  };

  var unsubscribe = state.onChange(function () {
    updateChoices();
    if (currentVideo()) renderVideo();
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

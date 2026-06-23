import { muxPlaybackIdFromUrl, muxPosterVariantUrl } from '../core/review-media.js';

var muxPlayerModulePromise = null;

function loadMuxPlayer() {
  if (!muxPlayerModulePromise) {
    muxPlayerModulePromise = import('@mux/mux-player');
  }
  return muxPlayerModulePromise;
}

export function getReviewVideoPlaybackId(media) {
  if (!media || typeof media !== 'object') return '';
  var explicit = typeof media.playbackId === 'string' ? media.playbackId.trim() : '';
  var parsed = muxPlaybackIdFromUrl(media.url);
  if (explicit && parsed && explicit !== parsed) return '';
  return explicit || parsed;
}

function applyReviewPlayerAttributes(player, media) {
  var playbackId = getReviewVideoPlaybackId(media);
  if (!playbackId) return false;
  var poster = muxPosterVariantUrl(media.posterUrl || '', { width: 1280, height: 720, fit: 'preserve' }) || media.posterUrl || '';

  player.setAttribute('disable-tracking', '');
  player.setAttribute('disable-cookies', '');
  player.setAttribute('preload', 'metadata');
  player.setAttribute('stream-type', 'on-demand');
  player.setAttribute('playsinline', '');
  player.setAttribute('hotkeys', 'noarrowleft noarrowright');
  player.setAttribute('accent-color', '#f8fafc');
  player.setAttribute('secondary-color', '#111111');
  if (poster) player.setAttribute('poster', poster);
  player.setAttribute('playback-id', playbackId);
  return true;
}

function preventNativeVideoContextMenu(event) {
  event.preventDefault();
}

export function createReviewVideoPlayback(media, className) {
  var cancelled = false;
  var player = document.createElement('mux-player');
  player.className = className || 'renuvex-pr-modal-main-video';
  player.setAttribute('aria-label', 'Yorum videosu');
  player.addEventListener('contextmenu', preventNativeVideoContextMenu);

  var configured = applyReviewPlayerAttributes(player, media);
  if (configured) {
    loadMuxPlayer().catch(function () {
      if (!cancelled) player.dispatchEvent(new Event('error'));
    });
  } else {
    setTimeout(function () {
      if (!cancelled) player.dispatchEvent(new Event('error'));
    }, 0);
  }

  return {
    element: player,
    cleanup: function cleanup() {
      cancelled = true;
      try {
        if (typeof player.pause === 'function') player.pause();
      } catch (_) {}
      player.removeAttribute('playback-id');
      player.removeAttribute('playback-token');
      player.removeAttribute('thumbnail-token');
      player.removeAttribute('poster');
      player.removeEventListener('contextmenu', preventNativeVideoContextMenu);
    },
  };
}

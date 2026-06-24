import {
  STOREFRONT_REVIEW_PLAYER_COLORS,
  ensureStorefrontReviewMuxPlayerTheme,
  STOREFRONT_REVIEW_MUX_PLAYER_THEME,
} from '../../lib/mux-player/review-player-theme';
import { REVIEW_PLAYER_LOCALE } from '../../lib/mux-player/review-player-locale';
import { muxPlaybackIdFromUrl, muxPosterVariantUrl } from '../core/review-media.js';

var muxPlayerModulePromise = null;

function loadMuxPlayer() {
  if (!muxPlayerModulePromise) {
    muxPlayerModulePromise = ensureStorefrontReviewMuxPlayerTheme();
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
  player.setAttribute('lang', REVIEW_PLAYER_LOCALE);
  player.setAttribute('theme', STOREFRONT_REVIEW_MUX_PLAYER_THEME);
  player.setAttribute('accent-color', STOREFRONT_REVIEW_PLAYER_COLORS.controlForeground);
  player.setAttribute('primary-color', STOREFRONT_REVIEW_PLAYER_COLORS.controlForeground);
  player.setAttribute('secondary-color', STOREFRONT_REVIEW_PLAYER_COLORS.controlBackground);
  if (poster) player.setAttribute('poster', poster);
  player.setAttribute('playback-id', playbackId);
  return true;
}

function preventNativeVideoContextMenu(event) {
  event.preventDefault();
}

function resolveFullscreenTarget(options) {
  if (!options || typeof options.getFullscreenElement !== 'function') return null;
  var target = options.getFullscreenElement();
  return target && typeof target.querySelector === 'function' ? target : null;
}

function assignFullscreenTarget(player, options) {
  var target = resolveFullscreenTarget(options);
  var controller = player && player.mediaController;
  if (!target || !target.isConnected || !controller || !('fullscreenElement' in controller)) return false;
  controller.fullscreenElement = target;
  return true;
}

export function createReviewVideoPlayback(media, className, options) {
  var cancelled = false;
  var fullscreenRetryTimer = null;
  var player = document.createElement('mux-player');
  player.className = className || 'renuvex-pr-modal-main-video';
  player.setAttribute('aria-label', 'Yorum videosu');
  player.addEventListener('contextmenu', preventNativeVideoContextMenu);

  function clearFullscreenRetry() {
    if (fullscreenRetryTimer) {
      clearTimeout(fullscreenRetryTimer);
      fullscreenRetryTimer = null;
    }
  }

  function bindFullscreenTarget(attempt) {
    clearFullscreenRetry();
    if (cancelled || assignFullscreenTarget(player, options)) return;
    if (attempt >= 10) return;
    fullscreenRetryTimer = setTimeout(function () {
      bindFullscreenTarget(attempt + 1);
    }, 50);
  }

  var configured = applyReviewPlayerAttributes(player, media);
  if (configured) {
    loadMuxPlayer()
      .then(function () {
        bindFullscreenTarget(0);
      })
      .catch(function () {
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
      clearFullscreenRetry();
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

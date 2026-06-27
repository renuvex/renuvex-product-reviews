import {
  STOREFRONT_REVIEW_PLAYER_COLORS,
  ensureStorefrontReviewMuxPlayerTheme,
  STOREFRONT_REVIEW_MUX_PLAYER_THEME,
} from '../../lib/mux-player/review-player-theme';
import { REVIEW_PLAYER_LOCALE } from '../../lib/mux-player/review-player-locale';
import { muxPlaybackIdFromUrl, muxPosterVariantUrl } from '../core/review-media.js';

var muxPlayerModulePromise = null;
var INITIAL_CENTER_PLAY_BUTTON_VAR = '--center-play-button';

function loadMuxPlayer() {
  if (!muxPlayerModulePromise) {
    muxPlayerModulePromise = ensureStorefrontReviewMuxPlayerTheme();
  }
  return muxPlayerModulePromise;
}

function afterAnimationFrames(count) {
  return new Promise(function (resolve) {
    function nextFrame(remaining) {
      if (remaining <= 0) {
        resolve();
        return;
      }
      requestAnimationFrame(function () {
        nextFrame(remaining - 1);
      });
    }
    nextFrame(count);
  });
}

function hideInitialCenterPlayButton(player) {
  player.style.setProperty(INITIAL_CENTER_PLAY_BUTTON_VAR, 'none');
}

function showInitialCenterPlayButton(player) {
  player.style.removeProperty(INITIAL_CENTER_PLAY_BUTTON_VAR);
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
  player.setAttribute('muted', '');
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

export function createReviewVideoPlayback(media, className) {
  var cancelled = false;
  var player = document.createElement('mux-player');
  player.className = className || 'renuvex-pr-modal-main-video';
  player.setAttribute('aria-label', 'Yorum videosu');
  hideInitialCenterPlayButton(player);
  player.addEventListener('contextmenu', preventNativeVideoContextMenu);

  var configured = applyReviewPlayerAttributes(player, media);
  if (configured) {
    loadMuxPlayer()
      .then(function () {
        if (window.customElements && typeof window.customElements.whenDefined === 'function') {
          return window.customElements.whenDefined('mux-player');
        }
        return undefined;
      })
      .then(function () {
        if (cancelled) return undefined;
        try {
          if (typeof player.pause === 'function') player.pause();
        } catch (_) {}
        return afterAnimationFrames(2);
      })
      .then(function () {
        if (!cancelled) showInitialCenterPlayButton(player);
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
      try {
        if (typeof player.pause === 'function') player.pause();
      } catch (_) {}
      player.removeAttribute('playback-id');
      player.removeAttribute('playback-token');
      player.removeAttribute('thumbnail-token');
      player.removeAttribute('poster');
      showInitialCenterPlayButton(player);
      player.removeEventListener('contextmenu', preventNativeVideoContextMenu);
    },
  };
}

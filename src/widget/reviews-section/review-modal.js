// reviews-section/review-modal.js — Fotoğraflı yorum detay modalı

import {
  starsHTML,
  formatDate,
  optimizeImageUrl,
  LIGHTBOX_MAIN_WIDTH,
  LIGHTBOX_MINI_THUMB_WIDTH,
  buildResponsiveImgAttrs,
  attachImageErrorHandler,
  hideOnImageError,
  settingText,
} from '../core/helpers.js';
import {
  formatMediaDuration,
  getFirstTrustedReviewMedia,
  getTrustedReviewMedia,
  muxPosterSrcSet,
  muxPosterVariantUrl,
} from '../core/review-media.js';
import { currentSettings } from '../core/state.js';
import {
  RENUVEX_PR_SETTINGS_UPDATED_PREVIEW,
} from '../core/namespace.js';
import { createOverlayShadowHost, injectShadowStyles, HOST_RESET_CSS } from '../core/shadow.js';
import { CLASSIC_CSS } from './styles.js';
import { BASE_RESET_CSS } from '../shared/base-reset.js';
import { registerSpriteRoot, unregisterSpriteRoot, iconUseNode } from '../icons/star-sprite.js';
import { PLAY_ICON, UI_CLOSE, UI_CARET_LEFT, UI_CARET_RIGHT } from '../icons/index.js';
import { lockBodyScroll, restoreBodyScroll } from '../core/body-scroll-lock.js';
import { getReturnFocusElement, restoreFocus, trapFocus } from '../shared/focus-trap.js';
import { wasLastInputKeyboard } from '../shared/input-modality.js';
import { pushModalHistoryEntry, restoreModalHistoryEntry } from '../core/modal-history.js';
import { createReviewVideoPlayback } from './video-playback.js';

function getValidMedia(review) {
  return getTrustedReviewMedia(review);
}

function isMediaGalleryModal(modalState) {
  return modalState && modalState.source === 'mediaGallery';
}

function getModalMediaItems(review, modalState) {
  if (!isMediaGalleryModal(modalState)) return getValidMedia(review);
  var representative = getFirstTrustedReviewMedia(review);
  return representative ? [representative] : [];
}

function getModalReviewsWithMedia(allReviews, source) {
  return (allReviews || []).filter(function(rv) {
    return source === 'mediaGallery'
      ? !!getFirstTrustedReviewMedia(rv)
      : getValidMedia(rv).length > 0;
  });
}

function cleanupMediaContainer(container) {
  if (container && typeof container.__renuvexMediaCleanup === 'function') {
    try { container.__renuvexMediaCleanup(); } catch (_) {}
    container.__renuvexMediaCleanup = null;
  }
}

function closeModal(host, onKeyDown, onPopState, bodyScrollState, returnFocusEl, openedByKeyboard) {
  if (host && host.shadowRoot) cleanupMediaContainer(host.shadowRoot.querySelector('.renuvex-pr-modal-left'));
  restoreBodyScroll(bodyScrollState);
  document.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('popstate', onPopState);
  // Stop the sprite observer from tracking this root, then remove the host;
  // removing the body-level shadow host disposes the overlay + its shadow root.
  if (host && host.shadowRoot) unregisterSpriteRoot(host.shadowRoot);
  if (host && host.parentNode) host.parentNode.removeChild(host);
  // Keyboard opens return focus to the trigger (so Tab continues from where it left
  // off); pointer/touch opens do NOT — otherwise closing with Esc after a mouse/tap
  // open leaves a focus ring stuck on the photo trigger. Removing the shadow host
  // above already blurs focus to <body>, so we simply skip the restore for pointer
  // opens. Mirrors the review wizard contract (review-form-modal/modal-shell.js).
  if (openedByKeyboard) restoreFocus(returnFocusEl);
}

function buildRight(r) {
  var right = document.createElement('div');
  right.className = 'renuvex-pr-modal-right';

  var scrollContent = document.createElement('div');
  scrollContent.className = 'renuvex-pr-modal-scroll-content';

  var topRow = document.createElement('div');
  topRow.className = 'renuvex-pr-modal-top-row';

  var starsEl = document.createElement('div');
  starsEl.className = 'renuvex-pr-modal-stars';
  starsEl.innerHTML = starsHTML(r.rating, currentSettings);

  var dateEl = document.createElement('span');
  dateEl.className = 'renuvex-pr-modal-date';
  dateEl.textContent = formatDate(r.createdAt);

  topRow.appendChild(starsEl);
  topRow.appendChild(dateEl);
  scrollContent.appendChild(topRow);

  var titleEl = document.createElement('div');
  titleEl.className = 'renuvex-pr-modal-title';
  titleEl.textContent = r.title || '';
  titleEl.style.display = r.title ? '' : 'none';
  scrollContent.appendChild(titleEl);

  var authorEl = document.createElement('div');
  authorEl.className = 'renuvex-pr-modal-author';
  authorEl.textContent = r.author || '';
  scrollContent.appendChild(authorEl);

  var bodyEl = document.createElement('div');
  bodyEl.className = 'renuvex-pr-modal-body';
  bodyEl.textContent = (r.comment || '').trim();
  bodyEl.style.display = (r.comment && r.comment.trim()) ? '' : 'none';
  scrollContent.appendChild(bodyEl);

  var replyEl = document.createElement('div');
  replyEl.className = 'renuvex-pr-modal-reply';
  var replyLabel = document.createElement('div');
  replyLabel.className = 'renuvex-pr-modal-reply-label';
  replyLabel.textContent = settingText(currentSettings && currentSettings.merchantReplyLabel, 'Mağaza Sahibi');
  var replyText = document.createElement('div');
  replyText.className = 'renuvex-pr-modal-reply-text';
  replyText.textContent = r.merchantReply || '';
  replyEl.appendChild(replyLabel);
  replyEl.appendChild(replyText);
  replyEl.style.display = r.merchantReply ? '' : 'none';
  scrollContent.appendChild(replyEl);

  right.appendChild(scrollContent);

  return right;
}

function updateRight(right, r, settings) {
  var activeSettings = settings || currentSettings;
  var scrollContent = right.querySelector('.renuvex-pr-modal-scroll-content');
  var starsEl = scrollContent.querySelector('.renuvex-pr-modal-stars');
  starsEl.innerHTML = starsHTML(r.rating, activeSettings);
  scrollContent.querySelector('.renuvex-pr-modal-date').textContent = formatDate(r.createdAt);

  var titleEl = scrollContent.querySelector('.renuvex-pr-modal-title');
  titleEl.textContent = r.title || '';
  titleEl.style.display = r.title ? '' : 'none';

  scrollContent.querySelector('.renuvex-pr-modal-author').textContent = r.author || '';

  var bodyEl = scrollContent.querySelector('.renuvex-pr-modal-body');
  bodyEl.textContent = (r.comment || '').trim();
  bodyEl.style.display = (r.comment && r.comment.trim()) ? '' : 'none';

  var replyEl = scrollContent.querySelector('.renuvex-pr-modal-reply');
  replyEl.querySelector('.renuvex-pr-modal-reply-label').textContent =
    settingText(activeSettings && activeSettings.merchantReplyLabel, 'Mağaza Sahibi');
  replyEl.querySelector('.renuvex-pr-modal-reply-text').textContent = r.merchantReply || '';
  replyEl.style.display = r.merchantReply ? '' : 'none';

  right.scrollTop = 0;
}

var VIDEO_PLAYER_CONTROL_GESTURE_GUARD_PX = 112;

function getTouchPoint(event) {
  if (event && event.touches && event.touches.length) return event.touches[0];
  if (event && event.changedTouches && event.changedTouches.length) return event.changedTouches[0];
  return null;
}

function isThumbRailGesture(event) {
  var target = event && event.target;
  return !!(target && typeof target.closest === 'function' && target.closest('.renuvex-pr-modal-thumbs'));
}

function shouldReserveVideoControlGesture(event, currentMedia, left) {
  if (!currentMedia || currentMedia.type !== 'video' || !left) return false;
  var touch = getTouchPoint(event);
  if (!touch) return false;

  var player = left.querySelector('mux-player.renuvex-pr-modal-main-video');
  if (!player || typeof player.getBoundingClientRect !== 'function') return false;

  var rect = player.getBoundingClientRect();
  if (!rect.width || !rect.height) return false;
  if (touch.clientX < rect.left || touch.clientX > rect.right) return false;
  if (touch.clientY < rect.top || touch.clientY > rect.bottom) return false;

  var controlBandHeight = Math.min(
    VIDEO_PLAYER_CONTROL_GESTURE_GUARD_PX,
    Math.max(72, rect.height * 0.2),
  );
  return touch.clientY >= rect.bottom - controlBandHeight;
}

function modalThumbImageAttrs(item) {
  var url = item && item.type === 'video' ? item.posterUrl : item && item.url;
  if (item && item.type === 'video') {
    var opts = {
      width: LIGHTBOX_MINI_THUMB_WIDTH,
      height: LIGHTBOX_MINI_THUMB_WIDTH,
      fit: 'crop',
    };
    return {
      src: muxPosterVariantUrl(url, opts),
      srcset: muxPosterSrcSet(url, opts),
    };
  }
  return buildResponsiveImgAttrs(url, LIGHTBOX_MINI_THUMB_WIDTH);
}

function buildMediaGalleryRailThumb(entry, isActive, onSelect) {
  var item = entry && entry.media;
  if (!item) return null;

  var button = document.createElement('button');
  button.type = 'button';
  button.className = 'renuvex-pr-modal-thumb renuvex-pr-modal-thumb-button' +
    (item.type === 'video' ? ' renuvex-pr-modal-thumb-video' : '') +
    (isActive ? ' renuvex-pr-modal-thumb-active' : '');
  button.setAttribute('aria-label', 'Galeri medyası ' + (entry.index + 1) + ' seç');
  if (isActive) button.setAttribute('aria-current', 'true');

  var img = document.createElement('img');
  img.className = 'renuvex-pr-modal-thumb-img';
  var attrs = modalThumbImageAttrs(item);
  img.src = attrs.src;
  if (attrs.srcset) img.srcset = attrs.srcset;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.width = LIGHTBOX_MINI_THUMB_WIDTH;
  img.height = LIGHTBOX_MINI_THUMB_WIDTH;
  img.alt = '';
  hideOnImageError(img);
  button.appendChild(img);

  if (item.type === 'video') {
    var play = document.createElement('span');
    play.className = 'renuvex-pr-modal-thumb-play';
    var playIcon = iconUseNode(PLAY_ICON);
    if (playIcon) play.appendChild(playIcon);
    button.appendChild(play);

    var duration = formatMediaDuration(item.durationMs);
    if (duration) {
      var badge = document.createElement('span');
      badge.className = 'renuvex-pr-modal-thumb-duration';
      badge.textContent = duration;
      button.appendChild(badge);
    }
  }

  button.onclick = onSelect;
  return button;
}

function buildMediaGalleryThumbEntries(reviewsWithPhotos) {
  var entries = [];
  (reviewsWithPhotos || []).forEach(function(review, reviewIdx) {
    var media = getFirstTrustedReviewMedia(review);
    if (!media) return;
    entries.push({
      review: review,
      reviewIdx: reviewIdx,
      media: media,
      index: entries.length,
    });
  });
  return entries;
}

function buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, direction, overlay, modalState) {
  var mediaItems = getModalMediaItems(r, modalState);
  var currentPhotoIdx = Math.max(0, Math.min(photoIdx || 0, mediaItems.length - 1));
  var currentMedia = mediaItems[currentPhotoIdx];

  var left = document.createElement('div');
  left.className = 'renuvex-pr-modal-left';

  var animClass = direction === 'next' ? 'renuvex-pr-modal-img-enter-right' : direction === 'prev' ? 'renuvex-pr-modal-img-enter-left' : '';
  if (currentMedia && currentMedia.type === 'video') {
    var playback = createReviewVideoPlayback(
      currentMedia,
      'renuvex-pr-modal-main-video' + (animClass ? ' renuvex-pr-modal-video-enter' : ''),
    );
    var mainVideo = playback.element;
    mainVideo.addEventListener('error', function () {
      if (left.querySelector('.renuvex-pr-modal-img-error')) return;
      var videoPlaceholder = document.createElement('div');
      videoPlaceholder.className = 'renuvex-pr-modal-img-error';
      videoPlaceholder.setAttribute('role', 'status');
      videoPlaceholder.textContent = 'Bu video şu anda oynatılamıyor.';
      left.insertBefore(videoPlaceholder, mainVideo);
    });
    var markVideoPlaying = function () {
      left.classList.add('renuvex-pr-modal-left-video-playing');
    };
    var markVideoIdle = function () {
      left.classList.remove('renuvex-pr-modal-left-video-playing');
    };
    mainVideo.addEventListener('play', markVideoPlaying);
    mainVideo.addEventListener('playing', markVideoPlaying);
    mainVideo.addEventListener('pause', markVideoIdle);
    mainVideo.addEventListener('ended', markVideoIdle);
    left.__renuvexMediaCleanup = function () {
      mainVideo.removeEventListener('play', markVideoPlaying);
      mainVideo.removeEventListener('playing', markVideoPlaying);
      mainVideo.removeEventListener('pause', markVideoIdle);
      mainVideo.removeEventListener('ended', markVideoIdle);
      markVideoIdle();
      playback.cleanup();
    };
    left.appendChild(mainVideo);
  } else {
    var mainImg = document.createElement('img');
    mainImg.className = 'renuvex-pr-modal-main-img' + (animClass ? ' ' + animClass : '');
    mainImg.src = optimizeImageUrl(currentMedia ? currentMedia.url : '');
    mainImg.decoding = 'async';
    mainImg.width = LIGHTBOX_MAIN_WIDTH;
    mainImg.height = Math.round(LIGHTBOX_MAIN_WIDTH * 4 / 3);
    mainImg.alt = 'Yorum fotoğrafı';
    if (!animClass) {
      mainImg.classList.add('renuvex-pr-modal-img-loading');
      var revealMainImg = function () { mainImg.classList.remove('renuvex-pr-modal-img-loading'); };
      if (mainImg.complete && mainImg.naturalWidth > 0) revealMainImg();
      else {
        mainImg.addEventListener('load', revealMainImg, { once: true });
        mainImg.addEventListener('error', revealMainImg, { once: true });
      }
    }
    attachImageErrorHandler(mainImg, function (img) {
      img.style.display = 'none';
      if (left.querySelector('.renuvex-pr-modal-img-error')) return;
      var placeholder = document.createElement('div');
      placeholder.className = 'renuvex-pr-modal-img-error';
      placeholder.setAttribute('role', 'status');
      placeholder.textContent = 'Bu görsel şu anda yüklenemiyor.';
      left.insertBefore(placeholder, img);
    });
    left.appendChild(mainImg);
  }

  var mobileClose = document.createElement('button');
  mobileClose.className = 'renuvex-pr-modal-close-mobile';
  var mobileCloseIcon = iconUseNode(UI_CLOSE);
  if (mobileCloseIcon) mobileClose.appendChild(mobileCloseIcon);
  mobileClose.setAttribute('aria-label', 'Kapat');
  mobileClose.onclick = function(e) { e.stopPropagation(); requestClose(); };
  left.appendChild(mobileClose);

  // Swipe desteği — görsel alanında yatay kaydırma
  var touchStartX = 0;
  var reservePlayerControlGesture = false;
  var reserveThumbRailGesture = false;
  left.addEventListener('touchstart', function(e) {
    var touch = getTouchPoint(e);
    if (!touch) return;
    reserveThumbRailGesture = isThumbRailGesture(e);
    touchStartX = touch.clientX;
    reservePlayerControlGesture = !reserveThumbRailGesture && shouldReserveVideoControlGesture(e, currentMedia, left);
  }, { passive: true });
  left.addEventListener('touchend', function(e) {
    if (reserveThumbRailGesture) {
      reserveThumbRailGesture = false;
      reservePlayerControlGesture = false;
      return;
    }
    if (reservePlayerControlGesture) {
      reservePlayerControlGesture = false;
      return;
    }
    var touch = getTouchPoint(e);
    if (!touch) return;
    var diff = touchStartX - touch.clientX;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) {
      // sola kaydır — sonraki
      if (hasNextPhoto) {
        rebuildModal(r, reviewIdx, currentPhotoIdx + 1, reviewsWithPhotos, modal, requestClose, true, 'next', overlay, modalState);
      } else if (hasNextReview) {
        var nextReview = reviewsWithPhotos[reviewIdx + 1];
        rebuildModal(nextReview, reviewIdx + 1, 0, reviewsWithPhotos, modal, requestClose, false, 'next', overlay, modalState);
      }
    } else {
      // sağa kaydır — önceki
      if (hasPrevPhoto) {
        rebuildModal(r, reviewIdx, currentPhotoIdx - 1, reviewsWithPhotos, modal, requestClose, true, 'prev', overlay, modalState);
      } else if (hasPrevReview) {
        var prevReview = reviewsWithPhotos[reviewIdx - 1];
        var prevImages = getValidMedia(prevReview);
        rebuildModal(prevReview, reviewIdx - 1, prevImages.length - 1, reviewsWithPhotos, modal, requestClose, false, 'prev', overlay, modalState);
      }
    }
  }, { passive: true });


  if (isMediaGalleryModal(modalState)) {
    var galleryThumbEntries = buildMediaGalleryThumbEntries(reviewsWithPhotos);
    if (galleryThumbEntries.length > 1) {
      var galleryThumbBar = document.createElement('div');
      galleryThumbBar.className = 'renuvex-pr-modal-thumbs renuvex-pr-modal-thumbs--gallery';
      galleryThumbEntries.forEach(function(entry) {
        var thumb = buildMediaGalleryRailThumb(entry, entry.reviewIdx === reviewIdx, function() {
          rebuildModal(entry.review, entry.reviewIdx, 0, reviewsWithPhotos, modal, requestClose, false, null, overlay, modalState);
        });
        if (thumb) galleryThumbBar.appendChild(thumb);
      });
      left.appendChild(galleryThumbBar);
    }
  } else if (mediaItems.length > 1) {
    var thumbBar = document.createElement('div');
    thumbBar.className = 'renuvex-pr-modal-thumbs';
    mediaItems.forEach(function(item, i) {
      var url = item.type === 'video' ? item.posterUrl : item.url;
      var th = document.createElement('img');
      // Lightbox altı mini şerit 60-80 px — küçük responsive varyant yeter.
      var thumbAttrs = buildResponsiveImgAttrs(url, LIGHTBOX_MINI_THUMB_WIDTH);
      th.src = thumbAttrs.src;
      th.srcset = thumbAttrs.srcset;
      th.loading = 'lazy';
      th.decoding = 'async';
      th.width = LIGHTBOX_MINI_THUMB_WIDTH;
      th.height = LIGHTBOX_MINI_THUMB_WIDTH;
      th.className = 'renuvex-pr-modal-thumb' + (i === currentPhotoIdx ? ' renuvex-pr-modal-thumb-active' : '');
      th.alt = 'Küçük resim ' + (i + 1);
      hideOnImageError(th);
      th.tabIndex = 0;
      th.setAttribute('role', 'button');
      th.setAttribute('aria-label', 'Küçük resim ' + (i + 1) + ' seç');
      if (i === currentPhotoIdx) th.setAttribute('aria-current', 'true');
      (function(idx) {
        function selectThumb() {
          rebuildModal(r, reviewIdx, idx, reviewsWithPhotos, modal, requestClose, true, null, overlay, modalState);
        }
        th.onclick = selectThumb;
        th.onkeydown = function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectThumb();
          }
        };
      })(i);
      thumbBar.appendChild(th);
    });
    left.appendChild(thumbBar);
  }

  var hasPrevPhoto = currentPhotoIdx > 0;
  var hasNextPhoto = currentPhotoIdx < mediaItems.length - 1;
  var hasPrevReview = reviewIdx > 0;
  var hasNextReview = reviewIdx < reviewsWithPhotos.length - 1;
  var hasPrev = hasPrevPhoto || hasPrevReview;
  var hasNext = hasNextPhoto || hasNextReview;

  if (hasPrev) {
    var prevBtn = document.createElement('button');
    prevBtn.className = 'renuvex-pr-modal-nav renuvex-pr-modal-nav-prev';
    var prevIcon = iconUseNode(UI_CARET_LEFT);
    if (prevIcon) prevBtn.appendChild(prevIcon);
    prevBtn.setAttribute('aria-label', 'Önceki');
    prevBtn.onclick = function(e) {
      e.stopPropagation();
      if (hasPrevPhoto) {
        rebuildModal(r, reviewIdx, currentPhotoIdx - 1, reviewsWithPhotos, modal, requestClose, true, 'prev', overlay, modalState);
      } else if (hasPrevReview) {
        var prevReview = reviewsWithPhotos[reviewIdx - 1];
        var prevImages = getValidMedia(prevReview);
        rebuildModal(prevReview, reviewIdx - 1, prevImages.length - 1, reviewsWithPhotos, modal, requestClose, false, 'prev', overlay, modalState);
      }
    };
    left.appendChild(prevBtn);
  }

  if (hasNext) {
    var nextBtn = document.createElement('button');
    nextBtn.className = 'renuvex-pr-modal-nav renuvex-pr-modal-nav-next';
    var nextIcon = iconUseNode(UI_CARET_RIGHT);
    if (nextIcon) nextBtn.appendChild(nextIcon);
    nextBtn.setAttribute('aria-label', 'Sonraki');
    nextBtn.onclick = function(e) {
      e.stopPropagation();
      if (hasNextPhoto) {
        rebuildModal(r, reviewIdx, currentPhotoIdx + 1, reviewsWithPhotos, modal, requestClose, true, 'next', overlay, modalState);
      } else if (hasNextReview) {
        var nextReview = reviewsWithPhotos[reviewIdx + 1];
        rebuildModal(nextReview, reviewIdx + 1, 0, reviewsWithPhotos, modal, requestClose, false, 'next', overlay, modalState);
      }
    };
    left.appendChild(nextBtn);
  }

  return left;
}

function prefetchNeighbors(reviewIdx, reviewsWithPhotos) {
  [-1, 1].forEach(function(offset) {
    var neighbor = reviewsWithPhotos[reviewIdx + offset];
    if (!neighbor) return;
    var items = getValidMedia(neighbor);
    if (items[0] && items[0].type === 'image') new Image().src = optimizeImageUrl(items[0].url);
  });
}

function resetElementScroll(el) {
  if (!el) return;
  if (typeof el.scrollTo === 'function') {
    try {
      el.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    } catch (_) {}
  }
  el.scrollTop = 0;
  el.scrollLeft = 0;
}

function normalizeReviewChangeScroll(overlay, modal) {
  var wrap = overlay && overlay.querySelector('.renuvex-pr-modal-wrap');
  var right = modal && modal.querySelector('.renuvex-pr-modal-right');
  var scrollContent = modal && modal.querySelector('.renuvex-pr-modal-scroll-content');

  function resetAll() {
    resetElementScroll(wrap);
    resetElementScroll(right);
    resetElementScroll(scrollContent);
  }

  resetAll();
  if (wrap) restoreFocus(wrap);

  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(function() {
      resetAll();
      requestAnimationFrame(resetAll);
    });
  } else {
    setTimeout(resetAll, 0);
  }
}

function rebuildModal(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, photoOnly, direction, overlay, modalState) {
  if (modalState) modalState.currentReview = r;
  if (photoOnly) {
    var newLeft = buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, direction, overlay, modalState);
    if (modal.firstChild) {
      cleanupMediaContainer(modal.firstChild);
      modal.replaceChild(newLeft, modal.firstChild);
    }
  } else {
    var newLeft = buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, direction, overlay, modalState);
    var existingRight = modal.querySelector('.renuvex-pr-modal-right');
    if (modal.firstChild) {
      cleanupMediaContainer(modal.firstChild);
      modal.replaceChild(newLeft, modal.firstChild);
    }
    if (existingRight) {
      updateRight(existingRight, r, modalState && modalState.currentSettings);
    }
    // Review changes can replace long content with short content; normalize every modal scroll layer after layout settles.
    normalizeReviewChangeScroll(overlay, modal);
  }
  prefetchNeighbors(reviewIdx, reviewsWithPhotos);
}

export function openReviewModal(r, clickedUrl, allReviews, options) {
  var source = options && options.source === 'mediaGallery' ? 'mediaGallery' : 'review';
  var images = source === 'mediaGallery'
    ? (getFirstTrustedReviewMedia(r) ? [getFirstTrustedReviewMedia(r)] : [])
    : getValidMedia(r);
  if (!images.length) return;

  var reviewsWithPhotos = getModalReviewsWithMedia(allReviews, source);

  var reviewIdx = reviewsWithPhotos.findIndex(function(rv) { return rv === r || rv.id === r.id; });
  if (reviewIdx === -1) {
    reviewsWithPhotos.unshift(r);
    reviewIdx = 0;
  }

  var photoIdx = images.findIndex(function(item) { return item.url === clickedUrl; });
  if (photoIdx < 0) photoIdx = 0;

  var overlay = document.createElement('div');
  overlay.className = 'renuvex-pr-modal-overlay';

  var modal = document.createElement('div');
  modal.className = 'renuvex-pr-modal';

  var closed = false;
  var shadow = null;
  var returnFocusEl = getReturnFocusElement();
  // Capture HOW the lightbox was opened (keyboard vs pointer) at open time, not at
  // close time — Esc itself flips the global modality flag to keyboard, so reading it
  // on close would always look like keyboard. Used by closeModal to decide focus return.
  var openedByKeyboard = wasLastInputKeyboard();
  var bodyScrollState = lockBodyScroll();
  var modalHistoryEntry = pushModalHistoryEntry();
  var modalState = {
    currentReview: r,
    currentSettings: currentSettings,
    source: source,
  };
  var lastPreviewSettings = null;

  // Preview modunda açık lightbox ana render ağacının dışında kalır.
  // Closure state'teki aktif review ile sağ paneli tek seferde yeniden senkronlarız.
  function onSettingsUpdate(event) {
    var nextSettings = event && event.detail && event.detail.settings;
    if (nextSettings && nextSettings === lastPreviewSettings) return;
    lastPreviewSettings = nextSettings || null;
    modalState.currentSettings = nextSettings || currentSettings;
    var right = modal.querySelector('.renuvex-pr-modal-right');
    if (!right || !modalState.currentReview) return;
    updateRight(right, modalState.currentReview, modalState.currentSettings);
  }

  function onPopState() {
    if (closed) return;
    closed = true;
    window.removeEventListener(RENUVEX_PR_SETTINGS_UPDATED_PREVIEW, onSettingsUpdate);
    closeModal(shadow && shadow.host, onKeyDown, onPopState, bodyScrollState, returnFocusEl, openedByKeyboard);
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      requestClose();
      return;
    }
    trapFocus(e, overlay, shadow && shadow.root);
  }

  function requestClose() {
    if (closed) return;
    closed = true;
    window.removeEventListener(RENUVEX_PR_SETTINGS_UPDATED_PREVIEW, onSettingsUpdate);
    closeModal(shadow && shadow.host, onKeyDown, onPopState, bodyScrollState, returnFocusEl, openedByKeyboard);
    restoreModalHistoryEntry(modalHistoryEntry);
  }

  document.addEventListener('keydown', onKeyDown);

  window.addEventListener('popstate', onPopState);
  window.addEventListener(RENUVEX_PR_SETTINGS_UPDATED_PREVIEW, onSettingsUpdate);

  overlay.onclick = function() { requestClose(); };
  modal.onclick = function(e) { e.stopPropagation(); };

  modal.appendChild(buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, null, overlay, modalState));
  modal.appendChild(buildRight(r));
  prefetchNeighbors(reviewIdx, reviewsWithPhotos);

  var modalWrap = document.createElement('div');
  modalWrap.className = 'renuvex-pr-modal-wrap';
  modalWrap.tabIndex = -1;
  modalWrap.setAttribute('role', 'dialog');
  modalWrap.setAttribute('aria-modal', 'true');
  modalWrap.setAttribute('aria-label', 'Yorum medyası detayı');
  modalWrap.appendChild(modal);

  var closeBtn = document.createElement('button');
  closeBtn.className = 'renuvex-pr-modal-close';
  var closeIcon = iconUseNode(UI_CLOSE);
  if (closeIcon) closeBtn.appendChild(closeIcon);
  closeBtn.setAttribute('aria-label', 'Kapat');
  closeBtn.onclick = function(e) { e.stopPropagation(); requestClose(); };
  modalWrap.appendChild(closeBtn);
  overlay.appendChild(modalWrap);

  // Isolate the lightbox in its own body-level shadow root so host-theme CSS
  // cannot reach it. Review CSS vars on documentElement still inherit in; the
  // modal CSS rules (from CLASSIC_CSS) are injected into this shadow root.
  shadow = createOverlayShadowHost();
  injectShadowStyles(shadow.root, HOST_RESET_CSS + BASE_RESET_CSS + CLASSIC_CSS);
  shadow.root.appendChild(overlay);
  // Mirror the icon sprite so star/icon <use> refs resolve inside this shadow.
  registerSpriteRoot(shadow.root);
  // Focus the dialog container (role=dialog) itself, NOT the first control, so opening
  // via a media-gallery thumbnail (or any click) does not show a focus ring on a nav arrow.
  // Tab then navigates the lightbox controls.
  restoreFocus(modalWrap);
}

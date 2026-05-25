// product-widget/review-modal.js — Fotoğraflı yorum detay modalı

import {
  starsHTML,
  formatDate,
  getTrustedReviewImages,
  optimizeImageUrl,
  LIGHTBOX_MAIN_WIDTH,
  LIGHTBOX_MINI_THUMB_WIDTH,
  buildResponsiveImgAttrs,
  attachImageErrorHandler,
  hideOnImageError,
} from '../core/helpers.js';
import { currentSettings } from '../core/state.js';
import {
  RENUVEX_PR_SETTINGS_UPDATED_PREVIEW,
} from '../core/namespace.js';

function getValidImages(review) {
  return getTrustedReviewImages(review);
}

function captureBodyScrollState() {
  var bodyStyle = document.body.style;
  var rootStyle = document.documentElement.style;
  return {
    scrollX: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
    scrollY: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
    fixedBodyLock: false,
    bodyOverflow: bodyStyle.getPropertyValue('overflow'),
    bodyOverflowPriority: bodyStyle.getPropertyPriority('overflow'),
    bodyPaddingRight: bodyStyle.getPropertyValue('padding-right'),
    bodyPaddingRightPriority: bodyStyle.getPropertyPriority('padding-right'),
    bodyPosition: bodyStyle.getPropertyValue('position'),
    bodyPositionPriority: bodyStyle.getPropertyPriority('position'),
    bodyTop: bodyStyle.getPropertyValue('top'),
    bodyTopPriority: bodyStyle.getPropertyPriority('top'),
    bodyLeft: bodyStyle.getPropertyValue('left'),
    bodyLeftPriority: bodyStyle.getPropertyPriority('left'),
    bodyRight: bodyStyle.getPropertyValue('right'),
    bodyRightPriority: bodyStyle.getPropertyPriority('right'),
    bodyWidth: bodyStyle.getPropertyValue('width'),
    bodyWidthPriority: bodyStyle.getPropertyPriority('width'),
    bodyOverscrollBehaviorY: bodyStyle.getPropertyValue('overscroll-behavior-y'),
    bodyOverscrollBehaviorYPriority: bodyStyle.getPropertyPriority('overscroll-behavior-y'),
    rootOverflow: rootStyle.getPropertyValue('overflow'),
    rootOverflowPriority: rootStyle.getPropertyPriority('overflow'),
    rootOverscrollBehaviorY: rootStyle.getPropertyValue('overscroll-behavior-y'),
    rootOverscrollBehaviorYPriority: rootStyle.getPropertyPriority('overscroll-behavior-y'),
  };
}

function restoreStyleProperty(style, propertyName, value, priority) {
  if (value) {
    style.setProperty(propertyName, value, priority || '');
  } else {
    style.removeProperty(propertyName);
  }
}

function shouldUseFixedBodyLock() {
  if (typeof navigator === 'undefined') return false;
  var platform = navigator.platform || '';
  var ua = navigator.userAgent || '';
  var maxTouchPoints = navigator.maxTouchPoints || 0;
  var isIOS = /iP(ad|hone|od)/.test(platform) || (platform === 'MacIntel' && maxTouchPoints > 1);
  return isIOS && /AppleWebKit/i.test(ua);
}

function lockBodyScroll() {
  var previousState = captureBodyScrollState();
  var bodyStyle = document.body.style;
  var rootStyle = document.documentElement.style;
  var scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
  var isBodyAlreadyFixed = window.getComputedStyle(document.body).position === 'fixed';
  var shouldFixBody = shouldUseFixedBodyLock() && !isBodyAlreadyFixed;

  if (scrollbarWidth > 0) {
    var currentPaddingRight = parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
    bodyStyle.setProperty('padding-right', (currentPaddingRight + scrollbarWidth) + 'px', 'important');
  }
  rootStyle.setProperty('overflow', 'hidden', 'important');
  rootStyle.setProperty('overscroll-behavior-y', 'none', 'important');
  bodyStyle.setProperty('overflow', 'hidden', 'important');
  bodyStyle.setProperty('overscroll-behavior-y', 'none', 'important');

  if (shouldFixBody) {
    previousState.fixedBodyLock = true;
    bodyStyle.setProperty('position', 'fixed', 'important');
    bodyStyle.setProperty('top', (-previousState.scrollY) + 'px', 'important');
    bodyStyle.setProperty('left', (-previousState.scrollX) + 'px', 'important');
    bodyStyle.setProperty('right', '0', 'important');
    bodyStyle.setProperty('width', '100%', 'important');
  }

  return previousState;
}

function restoreBodyScroll(previousState) {
  if (!previousState) return;
  var bodyStyle = document.body.style;
  var rootStyle = document.documentElement.style;
  restoreStyleProperty(rootStyle, 'overflow', previousState.rootOverflow, previousState.rootOverflowPriority);
  restoreStyleProperty(rootStyle, 'overscroll-behavior-y', previousState.rootOverscrollBehaviorY, previousState.rootOverscrollBehaviorYPriority);
  restoreStyleProperty(bodyStyle, 'overflow', previousState.bodyOverflow, previousState.bodyOverflowPriority);
  restoreStyleProperty(bodyStyle, 'padding-right', previousState.bodyPaddingRight, previousState.bodyPaddingRightPriority);
  restoreStyleProperty(bodyStyle, 'overscroll-behavior-y', previousState.bodyOverscrollBehaviorY, previousState.bodyOverscrollBehaviorYPriority);
  restoreStyleProperty(bodyStyle, 'position', previousState.bodyPosition, previousState.bodyPositionPriority);
  restoreStyleProperty(bodyStyle, 'top', previousState.bodyTop, previousState.bodyTopPriority);
  restoreStyleProperty(bodyStyle, 'left', previousState.bodyLeft, previousState.bodyLeftPriority);
  restoreStyleProperty(bodyStyle, 'right', previousState.bodyRight, previousState.bodyRightPriority);
  restoreStyleProperty(bodyStyle, 'width', previousState.bodyWidth, previousState.bodyWidthPriority);
  if (previousState.fixedBodyLock) {
    window.scrollTo(previousState.scrollX, previousState.scrollY);
  }
}

function getReturnFocusElement() {
  var el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement) return null;
  return el;
}

function restoreFocus(el) {
  if (!el || !document.contains(el) || typeof el.focus !== 'function') return;
  try {
    el.focus({ preventScroll: true });
  } catch (_) {
    try { el.focus(); } catch (_) {}
  }
}

function isVisibleFocusable(el) {
  if (!el || el.disabled) return false;
  if (el.getAttribute('aria-hidden') === 'true') return false;
  return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}

function getFocusableElements(container) {
  var selector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');
  return Array.prototype.slice.call(container.querySelectorAll(selector)).filter(isVisibleFocusable);
}

function focusFirstModalControl(container) {
  var focusables = getFocusableElements(container);
  var target = focusables[0] || container.querySelector('[role="dialog"]') || container;
  restoreFocus(target);
}

function trapModalFocus(e, container) {
  if (e.key !== 'Tab') return;
  var focusables = getFocusableElements(container);
  if (!focusables.length) {
    e.preventDefault();
    focusFirstModalControl(container);
    return;
  }

  var first = focusables[0];
  var last = focusables[focusables.length - 1];
  var active = document.activeElement;

  if (!container.contains(active)) {
    e.preventDefault();
    restoreFocus(first);
    return;
  }

  if (e.shiftKey && active === first) {
    e.preventDefault();
    restoreFocus(last);
  } else if (!e.shiftKey && active === last) {
    e.preventDefault();
    restoreFocus(first);
  }
}

function createModalHistoryEntry() {
  var entry = {
    id: 'renuvex-pr-modal-' + Date.now() + '-' + Math.random().toString(36).slice(2),
    previousState: null,
    pushed: false,
    url: window.location.href,
  };

  try {
    entry.previousState = history.state;
    history.pushState({ renuvexPrModal: entry.id }, '', entry.url);
    entry.pushed = true;
  } catch (_) {}

  return entry;
}

function isCurrentModalHistoryEntry(entry) {
  return !!(
    entry &&
    entry.pushed &&
    window.location.href === entry.url &&
    history.state &&
    history.state.renuvexPrModal === entry.id
  );
}

function restoreModalHistoryEntry(entry) {
  if (!isCurrentModalHistoryEntry(entry)) return;
  try {
    history.replaceState(entry.previousState, '', entry.url);
  } catch (_) {}
}

function closeModal(overlay, onKeyDown, onPopState, bodyScrollState, returnFocusEl) {
  restoreBodyScroll(bodyScrollState);
  document.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('popstate', onPopState);
  if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  restoreFocus(returnFocusEl);
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
  replyLabel.textContent = (currentSettings && currentSettings.merchantReplyLabel) || 'Mağaza Sahibi';
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
    (activeSettings && activeSettings.merchantReplyLabel) || 'Mağaza Sahibi';
  replyEl.querySelector('.renuvex-pr-modal-reply-text').textContent = r.merchantReply || '';
  replyEl.style.display = r.merchantReply ? '' : 'none';

  right.scrollTop = 0;
}

function buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, direction, overlay, modalState) {
  var images = getValidImages(r);
  var currentPhotoIdx = Math.max(0, Math.min(photoIdx || 0, images.length - 1));

  var left = document.createElement('div');
  left.className = 'renuvex-pr-modal-left';

  var mainImg = document.createElement('img');
  var animClass = direction === 'next' ? 'renuvex-pr-modal-img-enter-right' : direction === 'prev' ? 'renuvex-pr-modal-img-enter-left' : '';
  mainImg.className = 'renuvex-pr-modal-main-img' + (animClass ? ' ' + animClass : '');
  mainImg.src = optimizeImageUrl(images[currentPhotoIdx] || '');
  mainImg.decoding = 'async';
  mainImg.width = LIGHTBOX_MAIN_WIDTH;
  mainImg.height = Math.round(LIGHTBOX_MAIN_WIDTH * 4 / 3);
  mainImg.alt = 'Yorum fotoğrafı';
  // Lightbox ana görsel için thumbnail'lerden farklı davranış — boş bırakmak
  // UX'i bozar. Görsel yüklenemediğinde yerine "Görsel yüklenemedi" placeholder'ı
  // konur; lightbox prev/next/swipe navigasyonu çalışmaya devam eder.
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

  var mobileClose = document.createElement('button');
  mobileClose.className = 'renuvex-pr-modal-close-mobile';
  mobileClose.textContent = '✕';
  mobileClose.setAttribute('aria-label', 'Kapat');
  mobileClose.onclick = function(e) { e.stopPropagation(); requestClose(); };
  left.appendChild(mobileClose);

  // Swipe desteği — görsel alanında yatay kaydırma
  var touchStartX = 0;
  left.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  left.addEventListener('touchend', function(e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
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
        var prevImages = getValidImages(prevReview);
        rebuildModal(prevReview, reviewIdx - 1, prevImages.length - 1, reviewsWithPhotos, modal, requestClose, false, 'prev', overlay, modalState);
      }
    }
  }, { passive: true });


  if (images.length > 1) {
    var thumbBar = document.createElement('div');
    thumbBar.className = 'renuvex-pr-modal-thumbs';
    images.forEach(function(url, i) {
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
  var hasNextPhoto = currentPhotoIdx < images.length - 1;
  var hasPrevReview = reviewIdx > 0;
  var hasNextReview = reviewIdx < reviewsWithPhotos.length - 1;
  var hasPrev = hasPrevPhoto || hasPrevReview;
  var hasNext = hasNextPhoto || hasNextReview;

  if (hasPrev) {
    var prevBtn = document.createElement('button');
    prevBtn.className = 'renuvex-pr-modal-nav renuvex-pr-modal-nav-prev';
    prevBtn.innerHTML = '&#8249;';
    prevBtn.setAttribute('aria-label', 'Önceki');
    prevBtn.onclick = function(e) {
      e.stopPropagation();
      if (hasPrevPhoto) {
        rebuildModal(r, reviewIdx, currentPhotoIdx - 1, reviewsWithPhotos, modal, requestClose, true, 'prev', overlay, modalState);
      } else if (hasPrevReview) {
        var prevReview = reviewsWithPhotos[reviewIdx - 1];
        var prevImages = getValidImages(prevReview);
        rebuildModal(prevReview, reviewIdx - 1, prevImages.length - 1, reviewsWithPhotos, modal, requestClose, false, 'prev', overlay, modalState);
      }
    };
    left.appendChild(prevBtn);
  }

  if (hasNext) {
    var nextBtn = document.createElement('button');
    nextBtn.className = 'renuvex-pr-modal-nav renuvex-pr-modal-nav-next';
    nextBtn.innerHTML = '&#8250;';
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
    var imgs = getValidImages(neighbor);
    if (imgs[0]) new Image().src = optimizeImageUrl(imgs[0]);
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
    if (modal.firstChild) modal.replaceChild(newLeft, modal.firstChild);
  } else {
    var newLeft = buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, direction, overlay, modalState);
    var existingRight = modal.querySelector('.renuvex-pr-modal-right');
    if (modal.firstChild) modal.replaceChild(newLeft, modal.firstChild);
    if (existingRight) {
      updateRight(existingRight, r, modalState && modalState.currentSettings);
    }
    // Review changes can replace long content with short content; normalize every modal scroll layer after layout settles.
    normalizeReviewChangeScroll(overlay, modal);
  }
  prefetchNeighbors(reviewIdx, reviewsWithPhotos);
}

export function openReviewModal(r, clickedUrl, allReviews) {
  var images = getValidImages(r);
  if (!images.length) return;

  var reviewsWithPhotos = (allReviews || []).filter(function(rv) {
    return getValidImages(rv).length > 0;
  });

  var reviewIdx = reviewsWithPhotos.findIndex(function(rv) { return rv === r || rv.id === r.id; });
  if (reviewIdx === -1) {
    reviewsWithPhotos.unshift(r);
    reviewIdx = 0;
  }

  var photoIdx = images.indexOf(clickedUrl);
  if (photoIdx < 0) photoIdx = 0;

  var overlay = document.createElement('div');
  overlay.className = 'renuvex-pr-modal-overlay';

  var modal = document.createElement('div');
  modal.className = 'renuvex-pr-modal';

  var closed = false;
  var returnFocusEl = getReturnFocusElement();
  var bodyScrollState = lockBodyScroll();
  var modalHistoryEntry = createModalHistoryEntry();
  var modalState = {
    currentReview: r,
    currentSettings: currentSettings,
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
    closeModal(overlay, onKeyDown, onPopState, bodyScrollState, returnFocusEl);
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      requestClose();
      return;
    }
    trapModalFocus(e, overlay);
  }

  function requestClose() {
    if (closed) return;
    closed = true;
    window.removeEventListener(RENUVEX_PR_SETTINGS_UPDATED_PREVIEW, onSettingsUpdate);
    closeModal(overlay, onKeyDown, onPopState, bodyScrollState, returnFocusEl);
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
  modalWrap.setAttribute('aria-label', 'Yorum fotoğrafı detayı');
  modalWrap.appendChild(modal);

  var closeBtn = document.createElement('button');
  closeBtn.className = 'renuvex-pr-modal-close';
  closeBtn.textContent = '✕';
  closeBtn.setAttribute('aria-label', 'Kapat');
  closeBtn.onclick = function(e) { e.stopPropagation(); requestClose(); };
  modalWrap.appendChild(closeBtn);
  overlay.appendChild(modalWrap);

  document.body.appendChild(overlay);
  focusFirstModalControl(overlay);
}

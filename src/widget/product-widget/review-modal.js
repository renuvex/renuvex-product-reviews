// product-widget/review-modal.js — Fotoğraflı yorum detay modalı

import {
  starsHTML,
  formatDate,
  getTrustedReviewImages,
  optimizeImageUrl,
  LIGHTBOX_MAIN_WIDTH,
  LIGHTBOX_MINI_THUMB_WIDTH,
  buildResponsiveImgAttrs,
} from '../core/helpers.js';
import { currentSettings } from '../core/state.js';

function getValidImages(review) {
  return getTrustedReviewImages(review);
}

function captureBodyScrollState() {
  var bodyStyle = document.body.style;
  return {
    overflow: bodyStyle.getPropertyValue('overflow'),
    overflowPriority: bodyStyle.getPropertyPriority('overflow'),
    paddingRight: bodyStyle.getPropertyValue('padding-right'),
    paddingRightPriority: bodyStyle.getPropertyPriority('padding-right'),
  };
}

function restoreStyleProperty(style, propertyName, value, priority) {
  if (value) {
    style.setProperty(propertyName, value, priority || '');
  } else {
    style.removeProperty(propertyName);
  }
}

function lockBodyScroll() {
  var previousState = captureBodyScrollState();
  var bodyStyle = document.body.style;
  var scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth);

  if (scrollbarWidth > 0) {
    var currentPaddingRight = parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
    bodyStyle.setProperty('padding-right', (currentPaddingRight + scrollbarWidth) + 'px', 'important');
  }
  bodyStyle.setProperty('overflow', 'hidden', 'important');

  return previousState;
}

function restoreBodyScroll(previousState) {
  if (!previousState) return;
  var bodyStyle = document.body.style;
  restoreStyleProperty(bodyStyle, 'overflow', previousState.overflow, previousState.overflowPriority);
  restoreStyleProperty(bodyStyle, 'padding-right', previousState.paddingRight, previousState.paddingRightPriority);
}

function createModalHistoryEntry() {
  var entry = {
    id: 'ikr-modal-' + Date.now() + '-' + Math.random().toString(36).slice(2),
    previousState: null,
    pushed: false,
    url: window.location.href,
  };

  try {
    entry.previousState = history.state;
    history.pushState({ ikrModal: entry.id }, '', entry.url);
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
    history.state.ikrModal === entry.id
  );
}

function restoreModalHistoryEntry(entry) {
  if (!isCurrentModalHistoryEntry(entry)) return;
  try {
    history.replaceState(entry.previousState, '', entry.url);
  } catch (_) {}
}

function closeModal(overlay, onKeyDown, onPopState, bodyScrollState) {
  restoreBodyScroll(bodyScrollState);
  document.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('popstate', onPopState);
  if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
}

function buildRight(r) {
  var right = document.createElement('div');
  right.className = 'ikr-modal-right';

  var scrollContent = document.createElement('div');
  scrollContent.className = 'ikr-modal-scroll-content';

  var topRow = document.createElement('div');
  topRow.className = 'ikr-modal-top-row';

  var starsEl = document.createElement('div');
  starsEl.className = 'ikr-modal-stars';
  starsEl.innerHTML = starsHTML(r.rating, currentSettings);

  var dateEl = document.createElement('span');
  dateEl.className = 'ikr-modal-date';
  dateEl.textContent = formatDate(r.createdAt);

  topRow.appendChild(starsEl);
  topRow.appendChild(dateEl);
  scrollContent.appendChild(topRow);

  var titleEl = document.createElement('div');
  titleEl.className = 'ikr-modal-title';
  titleEl.textContent = r.title || '';
  titleEl.style.display = r.title ? '' : 'none';
  scrollContent.appendChild(titleEl);

  var authorEl = document.createElement('div');
  authorEl.className = 'ikr-modal-author';
  authorEl.textContent = r.author || '';
  scrollContent.appendChild(authorEl);

  var bodyEl = document.createElement('div');
  bodyEl.className = 'ikr-modal-body';
  bodyEl.textContent = (r.comment || '').trim();
  bodyEl.style.display = (r.comment && r.comment.trim()) ? '' : 'none';
  scrollContent.appendChild(bodyEl);

  var replyEl = document.createElement('div');
  replyEl.className = 'ikr-modal-reply';
  var replyLabel = document.createElement('div');
  replyLabel.className = 'ikr-modal-reply-label';
  replyLabel.textContent = 'Mağaza Sahibi';
  var replyText = document.createElement('div');
  replyText.className = 'ikr-modal-reply-text';
  replyText.textContent = r.merchantReply || '';
  replyEl.appendChild(replyLabel);
  replyEl.appendChild(replyText);
  replyEl.style.display = r.merchantReply ? '' : 'none';
  scrollContent.appendChild(replyEl);

  right.appendChild(scrollContent);

  return right;
}

function updateRight(right, r) {
  var scrollContent = right.querySelector('.ikr-modal-scroll-content');
  scrollContent.querySelector('.ikr-modal-stars').innerHTML = starsHTML(r.rating, currentSettings);
  scrollContent.querySelector('.ikr-modal-date').textContent = formatDate(r.createdAt);

  var titleEl = scrollContent.querySelector('.ikr-modal-title');
  titleEl.textContent = r.title || '';
  titleEl.style.display = r.title ? '' : 'none';

  scrollContent.querySelector('.ikr-modal-author').textContent = r.author || '';

  var bodyEl = scrollContent.querySelector('.ikr-modal-body');
  bodyEl.textContent = (r.comment || '').trim();
  bodyEl.style.display = (r.comment && r.comment.trim()) ? '' : 'none';

  var replyEl = scrollContent.querySelector('.ikr-modal-reply');
  replyEl.querySelector('.ikr-modal-reply-text').textContent = r.merchantReply || '';
  replyEl.style.display = r.merchantReply ? '' : 'none';

  right.scrollTop = 0;
}

function buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, direction, overlay) {
  var images = getValidImages(r);
  var currentPhotoIdx = Math.max(0, Math.min(photoIdx || 0, images.length - 1));

  var left = document.createElement('div');
  left.className = 'ikr-modal-left';

  var mainImg = document.createElement('img');
  var animClass = direction === 'next' ? 'ikr-modal-img-enter-right' : direction === 'prev' ? 'ikr-modal-img-enter-left' : '';
  mainImg.className = 'ikr-modal-main-img' + (animClass ? ' ' + animClass : '');
  mainImg.src = optimizeImageUrl(images[currentPhotoIdx] || '');
  mainImg.decoding = 'async';
  mainImg.width = LIGHTBOX_MAIN_WIDTH;
  mainImg.height = Math.round(LIGHTBOX_MAIN_WIDTH * 4 / 3);
  mainImg.alt = 'Yorum fotoğrafı';
  left.appendChild(mainImg);

  var mobileClose = document.createElement('button');
  mobileClose.className = 'ikr-modal-close-mobile';
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
        rebuildModal(r, reviewIdx, currentPhotoIdx + 1, reviewsWithPhotos, modal, requestClose, true, 'next', overlay);
      } else if (hasNextReview) {
        var nextReview = reviewsWithPhotos[reviewIdx + 1];
        rebuildModal(nextReview, reviewIdx + 1, 0, reviewsWithPhotos, modal, requestClose, false, 'next', overlay);
      }
    } else {
      // sağa kaydır — önceki
      if (hasPrevPhoto) {
        rebuildModal(r, reviewIdx, currentPhotoIdx - 1, reviewsWithPhotos, modal, requestClose, true, 'prev', overlay);
      } else if (hasPrevReview) {
        var prevReview = reviewsWithPhotos[reviewIdx - 1];
        var prevImages = getValidImages(prevReview);
        rebuildModal(prevReview, reviewIdx - 1, prevImages.length - 1, reviewsWithPhotos, modal, requestClose, false, 'prev', overlay);
      }
    }
  }, { passive: true });


  if (images.length > 1) {
    var thumbBar = document.createElement('div');
    thumbBar.className = 'ikr-modal-thumbs';
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
      th.className = 'ikr-modal-thumb' + (i === currentPhotoIdx ? ' ikr-modal-thumb-active' : '');
      th.alt = 'Küçük resim ' + (i + 1);
      (function(idx) { th.onclick = function() { rebuildModal(r, reviewIdx, idx, reviewsWithPhotos, modal, requestClose, true, null, overlay); }; })(i);
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
    prevBtn.className = 'ikr-modal-nav ikr-modal-nav-prev';
    prevBtn.innerHTML = '&#8249;';
    prevBtn.setAttribute('aria-label', 'Önceki');
    prevBtn.onclick = function(e) {
      e.stopPropagation();
      if (hasPrevPhoto) {
        rebuildModal(r, reviewIdx, currentPhotoIdx - 1, reviewsWithPhotos, modal, requestClose, true, 'prev', overlay);
      } else if (hasPrevReview) {
        var prevReview = reviewsWithPhotos[reviewIdx - 1];
        var prevImages = getValidImages(prevReview);
        rebuildModal(prevReview, reviewIdx - 1, prevImages.length - 1, reviewsWithPhotos, modal, requestClose, false, 'prev', overlay);
      }
    };
    left.appendChild(prevBtn);
  }

  if (hasNext) {
    var nextBtn = document.createElement('button');
    nextBtn.className = 'ikr-modal-nav ikr-modal-nav-next';
    nextBtn.innerHTML = '&#8250;';
    nextBtn.setAttribute('aria-label', 'Sonraki');
    nextBtn.onclick = function(e) {
      e.stopPropagation();
      if (hasNextPhoto) {
        rebuildModal(r, reviewIdx, currentPhotoIdx + 1, reviewsWithPhotos, modal, requestClose, true, 'next', overlay);
      } else if (hasNextReview) {
        var nextReview = reviewsWithPhotos[reviewIdx + 1];
        rebuildModal(nextReview, reviewIdx + 1, 0, reviewsWithPhotos, modal, requestClose, false, 'next', overlay);
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

function rebuildModal(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, photoOnly, direction, overlay) {
  if (photoOnly) {
    var newLeft = buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, direction, overlay);
    if (modal.firstChild) modal.replaceChild(newLeft, modal.firstChild);
  } else {
    var newLeft = buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, direction, overlay);
    var existingRight = modal.querySelector('.ikr-modal-right');
    if (modal.firstChild) modal.replaceChild(newLeft, modal.firstChild);
    if (existingRight) {
      updateRight(existingRight, r);
    }
    // Mobilde scroll container ikr-modal-wrap — yorum değişince en üste al
    var wrap = overlay && overlay.querySelector('.ikr-modal-wrap');
    if (wrap) wrap.scrollTop = 0;
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
  overlay.className = 'ikr-modal-overlay';

  var modal = document.createElement('div');
  modal.className = 'ikr-modal';

  var closed = false;
  var bodyScrollState = lockBodyScroll();
  var modalHistoryEntry = createModalHistoryEntry();

  function onPopState() {
    if (closed) return;
    closed = true;
    closeModal(overlay, onKeyDown, onPopState, bodyScrollState);
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') requestClose();
  }

  function requestClose() {
    if (closed) return;
    closed = true;
    closeModal(overlay, onKeyDown, onPopState, bodyScrollState);
    restoreModalHistoryEntry(modalHistoryEntry);
  }

  document.addEventListener('keydown', onKeyDown);

  window.addEventListener('popstate', onPopState);

  overlay.onclick = function() { requestClose(); };
  modal.onclick = function(e) { e.stopPropagation(); };

  modal.appendChild(buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, null, overlay));
  modal.appendChild(buildRight(r));
  prefetchNeighbors(reviewIdx, reviewsWithPhotos);

  var modalWrap = document.createElement('div');
  modalWrap.className = 'ikr-modal-wrap';
  modalWrap.appendChild(modal);

  var closeBtn = document.createElement('button');
  closeBtn.className = 'ikr-modal-close';
  closeBtn.textContent = '✕';
  closeBtn.setAttribute('aria-label', 'Kapat');
  closeBtn.onclick = function(e) { e.stopPropagation(); requestClose(); };
  modalWrap.appendChild(closeBtn);
  overlay.appendChild(modalWrap);

  document.body.appendChild(overlay);
}

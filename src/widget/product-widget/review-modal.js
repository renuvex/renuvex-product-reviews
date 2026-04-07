// product-widget/review-modal.js — Fotoğraflı yorum detay modalı

import { starsHTML, formatDate } from '../core/helpers.js';

function closeModal(overlay, onKeyDown, onPopState) {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
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
  starsEl.innerHTML = starsHTML(r.rating, null);

  var dateEl = document.createElement('span');
  dateEl.className = 'ikr-modal-date';
  dateEl.textContent = formatDate(r.createdAt);

  topRow.appendChild(starsEl);
  topRow.appendChild(dateEl);
  scrollContent.appendChild(topRow);

  if (r.title) {
    var titleEl = document.createElement('div');
    titleEl.className = 'ikr-modal-title';
    titleEl.textContent = r.title;
    scrollContent.appendChild(titleEl);
  }

  var authorEl = document.createElement('div');
  authorEl.className = 'ikr-modal-author';
  authorEl.textContent = r.author || '';
  scrollContent.appendChild(authorEl);

  if (r.comment && r.comment.trim()) {
    var bodyEl = document.createElement('div');
    bodyEl.className = 'ikr-modal-body';
    bodyEl.textContent = r.comment.trim();
    scrollContent.appendChild(bodyEl);
  }

  if (r.merchantReply) {
    var replyEl = document.createElement('div');
    replyEl.className = 'ikr-modal-reply';
    replyEl.innerHTML =
      '<div class="ikr-modal-reply-label">Mağaza Sahibi</div>' +
      '<div class="ikr-modal-reply-text">' + r.merchantReply + '</div>';
    scrollContent.appendChild(replyEl);
  }

  right.appendChild(scrollContent);

  return right;
}

function buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, direction, overlay) {
  var images = (r.images && Array.isArray(r.images)) ? r.images.filter(function(u) { return u && u.indexOf('https://') === 0; }) : [];
  var currentPhotoIdx = Math.min(photoIdx, images.length - 1);

  var left = document.createElement('div');
  left.className = 'ikr-modal-left';

  var mainImg = document.createElement('img');
  var animClass = direction === 'next' ? 'ikr-modal-img-enter-right' : direction === 'prev' ? 'ikr-modal-img-enter-left' : '';
  mainImg.className = 'ikr-modal-main-img' + (animClass ? ' ' + animClass : '');
  mainImg.src = images[currentPhotoIdx] || '';
  mainImg.alt = 'Yorum fotoğrafı';
  left.appendChild(mainImg);

  var mobileClose = document.createElement('button');
  mobileClose.className = 'ikr-modal-close-mobile';
  mobileClose.textContent = '✕';
  mobileClose.setAttribute('aria-label', 'Kapat');
  mobileClose.onclick = function(e) { e.stopPropagation(); requestClose(); };
  left.appendChild(mobileClose);

  if (images.length > 1) {
    var thumbBar = document.createElement('div');
    thumbBar.className = 'ikr-modal-thumbs';
    images.forEach(function(url, i) {
      var th = document.createElement('img');
      th.src = url;
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

  if (hasPrev || hasNext) {
    var prevBtn = document.createElement('button');
    prevBtn.className = 'ikr-modal-nav ikr-modal-nav-prev';
    prevBtn.innerHTML = '&#8249;';
    prevBtn.setAttribute('aria-label', 'Önceki');
    prevBtn.style.opacity = hasPrev ? '1' : '0.3';
    prevBtn.onclick = function(e) {
      e.stopPropagation();
      if (hasPrevPhoto) {
        rebuildModal(r, reviewIdx, currentPhotoIdx - 1, reviewsWithPhotos, modal, requestClose, true, 'prev', overlay);
      } else if (hasPrevReview) {
        var prevReview = reviewsWithPhotos[reviewIdx - 1];
        var prevImages = (prevReview.images || []).filter(function(u) { return u && u.indexOf('https://') === 0; });
        rebuildModal(prevReview, reviewIdx - 1, prevImages.length - 1, reviewsWithPhotos, modal, requestClose, false, 'prev', overlay);
      }
    };
    left.appendChild(prevBtn);

    var nextBtn = document.createElement('button');
    nextBtn.className = 'ikr-modal-nav ikr-modal-nav-next';
    nextBtn.innerHTML = '&#8250;';
    nextBtn.setAttribute('aria-label', 'Sonraki');
    nextBtn.style.opacity = hasNext ? '1' : '0.3';
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

function rebuildModal(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, photoOnly, direction, overlay) {
  if (photoOnly) {
    var newLeft = buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, direction, overlay);
    if (modal.firstChild) modal.replaceChild(newLeft, modal.firstChild);
  } else {
    var newLeft = buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, direction, overlay);
    var newRight = buildRight(r);
    modal.innerHTML = '';
    modal.appendChild(newLeft);
    modal.appendChild(newRight);
    // Mobilde scroll container ikr-modal-wrap — yorum değişince en üste al
    var wrap = overlay && overlay.querySelector('.ikr-modal-wrap');
    if (wrap) wrap.scrollTop = 0;
  }
}

export function openReviewModal(r, clickedUrl, allReviews) {
  var reviewsWithPhotos = (allReviews || []).filter(function(rv) {
    return rv.images && Array.isArray(rv.images) && rv.images.some(function(u) { return u && u.indexOf('https://') === 0; });
  });

  var reviewIdx = reviewsWithPhotos.findIndex(function(rv) { return rv === r || rv.id === r.id; });
  if (reviewIdx === -1) reviewIdx = 0;

  var images = (r.images && Array.isArray(r.images)) ? r.images.filter(function(u) { return u && u.indexOf('https://') === 0; }) : [];
  var photoIdx = Math.max(0, images.indexOf(clickedUrl));

  var overlay = document.createElement('div');
  overlay.className = 'ikr-modal-overlay';

  var modal = document.createElement('div');
  modal.className = 'ikr-modal';

  var closed = false;

  function onPopState() {
    if (closed) return;
    closed = true;
    closeModal(overlay, onKeyDown, onPopState);
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') requestClose();
  }

  function requestClose() {
    if (closed) return;
    closed = true;
    // Sahte state'i temizle, sonra modalı kapat
    history.go(-1);
    closeModal(overlay, onKeyDown, onPopState);
  }

  document.addEventListener('keydown', onKeyDown);

  // Sahte geçmiş adımı — swipe-back/geri butonu bu adımı tüketir, popstate tetiklenir
  var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = scrollbarWidth + 'px';
  document.body.style.overflow = 'hidden';
  history.pushState({ ikrModal: true }, '');
  window.addEventListener('popstate', onPopState);

  overlay.onclick = function() { requestClose(); };
  modal.onclick = function(e) { e.stopPropagation(); };

  modal.appendChild(buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, null, overlay));
  modal.appendChild(buildRight(r));

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

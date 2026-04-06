// product-widget/review-modal.js — Fotoğraflı yorum detay modalı

import { starsHTML, formatDate } from '../core/helpers.js';

function closeModal(overlay, onKeyDown) {
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onKeyDown);
  if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
}

function buildRight(r, overlay, onKeyDown) {
  var right = document.createElement('div');
  right.className = 'ikr-modal-right';

  // Yıldız + tarih + X
  var topRow = document.createElement('div');
  topRow.className = 'ikr-modal-top-row';

  var starsEl = document.createElement('div');
  starsEl.className = 'ikr-modal-stars';
  starsEl.innerHTML = starsHTML(r.rating, null);

  var dateEl = document.createElement('span');
  dateEl.className = 'ikr-modal-date';
  dateEl.textContent = formatDate(r.createdAt);

  var closeBtn = document.createElement('button');
  closeBtn.className = 'ikr-modal-close';
  closeBtn.textContent = '✕';
  closeBtn.setAttribute('aria-label', 'Kapat');
  closeBtn.onclick = function(e) { e.stopPropagation(); closeModal(overlay, onKeyDown); };

  topRow.appendChild(starsEl);
  topRow.appendChild(dateEl);
  topRow.appendChild(closeBtn);
  right.appendChild(topRow);

  if (r.title) {
    var titleEl = document.createElement('div');
    titleEl.className = 'ikr-modal-title';
    titleEl.textContent = r.title;
    right.appendChild(titleEl);
  }

  var authorEl = document.createElement('div');
  authorEl.className = 'ikr-modal-author';
  authorEl.textContent = r.author || '';
  right.appendChild(authorEl);

  if (r.comment && r.comment.trim()) {
    var bodyEl = document.createElement('div');
    bodyEl.className = 'ikr-modal-body';
    bodyEl.textContent = r.comment.trim();
    right.appendChild(bodyEl);
  }

  if (r.merchantReply) {
    var replyEl = document.createElement('div');
    replyEl.className = 'ikr-modal-reply';
    replyEl.innerHTML =
      '<div class="ikr-modal-reply-label">Mağaza Sahibi</div>' +
      '<div class="ikr-modal-reply-text">' + r.merchantReply + '</div>';
    right.appendChild(replyEl);
  }

  return right;
}

function buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, overlay, onKeyDown) {
  var images = (r.images && Array.isArray(r.images)) ? r.images.filter(function(u) { return u && u.indexOf('https://') === 0; }) : [];
  var currentPhotoIdx = Math.min(photoIdx, images.length - 1);

  var left = document.createElement('div');
  left.className = 'ikr-modal-left';

  var mainImg = document.createElement('img');
  mainImg.className = 'ikr-modal-main-img';
  mainImg.src = images[currentPhotoIdx] || '';
  mainImg.alt = 'Yorum fotoğrafı';
  left.appendChild(mainImg);

  if (images.length > 1) {
    var thumbBar = document.createElement('div');
    thumbBar.className = 'ikr-modal-thumbs';
    images.forEach(function(url, i) {
      var th = document.createElement('img');
      th.src = url;
      th.className = 'ikr-modal-thumb' + (i === currentPhotoIdx ? ' ikr-modal-thumb-active' : '');
      th.alt = 'Küçük resim ' + (i + 1);
      (function(idx) { th.onclick = function() { rebuildModal(r, reviewIdx, idx, reviewsWithPhotos, modal, overlay, onKeyDown); }; })(i);
      thumbBar.appendChild(th);
    });
    left.appendChild(thumbBar);
  }

  // Ok butonları — önce fotoğraflar arası, sonra yorumlar arası
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
        rebuildModal(r, reviewIdx, currentPhotoIdx - 1, reviewsWithPhotos, modal, overlay, onKeyDown);
      } else if (hasPrevReview) {
        var prevReview = reviewsWithPhotos[reviewIdx - 1];
        var prevImages = (prevReview.images || []).filter(function(u) { return u && u.indexOf('https://') === 0; });
        rebuildModal(prevReview, reviewIdx - 1, prevImages.length - 1, reviewsWithPhotos, modal, overlay, onKeyDown);
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
        rebuildModal(r, reviewIdx, currentPhotoIdx + 1, reviewsWithPhotos, modal, overlay, onKeyDown);
      } else if (hasNextReview) {
        var nextReview = reviewsWithPhotos[reviewIdx + 1];
        rebuildModal(nextReview, reviewIdx + 1, 0, reviewsWithPhotos, modal, overlay, onKeyDown);
      }
    };
    left.appendChild(nextBtn);
  }

  return left;
}

function rebuildModal(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, overlay, onKeyDown) {
  var newLeft = buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, overlay, onKeyDown);
  var newRight = buildRight(r, overlay, onKeyDown);
  modal.innerHTML = '';
  modal.appendChild(newLeft);
  modal.appendChild(newRight);
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

  function onKeyDown(e) {
    if (e.key === 'Escape') closeModal(overlay, onKeyDown);
  }
  document.addEventListener('keydown', onKeyDown);

  overlay.onclick = function() { closeModal(overlay, onKeyDown); };
  modal.onclick = function(e) { e.stopPropagation(); };

  modal.appendChild(buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, overlay, onKeyDown));
  modal.appendChild(buildRight(r, overlay, onKeyDown));
  overlay.appendChild(modal);

  document.body.style.overflow = 'hidden';
  document.body.appendChild(overlay);
}

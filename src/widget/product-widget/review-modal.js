// product-widget/review-modal.js — Fotoğraflı yorum detay modalı

import { starsHTML, formatDate } from '../core/helpers.js';

function closeModal(overlay, onKeyDown) {
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onKeyDown);
  if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
}

export function openReviewModal(r, clickedUrl) {
  var images = (r.images && Array.isArray(r.images)) ? r.images.filter(function(u) { return u && u.indexOf('https://') === 0; }) : [];
  var currentIdx = Math.max(0, images.indexOf(clickedUrl));

  var overlay = document.createElement('div');
  overlay.className = 'ikr-modal-overlay';

  var modal = document.createElement('div');
  modal.className = 'ikr-modal';

  // ── Sol: fotoğraf alanı ──
  var left = document.createElement('div');
  left.className = 'ikr-modal-left';

  var mainImg = document.createElement('img');
  mainImg.className = 'ikr-modal-main-img';
  mainImg.src = images[currentIdx] || '';
  mainImg.alt = 'Yorum fotoğrafı';
  left.appendChild(mainImg);

  // X butonu — fotoğrafın sağ üstünde
  var closeBtn = document.createElement('button');
  closeBtn.className = 'ikr-modal-close';
  closeBtn.textContent = '✕';
  closeBtn.setAttribute('aria-label', 'Kapat');
  closeBtn.onclick = function(e) { e.stopPropagation(); closeModal(overlay, onKeyDown); };
  left.appendChild(closeBtn);

  // Thumbnail + ok butonları (birden fazla fotoğraf varsa)
  var thumbEls = [];
  if (images.length > 1) {
    var thumbBar = document.createElement('div');
    thumbBar.className = 'ikr-modal-thumbs';
    images.forEach(function(url, i) {
      var th = document.createElement('img');
      th.src = url;
      th.className = 'ikr-modal-thumb' + (i === currentIdx ? ' ikr-modal-thumb-active' : '');
      th.alt = 'Küçük resim ' + (i + 1);
      th.onclick = function() { setActive(i); };
      thumbBar.appendChild(th);
      thumbEls.push(th);
    });
    left.appendChild(thumbBar);

    var prevBtn = document.createElement('button');
    prevBtn.className = 'ikr-modal-nav ikr-modal-nav-prev';
    prevBtn.innerHTML = '&#8249;';
    prevBtn.setAttribute('aria-label', 'Önceki fotoğraf');
    prevBtn.onclick = function(e) { e.stopPropagation(); setActive((currentIdx - 1 + images.length) % images.length); };
    left.appendChild(prevBtn);

    var nextBtn = document.createElement('button');
    nextBtn.className = 'ikr-modal-nav ikr-modal-nav-next';
    nextBtn.innerHTML = '&#8250;';
    nextBtn.setAttribute('aria-label', 'Sonraki fotoğraf');
    nextBtn.onclick = function(e) { e.stopPropagation(); setActive((currentIdx + 1) % images.length); };
    left.appendChild(nextBtn);
  }

  function setActive(idx) {
    currentIdx = idx;
    mainImg.src = images[idx];
    thumbEls.forEach(function(th, i) {
      th.classList.toggle('ikr-modal-thumb-active', i === idx);
    });
  }

  // ── Sağ: yorum detayı ──
  var right = document.createElement('div');
  right.className = 'ikr-modal-right';

  // Yıldız + tarih yan yana
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
  right.appendChild(topRow);

  // Başlık
  if (r.title) {
    var titleEl = document.createElement('div');
    titleEl.className = 'ikr-modal-title';
    titleEl.textContent = r.title;
    right.appendChild(titleEl);
  }

  // İsim
  var authorEl = document.createElement('div');
  authorEl.className = 'ikr-modal-author';
  authorEl.textContent = r.author || '';
  right.appendChild(authorEl);

  // Yorum metni
  if (r.comment && r.comment.trim()) {
    var bodyEl = document.createElement('div');
    bodyEl.className = 'ikr-modal-body';
    bodyEl.textContent = r.comment.trim();
    right.appendChild(bodyEl);
  }

  // Mağaza yanıtı
  if (r.merchantReply) {
    var replyEl = document.createElement('div');
    replyEl.className = 'ikr-modal-reply';
    replyEl.innerHTML =
      '<div class="ikr-modal-reply-label">Mağaza Sahibi</div>' +
      '<div class="ikr-modal-reply-text">' + r.merchantReply + '</div>';
    right.appendChild(replyEl);
  }

  modal.appendChild(left);
  modal.appendChild(right);
  overlay.appendChild(modal);

  // ESC ile kapat
  function onKeyDown(e) {
    if (e.key === 'Escape') closeModal(overlay, onKeyDown);
  }
  document.addEventListener('keydown', onKeyDown);

  overlay.onclick = function() { closeModal(overlay, onKeyDown); };
  modal.onclick = function(e) { e.stopPropagation(); };

  document.body.style.overflow = 'hidden';
  document.body.appendChild(overlay);
}

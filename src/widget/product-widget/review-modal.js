// product-widget/review-modal.js — Fotoğraflı yorum detay modalı

import { starsHTML, formatDate } from '../core/helpers.js';

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

  // Thumbnail bar (birden fazla fotoğraf varsa)
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

    // Ok butonları
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

  // Kapat butonu
  var closeBtn = document.createElement('button');
  closeBtn.className = 'ikr-modal-close';
  closeBtn.textContent = '✕';
  closeBtn.setAttribute('aria-label', 'Kapat');
  closeBtn.onclick = function(e) { e.stopPropagation(); document.body.removeChild(overlay); };
  right.appendChild(closeBtn);

  // Meta: avatar + isim + tarih
  var meta = document.createElement('div');
  meta.className = 'ikr-modal-meta';

  var avatar = document.createElement('div');
  avatar.className = 'ikr-modal-avatar';
  avatar.textContent = (r.author || '?').charAt(0).toUpperCase();

  var authorEl = document.createElement('span');
  authorEl.className = 'ikr-modal-author';
  authorEl.textContent = r.author || '';

  var dateEl = document.createElement('span');
  dateEl.className = 'ikr-modal-date';
  dateEl.textContent = formatDate(r.createdAt);

  meta.appendChild(avatar);
  meta.appendChild(authorEl);
  meta.appendChild(dateEl);
  right.appendChild(meta);

  // Yıldızlar
  var starsEl = document.createElement('div');
  starsEl.className = 'ikr-modal-stars';
  starsEl.innerHTML = starsHTML(r.rating, null);
  right.appendChild(starsEl);

  // Başlık
  if (r.title) {
    var titleEl = document.createElement('div');
    titleEl.className = 'ikr-modal-title';
    titleEl.textContent = r.title;
    right.appendChild(titleEl);
  }

  // Yorum metni (tam, clamp yok)
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

  // Overlay'e tıklanınca kapat
  overlay.onclick = function() { document.body.removeChild(overlay); };
  modal.onclick = function(e) { e.stopPropagation(); };

  // ESC ile kapat
  function onKeyDown(e) {
    if (e.key === 'Escape') { document.body.removeChild(overlay); document.removeEventListener('keydown', onKeyDown); }
  }
  document.addEventListener('keydown', onKeyDown);

  document.body.appendChild(overlay);
}

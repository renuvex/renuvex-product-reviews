// product-widget/review-item.js — Tek bir yorum DOM elementini oluşturur

import { starsHTML, formatDate } from '../core/helpers.js';
import { openReviewModal } from './review-modal.js';


export function buildReviewEl(r, allReviews) {
  var reviewEl = document.createElement('div');
  reviewEl.className = 'ikr-review';

  // Satır 1: yıldız + başlık | tarih (sağda)
  var topRow = document.createElement('div');
  topRow.className = 'ikr-review-top';

  var leftTop = document.createElement('div');
  leftTop.className = 'ikr-review-top-left';
  leftTop.innerHTML = starsHTML(r.rating, null) + (r.title ? '<span class="ikr-review-title">' + r.title + '</span>' : '');

  var dateEl = document.createElement('span');
  dateEl.className = 'ikr-date';
  dateEl.textContent = formatDate(r.createdAt);

  topRow.appendChild(leftTop);
  topRow.appendChild(dateEl);
  reviewEl.appendChild(topRow);

  // Satır 2: yazar adı
  var authorEl = document.createElement('div');
  authorEl.className = 'ikr-author';
  authorEl.textContent = r.author || '';
  reviewEl.appendChild(authorEl);

  // Yorum metni — 4 satırdan uzunsa CSS line-clamp ile kısalt
  var comment = (r.comment || '').trim();
  if (comment) {
    var body = document.createElement('div');
    body.className = 'ikr-body ikr-body-clamped';
    body.textContent = comment;
    reviewEl.appendChild(body);

    var readMore = document.createElement('span');
    readMore.className = 'ikr-read-more';
    readMore.textContent = 'Devamını oku';
    readMore.style.display = 'none';
    reviewEl.appendChild(readMore);

    // Tarayıcı clamp uyguladı mı kontrol et
    requestAnimationFrame(function() {
      if (body.scrollHeight > body.clientHeight + 2) {
        readMore.style.display = 'inline';
        var expanded = false;
        readMore.onclick = function() {
          expanded = !expanded;
          body.classList.toggle('ikr-body-clamped', !expanded);
          readMore.textContent = expanded ? 'Daha az göster' : 'Devamını oku';
        };
      }
    });
  }

  // Fotoğraflar
  if (r.images && Array.isArray(r.images) && r.images.length) {
    var gallery = document.createElement('div');
    gallery.className = 'ikr-gallery';
    r.images.forEach(function(imgUrl) {
      if (!imgUrl || imgUrl.indexOf('https://') !== 0) return;
      var imgEl = document.createElement('img');
      imgEl.src = imgUrl;
      imgEl.className = 'ikr-img';
      imgEl.setAttribute('data-ikr-img-url', imgUrl);
      (function(url) {
        imgEl.onclick = function() { openReviewModal(r, url, allReviews); };
      })(imgUrl);
      gallery.appendChild(imgEl);
    });
    reviewEl.appendChild(gallery);
  }

  // Mağaza yanıtı
  if (r.merchantReply) {
    var replyEl = document.createElement('div');
    replyEl.className = 'ikr-reply';
    replyEl.innerHTML =
      '<div class="ikr-reply-header"><span class="ikr-reply-label">Mağaza Sahibi</span></div>' +
      '<div class="ikr-reply-text">' + r.merchantReply + '</div>';
    reviewEl.appendChild(replyEl);
  }

  return reviewEl;
}

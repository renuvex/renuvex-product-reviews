// product-widget/review-item.js — Tek bir yorum DOM elementini oluşturur

import { starsHTML, formatDate } from '../core/helpers.js';

var MAX_LINES = 4; // "Devamını oku" için max satır

export function buildReviewEl(r) {
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

  // Yorum metni — uzunsa kısalt
  var comment = (r.comment || '').trim();
  if (comment) {
    var body = document.createElement('div');
    body.className = 'ikr-body';
    var textNode = document.createElement('span');
    textNode.textContent = comment;
    body.appendChild(textNode);

    // "Devamını oku" — render sonrası satır sayısı kontrol edilir
    var readMore = document.createElement('span');
    readMore.className = 'ikr-read-more';
    readMore.textContent = ' Devamını oku';
    readMore.style.display = 'none';
    body.appendChild(readMore);

    reviewEl.appendChild(body);

    // Satır taşması kontrolü
    requestAnimationFrame(function() {
      var lineHeight = parseInt(window.getComputedStyle(body).lineHeight) || 22;
      var maxHeight = lineHeight * MAX_LINES;
      if (body.scrollHeight > maxHeight + 4) {
        body.style.maxHeight = maxHeight + 'px';
        body.style.overflow = 'hidden';
        readMore.style.display = 'inline';
        var expanded = false;
        readMore.onclick = function() {
          expanded = !expanded;
          body.style.maxHeight = expanded ? 'none' : maxHeight + 'px';
          readMore.textContent = expanded ? ' Daha az göster' : ' Devamını oku';
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

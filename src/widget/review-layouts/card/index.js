// review-layouts/card/index.js
// Varsayılan "Kart" tasarımı — eski review-item.js içeriği bu layout'a taşındı.
// DOM yapısı: yıldız+başlık | tarih → yazar → metin (clamp) → fotoğraf → mağaza yanıtı.
// CSS .ikr-review* sınıfları base styles.js'te; layout-spesifik override yok.

import { starsHTML, formatDate, optimizeImageUrl } from '../../core/helpers.js';
import { openReviewModal } from '../../product-widget/review-modal.js';
import { currentSettings } from '../../core/state.js';

export var meta = {
  id: 'card',
  name: 'Kart (Varsayılan)',
};

// Layout-spesifik CSS yok — base styles.js (.ikr-review*) zaten card tasarımını veriyor.
// İleride card için override gerekirse styles.js eklenir ve burada export edilir.
export var css = '';

export function render(r, allReviews) {
  var reviewEl = document.createElement('div');
  reviewEl.className = 'ikr-review ikr-review-card';

  // Satır 1: yıldız + başlık | tarih (sağda)
  var topRow = document.createElement('div');
  topRow.className = 'ikr-review-top';

  var leftTop = document.createElement('div');
  leftTop.className = 'ikr-review-top-left';
  var starsSpan = document.createElement('span');
  starsSpan.className = 'ikr-review-stars';
  starsSpan.innerHTML = starsHTML(r.rating, currentSettings);
  leftTop.appendChild(starsSpan);
  if (r.title) {
    var titleSpan = document.createElement('span');
    titleSpan.className = 'ikr-review-title';
    titleSpan.textContent = r.title;
    leftTop.appendChild(titleSpan);
  }

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
      if (!imgUrl || (imgUrl.indexOf('https://') !== 0 && imgUrl.indexOf('data:image/') !== 0)) return;
      var imgEl = document.createElement('img');
      imgEl.src = optimizeImageUrl(imgUrl);
      imgEl.className = 'ikr-img';
      imgEl.setAttribute('data-ikr-img-url', imgUrl);
      (function(url) {
        imgEl.onclick = function() { openReviewModal(r, url, allReviews); };
      })(imgUrl);
      gallery.appendChild(imgEl);
    });
    reviewEl.appendChild(gallery);
  }

  // Mağaza yanıtı — gallery'den sonra
  if (r.merchantReply) {
    var replyEl = document.createElement('div');
    replyEl.className = 'ikr-reply';
    var replyHeader = document.createElement('div');
    replyHeader.className = 'ikr-reply-header';
    var replyLabel = document.createElement('span');
    replyLabel.className = 'ikr-reply-label';
    replyLabel.textContent = 'Mağaza Sahibi';
    replyHeader.appendChild(replyLabel);
    var replyText = document.createElement('div');
    replyText.className = 'ikr-reply-text';
    replyText.textContent = r.merchantReply;
    replyEl.appendChild(replyHeader);
    replyEl.appendChild(replyText);
    reviewEl.appendChild(replyEl);
  }

  return reviewEl;
}

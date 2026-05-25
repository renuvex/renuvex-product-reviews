// review-layouts/card/index.js
// Varsayılan "Kart" tasarımı — eski review-item.js içeriği bu layout'a taşındı.
// DOM yapısı: yıldız | tarih → başlık → yazar → metin (clamp) → fotoğraf → mağaza yanıtı.
// Sıralama gallery layout'u ile aynı (endüstri standardı: rating → title → author → body).
// CSS .renuvex-pr-review* sınıfları base styles.js'te; layout-spesifik override yok.

import { starsHTML, formatDate, getTrustedReviewImages, PHOTO_STRIP_THUMB_WIDTH, buildResponsiveImgAttrs, hideOnImageError } from '../../core/helpers.js';
import { openReviewModal } from '../../product-widget/review-modal.js';
import { currentSettings } from '../../core/state.js';
import { buildReplyEl } from '../_shared.js';

export var meta = {
  id: 'card',
  name: 'Kart (Varsayılan)',
  // Kart içi fotoğraflar genel boyut ayarıyla orantılı büyür (--renuvex-pr-card-photo-w).
  // Thumbnail boyutu kontrolü yalnızca fotoğraf şeridini (photo strip) etkiler.
  sizeOverrides: {
    small:  { '--renuvex-pr-card-photo-w': '80px' },
    medium: { '--renuvex-pr-card-photo-w': '110px' },
    large:  { '--renuvex-pr-card-photo-w': '140px' },
  },
};

// Layout-spesifik CSS yok — base styles.js (.renuvex-pr-review*) zaten card tasarımını veriyor.
// İleride card için override gerekirse styles.js eklenir ve burada export edilir.
export var css = '';

export function render(r, allReviews) {
  var reviewEl = document.createElement('div');
  reviewEl.className = 'renuvex-pr-review renuvex-pr-review-card';

  // Satır 1: yıldız | tarih (sağda)
  var topRow = document.createElement('div');
  topRow.className = 'renuvex-pr-review-top';

  var leftTop = document.createElement('div');
  leftTop.className = 'renuvex-pr-review-top-left';
  var starsSpan = document.createElement('span');
  starsSpan.className = 'renuvex-pr-review-stars';
  starsSpan.innerHTML = starsHTML(r.rating, currentSettings);
  leftTop.appendChild(starsSpan);

  var dateEl = document.createElement('span');
  dateEl.className = 'renuvex-pr-date';
  dateEl.textContent = formatDate(r.createdAt);

  topRow.appendChild(leftTop);
  topRow.appendChild(dateEl);
  reviewEl.appendChild(topRow);

  // Satır 2: başlık (kendi satırında — gallery ile aynı sıralama)
  if (r.title) {
    var titleEl = document.createElement('div');
    titleEl.className = 'renuvex-pr-review-title';
    titleEl.textContent = r.title;
    reviewEl.appendChild(titleEl);
  }

  // Satır 3: yazar adı
  var authorEl = document.createElement('div');
  authorEl.className = 'renuvex-pr-author';
  authorEl.textContent = r.author || '';
  reviewEl.appendChild(authorEl);

  // Yorum metni — 4 satırdan uzunsa CSS line-clamp ile kısalt
  var comment = (r.comment || '').trim();
  if (comment) {
    var body = document.createElement('div');
    body.className = 'renuvex-pr-body renuvex-pr-body-clamped';
    body.textContent = comment;
    reviewEl.appendChild(body);

    var readMore = document.createElement('span');
    readMore.className = 'renuvex-pr-read-more';
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
          body.classList.toggle('renuvex-pr-body-clamped', !expanded);
          readMore.textContent = expanded ? 'Daha az göster' : 'Devamını oku';
        };
      }
    });
  }

  // Fotoğraflar
  var trustedImages = getTrustedReviewImages(r);
  if (trustedImages.length) {
    var gallery = document.createElement('div');
    gallery.className = 'renuvex-pr-gallery';
    trustedImages.forEach(function(imgUrl) {
      var imgEl = document.createElement('img');
      // Kart içi thumbnail 90-140 px gösterilir, 1:1 (styles.js:242 — .renuvex-pr-img).
      // srcset: 1x/2x retina yedeği. CLS rezervi için width===height (1:1).
      var cardAttrs = buildResponsiveImgAttrs(imgUrl, PHOTO_STRIP_THUMB_WIDTH);
      imgEl.src = cardAttrs.src;
      imgEl.srcset = cardAttrs.srcset;
      imgEl.loading = 'lazy';
      imgEl.decoding = 'async';
      imgEl.width = PHOTO_STRIP_THUMB_WIDTH;
      imgEl.height = PHOTO_STRIP_THUMB_WIDTH;
      imgEl.className = 'renuvex-pr-img';
      hideOnImageError(imgEl);
      imgEl.setAttribute('data-renuvex-img-url', imgUrl);
      (function(url) {
        imgEl.onclick = function() { openReviewModal(r, url, allReviews); };
      })(imgUrl);
      gallery.appendChild(imgEl);
    });
    reviewEl.appendChild(gallery);
  }

  // Mağaza yanıtı — gallery'den sonra
  var replyEl = buildReplyEl(r.merchantReply);
  if (replyEl) reviewEl.appendChild(replyEl);

  return reviewEl;
}

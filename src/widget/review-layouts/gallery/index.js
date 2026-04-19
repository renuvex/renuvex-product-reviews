// review-layouts/gallery/index.js — Loox tarzı masonry galeri.
// Item sırası: foto (varsa, üstte tam genişlik) → yazar → tarih → yıldız → başlık → metin → mağaza yanıtı.
// Foto yoksa item yine görünür. CSS columns ile masonry — JS'siz, sözleşme dokunulmaz.

import { starsHTML, formatDate, optimizeImageUrl } from '../../core/helpers.js';
import { openReviewModal } from '../../product-widget/review-modal.js';
import { currentSettings } from '../../core/state.js';
import { GALLERY_CSS } from './styles.js';

export var meta = {
  id: 'gallery',
  name: 'Galeri',
};

export var css = GALLERY_CSS;

export function render(r, allReviews) {
  var reviewEl = document.createElement('div');
  reviewEl.className = 'ikr-review-gallery';

  // Foto (ilk görsel) — varsa tam genişlik üstte
  if (r.images && Array.isArray(r.images) && r.images.length) {
    var firstImg = r.images[0];
    if (firstImg && (firstImg.indexOf('https://') === 0 || firstImg.indexOf('data:image/') === 0)) {
      var mediaWrap = document.createElement('div');
      mediaWrap.className = 'ikr-review-gallery-media';
      var imgEl = document.createElement('img');
      imgEl.src = optimizeImageUrl(firstImg);
      imgEl.loading = 'lazy';
      imgEl.setAttribute('data-ikr-img-url', firstImg);
      imgEl.onclick = function() { openReviewModal(r, firstImg, allReviews); };
      mediaWrap.appendChild(imgEl);
      reviewEl.appendChild(mediaWrap);
    }
  }

  // Yazar
  var authorEl = document.createElement('div');
  authorEl.className = 'ikr-review-gallery-author';
  authorEl.textContent = r.author || '';
  reviewEl.appendChild(authorEl);

  // Tarih
  var dateEl = document.createElement('div');
  dateEl.className = 'ikr-review-gallery-date';
  dateEl.textContent = formatDate(r.createdAt);
  reviewEl.appendChild(dateEl);

  // Yıldız
  var starsSpan = document.createElement('span');
  starsSpan.className = 'ikr-review-stars';
  starsSpan.innerHTML = starsHTML(r.rating, currentSettings);
  reviewEl.appendChild(starsSpan);

  // Başlık
  if (r.title) {
    var titleEl = document.createElement('div');
    titleEl.className = 'ikr-review-gallery-title';
    titleEl.textContent = r.title;
    reviewEl.appendChild(titleEl);
  }

  // Metin (clamp + devamını oku)
  var comment = (r.comment || '').trim();
  if (comment) {
    var body = document.createElement('div');
    body.className = 'ikr-review-gallery-body ikr-body-clamped';
    body.textContent = comment;
    reviewEl.appendChild(body);

    var readMore = document.createElement('span');
    readMore.className = 'ikr-read-more';
    readMore.textContent = 'Devamını oku';
    readMore.style.display = 'none';
    reviewEl.appendChild(readMore);

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

  // Mağaza yanıtı
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

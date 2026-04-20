// review-layouts/gallery/index.js — Loox tarzı 2-kolon galeri.
// Item içi sol-sağ split: solda içerik, sağda foto.
// Sol kolon dikey sıra: yıldız → title → yazar → tarih → metin → reply.
// (Card ile aynı sıralama — sadece görsel layout farklı: 2-kolon masonry + sağ foto.)
// Foto yoksa sol kolon tüm genişliği kullanır (no-media modifier).
// Mobile'da da aynı split korunur — foto asla metnin üstüne çıkmaz.
// Masonry için CSS columns parent'a (#ikas-reviews-widget) :has() ile uygulanır.

import { starsHTML, formatDate, optimizeImageUrl } from '../../core/helpers.js';
import { openReviewModal } from '../../product-widget/review-modal.js';
import { currentSettings } from '../../core/state.js';
import { GALLERY_CSS } from './styles.js';
import { buildReplyEl } from '../_shared.js';

export var meta = {
  id: 'gallery',
  name: 'Galeri',
  // Bkz: review-layouts/index.js — supports sözleşmesi.
  supports: { thumbnailSize: false },
};

export var css = GALLERY_CSS;

export function render(r, allReviews) {
  var hasMedia = !!(r.images && Array.isArray(r.images) && r.images.length &&
    r.images[0] && (r.images[0].indexOf('https://') === 0 || r.images[0].indexOf('data:image/') === 0));

  var reviewEl = document.createElement('div');
  reviewEl.className = 'ikr-review-gallery' + (hasMedia ? '' : ' ikr-review-gallery--no-media');

  // ─── Sol: içerik ───
  var content = document.createElement('div');
  content.className = 'ikr-review-gallery-content';

  // 1) Yıldız
  var starsSpan = document.createElement('span');
  starsSpan.className = 'ikr-review-stars ikr-review-gallery-stars';
  starsSpan.innerHTML = starsHTML(r.rating, currentSettings);
  content.appendChild(starsSpan);

  // 2) Başlık
  if (r.title) {
    var titleEl = document.createElement('div');
    titleEl.className = 'ikr-review-gallery-title';
    titleEl.textContent = r.title;
    content.appendChild(titleEl);
  }

  // 3) Yazar
  var authorEl = document.createElement('div');
  authorEl.className = 'ikr-review-gallery-author';
  authorEl.textContent = r.author || '';
  content.appendChild(authorEl);

  // 4) Tarih
  var dateEl = document.createElement('div');
  dateEl.className = 'ikr-review-gallery-date';
  dateEl.textContent = formatDate(r.createdAt);
  content.appendChild(dateEl);

  // Metin (clamp + devamını oku)
  var comment = (r.comment || '').trim();
  if (comment) {
    var body = document.createElement('div');
    body.className = 'ikr-review-gallery-body ikr-body-clamped';
    body.textContent = comment;
    content.appendChild(body);

    // Galeri'de inline expand masonry kolon dengesini bozar — onun yerine
    // tıklayınca review modal açılır (foto + tam metin + diğer fotolar + yanıt).
    // Loox/Judge.me/Yotpo standardı.
    var readMore = document.createElement('span');
    readMore.className = 'ikr-read-more';
    readMore.textContent = 'Devamını oku';
    readMore.style.display = 'none';
    readMore.style.cursor = 'pointer';
    readMore.onclick = function() {
      var firstImg = (r.images && Array.isArray(r.images) && r.images.length) ? r.images[0] : null;
      openReviewModal(r, firstImg, allReviews);
    };
    content.appendChild(readMore);

    requestAnimationFrame(function() {
      if (body.scrollHeight > body.clientHeight + 2) {
        readMore.style.display = 'inline';
      }
    });
  }

  reviewEl.appendChild(content);

  // ─── Sağ: foto (ilk görsel) ───
  if (hasMedia) {
    var firstImg = r.images[0];
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

  // Mağaza yanıtı — full-width, foto+metin altında ayrı satırda.
  // Sol kolonda (340px body) sıkışıyordu, sağda da foto altı boş kalıyordu.
  // "Devamını oku" → modal açar (müşteri yorumuyla tutarlı; galeri'de inline
  // expand masonry kolon dengesini bozar).
  var replyEl = buildReplyEl(r.merchantReply, function() {
    var firstImg = (r.images && Array.isArray(r.images) && r.images.length) ? r.images[0] : null;
    openReviewModal(r, firstImg, allReviews);
  });
  if (replyEl) {
    replyEl.classList.add('ikr-review-gallery-reply');
    reviewEl.appendChild(replyEl);
  }

  return reviewEl;
}

// review-layouts/list/index.js — Liste tasarımı (Modern magazine tarzı).
// 3-kolon grid: yazar | yıldız+başlık+metin+tarih | foto.
// Fotoğraf yoksa orta kolon foto kolonunu kapsar (no-media modifier).
// Mobile (<600px) dikey diziliş — styles.js'te tanımlı.

import { starsHTML, formatDate, getTrustedReviewImages, PHOTO_STRIP_THUMB_WIDTH, buildResponsiveImgAttrs, hideOnImageError } from '../../core/helpers.js';
import { openReviewModal } from '../../reviews-section/review-modal.js';
import { wireLightboxTrigger } from '../../reviews-section/lightbox-trigger.js';
import { currentSettings } from '../../core/state.js';
import { LIST_CSS } from './styles.js';
import { buildReplyEl, buildClampedBody } from '../_shared.js';

export var meta = {
  id: 'list',
  name: 'Liste',
  // Bkz: review-layouts/index.js — supports sözleşmesi.
  supports: {},
  // Review item photo column scales with the general widget size. The top
  // "Fotoğraflı Yorumlar" strip is a separate gallery surface and follows
  // thumbnailSize through --renuvex-pr-thumbnail-size.
  // --renuvex-pr-list-photo-w        : desktop sağ kolon foto genişliği (3:4 portre)
  // --renuvex-pr-list-photo-w-mobile : mobile, metin altına düşen foto genişliği (3:4 portre)
  sizeOverrides: {
    small:  { '--renuvex-pr-list-photo-w':  '80px', '--renuvex-pr-list-photo-w-mobile':  '80px' },
    medium: { '--renuvex-pr-list-photo-w': '110px', '--renuvex-pr-list-photo-w-mobile': '100px' },
    large:  { '--renuvex-pr-list-photo-w': '140px', '--renuvex-pr-list-photo-w-mobile': '110px' },
  },
};

export var css = LIST_CSS;

export function render(r, allReviews) {
  var trustedImages = getTrustedReviewImages(r);
  var hasMedia = trustedImages.length > 0;

  var reviewEl = document.createElement('article');
  reviewEl.className = 'renuvex-pr-review-list' + (hasMedia ? '' : ' renuvex-pr-review-list--no-media');

  // ─── Sol kolon: imza grubu (yıldız → yazar → tarih) ───
  // Yazar tek başına sol kolonda izole görünüyordu; yıldız + tarih ile
  // birlikte gruplanınca "kim, kaç yıldız, ne zaman" tek bakışta okunur.
  // Endüstri standardı: Trustpilot, Amazon, Çiçeksepeti.
  var authorCol = document.createElement('div');
  authorCol.className = 'renuvex-pr-review-list-author';

  var starsSpan = document.createElement('span');
  starsSpan.className = 'renuvex-pr-review-stars renuvex-pr-review-list-author-stars';
  starsSpan.innerHTML = starsHTML(r.rating, currentSettings);
  authorCol.appendChild(starsSpan);

  var authorName = document.createElement('span');
  authorName.className = 'renuvex-pr-review-list-author-name';
  authorName.textContent = r.author || '';
  authorCol.appendChild(authorName);

  var dateEl = document.createElement('time');
  dateEl.className = 'renuvex-pr-date renuvex-pr-review-list-author-date';
  if (r.createdAt) dateEl.setAttribute('datetime', r.createdAt);
  dateEl.textContent = formatDate(r.createdAt);
  authorCol.appendChild(dateEl);

  reviewEl.appendChild(authorCol);

  // ─── Orta kolon: içerik (title → body → reply) ───
  var contentCol = document.createElement('div');
  contentCol.className = 'renuvex-pr-review-list-content';

  if (r.title) {
    var titleEl = document.createElement('div');
    titleEl.className = 'renuvex-pr-review-list-title';
    titleEl.textContent = r.title;
    contentCol.appendChild(titleEl);
  }

  var comment = (r.comment || '').trim();
  if (comment) {
    contentCol.appendChild(buildClampedBody(comment, 'renuvex-pr-review-list-body').fragment);
  }

  // Mağaza yanıtı orta kolonun altında
  var replyEl = buildReplyEl(r.merchantReply);
  if (replyEl) contentCol.appendChild(replyEl);

  reviewEl.appendChild(contentCol);

  // ─── Sağ kolon: foto ───
  // Desktop: sadece ilk foto (sağ kolon, sabit kare layout).
  // Mobile: tüm fotolar yatay strip (CSS overflow-x:auto). DOM'a tüm
  // fotoları koyup mobile'da görünür kılıyoruz; desktop'ta CSS ilk fotodan
  // sonrakileri gizliyor (display:none).
  if (hasMedia) {
    var mediaCol = document.createElement('div');
    mediaCol.className = 'renuvex-pr-review-list-media';
    trustedImages.forEach(function(imgUrl) {
      var imgEl = document.createElement('img');
      // Liste sağ kolonu ~90 px, mobile yatay strip aspect 3:4 (styles.js:90).
      // srcset: 1x/2x retina yedeği. width/height 3:4 oranına uyumlu.
      var listAttrs = buildResponsiveImgAttrs(imgUrl, PHOTO_STRIP_THUMB_WIDTH);
      imgEl.src = listAttrs.src;
      imgEl.srcset = listAttrs.srcset;
      imgEl.loading = 'lazy';
      imgEl.decoding = 'async';
      imgEl.width = PHOTO_STRIP_THUMB_WIDTH;
      imgEl.height = Math.round(PHOTO_STRIP_THUMB_WIDTH * 4 / 3);
      imgEl.setAttribute('data-renuvex-img-url', imgUrl);
      hideOnImageError(imgEl);
      (function(url) {
        wireLightboxTrigger(imgEl, function() { openReviewModal(r, url, allReviews); });
      })(imgUrl);
      mediaCol.appendChild(imgEl);
    });
    reviewEl.appendChild(mediaCol);
  }

  return reviewEl;
}

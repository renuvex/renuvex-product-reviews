// review-layouts/list/index.js — Liste tasarımı (Modern magazine tarzı).
// 3-kolon grid: yazar | yıldız+başlık+metin+tarih | foto.
// Fotoğraf yoksa orta kolon foto kolonunu kapsar (no-media modifier).
// Mobile (<600px) dikey diziliş — styles.js'te tanımlı.

import { starsHTML, formatDate, REVIEW_MEDIA_THUMB_WIDTH } from '../../core/helpers.js';
import { getTrustedReviewMedia } from '../../core/review-media.js';
import { openReviewModal } from '../../reviews-section/review-modal.js';
import { createMediaThumbnail } from '../../reviews-section/media-thumbnail.js';
import { currentSettings } from '../../core/state.js';
import { LIST_CSS } from './styles.js';
import { buildReplyEl, buildClampedBody } from '../_shared.js';

export var meta = {
  id: 'list',
  name: 'Liste',
  // Bkz: review-layouts/index.js — supports sözleşmesi.
  supports: {},
  // Review item photo column scales with the general widget size. The top
  // Media gallery is a separate gallery surface and follows
  // thumbnailSize through --renuvex-pr-thumbnail-size.
  // --renuvex-pr-list-photo-w / h        : desktop sağ kolon foto kutusu (3:4 portre)
  // --renuvex-pr-list-photo-w / h-mobile : mobile, metin altına düşen foto kutusu (3:4 portre)
  sizeOverrides: {
    small:  { '--renuvex-pr-list-photo-w':  '80px', '--renuvex-pr-list-photo-h': '106.67px', '--renuvex-pr-list-photo-w-mobile':  '80px', '--renuvex-pr-list-photo-h-mobile': '106.67px' },
    medium: { '--renuvex-pr-list-photo-w': '110px', '--renuvex-pr-list-photo-h': '146.67px', '--renuvex-pr-list-photo-w-mobile': '100px', '--renuvex-pr-list-photo-h-mobile': '133.33px' },
    large:  { '--renuvex-pr-list-photo-w': '140px', '--renuvex-pr-list-photo-h': '186.67px', '--renuvex-pr-list-photo-w-mobile': '110px', '--renuvex-pr-list-photo-h-mobile': '146.67px' },
  },
};

export var css = LIST_CSS;

export function render(r, allReviews) {
  var trustedMedia = getTrustedReviewMedia(r);
  var hasMedia = trustedMedia.length > 0;

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
    trustedMedia.forEach(function(item) {
      var thumb = createMediaThumbnail(item, {
        sourceWidth: REVIEW_MEDIA_THUMB_WIDTH,
        width: REVIEW_MEDIA_THUMB_WIDTH,
        height: Math.round(REVIEW_MEDIA_THUMB_WIDTH * 4 / 3),
        onOpen: function() { openReviewModal(r, item.url, allReviews); },
      });
      if (thumb) mediaCol.appendChild(thumb);
    });
    reviewEl.appendChild(mediaCol);
  }

  return reviewEl;
}

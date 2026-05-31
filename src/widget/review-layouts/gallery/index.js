// review-layouts/gallery/index.js — Premium tarzda 2-kolon galeri.
// Item içi sol-sağ split: solda içerik, sağda foto.
// Sol kolon dikey sıra: yıldız → title → yazar → tarih → metin → reply.
// (Card ile aynı sıralama — sadece görsel layout farklı: 2-kolon masonry + sağ foto.)
// Foto yoksa sol kolon tüm genişliği kullanır (no-media modifier).
// Mobile'da da aynı split korunur — foto asla metnin üstüne çıkmaz.
// Masonry için CSS columns parent'a (#renuvex-reviews-widget) :has() ile uygulanır.

import { starsHTML, formatDate, getFirstTrustedReviewImage, GALLERY_TILE_WIDTH, buildResponsiveImgAttrs, hideOnImageError } from '../../core/helpers.js';
import { openReviewModal } from '../../reviews-section/review-modal.js';
import { wireLightboxTrigger } from '../../reviews-section/lightbox-trigger.js';
import { currentSettings } from '../../core/state.js';
import { GALLERY_CSS } from './styles.js';
import { buildReplyEl, buildClampedBody } from '../_shared.js';

export var meta = {
  id: 'gallery',
  name: 'Galeri',
  // Bkz: review-layouts/index.js — supports sözleşmesi.
  supports: {},
  // Foto kolonu genel size ayarıyla orantılı büyüsün — küçük yazıda foto
  // patlamasın, büyük yazıda foto sönük kalmasın. Card'ın bağımsız thumbnail
  // ayarı var; list/gallery için tek genel size kontrolü yeter.
  // --renuvex-pr-gallery-photo-w        : desktop foto kolonu genişliği (3:4 portre)
  // --renuvex-pr-gallery-photo-w-mobile : mobile foto kolonu genişliği (3:4 portre)
  sizeOverrides: {
    small:  { '--renuvex-pr-gallery-photo-w':  '80px', '--renuvex-pr-gallery-photo-w-mobile':  '80px' },
    medium: { '--renuvex-pr-gallery-photo-w': '110px', '--renuvex-pr-gallery-photo-w-mobile': '100px' },
    large:  { '--renuvex-pr-gallery-photo-w': '140px', '--renuvex-pr-gallery-photo-w-mobile': '110px' },
  },
};

export var css = GALLERY_CSS;

export function render(r, allReviews) {
  var firstImg = getFirstTrustedReviewImage(r);
  var hasMedia = !!firstImg;

  var reviewEl = document.createElement('article');
  reviewEl.className = 'renuvex-pr-review-gallery' + (hasMedia ? '' : ' renuvex-pr-review-gallery--no-media');

  // ─── Sol: içerik ───
  var content = document.createElement('div');
  content.className = 'renuvex-pr-review-gallery-content';

  // 1) Yıldız
  var starsSpan = document.createElement('span');
  starsSpan.className = 'renuvex-pr-review-stars renuvex-pr-review-gallery-stars';
  starsSpan.innerHTML = starsHTML(r.rating, currentSettings);
  content.appendChild(starsSpan);

  // 2) Başlık
  if (r.title) {
    var titleEl = document.createElement('div');
    titleEl.className = 'renuvex-pr-review-gallery-title';
    titleEl.textContent = r.title;
    content.appendChild(titleEl);
  }

  // 3) Yazar
  var authorEl = document.createElement('div');
  authorEl.className = 'renuvex-pr-review-gallery-author';
  authorEl.textContent = r.author || '';
  content.appendChild(authorEl);

  // 4) Tarih
  var dateEl = document.createElement('time');
  dateEl.className = 'renuvex-pr-review-gallery-date';
  dateEl.style.display = 'block';
  if (r.createdAt) dateEl.setAttribute('datetime', r.createdAt);
  dateEl.textContent = formatDate(r.createdAt);
  content.appendChild(dateEl);

  // Metin (clamp + devamını oku)
  // Metin (clamp + "Devamını oku"). Foto varsa read-more lightbox'ta tam detayı
  // açar; foto yoksa kart içinde genişler (shared helper, keyboard-erişilebilir).
  var comment = (r.comment || '').trim();
  if (comment) {
    content.appendChild(buildClampedBody(comment, 'renuvex-pr-review-gallery-body', firstImg ? {
      onReadMore: function() { openReviewModal(r, firstImg, allReviews); }
    } : null).fragment);
  }

  reviewEl.appendChild(content);

  // ─── Sağ: foto (ilk görsel) ───
  if (hasMedia) {
    var mediaWrap = document.createElement('div');
    mediaWrap.className = 'renuvex-pr-review-gallery-media';
    var imgEl = document.createElement('img');
    // Gallery masonry tile 200-400 px, aspect 3:4 (styles.js).
    // srcset: 1x/2x retina yedeği; width/height 3:4 CLS rezervi.
    var galleryAttrs = buildResponsiveImgAttrs(firstImg, GALLERY_TILE_WIDTH);
    imgEl.src = galleryAttrs.src;
    imgEl.srcset = galleryAttrs.srcset;
    imgEl.loading = 'lazy';
    imgEl.decoding = 'async';
    imgEl.width = GALLERY_TILE_WIDTH;
    imgEl.height = Math.round(GALLERY_TILE_WIDTH * 4 / 3);
    hideOnImageError(imgEl);
    imgEl.setAttribute('data-renuvex-img-url', firstImg);
    wireLightboxTrigger(imgEl, function() { openReviewModal(r, firstImg, allReviews); });
    mediaWrap.appendChild(imgEl);
    reviewEl.appendChild(mediaWrap);
  }

  // Mağaza yanıtı — full-width, foto+metin altında ayrı satırda.
  // Sol kolonda (340px body) sıkışıyordu, sağda da foto altı boş kalıyordu.
  // Foto yoksa reply "Devamını oku" da shared helper'ın inline davranışını kullanır.
  var replyEl = buildReplyEl(r.merchantReply, firstImg ? function() {
    openReviewModal(r, firstImg, allReviews);
  } : null);
  if (replyEl) {
    replyEl.classList.add('renuvex-pr-review-gallery-reply');
    reviewEl.appendChild(replyEl);
  }

  return reviewEl;
}

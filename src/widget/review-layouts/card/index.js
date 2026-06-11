// review-layouts/card/index.js
// Default "Card" review layout.
// DOM order: stars/date -> title -> author -> body -> photos -> merchant reply.
// Card visual CSS lives in styles.js; shared review primitives stay in the base stylesheet.

import { starsHTML, formatDate, getTrustedReviewImages, PHOTO_STRIP_THUMB_WIDTH, buildResponsiveImgAttrs, hideOnImageError } from '../../core/helpers.js';
import { openReviewModal } from '../../reviews-section/review-modal.js';
import { wireLightboxTrigger } from '../../reviews-section/lightbox-trigger.js';
import { currentSettings } from '../../core/state.js';
import { buildReplyEl, buildClampedBody } from '../_shared.js';
import { CARD_REVIEW_CSS } from './styles.js';

export var meta = {
  id: 'card',
  name: 'Kart (Varsayılan)',
  // Card photos scale with the general size preset through --renuvex-pr-card-photo-w.
  // The thumbnail-size setting only controls the top photo strip.
  sizeOverrides: {
    small:  { '--renuvex-pr-card-photo-w': '80px' },
    medium: { '--renuvex-pr-card-photo-w': '110px' },
    large:  { '--renuvex-pr-card-photo-w': '140px' },
  },
};

export var css = CARD_REVIEW_CSS;

/**
 * @param {import('../index.js').Review} r
 * @param {import('../index.js').Review[]} allReviews
 * @returns {HTMLElement}
 */
export function render(r, allReviews) {
  var reviewEl = document.createElement('article');
  reviewEl.className = 'renuvex-pr-review renuvex-pr-review-card';

  var topRow = document.createElement('div');
  topRow.className = 'renuvex-pr-review-top';

  var leftTop = document.createElement('div');
  leftTop.className = 'renuvex-pr-review-top-left';
  var starsSpan = document.createElement('span');
  starsSpan.className = 'renuvex-pr-review-stars';
  starsSpan.innerHTML = starsHTML(r.rating, currentSettings);
  leftTop.appendChild(starsSpan);

  var dateEl = document.createElement('time');
  dateEl.className = 'renuvex-pr-date';
  if (r.createdAt) dateEl.setAttribute('datetime', r.createdAt);
  dateEl.textContent = formatDate(r.createdAt);

  topRow.appendChild(leftTop);
  topRow.appendChild(dateEl);
  reviewEl.appendChild(topRow);

  if (r.title) {
    var titleEl = document.createElement('div');
    titleEl.className = 'renuvex-pr-review-title';
    titleEl.textContent = r.title;
    reviewEl.appendChild(titleEl);
  }

  var authorEl = document.createElement('div');
  authorEl.className = 'renuvex-pr-author';
  authorEl.textContent = r.author || '';
  reviewEl.appendChild(authorEl);

  var comment = (r.comment || '').trim();
  if (comment) {
    reviewEl.appendChild(buildClampedBody(comment, 'renuvex-pr-body').fragment);
  }

  var trustedImages = getTrustedReviewImages(r);
  if (trustedImages.length) {
    var gallery = document.createElement('div');
    gallery.className = 'renuvex-pr-gallery';
    trustedImages.forEach(function(imgUrl) {
      // alt kasıtlı yok: wireLightboxTrigger role=button + aria-label verir (erişilebilir ad orada).
      var imgEl = document.createElement('img');
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
        wireLightboxTrigger(imgEl, function() { openReviewModal(r, url, allReviews); });
      })(imgUrl);
      gallery.appendChild(imgEl);
    });
    reviewEl.appendChild(gallery);
  }

  var replyEl = buildReplyEl(r.merchantReply);
  if (replyEl) reviewEl.appendChild(replyEl);

  return reviewEl;
}

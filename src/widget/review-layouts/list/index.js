// review-layouts/list/index.js — Liste tasarımı (Okendo/Yotpo magazine tarzı).
// 3-kolon grid: yazar | yıldız+başlık+metin+tarih | foto.
// Fotoğraf yoksa orta kolon foto kolonunu kapsar (no-media modifier).
// Mobile (<600px) dikey diziliş — styles.js'te tanımlı.

import { starsHTML, formatDate, optimizeImageUrl } from '../../core/helpers.js';
import { openReviewModal } from '../../product-widget/review-modal.js';
import { currentSettings } from '../../core/state.js';
import { LIST_CSS } from './styles.js';

export var meta = {
  id: 'list',
  name: 'Liste',
  // Bkz: review-layouts/index.js — supports sözleşmesi.
  supports: { thumbnailSize: false },
};

export var css = LIST_CSS;

export function render(r, allReviews) {
  var hasMedia = !!(r.images && Array.isArray(r.images) && r.images.length);

  var reviewEl = document.createElement('div');
  reviewEl.className = 'ikr-review-list' + (hasMedia ? '' : ' ikr-review-list--no-media');

  // ─── Sol kolon: yazar ───
  var authorCol = document.createElement('div');
  authorCol.className = 'ikr-review-list-author';
  var authorName = document.createElement('span');
  authorName.className = 'ikr-review-list-author-name';
  authorName.textContent = r.author || '';
  authorCol.appendChild(authorName);
  reviewEl.appendChild(authorCol);

  // ─── Orta kolon: içerik ───
  var contentCol = document.createElement('div');
  contentCol.className = 'ikr-review-list-content';

  var head = document.createElement('div');
  head.className = 'ikr-review-list-head';

  var headLeft = document.createElement('div');
  headLeft.className = 'ikr-review-list-head-left';
  var starsSpan = document.createElement('span');
  starsSpan.className = 'ikr-review-stars';
  starsSpan.innerHTML = starsHTML(r.rating, currentSettings);
  headLeft.appendChild(starsSpan);
  head.appendChild(headLeft);

  var dateEl = document.createElement('span');
  dateEl.className = 'ikr-date';
  dateEl.textContent = formatDate(r.createdAt);
  head.appendChild(dateEl);
  contentCol.appendChild(head);

  if (r.title) {
    var titleEl = document.createElement('div');
    titleEl.className = 'ikr-review-list-title';
    titleEl.textContent = r.title;
    contentCol.appendChild(titleEl);
  }

  var comment = (r.comment || '').trim();
  if (comment) {
    var body = document.createElement('div');
    body.className = 'ikr-review-list-body ikr-body-clamped';
    body.textContent = comment;
    contentCol.appendChild(body);

    var readMore = document.createElement('span');
    readMore.className = 'ikr-read-more';
    readMore.textContent = 'Devamını oku';
    readMore.style.display = 'none';
    contentCol.appendChild(readMore);

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

  // Mağaza yanıtı orta kolonun altında
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
    contentCol.appendChild(replyEl);
  }

  reviewEl.appendChild(contentCol);

  // ─── Sağ kolon: foto (ilk görsel) ───
  if (hasMedia) {
    var mediaCol = document.createElement('div');
    mediaCol.className = 'ikr-review-list-media';
    var firstImg = r.images[0];
    if (firstImg && (firstImg.indexOf('https://') === 0 || firstImg.indexOf('data:image/') === 0)) {
      var imgEl = document.createElement('img');
      imgEl.src = optimizeImageUrl(firstImg);
      imgEl.setAttribute('data-ikr-img-url', firstImg);
      imgEl.onclick = function() { openReviewModal(r, firstImg, allReviews); };
      mediaCol.appendChild(imgEl);
    }
    reviewEl.appendChild(mediaCol);
  }

  return reviewEl;
}

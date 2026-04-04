// product-widget/review-item.js — Tek bir yorum DOM elementini oluşturur

import { starsHTML, formatDate } from '../core/helpers.js';

export function buildReviewEl(r) {
  var reviewEl = document.createElement('div');
  reviewEl.className = 'ikr-review';
  var meta = document.createElement('div');
  var authorEl = document.createElement('span');
  authorEl.className = 'ikr-author';
  authorEl.textContent = r.author || '';
  var dateEl = document.createElement('span');
  dateEl.className = 'ikr-date';
  dateEl.textContent = formatDate(r.createdAt);
  meta.appendChild(authorEl);
  meta.appendChild(dateEl);
  reviewEl.appendChild(meta);
  var starsWrapEl = document.createElement('div');
  starsWrapEl.style.marginTop = '4px';
  starsWrapEl.innerHTML = starsHTML(r.rating, null);
  reviewEl.appendChild(starsWrapEl);
  var body = document.createElement('p');
  body.className = 'ikr-body';
  body.textContent = r.comment || '';
  reviewEl.appendChild(body);
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
  if (r.merchantReply) {
    var replyEl = document.createElement('div');
    replyEl.className = 'ikr-reply';
    var replyLabel = document.createElement('strong');
    replyLabel.textContent = 'Mağaza Yanıtı:';
    replyEl.appendChild(replyLabel);
    replyEl.appendChild(document.createElement('br'));
    replyEl.appendChild(document.createTextNode(r.merchantReply));
    reviewEl.appendChild(replyEl);
  }
  return reviewEl;
}

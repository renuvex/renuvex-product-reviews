// product-widget/review-item.js — Tek bir yorum DOM elementini oluşturur

import { starsHTML, formatDate, optimizeImageUrl, getHelpfulVoted, setHelpfulVoted } from '../core/helpers.js';
import { API_BASE } from '../core/config.js';
import { fetchWithTimeout } from '../core/fetch.js';
import { openReviewModal } from './review-modal.js';


export function buildReviewEl(r, allReviews, showHelpful) {
  var reviewEl = document.createElement('div');
  reviewEl.className = 'ikr-review';

  // Satır 1: yıldız + başlık | tarih (sağda)
  var topRow = document.createElement('div');
  topRow.className = 'ikr-review-top';

  var leftTop = document.createElement('div');
  leftTop.className = 'ikr-review-top-left';
  var starsSpan = document.createElement('span');
  starsSpan.className = 'ikr-review-stars';
  starsSpan.innerHTML = starsHTML(r.rating, null);
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
      if (!imgUrl || imgUrl.indexOf('https://') !== 0) return;
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

  // Faydalı butonu
  if (showHelpful !== false) {
    var helpfulRow = document.createElement('div');
    helpfulRow.className = 'ikr-helpful-row';

    var voted = getHelpfulVoted(r.id);
    var count = r.helpfulCount || 0;

    var helpfulBtn = document.createElement('button');
    helpfulBtn.className = 'ikr-helpful-btn' + (voted ? ' ikr-helpful-btn-active' : '');
    helpfulBtn.setAttribute('aria-pressed', voted ? 'true' : 'false');
    helpfulBtn.setAttribute('aria-label', 'Bu yorumu faydalı bul');

    var renderBtnContent = function(c) {
      helpfulBtn.innerHTML = '';
      var thumb = document.createElement('span');
      thumb.textContent = '👍';
      var label = document.createElement('span');
      label.textContent = 'Faydalı';
      helpfulBtn.appendChild(thumb);
      helpfulBtn.appendChild(label);
      if (c > 0) {
        var countEl = document.createElement('span');
        countEl.className = 'ikr-helpful-count';
        countEl.textContent = '(' + c + ')';
        helpfulBtn.appendChild(countEl);
      }
    };

    renderBtnContent(count);

    helpfulBtn.onclick = async function() {
      if (helpfulBtn.disabled) return;
      helpfulBtn.disabled = true;
      var isVoted = helpfulBtn.classList.contains('ikr-helpful-btn-active');
      var method = isVoted ? 'DELETE' : 'POST';
      try {
        var res = await fetchWithTimeout(API_BASE + '/api/public/reviews/' + r.id + '/helpful', { method: method });
        if (res.ok) {
          var data = await res.json();
          count = data.helpfulCount || 0;
          var nowVoted = !isVoted;
          setHelpfulVoted(r.id, nowVoted);
          helpfulBtn.classList.toggle('ikr-helpful-btn-active', nowVoted);
          helpfulBtn.setAttribute('aria-pressed', nowVoted ? 'true' : 'false');
          renderBtnContent(count);
        } else if (res.status === 409) {
          // Farklı cihazda zaten oylanmış — LocalStorage'ı düzelt, butonu aktif göster
          setHelpfulVoted(r.id, true);
          helpfulBtn.classList.add('ikr-helpful-btn-active');
          helpfulBtn.setAttribute('aria-pressed', 'true');
        }
      } catch (_) {}
      helpfulBtn.disabled = false;
    };

    helpfulRow.appendChild(helpfulBtn);
    reviewEl.appendChild(helpfulRow);
  }

  return reviewEl;
}

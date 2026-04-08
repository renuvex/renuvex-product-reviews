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

  // Fotoğraflar + faydalı butonu (aynı satırda, bottom-aligned)
  var mediaRow = document.createElement('div');
  mediaRow.className = 'ikr-media-row';

  var gallery = document.createElement('div');
  gallery.className = 'ikr-gallery';
  if (r.images && Array.isArray(r.images) && r.images.length) {
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
  }
  mediaRow.appendChild(gallery);

  // Faydalı butonu — mediaRow'un sağına, fotoğraflarla aynı hizada
  if (showHelpful !== false) {
    var voted = getHelpfulVoted(r.id);
    // Cache'ten eski helpfulCount gelebilir — kendi oyu varsa en az 1 garantile
    var count = voted ? Math.max(r.helpfulCount || 0, 1) : (r.helpfulCount || 0);

    var helpfulBtn = document.createElement('button');
    helpfulBtn.className = 'ikr-helpful-btn' + (voted ? ' ikr-helpful-btn-active' : '');
    helpfulBtn.setAttribute('aria-pressed', voted ? 'true' : 'false');
    helpfulBtn.setAttribute('aria-label', 'Bu yorumu faydalı bul');

    var SVG_OUTLINE = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>';
    var SVG_FILLED = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>';

    var renderBtnContent = function(c, isActive) {
      helpfulBtn.innerHTML = '<span class="ikr-helpful-icon">' + (isActive ? SVG_FILLED : SVG_OUTLINE) + '</span>' +
        '<span class="ikr-helpful-count">' + (c > 0 ? c : '') + '</span>';
    };

    renderBtnContent(count, voted);

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
          renderBtnContent(count, nowVoted);
        }
      } catch (_) {}
      helpfulBtn.disabled = false;
    };

    mediaRow.appendChild(helpfulBtn);
  }

  reviewEl.appendChild(mediaRow);

  // Mağaza yanıtı — mediaRow'dan sonra
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

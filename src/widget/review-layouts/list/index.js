// review-layouts/list/index.js — Liste tasarımı (Modern magazine tarzı).
// 3-kolon grid: yazar | yıldız+başlık+metin+tarih | foto.
// Fotoğraf yoksa orta kolon foto kolonunu kapsar (no-media modifier).
// Mobile (<600px) dikey diziliş — styles.js'te tanımlı.

import { starsHTML, formatDate, optimizeImageUrl } from '../../core/helpers.js';
import { openReviewModal } from '../../product-widget/review-modal.js';
import { currentSettings } from '../../core/state.js';
import { LIST_CSS } from './styles.js';
import { buildReplyEl } from '../_shared.js';

export var meta = {
  id: 'list',
  name: 'Liste',
  // Bkz: review-layouts/index.js — supports sözleşmesi.
  supports: {},
  // Foto kolonu genel size ayarıyla orantılı büyüsün — küçük yazıda büyük foto
  // patlamasın, büyük yazıda foto sönük kalmasın. Card'ın bağımsız thumbnail
  // ayarı var; list/gallery için tek genel size kontrolü yeter.
  // --ikr-list-photo-w        : desktop sağ kolon foto genişliği (3:4 portre)
  // --ikr-list-photo-w-mobile : mobile, metin altına düşen foto genişliği (3:4 portre)
  sizeOverrides: {
    small:  { '--ikr-list-photo-w':  '90px', '--ikr-list-photo-w-mobile':  '80px' },
    medium: { '--ikr-list-photo-w': '120px', '--ikr-list-photo-w-mobile': '100px' },
    large:  { '--ikr-list-photo-w': '140px', '--ikr-list-photo-w-mobile': '110px' },
  },
};

export var css = LIST_CSS;

export function render(r, allReviews) {
  var hasMedia = !!(r.images && Array.isArray(r.images) && r.images.length);

  var reviewEl = document.createElement('div');
  reviewEl.className = 'ikr-review-list' + (hasMedia ? '' : ' ikr-review-list--no-media');

  // ─── Sol kolon: imza grubu (yıldız → yazar → tarih) ───
  // Yazar tek başına sol kolonda izole görünüyordu; yıldız + tarih ile
  // birlikte gruplanınca "kim, kaç yıldız, ne zaman" tek bakışta okunur.
  // Endüstri standardı: Trustpilot, Amazon, Çiçeksepeti.
  var authorCol = document.createElement('div');
  authorCol.className = 'ikr-review-list-author';

  var starsSpan = document.createElement('span');
  starsSpan.className = 'ikr-review-stars ikr-review-list-author-stars';
  starsSpan.innerHTML = starsHTML(r.rating, currentSettings);
  authorCol.appendChild(starsSpan);

  var authorName = document.createElement('span');
  authorName.className = 'ikr-review-list-author-name';
  authorName.textContent = r.author || '';
  authorCol.appendChild(authorName);

  var dateEl = document.createElement('span');
  dateEl.className = 'ikr-date ikr-review-list-author-date';
  dateEl.textContent = formatDate(r.createdAt);
  authorCol.appendChild(dateEl);

  reviewEl.appendChild(authorCol);

  // ─── Orta kolon: içerik (title → body → reply) ───
  var contentCol = document.createElement('div');
  contentCol.className = 'ikr-review-list-content';

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
    mediaCol.className = 'ikr-review-list-media';
    r.images.forEach(function(imgUrl) {
      if (!imgUrl || (imgUrl.indexOf('https://') !== 0 && imgUrl.indexOf('data:image/') !== 0)) return;
      var imgEl = document.createElement('img');
      imgEl.src = optimizeImageUrl(imgUrl);
      imgEl.setAttribute('data-ikr-img-url', imgUrl);
      (function(url) {
        imgEl.onclick = function() { openReviewModal(r, url, allReviews); };
      })(imgUrl);
      mediaCol.appendChild(imgEl);
    });
    reviewEl.appendChild(mediaCol);
  }

  return reviewEl;
}

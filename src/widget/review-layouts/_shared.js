// review-layouts/_shared.js — Layout'lar arası tekrar eden DOM helper'ları.
// Reply (mağaza yanıtı) DOM'u 3 layout'ta da aynı: header (label) + text + clamp/read-more.
// Tek yerden yönetilir, layout dosyaları sadece append eder.

import { currentSettings } from '../core/state.js';

// Mağaza yanıtı bloğunu oluşturur (clamp + "Devamını oku" davranışı dahil).
// Yorum metnindeki body-clamp pattern'inin reply versiyonu.
// Reply DOM'u layout'lar arası tutarlı; sadece eklendiği yer (parent) farklı.
//
// onReadMore (opsiyonel): "Devamını oku" tıklamasında çağrılır. Verilirse
// inline expand yerine bu callback çalışır (galeri'de modal açmak için).
// Verilmezse eski inline toggle davranışı (card/list).
export function buildReplyEl(merchantReply, onReadMore) {
  if (!merchantReply) return null;

  var replyEl = document.createElement('div');
  replyEl.className = 'ikr-reply';

  var replyHeader = document.createElement('div');
  replyHeader.className = 'ikr-reply-header';
  var replyLabel = document.createElement('span');
  replyLabel.className = 'ikr-reply-label';
  replyLabel.textContent = (currentSettings && currentSettings.merchantReplyLabel) || 'Mağaza Sahibi';
  replyHeader.appendChild(replyLabel);
  replyEl.appendChild(replyHeader);

  var replyText = document.createElement('div');
  replyText.className = 'ikr-reply-text ikr-reply-text-clamped';
  replyText.textContent = merchantReply;
  replyEl.appendChild(replyText);

  // "Devamını oku" — sadece clamp gerçekten devreye girdiyse görünür.
  // requestAnimationFrame: tarayıcı layout hesabı tamamlanmadan scrollHeight okunamaz.
  var readMore = document.createElement('span');
  readMore.className = 'ikr-read-more ikr-reply-read-more';
  readMore.textContent = 'Devamını oku';
  readMore.style.display = 'none';
  replyEl.appendChild(readMore);

  requestAnimationFrame(function() {
    if (replyText.scrollHeight > replyText.clientHeight + 2) {
      readMore.style.display = 'inline';
      if (typeof onReadMore === 'function') {
        readMore.onclick = onReadMore;
      } else {
        var expanded = false;
        readMore.onclick = function() {
          expanded = !expanded;
          replyText.classList.toggle('ikr-reply-text-clamped', !expanded);
          readMore.textContent = expanded ? 'Daha az göster' : 'Devamını oku';
        };
      }
    }
  });

  return replyEl;
}

// review-layouts/_shared.js — Layout'lar arası tekrar eden DOM helper'ları.
// Reply (mağaza yanıtı) DOM'u 3 layout'ta da aynı: header (label) + text + clamp/read-more.
// Tek yerden yönetilir, layout dosyaları sadece append eder.

import { currentSettings } from '../core/state.js';
import { settingText } from '../core/helpers.js';

// Clamp'lı gövde + "Devamını oku/Daha az göster" — tüm review layout'ları (card/
// list/gallery) için tek kaynak. read-more KEYBOARD-ERİŞİLEBİLİR <button>'dır
// (eski <span onclick> klavye/screen-reader ile çalışmıyordu). opts.onReadMore
// verilirse inline toggle yerine o çağrılır (galeri: lightbox aç).
// Dönüş: { fragment, body, readMore } — çağıran fragment'ı uygun parent'a ekler.
export function buildClampedBody(text, bodyClassName, opts) {
  var o = opts || {};
  var frag = document.createDocumentFragment();

  var body = document.createElement('div');
  body.className = bodyClassName + ' renuvex-pr-body-clamped';
  body.textContent = text;
  frag.appendChild(body);

  var readMore = document.createElement('button');
  readMore.type = 'button';
  readMore.className = 'renuvex-pr-read-more';
  readMore.textContent = 'Devamını oku';
  readMore.style.display = 'none';
  frag.appendChild(readMore);

  requestAnimationFrame(function () {
    if (body.scrollHeight > body.clientHeight + 2) {
      readMore.style.display = 'inline-block';
      if (typeof o.onReadMore === 'function') {
        readMore.onclick = o.onReadMore;
      } else {
        var expanded = false;
        readMore.onclick = function () {
          expanded = !expanded;
          body.classList.toggle('renuvex-pr-body-clamped', !expanded);
          readMore.textContent = expanded ? 'Daha az göster' : 'Devamını oku';
        };
      }
    }
  });

  return { fragment: frag, body: body, readMore: readMore };
}

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
  replyEl.className = 'renuvex-pr-reply';

  var replyHeader = document.createElement('div');
  replyHeader.className = 'renuvex-pr-reply-header';
  var replyLabel = document.createElement('span');
  replyLabel.className = 'renuvex-pr-reply-label';
  replyLabel.textContent = settingText(currentSettings && currentSettings.merchantReplyLabel, 'Mağaza Sahibi');
  replyHeader.appendChild(replyLabel);
  replyEl.appendChild(replyHeader);

  var replyText = document.createElement('div');
  replyText.className = 'renuvex-pr-reply-text renuvex-pr-reply-text-clamped';
  replyText.textContent = merchantReply;
  replyEl.appendChild(replyText);

  // "Devamını oku" — sadece clamp gerçekten devreye girdiyse görünür.
  // Keyboard-erişilebilir <button> (eski <span onclick> klavyeyle çalışmıyordu).
  // requestAnimationFrame: tarayıcı layout hesabı tamamlanmadan scrollHeight okunamaz.
  var readMore = document.createElement('button');
  readMore.type = 'button';
  readMore.className = 'renuvex-pr-read-more renuvex-pr-reply-read-more';
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
          replyText.classList.toggle('renuvex-pr-reply-text-clamped', !expanded);
          readMore.textContent = expanded ? 'Daha az göster' : 'Devamını oku';
        };
      }
    }
  });

  return replyEl;
}

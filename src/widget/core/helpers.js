// helpers.js — Genel yardımcı fonksiyonlar

import { renderStarRow, getIconFromSettings } from '../icons.js';

// Review widget içindeki yıldızlar için CSS custom property — reviews widget ayarından beslenir
export var STAR_COLOR = 'var(--ikr-review-star-color,#f59e0b)';

export var SYSTEM_SLUGS = /^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;

export function extractSlug(url) {
  try {
    return new URL(url, window.location.origin).pathname.replace(/^\//, '').split('?')[0].split('/')[0];
  } catch (_) { return ''; }
}

// starsHTML(rating, settings) — SVG yıldız satırı üretir.
// settings'teki reviewIcon + reviewIconStyle'a göre ICONS registry'sinden SVG alır.
// Boyut parent CSS (.ikr-review-stars, .ikr-modal-stars vb.) tarafından verilir.
export function starsHTML(rating, settings) {
  var wrapStyle = 'color:' + STAR_COLOR + ';display:inline-flex;gap:2px;align-items:center;';
  return '<span class="ikr-stars" style="' + wrapStyle + '">' +
    renderStarRow(rating, settings) +
    '</span>';
}

// partialStarsHTML(rating, iconPair, opts) — Ortalama puan için yarım yıldız desteği.
// 5 boş yıldız üstüne 5 dolu yıldız bindirir, dolu katmanı %(rating/5*100) genişlikte clipler.
// Loox/Yotpo/Material UI Rating standardı (overlay clip tekniği).
//
//   rating   : float (ör 4.3, 4.5, 5.0)
//   iconPair : { filled, empty } — getIconFromSettings'ten gelen SVG çifti
//   opts     : { sizeStyle? } — inline 'width:Xpx;height:Xpx;' (opsiyonel, normalde CSS'ten gelir)
export function partialStarsHTML(rating, iconPair, opts) {
  var r = Math.max(0, Math.min(5, parseFloat(rating) || 0));
  // 0.25/0.75 snap — endüstri standardı (Material UI, Judge.me, Stamped):
  // her yıldız için kesir < 0.25 → boş, 0.25-0.74 → yarım, ≥ 0.75 → dolu.
  // %10 gibi belirsiz dolguları temizler, görsel netlik sağlar.
  var whole = Math.floor(r);
  var frac = r - whole;
  var snapped = frac < 0.25 ? whole : (frac < 0.75 ? whole + 0.5 : whole + 1);
  var pct = (snapped / 5) * 100;
  var sizeStyle = (opts && opts.sizeStyle) || '';
  // Boş katman da `filled` path'i kullanır — opaklık ile soldurulur.
  // Outline path'lerin filled path'lerle birebir hizalanmaması sorununu (overlay
  // sapması) ortadan kaldırır. Yotpo/Stamped/Material UI Rating standardı.
  var emptyHtml = '';
  var filledHtml = '';
  for (var i = 0; i < 5; i++) {
    emptyHtml  += '<span class="ikr-icon" style="' + sizeStyle + '">' + iconPair.filled + '</span>';
    filledHtml += '<span class="ikr-icon" style="' + sizeStyle + '">' + iconPair.filled + '</span>';
  }
  return '<span class="ikr-stars-partial">' +
           '<span class="ikr-stars-partial-empty">' + emptyHtml + '</span>' +
           '<span class="ikr-stars-partial-fill" style="width:' + pct + '%;">' + filledHtml + '</span>' +
         '</span>';
}

export function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
}

function hexToRgb(hex) {
  var m = /^#([0-9A-Fa-f]{6})$/.exec(hex);
  if (!m) return null;
  return [parseInt(m[1].slice(0,2),16), parseInt(m[1].slice(2,4),16), parseInt(m[1].slice(4,6),16)];
}

export function applyWidgetColor(color) {
  var validColor = /^#[0-9A-Fa-f]{6}$/.test(color) ? color : '#111111';
  document.documentElement.style.setProperty('--ikr-color', validColor);
  var rgb = hexToRgb(validColor);
  document.documentElement.style.setProperty('--ikr-color-light', rgb ? 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',0.07)' : 'rgba(17,17,17,0.07)');
}

export function injectStyles(color, css) {
  var el = document.getElementById('ikr-styles');
  if (!el) {
    el = document.createElement('style');
    el.id = 'ikr-styles';
    document.head.appendChild(el);
  }
  el.textContent = css;
  applyWidgetColor(color);
}

export function optimizeImageUrl(url) {
  if (!url || url.indexOf('res.cloudinary.com') === -1) return url;
  return url.replace('/upload/', '/upload/q_auto/f_auto/c_scale,w_1200/');
}

// renderStars — form için radio-input tabanlı erişilebilir yıldız seçici.
// Endüstri standardı pattern: hidden `<input type="radio">` + `<label>` + CSS :checked/:hover.
// Avantaj: native click/touch/keyboard, screen reader, form validation — JS event handling yok.
// Yıldızlar TERS sırayla render edilir (5→1), böylece CSS ~ selector "seçilenin/hover'ın solundaki
// tüm kardeşler dolu" kuralı çalışır (DOM sırası sağ→sol, flex-direction:row-reverse ile görünüm düzelir).
export function renderStars(rating, interactive, onChange, settings) {
  var pair = getIconFromSettings(settings);
  var name = 'ikr-rating-' + Math.random().toString(36).slice(2, 9);

  var wrap = document.createElement('div');
  wrap.className = 'ikr-rating' + (interactive ? ' ikr-rating-interactive' : '');
  // row-reverse ile DOM 5,4,3,2,1 → görsel 1,2,3,4,5.
  wrap.style.cssText = 'display:inline-flex;flex-direction:row-reverse;justify-content:flex-end;gap:4px;';

  if (!interactive) {
    // Read-only: basitçe dolu/boş yıldızları göster, input yok.
    wrap.style.flexDirection = 'row';
    for (var j = 1; j <= 5; j++) {
      var star = document.createElement('span');
      star.className = 'ikr-icon';
      star.style.cssText = 'width:24px;height:24px;display:inline-flex;color:' + (j <= rating ? STAR_COLOR : '#ddd') + ';';
      star.innerHTML = j <= rating ? pair.filled : pair.empty;
      wrap.appendChild(star);
    }
    return wrap;
  }

  // Interactive: radio inputs, 5'ten 1'e doğru (row-reverse ile görsel 1→5).
  for (var i = 5; i >= 1; i--) {
    (function (idx) {
      var input = document.createElement('input');
      input.type = 'radio';
      input.name = name;
      input.value = String(idx);
      input.id = name + '-' + idx;
      input.className = 'ikr-rating-input';
      if (idx === rating) input.checked = true;
      // Görsel olarak gizle ama erişilebilir kalsın (screen reader + klavye çalışır).
      input.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
      input.addEventListener('change', function () {
        onChange && onChange(idx);
      });

      var label = document.createElement('label');
      label.htmlFor = input.id;
      label.className = 'ikr-rating-label';
      label.setAttribute('aria-label', idx + ' yıldız');
      label.style.cssText = 'width:24px;height:24px;display:inline-flex;cursor:pointer;transition:color .15s;';
      
      // %100 Güvenli ve Bubbling (çakışma) yapmayan Tıklama Tetiği
      label.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Grubun tümünü temizle (Manuel checked=true yaptığımızda grubun senkronu bozulmasın diye)
        var allRadios = wrap.querySelectorAll('.ikr-rating-input');
        for(var r=0; r<allRadios.length; r++) { allRadios[r].checked = false; }
        
        input.checked = true;
        if (onChange) onChange(idx);
      });

      // Pointer-events:none ile resimlerin tıklamayı emmesi tamamen önleniyor.
      // Inline opacity:0 yerine class yapısı kullanarak stil ezilmesini de kaldırıyoruz
      label.innerHTML =
        '<span class="ikr-rating-filled" style="position:absolute;width:24px;height:24px;color:' + STAR_COLOR + ';pointer-events:none;">' + pair.filled + '</span>' +
        '<span class="ikr-rating-empty" style="position:relative;width:24px;height:24px;color:#ddd;pointer-events:none;">' + pair.empty + '</span>';
      label.style.position = 'relative';

      wrap.appendChild(input);
      wrap.appendChild(label);
    })(i);
  }

  ensureStarStyles();
  return wrap;
}

// CSS kurallarını bir kez <style> olarak ekle
var starStylesInjected = false;
function ensureStarStyles() {
  if (starStylesInjected) return;
  starStylesInjected = true;
  var css = '.ikr-rating-interactive .ikr-rating-filled{opacity:0; transition:opacity .15s;}' + '.ikr-rating-interactive .ikr-rating-empty{opacity:1; transition:opacity .15s;}' + '.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-filled{opacity:1 !important;}' + '.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-empty{opacity:0 !important;}' + '.ikr-rating-interactive .ikr-rating-input:focus-visible + .ikr-rating-label{outline:2px solid ' + STAR_COLOR + ';outline-offset:2px;border-radius:4px;}';

  var style = document.createElement('style');
  style.setAttribute('data-ikr', 'rating');
  style.textContent = css;
  document.head.appendChild(style);
}

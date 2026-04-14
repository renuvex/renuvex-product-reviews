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

export function getHelpfulVoted(reviewId) {
  try { return localStorage.getItem('ikr_helpful_' + reviewId) === '1'; } catch (_) { return false; }
}

export function setHelpfulVoted(reviewId, voted) {
  try {
    if (voted) localStorage.setItem('ikr_helpful_' + reviewId, '1');
    else localStorage.removeItem('ikr_helpful_' + reviewId);
  } catch (_) {}
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
      
      // Zorunlu JS tetiği: Bazı tarayıcılarda (veya shadow durumlarda) label'ın kendi 'for' bağı başarısız olabilir.
      label.addEventListener('click', function(e) {
        if (!input.checked) {
          input.checked = true;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });

      // İki SVG üst üste — filled altta, empty üstte. CSS ile hover/checked'e göre empty
      // saklanır ve dolu yıldız görünür. Şekiller farklı olsa bile doğru render olur.
      label.innerHTML =
        '<span class="ikr-rating-filled" style="position:absolute;width:24px;height:24px;color:' + STAR_COLOR + ';opacity:0;pointer-events:none;">' + pair.filled + '</span>' +
        '<span class="ikr-rating-empty" style="position:relative;width:24px;height:24px;color:#ddd;pointer-events:none;">' + pair.empty + '</span>';
      label.style.position = 'relative';

      wrap.appendChild(input);
      wrap.appendChild(label);
    })(i);
  }

  ensureStarStyles();
  return wrap;
}

// CSS kurallarını bir kez <style> olarak ekle (hover/checked görünümü).
var starStylesInjected = false;
function ensureStarStyles() {
  if (starStylesInjected) return;
  starStylesInjected = true;
  var css =
    // DOM sırası 5,4,3,2,1 — row-reverse ile görsel 1,2,3,4,5.
    // Hover varsayılanı: hover edilen + DOM'daki sonrası (görselde solu) filled açık, empty kapalı.
    '.ikr-rating-interactive .ikr-rating-label:hover .ikr-rating-filled,' +
    '.ikr-rating-interactive .ikr-rating-label:hover ~ .ikr-rating-label .ikr-rating-filled{opacity:1;}' +
    '.ikr-rating-interactive .ikr-rating-label:hover .ikr-rating-empty,' +
    '.ikr-rating-interactive .ikr-rating-label:hover ~ .ikr-rating-label .ikr-rating-empty{opacity:0;}' +
    // Checked state: seçili radio + sonraki label'lar filled.
    '.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-filled{opacity:1;}' +
    '.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-empty{opacity:0;}' +
    // Hover sırasında önceki checked görünümü bastır (preview checked'i ezsin).
    '.ikr-rating-interactive:hover .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-filled{opacity:0;}' +
    '.ikr-rating-interactive:hover .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-empty{opacity:1;}' +
    // Sonra hover'ı tekrar uygula (cascade'de sonraki kural kazanır).
    '.ikr-rating-interactive:hover .ikr-rating-label:hover .ikr-rating-filled,' +
    '.ikr-rating-interactive:hover .ikr-rating-label:hover ~ .ikr-rating-label .ikr-rating-filled{opacity:1;}' +
    '.ikr-rating-interactive:hover .ikr-rating-label:hover .ikr-rating-empty,' +
    '.ikr-rating-interactive:hover .ikr-rating-label:hover ~ .ikr-rating-label .ikr-rating-empty{opacity:0;}' +
    // Klavye focus görünümü
    '.ikr-rating-interactive .ikr-rating-input:focus-visible + .ikr-rating-label{outline:2px solid ' + STAR_COLOR + ';outline-offset:2px;border-radius:4px;}';
  var style = document.createElement('style');
  style.setAttribute('data-ikr', 'rating');
  style.textContent = css;
  document.head.appendChild(style);
}

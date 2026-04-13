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

// renderStars — form için interaktif SVG yıldız seçici.
// settings'teki reviewIcon + reviewIconStyle ikon çiftini kullanır.
export function renderStars(rating, interactive, onChange, settings) {
  var pair = getIconFromSettings(settings);

  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:inline-flex;gap:4px;align-items:center;';
  wrap.setAttribute('data-rating', rating);
  const stars = [];

  function setState(el, isFilled) {
    el.innerHTML = isFilled ? pair.filled : pair.empty;
    el.style.color = isFilled ? STAR_COLOR : '#ddd';
  }

  function update(hovered) {
    stars.forEach(function (s, idx) {
      setState(s, idx < hovered);
    });
  }

  // Pointer aşağı indiği yıldız — kaldırıldığında aynıysa commit.
  var downIdx = null;

  for (var i = 1; i <= 5; i++) {
    (function (idx) {
      const star = document.createElement('span');
      star.className = 'ikr-icon';
      star.style.cssText = 'width:24px;height:24px;display:inline-flex;cursor:' + (interactive ? 'pointer' : 'default') + ';transition:color .15s;touch-action:manipulation;user-select:none;-webkit-user-select:none;';
      setState(star, idx <= rating);
      if (interactive) {
        // Hover preview sadece gerçek mouse için — touch/pen'de preview yok.
        star.addEventListener('pointerover', function (e) {
          if (e.pointerType === 'mouse') update(idx);
        });
        star.addEventListener('pointerdown', function () { downIdx = idx; });
        // Tap/click yerine pointerup: sadece down ile aynı yıldızda kalktıysa commit.
        // Böylece mobilde kaydırınca başka yıldızda biten drag, yanlış seçim yapmaz.
        star.addEventListener('pointerup', function () {
          if (downIdx === idx) {
            wrap.setAttribute('data-rating', idx);
            onChange && onChange(idx);
            update(idx);
          }
          downIdx = null;
        });
      }
      stars.push(star);
      wrap.appendChild(star);
    })(i);
  }

  if (interactive) {
    wrap.addEventListener('pointercancel', function () { downIdx = null; });
    wrap.addEventListener('pointerleave', function (e) {
      if (e.pointerType === 'mouse') {
        // Mouse dışarı çıkınca son commit'li değere geri dön (hover preview temizleme).
        update(parseInt(wrap.getAttribute('data-rating') || '0'));
      } else {
        // Touch/pen wrapper dışına kayarsa commit'i iptal et.
        downIdx = null;
      }
    });
  }
  return wrap;
}

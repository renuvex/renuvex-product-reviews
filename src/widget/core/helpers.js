// helpers.js — Genel yardımcı fonksiyonlar

// Review widget içindeki yıldızlar için CSS custom property — reviews widget ayarından beslenir
export var STAR_COLOR = 'var(--ikr-review-star-color,#f59e0b)';

// Review widget ikon setleri — reviews.reviewIcon ayarı bu karakterleri üretir
export var REVIEW_ICON_CHARS = {
  star:   { filled: '★', empty: '☆' },
  heart:  { filled: '♥', empty: '♡' },
  circle: { filled: '●', empty: '○' },
};

export var SYSTEM_SLUGS = /^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;

export function extractSlug(url) {
  try {
    return new URL(url, window.location.origin).pathname.replace(/^\//, '').split('?')[0].split('/')[0];
  } catch (_) { return ''; }
}

// starsHTML(rating, sizeOverride, settings) — settings varsa onun icon/color/size'ını kullanır,
// yoksa fallback (sabit ★, STAR_COLOR, default size)
export function starsHTML(rating, sizeOverride, settings) {
  var r = Math.round(parseFloat(rating)) || 0;
  var iconKey = (settings && settings.reviewIcon) || 'star';
  var chars = REVIEW_ICON_CHARS[iconKey] || REVIEW_ICON_CHARS.star;
  var filled = chars.filled.repeat(Math.min(r, 5));
  var empty = chars.empty.repeat(Math.max(5 - r, 0));
  var fontSize = sizeOverride || null;
  var style = 'color:' + STAR_COLOR + ';' + (fontSize ? 'font-size:' + fontSize + ';' : '');
  return '<span style="' + style + '">' + filled + empty + '</span>';
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

// renderStars — form için interaktif seçici.
// settings.reviewIcon verilirse o ikon set'ini kullanır.
export function renderStars(rating, interactive, onChange, settings) {
  var iconKey = (settings && settings.reviewIcon) || 'star';
  var chars = REVIEW_ICON_CHARS[iconKey] || REVIEW_ICON_CHARS.star;

  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;gap:4px;';
  wrap.setAttribute('data-rating', rating);
  const stars = [];

  function update(hovered) {
    stars.forEach(function (s, idx) {
      s.textContent = idx < hovered ? chars.filled : chars.empty;
      s.style.color = idx < hovered ? STAR_COLOR : '#ddd';
    });
  }

  for (var i = 1; i <= 5; i++) {
    (function (idx) {
      const star = document.createElement('span');
      star.textContent = idx <= rating ? chars.filled : chars.empty;
      star.style.cssText = 'font-size:24px;color:' + (idx <= rating ? STAR_COLOR : '#ddd') + ';cursor:' + (interactive ? 'pointer' : 'default') + ';transition:color .15s';
      if (interactive) {
        star.onmouseover = function () { update(idx); };
        star.onclick = function () { wrap.setAttribute('data-rating', idx); onChange && onChange(idx); update(idx); };
      }
      stars.push(star);
      wrap.appendChild(star);
    })(i);
  }

  if (interactive) {
    wrap.onmouseleave = function () { update(parseInt(wrap.getAttribute('data-rating') || '0')); };
  }
  return wrap;
}

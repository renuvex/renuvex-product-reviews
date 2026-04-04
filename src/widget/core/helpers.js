// helpers.js — Genel yardımcı fonksiyonlar

export var STAR_COLOR = '#f59e0b';

export function extractSlug(url) {
  try {
    return new URL(url, window.location.origin).pathname.replace(/^\//, '').split('?')[0].split('/')[0];
  } catch (_) { return ''; }
}

export function starsHTML(rating, size) {
  var r = Math.round(parseFloat(rating)) || 0;
  var filled = '★'.repeat(Math.min(r, 5));
  var empty = '☆'.repeat(Math.max(5 - r, 0));
  var style = 'color:' + STAR_COLOR + ';' + (size ? 'font-size:' + size + ';' : '');
  return '<span style="' + style + '">' + filled + empty + '</span>';
}

export function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function injectStyles(color, css) {
  var el = document.getElementById('ikr-styles');
  if (!el) {
    el = document.createElement('style');
    el.id = 'ikr-styles';
    document.head.appendChild(el);
  }
  el.textContent = css;
  document.documentElement.style.setProperty('--ikr-color', /^#[0-9A-Fa-f]{6}$/.test(color) ? color : '#111');
}

export function renderStars(rating, interactive, onChange) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;gap:4px;';
  wrap.setAttribute('data-rating', rating);
  const stars = [];

  function update(hovered) {
    stars.forEach(function (s, idx) {
      s.textContent = idx < hovered ? '★' : '☆';
      s.style.color = idx < hovered ? STAR_COLOR : '#ddd';
    });
  }

  for (var i = 1; i <= 5; i++) {
    (function (idx) {
      const star = document.createElement('span');
      star.textContent = idx <= rating ? '★' : '☆';
      star.style.cssText = 'font-size:20px;color:' + (idx <= rating ? STAR_COLOR : '#ddd') + ';cursor:' + (interactive ? 'pointer' : 'default') + ';transition:color .15s';
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

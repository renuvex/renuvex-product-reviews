// reviews-section/render/pagination.js — numbered review-list pagination.
//
// Used only when settings.paginationMode === 'numbered'; the default 'loadMore'
// path keeps the existing cursor-append "Daha Fazla" button (render.js).
//
//   buildPageList(page, totalPages) — pure, windowed/ellipsis page list (mirrors
//     the admin ReviewsTab logic): <= SHOW_ALL_MAX pages -> every page; otherwise
//     first/last + current ± PAGE_WINDOW with '…' gaps.
//   buildPaginationControl({ page, totalPages, onPageChange }) — DOM <nav>.
//
// DOM is built with createElement/textContent only — never innerHTML — to stay
// clear of the storefront inner-markup security hook.

var PAGE_WINDOW = 1; // pages shown on each side of the current page
var SHOW_ALL_MAX = 7; // <= this many total pages -> show every page (no ellipsis)
var ELLIPSIS = '…'; // …

export function buildPageList(page, totalPages) {
  var total = Math.max(1, Math.floor(Number(totalPages)) || 1);
  var current = Math.min(Math.max(1, Math.floor(Number(page)) || 1), total);

  if (total <= SHOW_ALL_MAX) {
    var all = [];
    for (var p = 1; p <= total; p++) all.push(p);
    return all;
  }

  var kept = [];
  for (var i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - current) <= PAGE_WINDOW) kept.push(i);
  }

  var out = [];
  for (var j = 0; j < kept.length; j++) {
    if (j > 0 && kept[j] - kept[j - 1] > 1) out.push(ELLIPSIS);
    out.push(kept[j]);
  }
  return out;
}

export function buildPaginationControl(opts) {
  var totalPages = Math.max(1, Math.floor(Number(opts.totalPages)) || 1);
  var page = Math.min(Math.max(1, Math.floor(Number(opts.page)) || 1), totalPages);
  var onPageChange = typeof opts.onPageChange === 'function' ? opts.onPageChange : function () {};

  var nav = document.createElement('nav');
  nav.className = 'renuvex-pr-pagination';
  nav.setAttribute('aria-label', 'Yorum sayfaları');

  function makeArrow(label, glyph, targetPage, disabled) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'renuvex-pr-pagination-arrow';
    btn.setAttribute('aria-label', label);
    btn.textContent = glyph;
    if (disabled) {
      btn.disabled = true;
    } else {
      btn.onclick = function () { onPageChange(targetPage); };
    }
    return btn;
  }

  nav.appendChild(makeArrow('Önceki sayfa', '‹', page - 1, page <= 1));

  buildPageList(page, totalPages).forEach(function (item) {
    if (item === ELLIPSIS) {
      var gap = document.createElement('span');
      gap.className = 'renuvex-pr-pagination-gap';
      gap.setAttribute('aria-hidden', 'true');
      gap.textContent = ELLIPSIS;
      nav.appendChild(gap);
      return;
    }

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'renuvex-pr-pagination-btn';
    btn.textContent = String(item);
    btn.setAttribute('aria-label', 'Sayfa ' + item);
    if (item === page) {
      btn.setAttribute('aria-current', 'page');
    } else {
      btn.onclick = function () { onPageChange(item); };
    }
    nav.appendChild(btn);
  });

  nav.appendChild(makeArrow('Sonraki sayfa', '›', page + 1, page >= totalPages));

  return nav;
}

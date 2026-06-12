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

  // Loading feedback: the whole control goes disabled + aria-busy the moment a
  // page is activated. No un-busy path is needed — render() replaces the nav
  // (success, error state, or a newer superseding request's render).
  function activate(targetPage) {
    nav.setAttribute('aria-busy', 'true');
    var buttons = nav.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) buttons[i].disabled = true;
    onPageChange(targetPage);
  }

  function appendVisibleLabel(btn, text) {
    var labelEl = document.createElement('span');
    labelEl.className = 'renuvex-pr-pagination-label';
    labelEl.setAttribute('aria-hidden', 'true');
    labelEl.textContent = text;
    btn.appendChild(labelEl);
  }

  function makeArrow(label, glyph, targetPage, disabled) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'renuvex-pr-pagination-arrow';
    btn.setAttribute('aria-label', label);
    appendVisibleLabel(btn, glyph);
    if (disabled) {
      btn.disabled = true;
    } else {
      btn.onclick = function () { activate(targetPage); };
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
    btn.setAttribute('aria-label', 'Sayfa ' + item);
    appendVisibleLabel(btn, String(item));
    if (item === page) {
      btn.setAttribute('aria-current', 'page');
    } else {
      btn.onclick = function () { activate(item); };
    }
    nav.appendChild(btn);
  });

  nav.appendChild(makeArrow('Sonraki sayfa', '›', page + 1, page >= totalPages));

  return nav;
}

// Polite screen-reader announcement for page changes. The live region must
// EXIST before its text changes to be announced reliably, so it lives as a
// persistent direct child of the shadow root (replaceChildren only wipes the
// content wrapper; style/sprite/live-region direct children survive renders).
export function announcePageChange(sRoot, page) {
  if (!sRoot) return;
  var live = sRoot.getElementById && sRoot.getElementById('renuvex-pr-pagination-live');
  if (!live) {
    live = document.createElement('div');
    live.id = 'renuvex-pr-pagination-live';
    live.setAttribute('role', 'status');
    live.setAttribute('aria-live', 'polite');
    // Visually hidden, inline so it never depends on injected CSS.
    live.style.cssText = 'position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;';
    sRoot.appendChild(live);
  }
  live.textContent = 'Sayfa ' + page;
}

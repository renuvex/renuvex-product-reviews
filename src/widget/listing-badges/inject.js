// listing-badges/inject.js — Ürün kartlarına listing badge inject eder

import { extractSlug, starsHTML } from '../core/helpers.js';
import { THEME_LISTING_TITLE_SELECTOR } from '../themes/ozy/listing-selector.js';

var TITLE_CLASS_SELECTOR = '[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]';
var STOCK_LABELS = /^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;
var BADGE_CSS = 'display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;color:#555;pointer-events:none;';

// Bir kart içinde ürün başlığı elementini bulur
export function findTitleEl(scope, productName) {
  // 1. Tema'ya özel doğrulanmış selector — en güvenilir
  var byTheme = scope.querySelector(THEME_LISTING_TITLE_SELECTOR);
  if (byTheme) return byTheme;

  // 2. Genel productTitle/productName class pattern'ı — CSS module temaları
  if (scope.matches && scope.matches(TITLE_CLASS_SELECTOR)) return scope;
  var byClass = scope.querySelector(TITLE_CLASS_SELECTOR);
  if (byClass) return byClass;

  // 3. productName varsa tam text eşleşmesi — styled-components temaları
  if (productName) {
    var all = scope.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      if (all[i].children.length === 0 && all[i].textContent.trim() === productName) return all[i];
    }
  }

  // 4. Yapısal tarama — resim/fiyat olmayan, anlamlı text içeren ilk leaf element
  var candidates = scope.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
  for (var j = 0; j < candidates.length; j++) {
    var cel = candidates[j];
    var text = cel.textContent.trim();
    if (!text || text.length < 2 || text.length > 150) continue;
    if (/^[\d\s.,₺$€£%]+$/.test(text)) continue;
    if (STOCK_LABELS.test(text)) continue;
    if (cel.closest('figure') || cel.closest('picture')) continue;
    if (cel.children.length > 1) continue;
    return cel;
  }
  return null;
}

// Badge DOM elementini oluşturur
export function createBadgeEl(rating, justify) {
  var el = document.createElement('div');
  el.setAttribute('data-ikr-listing-badge', '1');
  el.style.cssText = BADGE_CSS + 'justify-content:' + (justify || 'flex-start') + ';';
  el.innerHTML = starsHTML(rating.avg, null) + '<span>' + rating.avg + ' (' + rating.count + ')</span>';
  return el;
}

// Tek bir <a> linkine badge inject eder
export function injectBadgeOnLink(a, rating, productName, currentSlug) {
  if (a.getAttribute('data-ikr-badge')) return;
  var slug = extractSlug(a.href);

  if (a.id === 'ikr-rating-badge') { a.setAttribute('data-ikr-badge', '1'); return; }
  if (slug === currentSlug && a.getAttribute('href') && a.getAttribute('href').charAt(0) === '#') { a.setAttribute('data-ikr-badge', '1'); return; }
  if (a.closest('header') || a.closest('nav')) { a.setAttribute('data-ikr-badge', '1'); return; }
  if (a.closest('[class*="basket"]') || a.closest('[class*="cart"]')) { a.setAttribute('data-ikr-badge', '1'); return; }
  if (a.closest('.single-product-container-main') && !a.closest('.single-product-product-name')) { a.setAttribute('data-ikr-badge', '1'); return; }

  var hasNestedA = !!a.querySelector('a[href]');
  var realText = Array.from(a.childNodes).filter(function(n) { return n.nodeType === 3; }).map(function(n) { return n.textContent.trim(); }).join('').trim();
  var hasTitleEl = !!findTitleEl(a, productName);

  // Sadece resim içeren anlamsız link → skip
  if (!realText && !hasTitleEl && !hasNestedA) { a.setAttribute('data-ikr-badge', '1'); return; }

  a.setAttribute('data-ikr-badge', '1');

  if (hasNestedA) {
    // Pattern 1 — Tüm kart tek <a> içinde (slider kartı)
    a.querySelectorAll('a[href]').forEach(function(inner) { inner.setAttribute('data-ikr-badge', '1'); });
    var nameEl = findTitleEl(a, productName);
    if (!nameEl || nameEl.querySelector('[data-ikr-listing-badge]')) return;
    var justify = window.getComputedStyle(nameEl).textAlign;
    nameEl.appendChild(createBadgeEl(rating, justify === 'center' ? 'center' : justify === 'right' ? 'flex-end' : 'flex-start'));
    return;
  }

  // Pattern 2/3/4 — Bağımsız link
  var titleEl = findTitleEl(a, productName);
  if (titleEl && titleEl.querySelector('[data-ikr-listing-badge]')) return;

  if (titleEl) {
    var tAlign = window.getComputedStyle(titleEl).textAlign;
    titleEl.appendChild(createBadgeEl(rating, tAlign === 'center' ? 'center' : tAlign === 'right' ? 'flex-end' : 'flex-start'));
  } else {
    // Pattern 3 — direkt text node içeren link
    var badge = createBadgeEl(rating, 'flex-start');
    var first = a.firstElementChild;
    first ? a.insertBefore(badge, first) : a.appendChild(badge);
  }
}

// Quick-view modal badge sistemi — tıklanan kartın slug'ını click anında yakala
var _lastClickedSlug = null;
var _modalBadgeAttached = false;

export function attachModalBadgeListener() {
  if (_modalBadgeAttached) return;
  _modalBadgeAttached = true;
  document.addEventListener('click', function(e) {
    // Tıklanan veya en yakın üst <a href>'i bul
    var a = e.target.closest('a[href]');
    if (!a) return;
    // Basket/cart/header/nav içindeyse yoksay
    if (a.closest('header') || a.closest('nav')) return;
    if (a.closest('[class*="basket"]') || a.closest('[class*="cart"]')) return;
    var slug = extractSlug(a.href);
    if (!slug || slug.length < 3) return;
    _lastClickedSlug = slug;
  }, true); // capture phase — ikas'ın event'lerinden önce çalışır
}

// add-to-basket-modal açıldığında slug ile badge inject eder
function injectModalBadge(slugNameMap, ratings) {
  var modal = document.querySelector('.add-to-basket-modal');
  if (!modal) return;
  var h1 = modal.querySelector('h1.product-name');
  if (!h1 || h1.querySelector('[data-ikr-listing-badge]')) return;

  var slug = null;

  // 1. Click'ten yakalanan slug (kategori/listing sayfası — <a href> tıklandı)
  if (_lastClickedSlug && ratings[_lastClickedSlug]) {
    slug = _lastClickedSlug;
  }

  // 2. Ürün sayfası slug'ı (ürün sayfasındaki <div> buton tıklandı)
  if (!slug) {
    var pageSlug = extractSlug(window.location.pathname);
    if (pageSlug && ratings[pageSlug]) slug = pageSlug;
  }

  // 3. h1 text'ini slugNameMap isimleriyle eşleştir (anasayfa single section)
  if (!slug) {
    var h1Text = h1.textContent.trim();
    Object.keys(slugNameMap).forEach(function(s) {
      if (slug) return;
      var name = slugNameMap[s];
      if (name && name.trim() === h1Text && ratings[s]) slug = s;
    });
  }

  // 4. single-product-container-main içindeki ilk <a href>'den slug al
  if (!slug) {
    var spContainer = document.querySelector('.single-product-container-main');
    if (spContainer) {
      var spLink = spContainer.querySelector('a[href]');
      if (spLink) {
        var s = extractSlug(spLink.href);
        if (s && ratings[s]) slug = s;
      }
    }
  }

  // 5. h1 text'ini sayfadaki <a href> link text'leriyle eşleştir (genel fallback)
  if (!slug) {
    var h1Lower = h1.textContent.trim().toLowerCase();
    document.querySelectorAll('a[href]').forEach(function(a) {
      if (slug) return;
      if (a.closest('header') || a.closest('nav')) return;
      if (a.closest('.single-product-container-main')) return;
      var aText = a.textContent.trim().toLowerCase();
      if (aText && aText === h1Lower) {
        var s2 = extractSlug(a.href);
        if (s2 && ratings[s2]) slug = s2;
      }
    });
  }

  if (!slug || !ratings[slug]) return;
  h1.appendChild(createBadgeEl(ratings[slug], 'flex-start'));
}

// Tüm slug'lar için sayfadaki eşleşen linklere badge inject eder
export function injectBadges(slugNameMap, ratings) {
  var currentSlug = extractSlug(window.location.pathname);
  Object.keys(slugNameMap).forEach(function(slug) {
    var rating = ratings[slug];
    if (!rating) return;
    var productName = slugNameMap[slug];
    document.querySelectorAll('a[href]').forEach(function(a) {
      if (extractSlug(a.href) !== slug) return;
      injectBadgeOnLink(a, rating, productName, currentSlug);
    });
  });
  injectModalBadge(slugNameMap, ratings);
}

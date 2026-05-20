// core/badge.js — Merkezi listing badge factory
// Tüm widgetlar (listing, carousel, popup, modal) bu fonksiyonu kullanır.

import { partialStarsHTML, PARTIAL_STARS_CSS } from './helpers.js';

// Rozet boyut haritası — "Yıldız Rozeti" widget'ındaki badge.size (Küçük/Orta/
// Büyük) için TEK kaynak. Hem PDP başlık rozeti (rating-badge.js) hem listing
// kart rozetleri (listing-badges/index.js) buradan okur; merchant'ın seçimi
// her iki yüzeye de aynı şekilde uygulanır.
export var SIZE_MAP = {
  small:  { icon: 14, text: '12px' },
  medium: { icon: 16, text: '14px' },
  large:  { icon: 20, text: '16px' },
};

// Listing badge CSS — yatay layout + 13px metin. Metin boyutu kart layout'unu
// dar yapmamak için size'a bağlı değil; ikon size'ı SIZE_MAP'ten gelir.
var BADGE_CSS = 'display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;min-height:17px;line-height:17px;font-size:13px;font-weight:400;color:#555;pointer-events:none;';

function buildBadgeStars(rating, iconPair, iconSize) {
  // Yıldız ikonu tek kaynaktan ("Ürün Yorumları" → reviewIcon); çağıran geçirir.
  // İkon boyutu "Yıldız Rozeti" → badge.size'tan (SIZE_MAP) çözülür; çağıran geçirir.
  // Renk .ikr-star-* sınıfları üzerinden --ikr-review-star-color'dan gelir —
  // listing-badges/index.js bu değişkeni kurar (PDP render.js'e bağımlı değil).
  var sizeStyle = 'width:' + iconSize + 'px;height:' + iconSize + 'px;';
  return partialStarsHTML(rating, iconPair, { sizeStyle: sizeStyle });
}

// Listing badge yıldızlarının (.ikr-star / .ikr-stars-partial) CSS'ini bir kez
// enjekte eder. PDP review render'ı bu CSS'i #ikr-styles ile sağlar; ama soğuk
// listing / home / category girişinde PDP yolu hiç çalışmaz. Badge factory'si
// kendi stilini garanti eder — sayfa tipinden ve render.js'ten bağımsız.
// İdempotent; #ikr-styles ile yan yana sorunsuz (kurallar birebir aynı kaynaktan).
function ensureBadgeStyles() {
  if (document.getElementById('ikr-badge-styles')) return;
  var el = document.createElement('style');
  el.id = 'ikr-badge-styles';
  el.textContent = PARTIAL_STARS_CSS;
  document.head.appendChild(el);
}

/**
 * Listing badge DOM elementi oluşturur.
 * @param {{ avg: string, count: number }} rating
 * @param {'flex-start'|'center'|'flex-end'} justify
 * @returns {HTMLElement}
 */
export function createBadgeEl(rating, justify, iconPair, iconSize) {
  ensureBadgeStyles();
  var el = document.createElement('div');
  el.setAttribute('data-ikr-listing-badge', '1');
  el.style.cssText = BADGE_CSS + 'justify-content:' + (justify || 'flex-start') + ';';
  el.innerHTML = buildBadgeStars(rating.avg, iconPair, iconSize) +
    '<span style="font-weight:400;">' + rating.avg + ' (' + rating.count + ')</span>';
  return el;
}

export function createBadgePlaceholderEl(justify) {
  ensureBadgeStyles();
  var el = document.createElement('div');
  el.setAttribute('data-ikr-listing-badge-placeholder', '1');
  el.setAttribute('aria-hidden', 'true');
  el.style.cssText = BADGE_CSS + 'justify-content:' + (justify || 'flex-start') + ';visibility:hidden;';
  return el;
}

// core/badge.js — Merkezi listing badge factory
// Tüm widgetlar (listing, carousel, popup, modal) bu fonksiyonu kullanır.

import { partialStarsHTML, PARTIAL_STARS_CSS } from './helpers.js';

// Rozet boyut haritası — "Yıldız Rozeti" widget'ındaki badge.size (Küçük/Orta/
// Büyük) için TEK kaynak. Hem PDP başlık rozeti (rating-badge.js) hem listing
// kart rozetleri (listing-badges/index.js) buradan okar; merchant'ın seçimi
// ikon ve metin boyutuna aynı anda uygulanır. Yüzeye özel olan tek şey çevre
// boşlukları (gap/margin) — bunlar dar kart vs. ferah PDP başlığı için farklı.
export var SIZE_MAP = {
  small:  { icon: 14, text: '12px' },
  medium: { icon: 16, text: '14px' },
  large:  { icon: 20, text: '16px' },
};

// Layout (display, align, gap, margin, line-height, color, font-weight,
// font-family/letter-spacing reset, pointer-events) PR-2'den itibaren
// .ikr-rating-badge + .ikr-rating-badge--listing class'larından okunuyor
// (PARTIAL_STARS_CSS içinde tanımlı). Inline'da sadece per-mount dinamik
// (justify-content) ve sizing (font-size) kalır; sizing PR-3'te component-
// scope CSS variable'a taşınacak.

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
 * @param {{ filled: string, empty: string }} iconPair
 * @param {number} iconSize   SIZE_MAP[size].icon
 * @param {string} textSize   SIZE_MAP[size].text (örn. '14px')
 * @returns {HTMLElement}
 */
export function createBadgeEl(rating, justify, iconPair, iconSize, textSize) {
  ensureBadgeStyles();
  var el = document.createElement('div');
  el.className = 'ikr-rating-badge ikr-rating-badge--listing';
  el.setAttribute('role', 'figure');
  el.setAttribute('aria-label', rating.avg + ' üzerinden 5 yıldız, ' + rating.count + ' yorum');
  // data-ikr-listing-badge legacy (observer / cleanup / placeholder lookups);
  // data-ikr-* yeni — surface debug + CSS hook (ADR_0017 draft).
  el.setAttribute('data-ikr-listing-badge', '1');
  el.setAttribute('data-ikr-surface', 'listing');
  el.setAttribute('data-ikr-rating', String(rating.avg));
  el.setAttribute('data-ikr-count', String(rating.count));
  el.style.cssText = 'font-size:' + textSize + ';justify-content:' + (justify || 'flex-start') + ';';

  // Stars: existing engine returns trusted SVG markup from a closed icon set;
  // insertAdjacentHTML is the public, mutation-observer-friendly DOM API.
  el.insertAdjacentHTML('beforeend', buildBadgeStars(rating.avg, iconPair, iconSize));

  var labelEl = document.createElement('span');
  labelEl.className = 'ikr-rating-badge__label';
  labelEl.textContent = rating.avg + ' (' + rating.count + ')';
  el.appendChild(labelEl);

  return el;
}

export function createBadgePlaceholderEl(justify, textSize) {
  ensureBadgeStyles();
  var el = document.createElement('div');
  el.className = 'ikr-rating-badge ikr-rating-badge--listing';
  el.setAttribute('data-ikr-listing-badge-placeholder', '1');
  el.setAttribute('aria-hidden', 'true');
  el.style.cssText = 'font-size:' + textSize + ';justify-content:' + (justify || 'flex-start') + ';visibility:hidden;';
  return el;
}

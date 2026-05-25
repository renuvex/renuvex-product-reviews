// core/badge.js — Merkezi listing badge factory
// Tüm widgetlar (listing, carousel, popup, modal) bu fonksiyonu kullanır.

import { partialStarsHTML, PARTIAL_STARS_CSS, buildRatingA11yLabel } from './helpers.js';
import { createOwnedSlot, setSlotContext } from './slot.js';

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
// .renuvex-pr-rating-badge + .renuvex-pr-rating-badge--listing class'larından okunuyor.
// PR-3'ten itibaren sizing (icon px + text px) component-scope CSS variable
// (--renuvex-pr-badge-icon-size, --renuvex-pr-badge-text-size) ile akıyor: PARTIAL_STARS_CSS
// default'ları .renuvex-pr-rating-badge'de tanımlar; ensureBadgeTokens(sizes) merchant
// seçimini scoped class-selector ile (`#renuvex-pr-badge-tokens` style etiketi)
// override eder. Inline kalan tek şey per-mount dinamik justify-content.

function buildBadgeStars(rating, iconPair) {
  // Yıldız ikonu tek kaynaktan ("Ürün Yorumları" → reviewIcon); çağıran geçirir.
  // Yıldız boyutu .renuvex-pr-rating-badge .renuvex-pr-star { width:var(--renuvex-pr-badge-icon-size) }
  // ile CSS variable'dan okunuyor — sizeStyle artık geçilmez (inline boş).
  // Renk .renuvex-pr-star-* sınıfları üzerinden --renuvex-pr-review-star-color'dan gelir.
  return partialStarsHTML(rating, iconPair);
}

// ensureBadgeTokens — merchant'ın seçtiği boyutu component-scope CSS variable
// olarak yazar. Idempotent: aynı `<style id="renuvex-pr-badge-tokens">` etiketinin
// textContent'i her settings okumasında yeniden kurulur (yeni etiket eklenmez).
// Scope `.renuvex-pr-rating-badge` class selector — `:root` namespace bozulmaz.
// `mobileSizes` opsiyonel; verilirse `@media (max-width: 640px)` bloğu yazılır
// (PR-4'te admin mobileOverride toggle'ı buraya bağlanır).
export function ensureBadgeTokens(sizes, mobileSizes) {
  if (!sizes || typeof sizes.icon !== 'number' || typeof sizes.text !== 'string') return;
  var el = document.getElementById('renuvex-pr-badge-tokens');
  if (!el) {
    el = document.createElement('style');
    el.id = 'renuvex-pr-badge-tokens';
    document.head.appendChild(el);
  }
  var desktopRule = '.renuvex-pr-rating-badge{--renuvex-pr-badge-icon-size:' + sizes.icon + 'px;--renuvex-pr-badge-text-size:' + sizes.text + ';}';
  var mobileRule = '';
  if (mobileSizes && typeof mobileSizes.icon === 'number' && typeof mobileSizes.text === 'string') {
    mobileRule = '@media (max-width:640px){.renuvex-pr-rating-badge{--renuvex-pr-badge-icon-size:' + mobileSizes.icon + 'px;--renuvex-pr-badge-text-size:' + mobileSizes.text + ';}}';
  }
  el.textContent = desktopRule + mobileRule;
}

// Listing badge yıldızlarının (.renuvex-pr-star / .renuvex-pr-stars-partial) CSS'ini bir kez
// enjekte eder. PDP review render'ı bu CSS'i #renuvex-pr-styles ile sağlar; ama soğuk
// listing / home / category girişinde PDP yolu hiç çalışmaz. Badge factory'si
// kendi stilini garanti eder — sayfa tipinden ve render.js'ten bağımsız.
// İdempotent; #renuvex-pr-styles ile yan yana sorunsuz (kurallar birebir aynı kaynaktan).
function ensureBadgeStyles() {
  if (document.getElementById('renuvex-pr-badge-styles')) return;
  var el = document.createElement('style');
  el.id = 'renuvex-pr-badge-styles';
  el.textContent = PARTIAL_STARS_CSS;
  document.head.appendChild(el);
}

/**
 * Listing badge DOM elementi oluşturur.
 * @param {{ avg: string, count: number }} rating
 * @param {'flex-start'|'center'|'flex-end'} justify
 * @param {{ filled: string, empty: string }} iconPair
 * @returns {HTMLElement}
 */
export function createBadgeEl(rating, justify, iconPair) {
  ensureBadgeStyles();
  var meta = arguments[3] || {};
  var slot = createOwnedSlot({
    slot: 'listing-rating',
    className: 'renuvex-pr-listing-badge-slot',
    context: { surface: 'listing', slug: meta.slug || '', productId: meta.productId || '' },
  });
  slot.setAttribute('data-renuvex-listing-badge', '1');

  var el = document.createElement('div');
  el.className = 'renuvex-pr-rating-badge renuvex-pr-rating-badge--listing';
  // Non-interactive figure; accessible name from a real sr-only text node
  // (aria-labelledby) instead of aria-label — translation-tool friendly.
  var a11y = buildRatingA11yLabel(rating.avg, rating.count);
  el.setAttribute('role', 'figure');
  el.setAttribute('aria-labelledby', a11y.id);
  // data-renuvex-listing-badge legacy (observer / cleanup / placeholder lookups);
  // data-renuvex-* yeni — surface debug + CSS hook (ADR_0017 draft).
  el.setAttribute('data-renuvex-listing-badge', '1');
  el.setAttribute('data-renuvex-surface', 'listing');
  el.setAttribute('data-renuvex-rating', String(rating.avg));
  el.setAttribute('data-renuvex-count', String(rating.count));
  setSlotContext(el, { surface: 'listing', slug: meta.slug || '', productId: meta.productId || '' });
  // Alignment via data-attr + CSS (Loox-style) instead of an inline style.
  // font-size + icon size come from .renuvex-pr-rating-badge CSS variables.
  var alignMap = { 'center': 'center', 'flex-end': 'right', 'flex-start': 'left' };
  el.setAttribute('data-renuvex-align', alignMap[justify] || 'left');

  // Stars: existing engine returns trusted SVG markup from a closed icon set;
  // insertAdjacentHTML is the public, mutation-observer-friendly DOM API. The
  // sr-only label is inserted first so aria-labelledby resolves to it.
  el.insertAdjacentHTML('beforeend', a11y.html + buildBadgeStars(rating.avg, iconPair));

  var labelEl = document.createElement('span');
  labelEl.className = 'renuvex-pr-rating-badge__label';
  labelEl.textContent = rating.avg + ' (' + rating.count + ')';
  el.appendChild(labelEl);

  slot.appendChild(el);
  return slot;
}

export function createBadgePlaceholderEl(justify) {
  ensureBadgeStyles();
  var meta = arguments[1] || {};
  var el = createOwnedSlot({
    slot: 'listing-rating-placeholder',
    className: 'renuvex-pr-listing-badge-slot renuvex-pr-rating-badge renuvex-pr-rating-badge--listing',
    context: { surface: 'listing', slug: meta.slug || '', productId: meta.productId || '' },
  });
  el.setAttribute('data-renuvex-listing-badge-placeholder', '1');
  el.setAttribute('aria-hidden', 'true');
  el.style.cssText = 'justify-content:' + (justify || 'flex-start') + ';visibility:hidden;';
  return el;
}

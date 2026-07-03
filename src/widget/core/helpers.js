// helpers.js — Genel yardımcı fonksiyonlar

import { renderStarRow, getIconFromSettings } from '../icons/index.js';
import { ensureStarSprite, starUseSvg } from '../icons/star-sprite.js';
import { PUBLIC_API_KEY } from './config.js';

export var SYSTEM_SLUGS = /^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;

export function settingText(value, fallback) {
  var text = typeof value === 'string' ? value.trim() : '';
  return text || fallback;
}

export function extractSlug(url) {
  try {
    return new URL(url, window.location.origin).pathname.replace(/^\//, '').split('?')[0].split('/')[0];
  } catch (_) { return ''; }
}

// starsHTML(rating, settings) — SVG yıldız satırı üretir.
// settings'teki reviewIcon'a göre ICONS registry'sinden SVG alır.
// Boyut parent CSS (.renuvex-pr-review-stars, .renuvex-pr-modal-stars vb.) tarafından verilir.
export function starsHTML(rating, settings) {
  var rounded = Math.round(parseFloat(rating)) || 0;
  // role=img + aria-label: review cards / modal have no other rating text, so the
  // star row carries the accessible name. Inner star svgs stay aria-hidden.
  // Layout + renk artık .renuvex-pr-stars class'ından gelir (inline style yok).
  return '<span class="renuvex-pr-stars" role="img" aria-label="' + rounded + ' üzerinden 5 yıldız">' +
    renderStarRow(rating, settings) +
    '</span>';
}

// partialStarsHTML(rating, iconPair, opts) — Ortalama puan için yarım yıldız desteği.
// Bireysel yıldız + clip-path mimarisi. Her yıldız bağımsız .renuvex-pr-star kapsayıcısı.
// Half state'inde tek filled SVG iki katmanda kullanılır (alt boş-renk, üst dolu-renk
// + clip-path:inset(0 50% 0 0) ile sol yarı). Tek path → geometri uyumsuzluğu
// fiziksel olarak imkânsız (kare/kalp ikonlarında bile tam ortadan simetrik bölünür).
// Material UI Rating decimal mode + react-stars + Industry pattern.
//
//   rating   : float (ör 4.3, 4.5, 5.0)
//   iconPair : { filled, empty } — getIconFromSettings'ten gelen SVG çifti
//   opts     : { sizeStyle? } — inline 'width:Xpx;height:Xpx;' (opsiyonel, normalde CSS'ten gelir)
export function partialStarsHTML(rating, iconPair, opts) {
  var pair = iconPair && iconPair.filled && iconPair.empty ? iconPair : getIconFromSettings({ reviewIcon: 'star' });
  ensureStarSprite(pair);
  var r = Math.max(0, Math.min(5, parseFloat(rating) || 0));
  // 0.25/0.75 snap — endüstri standardı (Material UI, Judge.me, Stamped):
  // her yıldız için kesir < 0.25 → boş, 0.25-0.74 → yarım, ≥ 0.75 → dolu.
  // %10 gibi belirsiz dolguları temizler, görsel netlik sağlar.
  var whole = Math.floor(r);
  var frac = r - whole;
  var snapped = frac < 0.25 ? whole : (frac < 0.75 ? whole + 0.5 : whole + 1);
  var sizeStyle = (opts && opts.sizeStyle) || '';
  var st = sizeStyle ? ' style="' + sizeStyle + '"' : '';

  var html = '';
  for (var i = 1; i <= 5; i++) {
    var state =
      i <= snapped              ? 'full'
      : (i - 0.5 === snapped)   ? 'half'
                                : 'empty';

    if (state === 'full') {
      html += '<span class="renuvex-pr-star renuvex-pr-star-full"' + st + '>'
            +   starUseSvg('full')
            + '</span>';
    } else if (state === 'empty') {
      // Tam-state empty: outline mimarisi korunuyor (filled+gri değil, outline SVG).
      html += '<span class="renuvex-pr-star renuvex-pr-star-empty"' + st + '>'
            +   starUseSvg('outline')
            + '</span>';
    } else { // half
      // Tek geometri iki katmanda: alt boş-renk (outline), üst dolu-renk + clip sol %50.
      // clip-path .renuvex-pr-star-half-fg span'ine uygulanır; <use> ile tam uyumlu.
      html += '<span class="renuvex-pr-star renuvex-pr-star-half"' + st + '>'
            +   '<span class="renuvex-pr-star-half-bg">' + starUseSvg('outline') + '</span>'
            +   '<span class="renuvex-pr-star-half-fg">' + starUseSvg('full') + '</span>'
            + '</span>';
    }
  }

  // Wrapper is decorative — the container (badge/summary) provides the accessible
  // name; individual star svgs are aria-hidden too (see starUseSvg).
  return '<span class="renuvex-pr-stars-partial" aria-hidden="true">' + html + '</span>';
}

// buildRatingA11yLabel — visually-hidden accessible label for a rating control.
// Returns { id, html }: the html is a `.renuvex-pr-sr-only` <span> carrying the rating
// sentence as REAL text (translation-tool friendly, unlike aria-label), to be
// referenced by the container's aria-labelledby. (Adopted from Yotpo's a11y.)
// Unique id per instance so multiple ratings on one page never collide.
export function buildRatingA11yLabel(avg, count) {
  var id = 'renuvex-pr-rating-label-' + Math.random().toString(36).slice(2, 9);
  var hasCount = count !== undefined && count !== null && count !== '';
  var text = hasCount
    ? avg + ' üzerinden 5 yıldız, ' + count + ' yorum'
    : avg + ' üzerinden 5 yıldız';
  return { id: id, html: '<span class="renuvex-pr-sr-only" id="' + id + '">' + text + '</span>' };
}

// PARTIAL_STARS_CSS — partialStarsHTML çıktısının (.renuvex-pr-star / .renuvex-pr-stars-partial)
// eşleşen CSS'i. HTML üretici ile tek bir HTML+CSS çiftidir. Hem CLASSIC_CSS
// (PDP review render'ının #renuvex-pr-styles'ı) hem core/badge.js (#renuvex-pr-badge-styles)
// bu sabiti tüketir — tek doğruluk kaynağı, iki kopya asla ayrışamaz.
export var PARTIAL_STARS_CSS = `  /* ─── PARTIAL STARS (bireysel star + clip-path) ───────────────────────
     Her yıldız bağımsız .renuvex-pr-star kapsayıcısında. Half state'te tek filled
     geometri iki katmanda: alt katman boş-renk full, üst katman dolu-renk
     + clip-path:inset(0 50% 0 0) ile sol %50. Tek SVG path kullanıldığı
     için kare/kalp ikonlarında bile geometri uyumsuzluğu fiziksel olarak
     imkânsız. Material UI Rating decimal mode + react-stars pattern. */
  .renuvex-pr-stars-partial{display:inline-flex;gap:2px;align-items:center;line-height:1;}
  .renuvex-pr-star{
    position:relative;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    flex-shrink:0;
    line-height:1;
  }
  .renuvex-pr-star > svg{width:100%;height:100%;display:block;}
  /* Sprite-based star svg — references #renuvex-pr-icon-sprite symbols via <use href>. */
  .renuvex-pr-star-svg{width:100%;height:100%;display:block;}
  /* Visually-hidden accessible label (screen-reader only). */
  .renuvex-pr-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}
  .renuvex-pr-star-full  { color: var(--renuvex-pr-review-star-color, #f59e0b); }
  .renuvex-pr-star-empty { color: var(--renuvex-pr-review-star-color, #f59e0b); }
  /* Half: iki katman, üst katman clip ile sol %50. */
  .renuvex-pr-star-half-bg,
  .renuvex-pr-star-half-fg{
    position:absolute;
    inset:0;
    display:inline-flex;
    align-items:center;
    justify-content:center;
  }
  .renuvex-pr-star-half-bg{ color: var(--renuvex-pr-review-star-color, #f59e0b); }
  .renuvex-pr-star-half-fg{
    color: var(--renuvex-pr-review-star-color, #f59e0b);
    -webkit-clip-path: inset(0 50% 0 0);
            clip-path: inset(0 50% 0 0);
  }
  .renuvex-pr-star-half-bg > svg,
  .renuvex-pr-star-half-fg > svg{width:100%;height:100%;display:block;}

  /* ─── BADGE BASE (PR-2 — class-based layout + a11y + theme reset) ─────────
     Sizing token'ları (icon px, text px) PR-3'ten itibaren component-scope
     CSS variable'ı: --renuvex-pr-badge-icon-size, --renuvex-pr-badge-text-size. Default'lar
     .renuvex-pr-rating-badge'de tanımlı (small'a denk gelmez — admin'de seçili size'a
     uyacak şekilde core/badge.js → ensureBadgeTokens runtime'da override eder).
     Tipografi reset (font-family:inherit / letter-spacing:normal /
     text-transform:none) parent h2'den miras kaçışını keser.

     DEFENSIVE !important POLICY (2026-05-27 audit follow-up):
       Badges stay in light DOM by design (ADR_0017: must inherit theme
       typography). That means host-theme selectors CAN target our elements.
       Loox-style 'all: revert' would break ADR_0017's typography inherit, so
       we use surgical !important instead on layout-critical + link styling.
       - LAYOUT props (display, align-items, line-height, font-size, color,
         gaps, margins): !important so host themes cannot accidentally break
         badge geometry with broad rules like '.some-class img{}' or
         'a{line-height:1!important}'.
       - TYPOGRAPHY (font-family): NO !important — must stay inheritable so
         badge picks up theme font (ADR_0017 contract). letter-spacing /
         text-transform: !important because they are reset values, not
         inheritance hooks.
       - LINK STATES (.--pdp variant is an <a>): explicit
         text-decoration:none and color reset on :link/:visited/:hover/:focus/
         :active. Host rules like 'a{text-decoration:underline}' and
         'a:hover{color:red}' are extremely common; without this hardening the
         badge link would flicker/underline in most merchant themes.
       - STAR SIZING inside badge: !important so host 'img{width:100%}'-class
         rules cannot blow up the SVG (we use SVG not img, but defensive belt). */
  .renuvex-pr-rating-badge{
    --renuvex-pr-badge-icon-size:16px;
    --renuvex-pr-badge-text-size:14px;
    display:flex !important;
    align-items:center !important;
    line-height:1.3 !important;
    font-size:var(--renuvex-pr-badge-text-size) !important;
    font-weight:400 !important;
    color:#555 !important;
    font-family:inherit;
    letter-spacing:normal !important;
    text-transform:none !important;
  }
  .renuvex-pr-rating-badge--pdp{
    gap:5px !important;
    margin-bottom:10px !important;
    text-decoration:none !important;
    cursor:pointer !important;
  }
  /* PDP badge is an <a>. Host themes frequently style <a> with underline,
     color overrides, and hover/visited rules; defeat all of them so the
     badge stays visually consistent across themes. */
  .renuvex-pr-rating-badge--pdp:link,
  .renuvex-pr-rating-badge--pdp:visited,
  .renuvex-pr-rating-badge--pdp:hover,
  .renuvex-pr-rating-badge--pdp:focus,
  .renuvex-pr-rating-badge--pdp:active{
    text-decoration:none !important;
    color:#555 !important;
  }
  .renuvex-pr-rating-badge--listing{
    gap:3px !important;
    margin-top:0 !important;
    margin-bottom:4px !important;
    pointer-events:none !important;
  }
  /* Alignment via data-attr (Loox-style data-alignment) — replaces per-mount
     inline justify-content style on the badge. */
  .renuvex-pr-rating-badge[data-renuvex-align="left"]{justify-content:flex-start !important;}
  .renuvex-pr-rating-badge[data-renuvex-align="center"]{justify-content:center !important;}
  .renuvex-pr-rating-badge[data-renuvex-align="right"]{justify-content:flex-end !important;}
  /* Badge scope'undaki yıldızlar variable'dan boyut alır; dışarıdaki .renuvex-pr-star
     (summary, modal vs.) ayrı kalır — selector specificity ile çakışmaz.
     !important here defeats any host rule targeting badge SVG / star elements. */
  .renuvex-pr-rating-badge .renuvex-pr-star{
    width:var(--renuvex-pr-badge-icon-size) !important;
    height:var(--renuvex-pr-badge-icon-size) !important;
  }
  .renuvex-pr-rating-badge .renuvex-pr-star > svg,
  .renuvex-pr-rating-badge .renuvex-pr-star-svg{
    width:100% !important;
    height:100% !important;
    max-width:none !important;
    max-height:none !important;
  }`;

export function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
}

var AWS_REVIEW_IMAGE_PUBLIC_HOST = 'media.renuvex.app';
var AWS_REVIEW_IMAGE_VARIANTS = {
  w200: true,
  w300: true,
  w400: true,
  w600: true,
  w1200: true,
  thumb_320x427: true,
  thumb_640x854: true,
};

function normalizeReviewImageStoreId(storeId) {
  var normalizedStoreId = typeof storeId === 'string' ? storeId.trim() : '';
  return /^[A-Za-z0-9_-]{1,128}$/.test(normalizedStoreId) ? normalizedStoreId : '';
}

function isPreviewPlaceholderImage(url) {
  return typeof window !== 'undefined' &&
    window.__ikasPreviewMode === true &&
    url.protocol === 'https:' &&
    url.hostname === 'placehold.co' &&
    !url.search &&
    !url.hash &&
    /\.(png|jpe?g|webp|gif|avif)$/i.test(url.pathname);
}

function isTrustedAwsReviewImageUrl(url) {
  if (!url || url.protocol !== 'https:' || url.hostname !== AWS_REVIEW_IMAGE_PUBLIC_HOST || url.username || url.password || url.port || url.search || url.hash) return false;
  var lowerPath = url.pathname.toLowerCase();
  if (lowerPath.indexOf('%2f') !== -1 || lowerPath.indexOf('%5c') !== -1) return false;
  var parts = url.pathname.split('/').filter(Boolean);
  var trustedStoreId = normalizeReviewImageStoreId(PUBLIC_API_KEY);
  if (!trustedStoreId || parts.length !== 9) return false;
  if (
    parts[0] !== 'review-images' ||
    parts[1] !== 'v1' ||
    parts[2] !== 'public' ||
    parts[3] !== 'stores' ||
    parts[4] !== trustedStoreId ||
    parts[5] !== 'assets' ||
    !/^[0-9a-f-]{36}$/i.test(parts[6]) ||
    parts[7] !== 'variants'
  ) {
    return false;
  }
  var file = parts[8].split('.');
  return file.length === 2 && AWS_REVIEW_IMAGE_VARIANTS[file[0]] === true && (file[1] === 'webp' || file[1] === 'jpeg');
}

export function isTrustedReviewImageUrl(value) {
  if (typeof value !== 'string') return false;
  var raw = value.trim();
  if (!raw || raw.length > 2048) return false;

  var url;
  try {
    url = new URL(raw);
  } catch (_) {
    return false;
  }

  if (isPreviewPlaceholderImage(url)) return true;
  if (isTrustedAwsReviewImageUrl(url)) return true;
  return false;
}

export function getTrustedReviewImages(review) {
  var images = review && review.images && Array.isArray(review.images) ? review.images : [];
  var trusted = [];
  images.forEach(function(url) {
    if (!isTrustedReviewImageUrl(url)) return;
    var normalized = url.trim();
    if (trusted.indexOf(normalized) === -1) trusted.push(normalized);
  });
  return trusted;
}

export function getFirstTrustedReviewImage(review) {
  var images = getTrustedReviewImages(review);
  return images.length ? images[0] : null;
}

// Sabitler — anlamlı isimle hangi çağrı yerine ait olduğunu belgeler. ADR_0007 ve [[Media_Gallery]].
export var REVIEW_MEDIA_THUMB_WIDTH = 300;  // media gallery + card/list thumbnail (90-140 px display, retina yedeği)
export var GALLERY_TILE_WIDTH = 600;        // gallery masonry tile (200-400 px display, retina yedeği)
export var LIGHTBOX_MINI_THUMB_WIDTH = 200; // lightbox altı mini görsel şeridi (60-80 px display)
export var LIGHTBOX_MAIN_WIDTH = 1200;      // lightbox ana görsel + preload (default)
// CSS eksik/gecikmişse tarayıcının kullanacağı intrinsic display fallback.
// Bunlar CDN transform kalite genişlikleri değildir; source* ile karıştırılmamalı.
export var REVIEW_MEDIA_DISPLAY_FALLBACK_WIDTH = 110;
export var REVIEW_MEDIA_DISPLAY_FALLBACK_SQUARE_HEIGHT = 110;
export var REVIEW_MEDIA_DISPLAY_FALLBACK_PORTRAIT_HEIGHT = 147;

export function optimizeImageUrl(url, width) {
  return url || '';
}

// Responsive image attribute builder — `<img src srcset>` çifti üretir.
// 1x: baseWidth, 2x: baseWidth × 2. Tarayıcı DPR'ye göre otomatik seçer.
// AWS variants are pre-generated; fallback URLs use the same URL for both density slots.
// Kullanım:
//   var attrs = buildResponsiveImgAttrs(url, REVIEW_MEDIA_THUMB_WIDTH);
//   img.src = attrs.src; img.srcset = attrs.srcset;
export function buildResponsiveImgAttrs(url, baseWidth) {
  if (!url) return { src: '', srcset: '' };
  var w1 = (typeof baseWidth === 'number' && baseWidth > 0) ? Math.round(baseWidth) : LIGHTBOX_MAIN_WIDTH;
  var w2 = w1 * 2;
  var src1 = optimizeImageUrl(url, w1);
  var src2 = optimizeImageUrl(url, w2);
  return { src: src1, srcset: src1 + ' 1x, ' + src2 + ' 2x' };
}

// Image error fallback — endüstri standardı graceful degradation pattern.
// `<img>` 404 / network error / CDN outage / user-side block durumlarında
// browser default kırık-image ikonu yerine caller'ın verdiği fallback'i çalıştırır.
// Dahili handled guard ile tek sefer fire eder.
// console.warn DevTools görünürlüğü sağlar; ileride Sentry/observability eklenirse
// otomatik yakalanır (Sentry browser SDK console.* hook'larını dinler).
export function attachImageErrorHandler(img, onFail) {
  if (!img || typeof img.addEventListener !== 'function') return;
  var handled = false;
  function handleError() {
    if (handled) return;
    handled = true;
    img.removeEventListener('error', handleError);
    var src = img.currentSrc || img.getAttribute('src') || '';
    console.warn('[renuvex-pr] image failed to load:', src);
    if (typeof onFail === 'function') {
      try { onFail(img); } catch (_) {}
    }
  }
  img.addEventListener('error', handleError);
  if (img.complete && img.naturalWidth === 0 && (img.currentSrc || img.getAttribute('src'))) {
    handleError();
  }
}

// Convenience: thumbnail-style fallback — kırık görseli DOM'da gizler.
// Strip, kart, liste, gallery thumbnail'leri ve lightbox alt mini şerit için
// uygun davranış. Flex/grid container'da gizlenen thumbnail'in boşluğu otomatik
// kapanır, kırık-ikon görünmez.
export function hideOnImageError(img) {
  attachImageErrorHandler(img, function (el) { el.style.display = 'none'; });
}

export function buildReviewImageAttrs(item, baseWidth) {
  var fallbackUrl = item && (item.url || item.thumbnailUrl);
  var variants = item && Array.isArray(item.variants) ? item.variants.slice() : [];
  if (!variants.length) return buildResponsiveImgAttrs(fallbackUrl, baseWidth);
  var w1 = (typeof baseWidth === 'number' && baseWidth > 0) ? Math.round(baseWidth) : LIGHTBOX_MAIN_WIDTH;
  var w2 = w1 * 2;
  var webp = variants.filter(function (variant) { return variant && variant.format === 'webp' && typeof variant.width === 'number' && variant.url; })
    .sort(function (a, b) { return a.width - b.width; });
  var jpeg = variants.filter(function (variant) { return variant && variant.format === 'jpeg' && typeof variant.width === 'number' && variant.url; })
    .sort(function (a, b) { return a.width - b.width; });
  var preferred = webp.length ? webp : jpeg;
  function pick(width) {
    for (var i = 0; i < preferred.length; i++) {
      if (preferred[i].width >= width) return preferred[i].url;
    }
    return preferred.length ? preferred[preferred.length - 1].url : '';
  }
  var src1 = pick(w1);
  var src2 = pick(w2) || src1;
  if (!src1) return buildResponsiveImgAttrs(fallbackUrl, baseWidth);
  return { src: src1, srcset: src1 + ' 1x, ' + src2 + ' 2x' };
}

// renderStars / ensureStarStyles / STAR_COLOR removed during the Shadow DOM
// migration. The new wizard step-rating builds its own button-based stars in
// reviews-section/review-form-modal/steps/step-rating.js; head-injected CSS
// from the old helpers would not reach inside a shadow root anyway.

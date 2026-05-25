// helpers.js — Genel yardımcı fonksiyonlar

/* global __RENUVEX_PR_DEFAULT_CLOUDINARY_CLOUD_NAME__ */

import { renderStarRow, getIconFromSettings } from '../icons/index.js';
import { ensureStarSprite, starUseSvg } from '../icons/star-sprite.js';
import { PUBLIC_API_KEY } from './config.js';

// Tüm yıldızlar (dolu + boş outline) için tek CSS renk değişkeni — reviews
// widget ayarından (reviewStarColor) beslenir. Boş yıldız aynı renkte outline.
export var STAR_COLOR = 'var(--renuvex-pr-review-star-color,#f59e0b)';

export var SYSTEM_SLUGS = /^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;

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
  ensureStarSprite(iconPair);
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
     text-transform:none) parent h2'den miras kaçışını keser. */
  .renuvex-pr-rating-badge{
    --renuvex-pr-badge-icon-size:16px;
    --renuvex-pr-badge-text-size:14px;
    display:flex;
    align-items:center;
    line-height:1.3;
    font-size:var(--renuvex-pr-badge-text-size);
    font-weight:400;
    color:#555;
    font-family:inherit;
    letter-spacing:normal;
    text-transform:none;
  }
  .renuvex-pr-rating-badge--pdp{
    gap:5px;
    margin-bottom:10px;
    text-decoration:none;
    cursor:pointer;
  }
  .renuvex-pr-rating-badge--listing{
    gap:3px;
    margin-top:0;
    margin-bottom:4px;
    pointer-events:none;
  }
  /* Alignment via data-attr (Loox-style data-alignment) — replaces per-mount
     inline justify-content style on the badge. */
  .renuvex-pr-rating-badge[data-renuvex-align="left"]{justify-content:flex-start;}
  .renuvex-pr-rating-badge[data-renuvex-align="center"]{justify-content:center;}
  .renuvex-pr-rating-badge[data-renuvex-align="right"]{justify-content:flex-end;}
  /* Badge scope'undaki yıldızlar variable'dan boyut alır; dışarıdaki .renuvex-pr-star
     (summary, modal vs.) ayrı kalır — selector specificity ile çakışmaz. */
  .renuvex-pr-rating-badge .renuvex-pr-star{
    width:var(--renuvex-pr-badge-icon-size);
    height:var(--renuvex-pr-badge-icon-size);
  }`;

export function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
}

// 6-char (#rrggbb) veya 8-char (#rrggbbaa) hex. 8-char gelirse alpha yoksayilir
// (bu fonksiyon sadece RGB kanallari lazim — caller opacity uygulayacak).
function hexToRgb(hex) {
  var m = /^#([0-9A-Fa-f]{6})([0-9A-Fa-f]{2})?$/.exec(hex);
  if (!m) return null;
  return [parseInt(m[1].slice(0,2),16), parseInt(m[1].slice(2,4),16), parseInt(m[1].slice(4,6),16)];
}

export function applyWidgetColor(color) {
  // react-colorful 8-char hex (#rrggbbaa) gonderebilir — kabul et.
  var validColor = /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(color) ? color : '#111111';
  document.documentElement.style.setProperty('--renuvex-pr-color', validColor);
  document.documentElement.style.setProperty('--renuvex-pr-color', validColor);
  var rgb = hexToRgb(validColor);
  document.documentElement.style.setProperty('--renuvex-pr-color-light', rgb ? 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',0.07)' : 'rgba(17,17,17,0.07)');
  document.documentElement.style.setProperty('--renuvex-pr-color-light', rgb ? 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',0.07)' : 'rgba(17,17,17,0.07)');
}

export function injectStyles(_color, css) {
  var el = document.getElementById('renuvex-pr-styles');
  if (!el) {
    el = document.createElement('style');
    el.id = 'renuvex-pr-styles';
    document.head.appendChild(el);
  }
  el.textContent = (css);
  // applyWidgetColor removed — --renuvex-pr-color and --renuvex-pr-color-light are no longer
  // used by styles.js. All color surfaces now use their own specific variables.
}

var REVIEW_IMAGE_ALLOWED_EXT = { jpg: true, jpeg: true, png: true, webp: true, gif: true, avif: true };
var REVIEW_IMAGE_ROOT_FOLDER = 'review_images';
var REVIEW_IMAGE_TENANT_FOLDER = 'stores';

function normalizeReviewImageCloudName(cloudName) {
  var normalizedCloudName = typeof cloudName === 'string' ? cloudName.trim() : '';
  return /^[A-Za-z0-9_-]+$/.test(normalizedCloudName) ? normalizedCloudName : '';
}

function normalizeReviewImageStoreId(storeId) {
  var normalizedStoreId = typeof storeId === 'string' ? storeId.trim() : '';
  return /^[A-Za-z0-9_-]{1,128}$/.test(normalizedStoreId) ? normalizedStoreId : '';
}

// Trusted Cloudinary cloud name — ADR_0008 gereği build-time'da bir kez set edilir,
// runtime'da değişmez. scripts/build-widget.mjs `__RENUVEX_PR_DEFAULT_CLOUDINARY_CLOUD_NAME__`
// sabitini bundle'a inject eder (env: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME). Settings
// endpoint artık `imagePolicy` field'ı taşımaz; cloud name app-level config'tir,
// merchant-level değildir. Eğer bu sabit boşsa deploy config hatası vardır — modül
// yüklenirken bir kez error log basılır, sonra runtime'da fail-closed davranılır.
var trustedReviewImageCloudName = normalizeReviewImageCloudName(
  typeof __RENUVEX_PR_DEFAULT_CLOUDINARY_CLOUD_NAME__ === 'string'
    ? __RENUVEX_PR_DEFAULT_CLOUDINARY_CLOUD_NAME__
    : ''
);

if (!trustedReviewImageCloudName) {
  console.error('[renuvex-pr] NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is missing at build time; review images will be hidden until widget is rebuilt with a valid cloud name.');
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
  // Build-time inject boşsa modül yüklenirken zaten error loglandı; burada
  // sessizce fail-closed davran (UI'de görsel görünmez, log spam'i yok).
  if (!trustedReviewImageCloudName) return false;
  if (
    url.protocol !== 'https:' ||
    url.hostname !== 'res.cloudinary.com' ||
    url.username ||
    url.password ||
    url.port ||
    url.search ||
    url.hash
  ) {
    return false;
  }

  var lowerPath = url.pathname.toLowerCase();
  if (lowerPath.indexOf('%2f') !== -1 || lowerPath.indexOf('%5c') !== -1) return false;

  var parts = url.pathname.split('/').filter(Boolean);
  var trustedStoreId = normalizeReviewImageStoreId(PUBLIC_API_KEY);
  if (!trustedStoreId) return false;

  if (parts.length < 8) return false;
  if (parts[0] !== trustedReviewImageCloudName || parts[1] !== 'image' || parts[2] !== 'upload') return false;
  if (
    !/^v\d+$/.test(parts[3]) ||
    parts[4] !== REVIEW_IMAGE_ROOT_FOLDER ||
    parts[5] !== REVIEW_IMAGE_TENANT_FOLDER ||
    parts[6] !== trustedStoreId
  ) {
    return false;
  }
  for (var i = 7; i < parts.length; i++) {
    if (parts[i] === '.' || parts[i] === '..') return false;
  }

  var fileName = parts[parts.length - 1];
  var dotIdx = fileName.lastIndexOf('.');
  if (dotIdx === -1) return false;
  return !!REVIEW_IMAGE_ALLOWED_EXT[fileName.slice(dotIdx + 1).toLowerCase()];
}

export function getTrustedReviewImages(review) {
  var images = review && review.images && Array.isArray(review.images) ? review.images : [];
  // Build-time inject yokken `isTrustedReviewImageUrl` zaten false döner;
  // log gürültüsü yapma — modül load anındaki tek error log yeterli.
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

// Cloudinary transformation builder — Cloudinary URL'lerine q_auto/f_auto + c_scale,w_<width>
// ekler. Default width LIGHTBOX_MAIN_WIDTH (1200): lightbox ana görsel + preload için.
// Diğer çağrılar (thumbnail/tile/mini) ihtiyaca uygun width'i ikinci parametre olarak geçer.
// Cloudinary olmayan URL'ler olduğu gibi döner — third-party host'lar için no-op.
//
// Sabitler — anlamlı isimle hangi çağrı yerine ait olduğunu belgeler. ADR_0007 ve [[Photo_Strip]].
export var PHOTO_STRIP_THUMB_WIDTH = 300;   // strip + kart/liste thumbnail (90-140 px display, retina yedeği)
export var GALLERY_TILE_WIDTH = 600;        // gallery masonry tile (200-400 px display, retina yedeği)
export var LIGHTBOX_MINI_THUMB_WIDTH = 200; // lightbox altı mini görsel şeridi (60-80 px display)
export var LIGHTBOX_MAIN_WIDTH = 1200;      // lightbox ana görsel + preload (default)

export function optimizeImageUrl(url, width) {
  if (!url || url.indexOf('res.cloudinary.com') === -1) return url;
  var w = (typeof width === 'number' && width > 0) ? Math.round(width) : LIGHTBOX_MAIN_WIDTH;
  return url.replace('/upload/', '/upload/q_auto/f_auto/c_scale,w_' + w + '/');
}

// Responsive image attribute builder — `<img src srcset>` çifti üretir.
// 1x: baseWidth, 2x: baseWidth × 2. Tarayıcı DPR'ye göre otomatik seçer.
// Cloudinary olmayan URL'ler için src ve srcset aynı URL — no-op.
// Kullanım:
//   var attrs = buildResponsiveImgAttrs(url, PHOTO_STRIP_THUMB_WIDTH);
//   img.src = attrs.src; img.srcset = attrs.srcset;
export function buildResponsiveImgAttrs(url, baseWidth) {
  if (!url) return { src: '', srcset: '' };
  var w1 = (typeof baseWidth === 'number' && baseWidth > 0) ? Math.round(baseWidth) : LIGHTBOX_MAIN_WIDTH;
  var w2 = w1 * 2;
  var src1 = optimizeImageUrl(url, w1);
  var src2 = optimizeImageUrl(url, w2);
  // Cloudinary değilse her ikisi de URL'in kendisidir; srcset duplikasyonu zararsız.
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

// renderStars — form için radio-input tabanlı erişilebilir yıldız seçici.
// Endüstri standardı pattern: hidden `<input type="radio">` + `<label>` + CSS :checked/:hover.
// Avantaj: native click/touch/keyboard, screen reader, form validation — JS event handling yok.
// Yıldızlar TERS sırayla render edilir (5→1), böylece CSS ~ selector "seçilenin/hover'ın solundaki
// tüm kardeşler dolu" kuralı çalışır (DOM sırası sağ→sol, flex-direction:row-reverse ile görünüm düzelir).
export function renderStars(rating, interactive, onChange, settings) {
  var pair = getIconFromSettings(settings);
  var name = 'renuvex-pr-rating-' + Math.random().toString(36).slice(2, 9);

  var wrap = document.createElement('div');
  wrap.className = 'renuvex-pr-rating' + (interactive ? ' renuvex-pr-rating-interactive' : '');
  // row-reverse ile DOM 5,4,3,2,1 → görsel 1,2,3,4,5.
  wrap.style.cssText = 'display:inline-flex;flex-direction:row-reverse;justify-content:flex-end;gap:4px;';

  if (!interactive) {
    // Read-only: basitçe dolu/boş yıldızları göster, input yok.
    wrap.style.flexDirection = 'row';
    for (var j = 1; j <= 5; j++) {
      var star = document.createElement('span');
      star.className = 'renuvex-pr-icon';
      star.style.cssText = 'width:24px;height:24px;display:inline-flex;color:' + STAR_COLOR + ';';
      star.innerHTML = j <= rating ? pair.filled : pair.empty;
      wrap.appendChild(star);
    }
    return wrap;
  }

  // Interactive: radio inputs, 5'ten 1'e doğru (row-reverse ile görsel 1→5).
  for (var i = 5; i >= 1; i--) {
    (function (idx) {
      var input = document.createElement('input');
      input.type = 'radio';
      input.name = name;
      input.value = String(idx);
      input.id = name + '-' + idx;
      input.className = 'renuvex-pr-rating-input';
      if (idx === rating) input.checked = true;
      // Görsel olarak gizle ama erişilebilir kalsın (screen reader + klavye çalışır).
      input.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
      input.addEventListener('change', function () {
        onChange && onChange(idx);
      });

      var label = document.createElement('label');
      label.htmlFor = input.id;
      label.className = 'renuvex-pr-rating-label';
      label.setAttribute('aria-label', idx + ' yıldız');
      label.style.cssText = 'width:24px;height:24px;display:inline-flex;cursor:pointer;transition:color .15s;';
      
      // %100 Güvenli ve Bubbling (çakışma) yapmayan Tıklama Tetiği
      label.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Grubun tümünü temizle (Manuel checked=true yaptığımızda grubun senkronu bozulmasın diye)
        var allRadios = wrap.querySelectorAll('.renuvex-pr-rating-input');
        for(var r=0; r<allRadios.length; r++) { allRadios[r].checked = false; }
        
        input.checked = true;
        if (onChange) onChange(idx);
      });

      // Pointer-events:none ile resimlerin tıklamayı emmesi tamamen önleniyor.
      // Inline opacity:0 yerine class yapısı kullanarak stil ezilmesini de kaldırıyoruz
      label.innerHTML =
        '<span class="renuvex-pr-rating-filled" style="position:absolute;width:24px;height:24px;color:' + STAR_COLOR + ';pointer-events:none;">' + pair.filled + '</span>' +
        '<span class="renuvex-pr-rating-empty" style="position:relative;width:24px;height:24px;color:' + STAR_COLOR + ';pointer-events:none;">' + pair.empty + '</span>';
      label.style.position = 'relative';

      wrap.appendChild(input);
      wrap.appendChild(label);
    })(i);
  }

  ensureStarStyles();
  return wrap;
}

// CSS kurallarını bir kez <style> olarak ekle
var starStylesInjected = false;
function ensureStarStyles() {
  if (starStylesInjected) return;
  starStylesInjected = true;
  var css = '.renuvex-pr-rating-interactive .renuvex-pr-rating-filled{opacity:0; transition:opacity .15s;}' + '.renuvex-pr-rating-interactive .renuvex-pr-rating-empty{opacity:1; transition:opacity .15s;}' + '.renuvex-pr-rating-interactive .renuvex-pr-rating-input:checked ~ .renuvex-pr-rating-label .renuvex-pr-rating-filled{opacity:1 !important;}' + '.renuvex-pr-rating-interactive .renuvex-pr-rating-input:checked ~ .renuvex-pr-rating-label .renuvex-pr-rating-empty{opacity:0 !important;}' + '.renuvex-pr-rating-interactive .renuvex-pr-rating-input:focus-visible + .renuvex-pr-rating-label{outline:2px solid ' + STAR_COLOR + ';outline-offset:2px;border-radius:4px;}';

  var style = document.createElement('style');
  style.setAttribute('data-renuvex-pr-style', 'rating');
  style.textContent = (css);
  document.head.appendChild(style);
}

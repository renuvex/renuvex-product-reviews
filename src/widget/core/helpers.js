// helpers.js — Genel yardımcı fonksiyonlar

/* global __IKR_DEFAULT_CLOUDINARY_CLOUD_NAME__ */

import { renderStarRow, getIconFromSettings } from '../icons.js';

// Review widget içindeki yıldızlar için CSS custom property — reviews widget ayarından beslenir
export var STAR_COLOR = 'var(--ikr-review-star-color,#f59e0b)';
export var STAR_EMPTY_COLOR = 'var(--ikr-star-empty-color,#e5e7eb)';

export var SYSTEM_SLUGS = /^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;

export function extractSlug(url) {
  try {
    return new URL(url, window.location.origin).pathname.replace(/^\//, '').split('?')[0].split('/')[0];
  } catch (_) { return ''; }
}

// starsHTML(rating, settings) — SVG yıldız satırı üretir.
// settings'teki reviewIcon + reviewIconStyle'a göre ICONS registry'sinden SVG alır.
// Boyut parent CSS (.ikr-review-stars, .ikr-modal-stars vb.) tarafından verilir.
export function starsHTML(rating, settings) {
  var wrapStyle = 'color:' + STAR_COLOR + ';display:inline-flex;gap:2px;align-items:center;';
  return '<span class="ikr-stars" style="' + wrapStyle + '">' +
    renderStarRow(rating, settings) +
    '</span>';
}

// partialStarsHTML(rating, iconPair, opts) — Ortalama puan için yarım yıldız desteği.
// Bireysel yıldız + clip-path mimarisi. Her yıldız bağımsız .ikr-star kapsayıcısı.
// Half state'inde tek filled SVG iki katmanda kullanılır (alt boş-renk, üst dolu-renk
// + clip-path:inset(0 50% 0 0) ile sol yarı). Tek path → geometri uyumsuzluğu
// fiziksel olarak imkânsız (kare/kalp ikonlarında bile tam ortadan simetrik bölünür).
// Material UI Rating decimal mode + react-stars + Industry pattern.
//
//   rating   : float (ör 4.3, 4.5, 5.0)
//   iconPair : { filled, empty } — getIconFromSettings'ten gelen SVG çifti
//   opts     : { sizeStyle? } — inline 'width:Xpx;height:Xpx;' (opsiyonel, normalde CSS'ten gelir)
export function partialStarsHTML(rating, iconPair, opts) {
  var r = Math.max(0, Math.min(5, parseFloat(rating) || 0));
  // 0.25/0.75 snap — endüstri standardı (Material UI, Judge.me, Stamped):
  // her yıldız için kesir < 0.25 → boş, 0.25-0.74 → yarım, ≥ 0.75 → dolu.
  // %10 gibi belirsiz dolguları temizler, görsel netlik sağlar.
  var whole = Math.floor(r);
  var frac = r - whole;
  var snapped = frac < 0.25 ? whole : (frac < 0.75 ? whole + 0.5 : whole + 1);
  var sizeStyle = (opts && opts.sizeStyle) || '';

  var html = '';
  for (var i = 1; i <= 5; i++) {
    var state =
      i <= snapped              ? 'full'
      : (i - 0.5 === snapped)   ? 'half'
                                : 'empty';

    if (state === 'full') {
      html += '<span class="ikr-star ikr-star-full" style="' + sizeStyle + '">'
            +   iconPair.filled
            + '</span>';
    } else if (state === 'empty') {
      // Tam-state empty: outline mimarisi korunuyor (filled+gri değil, outline SVG).
      html += '<span class="ikr-star ikr-star-empty" style="' + sizeStyle + '">'
            +   iconPair.empty
            + '</span>';
    } else { // half
      // Tek geometri (filled) iki katmanda: alt boş-renk full, üst dolu-renk + clip sol %50.
      html += '<span class="ikr-star ikr-star-half" style="' + sizeStyle + '">'
            +   '<span class="ikr-star-half-bg">' + iconPair.empty + '</span>'
            +   '<span class="ikr-star-half-fg">' + iconPair.filled + '</span>'
            + '</span>';
    }
  }

  return '<span class="ikr-stars-partial">' + html + '</span>';
}

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
  document.documentElement.style.setProperty('--ikr-color', validColor);
  var rgb = hexToRgb(validColor);
  document.documentElement.style.setProperty('--ikr-color-light', rgb ? 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',0.07)' : 'rgba(17,17,17,0.07)');
}

export function injectStyles(_color, css) {
  var el = document.getElementById('ikr-styles');
  if (!el) {
    el = document.createElement('style');
    el.id = 'ikr-styles';
    document.head.appendChild(el);
  }
  el.textContent = css;
  // applyWidgetColor removed — --ikr-color and --ikr-color-light are no longer
  // used by styles.js. All color surfaces now use their own specific variables.
}

var REVIEW_IMAGE_ALLOWED_EXT = { jpg: true, jpeg: true, png: true, webp: true, gif: true, avif: true };

function normalizeReviewImageCloudName(cloudName) {
  var normalizedCloudName = typeof cloudName === 'string' ? cloudName.trim() : '';
  return /^[A-Za-z0-9_-]+$/.test(normalizedCloudName) ? normalizedCloudName : '';
}

// Trusted Cloudinary cloud name — ADR_0008 gereği build-time'da bir kez set edilir,
// runtime'da değişmez. scripts/build-widget.mjs `__IKR_DEFAULT_CLOUDINARY_CLOUD_NAME__`
// sabitini bundle'a inject eder (env: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME). Settings
// endpoint artık `imagePolicy` field'ı taşımaz; cloud name app-level config'tir,
// merchant-level değildir. Eğer bu sabit boşsa deploy config hatası vardır — modül
// yüklenirken bir kez error log basılır, sonra runtime'da fail-closed davranılır.
var trustedReviewImageCloudName = normalizeReviewImageCloudName(
  typeof __IKR_DEFAULT_CLOUDINARY_CLOUD_NAME__ === 'string' ? __IKR_DEFAULT_CLOUDINARY_CLOUD_NAME__ : ''
);

if (!trustedReviewImageCloudName) {
  console.error('[ikr] NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is missing at build time; review images will be hidden until widget is rebuilt with a valid cloud name.');
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
  if (parts.length < 6) return false;
  if (parts[0] !== trustedReviewImageCloudName || parts[1] !== 'image' || parts[2] !== 'upload') return false;
  if (!/^v\d+$/.test(parts[3]) || parts[4] !== 'review_images') return false;
  for (var i = 5; i < parts.length; i++) {
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

// renderStars — form için radio-input tabanlı erişilebilir yıldız seçici.
// Endüstri standardı pattern: hidden `<input type="radio">` + `<label>` + CSS :checked/:hover.
// Avantaj: native click/touch/keyboard, screen reader, form validation — JS event handling yok.
// Yıldızlar TERS sırayla render edilir (5→1), böylece CSS ~ selector "seçilenin/hover'ın solundaki
// tüm kardeşler dolu" kuralı çalışır (DOM sırası sağ→sol, flex-direction:row-reverse ile görünüm düzelir).
export function renderStars(rating, interactive, onChange, settings) {
  var pair = getIconFromSettings(settings);
  var name = 'ikr-rating-' + Math.random().toString(36).slice(2, 9);

  var wrap = document.createElement('div');
  wrap.className = 'ikr-rating' + (interactive ? ' ikr-rating-interactive' : '');
  // row-reverse ile DOM 5,4,3,2,1 → görsel 1,2,3,4,5.
  wrap.style.cssText = 'display:inline-flex;flex-direction:row-reverse;justify-content:flex-end;gap:4px;';

  if (!interactive) {
    // Read-only: basitçe dolu/boş yıldızları göster, input yok.
    wrap.style.flexDirection = 'row';
    for (var j = 1; j <= 5; j++) {
      var star = document.createElement('span');
      star.className = 'ikr-icon';
      star.style.cssText = 'width:24px;height:24px;display:inline-flex;color:' + (j <= rating ? STAR_COLOR : STAR_EMPTY_COLOR) + ';';
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
      input.className = 'ikr-rating-input';
      if (idx === rating) input.checked = true;
      // Görsel olarak gizle ama erişilebilir kalsın (screen reader + klavye çalışır).
      input.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
      input.addEventListener('change', function () {
        onChange && onChange(idx);
      });

      var label = document.createElement('label');
      label.htmlFor = input.id;
      label.className = 'ikr-rating-label';
      label.setAttribute('aria-label', idx + ' yıldız');
      label.style.cssText = 'width:24px;height:24px;display:inline-flex;cursor:pointer;transition:color .15s;';
      
      // %100 Güvenli ve Bubbling (çakışma) yapmayan Tıklama Tetiği
      label.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Grubun tümünü temizle (Manuel checked=true yaptığımızda grubun senkronu bozulmasın diye)
        var allRadios = wrap.querySelectorAll('.ikr-rating-input');
        for(var r=0; r<allRadios.length; r++) { allRadios[r].checked = false; }
        
        input.checked = true;
        if (onChange) onChange(idx);
      });

      // Pointer-events:none ile resimlerin tıklamayı emmesi tamamen önleniyor.
      // Inline opacity:0 yerine class yapısı kullanarak stil ezilmesini de kaldırıyoruz
      label.innerHTML =
        '<span class="ikr-rating-filled" style="position:absolute;width:24px;height:24px;color:' + STAR_COLOR + ';pointer-events:none;">' + pair.filled + '</span>' +
        '<span class="ikr-rating-empty" style="position:relative;width:24px;height:24px;color:' + STAR_EMPTY_COLOR + ';pointer-events:none;">' + pair.empty + '</span>';
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
  var css = '.ikr-rating-interactive .ikr-rating-filled{opacity:0; transition:opacity .15s;}' + '.ikr-rating-interactive .ikr-rating-empty{opacity:1; transition:opacity .15s;}' + '.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-filled{opacity:1 !important;}' + '.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-empty{opacity:0 !important;}' + '.ikr-rating-interactive .ikr-rating-input:focus-visible + .ikr-rating-label{outline:2px solid ' + STAR_COLOR + ';outline-offset:2px;border-radius:4px;}';

  var style = document.createElement('style');
  style.setAttribute('data-ikr', 'rating');
  style.textContent = css;
  document.head.appendChild(style);
}

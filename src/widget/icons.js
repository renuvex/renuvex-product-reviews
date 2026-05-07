// icons.js — Widget ikon sistemi (SVG embed)
//
// Google Material Symbols (Google Fonts Icons) — Apache 2.0 lisansı.
// https://fonts.google.com/icons
//

// Material Symbols viewBox — "0 -960 960 960" grid
var MS_VB = '0 -960 960 960';

// Google Fonts Icons path'leri — Filled (dolu) + Outline (boş) çiftleri
// Classic (Sharp/Outlined varyant) ve Rounded varyantlar Material Symbols
// resmi GitHub repo'sundan: google/material-design-icons →
//   symbols/web/<icon>/materialsymbols<style>/<icon>_24px.svg
// Filled karşılıkları aynı klasörde *_fill1_24px.svg.
// "Rounded" outline'ı yanlışlıkla "Outlined" outline'ından kopyalanmış olunca
// dolu yıldız tombul, boş yıldız keskin görünür → görsel tutarsızlık.
var P = {
  // Classic (Outlined) — keskin köşeli klasik yıldız.
  starFill:        'm233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z',
  starOutline:     'm354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-355Z',
  // Rounded — yuvarlak köşeli (Q komutlarıyla). Outline gerçekten Material
  // Symbols Rounded set'inden — eski versiyon yanlışlıkla starOutline kopyasıydı.
  starRounded:     'M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z',
  starRoundedOutline: 'm354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm126 18L314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Zm0-201Z',
  // Heart (favorite) — Rounded varyant. Outline da resmi Rounded set'inden.
  heartRounded:    'M480-120 432-164q-114-104-190-176.5T121-456q-45-43-63-86.5T40-639q0-111 74.5-185.5T300-899q62 0 118 29t62 76q6-47 62-76t118-29q111 0 185.5 74.5T920-639q0 53-18 96.5T839-456q-45 42-120.5 115.5T528-164l-48 44Z',
  heartOutline:    'M480-147q-14 0-28.5-5T426-168l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5Zm-38-543q-29-41-62-62.5T300-774q-60 0-100 40t-40 100q0 52 37 110.5T285.5-410q51.5 55 106 103t88.5 79q34-31 88.5-79t106-103Q726-465 763-523.5T800-634q0-60-40-100t-100-40q-47 0-80 21.5T518-690q-7 10-17 15t-21 5q-11 0-21-5t-17-15Zm38 189Z',
  boxSquare:       'M160-80h640q33 0 56.5-23.5T880-160v-640q0-33-23.5-56.5T800-880H160q-33 0-56.5 23.5T80-800v640q0 33 23.5 56.5T160-80Z',
  boxSquareOutline:'M200-200h560v-560H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z',
};

// Temel SVG sarıcı — currentColor ile renklenir
function svg(path) {
  return '<svg viewBox="' + MS_VB + '" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="' + path + '"/></svg>';
}

// ═══════════════════════════════════════════════════════════
//  İkon kütüphanesi (Filled + Outline çiftleri — Google Material)
// ═══════════════════════════════════════════════════════════
export var ICONS = {
  star: {
    label: 'Yıldız',
    styles: {
      rounded: {
        label: 'Tombul (Google)',
        filled: '<svg viewBox="' + MS_VB + '" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="' + P.starRounded + '"/></g></svg>',
        empty:  '<svg viewBox="' + MS_VB + '" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="' + P.starRoundedOutline + '"/></g></svg>',
      },
      classic: {
        label: 'Klasik (Google)',
        filled: '<svg viewBox="' + MS_VB + '" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="' + P.starFill + '"/></g></svg>',
        empty:  '<svg viewBox="' + MS_VB + '" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(-48, 48) scale(1.1)"><path d="' + P.starOutline + '"/></g></svg>',
      },
      boxed: {
        label: 'Kare (Google)',
        filled: '<svg viewBox="' + MS_VB + '" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="' + P.boxSquare + '"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="' + P.starFill + '"/></g></svg>',
        empty:  '<svg viewBox="' + MS_VB + '" fill="currentColor" opacity="0.35" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="' + P.boxSquare + '"/><g transform="translate(120, -120) scale(0.75)" fill="white"><path d="' + P.starFill + '"/></g></svg>',
      },
    },
  },
  favorite: {
    label: 'Kalp',
    styles: {
      rounded: {
        label: 'Yuvarlak (Google)',
        filled: '<svg viewBox="' + MS_VB + '" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="' + P.heartRounded + '"/></g></svg>',
        empty:  '<svg viewBox="' + MS_VB + '" fill="none" stroke="currentColor" stroke-width="72" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g transform="translate(24, -24) scale(0.95)"><path d="' + P.heartRounded + '"/></g></svg>',
      },
    },
  },
};

// "star:rounded" → { type: 'star', style: 'rounded' }
export function parseIconValue(value) {
  var v = String(value || 'star');
  var i = v.indexOf(':');
  if (i === -1) return { type: v, style: null };
  return { type: v.slice(0, i), style: v.slice(i + 1) };
}

// Bir ikon-stil kombinasyonunun { filled, empty } SVG'lerini döndür
export function getIconStyle(iconType, styleName) {
  var icon = ICONS[iconType] || ICONS.star;
  var styles = icon.styles;
  return styles[styleName] || styles[Object.keys(styles)[0]];
}

// Tek bir SVG string'i al (state = 'filled' | 'empty')
export function getIconSvg(iconType, styleName, state) {
  var pair = getIconStyle(iconType, styleName);
  return (state === 'empty') ? pair.empty : pair.filled;
}

// settings'ten okuyup { filled, empty } döndür
export function getIconFromSettings(settings) {
  var raw = (settings && settings.reviewIcon) || 'star';
  var parsed = parseIconValue(raw);
  var styleName = parsed.style || (settings && settings.reviewIconStyle) || 'classic';
  return getIconStyle(parsed.type, styleName);
}

// 5'li yıldız dizisini HTML olarak üret
export function renderStarRow(rating, settings, opts) {
  var r = Math.round(parseFloat(rating)) || 0;
  var pair = getIconFromSettings(settings);
  var sizePx = opts && opts.sizePx;
  var sizeStyle = sizePx ? 'width:' + sizePx + 'px;height:' + sizePx + 'px;' : '';
  var html = '';
  for (var i = 1; i <= 5; i++) {
    var isFilled = i <= r;
    html += '<span class="ikr-icon ' + (isFilled ? 'ikr-icon-filled' : 'ikr-icon-empty') + '" style="' + sizeStyle + '">' +
            (isFilled ? pair.filled : pair.empty) +
            '</span>';
  }
  return html;
}

// Settings panelde "Yıldız Stili" dropdown'u için seçenek üretir
export function getStyleOptions(iconType) {
  var icon = ICONS[iconType] || ICONS.star;
  return Object.keys(icon.styles).map(function (key) {
    return { value: key, label: icon.styles[key].label };
  });
}

// Settings panelde "İkon" dropdown'u için seçenekler.
export function getIconOptions() {
  var out = [];
  Object.keys(ICONS).forEach(function (key) {
    var icon = ICONS[key];
    Object.keys(icon.styles).forEach(function (styleKey) {
      var style = icon.styles[styleKey];
      var value = styleKey === 'classic' ? key : key + ':' + styleKey;
      out.push({ value: value, label: icon.label + ' — ' + style.label });
    });
  });
  return out;
}

// ═══════════════════════════════════════════════════════════
//  Filtre butonu ikon kütüphanesi (tek state — filled/empty yok)
//  Google Material Symbols, Apache 2.0
// ═══════════════════════════════════════════════════════════
var FP = {
  // filter_list — yatay çizgiler, klasik filtre sembolü (uzun→kısa, üstten aşağı)
  lines:        'M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z',
  // filter_list_alt — alternatif çizgili stil (3 farklı uzunlukta)
  linesAlt:     'M440-160v-160h80v40h360v80H520v40h-80Zm-360-80v-80h280v80H80Zm200-160v-80H80v-80h200v-80h80v240h-80Zm160-80v-80h440v80H440Zm160-160v-160h80v40h120v80H680v40h-80Zm-520-80v-80h440v80H80Z',
  // filter_alt — huni outline
  funnel:       'M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z',
  // density_small — minimal 4 çizgi
  dense:        'M120-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z',
};

export var FILTER_ICONS = {
  lines:    { label: 'Çizgili',          svg: svg(FP.lines) },
  linesAlt: { label: 'Çizgili (Alt)',    svg: svg(FP.linesAlt) },
  funnel:   { label: 'Huni',             svg: svg(FP.funnel) },
  dense:    { label: 'Yoğun Çizgili',    svg: svg(FP.dense) },
};

// Filter butonu SVG'si — settings.filterIcon değerini al
export function getFilterIconSvg(value) {
  var icon = FILTER_ICONS[value] || FILTER_ICONS.lines;
  return icon.svg;
}

// Settings panelde "Filtre İkonu" dropdown'u için seçenekler
export function getFilterIconOptions() {
  return Object.keys(FILTER_ICONS).map(function (key) {
    return { value: key, label: FILTER_ICONS[key].label };
  });
}

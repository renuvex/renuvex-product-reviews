// icons.js — Widget ikon sistemi (SVG embed)
//
// Google Material Symbols (Google Fonts Icons) — Apache 2.0 lisansı.
// https://fonts.google.com/icons
//

// Material Symbols viewBox — "0 -960 960 960" grid
var MS_VB = '0 -960 960 960';

// Google Fonts Icons path'leri (Sadece Dolu Modeller)
var P = {
  starFill:    'm233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z',
  starRounded: 'M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z',
  heartRounded: 'M480-120 432-164q-114-104-190-176.5T121-456q-45-43-63-86.5T40-639q0-111 74.5-185.5T300-899q62 0 118 29t62 76q6-47 62-76t118-29q111 0 185.5 74.5T920-639q0 53-18 96.5T839-456q-45 42-120.5 115.5T528-164l-48 44Z',
};

// Temel SVG sarıcı — currentColor ile renklenir
function svg(path) {
  return '<svg viewBox="' + MS_VB + '" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="' + path + '"/></svg>';
}

// ═══════════════════════════════════════════════════════════
//  İkon kütüphanesi (Sadece Dolu Google İkonları)
// ═══════════════════════════════════════════════════════════
export var ICONS = {
  star: {
    label: 'Yıldız',
    styles: {
      classic: {
        label: 'Klasik (Google)',
        filled: svg(P.starFill),
        empty:  svg(P.starFill), // Boş hali de dolu ikon, renk ile ayırt edilecek
      },
      rounded: {
        label: 'Tombul (Google)',
        filled: svg(P.starRounded),
        empty:  svg(P.starRounded), // Boş hali de dolu ikon, renk ile ayırt edilecek
      },
    },
  },
  favorite: {
    label: 'Kalp',
    styles: {
      rounded: {
        label: 'Yuvarlak (Google)',
        filled: svg(P.heartRounded),
        empty:  svg(P.heartRounded),
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

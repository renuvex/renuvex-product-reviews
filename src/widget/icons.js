// icons.js — Widget ikon sistemi (SVG embed)
//
// Phosphor Icons'tan alınmıştır (MIT lisansı).
// https://phosphoricons.com/
//
// === Mimari ===
//
//   ICONS[iconType].styles[styleName] = { filled, empty }
//
// Her ikon bir veya daha fazla stil varyantına sahip olabilir.
// Yeni ikon eklemek için bu dosyaya ICONS[...] entry'si eklemek yeterli —
// widget/settings/badge otomatik yeni ikonu kullanmaya başlar.
//
// === Kullanım ===
//
//   import { renderStarRow, getIconSvg } from './icons.js';
//
//   // Dolu/yarım/boş yıldız sırası render et (settings'ten icon + style okur)
//   var html = renderStarRow(rating, settings);     // '<span class="ikr-icon ikr-icon-filled">...</span>...'
//
//   // Tek bir ikon SVG'si al (belirli durum için)
//   var svg = getIconSvg('star', 'classic', 'filled');

// Temel SVG sarıcı — tüm ikonlar 256x256 viewBox, currentColor ile renklenir
function svg(path) {
  return '<svg viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="' + path + '"/></svg>';
}

// İki path'li SVG (duotone/outlined — filled + outline aynı anda)
function svg2(bgPath, fgPath, bgOpacity) {
  return '<svg viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path opacity="' + (bgOpacity || '0.2') + '" d="' + bgPath + '"/>' +
    '<path d="' + fgPath + '"/>' +
    '</svg>';
}

// Phosphor Icons path'leri (v2.x, 256x256 grid, MIT lisansı)
var P = {
  // ─── Yıldız ────────────────────────────────────────────────
  starFill:    'M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a16,16,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z',
  starRegular: 'M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z',

  // ─── Kalp ─────────────────────────────────────────────────
  heartFill:    'M240,98a57.63,57.63,0,0,1-17,41L133.7,229.62a8,8,0,0,1-11.4,0L33,139a58,58,0,0,1,82-82.1L128,70l13.1-13.1A58,58,0,0,1,240,98Z',
  heartRegular: 'M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z',

  // ─── Daire ────────────────────────────────────────────────
  circleFill:    'M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Z',
  circleRegular: 'M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z',
};

// ═══════════════════════════════════════════════════════════
//  İkon kütüphanesi — yeni ikon/stil eklemek için buraya ekle
// ═══════════════════════════════════════════════════════════
export var ICONS = {
  star: {
    label: 'Yıldız',
    styles: {
      // Klasik: keskin, içi dolu (varsayılan)
      classic: {
        label: 'Klasik',
        filled: svg(P.starFill),
        empty:  svg(P.starRegular),
      },
      // Yumuşak: dolu ama soft — empty için filled'in soluk versiyonu (duotone his)
      rounded: {
        label: 'Yumuşak',
        filled: svg(P.starFill),
        empty:  svg2(P.starFill, P.starFill, '0.2'), // soluk kopya
      },
      // Outline: her iki durumda da kontur
      outlined: {
        label: 'Çizgi',
        filled: svg(P.starRegular),
        empty:  svg(P.starRegular),
      },
    },
  },
  heart: {
    label: 'Kalp',
    styles: {
      classic: {
        label: 'Klasik',
        filled: svg(P.heartFill),
        empty:  svg(P.heartRegular),
      },
      outlined: {
        label: 'Çizgi',
        filled: svg(P.heartRegular),
        empty:  svg(P.heartRegular),
      },
    },
  },
  circle: {
    label: 'Daire',
    styles: {
      classic: {
        label: 'Klasik',
        filled: svg(P.circleFill),
        empty:  svg(P.circleRegular),
      },
      outlined: {
        label: 'Çizgi',
        filled: svg(P.circleRegular),
        empty:  svg(P.circleRegular),
      },
    },
  },
};

// ─── Helpers ───────────────────────────────────────────────

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
  var iconType = (settings && settings.reviewIcon) || 'star';
  var styleName = (settings && settings.reviewIconStyle) || 'classic';
  return getIconStyle(iconType, styleName);
}

// 5'li yıldız dizisini HTML olarak üret
// rating: 0-5 arası (yarım destekli: Math.round)
// settings: { reviewIcon, reviewIconStyle }
// opts: { sizePx, colorEmpty } — opsiyonel
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

// Settings panelde "Yıldız Stili" dropdown'u için seçenek üretir —
// iconType'a göre mevcut stillerin listesini döndürür
export function getStyleOptions(iconType) {
  var icon = ICONS[iconType] || ICONS.star;
  return Object.keys(icon.styles).map(function (key) {
    return { value: key, label: icon.styles[key].label };
  });
}

// Settings panelde "İkon" dropdown'u için seçenekler
export function getIconOptions() {
  return Object.keys(ICONS).map(function (key) {
    return { value: key, label: ICONS[key].label };
  });
}

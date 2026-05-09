// icons.js — Widget ikon sistemi (SVG embed)
//
// Google Material Symbols (Google Fonts Icons) — Apache 2.0 lisansı.
// https://fonts.google.com/icons
//

// Material Symbols viewBox — "0 -960 960 960" grid
var MS_VB = '0 -960 960 960';
var PH_VB = '0 0 256 256';

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
  boxSquare:       'M160-80h640q33 0 56.5-23.5T880-160v-640q0-33-23.5-56.5T800-880H160q-33 0-56.5 23.5T80-800v640q0 33 23.5 56.5T160-80Z',
  boxSquareOutline:'M200-200h560v-560H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Z',
  // Phosphor Icons — Leaf (Yaprak)
  phLeafFill:    'M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49A101.72,101.72,0,0,0,46.7,175.2a4,4,0,0,0,6.61,1.43l85-86.3a8,8,0,0,1,11.32,11.32L56.74,195.94,42.55,210.13a8.2,8.2,0,0,0-.6,11.1,8,8,0,0,0,11.71.43l16.79-16.79c14.14,6.84,28.41,10.57,42.56,11.07q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07Z',
  phLeafRegular: 'M223.45,40.07a8,8,0,0,0-7.52-7.52C139.8,28.08,78.82,51,52.82,94a87.09,87.09,0,0,0-12.76,49c.57,15.92,5.21,32,13.79,47.85l-19.51,19.5a8,8,0,0,0,11.32,11.32l19.5-19.51C81,210.73,97.09,215.37,113,215.94q1.67.06,3.33.06A86.93,86.93,0,0,0,162,203.18C205,177.18,227.93,116.21,223.45,40.07ZM153.75,189.5c-22.75,13.78-49.68,14-76.71.77l88.63-88.62a8,8,0,0,0-11.32-11.32L65.73,179c-13.19-27-13-54,.77-76.71,22.09-36.47,74.6-56.44,141.31-54.06C210.2,114.89,190.22,167.41,153.75,189.5Z',
  phHeartFill:   'M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z',
  phHeartRegular:'M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z',
  // Phosphor Icons — Crown (Taç)
  phCrownFill:   'M239.75,90.81c0,.11,0,.21-.07.32L217,195a16,16,0,0,1-15.72,13H54.71A16,16,0,0,1,39,195L16.32,91.13c0-.11-.05-.21-.07-.32A16,16,0,0,1,44,77.39l33.67,36.29,35.8-80.29a1,1,0,0,0,0-.1,16,16,0,0,1,29.06,0,1,1,0,0,0,0,.1l35.8,80.29L212,77.39a16,16,0,0,1,27.71,13.42Z',
  phCrownRegular:'M230.9,73.6A15.85,15.85,0,0,0,212,77.39l-33.67,36.29-35.8-80.29a1,1,0,0,1,0-.1,16,16,0,0,0-29.06,0,1,1,0,0,1,0,.1l-35.8,80.29L44,77.39A16,16,0,0,0,16.25,90.81c0,.11,0,.21.07.32L39,195a16,16,0,0,0,15.72,13H201.29A16,16,0,0,0,217,195L239.68,91.13c0-.11,0-.21.07-.32A15.85,15.85,0,0,0,230.9,73.6ZM201.35,191.68l-.06.32H54.71l-.06-.32L32,88l.14.16,42,45.24a8,8,0,0,0,13.18-2.18L128,40l40.69,91.25a8,8,0,0,0,13.18,2.18l42-45.24L224,88Z',
  // Phosphor Icons — Leaf (Yaprak)
  phLeafBold:    'M227.42,39.86a12,12,0,0,0-11.28-11.28c-39.6-2.33-74.59,2.34-104,13.87C84,53.48,62.31,70.58,49.39,91.9c-17.62,29.11-17.66,64.45-.45,98.19L31.51,207.52a12,12,0,0,0,17,17l17.43-17.43c16.74,8.54,33.88,12.85,50.45,12.85a91.31,91.31,0,0,0,47.74-13.3c21.32-12.92,38.42-34.62,49.45-62.75C225.08,114.46,229.75,79.46,227.42,39.86ZM151.66,186.08C131.57,198.25,108,199.17,83.94,189l84.54-84.54a12,12,0,1,0-17-17L67,172.06c-10.14-24-9.22-47.63,3-67.72,20.91-34.53,70.54-53.72,134-52.25C205.38,115.53,186.19,165.17,151.66,186.08Z',
  // Phosphor Icons — Diamond (Elmas/Sketch)
  phDiamondFill: 'M246,98.73l-56-64A8,8,0,0,0,184,32H72a8,8,0,0,0-6,2.73l-56,64a8,8,0,0,0,.17,10.73l112,120a8,8,0,0,0,11.7,0l112-120A8,8,0,0,0,246,98.73ZM222.37,96H180L144,48h36.37ZM75.63,48H112L76,96H33.63Z',
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
      modern: {
        label: 'Modern (Phosphor)',
        filled: '<svg viewBox="' + PH_VB + '" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="' + P.phHeartFill + '"/></svg>',
        empty:  '<svg viewBox="' + PH_VB + '" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z"/></svg>',
      },
    },
  },
  leaf: {
    label: 'Yaprak',
    styles: {
      phosphor: {
        label: 'Modern (Phosphor)',
        filled: '<svg viewBox="' + PH_VB + '" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="' + P.phLeafFill + '"/></svg>',
        empty:  '<svg viewBox="' + PH_VB + '" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M63.81,192.19c-47.89-79.81,16-159.62,151.64-151.64C223.43,176.23,143.62,240.08,63.81,192.19Z"/><line x1="160" y1="96" x2="40" y2="216"/></svg>',
      },
    },
  },
  crown: {
    label: 'Taç',
    styles: {
      modern: {
        label: 'Modern (Phosphor)',
        filled: '<svg viewBox="' + PH_VB + '" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="' + P.phCrownFill + '"/></svg>',
        empty:  '<svg viewBox="' + PH_VB + '" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M54.71,200H201.29a8,8,0,0,0,7.88-6.61l22.7-104A8,8,0,0,0,218,82.76L176,128,135.26,36.65a8,8,0,0,0-14.52,0L80,128,38,82.76a8,8,0,0,0-13.9,6.66l22.7,104A8,8,0,0,0,54.71,200Z"/></svg>',
      },
    },
  },
  diamond: {
    label: 'Elmas',
    styles: {
      sketch: {
        label: 'Mücevher (Sketch)',
        filled: '<svg viewBox="' + PH_VB + '" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M246,98.73l-56-64A8,8,0,0,0,184,32H72a8,8,0,0,0-6,2.73l-56,64a8,8,0,0,0,.17,10.73l112,120a8,8,0,0,0,11.7,0l112-120A8,8,0,0,0,246,98.73ZM222.37,96H180L144,48h36.37ZM75.63,48H112L76,96H33.63Z"/></svg>',
        empty:  '<svg viewBox="' + PH_VB + '" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M246,98.73l-56-64A8,8,0,0,0,184,32H72a8,8,0,0,0-6,2.73l-56,64a8,8,0,0,0,.17,10.73l112,120a8,8,0,0,0,11.7,0l112-120A8,8,0,0,0,246,98.73ZM222.37,96H180L144,48h36.37ZM75.63,48H112L76,96H33.63Z"/></svg>',
      },
    },
  },
  paw: {
    label: 'Pati',
    styles: {
      phosphor: {
        label: 'Modern (Phosphor)',
        filled: '<svg viewBox="' + PH_VB + '" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M240,108a28,28,0,1,1-28-28A28,28,0,0,1,240,108ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm72,0a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm23.12,60.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72Z"/></svg>',
        empty:  '<svg viewBox="' + PH_VB + '" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="212" cy="108" r="24"/><circle cx="44" cy="108" r="24"/><circle cx="92" cy="60" r="24"/><circle cx="164" cy="60" r="24"/><path d="M128,104A36,36,0,0,0,93.43,130a43.49,43.49,0,0,1-20.67,25.9,32,32,0,0,0,27.73,57.62,72.49,72.49,0,0,1,55,0,32,32,0,0,0,27.73-57.62A43.46,43.46,0,0,1,162.57,130,36,36,0,0,0,128,104Z"/></svg>',
      },
    },
  },
  clover: {
    label: 'Yonca',
    styles: {
      phosphor: {
        label: 'Modern (Phosphor)',
        filled: '<svg viewBox="' + PH_VB + '" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M228,120c0,22.63-6,36.72-17.93,41.87a27.3,27.3,0,0,1-11,2.13,41.75,41.75,0,0,1-8.4-.93,4.05,4.05,0,0,1-2.52-1.64,368.49,368.49,0,0,0-47.75-55.26,8,8,0,0,0-11,11.62c14.84,13.91,64.13,63.49,78.32,120.27a8,8,0,0,1-5.82,9.7A8.13,8.13,0,0,1,200,248a8,8,0,0,1-7.75-6.06c-4.12-16.47-11.65-32.48-20.46-47.09a25.85,25.85,0,0,1-1.9,7.21C164.72,214,150.63,220,128,220s-36.72-6-41.88-17.94c-5.45-12.58-.39-30.82,15-54.21.68-1,1.36-2,2-3l-3,2C82.84,158.27,68.35,164,56.89,164a27.3,27.3,0,0,1-11-2.13C34,156.72,28,142.63,28,120s6-36.72,17.93-41.88c12.59-5.45,30.83-.39,54.22,15l3,2q-1-1.5-2-3c-15.41-23.39-20.47-41.63-15-54.22C91.28,26,105.37,20,128,20s36.72,6,41.88,17.93c5.45,12.59.39,30.83-15,54.22q-1,1.53-2,3l3-2c23.39-15.41,41.63-20.47,54.22-15C222,83.28,228,97.37,228,120Z"/></svg>',
        empty:  '<svg viewBox="' + PH_VB + '" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M228,120c0,22.63-6,36.72-17.93,41.87a27.3,27.3,0,0,1-11,2.13,41.75,41.75,0,0,1-8.4-.93,4.05,4.05,0,0,1-2.52-1.64,368.49,368.49,0,0,0-47.75-55.26,8,8,0,0,0-11,11.62c14.84,13.91,64.13,63.49,78.32,120.27a8,8,0,0,1-5.82,9.7A8.13,8.13,0,0,1,200,248a8,8,0,0,1-7.75-6.06c-4.12-16.47-11.65-32.48-20.46-47.09a25.85,25.85,0,0,1-1.9,7.21C164.72,214,150.63,220,128,220s-36.72-6-41.88-17.94c-5.45-12.58-.39-30.82,15-54.21.68-1,1.36-2,2-3l-3,2C82.84,158.27,68.35,164,56.89,164a27.3,27.3,0,0,1-11-2.13C34,156.72,28,142.63,28,120s6-36.72,17.93-41.88c12.59-5.45,30.83-.39,54.22,15l3,2q-1-1.5-2-3c-15.41-23.39-20.47-41.63-15-54.22C91.28,26,105.37,20,128,20s36.72,6,41.88,17.93c5.45,12.59.39,30.83-15,54.22q-1,1.53-2,3l3-2c23.39-15.41,41.63-20.47,54.22-15C222,83.28,228,97.37,228,120Z"/></svg>',
      },
    },
  },
  coffee: {
    label: 'Kahve',
    styles: {
      phosphor: {
        label: 'Modern (Phosphor)',
        filled: '<svg viewBox="' + PH_VB + '" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M208,80H32a8,8,0,0,0-8,8v48a96.3,96.3,0,0,0,32.54,72H32a8,8,0,0,0,0,16H208a8,8,0,0,0,0-16H183.46a96.59,96.59,0,0,0,27-40.09A40,40,0,0,0,248,128v-8A40,40,0,0,0,208,80Zm24,48a24,24,0,0,1-17.2,23,95.78,95.78,0,0,0,1.2-15V97.38A24,24,0,0,1,232,120ZM112,56V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Zm32,0V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0ZM80,56V24a8,8,0,0,1,16,0V56a8,8,0,0,1-16,0Z"/></svg>',
        empty:  '<svg viewBox="' + PH_VB + '" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M83.3,216A88,88,0,0,1,32,136V88H208v48a88,88,0,0,1-51.3,80"/><line x1="32" y1="216" x2="208" y2="216"/><path d="M208,88h4a32,32,0,0,1,32,32v8a32,32,0,0,1-32,32h-7.38"/><line x1="80" y1="24" x2="80" y2="48"/><line x1="120" y1="24" x2="120" y2="48"/><line x1="160" y1="24" x2="160" y2="48"/></svg>',
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

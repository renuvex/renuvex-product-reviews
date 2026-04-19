// review-layouts/index.js — registry
// Yeni yorum (review) layout eklemek için: klasör oluştur,
// index.js'inde { meta, render, css? } export et,
// burada import edip LAYOUTS map'ine kaydet. Layout-spesifik CSS varsa
// getReviewLayoutsCSS() ile birleşir ve ana inject ile beraber yüklenir.
//
// render(r, allReviews) sözleşmesi:
//   - r            : tek bir yorum nesnesi (rating, title, comment, images, merchantReply, ...)
//   - allReviews   : aktif sayfada görünen tüm yorumlar (modal navigation için gerekli)
//   → DOM elementi döner.

import * as card from './card/index.js';

export var LAYOUTS = {
  card: card,
};

export function getReviewLayout(id) {
  return LAYOUTS[id] || LAYOUTS.card;
}

// Tüm review layout'larının opsiyonel CSS string'lerini birleştir.
// Sadece aktif layout'un class'ları DOM'a yazıldığı için gizli layout CSS'leri etki etmez.
export function getReviewLayoutsCSS() {
  return Object.keys(LAYOUTS)
    .map(function(k) { return LAYOUTS[k].css || ''; })
    .join('\n');
}

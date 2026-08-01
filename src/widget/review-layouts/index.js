// review-layouts/index.js — registry
// Yeni yorum (review) layout eklemek için: klasör oluştur,
// index.js'inde { meta, render, css? } export et,
// burada import edip LAYOUTS map'ine kaydet. Layout-spesifik CSS varsa
// getReviewLayoutsCSS() ile birleşir ve ana inject ile beraber yüklenir.
//
// render(r, allReviews) sözleşmesi:
//   - r            : tek bir yorum nesnesi (rating, title, comment, images, merchantReply, ...)
//   - allReviews   : aktif sort/filter için yüklenmiş canonical yorum koleksiyonu
//   → DOM elementi döner.
//
// ─── meta.supports sözleşmesi (admin paneli alan-gizleme) ──────────────────
// Layout, davranışsal olarak DESTEKLEMEDİĞİ ayarları meta.supports'ta false
// olarak deklare eder. Admin paneli (catalog.ts → SettingsPanel.tsx) bu
// bilgiyi okuyup ilgili alanı OTOMATİK gizler — UI tarafında elle if/else
// listesi tutulmaz. Tek doğruluk kaynağı layout dosyasıdır.
//
// Mevcut review supports anahtarları:
//   - thumbnailSize: false  → "Küçük Resim Boyutu" select'i gizlenir
//                              (list/gallery tek görsel + sabit boyut kullanır)
//
// Yeni layout eklerken: render fonksiyonun hangi ayarları kullanmadığını
// kontrol et ve karşılığını supports'ta false olarak işaretle. Eklenecek yeni
// supports anahtarı varsa: önce catalog.ts'deki ilgili alana
// `showWhen: { layoutKey: 'reviewLayout', supports: '<anahtar>' }` ekle,
// sonra burada ve summary-layouts/index.js'te listele.

import * as card from './card/index.js';
import * as list from './list/index.js';
import * as gallery from './gallery/index.js';

/**
 * Public review shape consumed by every review layout's `render(r, allReviews)`.
 * Mirrors the /api/public/reviews row (masked author, trusted image URLs).
 *
 * @typedef {Object} Review
 * @property {string} id
 * @property {number} rating                 1..5
 * @property {string|null} [title]
 * @property {string|null} [comment]
 * @property {string} author                 Masked display name.
 * @property {string|null} [merchantReply]
 * @property {string[]} [images]             Compatibility mirror of public AWS image URLs.
 * @property {Array<Object>} [media]         Additive structured media rows.
 * @property {string} [createdAt]            ISO timestamp.
 */

export var LAYOUTS = {
  card: card,
  list: list,
  gallery: gallery,
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

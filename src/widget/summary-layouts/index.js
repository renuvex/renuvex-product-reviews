// summary-layouts/index.js — registry
// Yeni layout eklemek için: klasör oluştur, index.js'inde { meta, render, css? } export et,
// burada import edip LAYOUTS map'ine kaydet. Layout-spesifik CSS varsa LAYOUT_CSS ile birleşir.
//
// ─── meta.supports sözleşmesi (admin paneli alan-gizleme) ──────────────────
// Layout, davranışsal olarak DESTEKLEMEDİĞİ ayarları meta.supports'ta false
// olarak deklare eder. Admin paneli (widgetDefs.ts → SettingsPanel.tsx) bu
// bilgiyi okuyup ilgili alanı OTOMATİK gizler — UI tarafında elle if/else
// listesi tutulmaz. Tek doğruluk kaynağı layout dosyasıdır.
//
// Mevcut summary supports anahtarları:
//   - title:          false → "Widget Başlığı" text alanı gizlenir
//                              (minimal/hero başlığı kendi içinde göstermez)
//   - recommendation: false → "Tavsiye Yüzdesini Göster" toggle'ı gizlenir
//                              (minimal/hero recommendPct render etmez)
//   - barChart:       false → bar chart ile ilgili gelecekteki ayarlar gizlenir
//                              (minimal/hero bar chart içermez)
//
// Yeni layout eklerken: render fonksiyonun hangi ayarları kullanmadığını
// kontrol et ve karşılığını supports'ta false olarak işaretle. Eklenecek yeni
// supports anahtarı varsa: önce widgetDefs.ts'deki ilgili alana
// `showWhen: { layoutKey: 'summaryLayout', supports: '<anahtar>' }` ekle,
// sonra burada ve review-layouts/index.js'te listele.

import * as classic from './classic/index.js';
import * as compact from './compact/index.js';
import * as split from './split/index.js';
import * as minimal from './minimal/index.js';
import * as hero from './hero/index.js';
import { SUMMARY_BASE_CSS } from './shared/summary-base.js';

/**
 * Render input passed to EVERY summary layout's `render(opts)`. Single shared
 * contract — all layouts must stay in sync with this shape. Documented here as
 * the source of truth (checkJs is off, so this is IDE/doc-level, not build-
 * enforced; the layout-contracts.test.ts invariant enforces the structural part).
 *
 * @typedef {Object} SummaryRenderOpts
 * @property {HTMLElement} widget                 Review widget root (<section>).
 * @property {string} [productId]                 ikas product id.
 * @property {Object} data                        Raw /api/public/reviews payload.
 * @property {Object} settings                    Merchant widget settings.
 * @property {{full:string, outline:string}} iconPair  Resolved star icon pair.
 * @property {number} allCount                    Total approved review count.
 * @property {number[]} ratingCounts              [1★..5★] distribution counts.
 * @property {string|number} avgRatingVal         Formatted average rating.
 * @property {number|null} currentRatingFilter    Active rating filter (1..5) or null.
 * @property {string} currentOrderBy              Active sort key (newest/highest/lowest).
 * @property {string} currentMediaFilter            Media filter mode (`none`, `images`, or `media`).
 * @property {(star:number)=>void} onFilterChange Rating-filter toggle handler.
 * @property {(orderBy:string, mediaFilter?:string)=>void} onSortChange Sort handler.
 */

export var LAYOUTS = {
  classic: classic,
  compact: compact,
  split: split,
  minimal: minimal,
  hero: hero,
};

export function getLayout(id) {
  return LAYOUTS[id] || LAYOUTS.classic;
}

// Shared summary base first (root container + grid tokens + avg/count/recommend
// typography), then each layout's optional CSS. Base BEFORE the per-layout
// overrides preserves the cascade order — equal-specificity
// .renuvex-pr-summary-<id> rules win by source order. Only the active layout's
// classes hit the DOM, so hidden layout CSS has no effect.
export function getLayoutsCSS() {
  var layoutCSS = Object.keys(LAYOUTS)
    .map(function(k) { return LAYOUTS[k].css || ''; })
    .join('\n');
  return SUMMARY_BASE_CSS + '\n' + layoutCSS;
}

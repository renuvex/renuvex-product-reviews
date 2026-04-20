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

// Tüm layout'ların opsiyonel CSS string'lerini birleştir — ana inject ile beraber yüklenir.
// Sadece aktif layout'un class'ları DOM'a yazıldığı için gizli layout CSS'leri etki etmez.
export function getLayoutsCSS() {
  return Object.keys(LAYOUTS)
    .map(function(k) { return LAYOUTS[k].css || ''; })
    .join('\n');
}

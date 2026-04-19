// summary-layouts/index.js — registry
// Yeni layout eklemek için: klasör oluştur, index.js'inde { meta, render, css? } export et,
// burada import edip LAYOUTS map'ine kaydet. Layout-spesifik CSS varsa LAYOUT_CSS ile birleşir.

import * as classic from './classic/index.js';
import * as compact from './compact/index.js';
import * as split from './split/index.js';
import * as minimal from './minimal/index.js';

export var LAYOUTS = {
  classic: classic,
  compact: compact,
  split: split,
  minimal: minimal,
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

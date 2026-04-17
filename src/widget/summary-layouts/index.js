// summary-layouts/index.js — registry
// Yeni layout eklemek için: klasör oluştur, index.js'inde { meta, render } export et,
// burada import edip LAYOUTS map'ine kaydet.

import * as classic from './classic/index.js';

export var LAYOUTS = {
  classic: classic,
};

export function getLayout(id) {
  return LAYOUTS[id] || LAYOUTS.classic;
}

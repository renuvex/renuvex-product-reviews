// surfaces/reviews-main.surface.js — PDP review bloğu surface descriptor'ı
//
// İnce adaptör: mount, mevcut bootstrap() orkestrasyonunu çağırır (settings +
// reviews fetch + render). Mantık yeniden yazılmaz. reviews-main yüzeyi tek
// IIFE bundle içinde statik import edilir — code-splitting sınırı değil (ADR_0013).

import { bootstrap } from '../product-widget/bootstrap.js';

export var reviewsMainSurface = {
  key: 'reviews-main',
  detect: function (ctx) {
    return ctx.trigger === 'product' && !!(ctx.product && ctx.product.id);
  },
  mount: function (ctx) {
    bootstrap(ctx.product.id, ctx.product.name);
  },
};

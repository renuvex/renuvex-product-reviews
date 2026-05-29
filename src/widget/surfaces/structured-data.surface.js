// surfaces/structured-data.surface.js - PDP Product AggregateRating JSON-LD.

import { loadStructuredDataModule } from '../core/lazy-modules.js';

export var structuredDataSurface = {
  key: 'structured-data',
  detect: function (ctx) {
    return ctx.trigger === 'product' && !!(ctx.product && ctx.product.id);
  },
  mount: function (ctx) {
    return loadStructuredDataModule().then(function (mod) {
      return mod.renderStructuredData(ctx.product.id, ctx.product.name);
    });
  },
};


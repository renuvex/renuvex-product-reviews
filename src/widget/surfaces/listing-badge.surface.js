// surfaces/listing-badge.surface.js — Listing rozetleri surface descriptor'ı
//
// İnce adaptör: mount, mevcut renderListingBadges() orkestrasyonunu çağırır.
// detect her sayfa görüntülemesinde true döner — gerçek karar renderListingBadges
// içindeki collectSlugs() tarafından verilir (sayfada ürün linki yoksa hiçbir
// şey yapmaz). Yüzey tek IIFE bundle içinde statik import edilir (ADR_0013).

import { ls } from '../core/state.js';
import { renderListingBadges } from '../listing-badges/index.js';

export var listingBadgeSurface = {
  key: 'listing-badge',
  detect: function (ctx) {
    return ctx.trigger === 'page';
  },
  mount: function () {
    // Sayfa navigasyonunda: eski rozetleri temizle + yeniden render et.
    // (Mevcut PAGE_VIEW handler gövdesi — 800ms çift-tetik guard'ı
    // storefront-context.js içinde kaldı.)
    ls.navCleanup = true;
    ls.rendered = false;
    renderListingBadges();
  },
};

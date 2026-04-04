// events.js — ikas IkasEvents subscribe + PAGE_VIEW / PRODUCT_VIEW / VIEW_LISTING handlers

import { ls, ikrSlugMap } from './core/state.js';
import { cacheSet } from './core/cache.js';
import { PUBLIC_API_KEY } from './core/config.js';
import { bootstrap, getProductFromPage } from './product-widget/bootstrap.js';
import { renderListingBadges } from './listing-badges/index.js';

var ikasEventsAttached = false;

export function attachEvents() {
  if (window.IkasEvents) {
    if (ikasEventsAttached) return;
    ikasEventsAttached = true;
    window.IkasEvents.subscribe({
      id: 'ikas-reviews-widget',
      callback: function(event) {

        if (event && event.type === 'VIEW_LISTING') {
          var products = event.data && event.data.productDetails;
          if (Array.isArray(products)) {
            products.forEach(function(p) {
              if (p && p.metaData && p.metaData.slug && p.name) {
                ikrSlugMap[p.metaData.slug] = p.name;
              }
            });
          }
        }

        if (event && event.type === 'PRODUCT_VIEW') {
          var productId = event.data && event.data.productDetail && event.data.productDetail.id;
          var productName = event.data && event.data.productDetail && event.data.productDetail.name;
          if (productId) {
            cacheSet('ikr_reviews_' + PUBLIC_API_KEY + '_' + productId, '');
            bootstrap(productId, productName);
          }
        }

        if (event && event.type === 'PAGE_VIEW') {
          var now = Date.now();
          // 800ms içinde gelen ikinci PAGE_VIEW'ı yoksay — ikas ilk girişte çift tetikliyor
          if (ls.lastPageView && now - ls.lastPageView < 800) return;
          ls.lastPageView = now;
          ls.navCleanup = true;
          ls.rendered = false;
          renderListingBadges();
        }
      },
    });

    var product = getProductFromPage();
    if (product) bootstrap(product.id, product.name);
    // PAGE_VIEW her zaman gelir ve renderListingBadges'i tetikler
    // Fallback: PAGE_VIEW 2sn içinde gelmezse (eski ikas versiyonları) manuel tetikle
    setTimeout(function() { if (!ls.rendered) renderListingBadges(); }, 2000);

  } else {
    // IkasEvents henüz yüklenmedi — 50ms aralıklarla tekrar dene (max 5sn)
    var attempts = 0;
    function tryAttach() {
      if (window.IkasEvents) {
        attachEvents();
      } else if (attempts < 100) {
        attempts++;
        setTimeout(tryAttach, 50);
      }
    }
    setTimeout(tryAttach, 50);
  }
}

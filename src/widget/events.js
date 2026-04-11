// events.js — ikas IkasEvents subscribe + PAGE_VIEW / PRODUCT_VIEW / VIEW_LISTING handlers

import { ls, ikrSlugMap, setLastClickedSlug } from './core/state.js';
import { cacheSet } from './core/cache.js';
import { PUBLIC_API_KEY } from './core/config.js';
import { extractSlug } from './core/helpers.js';
import { bootstrap, getProductFromPage } from './product-widget/bootstrap.js';
import { renderListingBadges } from './listing-badges/index.js';

var ikasEventsAttached = false;
var modalClickAttached = false;

export function attachModalBadgeListener() {
  if (modalClickAttached) return;
  modalClickAttached = true;
  document.addEventListener('click', function(e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    if (a.closest('header') || a.closest('nav')) return;
    if (a.closest('[class*="basket"]') || a.closest('[class*="cart"]')) return;
    var slug = extractSlug(a.href);
    if (!slug || slug.length < 3) return;
    setLastClickedSlug(slug);
  }, true);
}

// ── History API interception ──────────────────────────────────────────────────
// SPA navigation (pushState/replaceState/popstate/hashchange) anında eski rating
// badge + JSON-LD'yi derhal temizler. PRODUCT_VIEW event'i gecikmeli gelse bile
// eski badge yeni ürün sayfasında flash etmez. Tema-bağımsız — tüm SPA nav
// yollarını yakalar (router.push, <Link>, back/forward, programmatic nav dahil).
//
// Pathname guard: yalnızca path değiştiğinde temizlik yapılır. Aynı ürün
// sayfasında varyant/query param değişimi (örn. ?variant=red → ?variant=blue)
// badge'i silmez — aksi halde bootstrapCache dolu olduğu için re-inject olmaz
// ve badge tamamen kaybolurdu.

var historyPatched = false;
var lastPathname = typeof location !== 'undefined' ? location.pathname : '';

function cleanupStaleRatingBadge() {
  try {
    if (location.pathname === lastPathname) return;
    lastPathname = location.pathname;
    var oldBadge = document.getElementById('ikr-rating-badge');
    if (oldBadge) oldBadge.remove();
    var oldJsonLd = document.getElementById('ikr-jsonld');
    if (oldJsonLd) oldJsonLd.remove();
  } catch (_) {}
}

export function attachHistoryListener() {
  if (historyPatched) return;
  historyPatched = true;

  var origPush = history.pushState;
  var origReplace = history.replaceState;

  history.pushState = function() {
    var ret = origPush.apply(this, arguments);
    cleanupStaleRatingBadge();
    return ret;
  };
  history.replaceState = function() {
    var ret = origReplace.apply(this, arguments);
    cleanupStaleRatingBadge();
    return ret;
  };
  window.addEventListener('popstate', cleanupStaleRatingBadge);
  window.addEventListener('hashchange', cleanupStaleRatingBadge);
}

export function attachEvents() {
  // History API patch — SPA nav'da eski badge'i anında temizle (IkasEvents'ten bağımsız)
  attachHistoryListener();

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
    if (product) {
      bootstrap(product.id, product.name);
    } else {
      // __NEXT_DATA__ henüz hazır olmayabilir — kısa polling ile tekrar dene (max 2sn)
      var pdAttempts = 0;
      function tryGetProduct() {
        var p = getProductFromPage();
        if (p) {
          bootstrap(p.id, p.name);
        } else if (pdAttempts < 20) {
          pdAttempts++;
          setTimeout(tryGetProduct, 100);
        }
      }
      setTimeout(tryGetProduct, 100);
    }
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

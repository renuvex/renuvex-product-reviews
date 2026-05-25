// events.js — SPA navigasyon history patch + quick-view modal badge plumbing
//
// Not: ikas IkasEvents aboneliği ve PAGE_VIEW / PRODUCT_VIEW / VIEW_LISTING
// işleme artık core/storefront-context.js içindedir (ADR_0013). Bu dosyada
// yalnızca IkasEvents'ten BAĞIMSIZ olan iki parça kalır:
//   - attachModalBadgeListener: quick-view modal için son tıklanan ürün slug'ı
//   - attachHistoryListener:    SPA navigasyonunda eski rating badge'i temizler

import { setLastClickedSlug } from './core/state.js';
import { extractSlug } from './core/helpers.js';

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
    var oldBadge = document.getElementById('renuvex-pr-rating-badge');
    if (oldBadge) oldBadge.remove();
    var oldJsonLd = document.getElementById('renuvex-pr-jsonld');
    if (oldJsonLd) oldJsonLd.remove();
  } catch (_) {}
}

export function attachHistoryListener() {
  if (historyPatched) return;
  historyPatched = true;

  // Function-level guard: only wrap history methods that are not already our
  // wrapper. `historyPatched` covers a double call within this module; the
  // `__renuvexPrPatched` tag additionally covers a second widget bundle instance
  // (duplicate injection) sharing the same global `history` object — without
  // it, each instance would wrap again and run cleanup once per extra wrap.
  if (!history.pushState.__renuvexPrPatched) {
    var origPush = history.pushState;
    history.pushState = function() {
      var ret = origPush.apply(this, arguments);
      cleanupStaleRatingBadge();
      return ret;
    };
    history.pushState.__renuvexPrPatched = true;
  }
  if (!history.replaceState.__renuvexPrPatched) {
    var origReplace = history.replaceState;
    history.replaceState = function() {
      var ret = origReplace.apply(this, arguments);
      cleanupStaleRatingBadge();
      return ret;
    };
    history.replaceState.__renuvexPrPatched = true;
  }

  // popstate/hashchange use the same named handler reference, so repeat
  // addEventListener calls are no-ops by the DOM spec — already idempotent.
  window.addEventListener('popstate', cleanupStaleRatingBadge);
  window.addEventListener('hashchange', cleanupStaleRatingBadge);
}

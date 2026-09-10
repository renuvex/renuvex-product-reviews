// events.js — SPA navigasyon history patch + quick-view modal badge plumbing
//
// Not: ikas IkasEvents aboneliği ve PAGE_VIEW / PRODUCT_VIEW / VIEW_LISTING
// işleme artık core/storefront-context.js içindedir (ADR_0013). Bu dosyada
// yalnızca IkasEvents'ten BAĞIMSIZ olan iki parça kalır:
//   - attachModalBadgeListener: attested product-card context for quick view
//   - attachHistoryListener:    SPA navigasyonunda eski PDP surfaces'lerini temizler

import { removeOwnedSlots } from './core/slot.js';
import { noteStorefrontRoute } from './core/context-epoch.js';
import { captureModalContextFromClick } from './placement/capability.js';

var modalClickAttached = false;

export function attachModalBadgeListener() {
  if (modalClickAttached) return;
  modalClickAttached = true;
  document.addEventListener('click', function(e) {
    var target = e.target;
    var a = target && target.closest ? target.closest('a[href]') : null;
    captureModalContextFromClick(a, target);
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

function cleanupStaleReviewSection() {
  try {
    var container = document.getElementById('renuvex-reviews');
    var root = container && container.shadowRoot;
    var content = root && root.querySelector('[data-renuvex-shadow-content]');
    var widget = content && content.querySelector('#renuvex-reviews-widget');
    if (!container || !content || !widget) return;

    content.replaceChildren();
    container.setAttribute('data-renuvex-transitioning', 'true');
  } catch (_) {}
}

function cleanupStalePdpSurfaces() {
  try {
    if (location.pathname === lastPathname) return;
    lastPathname = location.pathname;
    noteStorefrontRoute();

    cleanupStaleReviewSection();

    if (typeof window.__renuvexPrCleanupPdpBadge === 'function') {
      window.__renuvexPrCleanupPdpBadge();
    } else {
      removeOwnedSlots('product-title-rating');
      var legacyBadge = document.getElementById('renuvex-pr-rating-badge');
      if (legacyBadge) legacyBadge.remove();
      document.querySelectorAll('.renuvex-pr-rating-badge--pdp').forEach(function (node) {
        node.remove();
      });
    }

    if (typeof window.__renuvexPrCleanupStructuredData === 'function') {
      window.__renuvexPrCleanupStructuredData();
    } else {
      var oldJsonLd = document.getElementById('renuvex-pr-jsonld');
      if (oldJsonLd) oldJsonLd.remove();
    }
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
      cleanupStalePdpSurfaces();
      return ret;
    };
    history.pushState.__renuvexPrPatched = true;
  }
  if (!history.replaceState.__renuvexPrPatched) {
    var origReplace = history.replaceState;
    history.replaceState = function() {
      var ret = origReplace.apply(this, arguments);
      cleanupStalePdpSurfaces();
      return ret;
    };
    history.replaceState.__renuvexPrPatched = true;
  }

  // popstate/hashchange use the same named handler reference, so repeat
  // addEventListener calls are no-ops by the DOM spec — already idempotent.
  window.addEventListener('popstate', cleanupStalePdpSurfaces);
  window.addEventListener('hashchange', cleanupStalePdpSurfaces);
}

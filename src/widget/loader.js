// loader.js — Widget orkestrasyon katmanı (ince loader)
//
// index.js'ten çağrılır. Tüm orkestrasyon mantığı buradadır:
//   - startWidget()  : prod modu — storefront-context + registry + surfaces +
//                      SPA/observer plumbing'ini başlatır.
//   - startPreview() : preview modu — admin iframe postMessage kanalı + mock bootstrap.
//
// Tek IIFE bundle — buraya dinamik import() EKLENMEZ. Tüm modüller statik import
// edilir ve widget.js içinde mevcuttur (ADR_0013).

import { attachHistoryListener, attachModalBadgeListener } from './events.js';
import { startMutationObserver } from './observer.js';
import { initStorefrontContext, onProductView, onPageView, getProductContext } from './core/storefront-context.js';
import { mountMatching } from './core/registry.js';
import { registerCoreSurfaces } from './surfaces/index.js';
import { renderListingBadges } from './listing-badges/index.js';
import { ls } from './core/state.js';
import {
  currentSettings, currentProductId, currentProductName,
  currentOrderBy, currentPage, currentReviewsData,
} from './core/state.js';
import { bootstrap } from './product-widget/bootstrap.js';
import { render } from './product-widget/render.js';

// ── Prod modu ────────────────────────────────────────────────────────────────

function initWidget() {
  // 1) Çekirdek yüzeyleri registry'ye kaydet (reviews-main + listing-badge).
  registerCoreSurfaces();

  // 2) Storefront Events bağlam katmanını başlat — IkasEvents aboneliği +
  //    DOM ürün tespiti fallback'i. (onProductView/onPageView'dan ÖNCE çağrılır;
  //    senkron fırlatılan event'ler storefront-context replay'i ile yakalanır.)
  initStorefrontContext();

  // 3) SPA navigasyon + quick-view modal plumbing (IkasEvents'ten bağımsız).
  attachHistoryListener();
  attachModalBadgeListener();

  // 4) Slider / infinite-scroll ile gelen yeni ürün kartları için observer.
  startMutationObserver();

  // 5) Bağlam → registry yönlendirmesi.
  onProductView(function (product) {
    mountMatching({ trigger: 'product', product: product });
  });
  onPageView(function (page) {
    mountMatching({ trigger: 'page', pageType: page.pageType });
  });

  // 6) Fallback: PAGE_VIEW 2sn içinde gelmezse (eski ikas versiyonları) listing
  //    badge'leri manuel tetikle.
  setTimeout(function () { if (!ls.rendered) renderListingBadges(); }, 2000);
}

export function startWidget() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else {
    initWidget();
  }
}

// ── Preview modu ─────────────────────────────────────────────────────────────
// Admin iframe önizlemesi. Preview tek yüzeye sahiptir ve kendi re-render
// kanalını kullanır — registry'den ve storefront-context'ten GEÇMEZ.

function onPreviewMessage(event) {
  var data = event.data;
  if (!data || data.type !== 'IKR_SETTINGS_UPDATE') return;
  var s = data.settings;
  if (!s || !currentSettings) return;
  // Mevcut settings ile merge edip yeniden render et
  var merged = Object.assign({}, currentSettings, s);
  render(currentProductId, merged, currentReviewsData, currentProductName, currentOrderBy, currentPage);
  window.dispatchEvent(new CustomEvent('IKR_SETTINGS_UPDATED_PREVIEW', { detail: { settings: merged } }));
}

function initPreview() {
  bootstrap('mock-product', 'Örnek Ürün');
  try { window.parent.postMessage({ type: 'IKR_WIDGET_READY' }, '*'); } catch (e) {}
}

export function startPreview() {
  // postMessage listener'ı hemen bağlanır (initPreview DOMContentLoaded'a gate'li).
  window.addEventListener('message', onPreviewMessage);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreview);
  } else {
    initPreview();
  }
}

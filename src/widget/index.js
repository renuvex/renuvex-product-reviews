// index.js — Widget entry point
// ikas tarafından her sayfaya inject edilir: <script src="/widget.js?publicApiKey=...">

import { PUBLIC_API_KEY, API_BASE } from './core/config.js';
import { attachEvents, attachModalBadgeListener } from './events.js';
import { startMutationObserver } from './observer.js';
import { bootstrap } from './product-widget/bootstrap.js';
import { render } from './product-widget/render.js';
import { currentSettings, currentProductId, currentProductName, currentOrderBy, currentPage, currentReviewsData } from './core/state.js';
var IS_PREVIEW = window.__ikasPreviewMode === true;

// Preview modunda postMessage ile ayarları dinle — tam re-render
if (IS_PREVIEW) {
  window.addEventListener('message', function(event) {
    var data = event.data;
    if (!data || data.type !== 'IKR_SETTINGS_UPDATE') return;
    var s = data.settings;
    if (!s || !currentSettings) return;
    // Mevcut settings ile merge edip yeniden render et
    var merged = Object.assign({}, currentSettings, s);
    render(currentProductId, merged, currentReviewsData, currentProductName, currentOrderBy, currentPage);
    window.dispatchEvent(new CustomEvent('IKR_SETTINGS_UPDATED_PREVIEW'));
  });

  function notifyReady() {
    try { window.parent.postMessage({ type: 'IKR_WIDGET_READY' }, '*'); } catch (e) {}
  }

  function initPreview() {
    bootstrap('mock-product', 'Örnek Ürün');
    notifyReady();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreview);
  } else {
    initPreview();
  }
} else if (PUBLIC_API_KEY) {
  // Normal mod
  function init() {
    attachEvents();
    attachModalBadgeListener();
    startMutationObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

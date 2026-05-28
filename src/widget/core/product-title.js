// core/product-title.js - finds the PDP product title element.
// Theme adapters get the first chance; generic text/h1 matching is fallback.

import { getThemeAdapter } from '../themes/current-adapter.js';

export function findProductTitleEl(productName) {
  var adapter = getThemeAdapter();
  if (adapter && typeof adapter.findProductTitle === 'function') {
    try {
      var byTheme = adapter.findProductTitle(productName);
      if (byTheme) return byTheme;
    } catch (_) {}
  }

  if (productName) {
    var allEls = document.querySelectorAll('h1,h2,h3,h4,h5,h6,div,span,p');
    for (var i = 0; i < allEls.length; i++) {
      var el = allEls[i];
      if (
        el.children.length === 0 &&
        el.textContent.trim() === productName &&
        el.tagName !== 'TITLE' &&
        !el.closest('[data-renuvex-listing-badge]') &&
        !el.closest('[data-renuvex-slot]') &&
        !el.closest('#renuvex-reviews') &&
        !el.closest('nav') &&
        !el.closest('header') &&
        !el.closest('[class*="breadcrumb"]') &&
        !el.closest('[aria-label*="breadcrumb"]')
      ) {
        return el;
      }
    }
  }
  return document.querySelector('h1');
}

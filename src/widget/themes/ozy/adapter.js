// themes/ozy/adapter.js - Ozy placement adapter.
//
// ikas has no stable storefront section data-* contract today. Storefront Events
// provide page/product context; strict DOM selectors provide placement proof.

import {
  THEME_LISTING_TITLE_SELECTOR,
  THEME_PRODUCT_TITLE_SELECTOR,
  THEME_MODAL_SELECTOR,
  THEME_MODAL_TITLE_SELECTOR,
  THEME_STRICT_PRODUCT_CONTAINERS,
} from './theme.js';

export var ozyThemeAdapter = {
  key: 'ozy',
  runtimeDetectable: true,

  findStrictProductTitles: function () {
    return Array.from(document.querySelectorAll(THEME_PRODUCT_TITLE_SELECTOR));
  },

  matchesStrictProductTitle: function (element) {
    return !!(element && element.matches && element.matches(THEME_PRODUCT_TITLE_SELECTOR));
  },

  findStrictListingContainers: function () {
    return Array.from(document.querySelectorAll(THEME_STRICT_PRODUCT_CONTAINERS));
  },

  findStrictListingTitles: function (container) {
    return container ? Array.from(container.querySelectorAll(THEME_LISTING_TITLE_SELECTOR)) : [];
  },

  matchesStrictListingTitle: function (element) {
    return !!(element && element.matches && element.matches(THEME_LISTING_TITLE_SELECTOR));
  },

  findStrictModals: function () {
    return Array.from(document.querySelectorAll(THEME_MODAL_SELECTOR));
  },

  matchesStrictModalTitle: function (element) {
    return !!(element && element.matches && element.matches(THEME_MODAL_TITLE_SELECTOR));
  },

  findProductTitle: function (productName) {
    var candidates = Array.from(document.querySelectorAll(THEME_PRODUCT_TITLE_SELECTOR));
    if (productName) {
      var exact = candidates.find(function (el) {
        return el && el.textContent && el.textContent.trim() === productName;
      });
      if (exact) return exact;
    }
    return candidates[0] || null;
  },

  findModalTitle: function (modal) {
    return modal ? modal.querySelector(THEME_MODAL_TITLE_SELECTOR) : null;
  },

  // Optional badge mount-point override for themes whose card layout breaks
  // the default sibling-of-title placement. Ozy works fine with the default
  // (returns null → caller falls back to the title sibling mount in inject.js),
  // but this surface is here so future themes can pin a specific element
  // without touching listing-badges/inject.js. See ADR_0017.
  getListingBadgeMountPoint: function (_titleEl) {
    return null;
  },

  getProductBadgeMountPoint: function (titleEl) {
    if (!titleEl || !titleEl.parentNode) return null;
    return { parent: titleEl.parentNode, anchorEl: titleEl, position: 'after' };
  },
};

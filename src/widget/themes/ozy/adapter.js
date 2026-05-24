// themes/ozy/adapter.js - verified Ozy theme fallback adapter.
//
// ikas has no stable storefront section data-* contract today. Storefront Events
// provide page/product context; DOM selectors remain a theme fallback.

import {
  THEME_LISTING_TITLE_SELECTOR,
  THEME_PRODUCT_TITLE_SELECTOR,
  THEME_MODAL_SELECTOR,
  THEME_MODAL_TITLE_SELECTOR,
  THEME_SINGLE_PRODUCT_CONTAINER,
  THEME_SINGLE_PRODUCT_NAME_LINK,
  THEME_BANNER_CONTAINERS,
  THEME_PRODUCT_CONTAINERS,
} from './theme.js';

export var ozyThemeAdapter = {
  key: 'ozy',

  findListingContainers: function () {
    return Array.from(document.querySelectorAll(THEME_PRODUCT_CONTAINERS));
  },

  findListingTitle: function (scope) {
    return scope.querySelector(THEME_LISTING_TITLE_SELECTOR);
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

  findModal: function () {
    return document.querySelector(THEME_MODAL_SELECTOR);
  },

  findModalTitle: function (modal) {
    return modal ? modal.querySelector(THEME_MODAL_TITLE_SELECTOR) : null;
  },

  isNavigationLink: function (a) {
    return !!(a.closest('header') || a.closest('nav'));
  },

  isCartLink: function (a) {
    return !!(a.closest('[class*="basket"]') || a.closest('[class*="cart"]'));
  },

  isBannerLink: function (a) {
    return !!a.closest(THEME_BANNER_CONTAINERS);
  },

  isDisallowedSingleProductLink: function (a, currentSlug, slug) {
    if (a.closest(THEME_SINGLE_PRODUCT_CONTAINER) && !a.closest(THEME_SINGLE_PRODUCT_NAME_LINK)) {
      return true;
    }
    return slug === currentSlug && !!a.closest(THEME_SINGLE_PRODUCT_NAME_LINK);
  },

  findSingleProductContainer: function () {
    return document.querySelector(THEME_SINGLE_PRODUCT_CONTAINER);
  },

  isInsideSingleProductContainer: function (el) {
    return !!(el && el.closest && el.closest(THEME_SINGLE_PRODUCT_CONTAINER));
  },

  // Optional badge mount-point override for themes whose card layout breaks
  // the default sibling-of-title placement. Ozy works fine with the default
  // (returns null → caller falls back to sibling or legacy per rollout gate),
  // but this surface is here so future themes can pin a specific element
  // without touching listing-badges/inject.js. See ADR_0017 draft.
  getListingBadgeMountPoint: function (_titleEl) {
    return null;
  },

  getProductBadgeMountPoint: function (titleEl) {
    if (!titleEl || !titleEl.parentNode) return null;
    return { parent: titleEl.parentNode, anchorEl: titleEl, position: 'after' };
  },
};

// themes/ozy/adapter.js - verified Ozy theme fallback adapter.
//
// ikas has no stable storefront section data-* contract today. Storefront Events
// provide page/product context; DOM selectors remain a theme fallback.

import {
  THEME_LISTING_TITLE_SELECTOR,
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
};

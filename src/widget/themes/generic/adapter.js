// themes/generic/adapter.js - conservative fallback for unknown ikas themes.

export var genericThemeAdapter = {
  key: 'generic',

  findListingContainers: function () {
    return [];
  },

  findListingTitle: function (_scope) {
    return null;
  },

  findProductTitle: function (_productName) {
    return null;
  },

  findModal: function () {
    return null;
  },

  findModalTitle: function (_modal) {
    return null;
  },

  isNavigationLink: function (a) {
    return !!(a && a.closest && a.closest('header, nav, [role="navigation"], [class*="header"], [class*="nav"], [class*="menu"]'));
  },

  isCartLink: function (a) {
    if (!a) return false;
    var href = (a.getAttribute('href') || '').toLowerCase();
    return /\/(cart|basket|sepet)(\/|$|\?)/.test(href) || !!(a.closest && a.closest('[class*="cart"], [class*="basket"], [class*="sepet"]'));
  },

  isBannerLink: function (a) {
    return !!(a && a.closest && a.closest('[class*="banner"], [class*="hero"], [class*="slider"], [class*="swiper"], [data-testid*="banner"]'));
  },

  isDisallowedSingleProductLink: function (_a, _currentSlug, _slug) {
    return false;
  },

  findSingleProductContainer: function () {
    return null;
  },

  isInsideSingleProductContainer: function (_el) {
    return false;
  },

  getListingBadgeMountPoint: function (_titleEl) {
    return null;
  },

  getProductBadgeMountPoint: function (titleEl) {
    if (!titleEl || !titleEl.parentNode) return null;
    return { parent: titleEl.parentNode, anchorEl: titleEl, position: 'after' };
  },
};

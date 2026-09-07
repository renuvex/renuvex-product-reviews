// themes/generic/adapter.js - conservative fallback for unknown ikas themes.

export var genericThemeAdapter = {
  key: 'generic',

  findProductTitle: function (_productName) {
    return null;
  },

  findModalTitle: function (_modal) {
    return null;
  },

  getListingBadgeMountPoint: function (_titleEl) {
    return null;
  },

  getProductBadgeMountPoint: function (titleEl) {
    if (!titleEl || !titleEl.parentNode) return null;
    return { parent: titleEl.parentNode, anchorEl: titleEl, position: 'after' };
  },
};

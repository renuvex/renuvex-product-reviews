// themes/current-adapter.js - active storefront theme adapter.
//
// Adapter selection is driven by non-sensitive metadata returned from
// /api/public/settings. ikas does not expose a runtime DOM mount-point contract,
// so adapters only answer placement/context questions; visual rendering stays in
// the shared badge/review components.

import { genericThemeAdapter } from './generic/adapter.js';
import { ozyThemeAdapter } from './ozy/adapter.js';

var activeThemeAdapterKey = 'ozy';

var ADAPTER_DEFAULTS = {
  key: 'generic',
  findListingContainers: function () { return []; },
  findListingTitle: function (_scope) { return null; },
  findProductTitle: function (_productName) { return null; },
  findModal: function () { return null; },
  findModalTitle: function (_modal) { return null; },
  isNavigationLink: function (_a) { return false; },
  isCartLink: function (_a) { return false; },
  isBannerLink: function (_a) { return false; },
  isDisallowedSingleProductLink: function (_a, _currentSlug, _slug) { return false; },
  findSingleProductContainer: function () { return null; },
  isInsideSingleProductContainer: function (_el) { return false; },
  getListingBadgeMountPoint: function (_titleEl) { return null; },
  getProductBadgeMountPoint: function (titleEl) {
    if (!titleEl || !titleEl.parentNode) return null;
    return { parent: titleEl.parentNode, anchorEl: titleEl, position: 'after' };
  },
};

var THEME_ADAPTERS = {
  generic: genericThemeAdapter,
  ozy: ozyThemeAdapter,
};

export function setThemeAdapterKey(key) {
  activeThemeAdapterKey = key === 'generic' ? 'generic' : 'ozy';
}

export function getThemeAdapterKey() {
  return activeThemeAdapterKey;
}

export function getThemeAdapter() {
  return Object.assign({}, ADAPTER_DEFAULTS, THEME_ADAPTERS[activeThemeAdapterKey] || ozyThemeAdapter);
}

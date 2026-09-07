// themes/current-adapter.js - active storefront theme adapter.
//
// Adapter selection is driven by non-sensitive metadata returned from
// /api/public/settings. ikas does not expose a runtime DOM mount-point contract,
// so adapters only answer placement/context questions; visual rendering stays in
// the shared badge/review components.
//
// ADR_0038: placementPolicy is the sole production auto-placement authority.
// reviewsMountEnabled remains independent because the explicit review mount is
// structurally isolated from theme-specific badge placement.

import { genericThemeAdapter } from './generic/adapter.js';
import { ozyThemeAdapter } from './ozy/adapter.js';

var activeThemeAdapterKey = 'generic';

// Defaults are intentionally fail-closed. The widget loads with both gates
// OFF until settings.js applies the runtime payload from /api/public/settings.
// If the settings fetch fails (404, network), the widget stays silent rather
// than auto-placing badges with stale/unknown adapter data.
var previewAutoPlacementEnabled = false;
var placementPolicy = { version: 1, mode: 'disabled' };
var reviewsMountEnabled = false;

var ADAPTER_DEFAULTS = {
  key: 'generic',
  runtimeDetectable: false,
  findStrictProductTitles: function () { return []; },
  matchesStrictProductTitle: function (_element) { return false; },
  findStrictListingContainers: function () { return []; },
  findStrictListingTitles: function (_container) { return []; },
  matchesStrictListingTitle: function (_element) { return false; },
  findStrictModals: function () { return []; },
  matchesStrictModalTitle: function (_element) { return false; },
  findProductTitle: function (_productName) { return null; },
  findModalTitle: function (_modal) { return null; },
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

// Adapter keys are accepted only from the registry. Unknown keys resolve to
// generic so malformed settings cannot silently select Ozy.
export function setThemeAdapterKey(key) {
  activeThemeAdapterKey = typeof key === 'string' && Object.prototype.hasOwnProperty.call(THEME_ADAPTERS, key)
    ? key
    : 'generic';
}

export function getThemeAdapterKey() {
  return activeThemeAdapterKey;
}

export function getThemeAdapter() {
  return Object.assign({}, ADAPTER_DEFAULTS, THEME_ADAPTERS[activeThemeAdapterKey] || genericThemeAdapter);
}

export function getThemeAdapterByKey(key) {
  if (typeof key !== 'string' || !Object.prototype.hasOwnProperty.call(THEME_ADAPTERS, key)) return null;
  return Object.assign({}, ADAPTER_DEFAULTS, THEME_ADAPTERS[key]);
}

export function getRuntimeDetectableThemeAdapters() {
  return Object.keys(THEME_ADAPTERS).map(getThemeAdapterByKey).filter(function (adapter) {
    return !!(adapter && adapter.runtimeDetectable === true);
  });
}

export function setPlacementPolicy(value) {
  var mode = value && value.version === 1 ? value.mode : null;
  var valid = mode === 'provider_verified' || mode === 'runtime_attestation' || mode === 'disabled';
  placementPolicy = valid
    ? { version: 1, mode: mode }
    : { version: 1, mode: 'disabled' };
  return valid;
}

export function getPlacementPolicy() {
  return placementPolicy;
}

// Preview has an explicit opt-in because its fixture DOM intentionally uses a
// separate renderer. Production callers are authorized only by placementPolicy.
export function setAutoPlacementEnabled(value) {
  previewAutoPlacementEnabled = value === true;
}

export function isAutoPlacementEnabled() {
  return previewAutoPlacementEnabled || placementPolicy.mode !== 'disabled';
}

export function setReviewsMountEnabled(value) {
  reviewsMountEnabled = value === true;
}

export function isReviewsMountEnabled() {
  return reviewsMountEnabled;
}

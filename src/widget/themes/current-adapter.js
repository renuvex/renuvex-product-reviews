// themes/current-adapter.js - active storefront theme adapter.
//
// Adapter selection is driven by non-sensitive metadata returned from
// /api/public/settings. ikas does not expose a runtime DOM mount-point contract,
// so adapters only answer placement/context questions; visual rendering stays in
// the shared badge/review components.
//
// ADR_0022 — Placement allowlist. The runtime also carries two boolean
// gates (`autoPlacementEnabled`, `reviewsMountEnabled`) derived server-side
// from the active theme's adapterMatchedBy. Badge inject paths and the
// review-section mount consult these gates so unknown themes silently skip
// auto-placement instead of guessing with the generic adapter.

import { genericThemeAdapter } from './generic/adapter.js';
import { ozyThemeAdapter } from './ozy/adapter.js';

var activeThemeAdapterKey = 'ozy';

// Defaults are intentionally fail-closed. The widget loads with both gates
// OFF until settings.js applies the runtime payload from /api/public/settings.
// If the settings fetch fails (404, network), the widget stays silent rather
// than auto-placing badges with stale/unknown adapter data.
var autoPlacementEnabled = false;
var reviewsMountEnabled = false;

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

// setThemeAdapterKey — accept any key registered in THEME_ADAPTERS.
//
// Previously this hard-coded `key === 'generic' ? 'generic' : 'ozy'`. That
// worked for the two-adapter world but forced every new theme addition to
// also remember to widen this whitelist. The map-driven version keeps the
// adapter registry as the single source of truth: register an adapter in
// THEME_ADAPTERS and it becomes a valid runtime key automatically.
//
// Fallback stays 'ozy' for unknown keys to match the historical contract
// (FALLBACK_RUNTIME in src/lib/storefront-theme.ts also defaults to 'ozy'
// when no metadata is available). Combined with ADR_0022's
// autoPlacementEnabled gate, an unknown key falling through to Ozy adapter
// cannot trigger DOM-heuristic placement on an unsupported theme — the
// placement allowlist is the safety net here.
export function setThemeAdapterKey(key) {
  activeThemeAdapterKey = typeof key === 'string' && Object.prototype.hasOwnProperty.call(THEME_ADAPTERS, key)
    ? key
    : 'ozy';
}

export function getThemeAdapterKey() {
  return activeThemeAdapterKey;
}

export function getThemeAdapter() {
  return Object.assign({}, ADAPTER_DEFAULTS, THEME_ADAPTERS[activeThemeAdapterKey] || ozyThemeAdapter);
}

// ADR_0022 setters/getters. Booleans only; settings.js coerces the runtime
// payload to true/false before calling these.
export function setAutoPlacementEnabled(value) {
  autoPlacementEnabled = value === true;
}

export function isAutoPlacementEnabled() {
  return autoPlacementEnabled;
}

export function setReviewsMountEnabled(value) {
  reviewsMountEnabled = value === true;
}

export function isReviewsMountEnabled() {
  return reviewsMountEnabled;
}

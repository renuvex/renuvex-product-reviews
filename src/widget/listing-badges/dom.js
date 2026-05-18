// listing-badges/dom.js - scoped DOM discovery helpers for listing badges.

import { collectLinksFromScopes, getMainContentScopes, isStructurallySkipped } from '../core/link-scope.js';
import { getThemeAdapter } from '../themes/current-adapter.js';

export function isVisibleForBadge(el) {
  if (!el || typeof el.getClientRects !== 'function' || el.getClientRects().length === 0) return false;
  var style = window.getComputedStyle(el);
  return style.display !== 'none' && style.visibility !== 'hidden';
}

export function collectListingLinks(adapter) {
  var activeAdapter = adapter || getThemeAdapter();
  var containers = activeAdapter && activeAdapter.findListingContainers
    ? activeAdapter.findListingContainers()
    : [];
  var scopes = containers && containers.length ? containers : getMainContentScopes();
  return collectLinksFromScopes(scopes);
}

// listing-badges/dom.js - scoped DOM discovery helpers for listing badges.

import { getThemeAdapter } from '../themes/current-adapter.js';

var MAIN_CONTENT_SELECTOR = 'main,[role="main"]';
var STRUCTURAL_SKIP_SELECTOR = 'header,nav,footer,[role="navigation"],[role="banner"],[role="contentinfo"]';

export function isVisibleForBadge(el) {
  if (!el || typeof el.getClientRects !== 'function' || el.getClientRects().length === 0) return false;
  var style = window.getComputedStyle(el);
  return style.display !== 'none' && style.visibility !== 'hidden';
}

function isStructurallySkipped(el) {
  return !!(el && el.closest && el.closest(STRUCTURAL_SKIP_SELECTOR));
}

function pushLink(links, seen, link) {
  if (!link || !link.href || seen.indexOf(link) !== -1) return;
  if (isStructurallySkipped(link)) return;
  seen.push(link);
  links.push(link);
}

function pushLinksFromScope(links, seen, scope) {
  if (!scope || isStructurallySkipped(scope)) return;
  if (scope.tagName === 'A' && scope.href) {
    pushLink(links, seen, scope);
    return;
  }
  scope.querySelectorAll('a[href]').forEach(function(a) {
    pushLink(links, seen, a);
  });
}

function getFallbackScopes() {
  var scopes = Array.from(document.querySelectorAll(MAIN_CONTENT_SELECTOR)).filter(function(scope) {
    return !isStructurallySkipped(scope);
  });
  return scopes.length ? scopes : (document.body ? [document.body] : []);
}

export function collectListingLinks(adapter) {
  var activeAdapter = adapter || getThemeAdapter();
  var containers = activeAdapter && activeAdapter.findListingContainers
    ? activeAdapter.findListingContainers()
    : [];
  var scopes = containers && containers.length ? containers : getFallbackScopes();
  var links = [];
  var seen = [];

  scopes.forEach(function(scope) {
    pushLinksFromScope(links, seen, scope);
  });

  return links;
}

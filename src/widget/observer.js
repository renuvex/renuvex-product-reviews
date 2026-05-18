// observer.js - MutationObserver for lazy product-card content.

import { extractSlug, SYSTEM_SLUGS } from './core/helpers.js';
import { ls } from './core/state.js';
import { loadListingBadgesModule } from './core/lazy-modules.js';
import { collectLinksFromScopes, getMainContentScopes } from './core/link-scope.js';
import { getThemeAdapter } from './themes/current-adapter.js';

var mutationDebounceTimer = null;
var mutationObserver = null;

function renderListingBadgesLazy() {
  return loadListingBadgesModule().then(function (mod) {
    mod.renderListingBadges();
  });
}

function getObserverListingScopes() {
  var activeAdapter = getThemeAdapter();
  var containers = activeAdapter && activeAdapter.findListingContainers
    ? activeAdapter.findListingContainers()
    : [];
  return containers && containers.length ? containers : getMainContentScopes();
}

function hasUnbadgedListingLinks() {
  return collectLinksFromScopes(getObserverListingScopes()).some(function(a) {
    if (a.getAttribute('data-ikr-badge')) return false;
    var path = extractSlug(a.href);
    return path && path.length >= 3 && !SYSTEM_SLUGS.test(path);
  });
}

export function startMutationObserver() {
  if (typeof MutationObserver === 'undefined') return;
  // Idempotent: a repeat call must not attach a second observer to <body>.
  // The instance is kept in module scope so this guard can detect a prior
  // start — the audit flagged that it was previously unguarded.
  if (mutationObserver) return;
  if (!document.body) return;
  mutationObserver = new MutationObserver(function(mutations) {
    var hasRelevantMutation = mutations.some(function(m) {
      return Array.from(m.addedNodes).some(function(node) {
        if (node.nodeType !== 1) return false;
        if (node.hasAttribute && (node.hasAttribute('data-ikr-listing-badge') || node.id === 'ikr-rating-badge' || node.id === 'ikr-reviews-widget')) return false;
        if (node.closest && (node.closest('[data-ikr-listing-badge]') || node.closest('#ikr-rating-badge') || node.closest('#ikr-reviews-widget'))) return false;
        if (node.querySelector && node.querySelector('[data-ikr-listing-badge],#ikr-reviews-widget,#ikr-rating-badge')) return false;
        return true;
      });
    });
    if (!hasRelevantMutation) return;
    clearTimeout(mutationDebounceTimer);
    mutationDebounceTimer = setTimeout(function() {
      if (!hasUnbadgedListingLinks()) return;
      ls.rendered = false;
      renderListingBadgesLazy().catch(function (err) {
        console.error('[ikr] listing badge lazy render error:', err);
      });
    }, 300);
  });
  mutationObserver.observe(document.body, { childList: true, subtree: true });
}

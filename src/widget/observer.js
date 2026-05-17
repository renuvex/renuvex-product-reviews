// observer.js - MutationObserver for lazy product-card content.

import { extractSlug, SYSTEM_SLUGS } from './core/helpers.js';
import { ls } from './core/state.js';
import { loadListingBadgesModule } from './core/lazy-modules.js';

var mutationDebounceTimer = null;

function renderListingBadgesLazy() {
  return loadListingBadgesModule().then(function (mod) {
    mod.renderListingBadges();
  });
}

export function startMutationObserver() {
  if (typeof MutationObserver === 'undefined') return;
  var observer = new MutationObserver(function(mutations) {
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
      var hasUnbadged = Array.from(document.querySelectorAll('a[href]')).some(function(a) {
        if (a.getAttribute('data-ikr-badge')) return false;
        var path = extractSlug(a.href);
        return path && path.length >= 3 && !SYSTEM_SLUGS.test(path);
      });
      if (!hasUnbadged) return;
      ls.rendered = false;
      renderListingBadgesLazy().catch(function (err) {
        console.error('[ikr] listing badge lazy render error:', err);
      });
    }, 300);
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

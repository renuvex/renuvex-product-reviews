// observer.js - MutationObserver for lazy product-card content.

import { ls } from './core/state.js';
import { scheduleListingBadgeHydration } from './core/listing-viewport-gate.js';
import {
  collectListingPlacementProofs,
  hasRuntimeDetectableListingSignature,
  reconcileModalPlacementContext,
  resolveModalPlacementProof,
} from './placement/capability.js';
import { getStorefrontContextEpoch } from './core/context-epoch.js';

var mutationDebounceTimer = null;
var mutationObserver = null;

function hasUnbadgedListingLinks() {
  var modalProof = resolveModalPlacementProof();
  if (modalProof && !modalProof.titleEl.querySelector('[data-renuvex-listing-badge]')) return true;
  var proofs = collectListingPlacementProofs(getStorefrontContextEpoch());
  if (proofs.length) {
    return proofs.some(function (proof) {
      if (!proof.linkEl.getAttribute('data-renuvex-badge')) return true;
      var slots = proof.mountPoint.parent.querySelectorAll('[data-renuvex-slot="listing-rating"]');
      return !Array.from(slots).some(function (slot) {
        return slot.getAttribute('data-renuvex-product-slug') === String(proof.slug);
      });
    });
  }
  return hasRuntimeDetectableListingSignature();
}

export function startMutationObserver() {
  if (typeof MutationObserver === 'undefined') return;
  // Idempotent: a repeat call must not attach a second observer to <body>.
  // The instance is kept in module scope so this guard can detect a prior
  // start — the audit flagged that it was previously unguarded.
  if (mutationObserver) return;
  if (!document.body) return;
  mutationObserver = new MutationObserver(function(mutations) {
    reconcileModalPlacementContext();
    var hasRelevantMutation = mutations.some(function(m) {
      if (m.type === 'attributes') {
        var target = m.target;
        return !(target && target.closest && target.closest('[data-renuvex-slot],[data-renuvex-listing-badge],#renuvex-pr-rating-badge,#renuvex-pr-reviews-widget'));
      }
      return Array.from(m.addedNodes).some(function(node) {
        if (node.nodeType !== 1) return false;
        if (node.hasAttribute && (node.hasAttribute('data-renuvex-slot') || node.hasAttribute('data-renuvex-listing-badge') || node.id === 'renuvex-pr-rating-badge' || node.id === 'renuvex-pr-reviews-widget')) return false;
        if (node.closest && (node.closest('[data-renuvex-slot]') || node.closest('[data-renuvex-listing-badge]') || node.closest('#renuvex-pr-rating-badge') || node.closest('#renuvex-pr-reviews-widget'))) return false;
        if (node.querySelector && node.querySelector('[data-renuvex-slot],[data-renuvex-listing-badge],#renuvex-pr-reviews-widget,#renuvex-pr-rating-badge')) return false;
        return true;
      });
    });
    if (!hasRelevantMutation) return;
    clearTimeout(mutationDebounceTimer);
    mutationDebounceTimer = setTimeout(function() {
      if (!hasUnbadgedListingLinks()) return;
      ls.rendered = false;
      scheduleListingBadgeHydration().catch(function (err) {
        console.error('[renuvex-pr] listing badge viewport schedule error:', err);
      });
    }, 300);
  });
  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['href', 'class', 'style', 'aria-hidden', 'open'],
  });
}

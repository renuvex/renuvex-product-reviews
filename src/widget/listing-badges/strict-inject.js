import { createBadgeEl, createBadgePlaceholderEl } from '../core/badge.js';
import { probeWidgetVisibility, watchOneTimeRemoval } from '../core/health.js';
import { placeOwnedSlot, watchOwnedSlotPosition } from '../core/slot-position.js';
import { isAutoPlacementEnabled } from '../themes/current-adapter.js';
import {
  getResolvedListingPlacementProof,
  resolveModalPlacementProof,
  validateListingPlacementCandidate,
  validateListingPlacementProof,
  validateModalPlacementProof,
} from '../placement/capability.js';

var removalObservers = [];
var positionObservers = [];

function normalizeProductId(value) {
  if (typeof value !== 'string') return null;
  var normalized = value.trim();
  return normalized && normalized.length <= 128 ? normalized : null;
}

function getJustify(element) {
  var align = window.getComputedStyle(element).textAlign;
  return align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';
}

function findVisibleSlot(parent, productId) {
  var normalizedProductId = normalizeProductId(productId);
  if (!parent || !normalizedProductId) return null;
  var nodes = parent.querySelectorAll('[data-renuvex-slot="listing-rating"]');
  for (var i = 0; i < nodes.length; i++) {
    var badge = nodes[i].querySelector('.renuvex-pr-rating-badge--listing');
    if (nodes[i].getAttribute('data-renuvex-product-id') === normalizedProductId &&
        badge && badge.getAttribute('data-renuvex-product-id') === normalizedProductId) return nodes[i];
  }
  return null;
}

function findPlaceholder(parent, slug) {
  if (!parent) return null;
  var nodes = parent.querySelectorAll('[data-renuvex-slot="listing-rating-placeholder"]');
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].getAttribute('data-renuvex-product-slug') === String(slug)) return nodes[i];
  }
  return null;
}

function clearLinkMarker(linkEl) {
  if (!linkEl) return;
  linkEl.removeAttribute('data-renuvex-badge');
  linkEl.removeAttribute('data-renuvex-badge-product-id');
}

function expectedCandidateProductId(candidate) {
  var resolved = getResolvedListingPlacementProof(candidate);
  return normalizeProductId(resolved && resolved.productId);
}

function removeStaleSlots(candidate) {
  if (!candidate || !candidate.mountPoint || !candidate.mountPoint.parent) return;
  var expectedProductId = expectedCandidateProductId(candidate);
  candidate.mountPoint.parent
    .querySelectorAll('[data-renuvex-slot="listing-rating"],[data-renuvex-slot="listing-rating-placeholder"]')
    .forEach(function (slot) {
      if (slot.getAttribute('data-renuvex-slot') === 'listing-rating') {
        var badge = slot.querySelector('.renuvex-pr-rating-badge--listing');
        if (!expectedProductId || slot.getAttribute('data-renuvex-product-id') !== expectedProductId ||
            !badge || badge.getAttribute('data-renuvex-product-id') !== expectedProductId) {
          slot.remove();
          clearLinkMarker(candidate.linkEl);
        }
        return;
      }
      if (slot.getAttribute('data-renuvex-product-slug') !== String(candidate.slug)) slot.remove();
    });
}

function createBadge(rating, proof, iconPair, badgeSettings) {
  if (!validateListingPlacementProof(proof) || !normalizeProductId(proof.productId)) return null;
  return createBadgeEl(rating, getJustify(proof.titleEl), iconPair, {
    slug: proof.slug,
    productId: proof.productId,
    badgeSettings: badgeSettings || {},
  });
}

function placeBadge(proof, rating, iconPair, badgeSettings) {
  if (!validateListingPlacementProof(proof)) return null;
  var placeholder = findPlaceholder(proof.mountPoint.parent, proof.slug);
  var badge = createBadge(rating, proof, iconPair, badgeSettings);
  if (!badge || !validateListingPlacementProof(proof)) return null;
  if (placeholder) placeholder.replaceWith(badge);
  placeOwnedSlot(badge, proof.mountPoint);
  return badge;
}

function watchBadge(proof, badge, rating, iconPair, badgeSettings) {
  var positionObserver = watchOwnedSlotPosition(badge, proof.mountPoint, {
    surface: 'listing-badge',
    reason: 'position_reanchored',
    message: 'Listing badge slot reordered after render',
    extra: { adapterKey: proof.adapterKey },
  });
  if (positionObserver) positionObservers.push(positionObserver);

  probeWidgetVisibility(badge, 'listing-badge', { adapterKey: proof.adapterKey }, function () {
    return validateListingPlacementProof(proof)
      ? findVisibleSlot(proof.mountPoint.parent, proof.productId)
      : null;
  });

  var removalObserver = watchOneTimeRemoval(badge, 'listing-badge', function () {
    if (!validateListingPlacementProof(proof)) return;
    if (findVisibleSlot(proof.mountPoint.parent, proof.productId)) return;
    var replacement = placeBadge(proof, rating, iconPair, badgeSettings);
    if (replacement) watchBadge(proof, replacement, rating, iconPair, badgeSettings);
  }, { adapterKey: proof.adapterKey });
  if (removalObserver) removalObservers.push(removalObserver);
}

export function disconnectStrictListingObservers() {
  removalObservers.forEach(function (observer) { observer.disconnect(); });
  positionObservers.forEach(function (observer) { observer.disconnect(); });
  removalObservers = [];
  positionObservers = [];
}

export function clearStrictBadgePlaceholders() {
  document.querySelectorAll('[data-renuvex-listing-badge-placeholder]').forEach(function (element) {
    element.remove();
  });
}

export function reserveStrictBadgeSlots(candidates) {
  if (!isAutoPlacementEnabled()) return;
  (candidates || []).forEach(function (candidate) {
    if (!validateListingPlacementCandidate(candidate)) return;
    removeStaleSlots(candidate);
    if (candidate.identityBlockReason) return;
    var expectedProductId = expectedCandidateProductId(candidate);
    if (expectedProductId && findVisibleSlot(candidate.mountPoint.parent, expectedProductId)) return;
    if (findPlaceholder(candidate.mountPoint.parent, candidate.slug)) return;
    var placeholder = createBadgePlaceholderEl(getJustify(candidate.titleEl), {
      slug: candidate.slug,
      productId: expectedProductId || normalizeProductId(candidate.eventProductId) || '',
    });
    placeOwnedSlot(placeholder, candidate.mountPoint);
  });
}

function injectListingBadge(item, iconPair, badgeSettings) {
  var proof = item && item.proof;
  var rating = item && item.rating;
  if (!validateListingPlacementProof(proof) || !rating || rating._empty || rating.count === 0) return;
  removeStaleSlots(proof);
  if (findVisibleSlot(proof.mountPoint.parent, proof.productId)) return;
  proof.linkEl.setAttribute('data-renuvex-badge', '1');
  proof.linkEl.setAttribute('data-renuvex-badge-product-id', proof.productId);
  var badge = placeBadge(proof, rating, iconPair, badgeSettings);
  if (badge) watchBadge(proof, badge, rating, iconPair, badgeSettings);
}

function injectModalBadge(ratingsByProductId, iconPair, badgeSettings) {
  var proof = resolveModalPlacementProof();
  if (!proof || !validateModalPlacementProof(proof)) return;
  var rating = ratingsByProductId[proof.productId];
  if (!rating || rating._empty || rating.count === 0) return;
  var existing = proof.titleEl.querySelector('[data-renuvex-slot="listing-rating"]');
  if (existing && existing.getAttribute('data-renuvex-product-id') === proof.productId) return;
  if (existing) existing.remove();

  var badge = createBadgeEl(rating, 'flex-start', iconPair, {
    slug: proof.slug,
    productId: proof.productId,
    badgeSettings: badgeSettings || {},
  });
  if (!badge || !validateModalPlacementProof(proof)) return;
  proof.titleEl.appendChild(badge);
  probeWidgetVisibility(badge, 'listing-modal-badge', { adapterKey: proof.adapterKey }, function () {
    if (!validateModalPlacementProof(proof)) return null;
    var current = proof.titleEl.querySelector('[data-renuvex-slot="listing-rating"]');
    return current && current.getAttribute('data-renuvex-product-id') === proof.productId ? current : null;
  });
  var observer = watchOneTimeRemoval(badge, 'listing-modal-badge', function () {
    if (!validateModalPlacementProof(proof)) return;
    var current = proof.titleEl.querySelector('[data-renuvex-slot="listing-rating"]');
    if (current && current.getAttribute('data-renuvex-product-id') === proof.productId) return;
    var replacement = createBadgeEl(rating, 'flex-start', iconPair, {
      slug: proof.slug,
      productId: proof.productId,
      badgeSettings: badgeSettings || {},
    });
    if (replacement && validateModalPlacementProof(proof)) proof.titleEl.appendChild(replacement);
  }, { adapterKey: proof.adapterKey });
  if (observer) removalObservers.push(observer);
}

export function injectStrictBadges(resolvedItems, iconPair, badgeSettings) {
  if (!isAutoPlacementEnabled()) return;
  var ratingsByProductId = {};
  (resolvedItems || []).forEach(function (item) {
    if (item && item.proof && item.rating) ratingsByProductId[item.proof.productId] = item.rating;
    injectListingBadge(item, iconPair, badgeSettings);
  });
  clearStrictBadgePlaceholders();
  injectModalBadge(ratingsByProductId, iconPair, badgeSettings);
}

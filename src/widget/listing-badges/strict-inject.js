import { createBadgeEl, createBadgePlaceholderEl } from '../core/badge.js';
import { probeWidgetVisibility, watchOneTimeRemoval } from '../core/health.js';
import { placeOwnedSlot, watchOwnedSlotPosition } from '../core/slot-position.js';
import { isAutoPlacementEnabled } from '../themes/current-adapter.js';
import {
  resolveModalPlacementProof,
  validateListingPlacementProof,
  validateModalPlacementProof,
} from '../placement/capability.js';

var removalObservers = [];
var positionObservers = [];

function getJustify(element) {
  var align = window.getComputedStyle(element).textAlign;
  return align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';
}

function findOwnedSlot(parent, slotName, slug) {
  if (!parent) return null;
  var nodes = parent.querySelectorAll('[data-renuvex-slot="' + slotName + '"]');
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].getAttribute('data-renuvex-product-slug') === String(slug)) return nodes[i];
  }
  return null;
}

function removeStaleSlots(proof) {
  if (!proof || !proof.mountPoint || !proof.mountPoint.parent) return;
  proof.mountPoint.parent.querySelectorAll('[data-renuvex-slot="listing-rating"],[data-renuvex-slot="listing-rating-placeholder"]').forEach(function (slot) {
    if (slot.getAttribute('data-renuvex-product-slug') !== String(proof.slug)) slot.remove();
  });
}

function createBadge(rating, proof, iconPair, badgeSettings) {
  return createBadgeEl(rating, getJustify(proof.titleEl), iconPair, {
    slug: proof.slug,
    productId: proof.productId || '',
    badgeSettings: badgeSettings || {},
  });
}

function placeBadge(proof, rating, iconPair, badgeSettings) {
  if (!validateListingPlacementProof(proof)) return null;
  var placeholder = findOwnedSlot(proof.mountPoint.parent, 'listing-rating-placeholder', proof.slug);
  var badge = createBadge(rating, proof, iconPair, badgeSettings);
  if (placeholder) placeholder.replaceWith(badge);
  placeOwnedSlot(badge, proof.mountPoint);
  return badge;
}

function watchBadge(proof, badge, rating, iconPair, badgeSettings) {
  var positionObserver = watchOwnedSlotPosition(badge, proof.mountPoint, {
    surface: 'listing-badge',
    reason: 'position_reanchored',
    message: 'Listing badge slot reordered after render',
    extra: { slug: proof.slug },
  });
  if (positionObserver) positionObservers.push(positionObserver);

  probeWidgetVisibility(badge, 'listing-badge', { slug: proof.slug }, function () {
    return validateListingPlacementProof(proof)
      ? findOwnedSlot(proof.mountPoint.parent, 'listing-rating', proof.slug)
      : null;
  });

  var removalObserver = watchOneTimeRemoval(badge, 'listing-badge', function () {
    if (!validateListingPlacementProof(proof)) return;
    if (findOwnedSlot(proof.mountPoint.parent, 'listing-rating', proof.slug)) return;
    var replacement = placeBadge(proof, rating, iconPair, badgeSettings);
    if (replacement) watchBadge(proof, replacement, rating, iconPair, badgeSettings);
  }, { slug: proof.slug });
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

export function reserveStrictBadgeSlots(proofs) {
  if (!isAutoPlacementEnabled()) return;
  (proofs || []).forEach(function (proof) {
    if (!validateListingPlacementProof(proof)) return;
    removeStaleSlots(proof);
    if (findOwnedSlot(proof.mountPoint.parent, 'listing-rating', proof.slug)) return;
    if (findOwnedSlot(proof.mountPoint.parent, 'listing-rating-placeholder', proof.slug)) return;
    var placeholder = createBadgePlaceholderEl(getJustify(proof.titleEl), {
      slug: proof.slug,
      productId: proof.productId || '',
    });
    placeOwnedSlot(placeholder, proof.mountPoint);
  });
}

function injectListingBadge(proof, rating, iconPair, badgeSettings) {
  if (!validateListingPlacementProof(proof) || !rating || rating._empty || rating.count === 0) return;
  removeStaleSlots(proof);
  if (findOwnedSlot(proof.mountPoint.parent, 'listing-rating', proof.slug)) return;
  proof.linkEl.setAttribute('data-renuvex-badge', '1');
  var badge = placeBadge(proof, rating, iconPair, badgeSettings);
  if (badge) watchBadge(proof, badge, rating, iconPair, badgeSettings);
}

function injectModalBadge(ratings, iconPair, badgeSettings) {
  var proof = resolveModalPlacementProof();
  if (!proof || !validateModalPlacementProof(proof)) return;
  var rating = ratings[proof.slug];
  if (!rating || rating._empty || rating.count === 0) return;
  if (proof.titleEl.querySelector('[data-renuvex-listing-badge]')) return;

  var badge = createBadgeEl(rating, 'flex-start', iconPair, {
    slug: proof.slug,
    productId: proof.productId || '',
    badgeSettings: badgeSettings || {},
  });
  if (!validateModalPlacementProof(proof)) return;
  proof.titleEl.appendChild(badge);
  probeWidgetVisibility(badge, 'listing-modal-badge', { slug: proof.slug }, function () {
    return validateModalPlacementProof(proof)
      ? proof.titleEl.querySelector('[data-renuvex-listing-badge]')
      : null;
  });
  var observer = watchOneTimeRemoval(badge, 'listing-modal-badge', function () {
    if (!validateModalPlacementProof(proof) || proof.titleEl.querySelector('[data-renuvex-listing-badge]')) return;
    proof.titleEl.appendChild(createBadgeEl(rating, 'flex-start', iconPair, {
      slug: proof.slug,
      productId: proof.productId || '',
      badgeSettings: badgeSettings || {},
    }));
  }, { slug: proof.slug });
  if (observer) removalObservers.push(observer);
}

export function injectStrictBadges(proofs, ratings, iconPair, badgeSettings) {
  if (!isAutoPlacementEnabled()) return;
  (proofs || []).forEach(function (proof) {
    injectListingBadge(proof, ratings[proof.slug], iconPair, badgeSettings);
  });
  clearStrictBadgePlaceholders();
  injectModalBadge(ratings, iconPair, badgeSettings);
}

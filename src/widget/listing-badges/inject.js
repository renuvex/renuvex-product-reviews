// Preview-only listing injection. Production placement uses strict-inject.js.

import { createBadgeEl } from '../core/badge.js';
import { probeWidgetVisibility, watchOneTimeRemoval } from '../core/health.js';
import { placeOwnedSlot, watchOwnedSlotPosition } from '../core/slot-position.js';

var removalObservers = [];
var positionObservers = [];

function findPreviewTitle(card, productName) {
  if (!card) return null;
  var explicit = card.querySelector('.preview-card__name');
  if (explicit) return explicit;
  if (!productName) return null;
  return Array.from(card.querySelectorAll('span,p,h1,h2,h3')).find(function (element) {
    return element.textContent && element.textContent.trim() === String(productName).trim();
  }) || null;
}

function findPreviewBadge(card) {
  return card ? card.querySelector('[data-renuvex-slot="listing-rating"]') : null;
}

function getMountPoint(titleEl) {
  return titleEl && titleEl.parentNode
    ? { parent: titleEl.parentNode, anchorEl: titleEl, position: 'after' }
    : null;
}

function mountPreviewBadge(card, rating, productName, iconPair, badgeSettings) {
  var titleEl = findPreviewTitle(card, productName);
  var mountPoint = getMountPoint(titleEl);
  if (!mountPoint || findPreviewBadge(card)) return null;
  var badge = createBadgeEl(rating, 'flex-start', iconPair, {
    slug: card.getAttribute('data-renuvex-preview-product-card') || '',
    productId: rating && rating._productId ? rating._productId : '',
    badgeSettings: badgeSettings || {},
  });
  placeOwnedSlot(badge, mountPoint);
  return { badge: badge, mountPoint: mountPoint };
}

function watchPreviewBadge(card, mounted, rating, productName, iconPair, badgeSettings) {
  probeWidgetVisibility(mounted.badge, 'listing-badge-preview', {}, function () {
    return findPreviewBadge(card);
  });
  var positionObserver = watchOwnedSlotPosition(mounted.badge, mounted.mountPoint, {
    surface: 'listing-badge-preview',
    reason: 'position_reanchored',
    message: 'Preview listing badge slot reordered after render',
  });
  if (positionObserver) positionObservers.push(positionObserver);

  var removalObserver = watchOneTimeRemoval(mounted.badge, 'listing-badge-preview', function () {
    if (!card.isConnected || findPreviewBadge(card)) return;
    var replacement = mountPreviewBadge(card, rating, productName, iconPair, badgeSettings);
    if (replacement) watchPreviewBadge(card, replacement, rating, productName, iconPair, badgeSettings);
  });
  if (removalObserver) removalObservers.push(removalObserver);
}

export function disconnectListingBadgeRemovalObservers() {
  removalObservers.forEach(function (observer) { observer.disconnect(); });
  positionObservers.forEach(function (observer) { observer.disconnect(); });
  removalObservers = [];
  positionObservers = [];
}

export function clearBadgePlaceholders() {
  document.querySelectorAll('[data-renuvex-listing-badge-placeholder]').forEach(function (element) {
    element.remove();
  });
}

export function injectBadgeOnLink(card, rating, productName, _currentSlug, iconPair, badgeSettings) {
  if (!card || !card.matches('[data-renuvex-preview-product-card]')) return;
  if (!rating || rating._empty || rating.count === 0 || findPreviewBadge(card)) return;
  card.setAttribute('data-renuvex-badge', '1');
  var mounted = mountPreviewBadge(card, rating, productName, iconPair, badgeSettings);
  if (mounted) watchPreviewBadge(card, mounted, rating, productName, iconPair, badgeSettings);
}

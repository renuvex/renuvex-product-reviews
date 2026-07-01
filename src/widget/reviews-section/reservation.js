// reviews-section/reservation.js - light-DOM layout reservation for the PDP review mount.

import { createOwnedSlot, setSlotContext } from '../core/slot.js';
import { attachShadowHost, getOrCreateShadowContent } from '../core/shadow.js';
import { isReviewsMountEnabled } from '../themes/current-adapter.js';

var RESERVED_HEIGHT_BY_SIZE = {
  small: 220,
  medium: 260,
  large: 300,
};

function reservedHeightForSettings(settings) {
  var size = settings && settings.size;
  return RESERVED_HEIGHT_BY_SIZE[size] || RESERVED_HEIGHT_BY_SIZE.medium;
}

export function findReviewsMount() {
  if (!isReviewsMountEnabled()) return null;
  return document.querySelector('[data-renuvex-widget="reviews"]');
}

export function getOrCreateReviewsSlot(anchorEl, productId) {
  if (!anchorEl) return null;
  var slot = anchorEl.querySelector('[data-renuvex-slot="product-reviews"]');
  if (!slot) {
    slot = createOwnedSlot({
      slot: 'product-reviews',
      className: 'renuvex-pr-reviews-slot',
      context: { surface: 'reviews', productId: productId || '' },
    });
    anchorEl.appendChild(slot);
  }
  setSlotContext(slot, { surface: 'reviews', productId: productId || '' });
  return slot;
}

function ensureReviewsShell(productId, settings) {
  var anchorEl = findReviewsMount();
  var reviewsSlot = getOrCreateReviewsSlot(anchorEl, productId);
  if (!reviewsSlot) return null;

  var container = document.getElementById('renuvex-reviews');
  if (!container) {
    container = document.createElement('div');
    container.id = 'renuvex-reviews';
  }
  if (container.parentNode !== reviewsSlot) reviewsSlot.appendChild(container);

  container.classList.add('renuvex-pr-reviews-shell');
  container.setAttribute('data-renuvex-reserved', 'true');
  container.style.minHeight = reservedHeightForSettings(settings) + 'px';
  return container;
}

function getRenderedProductId(contentEl) {
  var widget = contentEl && contentEl.querySelector ? contentEl.querySelector('#renuvex-reviews-widget') : null;
  return widget ? widget.getAttribute('data-renuvex-product-id') || '' : '';
}

export function reserveReviewsShell(productId, settings) {
  return ensureReviewsShell(productId, settings);
}

export function resetReviewsShellForProductTransition(productId, settings) {
  var existingContainer = document.getElementById('renuvex-reviews');
  var existingRoot = existingContainer && existingContainer.shadowRoot ? existingContainer.shadowRoot : null;
  var existingContentEl = existingRoot ? existingRoot.querySelector('[data-renuvex-shadow-content]') : null;
  var renderedProductId = getRenderedProductId(existingContentEl);
  if (!renderedProductId || String(renderedProductId) === String(productId || '')) return false;

  var container = ensureReviewsShell(productId, settings) || existingContainer;
  if (!container) return false;
  var root = attachShadowHost(container);
  var contentEl = getOrCreateShadowContent(root);
  if (!contentEl) return false;

  contentEl.replaceChildren();
  container.setAttribute('data-renuvex-transitioning', 'true');
  return true;
}

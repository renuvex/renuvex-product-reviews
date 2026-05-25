export var RENUVEX_PRODUCT_REVIEWS_APP = 'product-reviews';

export function createOwnedSlot(options) {
  var slot = document.createElement(options && options.tagName ? options.tagName : 'div');
  var className = ['renuvex-pr-slot', options && options.className ? options.className : ''].filter(Boolean).join(' ');
  slot.className = className;
  slot.setAttribute('data-renuvex-app', RENUVEX_PRODUCT_REVIEWS_APP);
  if (options && options.slot) slot.setAttribute('data-renuvex-slot', options.slot);
  setSlotContext(slot, options && options.context);
  return slot;
}

export function setSlotContext(slot, context) {
  if (!slot || !context) return slot;
  if (context.surface) slot.setAttribute('data-renuvex-surface', String(context.surface));
  if (context.productId) slot.setAttribute('data-renuvex-product-id', String(context.productId));
  if (context.slug) slot.setAttribute('data-renuvex-product-slug', String(context.slug));
  return slot;
}

export function findOwnedSlot(slotName, context) {
  var nodes = document.querySelectorAll('[data-renuvex-slot="' + slotName + '"]');
  for (var i = 0; i < nodes.length; i++) {
    if (!context || matchesSlotContext(nodes[i], context)) return nodes[i];
  }
  return null;
}

export function removeOwnedSlots(slotName, context) {
  document.querySelectorAll('[data-renuvex-slot="' + slotName + '"]').forEach(function (node) {
    if (!context || matchesSlotContext(node, context)) node.remove();
  });
}

function matchesSlotContext(node, context) {
  if (context.productId && node.getAttribute('data-renuvex-product-id') !== String(context.productId)) return false;
  if (context.slug && node.getAttribute('data-renuvex-product-slug') !== String(context.slug)) return false;
  return true;
}

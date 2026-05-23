export var RENUVEX_PRODUCT_REVIEWS_APP = 'product-reviews';
export var LEGACY_IKR_APP = 'yorum-paneli';

export function createOwnedSlot(options) {
  var slot = document.createElement(options && options.tagName ? options.tagName : 'div');
  var className = ['renuvex-pr-slot', options && options.className ? options.className : ''].filter(Boolean).join(' ');
  slot.className = className;
  slot.setAttribute('data-renuvex-app', RENUVEX_PRODUCT_REVIEWS_APP);
  slot.setAttribute('data-ikr-app', LEGACY_IKR_APP);
  if (options && options.slot) slot.setAttribute('data-renuvex-slot', options.slot);
  if (options && options.legacySlot) slot.setAttribute('data-ikr-slot', options.legacySlot);
  setSlotContext(slot, options && options.context);
  return slot;
}

export function setSlotContext(slot, context) {
  if (!slot || !context) return slot;
  if (context.surface) slot.setAttribute('data-renuvex-surface', String(context.surface));
  if (context.productId) {
    slot.setAttribute('data-renuvex-product-id', String(context.productId));
    slot.setAttribute('data-ikr-product-id', String(context.productId));
  }
  if (context.slug) {
    slot.setAttribute('data-renuvex-product-slug', String(context.slug));
    slot.setAttribute('data-ikr-product-slug', String(context.slug));
  }
  return slot;
}

export function findOwnedSlot(slotName, legacySlotName, context) {
  var selector = '[data-renuvex-slot="' + slotName + '"]';
  if (legacySlotName) selector += ',[data-ikr-slot="' + legacySlotName + '"]';
  var nodes = document.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; i++) {
    if (!context || matchesSlotContext(nodes[i], context)) return nodes[i];
  }
  return null;
}

export function removeOwnedSlots(slotName, legacySlotName, context) {
  var selector = '[data-renuvex-slot="' + slotName + '"]';
  if (legacySlotName) selector += ',[data-ikr-slot="' + legacySlotName + '"]';
  document.querySelectorAll(selector).forEach(function (node) {
    if (!context || matchesSlotContext(node, context)) node.remove();
  });
}

function matchesSlotContext(node, context) {
  if (context.productId && node.getAttribute('data-renuvex-product-id') !== String(context.productId)) return false;
  if (context.slug && node.getAttribute('data-renuvex-product-slug') !== String(context.slug)) return false;
  return true;
}

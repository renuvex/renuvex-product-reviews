// core/slot-position.js - bounded positioning for app-owned storefront slots.

import { reportWidgetHealth } from './health.js';

export function getAfterElementMountPoint(anchorEl) {
  if (!anchorEl || !anchorEl.parentNode) return null;
  return {
    parent: anchorEl.parentNode,
    anchorEl: anchorEl,
    position: 'after',
  };
}

function normalizeMountPoint(mountPoint) {
  if (!mountPoint || !mountPoint.parent) return null;
  if (mountPoint.position === 'after' && mountPoint.anchorEl) {
    return {
      parent: mountPoint.parent,
      anchorEl: mountPoint.anchorEl,
      position: 'after',
    };
  }
  return {
    parent: mountPoint.parent,
    beforeEl: mountPoint.beforeEl || null,
    position: 'before',
  };
}

function isExpectedPosition(slot, mountPoint) {
  var mount = normalizeMountPoint(mountPoint);
  if (!slot || !mount || slot.parentNode !== mount.parent) return false;

  if (mount.position === 'after') {
    return mount.anchorEl &&
      mount.anchorEl.parentNode === mount.parent &&
      mount.anchorEl.nextSibling === slot;
  }

  if (mount.beforeEl && mount.beforeEl.parentNode === mount.parent) {
    return slot.nextSibling === mount.beforeEl;
  }

  return slot.nextSibling === null;
}

export function placeOwnedSlot(slot, mountPoint) {
  var mount = normalizeMountPoint(mountPoint);
  if (!slot || !mount || !mount.parent) return false;
  if (isExpectedPosition(slot, mount)) return false;

  if (mount.position === 'after') {
    if (!mount.anchorEl || mount.anchorEl.parentNode !== mount.parent) return false;
    mount.parent.insertBefore(slot, mount.anchorEl.nextSibling || null);
    return true;
  }

  var beforeEl = mount.beforeEl && mount.beforeEl.parentNode === mount.parent ? mount.beforeEl : null;
  mount.parent.insertBefore(slot, beforeEl);
  return true;
}

export function watchOwnedSlotPosition(slot, mountPoint, options) {
  options = options || {};
  var mount = normalizeMountPoint(mountPoint);
  if (typeof MutationObserver === 'undefined' || !slot || !mount || !mount.parent) return null;

  var corrections = 0;
  var reported = false;
  var maxCorrections = typeof options.maxCorrections === 'number' ? options.maxCorrections : 3;
  var durationMs = typeof options.durationMs === 'number' ? options.durationMs : 15000;
  var surface = options.surface || 'owned-slot';
  var reason = options.reason || 'position_reanchored';
  var message = options.message || 'Owned storefront slot reordered after render';
  var extra = options.extra || {};

  var observer = new MutationObserver(function () {
    if (!slot.isConnected || !mount.parent.isConnected) {
      observer.disconnect();
      return;
    }
    if (mount.position === 'after' && (!mount.anchorEl || !mount.anchorEl.isConnected || mount.anchorEl.parentNode !== mount.parent)) {
      observer.disconnect();
      return;
    }
    if (isExpectedPosition(slot, mount)) return;

    corrections += 1;
    placeOwnedSlot(slot, mount);
    if (!reported) {
      reported = true;
      reportWidgetHealth('dom-conflict', message, Object.assign({ surface: surface, reason: reason }, extra));
    }
    if (corrections >= maxCorrections) observer.disconnect();
  });

  observer.observe(mount.parent, { childList: true });
  setTimeout(function () {
    observer.disconnect();
  }, durationMs);
  return observer;
}

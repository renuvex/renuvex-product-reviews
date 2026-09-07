// Strict storefront placement proofs. Product identity comes from Ikas events
// or the lifecycle-safe slug resolver; DOM evidence only authorizes a target.

import { extractSlug, SYSTEM_SLUGS } from '../core/helpers.js';
import {
  getStorefrontContextEpoch,
  isStorefrontContextCurrent,
  onStorefrontContextInvalidated,
} from '../core/context-epoch.js';
import { renuvexPrProductMap } from '../core/state.js';
import {
  getPlacementPolicy,
  getRuntimeDetectableThemeAdapters,
  getThemeAdapterByKey,
  getThemeAdapterKey,
} from '../themes/current-adapter.js';
import { getAfterElementMountPoint } from '../core/slot-position.js';

var attestedProductLinks = new WeakMap();
var modalContext = null;
var modalToken = 0;

function isVisible(element) {
  if (!element || !element.isConnected || typeof element.getClientRects !== 'function') return false;
  if (element.getClientRects().length === 0) return false;
  var style = window.getComputedStyle(element);
  return style.display !== 'none' && style.visibility !== 'hidden';
}

function getCandidateAdapters() {
  var policy = getPlacementPolicy();
  if (!policy || policy.version !== 1 || policy.mode === 'disabled') return [];
  if (policy.mode === 'provider_verified') {
    var selected = getThemeAdapterByKey(getThemeAdapterKey());
    return selected && selected.key !== 'generic' ? [selected] : [];
  }
  if (policy.mode === 'runtime_attestation') {
    return getRuntimeDetectableThemeAdapters();
  }
  return [];
}

function selectSingleProof(proofsByAdapter) {
  var matched = proofsByAdapter.filter(function (entry) {
    return entry.proofs.length > 0;
  });
  return matched.length === 1 ? matched[0] : null;
}

function isAdapterCurrentlyAuthorized(adapterKey) {
  return getCandidateAdapters().some(function (adapter) {
    return adapter.key === adapterKey;
  });
}

function textMatches(element, expected) {
  if (!expected) return true;
  return !!(element && element.textContent && element.textContent.trim() === String(expected).trim());
}

function productMountPoint(adapter, titleEl) {
  var mount = adapter.getProductBadgeMountPoint(titleEl);
  return mount && mount.parent ? mount : null;
}

function listingMountPoint(adapter, titleEl) {
  var mount = adapter.getListingBadgeMountPoint(titleEl);
  if (mount && mount.parent) return mount;
  if (mount) return { parent: mount, beforeEl: null, position: 'before' };
  return getAfterElementMountPoint(titleEl);
}

export function resolvePdpPlacementProof(productId, productName, expectedEpoch) {
  var epoch = expectedEpoch || getStorefrontContextEpoch();
  if (!productId || !isStorefrontContextCurrent(epoch)) return null;

  var selected = selectSingleProof(getCandidateAdapters().map(function (adapter) {
    var titles = adapter.findStrictProductTitles().filter(function (title) {
      if (!isVisible(title) || !textMatches(title, productName)) return false;
      if (title.closest('header,nav,[role="navigation"]')) return false;
      if (adapter.findStrictModals().some(function (modal) { return modal.contains(title); })) return false;
      if (adapter.findStrictListingContainers().some(function (container) { return container.contains(title); })) return false;
      return true;
    });
    var proofs = titles.map(function (titleEl) {
      var mountPoint = productMountPoint(adapter, titleEl);
      if (!mountPoint) return null;
      return {
        kind: 'pdp',
        adapterKey: adapter.key,
        epoch: epoch,
        productId: String(productId),
        productName: productName || null,
        titleEl: titleEl,
        mountPoint: mountPoint,
      };
    }).filter(Boolean);
    return { adapter: adapter, proofs: proofs };
  }));

  return selected && selected.proofs.length === 1 ? selected.proofs[0] : null;
}

export function validatePdpPlacementProof(proof) {
  if (!proof || proof.kind !== 'pdp' || !isStorefrontContextCurrent(proof.epoch)) return false;
  if (!isAdapterCurrentlyAuthorized(proof.adapterKey)) return false;
  var adapter = getThemeAdapterByKey(proof.adapterKey);
  if (!adapter || !proof.titleEl || !proof.titleEl.isConnected) return false;
  if (!adapter.matchesStrictProductTitle(proof.titleEl) || !textMatches(proof.titleEl, proof.productName)) return false;
  var mountPoint = productMountPoint(adapter, proof.titleEl);
  return !!(
    mountPoint &&
    proof.mountPoint &&
    mountPoint.parent === proof.mountPoint.parent &&
    mountPoint.anchorEl === proof.mountPoint.anchorEl &&
    mountPoint.parent.isConnected
  );
}

export function waitForPdpPlacementProof(productId, productName, expectedEpoch, timeoutMs) {
  var immediate = resolvePdpPlacementProof(productId, productName, expectedEpoch);
  if (immediate || typeof MutationObserver === 'undefined' || !document.body) {
    return Promise.resolve(immediate);
  }

  var resourceTimeout = typeof timeoutMs === 'number' ? timeoutMs : 30000;
  return new Promise(function (resolve) {
    var settled = false;
    var observer = new MutationObserver(check);
    var unsubscribe = onStorefrontContextInvalidated(function () { finish(null); });
    var timer = setTimeout(function () { finish(null); }, resourceTimeout);

    function finish(value) {
      if (settled) return;
      settled = true;
      observer.disconnect();
      unsubscribe();
      clearTimeout(timer);
      resolve(value);
    }

    function check() {
      if (!isStorefrontContextCurrent(expectedEpoch)) {
        finish(null);
        return;
      }
      var proof = resolvePdpPlacementProof(productId, productName, expectedEpoch);
      if (proof) finish(proof);
    }

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'hidden', 'aria-hidden'],
    });
  });
}

function sameOriginProductSlug(anchor) {
  if (!anchor || !anchor.href) return null;
  try {
    var url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) return null;
    var slug = extractSlug(url.href);
    if (!slug || !/^[a-z0-9][a-z0-9-]{2,}$/.test(slug) || SYSTEM_SLUGS.test(slug)) return null;
    return slug;
  } catch (_) {
    return null;
  }
}

function findCardLink(titleEl, container) {
  var direct = titleEl.closest('a[href]');
  var directSlug = sameOriginProductSlug(direct);
  if (directSlug && container.contains(direct)) return { linkEl: direct, slug: directSlug, cardEl: direct };

  var node = titleEl.parentElement;
  var depth = 0;
  while (node && container.contains(node) && depth < 5) {
    var candidates = Array.from(node.querySelectorAll('a[href]')).map(function (linkEl) {
      return { linkEl: linkEl, slug: sameOriginProductSlug(linkEl) };
    }).filter(function (entry) { return !!entry.slug; });
    var slugs = candidates.map(function (entry) { return entry.slug; }).filter(function (slug, index, all) {
      return all.indexOf(slug) === index;
    });
    if (slugs.length === 1) {
      var selected = candidates.find(function (entry) { return entry.slug === slugs[0]; });
      return { linkEl: selected.linkEl, slug: selected.slug, cardEl: node };
    }
    if (node === container) break;
    node = node.parentElement;
    depth += 1;
  }
  return null;
}

function buildListingProofs(adapter, epoch) {
  var proofs = [];
  var seenTitles = [];
  adapter.findStrictListingContainers().forEach(function (container) {
    if (!container || !container.isConnected) return;
    adapter.findStrictListingTitles(container).forEach(function (titleEl) {
      if (seenTitles.indexOf(titleEl) !== -1 || !isVisible(titleEl)) return;
      if (titleEl.closest('.product-name-main,.add-to-basket-modal')) return;
      seenTitles.push(titleEl);
      var card = findCardLink(titleEl, container);
      if (!card || !isVisible(card.linkEl)) return;
      var mountPoint = listingMountPoint(adapter, titleEl);
      if (!mountPoint || !mountPoint.parent) return;
      var eventProduct = renuvexPrProductMap[card.slug] || null;
      proofs.push({
        kind: 'listing',
        adapterKey: adapter.key,
        epoch: epoch,
        containerEl: container,
        cardEl: card.cardEl,
        linkEl: card.linkEl,
        titleEl: titleEl,
        mountPoint: mountPoint,
        slug: card.slug,
        productId: eventProduct && eventProduct.productId ? String(eventProduct.productId) : null,
        productName: (eventProduct && eventProduct.name) || titleEl.textContent.trim() || null,
      });
    });
  });
  return proofs;
}

export function collectListingPlacementProofs(expectedEpoch) {
  var epoch = expectedEpoch || getStorefrontContextEpoch();
  if (!isStorefrontContextCurrent(epoch)) return [];
  var selected = selectSingleProof(getCandidateAdapters().map(function (adapter) {
    return { adapter: adapter, proofs: buildListingProofs(adapter, epoch) };
  }));
  if (!selected) return [];
  selected.proofs.forEach(registerAttestedProductLink);
  return selected.proofs;
}

export function hasStrictListingPlacementCandidates() {
  return collectListingPlacementProofs(getStorefrontContextEpoch()).length > 0;
}

export function hasRuntimeDetectableListingSignature() {
  return collectRuntimeDetectableListingProofs().length > 0;
}

export function collectRuntimeDetectableListingProofs() {
  var epoch = getStorefrontContextEpoch();
  var selected = selectSingleProof(getRuntimeDetectableThemeAdapters().map(function (adapter) {
    return { adapter: adapter, proofs: buildListingProofs(adapter, epoch) };
  }));
  return selected ? selected.proofs : [];
}

export function validateListingPlacementProof(proof) {
  if (!proof || proof.kind !== 'listing' || !isStorefrontContextCurrent(proof.epoch)) return false;
  if (!isAdapterCurrentlyAuthorized(proof.adapterKey)) return false;
  var adapter = getThemeAdapterByKey(proof.adapterKey);
  if (!adapter || !proof.containerEl || !proof.containerEl.isConnected) return false;
  if (adapter.findStrictListingContainers().indexOf(proof.containerEl) === -1) return false;
  if (!proof.titleEl || !proof.titleEl.isConnected || !adapter.matchesStrictListingTitle(proof.titleEl)) return false;
  if (!proof.linkEl || !proof.linkEl.isConnected || sameOriginProductSlug(proof.linkEl) !== proof.slug) return false;
  if (!proof.containerEl.contains(proof.titleEl) || !proof.containerEl.contains(proof.linkEl)) return false;
  var currentCard = findCardLink(proof.titleEl, proof.containerEl);
  if (!currentCard || currentCard.linkEl !== proof.linkEl || currentCard.slug !== proof.slug) return false;
  if (proof.productId) {
    var currentEventProduct = renuvexPrProductMap[proof.slug];
    if (!currentEventProduct || String(currentEventProduct.productId) !== String(proof.productId)) return false;
  }
  var mountPoint = listingMountPoint(adapter, proof.titleEl);
  return !!(
    mountPoint &&
    proof.mountPoint &&
    mountPoint.parent === proof.mountPoint.parent &&
    mountPoint.anchorEl === proof.mountPoint.anchorEl &&
    mountPoint.parent.isConnected
  );
}

function registerAttestedProductLink(proof) {
  if (!validateListingPlacementProof(proof)) return;
  attestedProductLinks.set(proof.linkEl, {
    adapterKey: proof.adapterKey,
    epoch: proof.epoch,
    slug: proof.slug,
    productId: proof.productId,
    productName: proof.productName,
  });
}

export function captureModalContextFromClick(anchor) {
  var attested = anchor ? attestedProductLinks.get(anchor) : null;
  modalToken += 1;
  if (!attested || !isStorefrontContextCurrent(attested.epoch) || sameOriginProductSlug(anchor) !== attested.slug) {
    modalContext = null;
    return null;
  }
  var currentProof = collectListingPlacementProofs(attested.epoch).find(function (proof) {
    return proof.linkEl === anchor && validateListingPlacementProof(proof);
  });
  if (!currentProof) {
    modalContext = null;
    return null;
  }
  modalContext = {
    adapterKey: currentProof.adapterKey,
    epoch: currentProof.epoch,
    slug: currentProof.slug,
    productId: currentProof.productId,
    productName: currentProof.productName,
    token: modalToken,
  };
  return modalContext;
}

export function clearModalPlacementContext() {
  modalToken += 1;
  modalContext = null;
}

export function reconcileModalPlacementContext() {
  if (!modalContext || !modalContext.modalEl) return;
  if (!modalContext.modalEl.isConnected || !isVisible(modalContext.modalEl)) {
    clearModalPlacementContext();
  }
}

export function resolveModalPlacementProof() {
  if (!modalContext || !isStorefrontContextCurrent(modalContext.epoch)) return null;
  var adapter = getThemeAdapterByKey(modalContext.adapterKey);
  if (!adapter) return null;
  var modals = adapter.findStrictModals().filter(isVisible);
  if (modals.length !== 1) return null;
  var modalEl = modals[0];
  var titleEl = adapter.findModalTitle(modalEl);
  if (!titleEl || !isVisible(titleEl) || !adapter.matchesStrictModalTitle(titleEl)) return null;
  if (!textMatches(titleEl, modalContext.productName)) return null;
  modalContext.modalEl = modalEl;
  return {
    kind: 'modal',
    adapterKey: adapter.key,
    epoch: modalContext.epoch,
    token: modalContext.token,
    slug: modalContext.slug,
    productId: modalContext.productId,
    productName: modalContext.productName,
    modalEl: modalEl,
    titleEl: titleEl,
  };
}

export function validateModalPlacementProof(proof) {
  if (!proof || !modalContext || proof.token !== modalContext.token) return false;
  if (!isStorefrontContextCurrent(proof.epoch) || !proof.modalEl.isConnected || !proof.titleEl.isConnected) return false;
  if (!isAdapterCurrentlyAuthorized(proof.adapterKey) || !isVisible(proof.modalEl) || !isVisible(proof.titleEl)) return false;
  var adapter = getThemeAdapterByKey(proof.adapterKey);
  var visibleModals = adapter ? adapter.findStrictModals().filter(isVisible) : [];
  return !!(
    adapter &&
    visibleModals.length === 1 &&
    visibleModals[0] === proof.modalEl &&
    adapter.matchesStrictModalTitle(proof.titleEl) &&
    proof.modalEl.contains(proof.titleEl) &&
    textMatches(proof.titleEl, proof.productName)
  );
}

onStorefrontContextInvalidated(clearModalPlacementContext);

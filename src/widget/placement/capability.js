// Strict storefront placement proofs. Product identity comes from Ikas events
// or the lifecycle-safe slug resolver; DOM evidence only authorizes a target.

import { extractSlug, SYSTEM_SLUGS } from '../core/helpers.js';
import {
  getStorefrontContextEpoch,
  isStorefrontContextCurrent,
  onStorefrontContextInvalidated,
} from '../core/context-epoch.js';
import {
  getStorefrontListingGeneration,
  renuvexPrProductConflictMap,
  renuvexPrProductMap,
} from '../core/state.js';
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
var MODAL_CONTEXT_TTL = 10 * 1000;

function removeModalContextBadge(context) {
  var titleEl = context && context.titleEl;
  if (!titleEl || typeof titleEl.querySelectorAll !== 'function') return;
  titleEl.querySelectorAll('[data-renuvex-slot="listing-rating"]').forEach(function (slot) {
    slot.remove();
  });
}

function normalizeProductId(value) {
  if (typeof value !== 'string') return null;
  var normalized = value.trim();
  return normalized && normalized.length <= 128 ? normalized : null;
}

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
  if (!element) return false;
  var clone = element.cloneNode(true);
  if (clone.querySelectorAll) {
    clone.querySelectorAll('[data-renuvex-app="product-reviews"]').forEach(function (node) {
      node.remove();
    });
  }
  return !!(clone.textContent && clone.textContent.trim() === String(expected).trim());
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

function buildListingProofs(adapter, epoch, listingGeneration) {
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
      var titleText = titleEl.textContent ? titleEl.textContent.trim() : '';
      proofs.push({
        kind: 'listing-candidate',
        proofStage: 'candidate',
        adapterKey: adapter.key,
        epoch: epoch,
        listingGeneration: listingGeneration,
        containerEl: container,
        cardEl: card.cardEl,
        linkEl: card.linkEl,
        href: card.linkEl.href,
        titleEl: titleEl,
        titleText: titleText,
        mountPoint: mountPoint,
        slug: card.slug,
        eventProductId: normalizeProductId(eventProduct && eventProduct.productId),
        identityBlockReason: renuvexPrProductConflictMap[card.slug] || null,
        productName: (eventProduct && eventProduct.name) || titleText || null,
      });
    });
  });
  return proofs;
}

export function collectListingPlacementCandidates(expectedEpoch) {
  var epoch = expectedEpoch || getStorefrontContextEpoch();
  if (!isStorefrontContextCurrent(epoch)) return [];
  var listingGeneration = getStorefrontListingGeneration();
  var selected = selectSingleProof(getCandidateAdapters().map(function (adapter) {
    return { adapter: adapter, proofs: buildListingProofs(adapter, epoch, listingGeneration) };
  }));
  if (!selected) return [];
  selected.proofs.forEach(registerAttestedProductLink);
  return selected.proofs;
}

// Compatibility export for callers that only need strict DOM candidates.
export function collectListingPlacementProofs(expectedEpoch) {
  return collectListingPlacementCandidates(expectedEpoch);
}

export function hasStrictListingPlacementCandidates() {
  return collectListingPlacementCandidates(getStorefrontContextEpoch()).length > 0;
}

export function hasRuntimeDetectableListingSignature() {
  return collectRuntimeDetectableListingProofs().length > 0;
}

export function collectRuntimeDetectableListingProofs() {
  var epoch = getStorefrontContextEpoch();
  var listingGeneration = getStorefrontListingGeneration();
  var selected = selectSingleProof(getRuntimeDetectableThemeAdapters().map(function (adapter) {
    return { adapter: adapter, proofs: buildListingProofs(adapter, epoch, listingGeneration) };
  }));
  return selected ? selected.proofs : [];
}

export function validateListingPlacementCandidate(candidate) {
  if (!candidate || (candidate.kind !== 'listing-candidate' && candidate.kind !== 'listing')) return false;
  if (!isStorefrontContextCurrent(candidate.epoch)) return false;
  if (candidate.listingGeneration !== getStorefrontListingGeneration()) return false;
  if (!isAdapterCurrentlyAuthorized(candidate.adapterKey)) return false;
  var adapter = getThemeAdapterByKey(candidate.adapterKey);
  if (!adapter || !candidate.containerEl || !candidate.containerEl.isConnected) return false;
  if (adapter.findStrictListingContainers().indexOf(candidate.containerEl) === -1) return false;
  if (!candidate.titleEl || !candidate.titleEl.isConnected || !adapter.matchesStrictListingTitle(candidate.titleEl)) return false;
  if ((candidate.titleEl.textContent || '').trim() !== candidate.titleText) return false;
  if (!candidate.linkEl || !candidate.linkEl.isConnected || candidate.linkEl.href !== candidate.href) return false;
  if (sameOriginProductSlug(candidate.linkEl) !== candidate.slug) return false;
  if (!candidate.containerEl.contains(candidate.titleEl) || !candidate.containerEl.contains(candidate.linkEl)) return false;
  var currentCard = findCardLink(candidate.titleEl, candidate.containerEl);
  if (!currentCard || currentCard.linkEl !== candidate.linkEl || currentCard.slug !== candidate.slug) return false;

  var currentEventProduct = renuvexPrProductMap[candidate.slug] || null;
  var currentEventProductId = normalizeProductId(currentEventProduct && currentEventProduct.productId);
  if (candidate.eventProductId !== currentEventProductId) return false;
  if ((renuvexPrProductConflictMap[candidate.slug] || null) !== (candidate.identityBlockReason || null)) return false;

  var mountPoint = listingMountPoint(adapter, candidate.titleEl);
  return !!(
    mountPoint &&
    candidate.mountPoint &&
    mountPoint.parent === candidate.mountPoint.parent &&
    mountPoint.anchorEl === candidate.mountPoint.anchorEl &&
    mountPoint.parent.isConnected
  );
}

function sameListingCandidate(left, right) {
  return !!(
    left &&
    right &&
    left.adapterKey === right.adapterKey &&
    left.epoch === right.epoch &&
    left.listingGeneration === right.listingGeneration &&
    left.containerEl === right.containerEl &&
    left.cardEl === right.cardEl &&
    left.linkEl === right.linkEl &&
    left.href === right.href &&
    left.titleEl === right.titleEl &&
    left.titleText === right.titleText &&
    left.mountPoint &&
    right.mountPoint &&
    left.mountPoint.parent === right.mountPoint.parent &&
    left.mountPoint.anchorEl === right.mountPoint.anchorEl &&
    left.slug === right.slug &&
    left.eventProductId === right.eventProductId &&
    (left.identityBlockReason || null) === (right.identityBlockReason || null)
  );
}

export function promoteListingPlacementProof(candidate, productId, identitySource) {
  var normalizedProductId = normalizeProductId(productId);
  if (!normalizedProductId || !validateListingPlacementCandidate(candidate)) return null;
  if (identitySource !== 'storefront_event' && identitySource !== 'lifecycle_resolver') return null;

  if (identitySource === 'storefront_event') {
    if (!candidate.eventProductId || candidate.eventProductId !== normalizedProductId) return null;
  } else {
    if (candidate.identityBlockReason || candidate.eventProductId) return null;
    if (renuvexPrProductConflictMap[candidate.slug] || renuvexPrProductMap[candidate.slug]) return null;
  }

  var proof = Object.freeze(Object.assign({}, candidate, {
    kind: 'listing',
    proofStage: 'resolved',
    productId: normalizedProductId,
    identitySource: identitySource,
  }));
  var record = attestedProductLinks.get(candidate.linkEl);
  if (!record || !sameListingCandidate(record.candidate, candidate)) return null;
  record.candidate = candidate;
  record.resolvedProof = proof;
  return proof;
}

export function validateListingPlacementProof(proof) {
  if (!proof || proof.kind !== 'listing' || proof.proofStage !== 'resolved') return false;
  var productId = normalizeProductId(proof.productId);
  if (!productId || !validateListingPlacementCandidate(proof)) return false;
  if (proof.identitySource === 'storefront_event') {
    return proof.eventProductId === productId && !proof.identityBlockReason;
  }
  if (proof.identitySource === 'lifecycle_resolver') {
    return !proof.eventProductId && !proof.identityBlockReason &&
      !renuvexPrProductMap[proof.slug] && !renuvexPrProductConflictMap[proof.slug];
  }
  return false;
}

function registerAttestedProductLink(candidate) {
  if (!validateListingPlacementCandidate(candidate)) return;
  var existing = attestedProductLinks.get(candidate.linkEl);
  attestedProductLinks.set(candidate.linkEl, {
    candidate: candidate,
    resolvedProof: existing && sameListingCandidate(existing.candidate, candidate) &&
      validateListingPlacementProof(existing.resolvedProof)
      ? existing.resolvedProof
      : null,
  });
}

export function getResolvedListingPlacementProof(candidate) {
  if (!candidate || !candidate.linkEl || !validateListingPlacementCandidate(candidate)) return null;
  var record = attestedProductLinks.get(candidate.linkEl);
  if (!record || !sameListingCandidate(record.candidate, candidate)) return null;
  return validateListingPlacementProof(record.resolvedProof) ? record.resolvedProof : null;
}

export function captureModalContextFromClick(anchor) {
  var attested = anchor ? attestedProductLinks.get(anchor) : null;
  removeModalContextBadge(modalContext);
  modalToken += 1;
  if (!attested || !validateListingPlacementCandidate(attested.candidate)) {
    modalContext = null;
    return null;
  }
  modalContext = {
    candidate: attested.candidate,
    adapterKey: attested.candidate.adapterKey,
    epoch: attested.candidate.epoch,
    listingGeneration: attested.candidate.listingGeneration,
    linkEl: anchor,
    href: attested.candidate.href,
    slug: attested.candidate.slug,
    titleText: attested.candidate.titleText,
    token: modalToken,
    capturedAt: Date.now(),
    modalEl: null,
    titleEl: null,
  };
  return modalContext;
}

export function clearModalPlacementContext() {
  removeModalContextBadge(modalContext);
  modalToken += 1;
  modalContext = null;
}

export function reconcileModalPlacementContext() {
  if (!modalContext) return;
  if (!isStorefrontContextCurrent(modalContext.epoch) ||
      Date.now() - modalContext.capturedAt > MODAL_CONTEXT_TTL) {
    clearModalPlacementContext();
    return;
  }
  var adapter = getThemeAdapterByKey(modalContext.adapterKey);
  if (!adapter) {
    clearModalPlacementContext();
    return;
  }
  var modals = adapter.findStrictModals().filter(isVisible);
  if (modals.length > 1) {
    clearModalPlacementContext();
    return;
  }
  if (modals.length === 0) {
    if (modalContext.modalEl) clearModalPlacementContext();
    return;
  }
  var modalEl = modals[0];
  var titleEl = adapter.findModalTitle(modalEl);
  var exactTitle = !!(
    titleEl &&
    isVisible(titleEl) &&
    adapter.matchesStrictModalTitle(titleEl) &&
    textMatches(titleEl, modalContext.titleText)
  );
  if (modalContext.modalEl) {
    if (modalContext.modalEl !== modalEl || modalContext.titleEl !== titleEl || !exactTitle) {
      clearModalPlacementContext();
    }
    return;
  }
  if (exactTitle) {
    modalContext.modalEl = modalEl;
    modalContext.titleEl = titleEl;
  }
}

export function resolveModalPlacementProof() {
  if (!modalContext || !isStorefrontContextCurrent(modalContext.epoch)) return null;
  reconcileModalPlacementContext();
  if (!modalContext || !modalContext.modalEl || !modalContext.titleEl) return null;
  var attested = modalContext.linkEl ? attestedProductLinks.get(modalContext.linkEl) : null;
  if (!attested || !sameListingCandidate(attested.candidate, modalContext.candidate) ||
      !validateListingPlacementProof(attested.resolvedProof)) return null;
  if (!modalContext.linkEl.isConnected || modalContext.linkEl.href !== modalContext.href) return null;
  var adapter = getThemeAdapterByKey(modalContext.adapterKey);
  if (!adapter) return null;
  var modals = adapter.findStrictModals().filter(isVisible);
  if (modals.length !== 1 || modals[0] !== modalContext.modalEl) return null;
  var modalEl = modalContext.modalEl;
  var titleEl = modalContext.titleEl;
  if (adapter.findModalTitle(modalEl) !== titleEl) return null;
  if (!titleEl || !isVisible(titleEl) || !adapter.matchesStrictModalTitle(titleEl)) return null;
  if (!textMatches(titleEl, modalContext.titleText)) return null;
  return {
    kind: 'modal',
    adapterKey: adapter.key,
    epoch: modalContext.epoch,
    token: modalContext.token,
    slug: modalContext.slug,
    productId: attested.resolvedProof.productId,
    identitySource: attested.resolvedProof.identitySource,
    linkEl: modalContext.linkEl,
    href: modalContext.href,
    listingGeneration: modalContext.listingGeneration,
    titleText: modalContext.titleText,
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
  var attested = proof.linkEl ? attestedProductLinks.get(proof.linkEl) : null;
  return !!(
    adapter &&
    normalizeProductId(proof.productId) &&
    proof.listingGeneration === getStorefrontListingGeneration() &&
    proof.linkEl.isConnected &&
    proof.linkEl.href === proof.href &&
    attested &&
    validateListingPlacementProof(attested.resolvedProof) &&
    attested.resolvedProof.productId === proof.productId &&
    visibleModals.length === 1 &&
    visibleModals[0] === proof.modalEl &&
    adapter.matchesStrictModalTitle(proof.titleEl) &&
    proof.modalEl.contains(proof.titleEl) &&
    textMatches(proof.titleEl, proof.titleText)
  );
}

onStorefrontContextInvalidated(clearModalPlacementContext);

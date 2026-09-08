// Ephemeral request state bound to an exact listing placement proof.
// This is not a rating cache: entries disappear with their DOM links and are
// invalidated by any proof identity or storefront epoch change.

var proofRequestStates = new WeakMap();

function normalizeProductId(value) {
  return value === undefined || value === null || value === '' ? null : String(value);
}

function snapshotProof(proof, status) {
  return {
    status: status,
    adapterKey: proof.adapterKey,
    epoch: proof.epoch,
    slug: String(proof.slug),
    productId: normalizeProductId(proof.productId),
    containerEl: proof.containerEl,
    cardEl: proof.cardEl,
    titleEl: proof.titleEl,
    mountParent: proof.mountPoint && proof.mountPoint.parent,
    mountAnchor: proof.mountPoint && proof.mountPoint.anchorEl,
  };
}

function matchesProof(state, proof) {
  return !!(
    state &&
    proof &&
    state.adapterKey === proof.adapterKey &&
    state.epoch === proof.epoch &&
    state.slug === String(proof.slug) &&
    state.productId === normalizeProductId(proof.productId) &&
    state.containerEl === proof.containerEl &&
    state.cardEl === proof.cardEl &&
    state.titleEl === proof.titleEl &&
    state.mountParent === (proof.mountPoint && proof.mountPoint.parent) &&
    state.mountAnchor === (proof.mountPoint && proof.mountPoint.anchorEl)
  );
}

function targetMatchesProof(targetProductId, proof) {
  return normalizeProductId(targetProductId) === normalizeProductId(proof.productId);
}

export function getListingProofRequestStatus(proof) {
  var state = proof && proof.linkEl ? proofRequestStates.get(proof.linkEl) : null;
  return matchesProof(state, proof) ? state.status : null;
}

export function markListingProofRequestsInFlight(proofs) {
  (proofs || []).forEach(function (proof) {
    if (!proof || !proof.linkEl) return;
    proofRequestStates.set(proof.linkEl, snapshotProof(proof, 'in_flight'));
  });
}

export function settleListingProofRequests(proofs, ratings, resolvedTargets, isProofCurrent) {
  (proofs || []).forEach(function (proof) {
    if (!proof || !proof.linkEl) return;
    var current = proofRequestStates.get(proof.linkEl);
    if (!matchesProof(current, proof) || current.status !== 'in_flight') return;

    var wasResolved = Object.prototype.hasOwnProperty.call(resolvedTargets || {}, proof.slug) &&
      targetMatchesProof(resolvedTargets[proof.slug], proof);
    if (!wasResolved || (typeof isProofCurrent === 'function' && !isProofCurrent(proof))) {
      proofRequestStates.delete(proof.linkEl);
      return;
    }

    var rating = ratings && ratings[proof.slug];
    if (!rating || rating._empty || Number(rating.count) === 0) {
      proofRequestStates.set(proof.linkEl, snapshotProof(proof, 'empty'));
      return;
    }

    // A rendered positive badge becomes the durable state for the current DOM.
    proofRequestStates.delete(proof.linkEl);
  });
}

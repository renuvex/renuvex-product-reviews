// Ephemeral request state bound to an exact listing DOM candidate. This is not
// an identity cache: it only suppresses duplicate work for the same live link.

var PROOF_SUPPRESSION_TTL = 5 * 60 * 1000;
var proofRequestStates = new WeakMap();

function snapshotCandidate(candidate, status, resolved) {
  return {
    status: status,
    expiresAt: status === 'empty' || status === 'unresolved'
      ? Date.now() + PROOF_SUPPRESSION_TTL
      : null,
    adapterKey: candidate.adapterKey,
    epoch: candidate.epoch,
    listingGeneration: candidate.listingGeneration,
    slug: String(candidate.slug),
    eventProductId: candidate.eventProductId || null,
    identityBlockReason: candidate.identityBlockReason || null,
    href: candidate.href,
    titleText: candidate.titleText,
    containerEl: candidate.containerEl,
    cardEl: candidate.cardEl,
    linkEl: candidate.linkEl,
    titleEl: candidate.titleEl,
    mountParent: candidate.mountPoint && candidate.mountPoint.parent,
    mountAnchor: candidate.mountPoint && candidate.mountPoint.anchorEl,
    resolvedProductId: resolved && resolved.productId ? String(resolved.productId) : null,
    identitySource: resolved && resolved.identitySource ? resolved.identitySource : null,
  };
}

function matchesCandidate(state, candidate) {
  return !!(
    state &&
    candidate &&
    state.adapterKey === candidate.adapterKey &&
    state.epoch === candidate.epoch &&
    state.listingGeneration === candidate.listingGeneration &&
    state.slug === String(candidate.slug) &&
    state.eventProductId === (candidate.eventProductId || null) &&
    state.identityBlockReason === (candidate.identityBlockReason || null) &&
    state.href === candidate.href &&
    state.titleText === candidate.titleText &&
    state.containerEl === candidate.containerEl &&
    state.cardEl === candidate.cardEl &&
    state.linkEl === candidate.linkEl &&
    state.titleEl === candidate.titleEl &&
    state.mountParent === (candidate.mountPoint && candidate.mountPoint.parent) &&
    state.mountAnchor === (candidate.mountPoint && candidate.mountPoint.anchorEl)
  );
}

export function getListingProofRequestStatus(candidate) {
  var state = candidate && candidate.linkEl ? proofRequestStates.get(candidate.linkEl) : null;
  if (!matchesCandidate(state, candidate)) return null;
  if (state.expiresAt && Date.now() >= state.expiresAt) {
    proofRequestStates.delete(candidate.linkEl);
    return null;
  }
  return state.status;
}

export function markListingProofRequestsInFlight(candidates) {
  (candidates || []).forEach(function (candidate) {
    if (!candidate || !candidate.linkEl) return;
    proofRequestStates.set(candidate.linkEl, snapshotCandidate(candidate, 'in_flight'));
  });
}

export function settleListingProofRequests(candidates, outcomes, promoteProof) {
  var resolved = [];
  var rejected = [];

  (candidates || []).forEach(function (candidate) {
    if (!candidate || !candidate.linkEl) return;
    var current = proofRequestStates.get(candidate.linkEl);
    if (!matchesCandidate(current, candidate) || current.status !== 'in_flight') return;

    var outcome = outcomes && outcomes[candidate.slug];
    if (!outcome || outcome.status === 'error') {
      proofRequestStates.delete(candidate.linkEl);
      return;
    }
    if (outcome.status === 'unresolved') {
      proofRequestStates.set(candidate.linkEl, snapshotCandidate(candidate, 'unresolved'));
      return;
    }

    var proof = typeof promoteProof === 'function'
      ? promoteProof(candidate, outcome.productId, outcome.identitySource)
      : null;
    if (!proof) {
      proofRequestStates.delete(candidate.linkEl);
      rejected.push(candidate);
      return;
    }

    if (!outcome.rating || outcome.rating._empty || Number(outcome.rating.count) === 0) {
      proofRequestStates.set(candidate.linkEl, snapshotCandidate(candidate, 'empty', outcome));
      return;
    }

    proofRequestStates.delete(candidate.linkEl);
    resolved.push({ proof: proof, rating: outcome.rating });
  });

  return { resolved: resolved, rejected: rejected };
}

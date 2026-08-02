export const PRODUCT_LIFECYCLE_STATES = [
  'unknown',
  'active_verified',
  'unavailable_verified',
  'identity_conflict',
] as const;

export type ProductLifecycleState = (typeof PRODUCT_LIFECYCLE_STATES)[number];

export const PRODUCT_ACTIVE_EVIDENCE_MAX_AGE_MS = 36 * 60 * 60 * 1000;

export type NormalizedProductEvidence = {
  productId: string;
  slug: string | null;
  name: string | null;
  providerCreatedAt: Date | null;
  ikasUpdatedAt: Date | null;
  deleted: boolean;
};

export type CurrentProductEvidence = {
  lifecycleState: string;
  slug: string | null;
  name: string | null;
  providerCreatedAt: Date | null;
  ikasUpdatedAt: Date | null;
  unavailableAt: Date | null;
  conflictDetectedAt: Date | null;
};

export type ProductLifecycleWrite = {
  lifecycleState: ProductLifecycleState;
  slug?: string | null;
  name?: string | null;
  providerCreatedAt?: Date | null;
  ikasUpdatedAt?: Date | null;
  lastVerifiedAt: Date;
  unavailableAt?: Date | null;
  conflictDetectedAt?: Date | null;
  lastEvidenceSource: string;
  lastSeenReconciliationRunId?: string | null;
  lastSyncedAt: Date;
};

function currentState(current: CurrentProductEvidence | null): ProductLifecycleState {
  return PRODUCT_LIFECYCLE_STATES.includes(current?.lifecycleState as ProductLifecycleState)
    ? current!.lifecycleState as ProductLifecycleState
    : 'unknown';
}

function shouldAcceptMetadata(
  current: CurrentProductEvidence | null,
  evidence: NormalizedProductEvidence,
): boolean {
  if (!current?.ikasUpdatedAt) return true;
  if (!evidence.ikasUpdatedAt) return false;
  return evidence.ikasUpdatedAt.getTime() >= current.ikasUpdatedAt.getTime();
}

export function decideProductLifecycleWrite(input: {
  current: CurrentProductEvidence | null;
  evidence: NormalizedProductEvidence | null;
  productId: string;
  source: string;
  now: Date;
  reconciliationRunId?: string;
}): ProductLifecycleWrite {
  const { current, evidence, source, now, reconciliationRunId } = input;
  const state = currentState(current);
  const seenInRun = reconciliationRunId === undefined
    ? {}
    : { lastSeenReconciliationRunId: reconciliationRunId };

  if (!evidence || evidence.deleted) {
    if (state === 'identity_conflict') {
      return {
        lifecycleState: 'identity_conflict',
        lastVerifiedAt: now,
        conflictDetectedAt: current?.conflictDetectedAt ?? now,
        lastEvidenceSource: source,
        lastSyncedAt: now,
        ...seenInRun,
      };
    }
    return {
      lifecycleState: 'unavailable_verified',
      providerCreatedAt: current?.providerCreatedAt ?? evidence?.providerCreatedAt ?? null,
      lastVerifiedAt: now,
      unavailableAt: current?.unavailableAt ?? now,
      conflictDetectedAt: null,
      lastEvidenceSource: source,
      lastSyncedAt: now,
      ...seenInRun,
    };
  }

  if (evidence.productId !== input.productId) {
    throw new Error('product_evidence_id_mismatch');
  }

  if (state === 'identity_conflict' || state === 'unavailable_verified') {
    return {
      lifecycleState: 'identity_conflict',
      lastVerifiedAt: now,
      conflictDetectedAt: current?.conflictDetectedAt ?? now,
      lastEvidenceSource: source,
      lastSyncedAt: now,
      ...seenInRun,
    };
  }

  const metadata = shouldAcceptMetadata(current, evidence)
    ? {
        slug: evidence.slug,
        name: evidence.name,
        ikasUpdatedAt: evidence.ikasUpdatedAt,
      }
    : {};

  return {
    lifecycleState: 'active_verified',
    ...metadata,
    providerCreatedAt: current?.providerCreatedAt ?? evidence.providerCreatedAt,
    lastVerifiedAt: now,
    unavailableAt: null,
    conflictDetectedAt: null,
    lastEvidenceSource: source,
    lastSyncedAt: now,
    ...seenInRun,
  };
}

export function isFreshActiveProduct(
  snapshot: { lifecycleState: string; lastVerifiedAt: Date | null },
  now = new Date(),
): boolean {
  return snapshot.lifecycleState === 'active_verified' &&
    snapshot.lastVerifiedAt !== null &&
    now.getTime() - snapshot.lastVerifiedAt.getTime() <= PRODUCT_ACTIVE_EVIDENCE_MAX_AGE_MS;
}

export function resolveSafeSlugProductIds(
  snapshots: Array<{
    slug: string | null;
    productId: string;
    lifecycleState: string;
    lastVerifiedAt: Date | null;
  }>,
  now = new Date(),
): Record<string, string> {
  const grouped = new Map<string, typeof snapshots>();
  for (const snapshot of snapshots) {
    if (!snapshot.slug) continue;
    const group = grouped.get(snapshot.slug) ?? [];
    group.push(snapshot);
    grouped.set(snapshot.slug, group);
  }

  const resolved: Record<string, string> = {};
  for (const [slug, group] of grouped) {
    const relevant = group.filter((snapshot) => snapshot.lifecycleState !== 'unavailable_verified');
    if (relevant.some((snapshot) => !isFreshActiveProduct(snapshot, now))) continue;
    const activeProductIds = [...new Set(relevant.map((snapshot) => snapshot.productId))];
    if (activeProductIds.length === 1) resolved[slug] = activeProductIds[0];
  }
  return resolved;
}

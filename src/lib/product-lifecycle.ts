export const PRODUCT_LIFECYCLE_STATES = [
  'unknown',
  'active_verified',
  'unavailable_verified',
  'identity_conflict',
] as const;

export type ProductLifecycleState = (typeof PRODUCT_LIFECYCLE_STATES)[number];

export const PRODUCT_ACTIVE_EVIDENCE_MAX_AGE_MS = 36 * 60 * 60 * 1000;
export const PRODUCT_ABSENCE_CONFIRMATION_MIN_AGE_MS = 24 * 60 * 60 * 1000;

const DAILY_SCHEDULE_SLOT_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

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
  lastVerifiedAt: Date | null;
  unavailableAt: Date | null;
  conflictDetectedAt: Date | null;
  absenceFirstObservedAt: Date | null;
  absenceLastObservedAt: Date | null;
  absenceObservationCount: number;
  absenceLastScheduleSlot: string | null;
};

export type ProductInstallationEvidence = {
  authorizedAppId: string;
  generation: number;
  stateVersion: number;
};

export type ProductFreshnessEvidence = {
  lifecycleState: string;
  lastVerifiedAt: Date | null;
  exactEvidenceAuthorizedAppId: string | null;
  exactEvidenceGeneration: number | null;
  exactEvidenceStateVersion: number | null;
};

export type ProductCatalogCoverageEvidence = {
  storeId: string;
  authorizedAppId: string;
  installationGeneration: number;
  installationStateVersion: number;
  completedAt: Date;
  reconciliationRun: {
    storeId: string;
    authorizedAppId: string;
    installationGeneration: number;
    installationStateVersion: number;
    status: string;
    startedAt: Date | null;
    finishedAt: Date | null;
  } | null;
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
  absenceFirstObservedAt: Date | null;
  absenceLastObservedAt: Date | null;
  absenceObservationCount: number;
  absenceLastScheduleSlot: string | null;
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

export function isValidDailyScheduleSlot(value: string | null | undefined): value is string {
  if (!value || !DAILY_SCHEDULE_SLOT_PATTERN.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function currentAbsenceEvidence(current: CurrentProductEvidence | null) {
  return {
    absenceFirstObservedAt: current?.absenceFirstObservedAt ?? null,
    absenceLastObservedAt: current?.absenceLastObservedAt ?? null,
    absenceObservationCount: current?.absenceObservationCount ?? 0,
    absenceLastScheduleSlot: current?.absenceLastScheduleSlot ?? null,
  };
}

function clearedAbsenceEvidence() {
  return {
    absenceFirstObservedAt: null,
    absenceLastObservedAt: null,
    absenceObservationCount: 0,
    absenceLastScheduleSlot: null,
  };
}

function observeDailyAbsence(
  current: CurrentProductEvidence | null,
  scheduleSlot: string,
  now: Date,
) {
  const previous = currentAbsenceEvidence(current);
  if (!previous.absenceLastScheduleSlot) {
    return {
      absenceFirstObservedAt: now,
      absenceLastObservedAt: now,
      absenceObservationCount: 1,
      absenceLastScheduleSlot: scheduleSlot,
    };
  }
  if (scheduleSlot <= previous.absenceLastScheduleSlot) return previous;
  return {
    absenceFirstObservedAt: previous.absenceFirstObservedAt ?? now,
    absenceLastObservedAt: now,
    absenceObservationCount: previous.absenceObservationCount + 1,
    absenceLastScheduleSlot: scheduleSlot,
  };
}

export function decideProductLifecycleWrite(input: {
  current: CurrentProductEvidence | null;
  evidence: NormalizedProductEvidence | null;
  productId: string;
  source: string;
  now: Date;
  reconciliationRunId?: string;
  reconciliationTrigger?: 'install' | 'daily' | 'manual';
  scheduleSlot?: string | null;
}): ProductLifecycleWrite {
  const { current, evidence, source, now, reconciliationRunId } = input;
  const state = currentState(current);
  const seenInRun = reconciliationRunId === undefined
    ? {}
    : { lastSeenReconciliationRunId: reconciliationRunId };

  if (!evidence) {
    const absence = input.reconciliationTrigger === 'daily' && isValidDailyScheduleSlot(input.scheduleSlot)
      ? observeDailyAbsence(current, input.scheduleSlot, now)
      : currentAbsenceEvidence(current);
    const absenceConfirmed = absence.absenceObservationCount >= 2 &&
      absence.absenceFirstObservedAt !== null &&
      now.getTime() - absence.absenceFirstObservedAt.getTime() >= PRODUCT_ABSENCE_CONFIRMATION_MIN_AGE_MS;
    if (state === 'identity_conflict') {
      return {
        lifecycleState: 'identity_conflict',
        lastVerifiedAt: now,
        conflictDetectedAt: current?.conflictDetectedAt ?? now,
        ...absence,
        lastEvidenceSource: source,
        lastSyncedAt: now,
        ...seenInRun,
      };
    }
    if (state === 'unavailable_verified') {
      return {
        lifecycleState: 'unavailable_verified',
        providerCreatedAt: current?.providerCreatedAt ?? null,
        lastVerifiedAt: now,
        unavailableAt: current?.unavailableAt ?? now,
        conflictDetectedAt: null,
        ...absence,
        lastEvidenceSource: source,
        lastSyncedAt: now,
        ...seenInRun,
      };
    }
    return {
      lifecycleState: absenceConfirmed ? 'unavailable_verified' : 'unknown',
      providerCreatedAt: current?.providerCreatedAt ?? null,
      lastVerifiedAt: now,
      unavailableAt: absenceConfirmed ? current?.unavailableAt ?? now : null,
      conflictDetectedAt: null,
      ...absence,
      lastEvidenceSource: source,
      lastSyncedAt: now,
      ...seenInRun,
    };
  }

  if (evidence.deleted) {
    if (state === 'identity_conflict') {
      return {
        lifecycleState: 'identity_conflict',
        lastVerifiedAt: now,
        conflictDetectedAt: current?.conflictDetectedAt ?? now,
        ...currentAbsenceEvidence(current),
        lastEvidenceSource: source,
        lastSyncedAt: now,
        ...seenInRun,
      };
    }
    return {
      lifecycleState: 'unavailable_verified',
      providerCreatedAt: current?.providerCreatedAt ?? evidence.providerCreatedAt,
      lastVerifiedAt: now,
      unavailableAt: current?.unavailableAt ?? now,
      conflictDetectedAt: null,
      ...clearedAbsenceEvidence(),
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
      ...currentAbsenceEvidence(current),
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
    ...clearedAbsenceEvidence(),
    lastEvidenceSource: source,
    lastSyncedAt: now,
    ...seenInRun,
  };
}

export function resolveEffectiveProductEvidenceAt(
  snapshot: ProductFreshnessEvidence,
  installation: ProductInstallationEvidence | null,
  coverageStartedAt: Date | null,
): Date | null {
  const exactAt = installation &&
    snapshot.exactEvidenceAuthorizedAppId === installation.authorizedAppId &&
    snapshot.exactEvidenceGeneration === installation.generation &&
    snapshot.exactEvidenceStateVersion === installation.stateVersion
    ? snapshot.lastVerifiedAt
    : null;
  return [exactAt, coverageStartedAt]
    .filter((value): value is Date => value !== null)
    .reduce<Date | null>((latest, value) => !latest || value > latest ? value : latest, null);
}

export function resolveCurrentCatalogCoverageStartedAt(
  storeId: string,
  installation: ProductInstallationEvidence | null,
  coverage: ProductCatalogCoverageEvidence | null,
): Date | null {
  const run = coverage?.reconciliationRun;
  if (
    !installation ||
    !coverage ||
    !run ||
    coverage.storeId !== storeId ||
    coverage.authorizedAppId !== installation.authorizedAppId ||
    coverage.installationGeneration !== installation.generation ||
    coverage.installationStateVersion !== installation.stateVersion ||
    run.storeId !== storeId ||
    run.authorizedAppId !== installation.authorizedAppId ||
    run.installationGeneration !== installation.generation ||
    run.installationStateVersion !== installation.stateVersion ||
    run.status !== 'completed' ||
    !run.startedAt ||
    !run.finishedAt ||
    run.finishedAt.getTime() < run.startedAt.getTime() ||
    coverage.completedAt.getTime() !== run.finishedAt.getTime()
  ) {
    return null;
  }
  return run.startedAt;
}

export function isFreshActiveProduct(
  snapshot: ProductFreshnessEvidence,
  installation: ProductInstallationEvidence | null,
  now = new Date(),
  coverageStartedAt: Date | null = null,
): boolean {
  const lastVerifiedAt = resolveEffectiveProductEvidenceAt(snapshot, installation, coverageStartedAt);
  return snapshot.lifecycleState === 'active_verified' &&
    lastVerifiedAt !== null &&
    now.getTime() - lastVerifiedAt.getTime() <= PRODUCT_ACTIVE_EVIDENCE_MAX_AGE_MS;
}

export function resolveSafeSlugProductIds(
  snapshots: Array<{
    slug: string | null;
    productId: string;
    lifecycleState: string;
    lastVerifiedAt: Date | null;
    exactEvidenceAuthorizedAppId: string | null;
    exactEvidenceGeneration: number | null;
    exactEvidenceStateVersion: number | null;
  }>,
  installation: ProductInstallationEvidence | null,
  now = new Date(),
  coverageStartedAt: Date | null = null,
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
    if (relevant.some((snapshot) => !isFreshActiveProduct(
      snapshot,
      installation,
      now,
      coverageStartedAt,
    ))) continue;
    const activeProductIds = [...new Set(relevant.map((snapshot) => snapshot.productId))];
    if (activeProductIds.length === 1) resolved[slug] = activeProductIds[0];
  }
  return resolved;
}

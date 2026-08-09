import { randomUUID } from 'node:crypto';
import type {
  AuthToken as AuthTokenRow,
  IkasStoreInstallation,
  Prisma,
  ProductReconciliationRun,
} from '@prisma/client';
import { getIkas } from '@/helpers/api-helpers';
import { prisma } from '@/lib/prisma';
import type { ikasAdminGraphQLAPIClient } from '@/lib/ikas-client/generated/graphql';
import {
  lockIkasStoreInstallationLifecycle,
  type IkasInstallationFence,
} from '@/lib/ikas-installation-lifecycle';
import { AuthTokenManager } from '@/models/auth-token/manager';
import type { AuthToken } from '@/models/auth-token';
import {
  applyExactProductEvidenceBatch,
  normalizeProductEvidence,
  reportProductIdentityConflicts,
  type ProductEvidenceBatchResult,
  type ProductLike,
} from '@/lib/product-snapshots';
import { isValidDailyScheduleSlot } from '@/lib/product-lifecycle';
import type {
  ProductReconciliationDispatchReason,
  ProductReconciliationDispatchRequest,
} from '@/lib/product-reconciliation-dispatcher';

const SCAN_PAGE_SIZE = 200;
const VERIFY_BATCH_SIZE = 50;
const RUN_LEASE_MS = 5 * 60 * 1000;
const MAX_FAILURE_ATTEMPTS = 8;
const RETRY_BASE_MS = 5 * 60 * 1000;
const RETRY_MAX_MS = 6 * 60 * 60 * 1000;
const TERMINAL_STATUSES = new Set(['completed', 'exhausted', 'stale_ignored']);
const NONTERMINAL_STATUSES = ['pending', 'scanning', 'verifying', 'error'] as const;

type IkasClient = ikasAdminGraphQLAPIClient<AuthToken>;
export type ProductReconciliationTrigger = 'install' | 'daily' | 'manual';

export class ProductReconciliationError extends Error {
  constructor(
    public readonly code: string,
    public readonly retryable = true,
  ) {
    super(code);
    this.name = 'ProductReconciliationError';
  }
}

type StartRunResult = {
  run: ProductReconciliationRun;
  created: boolean;
};

type ClaimedRun = {
  state: 'claimed';
  run: ProductReconciliationRun;
  authToken: AuthTokenRow;
  leaseOwner: string;
};

type ClaimResult =
  | ClaimedRun
  | { state: 'terminal' | 'busy' | 'deferred' | 'stale'; run: ProductReconciliationRun };

export type ProductReconciliationProcessResult = {
  runId: string;
  status: string;
  continuationRequired: boolean;
  continuation: ProductReconciliationDispatchRequest | null;
};

function processResult(
  run: ProductReconciliationRun,
  reason: ProductReconciliationDispatchReason | null = null,
  notBefore: Date | null = null,
): ProductReconciliationProcessResult {
  return {
    runId: run.id,
    status: run.status,
    continuationRequired: reason !== null,
    continuation: reason ? { run, reason, notBefore } : null,
  };
}

function retryAt(now: Date, attempts: number): Date {
  const delay = Math.min(RETRY_MAX_MS, RETRY_BASE_MS * 2 ** Math.max(0, attempts - 1));
  return new Date(now.getTime() + delay);
}

function installationMatchesRun(
  installation: IkasStoreInstallation | null,
  run: Pick<ProductReconciliationRun, 'authorizedAppId' | 'installationGeneration' | 'installationStateVersion'>,
): boolean {
  return installation?.status === 'active' &&
    installation.authorizedAppId === run.authorizedAppId &&
    installation.generation === run.installationGeneration &&
    installation.stateVersion === run.installationStateVersion;
}

async function lockRun(
  tx: Prisma.TransactionClient,
  runId: string,
): Promise<ProductReconciliationRun | null> {
  const rows = await tx.$queryRaw<ProductReconciliationRun[]>`
    SELECT * FROM "ProductReconciliationRun"
    WHERE "id" = ${runId}
    FOR UPDATE
  `;
  return rows[0] ?? null;
}

async function clearRunObservations(
  tx: Prisma.TransactionClient,
  runId: string,
): Promise<void> {
  await tx.productReconciliationObservation.deleteMany({ where: { runId } });
}

async function markRunStale(
  tx: Prisma.TransactionClient,
  runId: string,
  now: Date,
): Promise<ProductReconciliationRun> {
  await clearRunObservations(tx, runId);
  return tx.productReconciliationRun.update({
    where: { id: runId },
    data: {
      status: 'stale_ignored',
      phase: 'complete',
      leaseOwner: null,
      leaseExpiresAt: null,
      nextRetryAt: null,
      lastErrorCode: null,
      finishedAt: now,
    },
  });
}

export async function startProductReconciliationRun(input: {
  storeId: string;
  fence: IkasInstallationFence;
  trigger: ProductReconciliationTrigger;
  scheduleSlot?: string | null;
  now?: Date;
}): Promise<StartRunResult> {
  const now = input.now ?? new Date();
  const validScheduleSlot = input.trigger === 'daily'
    ? isValidDailyScheduleSlot(input.scheduleSlot)
    : input.scheduleSlot == null;
  if (!validScheduleSlot) {
    throw new ProductReconciliationError('product_reconciliation_schedule_slot_invalid', false);
  }
  return prisma.$transaction(async (tx) => {
    const installation = await lockIkasStoreInstallationLifecycle(tx, input.storeId);
    if (!installationMatchesRun(installation, {
      authorizedAppId: input.fence.authorizedAppId,
      installationGeneration: input.fence.generation,
      installationStateVersion: input.fence.stateVersion,
    })) {
      throw new ProductReconciliationError('product_reconciliation_installation_inactive', false);
    }

    const existing = await tx.productReconciliationRun.findFirst({
      where: {
        storeId: input.storeId,
        installationGeneration: input.fence.generation,
        OR: [
          { status: { in: [...NONTERMINAL_STATUSES] } },
          ...(input.scheduleSlot
            ? [{ trigger: input.trigger, scheduleSlot: input.scheduleSlot }]
            : []),
        ],
      },
      orderBy: { createdAt: 'asc' },
    });
    if (existing) return { run: existing, created: false };

    const run = await tx.productReconciliationRun.create({
      data: {
        storeId: input.storeId,
        authorizedAppId: input.fence.authorizedAppId,
        installationGeneration: input.fence.generation,
        installationStateVersion: input.fence.stateVersion,
        trigger: input.trigger,
        scheduleSlot: input.scheduleSlot ?? null,
        status: 'pending',
        phase: 'scan',
        nextPage: 1,
        nextRetryAt: now,
      },
    });
    return { run, created: true };
  });
}

async function claimProductReconciliationRun(runId: string, now: Date): Promise<ClaimResult> {
  const initial = await prisma.productReconciliationRun.findUnique({ where: { id: runId } });
  if (!initial) throw new ProductReconciliationError('product_reconciliation_run_not_found', false);

  return prisma.$transaction(async (tx) => {
    const installation = await lockIkasStoreInstallationLifecycle(tx, initial.storeId);
    const run = await lockRun(tx, runId);
    if (!run) throw new ProductReconciliationError('product_reconciliation_run_not_found', false);
    if (TERMINAL_STATUSES.has(run.status)) return { state: 'terminal', run };
    if (!installationMatchesRun(installation, run)) {
      return { state: 'stale', run: await markRunStale(tx, run.id, now) };
    }
    if (run.leaseExpiresAt && run.leaseExpiresAt > now) return { state: 'busy', run };
    if (run.nextRetryAt && run.nextRetryAt > now) return { state: 'deferred', run };

    const authToken = await tx.authToken.findUnique({ where: { authorizedAppId: run.authorizedAppId } });
    if (!authToken || authToken.merchantId !== run.storeId) {
      const attempts = run.attempts + 1;
      const status = attempts >= MAX_FAILURE_ATTEMPTS ? 'exhausted' : 'error';
      if (status === 'exhausted') await clearRunObservations(tx, run.id);
      const updated = await tx.productReconciliationRun.update({
        where: { id: run.id },
        data: {
          status,
          phase: status === 'exhausted' ? 'complete' : run.phase,
          attempts,
          nextRetryAt: status === 'exhausted' ? null : retryAt(now, attempts),
          lastErrorCode: 'product_reconciliation_auth_unavailable',
          finishedAt: status === 'exhausted' ? now : null,
        },
      });
      return { state: status === 'exhausted' ? 'terminal' : 'deferred', run: updated };
    }

    const leaseOwner = randomUUID();
    const updated = await tx.productReconciliationRun.update({
      where: { id: run.id },
      data: {
        status: run.phase === 'scan' ? 'scanning' : 'verifying',
        leaseOwner,
        leaseExpiresAt: new Date(now.getTime() + RUN_LEASE_MS),
        nextRetryAt: null,
        lastErrorCode: null,
        startedAt: run.startedAt ?? now,
      },
    });
    return { state: 'claimed', run: updated, authToken, leaseOwner };
  });
}

async function reconstructReferencedProductSnapshots(
  tx: Prisma.TransactionClient,
  storeId: string,
  now: Date,
): Promise<number> {
  return tx.$executeRaw`
    WITH referenced_products AS (
      SELECT "storeId", "productId" FROM "Review" WHERE "storeId" = ${storeId}
      UNION
      SELECT "storeId", "productId" FROM "ProductReviewSummary" WHERE "storeId" = ${storeId}
      UNION
      SELECT "storeId", "productId" FROM "ReviewRequest" WHERE "storeId" = ${storeId}
      UNION
      SELECT "storeId", "productId" FROM "PendingReviewImage"
        WHERE "storeId" = ${storeId} AND "productId" IS NOT NULL
      UNION
      SELECT "storeId", "productId" FROM "VideoUploadSession" WHERE "storeId" = ${storeId}
    )
    INSERT INTO "ProductSnapshot" (
      "id", "storeId", "productId", "lifecycleState", "lastSyncedAt", "createdAt", "updatedAt"
    )
    SELECT gen_random_uuid(), "storeId", "productId", 'unknown', ${now}, ${now}, ${now}
    FROM referenced_products
    WHERE "productId" IS NOT NULL AND btrim("productId") <> ''
    ON CONFLICT ("storeId", "productId") DO NOTHING
  `;
}

type ProductObservationInput = {
  productId: string;
  product: ProductLike | null;
};

async function recordProductObservations(
  tx: Prisma.TransactionClient,
  run: ProductReconciliationRun,
  entries: ProductObservationInput[],
  now: Date,
): Promise<void> {
  if (entries.length === 0) return;
  const productIds = entries.map((entry) => entry.productId);
  if (new Set(productIds).size !== productIds.length) {
    throw new ProductReconciliationError('product_provider_contract_invalid');
  }
  const existingCount = await tx.productReconciliationObservation.count({
    where: { runId: run.id, productId: { in: productIds } },
  });
  if (existingCount > 0) {
    throw new ProductReconciliationError('product_provider_cross_page_duplicate');
  }
  await tx.productReconciliationObservation.createMany({
    data: entries.map((entry) => {
      const evidence = entry.product ? normalizeProductEvidence(entry.product) : null;
      if (entry.product && (!evidence || evidence.productId !== entry.productId)) {
        throw new ProductReconciliationError('product_provider_contract_invalid');
      }
      return {
        runId: run.id,
        storeId: run.storeId,
        productId: entry.productId,
        evidence: !evidence ? 'absent' : evidence.deleted ? 'deleted' : 'present',
        observedAt: now,
      };
    }),
  });
}

async function lockClaimedRunForCommit(
  tx: Prisma.TransactionClient,
  claimed: ClaimedRun,
  now: Date,
): Promise<{ run: ProductReconciliationRun; stale: boolean }> {
  const installation = await lockIkasStoreInstallationLifecycle(tx, claimed.run.storeId);
  const run = await lockRun(tx, claimed.run.id);
  if (!run) throw new ProductReconciliationError('product_reconciliation_run_not_found', false);
  if (!installationMatchesRun(installation, run)) {
    return { run: await markRunStale(tx, run.id, now), stale: true };
  }
  if (run.leaseOwner !== claimed.leaseOwner || run.leaseExpiresAt === null) {
    throw new ProductReconciliationError('product_reconciliation_lease_lost');
  }
  return { run, stale: false };
}

function requireProviderPage(input: {
  isSuccess: boolean;
  payload: {
    count: number;
    page: number;
    limit: number;
    hasNext: boolean;
    data: ProductLike[];
  } | null | undefined;
  expectedPage: number;
  maxItems: number;
}): NonNullable<typeof input.payload> {
  if (!input.isSuccess || !input.payload) {
    throw new ProductReconciliationError('product_provider_list_failed');
  }
  const payload = input.payload as Partial<NonNullable<typeof input.payload>>;
  if (
    !Number.isInteger(payload.count) ||
    payload.count! < 0 ||
    !Number.isInteger(payload.page) ||
    payload.page !== input.expectedPage ||
    !Number.isInteger(payload.limit) ||
    payload.limit! < 1 ||
    payload.limit! > input.maxItems ||
    typeof payload.hasNext !== 'boolean' ||
    !Array.isArray(payload.data) ||
    payload.data.length > input.maxItems ||
    payload.count! < payload.data.length ||
    (payload.hasNext && payload.data.length === 0)
  ) {
    throw new ProductReconciliationError('product_provider_contract_invalid');
  }
  const ids = payload.data.map((product) => normalizeProductEvidence(product)?.productId ?? null);
  if (ids.some((id) => id === null) || new Set(ids).size !== ids.length) {
    throw new ProductReconciliationError('product_provider_contract_invalid');
  }
  return input.payload;
}

async function commitScanPage(
  claimed: ClaimedRun,
  payload: {
    count: number;
    data: ProductLike[];
    hasNext: boolean;
  },
  now: Date,
): Promise<ProductReconciliationProcessResult> {
  const committed = await prisma.$transaction(async (tx) => {
    const locked = await lockClaimedRunForCommit(tx, claimed, now);
    if (locked.stale) return { result: processResult(locked.run), newIdentityConflicts: 0 };
    if (locked.run.phase !== 'scan' || locked.run.nextPage !== claimed.run.nextPage) {
      throw new ProductReconciliationError('product_reconciliation_progress_conflict');
    }
    if (locked.run.expectedProductCount != null && locked.run.expectedProductCount !== payload.count) {
      throw new ProductReconciliationError('product_provider_catalog_drift');
    }
    const scannedCount = locked.run.scannedCount + payload.data.length;
    if ((payload.hasNext && scannedCount >= payload.count) || (!payload.hasNext && scannedCount !== payload.count)) {
      throw new ProductReconciliationError('product_provider_catalog_drift');
    }

    const entries = payload.data.map((product) => ({
      productId: normalizeProductEvidence(product)!.productId,
      product,
    }));
    await recordProductObservations(tx, locked.run, entries, now);
    const counts = await applyExactProductEvidenceBatch(tx, locked.run.storeId, entries, {
      source: 'reconciliation_scan',
      now,
      reconciliationTrigger: locked.run.trigger as ProductReconciliationTrigger,
      scheduleSlot: locked.run.scheduleSlot,
      provenance: { kind: 'catalog_coverage' },
    });
    const reconstructedCount = payload.hasNext
      ? 0
      : await reconstructReferencedProductSnapshots(tx, locked.run.storeId, now);
    const updated = await tx.productReconciliationRun.update({
      where: { id: locked.run.id },
      data: {
        status: 'pending',
        phase: payload.hasNext ? 'scan' : 'verify',
        nextPage: payload.hasNext ? locked.run.nextPage + 1 : locked.run.nextPage,
        expectedProductCount: locked.run.expectedProductCount ?? payload.count,
        scannedCount: { increment: entries.length },
        verifiedCount: { increment: entries.length },
        activeCount: { increment: counts.active_verified },
        unavailableCount: { increment: counts.unavailable_verified },
        conflictCount: { increment: counts.identity_conflict },
        reconstructedCount: { increment: reconstructedCount },
        snapshotCreatedCount: { increment: counts.createdSnapshots },
        snapshotUpdatedCount: { increment: counts.changedSnapshots },
        leaseOwner: null,
        leaseExpiresAt: null,
        nextRetryAt: now,
        lastErrorCode: null,
      },
    });
    return {
      result: processResult(updated, 'progress'),
      newIdentityConflicts: counts.newIdentityConflicts,
    };
  });
  reportProductIdentityConflicts(committed.newIdentityConflicts, 'reconciliation_scan');
  return committed.result;
}

async function loadVerificationCandidates(run: ProductReconciliationRun) {
  return prisma.$queryRaw<Array<{ productId: string }>>`
    SELECT snapshot."productId"
    FROM "ProductSnapshot" snapshot
    WHERE snapshot."storeId" = ${run.storeId}
      AND snapshot."lifecycleState" IN ('unknown', 'active_verified')
      AND (${run.candidateCursor}::text IS NULL OR snapshot."productId" > ${run.candidateCursor})
      AND NOT EXISTS (
        SELECT 1
        FROM "ProductReconciliationObservation" observation
        WHERE observation."runId" = ${run.id}
          AND observation."productId" = snapshot."productId"
      )
    ORDER BY snapshot."productId" ASC
    LIMIT ${VERIFY_BATCH_SIZE}
  `;
}

async function completeVerification(
  claimed: ClaimedRun,
  now: Date,
): Promise<ProductReconciliationProcessResult> {
  return prisma.$transaction(async (tx) => {
    const locked = await lockClaimedRunForCommit(tx, claimed, now);
    if (locked.stale) return processResult(locked.run);
    if (locked.run.phase !== 'verify') {
      throw new ProductReconciliationError('product_reconciliation_progress_conflict');
    }
    const productCount = locked.run.expectedProductCount ?? locked.run.scannedCount;
    await tx.productCatalogCoverage.upsert({
      where: { storeId: locked.run.storeId },
      create: {
        storeId: locked.run.storeId,
        authorizedAppId: locked.run.authorizedAppId,
        installationGeneration: locked.run.installationGeneration,
        installationStateVersion: locked.run.installationStateVersion,
        reconciliationRunId: locked.run.id,
        productCount,
        completedAt: now,
      },
      update: {
        authorizedAppId: locked.run.authorizedAppId,
        installationGeneration: locked.run.installationGeneration,
        installationStateVersion: locked.run.installationStateVersion,
        reconciliationRunId: locked.run.id,
        productCount,
        completedAt: now,
      },
    });
    await clearRunObservations(tx, locked.run.id);
    const updated = await tx.productReconciliationRun.update({
      where: { id: locked.run.id },
      data: {
        status: 'completed',
        phase: 'complete',
        leaseOwner: null,
        leaseExpiresAt: null,
        nextRetryAt: null,
        lastErrorCode: null,
        finishedAt: now,
      },
    });
    return processResult(updated);
  });
}

async function commitVerificationBatch(
  claimed: ClaimedRun,
  productIds: string[],
  products: ProductLike[],
  now: Date,
): Promise<ProductReconciliationProcessResult> {
  const returned = new Map<string, ProductLike>();
  for (const product of products) {
    const evidence = normalizeProductEvidence(product);
    if (!evidence || !productIds.includes(evidence.productId) || returned.has(evidence.productId)) {
      throw new ProductReconciliationError('product_provider_contract_invalid');
    }
    returned.set(evidence.productId, product);
  }

  const committed = await prisma.$transaction(async (tx) => {
    const locked = await lockClaimedRunForCommit(tx, claimed, now);
    if (locked.stale) return { result: processResult(locked.run), newIdentityConflicts: 0 };
    if (locked.run.phase !== 'verify' || locked.run.candidateCursor !== claimed.run.candidateCursor) {
      throw new ProductReconciliationError('product_reconciliation_progress_conflict');
    }
    const entries = productIds.map((productId) => ({ productId, product: returned.get(productId) ?? null }));
    await recordProductObservations(tx, locked.run, entries, now);
    const counts: ProductEvidenceBatchResult = await applyExactProductEvidenceBatch(
      tx,
      locked.run.storeId,
      entries,
      {
        source: 'reconciliation_exact',
        now,
        reconciliationTrigger: locked.run.trigger as ProductReconciliationTrigger,
        scheduleSlot: locked.run.scheduleSlot,
        provenance: { kind: 'catalog_coverage' },
      },
    );
    const updated = await tx.productReconciliationRun.update({
      where: { id: locked.run.id },
      data: {
        status: 'pending',
        candidateCursor: productIds[productIds.length - 1],
        verifiedCount: { increment: productIds.length },
        activeCount: { increment: counts.active_verified },
        unavailableCount: { increment: counts.unavailable_verified },
        conflictCount: { increment: counts.identity_conflict },
        snapshotCreatedCount: { increment: counts.createdSnapshots },
        snapshotUpdatedCount: { increment: counts.changedSnapshots },
        leaseOwner: null,
        leaseExpiresAt: null,
        nextRetryAt: now,
        lastErrorCode: null,
      },
    });
    return {
      result: processResult(updated, 'progress'),
      newIdentityConflicts: counts.newIdentityConflicts,
    };
  });
  reportProductIdentityConflicts(committed.newIdentityConflicts, 'reconciliation_exact');
  return committed.result;
}

async function markRunFailure(
  claimed: ClaimedRun,
  code: string,
  now: Date,
): Promise<ProductReconciliationRun | null> {
  return prisma.$transaction(async (tx) => {
    const run = await lockRun(tx, claimed.run.id);
    if (!run || TERMINAL_STATUSES.has(run.status) || run.leaseOwner !== claimed.leaseOwner) return run;
    const attempts = run.attempts + 1;
    const exhausted = attempts >= MAX_FAILURE_ATTEMPTS;
    if (exhausted) await clearRunObservations(tx, run.id);
    return tx.productReconciliationRun.update({
      where: { id: run.id },
      data: {
        status: exhausted ? 'exhausted' : 'error',
        phase: exhausted ? 'complete' : run.phase,
        attempts,
        leaseOwner: null,
        leaseExpiresAt: null,
        nextRetryAt: exhausted ? null : retryAt(now, attempts),
        lastErrorCode: code,
        finishedAt: exhausted ? now : null,
      },
    });
  });
}

export async function processProductReconciliationRun(
  runId: string,
  input: { now?: Date } = {},
): Promise<ProductReconciliationProcessResult> {
  const now = input.now ?? new Date();
  const claim = await claimProductReconciliationRun(runId, now);
  if (claim.state !== 'claimed') {
    if (claim.state === 'busy') return processResult(claim.run, 'lease', claim.run.leaseExpiresAt);
    if (claim.state === 'deferred') return processResult(claim.run, 'retry', claim.run.nextRetryAt);
    return processResult(claim.run);
  }

  try {
    const ikas: IkasClient = getIkas(AuthTokenManager.fromDatabaseRow(claim.authToken));
    if (claim.run.phase === 'scan') {
      const response = await ikas.queries.listProductsForSync({
        pagination: { limit: SCAN_PAGE_SIZE, page: claim.run.nextPage },
      });
      const payload = requireProviderPage({
        isSuccess: response.isSuccess,
        payload: response.data?.listProduct,
        expectedPage: claim.run.nextPage,
        maxItems: SCAN_PAGE_SIZE,
      });
      const committed = await commitScanPage(claim, payload, now);
      return committed;
    }

    const candidates = await loadVerificationCandidates(claim.run);
    if (candidates.length === 0) {
      const completed = await completeVerification(claim, now);
      return completed;
    }
    const productIds = candidates.map((candidate) => candidate.productId);
    const response = await ikas.queries.listProductsForSync({
      id: { in: productIds },
      pagination: { limit: VERIFY_BATCH_SIZE, page: 1 },
    });
    const payload = requireProviderPage({
      isSuccess: response.isSuccess,
      payload: response.data?.listProduct,
      expectedPage: 1,
      maxItems: VERIFY_BATCH_SIZE,
    });
    if (payload.hasNext) throw new ProductReconciliationError('product_provider_contract_invalid');
    if (payload.count !== payload.data.length) {
      throw new ProductReconciliationError('product_provider_contract_invalid');
    }
    const committed = await commitVerificationBatch(claim, productIds, payload.data, now);
    return committed;
  } catch (error) {
    const code = error instanceof ProductReconciliationError
      ? error.code
      : 'product_reconciliation_processing_failed';
    const failedRun = await markRunFailure(claim, code, now);
    if (!failedRun) throw new ProductReconciliationError(code);
    if (failedRun.status === 'exhausted') return processResult(failedRun);
    return processResult(failedRun, 'retry', failedRun.nextRetryAt);
  }
}

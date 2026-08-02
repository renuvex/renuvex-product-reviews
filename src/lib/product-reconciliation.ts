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
  type ProductEvidenceWriteCounts,
  type ProductLike,
} from '@/lib/product-snapshots';
import { dispatchProductReconciliationRun } from '@/lib/product-reconciliation-dispatcher';

const SCAN_PAGE_SIZE = 200;
const VERIFY_BATCH_SIZE = 50;
const RUN_LEASE_MS = 5 * 60 * 1000;
const MAX_FAILURE_ATTEMPTS = 8;
const RETRY_BASE_MS = 5 * 60 * 1000;
const RETRY_MAX_MS = 6 * 60 * 60 * 1000;
const INSTALLATION_DISCOVERY_PAGE_SIZE = 50;

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
};

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

async function markRunStale(
  tx: Prisma.TransactionClient,
  runId: string,
  now: Date,
): Promise<ProductReconciliationRun> {
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
  scheduleSlot?: string;
  now?: Date;
}): Promise<StartRunResult> {
  const now = input.now ?? new Date();
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
  products: ProductLike[],
  hasNext: boolean,
  now: Date,
): Promise<ProductReconciliationProcessResult> {
  return prisma.$transaction(async (tx) => {
    const locked = await lockClaimedRunForCommit(tx, claimed, now);
    if (locked.stale) return { runId: locked.run.id, status: locked.run.status, continuationRequired: false };
    if (locked.run.phase !== 'scan' || locked.run.nextPage !== claimed.run.nextPage) {
      throw new ProductReconciliationError('product_reconciliation_progress_conflict');
    }

    const entries = products.map((product) => ({
      productId: normalizeProductEvidence(product)!.productId,
      product,
    }));
    const counts = await applyExactProductEvidenceBatch(tx, locked.run.storeId, entries, {
      source: 'reconciliation_scan',
      now,
      reconciliationRunId: locked.run.id,
    });
    const reconstructedCount = hasNext
      ? 0
      : await reconstructReferencedProductSnapshots(tx, locked.run.storeId, now);
    const updated = await tx.productReconciliationRun.update({
      where: { id: locked.run.id },
      data: {
        status: 'pending',
        phase: hasNext ? 'scan' : 'verify',
        nextPage: hasNext ? locked.run.nextPage + 1 : locked.run.nextPage,
        scannedCount: { increment: entries.length },
        verifiedCount: { increment: entries.length },
        activeCount: { increment: counts.active_verified },
        unavailableCount: { increment: counts.unavailable_verified },
        conflictCount: { increment: counts.identity_conflict },
        reconstructedCount: { increment: reconstructedCount },
        leaseOwner: null,
        leaseExpiresAt: null,
        nextRetryAt: now,
        lastErrorCode: null,
      },
    });
    return { runId: updated.id, status: updated.status, continuationRequired: true };
  });
}

async function loadVerificationCandidates(run: ProductReconciliationRun) {
  return prisma.productSnapshot.findMany({
    where: {
      storeId: run.storeId,
      lifecycleState: { in: ['unknown', 'active_verified'] },
      productId: run.candidateCursor ? { gt: run.candidateCursor } : undefined,
      OR: [
        { lastSeenReconciliationRunId: null },
        { lastSeenReconciliationRunId: { not: run.id } },
      ],
    },
    orderBy: { productId: 'asc' },
    take: VERIFY_BATCH_SIZE,
    select: { productId: true },
  });
}

async function completeVerification(
  claimed: ClaimedRun,
  now: Date,
): Promise<ProductReconciliationProcessResult> {
  return prisma.$transaction(async (tx) => {
    const locked = await lockClaimedRunForCommit(tx, claimed, now);
    if (locked.stale) return { runId: locked.run.id, status: locked.run.status, continuationRequired: false };
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
    return { runId: updated.id, status: updated.status, continuationRequired: false };
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

  return prisma.$transaction(async (tx) => {
    const locked = await lockClaimedRunForCommit(tx, claimed, now);
    if (locked.stale) return { runId: locked.run.id, status: locked.run.status, continuationRequired: false };
    if (locked.run.phase !== 'verify' || locked.run.candidateCursor !== claimed.run.candidateCursor) {
      throw new ProductReconciliationError('product_reconciliation_progress_conflict');
    }
    const counts: ProductEvidenceWriteCounts = await applyExactProductEvidenceBatch(
      tx,
      locked.run.storeId,
      productIds.map((productId) => ({ productId, product: returned.get(productId) ?? null })),
      {
        source: 'reconciliation_exact',
        now,
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
        leaseOwner: null,
        leaseExpiresAt: null,
        nextRetryAt: now,
        lastErrorCode: null,
      },
    });
    return { runId: updated.id, status: updated.status, continuationRequired: true };
  });
}

async function markRunFailure(
  claimed: ClaimedRun,
  code: string,
  now: Date,
): Promise<void> {
  await prisma.$transaction(async (tx) => {
    const run = await lockRun(tx, claimed.run.id);
    if (!run || TERMINAL_STATUSES.has(run.status) || run.leaseOwner !== claimed.leaseOwner) return;
    const attempts = run.attempts + 1;
    const exhausted = attempts >= MAX_FAILURE_ATTEMPTS;
    await tx.productReconciliationRun.update({
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
    return {
      runId,
      status: claim.run.status,
      continuationRequired: false,
    };
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
      return commitScanPage(claim, payload.data, payload.hasNext, now);
    }

    const candidates = await loadVerificationCandidates(claim.run);
    if (candidates.length === 0) return completeVerification(claim, now);
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
    return commitVerificationBatch(claim, productIds, payload.data, now);
  } catch (error) {
    const code = error instanceof ProductReconciliationError
      ? error.code
      : 'product_reconciliation_processing_failed';
    await markRunFailure(claim, code, now);
    throw error instanceof ProductReconciliationError
      ? error
      : new ProductReconciliationError(code);
  }
}

async function activeInstallationPage(cursor: string | null) {
  return prisma.ikasStoreInstallation.findMany({
    where: {
      status: 'active',
      storeId: cursor ? { gt: cursor } : undefined,
    },
    orderBy: { storeId: 'asc' },
    take: INSTALLATION_DISCOVERY_PAGE_SIZE,
    select: {
      storeId: true,
      authorizedAppId: true,
      generation: true,
      stateVersion: true,
    },
  });
}

export async function runProductReconciliationMaintenance(
  input: { now?: Date; redispatchLimit?: number } = {},
): Promise<{ created: number; dispatched: number; dispatchFailed: number; redispatched: number }> {
  const now = input.now ?? new Date();
  const redispatchLimit = Math.min(Math.max(input.redispatchLimit ?? 50, 1), 100);
  const dueRuns = await prisma.productReconciliationRun.findMany({
    where: {
      status: { in: [...NONTERMINAL_STATUSES] },
      OR: [
        { status: 'pending' },
        { status: 'error', nextRetryAt: { lte: now } },
        { status: { in: ['scanning', 'verifying'] }, leaseExpiresAt: { lte: now } },
      ],
    },
    orderBy: { updatedAt: 'asc' },
    take: redispatchLimit,
    select: { id: true },
  });

  let redispatched = 0;
  let dispatchFailed = 0;
  for (const run of dueRuns) {
    if (await dispatchProductReconciliationRun(run.id)) redispatched += 1;
    else dispatchFailed += 1;
  }

  const scheduleSlot = now.toISOString().slice(0, 10);
  let cursor: string | null = null;
  let created = 0;
  let dispatched = 0;
  while (true) {
    const installations = await activeInstallationPage(cursor);
    for (const installation of installations) {
      const result = await startProductReconciliationRun({
        storeId: installation.storeId,
        fence: {
          authorizedAppId: installation.authorizedAppId,
          generation: installation.generation,
          stateVersion: installation.stateVersion,
        },
        trigger: 'daily',
        scheduleSlot,
        now,
      });
      if (result.created) created += 1;
      if (result.created && await dispatchProductReconciliationRun(result.run.id)) dispatched += 1;
      else if (result.created) dispatchFailed += 1;
    }
    if (installations.length < INSTALLATION_DISCOVERY_PAGE_SIZE) break;
    cursor = installations[installations.length - 1].storeId;
  }

  return { created, dispatched, dispatchFailed, redispatched };
}

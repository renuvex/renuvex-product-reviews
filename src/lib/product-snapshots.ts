import { getRedirectUri } from '@/helpers/api-helpers';
import * as Sentry from '@sentry/nextjs';
import { prisma } from '@/lib/prisma';
import type { ikasAdminGraphQLAPIClient, SaveProductWebhooksMutationData } from '@/lib/ikas-client/generated/graphql';
import type { AuthToken } from '@/models/auth-token';
import { Prisma } from '@prisma/client';
import {
  requireActiveIkasStoreInstallationFence,
  type IkasInstallationFence,
} from '@/lib/ikas-installation-lifecycle';
import {
  decideProductLifecycleWrite,
  type CurrentProductEvidence,
  type NormalizedProductEvidence,
  type ProductLifecycleState,
} from '@/lib/product-lifecycle';

export const PRODUCT_WEBHOOK_SCOPES = ['store/product/created', 'store/product/updated'] as const;

type IkasClient = ikasAdminGraphQLAPIClient<AuthToken>;
export type ProductLike = {
  id?: unknown;
  _id?: unknown;
  productId?: unknown;
  name?: unknown;
  createdAt?: unknown;
  deleted?: unknown;
  updatedAt?: unknown;
  metaData?: { slug?: unknown } | null;
  slug?: unknown;
  product?: ProductLike;
};

function asString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function timestampToDate(value: unknown): Date | null {
  if (value === undefined || value === null) return null;

  const numeric = typeof value === 'number' ? value : Number(value);
  if (Number.isFinite(numeric) && numeric > 0) {
    return new Date(numeric);
  }

  const parsed = new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function getProductIdFromWebhookData(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;
  const product = data as ProductLike;

  return (
    asString(product.id) ||
    asString(product.productId) ||
    asString(product._id) ||
    getProductIdFromWebhookData(product.product)
  );
}

export function normalizeProductEvidence(product: ProductLike): NormalizedProductEvidence | null {
  const productId = asString(product.id) || asString(product.productId) || asString(product._id);
  if (!productId) return null;

  return {
    productId,
    slug: asString(product.slug) || asString(product.metaData?.slug),
    name: asString(product.name),
    providerCreatedAt: timestampToDate(product.createdAt),
    ikasUpdatedAt: timestampToDate(product.updatedAt),
    deleted: product.deleted === true,
  };
}

export type ProductEvidenceWriteCounts = Record<ProductLifecycleState, number>;

export type ProductEvidenceBatchResult = ProductEvidenceWriteCounts & {
  changedSnapshots: number;
  createdSnapshots: number;
  newIdentityConflicts: number;
};

function emptyWriteCounts(): ProductEvidenceWriteCounts {
  return {
    unknown: 0,
    active_verified: 0,
    unavailable_verified: 0,
    identity_conflict: 0,
  };
}

type SnapshotEvidenceRow = CurrentProductEvidence & {
  productId: string;
  lastEvidenceSource: string | null;
  lastSeenReconciliationRunId: string | null;
  lastSyncedAt: Date;
};

type MaterializedSnapshotWrite = Omit<SnapshotEvidenceRow, 'productId' | 'lifecycleState'> & {
  lifecycleState: ProductLifecycleState;
};

function materializeSnapshotWrite(
  current: SnapshotEvidenceRow | null,
  evidence: NormalizedProductEvidence | null,
  write: ReturnType<typeof decideProductLifecycleWrite>,
): MaterializedSnapshotWrite {
  return {
    lifecycleState: write.lifecycleState,
    slug: write.slug !== undefined ? write.slug : current?.slug ?? evidence?.slug ?? null,
    name: write.name !== undefined ? write.name : current?.name ?? evidence?.name ?? null,
    providerCreatedAt: write.providerCreatedAt !== undefined
      ? write.providerCreatedAt
      : current?.providerCreatedAt ?? evidence?.providerCreatedAt ?? null,
    ikasUpdatedAt: write.ikasUpdatedAt !== undefined
      ? write.ikasUpdatedAt
      : current?.ikasUpdatedAt ?? evidence?.ikasUpdatedAt ?? null,
    lastVerifiedAt: write.lastVerifiedAt,
    unavailableAt: write.unavailableAt !== undefined ? write.unavailableAt : current?.unavailableAt ?? null,
    conflictDetectedAt: write.conflictDetectedAt !== undefined
      ? write.conflictDetectedAt
      : current?.conflictDetectedAt ?? null,
    absenceFirstObservedAt: write.absenceFirstObservedAt,
    absenceLastObservedAt: write.absenceLastObservedAt,
    absenceObservationCount: write.absenceObservationCount,
    absenceLastScheduleSlot: write.absenceLastScheduleSlot,
    lastEvidenceSource: write.lastEvidenceSource,
    lastSeenReconciliationRunId: write.lastSeenReconciliationRunId !== undefined
      ? write.lastSeenReconciliationRunId
      : current?.lastSeenReconciliationRunId ?? null,
    lastSyncedAt: write.lastSyncedAt,
  };
}

function sameNullableDate(left: Date | null, right: Date | null): boolean {
  return left?.getTime() === right?.getTime();
}

function hasSemanticSnapshotChange(
  current: SnapshotEvidenceRow,
  target: MaterializedSnapshotWrite,
): boolean {
  return current.lifecycleState !== target.lifecycleState ||
    current.slug !== target.slug ||
    current.name !== target.name ||
    !sameNullableDate(current.providerCreatedAt, target.providerCreatedAt) ||
    !sameNullableDate(current.ikasUpdatedAt, target.ikasUpdatedAt) ||
    !sameNullableDate(current.unavailableAt, target.unavailableAt) ||
    !sameNullableDate(current.conflictDetectedAt, target.conflictDetectedAt) ||
    !sameNullableDate(current.absenceFirstObservedAt, target.absenceFirstObservedAt) ||
    !sameNullableDate(current.absenceLastObservedAt, target.absenceLastObservedAt) ||
    current.absenceObservationCount !== target.absenceObservationCount ||
    current.absenceLastScheduleSlot !== target.absenceLastScheduleSlot;
}

async function updateSnapshotsSetBased(
  tx: Prisma.TransactionClient,
  storeId: string,
  rows: Array<{ productId: string; target: MaterializedSnapshotWrite }>,
  now: Date,
): Promise<void> {
  if (rows.length === 0) return;
  const values = rows.map(({ productId, target }) => Prisma.sql`(
    CAST(${productId} AS text),
    CAST(${target.lifecycleState} AS text),
    CAST(${target.slug} AS text),
    CAST(${target.name} AS text),
    CAST(${target.providerCreatedAt} AS timestamp(3)),
    CAST(${target.ikasUpdatedAt} AS timestamp(3)),
    CAST(${target.lastVerifiedAt} AS timestamp(3)),
    CAST(${target.unavailableAt} AS timestamp(3)),
    CAST(${target.conflictDetectedAt} AS timestamp(3)),
    CAST(${target.absenceFirstObservedAt} AS timestamp(3)),
    CAST(${target.absenceLastObservedAt} AS timestamp(3)),
    CAST(${target.absenceObservationCount} AS integer),
    CAST(${target.absenceLastScheduleSlot} AS text),
    CAST(${target.lastEvidenceSource} AS text),
    CAST(${target.lastSeenReconciliationRunId} AS text),
    CAST(${target.lastSyncedAt} AS timestamp(3))
  )`);
  await tx.$executeRaw(Prisma.sql`
    UPDATE "ProductSnapshot" AS snapshot
    SET
      "lifecycleState" = evidence."lifecycleState",
      "slug" = evidence."slug",
      "name" = evidence."name",
      "providerCreatedAt" = evidence."providerCreatedAt",
      "ikasUpdatedAt" = evidence."ikasUpdatedAt",
      "lastVerifiedAt" = evidence."lastVerifiedAt",
      "unavailableAt" = evidence."unavailableAt",
      "conflictDetectedAt" = evidence."conflictDetectedAt",
      "absenceFirstObservedAt" = evidence."absenceFirstObservedAt",
      "absenceLastObservedAt" = evidence."absenceLastObservedAt",
      "absenceObservationCount" = evidence."absenceObservationCount",
      "absenceLastScheduleSlot" = evidence."absenceLastScheduleSlot",
      "lastEvidenceSource" = evidence."lastEvidenceSource",
      "lastSeenReconciliationRunId" = evidence."lastSeenReconciliationRunId",
      "lastSyncedAt" = evidence."lastSyncedAt",
      "updatedAt" = ${now}
    FROM (VALUES ${Prisma.join(values)}) AS evidence(
      "productId",
      "lifecycleState",
      "slug",
      "name",
      "providerCreatedAt",
      "ikasUpdatedAt",
      "lastVerifiedAt",
      "unavailableAt",
      "conflictDetectedAt",
      "absenceFirstObservedAt",
      "absenceLastObservedAt",
      "absenceObservationCount",
      "absenceLastScheduleSlot",
      "lastEvidenceSource",
      "lastSeenReconciliationRunId",
      "lastSyncedAt"
    )
    WHERE snapshot."storeId" = ${storeId}
      AND snapshot."productId" = evidence."productId"
  `);
}

export function reportProductIdentityConflicts(count: number, source: string): void {
  if (count <= 0) return;
  try {
    Sentry.captureException(new Error('product_identity_conflict_detected'), {
      tags: { source: 'product-lifecycle', operation: source },
      extra: { count },
    });
  } catch {
    // Observability must not alter evidence commits.
  }
}

export async function applyExactProductEvidenceBatch(
  tx: Prisma.TransactionClient,
  storeId: string,
  entries: Array<{ productId: string; product: ProductLike | null }>,
  input: {
    source: string;
    now?: Date;
    reconciliationRunId?: string;
    reconciliationTrigger?: 'install' | 'daily' | 'manual';
    scheduleSlot?: string | null;
    freshnessMode?: 'snapshot' | 'coverage';
  },
): Promise<ProductEvidenceBatchResult> {
  const productIds = entries.map((entry) => entry.productId);
  if (new Set(productIds).size !== productIds.length) throw new Error('duplicate_product_evidence_id');

  const currentRows = await tx.productSnapshot.findMany({
    where: { storeId, productId: { in: productIds } },
    select: {
      productId: true,
      lifecycleState: true,
      slug: true,
      name: true,
      providerCreatedAt: true,
      ikasUpdatedAt: true,
      lastVerifiedAt: true,
      unavailableAt: true,
      conflictDetectedAt: true,
      absenceFirstObservedAt: true,
      absenceLastObservedAt: true,
      absenceObservationCount: true,
      absenceLastScheduleSlot: true,
      lastEvidenceSource: true,
      lastSeenReconciliationRunId: true,
      lastSyncedAt: true,
    },
  });
  const currentByProductId = new Map<string, SnapshotEvidenceRow>(
    currentRows.map((row) => [row.productId, row]),
  );
  const counts = emptyWriteCounts();
  const now = input.now ?? new Date();
  const updates: Array<{ productId: string; target: MaterializedSnapshotWrite }> = [];
  const creates: Prisma.ProductSnapshotCreateManyInput[] = [];
  let newIdentityConflicts = 0;

  for (const entry of entries) {
    const evidence = entry.product ? normalizeProductEvidence(entry.product) : null;
    if (entry.product && !evidence) throw new Error('provider_product_id_missing');
    if (evidence && evidence.productId !== entry.productId) throw new Error('provider_product_id_mismatch');
    const current = currentByProductId.get(entry.productId) ?? null;
    const write = decideProductLifecycleWrite({
      current,
      evidence,
      productId: entry.productId,
      source: input.source,
      now,
      reconciliationRunId: input.reconciliationRunId,
      reconciliationTrigger: input.reconciliationTrigger,
      scheduleSlot: input.scheduleSlot,
    });
    const target = materializeSnapshotWrite(current, evidence, write);
    if (target.lifecycleState === 'identity_conflict' && current?.lifecycleState !== 'identity_conflict') {
      newIdentityConflicts += 1;
    }
    if (current) {
      const shouldUpdate = input.freshnessMode !== 'coverage' || hasSemanticSnapshotChange(current, target);
      if (shouldUpdate) updates.push({ productId: entry.productId, target });
    } else {
      creates.push({
        storeId,
        productId: entry.productId,
        ...target,
      });
    }
    counts[target.lifecycleState] += 1;
  }

  await updateSnapshotsSetBased(tx, storeId, updates, now);
  if (creates.length > 0) await tx.productSnapshot.createMany({ data: creates });

  return {
    ...counts,
    changedSnapshots: updates.length,
    createdSnapshots: creates.length,
    newIdentityConflicts,
  };
}

export async function applyExactProductEvidence(
  tx: Prisma.TransactionClient,
  storeId: string,
  productId: string,
  product: ProductLike | null,
  input: {
    source: string;
    now?: Date;
    reconciliationRunId?: string;
    reconciliationTrigger?: 'install' | 'daily' | 'manual';
    scheduleSlot?: string | null;
    freshnessMode?: 'snapshot' | 'coverage';
  },
) {
  return applyExactProductEvidenceBatch(tx, storeId, [{ productId, product }], input);
}

export async function syncSingleProductForStore(
  ikas: IkasClient,
  storeId: string,
  productId: string,
  installationFence?: IkasInstallationFence,
) {
  const response = await ikas.queries.listProductsForSync({
    id: { eq: productId },
    pagination: { limit: 1, page: 1 },
  });
  const payload = response.data?.listProduct;
  const products = payload && Array.isArray(payload.data) ? payload.data : null;

  if (
    !response.isSuccess ||
    !payload ||
    !Number.isInteger(payload.count) ||
    payload.count < 0 ||
    payload.count > 1 ||
    payload.page !== 1 ||
    payload.limit !== 1 ||
    payload.hasNext !== false ||
    !products ||
    products.length !== payload.count
  ) {
    throw new Error('Failed to verify ikas product snapshot');
  }
  const unexpected = products.some((product) => product.id !== productId);
  if (unexpected || products.length > 1) throw new Error('Unexpected ikas product verification response');
  const product = products[0] ?? null;

  const result = await prisma.$transaction(async (tx) => {
    if (installationFence) {
      await requireActiveIkasStoreInstallationFence(tx, storeId, installationFence);
    }
    return applyExactProductEvidence(tx, storeId, productId, product, {
      source: 'webhook_exact',
    });
  });
  reportProductIdentityConflicts(result.newIdentityConflicts, 'webhook_exact');
  return result;
}

export function buildProductWebhookEndpoint(host: string) {
  return new URL('/api/webhooks/ikas/products', getRedirectUri(host)).toString();
}

export async function registerProductWebhooks(ikas: IkasClient, endpoint: string): Promise<SaveProductWebhooksMutationData> {
  const response = await ikas.mutations.saveProductWebhooks({
    input: {
      endpoint,
      scopes: [...PRODUCT_WEBHOOK_SCOPES],
    },
  });

  if (!response.isSuccess || !response.data?.saveWebhooks) {
    throw new Error('Failed to register ikas product webhooks');
  }

  return response.data.saveWebhooks;
}

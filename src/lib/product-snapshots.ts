import { getRedirectUri } from '@/helpers/api-helpers';
import { prisma } from '@/lib/prisma';
import type { ikasAdminGraphQLAPIClient, SaveProductWebhooksMutationData } from '@/lib/ikas-client/generated/graphql';
import type { AuthToken } from '@/models/auth-token';
import type { Prisma } from '@prisma/client';
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

function emptyWriteCounts(): ProductEvidenceWriteCounts {
  return {
    unknown: 0,
    active_verified: 0,
    unavailable_verified: 0,
    identity_conflict: 0,
  };
}

export async function applyExactProductEvidenceBatch(
  tx: Prisma.TransactionClient,
  storeId: string,
  entries: Array<{ productId: string; product: ProductLike | null }>,
  input: {
    source: string;
    now?: Date;
    reconciliationRunId?: string;
  },
): Promise<ProductEvidenceWriteCounts> {
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
      unavailableAt: true,
      conflictDetectedAt: true,
    },
  });
  const currentByProductId = new Map<string, CurrentProductEvidence>(
    currentRows.map((row) => [row.productId, row]),
  );
  const counts = emptyWriteCounts();
  const now = input.now ?? new Date();

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
    });

    if (current) {
      await tx.productSnapshot.update({
        where: { storeId_productId: { storeId, productId: entry.productId } },
        data: write,
      });
    } else {
      await tx.productSnapshot.create({
        data: {
          storeId,
          productId: entry.productId,
          slug: evidence?.slug ?? null,
          name: evidence?.name ?? null,
          ...write,
        },
      });
    }
    counts[write.lifecycleState] += 1;
  }

  return counts;
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

  return prisma.$transaction(async (tx) => {
    if (installationFence) {
      await requireActiveIkasStoreInstallationFence(tx, storeId, installationFence);
    }
    return applyExactProductEvidence(tx, storeId, productId, product, {
      source: 'webhook_exact',
    });
  });
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

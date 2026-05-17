import { getRedirectUri } from '@/helpers/api-helpers';
import { prisma } from '@/lib/prisma';
import type { ikasAdminGraphQLAPIClient, ListProductsForSyncQueryData, SaveProductWebhooksMutationData } from '@/lib/ikas-client/generated/graphql';
import type { AuthToken } from '@/models/auth-token';

export const PRODUCT_WEBHOOK_SCOPES = ['store/product/created', 'store/product/updated'] as const;

type IkasClient = ikasAdminGraphQLAPIClient<AuthToken>;
type IkasProductForSync = ListProductsForSyncQueryData['data'][number];
export type ProductLike = {
  id?: unknown;
  _id?: unknown;
  productId?: unknown;
  name?: unknown;
  updatedAt?: unknown;
  metaData?: { slug?: unknown } | null;
  slug?: unknown;
  product?: ProductLike;
};

export type ProductSyncResult = {
  synced: number;
  pages: number;
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

function normalizeProduct(product: ProductLike) {
  const productId = asString(product.id) || asString(product.productId) || asString(product._id);
  if (!productId) return null;

  return {
    productId,
    slug: asString(product.slug) || asString(product.metaData?.slug),
    name: asString(product.name),
    ikasUpdatedAt: timestampToDate(product.updatedAt),
  };
}

export async function upsertProductSnapshot(storeId: string, product: ProductLike) {
  const normalized = normalizeProduct(product);
  if (!normalized) return null;

  return prisma.productSnapshot.upsert({
    where: { storeId_productId: { storeId, productId: normalized.productId } },
    update: {
      slug: normalized.slug,
      name: normalized.name,
      ikasUpdatedAt: normalized.ikasUpdatedAt,
      lastSyncedAt: new Date(),
    },
    create: {
      storeId,
      productId: normalized.productId,
      slug: normalized.slug,
      name: normalized.name,
      ikasUpdatedAt: normalized.ikasUpdatedAt,
      lastSyncedAt: new Date(),
    },
  });
}

async function upsertProductSnapshotBatch(storeId: string, products: IkasProductForSync[]) {
  if (products.length === 0) return 0;

  await prisma.$transaction(
    products.map((product) => {
      const normalized = normalizeProduct(product);
      if (!normalized) {
        throw new Error('listProduct returned a product without id');
      }

      return prisma.productSnapshot.upsert({
        where: { storeId_productId: { storeId, productId: normalized.productId } },
        update: {
          slug: normalized.slug,
          name: normalized.name,
          ikasUpdatedAt: normalized.ikasUpdatedAt,
          lastSyncedAt: new Date(),
        },
        create: {
          storeId,
          productId: normalized.productId,
          slug: normalized.slug,
          name: normalized.name,
          ikasUpdatedAt: normalized.ikasUpdatedAt,
          lastSyncedAt: new Date(),
        },
      });
    }),
  );

  return products.length;
}

export async function syncAllProductsForStore(ikas: IkasClient, storeId: string): Promise<ProductSyncResult> {
  const limit = 200;
  let page = 1;
  let synced = 0;
  let pages = 0;

  while (true) {
    const response = await ikas.queries.listProductsForSync({ pagination: { limit, page } });
    const payload = response.data?.listProduct;

    if (!response.isSuccess || !payload) {
      throw new Error('Failed to list ikas products for snapshot sync');
    }

    synced += await upsertProductSnapshotBatch(storeId, payload.data || []);
    pages += 1;

    if (!payload.hasNext) break;
    page += 1;
  }

  return { synced, pages };
}

export async function syncSingleProductForStore(ikas: IkasClient, storeId: string, productId: string, fallbackProduct?: ProductLike) {
  const response = await ikas.queries.listProductsForSync({
    id: { eq: productId },
    pagination: { limit: 1, page: 1 },
  });
  const product = response.data?.listProduct?.data?.[0];

  if (response.isSuccess && product) {
    return upsertProductSnapshot(storeId, product);
  }

  if (fallbackProduct) {
    return upsertProductSnapshot(storeId, fallbackProduct);
  }

  throw new Error('Failed to sync ikas product snapshot');
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

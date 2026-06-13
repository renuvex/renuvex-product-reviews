import { prisma } from '@/lib/prisma';
import { isVideoReviewsGloballyEnabled } from '@/lib/media/config';

export type VideoFeatureAccess = {
  enabled: boolean;
  reason: 'enabled' | 'global_disabled' | 'merchant_disabled' | 'quota_disabled' | 'store_missing';
  monthlyLimit: number;
};

export async function getVideoFeatureAccess(storeId: string): Promise<VideoFeatureAccess> {
  if (!isVideoReviewsGloballyEnabled()) return { enabled: false, reason: 'global_disabled', monthlyLimit: 0 };
  const [store, widget] = await Promise.all([
    prisma.storeSettings.findUnique({ where: { storeId }, select: { videoMonthlyLimit: true } }),
    prisma.widgetSettings.findUnique({ where: { storeId_widgetId: { storeId, widgetId: 'reviews' } }, select: { settings: true } }),
  ]);
  if (!store) return { enabled: false, reason: 'store_missing', monthlyLimit: 0 };
  const settings = (widget?.settings ?? {}) as Record<string, unknown>;
  if (settings.videoReviewsEnabled !== true) return { enabled: false, reason: 'merchant_disabled', monthlyLimit: store.videoMonthlyLimit };
  if (store.videoMonthlyLimit <= 0) return { enabled: false, reason: 'quota_disabled', monthlyLimit: store.videoMonthlyLimit };
  return { enabled: true, reason: 'enabled', monthlyLimit: store.videoMonthlyLimit };
}

export async function verifyVideoReviewTarget(storeId: string, productId: string) {
  const [store, product] = await Promise.all([
    prisma.storeSettings.findUnique({ where: { storeId }, select: { storeId: true } }),
    prisma.productSnapshot.findUnique({
      where: { storeId_productId: { storeId, productId } },
      select: { productId: true, slug: true, name: true },
    }),
  ]);
  return store && product ? product : null;
}

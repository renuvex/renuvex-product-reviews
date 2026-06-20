import { prisma } from '@/lib/prisma';
import {
  getMediaJobEndpoint,
  getMuxApiConfig,
  getMuxVideoQuality,
  getQStashMediaConfig,
  isVideoReviewsGloballyEnabled,
  MediaConfigError,
} from '@/lib/media/config';
import { utcMonthStart } from '@/lib/media/video-policy';

export type VideoFeatureAccessReason =
  | 'enabled'
  | 'global_disabled'
  | 'merchant_disabled'
  | 'quota_disabled'
  | 'quota_exceeded'
  | 'provider_unavailable'
  | 'store_missing';

export type VideoFeatureAccess = {
  enabled: boolean;
  reason: VideoFeatureAccessReason;
  monthlyLimit: number;
  reservedCount: number;
  consumedCount: number;
  usedCount: number;
  remainingCount: number;
};

type VideoFeatureAccessInput = {
  globalEnabled: boolean;
  storeExists: boolean;
  merchantEnabled: boolean;
  monthlyLimit: number;
  reservedCount: number;
  consumedCount: number;
  providerConfigured: boolean;
};

function count(value: number): number {
  return Number.isInteger(value) && value > 0 ? value : 0;
}

export function resolveVideoFeatureAccess(input: VideoFeatureAccessInput): VideoFeatureAccess {
  const monthlyLimit = count(input.monthlyLimit);
  const reservedCount = count(input.reservedCount);
  const consumedCount = count(input.consumedCount);
  const usedCount = reservedCount + consumedCount;
  const remainingCount = Math.max(0, monthlyLimit - usedCount);
  const result = (enabled: boolean, reason: VideoFeatureAccessReason): VideoFeatureAccess => ({
    enabled,
    reason,
    monthlyLimit,
    reservedCount,
    consumedCount,
    usedCount,
    remainingCount,
  });

  if (!input.storeExists) return result(false, 'store_missing');
  if (!input.globalEnabled) return result(false, 'global_disabled');
  if (!input.merchantEnabled) return result(false, 'merchant_disabled');
  if (monthlyLimit <= 0) return result(false, 'quota_disabled');
  if (usedCount >= monthlyLimit) return result(false, 'quota_exceeded');
  if (!input.providerConfigured) return result(false, 'provider_unavailable');
  return result(true, 'enabled');
}

export function hasVideoProviderConfiguration(): boolean {
  try {
    getMuxApiConfig();
    getMuxVideoQuality();
    getQStashMediaConfig();
    getMediaJobEndpoint();
    return true;
  } catch (error) {
    if (error instanceof MediaConfigError) return false;
    throw error;
  }
}

export async function getVideoFeatureAccess(storeId: string, now = new Date()): Promise<VideoFeatureAccess> {
  const month = utcMonthStart(now);
  const [store, widget, usage] = await Promise.all([
    prisma.storeSettings.findUnique({ where: { storeId }, select: { videoMonthlyLimit: true } }),
    prisma.widgetSettings.findUnique({ where: { storeId_widgetId: { storeId, widgetId: 'reviews' } }, select: { settings: true } }),
    prisma.storeVideoUsage.findUnique({
      where: { storeId_month: { storeId, month } },
      select: { reservedCount: true, consumedCount: true },
    }),
  ]);
  const settings = (widget?.settings ?? {}) as Record<string, unknown>;
  const preliminary = resolveVideoFeatureAccess({
    globalEnabled: isVideoReviewsGloballyEnabled(),
    storeExists: Boolean(store),
    merchantEnabled: settings.videoReviewsEnabled === true,
    monthlyLimit: store?.videoMonthlyLimit ?? 0,
    reservedCount: usage?.reservedCount ?? 0,
    consumedCount: usage?.consumedCount ?? 0,
    providerConfigured: true,
  });

  if (!preliminary.enabled) return preliminary;

  return resolveVideoFeatureAccess({
    globalEnabled: true,
    storeExists: true,
    merchantEnabled: true,
    monthlyLimit: preliminary.monthlyLimit,
    reservedCount: preliminary.reservedCount,
    consumedCount: preliminary.consumedCount,
    providerConfigured: hasVideoProviderConfiguration(),
  });
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

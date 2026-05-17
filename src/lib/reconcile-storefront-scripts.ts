import { AuthTokenManager } from '@/models/auth-token/manager';
import { ensureStorefrontScriptsForToken } from '@/lib/storefront-scripts';

export type StorefrontScriptsReconcileMerchant = {
  merchantId: string;
  success: number;
  failed: number;
  skipped: number;
  total: number;
  error?: string;
};

export type StorefrontScriptsReconcileSummary = {
  merchants: number;
  failed: number;
  results: StorefrontScriptsReconcileMerchant[];
};

export async function reconcileStorefrontScripts(): Promise<StorefrontScriptsReconcileSummary> {
  const tokens = await AuthTokenManager.list();
  const merchants: StorefrontScriptsReconcileMerchant[] = [];

  for (const token of tokens) {
    try {
      const summary = await ensureStorefrontScriptsForToken(token, 'cron');
      merchants.push({
        merchantId: token.merchantId,
        success: summary.success,
        failed: summary.failed,
        skipped: summary.skipped,
        total: summary.total,
      });
    } catch (error) {
      merchants.push({
        merchantId: token.merchantId,
        success: 0,
        failed: 1,
        skipped: 0,
        total: 0,
        error: error instanceof Error ? error.message : 'unknown',
      });
    }
  }

  const failed = merchants.reduce((sum, item) => sum + item.failed, 0);
  return {
    merchants: merchants.length,
    failed,
    results: merchants,
  };
}

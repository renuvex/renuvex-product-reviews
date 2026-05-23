import { Prisma } from '@prisma/client';
import { getIkas } from '@/helpers/api-helpers';
import { prisma } from '@/lib/prisma';
import {
  buildStorefrontThemeState,
  hasStorefrontThemeStateChanged,
  isPendingStorefrontThemeDue,
  parseStorefrontThemeState,
  resolveStorefrontThemeMetadata,
  type StorefrontThemeMetadata,
  type StorefrontThemeState,
  type StorefrontThemeSyncReason,
} from '@/lib/storefront-theme';
import type { ikasAdminGraphQLAPIClient } from '@/lib/ikas-client/generated/graphql';
import type { AuthToken } from '@/models/auth-token';
import { AuthTokenManager } from '@/models/auth-token/manager';

type IkasClient = ikasAdminGraphQLAPIClient<AuthToken>;

export type StorefrontThemeSyncAction = 'updated' | 'unchanged' | 'checked' | 'pending' | 'verified';

export type StorefrontThemeSyncOptions = {
  reason: StorefrontThemeSyncReason;
  promotePending?: boolean;
  persistUnchangedCheck?: boolean;
  now?: Date;
};

export type StorefrontThemeSyncResult = {
  storeId: string;
  action: StorefrontThemeSyncAction;
  syncStatus: StorefrontThemeState['syncStatus'];
  persisted: boolean;
  stable: StorefrontThemeMetadata | null;
  pending: StorefrontThemeMetadata | null;
  lastCheckedAt: string;
  verificationDueAt: string | null;
};

export type StorefrontThemeReconcileMerchant = {
  merchantId: string;
  action?: StorefrontThemeSyncAction | 'skipped_not_due' | 'skipped_no_token';
  syncStatus?: StorefrontThemeState['syncStatus'];
  verificationDueAt?: string | null;
  error?: string;
};

export type StorefrontThemeReconcileSummary = {
  checked: number;
  pendingVerified: number;
  pendingQueued: number;
  failed: number;
  skipped: number;
  results: StorefrontThemeReconcileMerchant[];
};

type StoreSettingsThemeCandidate = {
  storeId: string;
  storefrontTheme: Prisma.JsonValue | null;
};

const DEFAULT_THEME_RECONCILE_LIMIT = 100;
const DEFAULT_PENDING_SCAN_LIMIT = 500;
const DEFAULT_THEME_RECONCILE_CONCURRENCY = 5;

function toJsonInput(state: StorefrontThemeState) {
  return state as unknown as Prisma.InputJsonValue;
}

function getSyncAction(previousValue: unknown, nextState: StorefrontThemeState, changed: boolean, persisted: boolean): StorefrontThemeSyncAction {
  const previousState = parseStorefrontThemeState(previousValue);

  if (!changed) return persisted ? 'checked' : 'unchanged';
  if (nextState.syncStatus === 'pending_verification') return 'pending';
  if (previousState?.syncStatus === 'pending_verification') return 'verified';
  return 'updated';
}

function summarizeThemeReconcile(results: StorefrontThemeReconcileMerchant[]): StorefrontThemeReconcileSummary {
  return {
    checked: results.filter((result) => result.action === 'checked' || result.action === 'unchanged' || result.action === 'updated').length,
    pendingVerified: results.filter((result) => result.action === 'verified').length,
    pendingQueued: results.filter((result) => result.action === 'pending').length,
    failed: results.filter((result) => Boolean(result.error)).length,
    skipped: results.filter((result) => result.action === 'skipped_not_due' || result.action === 'skipped_no_token').length,
    results,
  };
}

async function readStorefrontThemeMetadata(ikas: IkasClient, now: Date) {
  const response = await ikas.queries.listStorefront();
  const storefronts = response.data?.listStorefront ?? [];

  if (!response.isSuccess || storefronts.length === 0) {
    throw new Error('Storefront list could not be fetched');
  }

  return resolveStorefrontThemeMetadata(storefronts, now.toISOString());
}

export async function syncStorefrontTheme(
  ikas: IkasClient,
  storeId: string,
  options: StorefrontThemeSyncOptions,
): Promise<StorefrontThemeSyncResult> {
  const now = options.now || new Date();
  const observedMetadata = await readStorefrontThemeMetadata(ikas, now);
  const settings = await prisma.storeSettings.upsert({
    where: { storeId },
    update: {},
    create: { storeId },
  });

  const nextState = buildStorefrontThemeState(settings.storefrontTheme, observedMetadata, {
    now,
    reason: options.reason,
    promotePending: options.promotePending,
  });
  const changed = hasStorefrontThemeStateChanged(settings.storefrontTheme, nextState);
  const shouldPersist = changed || options.persistUnchangedCheck === true;

  if (shouldPersist) {
    await prisma.storeSettings.update({
      where: { storeId },
      data: { storefrontTheme: toJsonInput(nextState) },
    });
  }

  return {
    storeId,
    action: getSyncAction(settings.storefrontTheme, nextState, changed, shouldPersist),
    syncStatus: nextState.syncStatus,
    persisted: shouldPersist,
    stable: nextState.stable,
    pending: nextState.pending,
    lastCheckedAt: nextState.lastCheckedAt,
    verificationDueAt: nextState.verificationDueAt,
  };
}

export function syncStorefrontThemeForToken(token: AuthToken, options: StorefrontThemeSyncOptions) {
  return syncStorefrontTheme(getIkas(token), token.merchantId, options);
}

async function getPendingThemeCandidates(limit: number): Promise<StoreSettingsThemeCandidate[]> {
  try {
    return await prisma.storeSettings.findMany({
      where: {
        storefrontTheme: {
          path: ['syncStatus'],
          equals: 'pending_verification',
        },
      },
      select: { storeId: true, storefrontTheme: true },
      orderBy: { updatedAt: 'asc' },
      take: limit,
    });
  } catch {
    const candidates = await prisma.storeSettings.findMany({
      select: { storeId: true, storefrontTheme: true },
      orderBy: { updatedAt: 'asc' },
      take: limit,
    });
    return candidates.filter((candidate) => parseStorefrontThemeState(candidate.storefrontTheme)?.syncStatus === 'pending_verification');
  }
}

async function getBackupThemeCandidates(limit: number, excludedStoreIds: Set<string>, activeStoreIds: string[]): Promise<StoreSettingsThemeCandidate[]> {
  if (activeStoreIds.length === 0) return [];

  const candidates = await prisma.storeSettings.findMany({
    where: { storeId: { in: activeStoreIds } },
    select: { storeId: true, storefrontTheme: true },
    orderBy: { updatedAt: 'asc' },
    take: limit + excludedStoreIds.size,
  });

  const selected = candidates.filter((candidate) => !excludedStoreIds.has(candidate.storeId)).slice(0, limit);
  if (selected.length >= limit) return selected;

  const selectedStoreIds = new Set(selected.map((candidate) => candidate.storeId));
  const missingSettingsCandidates = activeStoreIds
    .filter((storeId) => !excludedStoreIds.has(storeId) && !selectedStoreIds.has(storeId))
    .slice(0, limit - selected.length)
    .map((storeId) => ({ storeId, storefrontTheme: null }));

  return [...selected, ...missingSettingsCandidates];
}

async function mapWithConcurrency<T, R>(items: T[], concurrency: number, task: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = [];
  let cursor = 0;
  const workerCount = Math.min(Math.max(1, concurrency), items.length);

  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await task(items[index]);
    }
  }

  await Promise.all(Array.from({ length: workerCount }, worker));
  return results;
}

async function reconcileThemeCandidate(
  candidate: StoreSettingsThemeCandidate,
  token: AuthToken | undefined,
  options: StorefrontThemeSyncOptions,
): Promise<StorefrontThemeReconcileMerchant> {
  if (!token) {
    return { merchantId: candidate.storeId, action: 'skipped_no_token' };
  }

  try {
    const result = await syncStorefrontThemeForToken(token, options);
    return {
      merchantId: candidate.storeId,
      action: result.action,
      syncStatus: result.syncStatus,
      verificationDueAt: result.verificationDueAt,
    };
  } catch (error) {
    return { merchantId: candidate.storeId, error: error instanceof Error ? error.message : 'unknown' };
  }
}

export async function reconcileStorefrontThemes(options: { limit?: number; pendingScanLimit?: number; now?: Date } = {}) {
  const now = options.now || new Date();
  const limit = Math.max(1, options.limit ?? Number(process.env.STOREFRONT_THEME_CRON_LIMIT || DEFAULT_THEME_RECONCILE_LIMIT));
  const pendingScanLimit = Math.max(limit, options.pendingScanLimit ?? Number(process.env.STOREFRONT_THEME_PENDING_SCAN_LIMIT || DEFAULT_PENDING_SCAN_LIMIT));
  const concurrency = Math.max(1, Number(process.env.STOREFRONT_THEME_CRON_CONCURRENCY || DEFAULT_THEME_RECONCILE_CONCURRENCY));
  const results: StorefrontThemeReconcileMerchant[] = [];
  const processedStoreIds = new Set<string>();
  const activeTokens = await AuthTokenManager.list();
  const tokenByMerchantId = new Map<string, AuthToken>();
  for (const token of activeTokens) {
    if (!tokenByMerchantId.has(token.merchantId)) {
      tokenByMerchantId.set(token.merchantId, token);
    }
  }
  const activeStoreIds = Array.from(tokenByMerchantId.keys());

  const pendingCandidates = await getPendingThemeCandidates(pendingScanLimit);
  const duePendingCandidates: StoreSettingsThemeCandidate[] = [];
  for (const candidate of pendingCandidates.filter((item) => tokenByMerchantId.has(item.storeId))) {
    if (results.length + duePendingCandidates.length >= limit) break;
    processedStoreIds.add(candidate.storeId);
    if (!isPendingStorefrontThemeDue(candidate.storefrontTheme, now)) {
      const state = parseStorefrontThemeState(candidate.storefrontTheme);
      results.push({
        merchantId: candidate.storeId,
        action: 'skipped_not_due',
        syncStatus: state?.syncStatus,
        verificationDueAt: state?.verificationDueAt ?? null,
      });
      continue;
    }

    duePendingCandidates.push(candidate);
  }

  results.push(
    ...(await mapWithConcurrency(duePendingCandidates, concurrency, (candidate) =>
      reconcileThemeCandidate(candidate, tokenByMerchantId.get(candidate.storeId), {
        reason: 'verification',
        promotePending: true,
        persistUnchangedCheck: true,
        now,
      }),
    )),
  );

  const remaining = limit - results.filter((result) => result.action !== 'skipped_not_due').length;
  if (remaining > 0) {
    const backupCandidates = await getBackupThemeCandidates(remaining, processedStoreIds, activeStoreIds);
    for (const candidate of backupCandidates) {
      processedStoreIds.add(candidate.storeId);
    }

    results.push(
      ...(await mapWithConcurrency(backupCandidates, concurrency, (candidate) =>
        reconcileThemeCandidate(candidate, tokenByMerchantId.get(candidate.storeId), {
          reason: 'cron',
          persistUnchangedCheck: true,
          now,
        }),
      )),
    );
  }

  return summarizeThemeReconcile(results);
}

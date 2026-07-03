// Two-phase, breaker-guarded orphan review-image cleanup for AWS S3 families.
// Phase 1 marks orphan families in OrphanImageQuarantine; phase 2 sweeps only
// families still orphaned after the grace window. Breakers prevent broad deletes.

import type { PrismaClient } from '@prisma/client';
import {
  AWS_REVIEW_IMAGE_PROVIDER,
  deleteAwsReviewImageFamily,
  listAwsReviewImageObjectFamilies,
  parseAwsReviewImagePublicId,
} from '@/lib/media/providers/aws-review-image';

const DAY_MS = 24 * 60 * 60 * 1000;
const DB_IN_BATCH = 1000;
const SAMPLE_DELETED_LIMIT = 50;

export type CleanupThresholds = {
  ageDays: number;
  graceDays: number;
  maxRatio: number;
  minScanForRatio: number;
  maxAbsolute: number;
};

export const DEFAULT_CLEANUP_THRESHOLDS: CleanupThresholds = {
  ageDays: 30,
  graceDays: 7,
  maxRatio: 0.3,
  minScanForRatio: 50,
  maxAbsolute: 200,
};

function envInt(raw: string | undefined, fallback: number, min: number, max: number): number {
  const n = raw !== undefined ? Number(raw) : NaN;
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(n)));
}

function envFloat(raw: string | undefined, fallback: number, min: number, max: number): number {
  const n = raw !== undefined ? Number(raw) : NaN;
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export function cleanupThresholdsFromEnv(env: Record<string, string | undefined> = process.env): CleanupThresholds {
  return {
    ageDays: envInt(env.CLEANUP_ORPHAN_AGE_DAYS, DEFAULT_CLEANUP_THRESHOLDS.ageDays, 1, 3650),
    graceDays: envInt(env.CLEANUP_QUARANTINE_GRACE_DAYS, DEFAULT_CLEANUP_THRESHOLDS.graceDays, 0, 365),
    maxRatio: envFloat(env.CLEANUP_MAX_DELETE_RATIO, DEFAULT_CLEANUP_THRESHOLDS.maxRatio, 0.01, 1),
    minScanForRatio: envInt(env.CLEANUP_MIN_SCAN_FOR_RATIO, DEFAULT_CLEANUP_THRESHOLDS.minScanForRatio, 1, 100000),
    maxAbsolute: envInt(env.CLEANUP_MAX_DELETE_ABSOLUTE, DEFAULT_CLEANUP_THRESHOLDS.maxAbsolute, 1, 1000000),
  };
}

export type BreakerResult = { tripped: boolean; reason?: string };

export type ScanStats = {
  scanned: number;
  usedCount: number;
  currentOrphans: number;
  mediaRowCount: number;
};

export function evaluateScanTrust(stats: ScanStats, thresholds: CleanupThresholds, force = false): BreakerResult {
  if (stats.usedCount === 0 && stats.scanned > 0 && stats.mediaRowCount > 0) {
    return {
      tripped: true,
      reason: `empty-used-set (used=0, scanned=${stats.scanned}, reviewMedia=${stats.mediaRowCount})`,
    };
  }

  if (!force && stats.scanned >= thresholds.minScanForRatio) {
    const ratio = stats.currentOrphans / stats.scanned;
    if (ratio > thresholds.maxRatio) {
      return {
        tripped: true,
        reason: `ratio ${ratio.toFixed(3)} > ${thresholds.maxRatio} (orphans=${stats.currentOrphans}/${stats.scanned})`,
      };
    }
  }

  return { tripped: false };
}

export function evaluateSweepCap(sweepCount: number, thresholds: CleanupThresholds, force = false): BreakerResult {
  if (!force && sweepCount > thresholds.maxAbsolute) {
    return { tripped: true, reason: `sweep ${sweepCount} > ${thresholds.maxAbsolute}` };
  }
  return { tripped: false };
}

export function storeIdFromPublicId(publicId: string): string | null {
  return parseAwsReviewImagePublicId(publicId)?.storeId ?? null;
}

export type OrphanCleanupDeps = {
  loadUsedPublicIds: () => Promise<Set<string>>;
  countReviewMedia: () => Promise<number>;
  listAllAssets: () => Promise<Array<{ publicId: string; createdAt: number }>>;
  listQuarantine: () => Promise<Array<{ publicId: string; quarantinedAt: number }>>;
  upsertQuarantine: (entries: Array<{ publicId: string; storeId: string | null }>) => Promise<void>;
  removeQuarantine: (publicIds: string[]) => Promise<void>;
  deleteAssets: (publicIds: string[]) => Promise<number>;
  now: () => number;
};

export type OrphanCleanupResult = {
  status: 'ok' | 'tripped';
  scanned: number;
  usedCount: number;
  currentOrphans: number;
  quarantinedNew: number;
  released: number;
  deleted: number;
  breakerTripped: boolean;
  breakerReason?: string;
  forced: boolean;
  sampleDeleted: string[];
};

export async function runOrphanImageCleanup(
  deps: OrphanCleanupDeps,
  thresholds: CleanupThresholds,
  options: { force?: boolean } = {},
): Promise<OrphanCleanupResult> {
  const force = options.force ?? false;
  const nowMs = deps.now();
  const ageCutoff = nowMs - thresholds.ageDays * DAY_MS;
  const graceCutoff = nowMs - thresholds.graceDays * DAY_MS;

  const [usedPublicIds, mediaRowCount, assets] = await Promise.all([
    deps.loadUsedPublicIds(),
    deps.countReviewMedia(),
    deps.listAllAssets(),
  ]);

  const scanned = assets.length;
  const currentOrphans = assets.filter((asset) => !usedPublicIds.has(asset.publicId) && asset.createdAt < ageCutoff);
  const currentOrphanIds = new Set(currentOrphans.map((asset) => asset.publicId));
  const base = {
    scanned,
    usedCount: usedPublicIds.size,
    currentOrphans: currentOrphans.length,
    forced: force,
  };

  const scanTrust = evaluateScanTrust(
    { scanned, usedCount: usedPublicIds.size, currentOrphans: currentOrphans.length, mediaRowCount },
    thresholds,
    force,
  );
  if (scanTrust.tripped) {
    return {
      ...base,
      status: 'tripped',
      quarantinedNew: 0,
      released: 0,
      deleted: 0,
      breakerTripped: true,
      breakerReason: scanTrust.reason,
      sampleDeleted: [],
    };
  }

  const quarantine = await deps.listQuarantine();
  const quarantinedIds = new Set(quarantine.map((row) => row.publicId));
  const quarantinedNew = currentOrphans.reduce((acc, asset) => (quarantinedIds.has(asset.publicId) ? acc : acc + 1), 0);
  if (currentOrphans.length > 0) {
    await deps.upsertQuarantine(
      currentOrphans.map((asset) => ({ publicId: asset.publicId, storeId: storeIdFromPublicId(asset.publicId) })),
    );
  }

  const releasedIds = quarantine.filter((row) => !currentOrphanIds.has(row.publicId)).map((row) => row.publicId);
  if (releasedIds.length > 0) await deps.removeQuarantine(releasedIds);

  const sweepIds = quarantine
    .filter((row) => row.quarantinedAt <= graceCutoff && currentOrphanIds.has(row.publicId))
    .map((row) => row.publicId);

  const sweepCap = evaluateSweepCap(sweepIds.length, thresholds, force);
  if (sweepCap.tripped) {
    return {
      ...base,
      status: 'tripped',
      quarantinedNew,
      released: releasedIds.length,
      deleted: 0,
      breakerTripped: true,
      breakerReason: sweepCap.reason,
      sampleDeleted: [],
    };
  }

  let deleted = 0;
  if (sweepIds.length > 0) {
    deleted = await deps.deleteAssets(sweepIds);
    await deps.removeQuarantine(sweepIds);
  }

  return {
    ...base,
    status: 'ok',
    quarantinedNew,
    released: releasedIds.length,
    deleted,
    breakerTripped: false,
    sampleDeleted: sweepIds.slice(0, SAMPLE_DELETED_LIMIT),
  };
}

type PrismaForCleanup = Pick<PrismaClient, 'reviewMedia' | 'pendingReviewImage' | 'orphanImageQuarantine'>;

async function loadUsedAwsPublicIds(prisma: PrismaForCleanup): Promise<Set<string>> {
  const used = new Set<string>();
  const mediaRows = await prisma.reviewMedia.findMany({
    where: { provider: AWS_REVIEW_IMAGE_PROVIDER, resourceType: 'image' },
    select: { publicId: true },
  });
  for (const row of mediaRows) {
    if (parseAwsReviewImagePublicId(row.publicId)) used.add(row.publicId);
  }

  const pendingRows = await prisma.pendingReviewImage.findMany({
    where: {
      provider: AWS_REVIEW_IMAGE_PROVIDER,
      resourceType: 'image',
      OR: [
        { uploadExpiresAt: null },
        { uploadExpiresAt: { gt: new Date() } },
      ],
    },
    select: { publicId: true },
  });
  for (const row of pendingRows) {
    if (parseAwsReviewImagePublicId(row.publicId)) used.add(row.publicId);
  }
  return used;
}

export function createAwsOrphanCleanupDeps(prisma: PrismaForCleanup): OrphanCleanupDeps {
  return {
    loadUsedPublicIds: () => loadUsedAwsPublicIds(prisma),
    countReviewMedia: () => prisma.reviewMedia.count({
      where: { provider: AWS_REVIEW_IMAGE_PROVIDER, resourceType: 'image' },
    }),
    listAllAssets: async () => {
      const families = await listAwsReviewImageObjectFamilies();
      return families.map((family) => ({ publicId: family.publicId, createdAt: family.createdAt }));
    },
    listQuarantine: async () => {
      const rows = await prisma.orphanImageQuarantine.findMany({
        where: { publicId: { startsWith: `${AWS_REVIEW_IMAGE_PROVIDER}:` } },
        select: { publicId: true, quarantinedAt: true },
      });
      return rows.map((row) => ({ publicId: row.publicId, quarantinedAt: row.quarantinedAt.getTime() }));
    },
    upsertQuarantine: async (entries) => {
      const ids = entries.map((entry) => entry.publicId);
      const seenAt = new Date();
      for (let i = 0; i < ids.length; i += DB_IN_BATCH) {
        await prisma.orphanImageQuarantine.updateMany({
          where: { publicId: { in: ids.slice(i, i + DB_IN_BATCH) } },
          data: { lastSeenAt: seenAt, scanCount: { increment: 1 } },
        });
      }
      for (let i = 0; i < entries.length; i += DB_IN_BATCH) {
        await prisma.orphanImageQuarantine.createMany({
          data: entries.slice(i, i + DB_IN_BATCH).map((entry) => ({ publicId: entry.publicId, storeId: entry.storeId })),
          skipDuplicates: true,
        });
      }
    },
    removeQuarantine: async (publicIds) => {
      for (let i = 0; i < publicIds.length; i += DB_IN_BATCH) {
        await prisma.orphanImageQuarantine.deleteMany({ where: { publicId: { in: publicIds.slice(i, i + DB_IN_BATCH) } } });
      }
    },
    deleteAssets: async (publicIds) => {
      let deleted = 0;
      for (const publicId of publicIds) {
        const parsed = parseAwsReviewImagePublicId(publicId);
        if (!parsed) continue;
        await deleteAwsReviewImageFamily(parsed.storeId, parsed.assetId, { invalidatePublicVariants: true });
        deleted += 1;
      }
      return deleted;
    },
    now: () => Date.now(),
  };
}

export type CleanupImagesResult = OrphanCleanupResult & { thresholds: CleanupThresholds };

export async function runCleanupImages(
  prisma: PrismaForCleanup,
  options: { force?: boolean; thresholds?: CleanupThresholds } = {},
): Promise<CleanupImagesResult> {
  const thresholds = options.thresholds ?? cleanupThresholdsFromEnv();
  const result = await runOrphanImageCleanup(createAwsOrphanCleanupDeps(prisma), thresholds, { force: options.force });
  return { ...result, thresholds };
}

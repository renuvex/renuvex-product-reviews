// Two-phase, breaker-guarded orphan image cleanup for the monthly cleanup-images
// cron. See ADR_0030.
//
// Why (industry-aligned guardrails for an unattended destructive job):
//   - MS Entra Connect default: stop-all + notify + manual approve above 500 deletes.
//   - octoDNS default: require --force above a 30% delete ratio.
//   - Storage GC: two-phase mark/sweep with a grace window for recovery.
//
// Safety model implemented here:
//   - Phase 1 (mark):  orphans (assets not attached to any review, older than the
//     age guard) are written to OrphanImageQuarantine instead of being deleted.
//   - Phase 2 (sweep): a later run hard-deletes only quarantined assets that are
//     STILL orphaned after a grace window — a recoverable buffer before any
//     irreversible delete. Re-attached assets are auto-released from quarantine.
//   - Circuit-breaker stops the run when the diff looks untrustworthy:
//       G1 empty-used-set -> hard stop (NOT force-overridable; never intended)
//       G2 ratio          -> stop if currentOrphans/scanned exceeds maxRatio (force-overridable)
//       G3 absolute       -> stop if the sweep would delete more than maxAbsolute (force-overridable)
//
// Dependency-injected so the two-phase logic and the breaker are unit-testable
// without Cloudinary or a database. Mirrors review-media-metadata-backfill.ts.

import { v2 as cloudinary } from 'cloudinary';
import type { PrismaClient } from '@prisma/client';
import { getConfiguredCloudinaryCloudName, getReviewImagePublicId, parseStoredReviewImages } from '@/lib/review-images';

const DAY_MS = 24 * 60 * 60 * 1000;
const CLOUDINARY_DELETE_BATCH = 100; // Cloudinary delete_resources cap
const DB_IN_BATCH = 1000; // keep IN() lists well under Postgres parameter limits
const SAMPLE_DELETED_LIMIT = 50;

export type CleanupThresholds = {
  /** Assets newer than this many days are never treated as orphans (protects in-flight uploads). */
  ageDays: number;
  /** Quarantined orphans are only swept after they have sat at least this many days. */
  graceDays: number;
  /** G2: trip if currentOrphans/scanned exceeds this fraction (0..1). */
  maxRatio: number;
  /** G2 only applies once at least this many assets were scanned (avoids tiny-sample noise). */
  minScanForRatio: number;
  /** G3: trip if a single run would hard-delete more than this many assets. */
  maxAbsolute: number;
};

export const DEFAULT_CLEANUP_THRESHOLDS: CleanupThresholds = {
  ageDays: 30,
  graceDays: 7,
  maxRatio: 0.3, // octoDNS default delete ratio
  minScanForRatio: 50,
  maxAbsolute: 200, // tighter than MS Entra's 500 — chosen for photo-heavy stores
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

// Resolve thresholds from env with safe defaults. All knobs are tunable without a
// code change so the defaults can be calibrated once real audit data is observed.
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

// G1 + G2 — is the scan trustworthy enough to act on at all? Evaluated BEFORE any
// quarantine mark, so an untrustworthy diff neither marks nor deletes anything.
export function evaluateScanTrust(stats: ScanStats, thresholds: CleanupThresholds, force = false): BreakerResult {
  // G1 — the used-set is empty while ReviewMedia demonstrably has rows. This means
  // the diff is broken (e.g. a cloudName/publicId regression), and treating the
  // whole library as orphaned is never intended. NOT force-overridable.
  if (stats.usedCount === 0 && stats.scanned > 0 && stats.mediaRowCount > 0) {
    return {
      tripped: true,
      reason: `empty-used-set (used=0, scanned=${stats.scanned}, reviewMedia=${stats.mediaRowCount})`,
    };
  }

  // G2 — an implausibly large fraction of the library looks orphaned. Abandoned
  // uploads are a tiny fraction in healthy operation, so this signals a partial
  // diff failure. Force-overridable for a genuine bulk cleanup.
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

// G3 — blast-radius cap on the actual hard-delete (sweep) count. Force-overridable
// after a human has reviewed the audit row and confirmed the deletion is intended.
export function evaluateSweepCap(sweepCount: number, thresholds: CleanupThresholds, force = false): BreakerResult {
  if (!force && sweepCount > thresholds.maxAbsolute) {
    return { tripped: true, reason: `sweep ${sweepCount} > ${thresholds.maxAbsolute}` };
  }
  return { tripped: false };
}

// publicId format: review_images/stores/<storeId>/<hash>. Best-effort store scope
// for forensics; null when the path does not match (never blocks cleanup).
export function storeIdFromPublicId(publicId: string): string | null {
  const parts = publicId.split('/');
  if (parts.length >= 4 && parts[0] === 'review_images' && parts[1] === 'stores') return parts[2] || null;
  return null;
}

export type OrphanCleanupDeps = {
  /** All publicIds currently attached to a review (ReviewMedia + legacy Review.images). */
  loadUsedPublicIds: () => Promise<Set<string>>;
  /** Total ReviewMedia row count — used only for the G1 empty-used-set sanity check. */
  countReviewMedia: () => Promise<number>;
  /** Walk the Cloudinary review-images folder, one entry per asset. */
  listAllAssets: () => Promise<Array<{ publicId: string; createdAt: number }>>;
  /** Current quarantine rows (publicId + when it was first quarantined, epoch ms). */
  listQuarantine: () => Promise<Array<{ publicId: string; quarantinedAt: number }>>;
  /** Insert new orphans and refresh (lastSeenAt/scanCount) ones already quarantined. Preserves quarantinedAt. */
  upsertQuarantine: (entries: Array<{ publicId: string; storeId: string | null }>) => Promise<void>;
  /** Remove publicIds from quarantine (released because re-attached, or swept). */
  removeQuarantine: (publicIds: string[]) => Promise<void>;
  /** Hard-delete assets from Cloudinary. Returns how many were actually deleted. */
  deleteAssets: (publicIds: string[]) => Promise<number>;
  /** Injectable clock for deterministic tests. */
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

// Core two-phase cleanup. Pure of Cloudinary/Prisma via deps; the only side
// effects are the injected upsert/remove/delete calls.
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
  // Current orphans: not attached to any review AND older than the age guard.
  const currentOrphans = assets.filter((asset) => !usedPublicIds.has(asset.publicId) && asset.createdAt < ageCutoff);
  const currentOrphanIds = new Set(currentOrphans.map((asset) => asset.publicId));

  const base = {
    scanned,
    usedCount: usedPublicIds.size,
    currentOrphans: currentOrphans.length,
    forced: force,
  };

  // G1 + G2 — bail out entirely if the scan looks untrustworthy (no mark, no sweep).
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

  // Read quarantine BEFORE marking so the sweep set is computed from rows that
  // predate this run (anything marked now starts its grace window fresh).
  const quarantine = await deps.listQuarantine();
  const quarantinedIds = new Set(quarantine.map((row) => row.publicId));

  // Phase 1 (mark): upsert all current orphans; count the brand-new ones.
  const quarantinedNew = currentOrphans.reduce((acc, asset) => (quarantinedIds.has(asset.publicId) ? acc : acc + 1), 0);
  if (currentOrphans.length > 0) {
    await deps.upsertQuarantine(
      currentOrphans.map((asset) => ({ publicId: asset.publicId, storeId: storeIdFromPublicId(asset.publicId) })),
    );
  }

  // Release: quarantined rows that are no longer orphans (re-attached or already gone).
  const releasedIds = quarantine.filter((row) => !currentOrphanIds.has(row.publicId)).map((row) => row.publicId);
  if (releasedIds.length > 0) await deps.removeQuarantine(releasedIds);

  // Phase 2 (sweep candidates): quarantined past the grace window AND still orphaned.
  const sweepIds = quarantine
    .filter((row) => row.quarantinedAt <= graceCutoff && currentOrphanIds.has(row.publicId))
    .map((row) => row.publicId);

  // G3 — blast-radius cap on the sweep. Quarantine entries are kept on trip.
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

type PrismaForCleanup = Pick<PrismaClient, 'reviewMedia' | 'review' | 'orphanImageQuarantine'>;

async function loadUsedPublicIds(prisma: PrismaForCleanup, cloudName: string): Promise<Set<string>> {
  const used = new Set<string>();

  const mediaRows = await prisma.reviewMedia.findMany({
    where: { provider: 'cloudinary', resourceType: 'image' },
    select: { publicId: true },
  });
  for (const row of mediaRows) {
    if (row.publicId) used.add(row.publicId);
  }

  // Legacy transition fallback: pre-ReviewMedia rows may still only have
  // Review.images until the media backfill has run.
  const reviews = await prisma.review.findMany({
    where: { images: { not: null } },
    select: { storeId: true, images: true },
  });
  for (const review of reviews) {
    if (!review.images) continue;
    const urls = parseStoredReviewImages(review.images, cloudName, review.storeId);
    for (const url of urls) {
      const publicId = getReviewImagePublicId(url, cloudName, review.storeId);
      if (publicId) used.add(publicId);
    }
  }

  return used;
}

// Builds production deps from env: configures Cloudinary with the prod
// credentials (same as cleanup-pending-uploads) and wires Prisma + Cloudinary.
// Returns null when Cloudinary config is missing so the caller can skip cleanly.
export function createOrphanCleanupDeps(prisma: PrismaForCleanup): OrphanCleanupDeps | null {
  const cloudName = getConfiguredCloudinaryCloudName();
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return null;

  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

  return {
    loadUsedPublicIds: () => loadUsedPublicIds(prisma, cloudName),
    countReviewMedia: () => prisma.reviewMedia.count({
      where: { provider: 'cloudinary', resourceType: 'image' },
    }),
    listAllAssets: async () => {
      const assets: Array<{ publicId: string; createdAt: number }> = [];
      let nextCursor: string | undefined;
      do {
        const result: { resources: Array<{ public_id: string; created_at: string }>; next_cursor?: string } =
          await cloudinary.api.resources({
            type: 'upload',
            prefix: 'review_images/',
            max_results: 500,
            next_cursor: nextCursor,
          });
        for (const asset of result.resources) {
          const createdAt = Date.parse(asset.created_at);
          // Unparseable timestamps default to "now" so the age guard treats them
          // as too-recent-to-delete (fail safe, never delete on bad metadata).
          assets.push({ publicId: asset.public_id, createdAt: Number.isFinite(createdAt) ? createdAt : Date.now() });
        }
        nextCursor = result.next_cursor;
      } while (nextCursor);
      return assets;
    },
    listQuarantine: async () => {
      const rows = await prisma.orphanImageQuarantine.findMany({ select: { publicId: true, quarantinedAt: true } });
      return rows.map((row) => ({ publicId: row.publicId, quarantinedAt: row.quarantinedAt.getTime() }));
    },
    upsertQuarantine: async (entries) => {
      const ids = entries.map((entry) => entry.publicId);
      // Refresh existing rows first — new publicIds don't match yet, so are untouched
      // and keep their default scanCount=1 when inserted below. Preserves quarantinedAt.
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
      for (let i = 0; i < publicIds.length; i += CLOUDINARY_DELETE_BATCH) {
        const batch = publicIds.slice(i, i + CLOUDINARY_DELETE_BATCH);
        try {
          await cloudinary.api.delete_resources(batch);
          deleted += batch.length;
        } catch (err) {
          console.error('[cleanup-images] delete batch failed:', err);
        }
      }
      return deleted;
    },
    now: () => Date.now(),
  };
}

export type CleanupImagesResult =
  | { status: 'skipped_no_cloudinary_config' }
  | (OrphanCleanupResult & { thresholds: CleanupThresholds });

// Convenience entry point for the cleanup-images cron route. Resolves prod deps
// + env thresholds and runs the two-phase cleanup. Audit persistence is the
// route's responsibility (keeps this path free of audit-write coupling).
export async function runCleanupImages(
  prisma: PrismaForCleanup,
  options: { force?: boolean; thresholds?: CleanupThresholds } = {},
): Promise<CleanupImagesResult> {
  const deps = createOrphanCleanupDeps(prisma);
  if (!deps) return { status: 'skipped_no_cloudinary_config' };
  const thresholds = options.thresholds ?? cleanupThresholdsFromEnv();
  const result = await runOrphanImageCleanup(deps, thresholds, { force: options.force });
  return { ...result, thresholds };
}

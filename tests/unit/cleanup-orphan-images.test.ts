import { describe, expect, it } from 'vitest';
import {
  cleanupThresholdsFromEnv,
  DEFAULT_CLEANUP_THRESHOLDS,
  evaluateScanTrust,
  evaluateSweepCap,
  runOrphanImageCleanup,
  storeIdFromPublicId,
  type CleanupThresholds,
  type OrphanCleanupDeps,
} from '@/lib/cleanup-orphan-images';

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.UTC(2026, 5, 9, 4, 0, 0);

function awsPublicId(name: string) {
  const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0).toString().padStart(12, '0');
  return `aws_s3:s1:00000000-0000-4000-8000-${hash}`;
}

describe('evaluateScanTrust', () => {
  const t = DEFAULT_CLEANUP_THRESHOLDS;

  it('G1: trips on an empty used-set while ReviewMedia has rows', () => {
    const result = evaluateScanTrust({ scanned: 100, usedCount: 0, currentOrphans: 100, mediaRowCount: 10 }, t);
    expect(result.tripped).toBe(true);
    expect(result.reason).toContain('empty-used-set');
  });

  it('G1: is NOT force-overridable (deleting the whole library is never intended)', () => {
    const result = evaluateScanTrust({ scanned: 100, usedCount: 0, currentOrphans: 100, mediaRowCount: 10 }, t, true);
    expect(result.tripped).toBe(true);
    expect(result.reason).toContain('empty-used-set');
  });

  it('G1: does not trip when there is genuinely no media in use (mediaRowCount 0)', () => {
    // A brand-new store with a few abandoned uploads and no reviews yet: empty
    // used-set is expected, not a broken diff. (scanned < minScanForRatio so G2 is skipped.)
    expect(evaluateScanTrust({ scanned: 10, usedCount: 0, currentOrphans: 10, mediaRowCount: 0 }, t).tripped).toBe(false);
  });

  it('G2: trips when the orphan ratio exceeds maxRatio', () => {
    const result = evaluateScanTrust({ scanned: 100, usedCount: 60, currentOrphans: 40, mediaRowCount: 60 }, t);
    expect(result.tripped).toBe(true);
    expect(result.reason).toContain('ratio');
  });

  it('G2: does not apply below minScanForRatio (tiny-sample noise)', () => {
    expect(evaluateScanTrust({ scanned: 10, usedCount: 1, currentOrphans: 9, mediaRowCount: 1 }, t).tripped).toBe(false);
  });

  it('G2: is force-overridable for a genuine bulk cleanup', () => {
    expect(evaluateScanTrust({ scanned: 100, usedCount: 60, currentOrphans: 40, mediaRowCount: 60 }, t, true).tripped).toBe(false);
  });

  it('does not trip on a healthy scan (few orphans)', () => {
    expect(evaluateScanTrust({ scanned: 100, usedCount: 95, currentOrphans: 3, mediaRowCount: 95 }, t).tripped).toBe(false);
  });
});

describe('evaluateSweepCap', () => {
  const t = DEFAULT_CLEANUP_THRESHOLDS; // maxAbsolute 200

  it('trips when the sweep exceeds the absolute cap', () => {
    const result = evaluateSweepCap(201, t);
    expect(result.tripped).toBe(true);
    expect(result.reason).toContain('sweep 201 > 200');
  });

  it('does not trip at the cap', () => {
    expect(evaluateSweepCap(200, t).tripped).toBe(false);
  });

  it('is force-overridable', () => {
    expect(evaluateSweepCap(201, t, true).tripped).toBe(false);
  });
});

describe('storeIdFromPublicId', () => {
  it('extracts the store id from an AWS review-image publicId', () => {
    expect(storeIdFromPublicId('aws_s3:store-1:00000000-0000-4000-8000-000000000001')).toBe('store-1');
  });

  it('returns null for a non-matching path', () => {
    expect(storeIdFromPublicId('something/else/x')).toBeNull();
    expect(storeIdFromPublicId('aws_s3:store-1:not-a-uuid')).toBeNull();
  });
});

describe('cleanupThresholdsFromEnv', () => {
  it('returns the safe defaults when env is empty', () => {
    expect(cleanupThresholdsFromEnv({})).toEqual(DEFAULT_CLEANUP_THRESHOLDS);
  });

  it('reads and parses env overrides', () => {
    expect(
      cleanupThresholdsFromEnv({
        CLEANUP_ORPHAN_AGE_DAYS: '14',
        CLEANUP_QUARANTINE_GRACE_DAYS: '3',
        CLEANUP_MAX_DELETE_RATIO: '0.5',
        CLEANUP_MIN_SCAN_FOR_RATIO: '10',
        CLEANUP_MAX_DELETE_ABSOLUTE: '50',
      }),
    ).toEqual({ ageDays: 14, graceDays: 3, maxRatio: 0.5, minScanForRatio: 10, maxAbsolute: 50 });
  });

  it('clamps out-of-range values and ignores garbage', () => {
    expect(cleanupThresholdsFromEnv({ CLEANUP_MAX_DELETE_RATIO: '5' }).maxRatio).toBe(1);
    expect(cleanupThresholdsFromEnv({ CLEANUP_MAX_DELETE_RATIO: '0' }).maxRatio).toBe(0.01);
    expect(cleanupThresholdsFromEnv({ CLEANUP_ORPHAN_AGE_DAYS: 'abc' }).ageDays).toBe(DEFAULT_CLEANUP_THRESHOLDS.ageDays);
  });
});

type DepState = {
  used?: string[];
  mediaCount?: number;
  assets?: Array<{ publicId: string; createdAt: number }>;
  quarantine?: Array<{ publicId: string; quarantinedAt: number }>;
};

function makeDeps(state: DepState) {
  const used = new Set(state.used ?? []);
  const upserted: Array<{ publicId: string; storeId: string | null }> = [];
  const removed: string[] = [];
  const deleted: string[] = [];

  const deps: OrphanCleanupDeps = {
    loadUsedPublicIds: async () => used,
    countReviewMedia: async () => state.mediaCount ?? used.size,
    listAllAssets: async () => state.assets ?? [],
    listQuarantine: async () => state.quarantine ?? [],
    upsertQuarantine: async (entries) => {
      upserted.push(...entries);
    },
    removeQuarantine: async (ids) => {
      removed.push(...ids);
    },
    deleteAssets: async (ids) => {
      deleted.push(...ids);
      return ids.length;
    },
    now: () => NOW,
  };

  return { deps, upserted, removed, deleted };
}

const oldAsset = (publicId: string) => ({ publicId, createdAt: NOW - 40 * DAY });

describe('runOrphanImageCleanup (two-phase core)', () => {
  it('phase 1: marks new orphans without deleting anything (first run)', async () => {
    const keep = awsPublicId('keep');
    const orphan = awsPublicId('orphan');
    const { deps, upserted, removed, deleted } = makeDeps({
      used: [keep],
      mediaCount: 1,
      assets: [oldAsset(keep), oldAsset(orphan)],
      quarantine: [],
    });

    const result = await runOrphanImageCleanup(deps, DEFAULT_CLEANUP_THRESHOLDS);

    expect(result.status).toBe('ok');
    expect(result.currentOrphans).toBe(1);
    expect(result.quarantinedNew).toBe(1);
    expect(result.deleted).toBe(0);
    expect(upserted.map((e) => e.publicId)).toEqual([orphan]);
    expect(deleted).toEqual([]);
    expect(removed).toEqual([]);
  });

  it('phase 2: sweeps an orphan that has sat past the grace window and is still orphaned', async () => {
    const keep = awsPublicId('keep');
    const orphan = awsPublicId('orphan');
    const { deps, removed, deleted } = makeDeps({
      used: [keep],
      mediaCount: 1,
      assets: [oldAsset(keep), oldAsset(orphan)],
      quarantine: [{ publicId: orphan, quarantinedAt: NOW - 10 * DAY }],
    });

    const result = await runOrphanImageCleanup(deps, DEFAULT_CLEANUP_THRESHOLDS);

    expect(result.status).toBe('ok');
    expect(result.deleted).toBe(1);
    expect(deleted).toEqual([orphan]);
    expect(removed).toContain(orphan);
    expect(result.sampleDeleted).toEqual([orphan]);
  });

  it('does not sweep a quarantined orphan that is still within the grace window', async () => {
    const keep = awsPublicId('keep');
    const orphan = awsPublicId('orphan');
    const { deps, deleted } = makeDeps({
      used: [keep],
      mediaCount: 1,
      assets: [oldAsset(keep), oldAsset(orphan)],
      quarantine: [{ publicId: orphan, quarantinedAt: NOW - 2 * DAY }], // < 7d grace
    });

    const result = await runOrphanImageCleanup(deps, DEFAULT_CLEANUP_THRESHOLDS);

    expect(result.deleted).toBe(0);
    expect(deleted).toEqual([]);
  });

  it('releases (un-quarantines) an asset that is no longer an orphan, never deleting it', async () => {
    const keep = awsPublicId('keep');
    const wasOrphan = awsPublicId('wasOrphan');
    const { deps, removed, deleted } = makeDeps({
      used: [keep, wasOrphan], // now attached
      mediaCount: 2,
      assets: [oldAsset(keep), oldAsset(wasOrphan)],
      quarantine: [{ publicId: wasOrphan, quarantinedAt: NOW - 10 * DAY }], // past grace, but re-attached
    });

    const result = await runOrphanImageCleanup(deps, DEFAULT_CLEANUP_THRESHOLDS);

    expect(result.status).toBe('ok');
    expect(result.released).toBe(1);
    expect(result.deleted).toBe(0);
    expect(removed).toEqual([wasOrphan]);
    expect(deleted).toEqual([]);
  });

  it('does not treat assets newer than the age guard as orphans', async () => {
    const keep = awsPublicId('keep');
    const { deps, upserted } = makeDeps({
      used: [keep],
      mediaCount: 1,
      assets: [oldAsset(keep), { publicId: awsPublicId('fresh'), createdAt: NOW - 5 * DAY }],
      quarantine: [],
    });

    const result = await runOrphanImageCleanup(deps, DEFAULT_CLEANUP_THRESHOLDS);

    expect(result.currentOrphans).toBe(0);
    expect(upserted).toEqual([]);
  });

  it('G1: trips on empty used-set with media present — no mark, no delete, even with force', async () => {
    const { deps, upserted, deleted } = makeDeps({
      used: [],
      mediaCount: 5,
      assets: [oldAsset(awsPublicId('a')), oldAsset(awsPublicId('b'))],
      quarantine: [{ publicId: awsPublicId('a'), quarantinedAt: NOW - 10 * DAY }],
    });

    const result = await runOrphanImageCleanup(deps, DEFAULT_CLEANUP_THRESHOLDS, { force: true });

    expect(result.status).toBe('tripped');
    expect(result.breakerTripped).toBe(true);
    expect(result.breakerReason).toContain('empty-used-set');
    expect(upserted).toEqual([]);
    expect(deleted).toEqual([]);
  });

  it('G3: trips when the sweep would exceed the absolute cap; keeps quarantine, deletes nothing', async () => {
    const thresholds: CleanupThresholds = { ...DEFAULT_CLEANUP_THRESHOLDS, maxRatio: 1, maxAbsolute: 2 };
    const keep = awsPublicId('keep');
    const o = ['o1', 'o2', 'o3'].map(awsPublicId);
    const { deps, deleted, removed } = makeDeps({
      used: [keep],
      mediaCount: 1,
      assets: [oldAsset(keep), ...o.map(oldAsset)],
      quarantine: o.map((publicId) => ({ publicId, quarantinedAt: NOW - 10 * DAY })),
    });

    const result = await runOrphanImageCleanup(deps, thresholds);

    expect(result.status).toBe('tripped');
    expect(result.breakerReason).toContain('sweep 3 > 2');
    expect(result.deleted).toBe(0);
    expect(deleted).toEqual([]);
    expect(removed).toEqual([]); // quarantine preserved on trip
  });

  it('G3: force overrides the absolute cap and sweeps', async () => {
    const thresholds: CleanupThresholds = { ...DEFAULT_CLEANUP_THRESHOLDS, maxRatio: 1, maxAbsolute: 2 };
    const keep = awsPublicId('keep');
    const o = ['o1', 'o2', 'o3'].map(awsPublicId);
    const { deps, deleted } = makeDeps({
      used: [keep],
      mediaCount: 1,
      assets: [oldAsset(keep), ...o.map(oldAsset)],
      quarantine: o.map((publicId) => ({ publicId, quarantinedAt: NOW - 10 * DAY })),
    });

    const result = await runOrphanImageCleanup(deps, thresholds, { force: true });

    expect(result.status).toBe('ok');
    expect(result.deleted).toBe(3);
    expect(deleted).toEqual(o);
  });
});

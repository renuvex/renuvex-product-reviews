import { beforeEach, describe, expect, it, vi } from 'vitest';

const maintenanceMock = vi.hoisted(() => ({
  cleanupPendingUploads: vi.fn(),
  reconcileStorefrontScripts: vi.fn(),
  reconcileStorefrontThemes: vi.fn(),
  ensureVideoLifecycleJobs: vi.fn(),
  reconcileProcessingVideos: vi.fn(),
  redispatchDueMediaJobs: vi.fn(),
  runCleanupImages: vi.fn(),
  reportCronTaskError: vi.fn(),
  reportReviewEmailFailure: vi.fn(),
  mediaCleanupRunCreate: vi.fn(),
  retryFailedStoreReviewEmailErasures: vi.fn(),
  retryPendingReviewEmailDataSubjectRuns: vi.fn(),
  runReviewEmailLifecycleMaintenance: vi.fn(),
  runProductReconciliationMaintenance: vi.fn(),
}));

vi.mock('@/lib/cleanup-pending-uploads', () => ({ cleanupPendingUploads: maintenanceMock.cleanupPendingUploads }));
vi.mock('@/lib/reconcile-storefront-scripts', () => ({ reconcileStorefrontScripts: maintenanceMock.reconcileStorefrontScripts }));
vi.mock('@/lib/storefront-theme-sync', () => ({ reconcileStorefrontThemes: maintenanceMock.reconcileStorefrontThemes }));
vi.mock('@/lib/media/reconciliation', () => ({
  ensureVideoLifecycleJobs: maintenanceMock.ensureVideoLifecycleJobs,
  reconcileProcessingVideos: maintenanceMock.reconcileProcessingVideos,
  redispatchDueMediaJobs: maintenanceMock.redispatchDueMediaJobs,
}));
vi.mock('@/lib/cleanup-orphan-images', () => ({ runCleanupImages: maintenanceMock.runCleanupImages }));
vi.mock('@/lib/cron-observability', () => ({ reportCronTaskError: maintenanceMock.reportCronTaskError }));
vi.mock('@/lib/review-email/failures', async (importOriginal) => ({
  ...await importOriginal<typeof import('@/lib/review-email/failures')>(),
  reportReviewEmailFailure: maintenanceMock.reportReviewEmailFailure,
}));
vi.mock('@/lib/review-email/erasure', () => ({
  retryFailedStoreReviewEmailErasures: maintenanceMock.retryFailedStoreReviewEmailErasures,
}));
vi.mock('@/lib/review-email/maintenance', () => ({
  runReviewEmailLifecycleMaintenance: maintenanceMock.runReviewEmailLifecycleMaintenance,
}));
vi.mock('@/lib/review-email/data-subject', () => ({
  retryPendingReviewEmailDataSubjectRuns: maintenanceMock.retryPendingReviewEmailDataSubjectRuns,
}));
vi.mock('@/lib/product-reconciliation', () => ({
  runProductReconciliationMaintenance: maintenanceMock.runProductReconciliationMaintenance,
}));
vi.mock('@/lib/prisma', () => ({ prisma: { mediaCleanupRun: { create: maintenanceMock.mediaCleanupRunCreate } } }));

describe('scheduled job helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    maintenanceMock.reconcileStorefrontThemes.mockResolvedValue({ themes: 1 });
    maintenanceMock.cleanupPendingUploads.mockResolvedValue({ deleted: 0 });
    maintenanceMock.reconcileStorefrontScripts.mockResolvedValue({ scripts: 1 });
    maintenanceMock.ensureVideoLifecycleJobs.mockResolvedValue({ dispatched: 0 });
    maintenanceMock.reconcileProcessingVideos.mockResolvedValue({ scanned: 0 });
    maintenanceMock.redispatchDueMediaJobs.mockResolvedValue({ dispatched: 0 });
    maintenanceMock.runCleanupImages.mockResolvedValue({
      status: 'ok',
      scanned: 0,
      usedCount: 0,
      currentOrphans: 0,
      quarantinedNew: 0,
      released: 0,
      deleted: 0,
      breakerTripped: false,
      forced: false,
      sampleDeleted: [],
      thresholds: { ageDays: 30, graceDays: 7, maxRatio: 0.3, minScanForRatio: 50, maxAbsolute: 200 },
    });
    maintenanceMock.mediaCleanupRunCreate.mockResolvedValue({});
    maintenanceMock.retryFailedStoreReviewEmailErasures.mockResolvedValue({
      claimed: 0,
      succeeded: 0,
      pending: 0,
      failed: 0,
      exhausted: 0,
    });
    maintenanceMock.retryPendingReviewEmailDataSubjectRuns.mockResolvedValue({ claimed: 0, succeeded: 0, failed: 0, exhausted: 0 });
    maintenanceMock.runReviewEmailLifecycleMaintenance.mockResolvedValue({
      stalePreparedAttempts: 0,
      outcomeUnknownAttempts: 0,
      expiredTokens: 0,
      expiredSessions: 0,
      expiredRequests: 0,
      activeKeyVersions: [],
      retention: { runId: 'purge-1', mode: 'report', batches: 1, candidates: {}, deleted: {}, elapsedMs: 1 },
    });
    maintenanceMock.runProductReconciliationMaintenance.mockResolvedValue({
      created: 0,
      dispatched: 0,
      dispatchFailed: 0,
      redispatched: 0,
    });
  });

  it('keeps the manual daily-maintenance time-window behavior', async () => {
    const { shouldRunFullMaintenance } = await import('@/lib/scheduled-jobs');

    expect(shouldRunFullMaintenance(new Request('https://app.test/api/admin/daily-maintenance?full=1'), new Date('2026-07-04T12:00:00Z'))).toBe(true);
    expect(shouldRunFullMaintenance(new Request('https://app.test/api/admin/daily-maintenance'), new Date('2026-07-04T03:04:59Z'))).toBe(true);
    expect(shouldRunFullMaintenance(new Request('https://app.test/api/admin/daily-maintenance'), new Date('2026-07-04T03:05:00Z'))).toBe(false);
  });

  it('runs full maintenance explicitly for QStash without relying on the UTC minute window', async () => {
    const { runDailyMaintenance } = await import('@/lib/scheduled-jobs');

    const result = await runDailyMaintenance({ full: true });

    expect(result.status).toBe(200);
    expect(result.body.data).toMatchObject({ runFullMaintenance: true });
    expect(maintenanceMock.reconcileStorefrontThemes).toHaveBeenCalledTimes(1);
    expect(maintenanceMock.cleanupPendingUploads).toHaveBeenCalledTimes(1);
    expect(maintenanceMock.reconcileStorefrontScripts).toHaveBeenCalledTimes(1);
    expect(maintenanceMock.ensureVideoLifecycleJobs).toHaveBeenCalledTimes(1);
    expect(maintenanceMock.reconcileProcessingVideos).toHaveBeenCalledTimes(1);
    expect(maintenanceMock.redispatchDueMediaJobs).toHaveBeenCalledTimes(1);
  });

  it('returns 500 when a daily maintenance subtask fails so QStash can retry', async () => {
    maintenanceMock.cleanupPendingUploads.mockRejectedValue(new Error('cleanup failed'));
    const { runDailyMaintenance } = await import('@/lib/scheduled-jobs');

    const result = await runDailyMaintenance({ full: true });

    expect(result.status).toBe(500);
    expect(result.body.data).toMatchObject({
      runFullMaintenance: true,
      errors: [{ task: 'cleanup-pending-uploads', error: 'cleanup failed' }],
    });
    expect(maintenanceMock.reportCronTaskError).toHaveBeenCalledWith(
      'daily-maintenance',
      'cleanup-pending-uploads',
      expect.any(Error),
    );
  });

  it('does not expose raw review-email maintenance failures through scheduler results', async () => {
    const canary = 'Customer@Example.com\r\nraw-token postgres://user:secret@db.internal/reviews';
    maintenanceMock.runReviewEmailLifecycleMaintenance.mockRejectedValue(new Error(canary));
    const { runDailyMaintenance } = await import('@/lib/scheduled-jobs');

    const result = await runDailyMaintenance({ full: true });

    expect(result.status).toBe(500);
    expect(result.body.data).toMatchObject({
      errors: [{ task: 'review-email-lifecycle', error: 'retention_purge_failed' }],
    });
    expect(JSON.stringify(result)).not.toContain(canary);
    expect(maintenanceMock.reportReviewEmailFailure).toHaveBeenCalledWith(
      'retention_purge',
      { code: 'retention_purge_failed', retryable: true },
    );
  });

  it('preserves cleanup-images breaker trips as controlled 200 responses', async () => {
    maintenanceMock.runCleanupImages.mockResolvedValue({
      status: 'tripped',
      scanned: 100,
      usedCount: 60,
      currentOrphans: 40,
      quarantinedNew: 0,
      released: 0,
      deleted: 0,
      breakerTripped: true,
      breakerReason: 'ratio 0.400 > 0.3',
      forced: false,
      sampleDeleted: [],
      thresholds: { ageDays: 30, graceDays: 7, maxRatio: 0.3, minScanForRatio: 50, maxAbsolute: 200 },
    });
    const { runCleanupImagesMaintenance } = await import('@/lib/scheduled-jobs');

    const result = await runCleanupImagesMaintenance();

    expect(result.status).toBe(200);
    expect(result.body).toMatchObject({ status: 'tripped', breakerTripped: true });
    expect(maintenanceMock.mediaCleanupRunCreate).toHaveBeenCalledTimes(1);
    expect(maintenanceMock.reportCronTaskError).toHaveBeenCalledWith(
      'cleanup-images',
      'breaker-tripped',
      expect.any(Error),
      expect.objectContaining({ scanned: 100, usedCount: 60, currentOrphans: 40, forced: false }),
    );
  });

  it('builds deterministic schedule slots for daily and monthly tasks', async () => {
    const { scheduledJobSlot } = await import('@/lib/scheduled-jobs');
    const now = new Date('2026-07-04T23:59:59.000Z');

    expect(scheduledJobSlot('daily-maintenance-full', now)).toBe('2026-07-04');
    expect(scheduledJobSlot('cleanup-images', now)).toBe('2026-07');
  });

  it('maps lock rows to claimed, processed, and in-progress states', async () => {
    const { claimScheduledJobRun } = await import('@/lib/scheduled-jobs');
    const db = {
      $queryRaw: vi
        .fn()
        .mockResolvedValueOnce([{ result: 'claimed', attempts: 1, existingStatus: null }])
        .mockResolvedValueOnce([{ result: 'existing', attempts: 1, existingStatus: 'succeeded' }])
        .mockResolvedValueOnce([{ result: 'existing', attempts: 1, existingStatus: 'processing' }]),
      $executeRaw: vi.fn(),
    };

    const lockDb = db as Parameters<typeof claimScheduledJobRun>[0];
    await expect(claimScheduledJobRun(lockDb, 'daily-maintenance-full', '2026-07-04')).resolves.toEqual({ state: 'claimed', attempts: 1 });
    await expect(claimScheduledJobRun(lockDb, 'daily-maintenance-full', '2026-07-04')).resolves.toEqual({ state: 'already_processed', attempts: 1 });
    await expect(claimScheduledJobRun(lockDb, 'daily-maintenance-full', '2026-07-04')).resolves.toEqual({ state: 'in_progress', attempts: 1 });
  });
});

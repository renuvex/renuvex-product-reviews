import type { IkasStoreInstallation, StoreDataErasureRun } from '@prisma/client';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  writeJournal: vi.fn(),
  dispatchRetry: vi.fn(),
  dispatchMedia: vi.fn(),
}));

const { prisma } = vi.hoisted(() => ({
  prisma: {
    storeDataErasureRun: {
      create: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
      updateMany: vi.fn(),
      findUnique: vi.fn(),
      findUniqueOrThrow: vi.fn(),
      update: vi.fn(),
      upsert: vi.fn(),
    },
    $transaction: vi.fn(),
  },
}));

vi.mock('@/lib/prisma', () => ({ prisma }));
vi.mock('@/lib/review-email/journal', () => ({
  buildReviewEmailStoreErasureJournalPayload: vi.fn((value) => value),
  writeReviewEmailStoreErasureJournal: mocks.writeJournal,
}));
vi.mock('@/lib/review-email/erasure-dispatcher', () => ({ dispatchStoreDataErasureRetry: mocks.dispatchRetry }));
vi.mock('@/lib/media/jobs', () => ({ dispatchMediaProviderJob: mocks.dispatchMedia }));
vi.mock('@/lib/review-deletion', () => ({ enqueueReviewMediaCleanup: vi.fn().mockResolvedValue([]) }));
vi.mock('@/lib/review-summary', () => ({ applyReviewSummaryRemovals: vi.fn() }));
vi.mock('@/lib/media/outbox', () => ({ enqueueMediaProviderJob: vi.fn() }));

import {
  eraseStoreReviewEmailData,
  processStoreDataErasureRun,
  replayStoreDataErasureJournalIntent,
  retryFailedStoreReviewEmailErasures,
} from '@/lib/review-email/erasure';

const NOW = new Date('2026-07-10T12:00:00.000Z');

function installationFixture(
  overrides: Partial<IkasStoreInstallation> = {},
): IkasStoreInstallation {
  return {
    storeId: 'store-1',
    authorizedAppId: 'app-1',
    generation: 1,
    stateVersion: 1,
    status: 'active',
    activatedAt: new Date('2026-07-01T12:00:00.000Z'),
    erasureStartedAt: null,
    erasedAt: null,
    createdAt: new Date('2026-07-01T12:00:00.000Z'),
    updatedAt: new Date('2026-07-01T12:00:00.000Z'),
    ...overrides,
  };
}

function runFixture(overrides: Partial<StoreDataErasureRun> = {}): StoreDataErasureRun {
  return {
    id: 'run-1',
    storeId: 'store-1',
    authorizedAppId: 'app-1',
    installationGeneration: 1,
    triggerSource: 'ikas_store_app_deleted',
    status: 'processing',
    attempts: 0,
    nextRetryAt: null,
    journalKey: null,
    journalPayloadSha256: null,
    journalVersionId: null,
    journalEtag: null,
    journalChecksumSha256: null,
    journalRetentionBaseAt: NOW,
    journalRetainUntil: null,
    journalStatus: 'pending',
    rowCounts: null,
    progress: { phase: 'reviews', deleted: {} },
    startedAt: NOW,
    finishedAt: null,
    sanitizedErrorCode: null,
    createdAt: NOW,
    ...overrides,
  };
}

function deleteModel(count = 0) {
  return { deleteMany: vi.fn().mockResolvedValue({ count }) };
}

function createErasureHarness(input: {
  installation?: IkasStoreInstallation | null;
  run?: StoreDataErasureRun | null;
} = {}) {
  let installation = input.installation === undefined ? installationFixture() : input.installation;
  let run = input.run === undefined ? null : input.run;
  let afterRunUpdate: ((updated: StoreDataErasureRun) => void) | null = null;

  const tx = {
    $executeRaw: vi.fn().mockResolvedValue(1),
    $queryRaw: vi.fn(async (parts: TemplateStringsArray) => {
      const sql = Array.from(parts).join(' ');
      if (sql.includes('"IkasStoreInstallation"')) return installation ? [installation] : [];
      if (sql.includes('"StoreDataErasureRun"')) return run ? [run] : [];
      return [];
    }),
    ikasStoreInstallation: {
      create: vi.fn(async ({ data }: { data: Partial<IkasStoreInstallation> }) => {
        installation = installationFixture(data);
        return installation;
      }),
      update: vi.fn(async ({ data }: { data: Record<string, unknown> }) => {
        if (!installation) throw new Error('installation_missing');
        installation = {
          ...installation,
          ...data,
          stateVersion: data.stateVersion && typeof data.stateVersion === 'object'
            ? installation.stateVersion + 1
            : installation.stateVersion,
        } as IkasStoreInstallation;
        return installation;
      }),
      updateMany: vi.fn(async ({ where, data }: {
        where: {
          storeId?: string;
          authorizedAppId?: string;
          generation?: number;
          stateVersion?: number;
          status?: string;
        };
        data: Record<string, unknown>;
      }) => {
        const matches = Boolean(
          installation &&
          (where.storeId === undefined || installation.storeId === where.storeId) &&
          (where.authorizedAppId === undefined || installation.authorizedAppId === where.authorizedAppId) &&
          (where.generation === undefined || installation.generation === where.generation) &&
          (where.stateVersion === undefined || installation.stateVersion === where.stateVersion) &&
          (where.status === undefined || installation.status === where.status),
        );
        if (matches && installation) {
          installation = {
            ...installation,
            ...data,
            stateVersion: data.stateVersion && typeof data.stateVersion === 'object'
              ? installation.stateVersion + 1
              : installation.stateVersion,
          } as IkasStoreInstallation;
        }
        return { count: matches ? 1 : 0 };
      }),
    },
    storeDataErasureRun: {
      create: vi.fn(async ({ data }: { data: Partial<StoreDataErasureRun> }) => {
        run = runFixture(data);
        return run;
      }),
      updateMany: vi.fn(async () => ({ count: 0 })),
      update: vi.fn(async ({ data }: { data: Partial<StoreDataErasureRun> }) => {
        if (!run) throw new Error('run_missing');
        run = { ...run, ...data } as StoreDataErasureRun;
        afterRunUpdate?.(run);
        return run;
      }),
    },
    authToken: {
      findFirst: vi.fn().mockResolvedValue(null),
      deleteMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
    review: { findMany: vi.fn().mockResolvedValue([]), deleteMany: vi.fn() },
    pendingReviewImage: { findMany: vi.fn().mockResolvedValue([]), deleteMany: vi.fn() },
    videoUploadSession: { findMany: vi.fn().mockResolvedValue([]), deleteMany: vi.fn() },
    reviewRequest: { findMany: vi.fn().mockResolvedValue([]), deleteMany: vi.fn() },
    reviewEmailBatch: { findMany: vi.fn().mockResolvedValue([]), deleteMany: vi.fn() },
    reviewEmailEvent: { deleteMany: vi.fn() },
    ikasOrderSnapshot: { findMany: vi.fn().mockResolvedValue([]), deleteMany: vi.fn() },
    reviewEmailSettings: deleteModel(1),
    reviewEmailUnsubscribeToken: deleteModel(1),
    reviewEmailSuppression: deleteModel(1),
    reviewEmailSubjectBlock: deleteModel(1),
    reviewEmailMetricContribution: deleteModel(1),
    reviewEmailDailyMetric: deleteModel(1),
    reviewEmailDataSubjectRun: deleteModel(1),
    reviewRequestReceipt: deleteModel(1),
    ikasOrderWebhookEvent: deleteModel(1),
    ikasOrderReconciliationCursor: deleteModel(1),
    storeVideoUsage: deleteModel(1),
  };

  prisma.$transaction.mockImplementation(async (callback: (value: typeof tx) => unknown) => callback(tx));
  prisma.storeDataErasureRun.findUnique.mockImplementation(async () => run);
  prisma.storeDataErasureRun.findUniqueOrThrow.mockImplementation(async () => {
    if (!run) throw new Error('run_missing');
    return run;
  });
  prisma.storeDataErasureRun.updateMany.mockImplementation(async () => ({ count: 1 }));
  mocks.writeJournal.mockImplementation(async () => {
    if (!run) throw new Error('run_missing');
    run = {
      ...run,
      journalStatus: 'verified',
      journalKey: `erasure-journal/v1/2026/07/10/${run.id}.json`,
      journalPayloadSha256: 'a'.repeat(64),
    };
    return {
      key: run.journalKey,
      payloadSha256: run.journalPayloadSha256,
      versionId: 'version-1',
      etag: '"etag"',
      checksumSha256: 'checksum',
      objectLockRetainUntil: new Date('2026-08-21T12:00:00.000Z'),
    };
  });

  return {
    getInstallation: () => installation,
    getRun: () => run,
    setInstallation: (value: IkasStoreInstallation | null) => {
      installation = value;
    },
    setRun: (value: StoreDataErasureRun | null) => {
      run = value;
    },
    setAfterRunUpdate: (callback: ((updated: StoreDataErasureRun) => void) | null) => {
      afterRunUpdate = callback;
    },
    tx,
  };
}

describe('store review email erasure', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.dispatchRetry.mockResolvedValue(true);
    mocks.dispatchMedia.mockResolvedValue(true);
  });

  it('verifies the immutable journal and finalizes only the exact installation identity', async () => {
    const harness = createErasureHarness();

    const result = await eraseStoreReviewEmailData('store-1', {
      authorizedAppId: 'app-1',
      triggerSource: 'ikas_store_app_deleted',
      now: NOW,
    });

    expect(result.state).toBe('succeeded');
    expect(mocks.writeJournal).toHaveBeenCalledTimes(1);
    expect(harness.tx.authToken.deleteMany).toHaveBeenCalledWith({
      where: { merchantId: 'store-1', authorizedAppId: 'app-1' },
    });
    expect(harness.tx.ikasStoreInstallation.updateMany).toHaveBeenCalledWith({
      where: {
        storeId: 'store-1',
        authorizedAppId: 'app-1',
        generation: 1,
        status: 'erasing',
      },
      data: { status: 'erased', stateVersion: { increment: 1 }, erasedAt: NOW },
    });
  });

  it('closes an old exhausted run as stale before journal or deletion work', async () => {
    const oldRun = runFixture({
      authorizedAppId: 'app-old',
      installationGeneration: 5,
      status: 'error',
      attempts: 8,
      sanitizedErrorCode: 'journal_not_configured',
    });
    const harness = createErasureHarness({
      installation: installationFixture({
        authorizedAppId: 'app-new',
        generation: 6,
        status: 'active',
      }),
      run: oldRun,
    });

    const result = await processStoreDataErasureRun(oldRun.id, NOW);

    expect(result.state).toBe('stale_ignored');
    expect(harness.getRun()).toMatchObject({
      status: 'stale_ignored',
      finishedAt: NOW,
      nextRetryAt: null,
      sanitizedErrorCode: null,
    });
    expect(mocks.writeJournal).not.toHaveBeenCalled();
    expect(harness.tx.review.findMany).not.toHaveBeenCalled();
    expect(harness.tx.authToken.deleteMany).not.toHaveBeenCalled();
  });

  it('does not delete after reinstall wins during the journal network call', async () => {
    const harness = createErasureHarness();
    mocks.writeJournal.mockImplementationOnce(async () => {
      harness.setInstallation(installationFixture({
        authorizedAppId: 'app-new',
        generation: 2,
        stateVersion: 3,
        status: 'active',
        activatedAt: new Date('2026-07-10T12:00:01.000Z'),
      }));
      harness.setRun({
        ...harness.getRun()!,
        status: 'stale_ignored',
        journalStatus: 'verified',
        finishedAt: new Date('2026-07-10T12:00:01.000Z'),
      });
      return {
        key: 'journal-key',
        payloadSha256: 'a'.repeat(64),
        versionId: 'version-1',
        etag: null,
        checksumSha256: 'checksum',
        objectLockRetainUntil: new Date('2026-08-21T12:00:00.000Z'),
      };
    });

    const result = await eraseStoreReviewEmailData('store-1', {
      authorizedAppId: 'app-1',
      triggerSource: 'ikas_store_app_deleted',
      now: NOW,
    });

    expect(result.state).toBe('stale_ignored');
    expect(harness.tx.review.findMany).not.toHaveBeenCalled();
    expect(harness.tx.authToken.deleteMany).not.toHaveBeenCalled();
    expect(harness.getInstallation()).toMatchObject({ authorizedAppId: 'app-new', status: 'active' });
  });

  it('keeps stale closure normalized when a failed journal write finishes after reinstall', async () => {
    const harness = createErasureHarness();
    mocks.writeJournal.mockImplementationOnce(async () => {
      harness.setInstallation(installationFixture({
        authorizedAppId: 'app-new',
        generation: 2,
        stateVersion: 3,
        status: 'active',
        activatedAt: new Date('2026-07-10T12:00:01.000Z'),
      }));
      harness.setRun({
        ...harness.getRun()!,
        status: 'stale_ignored',
        finishedAt: new Date('2026-07-10T12:00:01.000Z'),
        nextRetryAt: new Date('2026-07-10T13:00:00.000Z'),
        journalStatus: 'write_uncertain',
        sanitizedErrorCode: 'journal_write_failed',
      });
      throw new Error('journal_write_failed');
    });

    const result = await eraseStoreReviewEmailData('store-1', {
      authorizedAppId: 'app-1',
      triggerSource: 'ikas_store_app_deleted',
      now: NOW,
    });

    expect(result.state).toBe('stale_ignored');
    expect(harness.getRun()).toMatchObject({
      status: 'stale_ignored',
      nextRetryAt: null,
      sanitizedErrorCode: null,
    });
    expect(harness.tx.review.findMany).not.toHaveBeenCalled();
    expect(harness.tx.authToken.deleteMany).not.toHaveBeenCalled();
  });

  it('stops before the next destructive batch when reinstall wins between batches', async () => {
    const harness = createErasureHarness();
    let reinstalled = false;
    harness.setAfterRunUpdate((updated) => {
      const progress = updated.progress as { phase?: string } | null;
      if (reinstalled || progress?.phase !== 'pending_images') return;
      reinstalled = true;
      harness.setInstallation(installationFixture({
        authorizedAppId: 'app-new',
        generation: 2,
        stateVersion: 3,
        status: 'active',
        activatedAt: new Date('2026-07-10T12:00:01.000Z'),
      }));
      harness.setRun({
        ...updated,
        status: 'stale_ignored',
        finishedAt: new Date('2026-07-10T12:00:01.000Z'),
      });
    });

    const result = await eraseStoreReviewEmailData('store-1', {
      authorizedAppId: 'app-1',
      triggerSource: 'ikas_store_app_deleted',
      now: NOW,
    });

    expect(reinstalled).toBe(true);
    expect(result.state).toBe('stale_ignored');
    expect(harness.tx.pendingReviewImage.findMany).not.toHaveBeenCalled();
    expect(harness.tx.authToken.deleteMany).not.toHaveBeenCalled();
  });

  it('returns an existing nonterminal webhook run without bypassing retry ownership', async () => {
    const existing = runFixture({ status: 'error', attempts: 2 });
    const harness = createErasureHarness({
      installation: installationFixture({ status: 'erasing' }),
      run: existing,
    });

    const result = await eraseStoreReviewEmailData('store-1', {
      authorizedAppId: 'app-1',
      triggerSource: 'ikas_store_app_deleted',
      now: NOW,
    });

    expect(result).toMatchObject({ runId: existing.id, state: 'pending' });
    expect(mocks.writeJournal).not.toHaveBeenCalled();
    expect(harness.tx.storeDataErasureRun.create).not.toHaveBeenCalled();
  });

  it('does not restart an exhausted run from a duplicate provider webhook', async () => {
    const existing = runFixture({ status: 'error', attempts: 8 });
    const harness = createErasureHarness({
      installation: installationFixture({ status: 'erasing' }),
      run: existing,
    });

    const result = await eraseStoreReviewEmailData('store-1', {
      authorizedAppId: 'app-1',
      triggerSource: 'ikas_store_app_deleted',
      now: NOW,
    });

    expect(result).toMatchObject({ runId: existing.id, state: 'exhausted' });
    expect(mocks.writeJournal).not.toHaveBeenCalled();
    expect(harness.tx.storeDataErasureRun.create).not.toHaveBeenCalled();
  });

  it('marks a restore replay stale when a newer generation is active', async () => {
    const replay = runFixture({
      authorizedAppId: null,
      installationGeneration: 5,
      triggerSource: 'journal_restore_replay',
      status: 'pending',
      journalStatus: 'verified',
      createdAt: new Date('2026-07-01T12:00:00.000Z'),
      startedAt: new Date('2026-07-01T12:00:00.000Z'),
    });
    const harness = createErasureHarness({
      installation: installationFixture({
        authorizedAppId: 'app-new',
        generation: 6,
        status: 'active',
        activatedAt: new Date('2026-07-10T12:00:00.000Z'),
      }),
      run: replay,
    });
    prisma.storeDataErasureRun.upsert.mockResolvedValue(replay);

    const result = await replayStoreDataErasureJournalIntent(
      {
        schemaVersion: 1,
        runId: replay.id,
        storeId: replay.storeId,
        installationGeneration: replay.installationGeneration!,
        action: 'store_uninstall',
        actions: ['delete_auth_token'],
        createdAt: replay.createdAt.toISOString(),
        retentionBaseAt: replay.createdAt.toISOString(),
      },
      {
        key: 'journal-key',
        payloadSha256: 'a'.repeat(64),
        versionId: 'version-1',
        etag: null,
        checksumSha256: 'checksum',
        objectLockRetainUntil: new Date('2026-08-21T12:00:00.000Z'),
      },
      NOW,
    );

    expect(result.state).toBe('stale_ignored');
    expect(harness.tx.authToken.deleteMany).not.toHaveBeenCalled();
  });

  it('does not overwrite an existing live run with restore replay evidence', async () => {
    const liveRun = runFixture({
      triggerSource: 'ikas_store_app_deleted',
      journalKey: null,
      journalPayloadSha256: null,
    });
    const harness = createErasureHarness({
      installation: installationFixture({ status: 'erasing' }),
      run: liveRun,
    });

    await expect(replayStoreDataErasureJournalIntent(
      {
        schemaVersion: 1,
        runId: liveRun.id,
        storeId: liveRun.storeId,
        installationGeneration: liveRun.installationGeneration!,
        action: 'store_uninstall',
        actions: ['delete_auth_token'],
        createdAt: liveRun.createdAt.toISOString(),
        retentionBaseAt: liveRun.createdAt.toISOString(),
      },
      {
        key: 'journal-key',
        payloadSha256: 'a'.repeat(64),
        versionId: 'version-1',
        etag: null,
        checksumSha256: 'checksum',
        objectLockRetainUntil: new Date('2026-08-21T12:00:00.000Z'),
      },
      NOW,
    )).rejects.toThrow('store_erasure_replay_run_conflict');

    expect(harness.tx.storeDataErasureRun.update).not.toHaveBeenCalled();
    expect(harness.tx.storeDataErasureRun.create).not.toHaveBeenCalled();
    expect(harness.getRun()).toEqual(liveRun);
  });

  it('uses CAS retry claims and reports pending separately from failures', async () => {
    prisma.storeDataErasureRun.findMany.mockResolvedValue([{
      id: 'run-1',
      storeId: 'store-1',
      authorizedAppId: 'app-1',
      attempts: 1,
      status: 'error',
      triggerSource: 'ikas_store_app_deleted',
    }]);
    prisma.storeDataErasureRun.count.mockResolvedValue(0);
    prisma.storeDataErasureRun.updateMany.mockResolvedValue({ count: 1 });
    prisma.storeDataErasureRun.findUniqueOrThrow.mockRejectedValue(new Error('temporary_database_failure'));
    prisma.storeDataErasureRun.findUnique.mockResolvedValue({ attempts: 2 });

    await expect(retryFailedStoreReviewEmailErasures({ now: NOW })).resolves.toEqual({
      claimed: 1,
      succeeded: 0,
      pending: 0,
      failed: 1,
      exhausted: 0,
    });
    expect(prisma.storeDataErasureRun.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ id: 'run-1', status: 'error', attempts: 1 }),
      data: expect.objectContaining({ status: 'processing', nextRetryAt: null }),
    }));
  });
});

import { describe, expect, it, vi } from 'vitest';
import { acquireOrderReconciliationLease } from '@/lib/review-email/ikas-orders';

function cursor(overrides: Record<string, unknown> = {}) {
  return {
    storeId: 'store-1',
    authorizedAppId: 'app-1',
    lastCheckpointAt: new Date('2026-07-09T12:00:00.000Z'),
    overlapMinutes: 15,
    leaseOwner: null,
    leaseExpiresAt: null,
    leaseVersion: 4,
    windowStart: null,
    windowEnd: null,
    nextPage: 1,
    status: 'idle',
    lastSuccessAt: null,
    lastErrorAt: null,
    lastErrorCode: null,
    createdAt: new Date('2026-07-01T00:00:00.000Z'),
    updatedAt: new Date('2026-07-09T12:00:00.000Z'),
    ...overrides,
  };
}

describe('ikas order reconciliation lease', () => {
  it('claims a fixed overlap window with a lease-version CAS', async () => {
    const now = new Date('2026-07-10T12:00:00.000Z');
    const cursorModel = {
      upsert: vi.fn().mockResolvedValue(cursor()),
      findUniqueOrThrow: vi.fn().mockResolvedValue(cursor()),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    };
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([{ storeId: 'store-1', authorizedAppId: 'app-1', status: 'active' }]),
      reviewEmailSettings: { findUnique: vi.fn().mockResolvedValue({ enabled: true }) },
      ikasOrderReconciliationCursor: cursorModel,
    };
    const db = {
      $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)),
    };

    const acquisition = await acquireOrderReconciliationLease(db as never, {
      storeId: 'store-1',
      authorizedAppId: 'app-1',
      owner: 'worker-a',
      now,
    });

    expect(acquisition).toMatchObject({
      state: 'acquired',
      lease: {
        owner: 'worker-a',
        version: 5,
        windowStart: new Date('2026-07-09T11:45:00.000Z'),
        windowEnd: now,
        nextPage: 1,
      },
    });
    expect(cursorModel.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ storeId: 'store-1', leaseVersion: 4 }),
        data: expect.objectContaining({ leaseOwner: 'worker-a', leaseVersion: 5, status: 'running' }),
      }),
    );
  });

  it('does not let a second instance own an unexpired lease', async () => {
    const now = new Date('2026-07-10T12:00:00.000Z');
    const cursorModel = {
      upsert: vi.fn().mockResolvedValue(cursor()),
      findUniqueOrThrow: vi.fn().mockResolvedValue(
        cursor({
          leaseOwner: 'worker-a',
          leaseExpiresAt: new Date('2026-07-10T12:05:00.000Z'),
          status: 'running',
        }),
      ),
      updateMany: vi.fn(),
    };
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([{ storeId: 'store-1', authorizedAppId: 'app-1', status: 'active' }]),
      reviewEmailSettings: { findUnique: vi.fn().mockResolvedValue({ enabled: true }) },
      ikasOrderReconciliationCursor: cursorModel,
    };
    const db = {
      $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)),
    };

    const acquisition = await acquireOrderReconciliationLease(db as never, {
      storeId: 'store-1',
      authorizedAppId: 'app-1',
      owner: 'worker-b',
      now,
    });

    expect(acquisition).toEqual({ state: 'lease_busy' });
    expect(cursorModel.updateMany).not.toHaveBeenCalled();
  });

  it('resumes the stored window and next page after a failed owner expires', async () => {
    const now = new Date('2026-07-10T12:00:00.000Z');
    const storedWindowStart = new Date('2026-07-08T00:00:00.000Z');
    const storedWindowEnd = new Date('2026-07-09T00:00:00.000Z');
    const cursorModel = {
      upsert: vi.fn(),
      findUniqueOrThrow: vi.fn().mockResolvedValue(
        cursor({
          leaseOwner: 'worker-a',
          leaseExpiresAt: new Date('2026-07-10T11:59:00.000Z'),
          windowStart: storedWindowStart,
          windowEnd: storedWindowEnd,
          nextPage: 3,
          status: 'error',
        }),
      ),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    };
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([{ storeId: 'store-1', authorizedAppId: 'app-1', status: 'active' }]),
      reviewEmailSettings: { findUnique: vi.fn().mockResolvedValue({ enabled: true }) },
      ikasOrderReconciliationCursor: cursorModel,
    };
    const db = {
      $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)),
    };

    const acquisition = await acquireOrderReconciliationLease(db as never, {
      storeId: 'store-1',
      authorizedAppId: 'app-1',
      owner: 'worker-b',
      now,
    });

    expect(acquisition).toMatchObject({
      state: 'acquired',
      lease: {
        windowStart: storedWindowStart,
        windowEnd: storedWindowEnd,
        nextPage: 3,
      },
    });
  });

  it('does not create a cursor when the merchant setting is disabled', async () => {
    const cursorModel = { upsert: vi.fn() };
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([{ storeId: 'store-1', authorizedAppId: 'app-1', status: 'active' }]),
      reviewEmailSettings: { findUnique: vi.fn().mockResolvedValue({ enabled: false }) },
      ikasOrderReconciliationCursor: cursorModel,
    };
    const db = {
      $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)),
    };

    await expect(
      acquireOrderReconciliationLease(db as never, {
        storeId: 'store-1',
        authorizedAppId: 'app-1',
        owner: 'worker-a',
      }),
    ).resolves.toEqual({ state: 'store_disabled' });
    expect(cursorModel.upsert).not.toHaveBeenCalled();
  });
});

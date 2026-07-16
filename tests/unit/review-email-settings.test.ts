import { describe, expect, it, vi } from 'vitest';
import { buildReviewEmailSettingsWrite, persistReviewEmailSettingsForInstallation, ReviewEmailSettingsError } from '@/lib/review-email/settings';

describe('review email settings validation', () => {
  it('uses the revised timing defaults', () => {
    expect(buildReviewEmailSettingsWrite({})).toMatchObject({
      enabled: false,
      triggerMode: 'delivery',
      firstDelayDays: 1,
      reminderEnabled: true,
      reminderDelayDays: 1,
      maxReminderCount: 1,
    });
  });

  it('validates first and reminder timing ranges in app code', () => {
    expect(() => buildReviewEmailSettingsWrite({ firstDelayDays: 31 })).toThrow(ReviewEmailSettingsError);
    expect(() => buildReviewEmailSettingsWrite({ reminderDelayDays: 0 })).toThrow(ReviewEmailSettingsError);
    expect(() => buildReviewEmailSettingsWrite({ maxReminderCount: 2 })).toThrow(ReviewEmailSettingsError);
  });

  it('fails closed before enablement until the provider-side uninstall webhook is verified', () => {
    process.env.REVIEW_EMAIL_ENABLED = 'true';
    delete process.env.IKAS_APP_DELETED_WEBHOOK_VERIFIED;
    try {
      expect(() => buildReviewEmailSettingsWrite({ enabled: true })).toThrow(
        'IKAS_APP_DELETED_WEBHOOK_VERIFIED must be true after provider-side verification',
      );
    } finally {
      delete process.env.REVIEW_EMAIL_ENABLED;
    }
  });

  it('allows disabling reminders by setting max reminder count to zero', () => {
    expect(buildReviewEmailSettingsWrite({ reminderEnabled: true, maxReminderCount: 0 })).toMatchObject({
      reminderEnabled: true,
      maxReminderCount: 0,
    });
  });

  it('cancels only unsent request work when a merchant disables review email', async () => {
    const data = buildReviewEmailSettingsWrite({ enabled: false });
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([
        {
          storeId: 'store-1',
          authorizedAppId: 'app-1',
          status: 'active',
        },
      ]),
      reviewEmailSettings: {
        findUnique: vi.fn().mockResolvedValue(null),
        upsert: vi.fn().mockResolvedValue({
          id: 'settings-1',
          storeId: 'store-1',
          ...data,
          eligibilityStartsAt: null,
          orderWebhookStatus: 'verified',
          orderWebhookVerifiedAt: null,
          orderWebhookLastErrorCode: null,
        }),
      },
      reviewEmailJob: { updateMany: vi.fn().mockResolvedValue({ count: 2 }) },
      reviewEmailBatch: {
        findMany: vi.fn().mockResolvedValue([]),
        updateMany: vi.fn().mockResolvedValue({ count: 0 }),
      },
      reviewRequest: {
        findMany: vi.fn().mockResolvedValue([{ id: 'request-unsent' }]),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      reviewRequestToken: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
      reviewRequestSession: { updateMany: vi.fn().mockResolvedValue({ count: 1 }) },
    };
    const db = {
      $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)),
    };

    await persistReviewEmailSettingsForInstallation(db as never, 'store-1', 'app-1', data, {}, new Date('2026-07-10T12:00:00.000Z'));

    expect(tx.reviewEmailJob.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          storeId: 'store-1',
          attemptsLog: { none: { sendCommittedAt: { not: null } } },
        }),
        data: expect.objectContaining({ status: 'cancelled', lastErrorCode: 'store_email_disabled' }),
      }),
    );
    expect(tx.reviewEmailBatch.updateMany).toHaveBeenCalledWith({
      where: { storeId: 'store-1', status: { in: ['scheduled', 'sending', 'active'] } },
      data: { emailAccessStatus: 'store_disabled' },
    });
    expect(tx.reviewEmailBatch.findMany).toHaveBeenCalledWith({
      where: {
        storeId: 'store-1',
        status: { in: ['scheduled', 'sending'] },
        firstSentAt: null,
        jobs: { none: { attemptsLog: { some: { sendCommittedAt: { not: null } } } } },
      },
      select: { id: true },
    });
    expect(tx.reviewRequest.findMany).toHaveBeenCalledWith({
      where: {
        storeId: 'store-1',
        status: { in: ['scheduled', 'error'] },
        firstSentAt: null,
      },
      select: { id: true },
    });
    expect(tx.reviewRequestToken.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ requestId: { in: ['request-unsent'] } }),
      }),
    );
  });

  it('sets a new cutoff only on enable and re-enable transitions', async () => {
    const firstCutoff = new Date('2026-07-10T12:00:00.000Z');
    const secondCutoff = new Date('2026-07-20T12:00:00.000Z');
    const enabledData = { ...buildReviewEmailSettingsWrite({}), enabled: true };
    const current = {
      id: 'settings-1',
      storeId: 'store-1',
      ...enabledData,
      eligibilityStartsAt: firstCutoff,
      orderWebhookStatus: 'verified',
      orderWebhookVerifiedAt: firstCutoff,
      orderWebhookLastErrorCode: null,
    };
    const tx = {
      $executeRaw: vi.fn().mockResolvedValue(1),
      $queryRaw: vi.fn().mockResolvedValue([{ storeId: 'store-1', authorizedAppId: 'app-1', status: 'active' }]),
      reviewEmailSettings: {
        findUnique: vi.fn().mockResolvedValue(current),
        upsert: vi.fn().mockImplementation(async ({ update }) => ({ ...current, ...update })),
      },
    };
    const db = { $transaction: vi.fn(async (callback: (value: typeof tx) => unknown) => callback(tx)) };

    const unchanged = await persistReviewEmailSettingsForInstallation(
      db as never,
      'store-1',
      'app-1',
      enabledData,
      {},
      secondCutoff,
    );
    expect(unchanged.eligibilityStartsAt).toEqual(firstCutoff);

    tx.reviewEmailSettings.findUnique.mockResolvedValue({ ...current, enabled: false });
    const reenabled = await persistReviewEmailSettingsForInstallation(
      db as never,
      'store-1',
      'app-1',
      enabledData,
      {},
      secondCutoff,
    );
    expect(reenabled.eligibilityStartsAt).toEqual(secondCutoff);
  });
});

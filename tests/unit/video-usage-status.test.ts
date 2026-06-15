import { describe, expect, it } from 'vitest';
import { buildVideoUsageStatus } from '@/components/home-page/widgets/editor/VideoUsageStatus';

const base = {
  monthlyLimit: 5,
  reservedCount: 1,
  consumedCount: 2,
  usedCount: 3,
  remainingCount: 2,
  effective: true,
  reason: 'enabled' as const,
};

describe('admin video usage status', () => {
  it('keeps merchant intent separate from runtime availability', () => {
    expect(buildVideoUsageStatus(base, false)).toMatchObject({ title: 'Video yorumları kapalı.', tone: 'neutral' });
    expect(buildVideoUsageStatus(base, true)).toMatchObject({ title: 'Video yorumları açık.', tone: 'success' });
  });

  it('shows quota exhaustion without asking the merchant to disable the toggle', () => {
    const status = buildVideoUsageStatus({
      ...base,
      consumedCount: 4,
      usedCount: 5,
      remainingCount: 0,
      effective: false,
      reason: 'quota_exceeded',
    }, true);

    expect(status.title).toBe('Bu ayki video kotası doldu.');
    expect(status.detail).toContain('ayarınız açık kalır');
    expect(status.tone).toBe('warning');
  });
});

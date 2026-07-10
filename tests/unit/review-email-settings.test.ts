import { describe, expect, it } from 'vitest';
import { buildReviewEmailSettingsWrite, ReviewEmailSettingsError } from '@/lib/review-email/settings';

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
    expect(() => buildReviewEmailSettingsWrite({ maxReminderCount: 3 })).toThrow(ReviewEmailSettingsError);
  });

  it('allows disabling reminders by setting max reminder count to zero', () => {
    expect(buildReviewEmailSettingsWrite({ reminderEnabled: true, maxReminderCount: 0 })).toMatchObject({
      reminderEnabled: true,
      maxReminderCount: 0,
    });
  });
});

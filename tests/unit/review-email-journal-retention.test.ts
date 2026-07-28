import { describe, expect, it } from 'vitest';
import { calculateReviewEmailJournalRetention } from '../../scripts/calculate-review-email-journal-retention.mjs';

function register(restoreWindowDays: number) {
  return {
    schemaVersion: 1,
    contractStatus: 'approved_target',
    liveRestoreWindowVerifiedAt: null,
    databaseCopies: [{
      id: 'managed-database',
      restorable: true,
      maximumRestoreWindowDays: restoreWindowDays,
      containsReviewEmailPii: true,
      restoreRequiresJournalReplay: true,
    }],
    journal: {
      minimumActiveRetentionDays: 35,
      versionTailDays: 7,
      calculation: 'max(35,longestRegisteredDatabaseRestoreWindowDays+5)',
    },
  };
}

describe('review email journal retention calculator', () => {
  it('keeps the 35/42 defaults above the approved seven-day Pro daily-backup target', () => {
    expect(calculateReviewEmailJournalRetention(register(7))).toEqual({
      longestRegisteredDatabaseRestoreWindowDays: 7,
      journalActiveRetentionDays: 35,
      journalVersionTailDays: 7,
      journalObjectLockRetentionDays: 42,
    });
  });

  it('extends active and Object Lock retention for a 60-day restore horizon', () => {
    expect(calculateReviewEmailJournalRetention(register(60))).toEqual({
      longestRegisteredDatabaseRestoreWindowDays: 60,
      journalActiveRetentionDays: 65,
      journalVersionTailDays: 7,
      journalObjectLockRetentionDays: 72,
    });
  });
});

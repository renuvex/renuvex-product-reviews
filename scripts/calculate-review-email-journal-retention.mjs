import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const copyRegisterPath = path.join(repoRoot, 'config', 'review-email-copy-register.json');

export function loadReviewEmailCopyRegister(filePath = copyRegisterPath) {
  const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (parsed?.schemaVersion !== 1 || !Array.isArray(parsed.databaseCopies) || !parsed.journal) {
    throw new Error('review email copy register schema is invalid');
  }
  if (!['approved_target', 'verified_current'].includes(parsed.contractStatus)) {
    throw new Error('review email copy register contractStatus is invalid');
  }
  if (parsed.contractStatus === 'verified_current' && typeof parsed.liveRestoreWindowVerifiedAt !== 'string') {
    throw new Error('verified_current copy register requires liveRestoreWindowVerifiedAt');
  }
  for (const copy of parsed.databaseCopies) {
    if (typeof copy.id !== 'string' || typeof copy.restorable !== 'boolean') {
      throw new Error('review email copy register entry is invalid');
    }
    if (!Number.isInteger(copy.maximumRestoreWindowDays) || copy.maximumRestoreWindowDays < 0) {
      throw new Error(`copy ${copy.id} has an invalid maximumRestoreWindowDays`);
    }
    if (copy.restorable && copy.restoreRequiresJournalReplay !== true) {
      throw new Error(`restorable copy ${copy.id} must require journal replay`);
    }
  }
  return parsed;
}

export function calculateReviewEmailJournalRetention(register = loadReviewEmailCopyRegister()) {
  const longestRegisteredDatabaseRestoreWindowDays = Math.max(
    0,
    ...register.databaseCopies.filter((copy) => copy.restorable).map((copy) => copy.maximumRestoreWindowDays),
  );
  const minimumActiveRetentionDays = register.journal.minimumActiveRetentionDays;
  const journalVersionTailDays = register.journal.versionTailDays;
  if (!Number.isInteger(minimumActiveRetentionDays) || minimumActiveRetentionDays < 35) {
    throw new Error('journal minimum active retention must be at least 35 days');
  }
  if (journalVersionTailDays !== 7) throw new Error('journal version tail must remain 7 days');
  const journalActiveRetentionDays = Math.max(
    minimumActiveRetentionDays,
    longestRegisteredDatabaseRestoreWindowDays + 5,
  );
  return {
    longestRegisteredDatabaseRestoreWindowDays,
    journalActiveRetentionDays,
    journalVersionTailDays,
    journalObjectLockRetentionDays: journalActiveRetentionDays + journalVersionTailDays,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.includes('--require-current')) {
    const register = loadReviewEmailCopyRegister();
    if (register.contractStatus !== 'verified_current') {
      throw new Error('live database restore window is not yet verified_current');
    }
  }
  process.stdout.write(`${JSON.stringify(calculateReviewEmailJournalRetention(), null, 2)}\n`);
}

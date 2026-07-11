import { prisma } from '@/lib/prisma';
import { getReviewEmailJournalConfig, isReviewEmailEnabled } from '@/lib/review-email/config';
import { runReviewEmailJournalCoverageCheck } from '@/lib/review-email/journal-coverage';

function argumentValue(name: string): string | null {
  const prefix = `${name}=`;
  return process.argv.find((value) => value.startsWith(prefix))?.slice(prefix.length) ?? null;
}

const approvalId = argumentValue('--approved-change-id');
if (!approvalId || !/^[A-Za-z0-9._:-]{6,128}$/.test(approvalId)) {
  throw new Error('--approved-change-id is required because the check writes audit/replay evidence');
}
const restoreTargetText = argumentValue('--restore-target');
const restoreTargetAt = restoreTargetText ? new Date(restoreTargetText) : undefined;
if (restoreTargetText && (!restoreTargetAt || !Number.isFinite(restoreTargetAt.getTime()))) {
  throw new Error('--restore-target must be an ISO timestamp');
}
const replay = process.argv.includes('--replay');
const baseConfig = getReviewEmailJournalConfig();
const restoreRoleArn = process.env.AWS_REVIEW_EMAIL_JOURNAL_RESTORE_ROLE_ARN?.trim();
if (!restoreRoleArn) throw new Error('AWS_REVIEW_EMAIL_JOURNAL_RESTORE_ROLE_ARN is required');

try {
  if (replay && isReviewEmailEnabled()) throw new Error('REVIEW_EMAIL_ENABLED must be false during journal replay');
  const result = await runReviewEmailJournalCoverageCheck(
    prisma,
    { restoreTargetAt, replayOrphanIntents: replay },
    { config: { ...baseConfig, roleArn: restoreRoleArn } },
  );
  process.stdout.write(`${JSON.stringify({
    approvalId,
    replay,
    status: result.status,
    checkedObjects: result.checkedObjects,
    missingIntents: result.missingIntents,
    conflictingObjects: result.conflictingObjects,
    orphanIntents: result.orphanIntents,
  }, null, 2)}\n`);
  if (result.status !== 'passed') process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}

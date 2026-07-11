import type { Prisma } from '@prisma/client';

const SUBJECT_LOCK_NAMESPACE = 'renuvex:review-email-subject';

export async function lockReviewEmailSubject(
  tx: Prisma.TransactionClient,
  input: { storeId: string; installationGeneration: number; foldedSubjectHash: string },
): Promise<void> {
  const lockKey = `${SUBJECT_LOCK_NAMESPACE}:${input.storeId}:${input.installationGeneration}:${input.foldedSubjectHash}`;
  await tx.$executeRaw`
    SELECT pg_advisory_xact_lock(hashtextextended(${lockKey}, 0))
  `;
}

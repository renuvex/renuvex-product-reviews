import type { Prisma } from '@prisma/client';

const SUBJECT_LOCK_NAMESPACE = 'renuvex:review-email-subject';
const RECIPIENT_LOCK_NAMESPACE = 'renuvex:review-email-recipient';
const TRANSPORT_EVENT_LOCK_NAMESPACE = 'renuvex:review-email-transport-event';

export async function lockReviewEmailSubject(
  tx: Prisma.TransactionClient,
  input: { storeId: string; installationGeneration: number; foldedSubjectHash: string },
): Promise<void> {
  const lockKey = `${SUBJECT_LOCK_NAMESPACE}:${input.storeId}:${input.installationGeneration}:${input.foldedSubjectHash}`;
  await tx.$executeRaw`
    SELECT pg_advisory_xact_lock(hashtextextended(${lockKey}, 0))
  `;
}

export async function lockReviewEmailRecipient(
  tx: Prisma.TransactionClient,
  input: { storeId: string; category: string; foldedSubjectHash: string },
): Promise<void> {
  const lockKey = `${RECIPIENT_LOCK_NAMESPACE}:${input.storeId}:${input.category}:${input.foldedSubjectHash}`;
  await tx.$executeRaw`
    SELECT pg_advisory_xact_lock(hashtextextended(${lockKey}, 0))
  `;
}

export async function lockReviewEmailTransportEvent(
  tx: Prisma.TransactionClient,
  input: { transport: string; transportEventId: string },
): Promise<void> {
  const lockKey = `${TRANSPORT_EVENT_LOCK_NAMESPACE}:${input.transport}:${input.transportEventId}`;
  await tx.$executeRaw`
    SELECT pg_advisory_xact_lock(hashtextextended(${lockKey}, 0))
  `;
}

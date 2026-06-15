import type { Prisma } from '@prisma/client';
import type { MediaJobAction } from '@/lib/media/constants';

export type TransactionClient = Prisma.TransactionClient;

export type EnqueueMediaJobInput = {
  dedupeKey: string;
  storeId?: string | null;
  reviewId?: string | null;
  mediaId?: string | null;
  uploadSessionId?: string | null;
  provider: string;
  action: MediaJobAction;
  resourceType: string;
  payload: Prisma.InputJsonValue;
  availableAt?: Date;
  maxAttempts?: number;
};

export async function enqueueMediaProviderJob(tx: TransactionClient, input: EnqueueMediaJobInput) {
  return tx.mediaProviderJob.upsert({
    where: { dedupeKey: input.dedupeKey },
    create: { ...input, status: 'pending' },
    update: {},
  });
}

export async function supersedeSessionLifecycleJobs(
  tx: TransactionClient,
  sessionId: string,
  actions: MediaJobAction[],
) {
  if (actions.length === 0) return { count: 0 };
  return tx.mediaProviderJob.updateMany({
    where: {
      uploadSessionId: sessionId,
      action: { in: actions },
      status: { in: ['pending', 'failed'] },
    },
    data: {
      status: 'superseded',
      completedAt: new Date(),
      lockedAt: null,
      lastErrorCode: null,
    },
  });
}

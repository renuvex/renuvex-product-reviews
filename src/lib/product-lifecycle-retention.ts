import type { PrismaClient } from '@prisma/client';
import { lockIkasStoreInstallationLifecycle } from '@/lib/ikas-installation-lifecycle';

export const PRODUCT_LIFECYCLE_TERMINAL_RETENTION_DAYS = 42;
export const PRODUCT_LIFECYCLE_RETENTION_BATCH_SIZE = 100;

type RetentionDatabase = Pick<
  PrismaClient,
  '$queryRaw' | '$transaction' | 'productReconciliationSweep'
>;

export type ProductLifecycleRetentionResult = {
  reconciliationRunCandidates: number;
  reconciliationRunsDeleted: number;
  reconciliationSweepCandidates: number;
  reconciliationSweepsDeleted: number;
};

export type ProductLifecycleRetentionScope = 'runs' | 'sweeps' | 'both';

export async function runProductLifecycleRetention(
  db: RetentionDatabase,
  input: { now?: Date; limit?: number; scope?: ProductLifecycleRetentionScope } = {},
): Promise<ProductLifecycleRetentionResult> {
  const now = input.now ?? new Date();
  const cutoff = new Date(
    now.getTime() - PRODUCT_LIFECYCLE_TERMINAL_RETENTION_DAYS * 24 * 60 * 60 * 1000,
  );
  const limit = Math.min(
    Math.max(input.limit ?? PRODUCT_LIFECYCLE_RETENTION_BATCH_SIZE, 1),
    PRODUCT_LIFECYCLE_RETENTION_BATCH_SIZE,
  );
  const scope = input.scope ?? 'both';

  const runCandidates = scope === 'sweeps'
    ? []
    : await db.$queryRaw<Array<{ id: string; storeId: string }>>`
    WITH protected_runs AS (
      SELECT DISTINCT ON (run."storeId") run."id"
      FROM "ProductReconciliationRun" run
      INNER JOIN "IkasStoreInstallation" installation
        ON installation."storeId" = run."storeId"
       AND installation."authorizedAppId" = run."authorizedAppId"
       AND installation."generation" = run."installationGeneration"
       AND installation."stateVersion" = run."installationStateVersion"
       AND installation."status" = 'active'
      WHERE run."status" = 'completed'
      ORDER BY run."storeId", run."finishedAt" DESC NULLS LAST, run."id" DESC
    )
    SELECT run."id", run."storeId"
    FROM "ProductReconciliationRun" run
    WHERE run."status" IN ('completed', 'exhausted', 'stale_ignored')
      AND run."finishedAt" < ${cutoff}
      AND NOT EXISTS (SELECT 1 FROM protected_runs protected WHERE protected."id" = run."id")
    ORDER BY run."finishedAt" ASC, run."id" ASC
    LIMIT ${limit}
  `;

  let reconciliationRunsDeleted = 0;
  for (const candidate of runCandidates) {
    reconciliationRunsDeleted += await db.$transaction(async (tx) => {
      const installation = await lockIkasStoreInstallationLifecycle(tx, candidate.storeId);
      if (installation?.status === 'active') {
        const latestSuccessful = await tx.productReconciliationRun.findFirst({
          where: {
            storeId: installation.storeId,
            authorizedAppId: installation.authorizedAppId,
            installationGeneration: installation.generation,
            installationStateVersion: installation.stateVersion,
            status: 'completed',
          },
          orderBy: [{ finishedAt: 'desc' }, { id: 'desc' }],
          select: { id: true },
        });
        if (latestSuccessful?.id === candidate.id) return 0;
      }
      await tx.productSnapshot.updateMany({
        where: {
          storeId: candidate.storeId,
          lastSeenReconciliationRunId: candidate.id,
        },
        data: { lastSeenReconciliationRunId: null },
      });
      const deleted = await tx.productReconciliationRun.deleteMany({
        where: {
          id: candidate.id,
          storeId: candidate.storeId,
          status: { in: ['completed', 'exhausted', 'stale_ignored'] },
          finishedAt: { lt: cutoff },
        },
      });
      return deleted.count;
    });
  }

  let sweepCandidates: Array<{ id: string }> = [];
  if (scope !== 'runs') {
    const latestSuccessfulSweep = await db.productReconciliationSweep.findFirst({
      where: { status: 'completed' },
      orderBy: [{ finishedAt: 'desc' }, { id: 'desc' }],
      select: { id: true },
    });
    sweepCandidates = await db.productReconciliationSweep.findMany({
      where: {
        status: { in: ['completed', 'exhausted'] },
        finishedAt: { lt: cutoff },
        id: latestSuccessfulSweep ? { not: latestSuccessfulSweep.id } : undefined,
      },
      orderBy: [{ finishedAt: 'asc' }, { id: 'asc' }],
      take: limit,
      select: { id: true },
    });
  }

  let reconciliationSweepsDeleted = 0;
  for (const candidate of sweepCandidates) {
    reconciliationSweepsDeleted += await db.$transaction(async (tx) => {
      const latest = await tx.productReconciliationSweep.findFirst({
        where: { status: 'completed' },
        orderBy: [{ finishedAt: 'desc' }, { id: 'desc' }],
        select: { id: true },
      });
      if (latest?.id === candidate.id) return 0;
      const deleted = await tx.productReconciliationSweep.deleteMany({
        where: {
          id: candidate.id,
          status: { in: ['completed', 'exhausted'] },
          finishedAt: { lt: cutoff },
        },
      });
      return deleted.count;
    });
  }

  return {
    reconciliationRunCandidates: runCandidates.length,
    reconciliationRunsDeleted,
    reconciliationSweepCandidates: sweepCandidates.length,
    reconciliationSweepsDeleted,
  };
}

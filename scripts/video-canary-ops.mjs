// Review Video V1 canary operations.
// Default mode is read-only. Mutations require an explicit store id, matching
// confirmation, requested fields, and --apply.
//
// Usage:
//   pnpm video:canary:ops
//   pnpm video:canary:ops --expect-all-disabled
//   pnpm video:canary:ops --storeId=<merchantId> --quota=5 --toggle=on
//   pnpm video:canary:ops --storeId=<merchantId> --confirmStoreId=<merchantId> --quota=5 --toggle=on --apply

import { PrismaClient } from '@prisma/client';
import {
  buildMutationPreview,
  buildStoreGateRow,
  countBy,
  mergeVideoToggle,
  parseCanaryOptions,
  summarizeGateRows,
} from './video-canary-ops-lib.mjs';

const prisma = new PrismaClient();
const globalEnabled = process.env.VIDEO_REVIEWS_ENABLED === 'true';
let options;

function output(value) {
  if (options?.json) console.log(JSON.stringify(value, null, 2));
  else console.dir(value, { depth: null, colors: process.stdout.isTTY });
}

async function readGateRows(client = prisma) {
  const [stores, widgets] = await Promise.all([
    client.storeSettings.findMany({
      orderBy: { storeId: 'asc' },
      select: { storeId: true, videoMonthlyLimit: true },
    }),
    client.widgetSettings.findMany({
      where: { widgetId: 'reviews' },
      select: { storeId: true, settings: true },
    }),
  ]);
  const widgetsByStore = new Map(widgets.map((row) => [row.storeId, row]));
  return stores.map((store) => buildStoreGateRow(store, widgetsByStore.get(store.storeId), globalEnabled));
}

async function readStoreEvidence(storeId) {
  const month = new Date();
  month.setUTCDate(1);
  month.setUTCHours(0, 0, 0, 0);
  const [usage, sessionStatuses, quotaStates, jobStatuses, jobActions, reviewStatuses, mediaStatuses, pendingStatuses] = await Promise.all([
    prisma.storeVideoUsage.findUnique({
      where: { storeId_month: { storeId, month } },
      select: { reservedCount: true, consumedCount: true, updatedAt: true },
    }),
    prisma.videoUploadSession.groupBy({ by: ['status'], where: { storeId }, _count: { _all: true } }),
    prisma.videoUploadSession.groupBy({ by: ['quotaState'], where: { storeId }, _count: { _all: true } }),
    prisma.mediaProviderJob.groupBy({ by: ['status'], where: { storeId }, _count: { _all: true } }),
    prisma.mediaProviderJob.groupBy({ by: ['action'], where: { storeId }, _count: { _all: true } }),
    prisma.review.groupBy({ by: ['status'], where: { storeId, hasVideo: true }, _count: { _all: true } }),
    prisma.reviewMedia.groupBy({ by: ['processingStatus'], where: { storeId, resourceType: 'video' }, _count: { _all: true } }),
    prisma.pendingReviewImage.groupBy({ by: ['processingStatus'], where: { storeId, resourceType: 'video' }, _count: { _all: true } }),
  ]);
  const recentSessions = await prisma.videoUploadSession.findMany({
    where: { storeId },
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      productId: true,
      status: true,
      quotaState: true,
      bytes: true,
      durationMs: true,
      errorCode: true,
      createdAt: true,
      updatedAt: true,
      streamUid: true,
      ingestObjectKey: true,
    },
  });
  return {
    currentMonth: month.toISOString().slice(0, 10),
    usage: usage ?? { reservedCount: 0, consumedCount: 0, updatedAt: null },
    sessions: { byStatus: countBy(sessionStatuses, 'status'), byQuotaState: countBy(quotaStates, 'quotaState'), recent: recentSessions },
    jobs: { byStatus: countBy(jobStatuses, 'status'), byAction: countBy(jobActions, 'action') },
    videoReviews: { byStatus: countBy(reviewStatuses, 'status') },
    reviewMedia: { byProcessingStatus: countBy(mediaStatuses, 'processingStatus') },
    pendingMedia: { byProcessingStatus: countBy(pendingStatuses, 'processingStatus') },
  };
}

async function applyMutation(storeId, mutation) {
  return prisma.$transaction(async (tx) => {
    const store = await tx.storeSettings.findUnique({ where: { storeId } });
    if (!store) throw new Error(`StoreSettings row not found for ${storeId}`);
    const widget = await tx.widgetSettings.findUnique({ where: { storeId_widgetId: { storeId, widgetId: 'reviews' } } });

    if (mutation.quota !== null) {
      await tx.storeSettings.update({ where: { storeId }, data: { videoMonthlyLimit: mutation.quota } });
    }
    if (mutation.toggle !== null) {
      const settings = mergeVideoToggle(widget?.settings, mutation.toggle);
      await tx.widgetSettings.upsert({
        where: { storeId_widgetId: { storeId, widgetId: 'reviews' } },
        create: { storeId, widgetId: 'reviews', settings },
        update: { settings },
      });
    }
  });
}

async function main() {
  options = parseCanaryOptions(process.argv);
  const beforeRows = await readGateRows();
  const beforeSummary = summarizeGateRows(beforeRows);

  if (options.expectAllDisabled) {
    output({ mode: 'verify-disabled', globalEnabled, summary: beforeSummary, stores: beforeRows });
    if (globalEnabled || !beforeSummary.allDisabled) throw new Error('Video canary gates are not fully disabled');
    return;
  }

  if (!options.storeId) {
    output({ mode: 'report', globalEnabled, summary: beforeSummary, stores: beforeRows });
    return;
  }

  const current = beforeRows.find((row) => row.storeId === options.storeId);
  if (!current) throw new Error(`StoreSettings row not found for ${options.storeId}`);
  const preview = buildMutationPreview(current, options, globalEnabled);
  const evidenceBefore = await readStoreEvidence(options.storeId);

  if (!options.apply) {
    output({
      mode: options.quota !== null || options.toggle !== null ? 'dry-run' : 'report',
      storeId: options.storeId,
      globalEnabled,
      mutation: preview,
      evidence: evidenceBefore,
    });
    return;
  }

  await applyMutation(options.storeId, options);
  const afterRows = await readGateRows();
  const after = afterRows.find((row) => row.storeId === options.storeId);
  output({
    mode: 'apply',
    storeId: options.storeId,
    globalEnabled,
    mutation: preview,
    after,
    summary: summarizeGateRows(afterRows),
    evidence: await readStoreEvidence(options.storeId),
  });
}

main()
  .catch((error) => {
    console.error(`[video-canary-ops] ${error instanceof Error ? error.message : 'unknown_error'}`);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

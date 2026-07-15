import { randomUUID } from 'node:crypto';
import { Prisma } from '@prisma/client';

export const REVIEW_EMAIL_METRICS = [
  'accepted',
  'delivered',
  'delayed',
  'bounced',
  'complained',
  'rejected',
  'failed',
  'outcomeUnknown',
  'skipped',
  'reviewedRequests',
  'reviewsViaReminder',
  'initialRequestsIncluded',
  'reminderRequestsIncluded',
  'batchesWithReview',
  'completedBatches',
  'skippedRequests',
] as const;

export type ReviewEmailMetric = (typeof REVIEW_EMAIL_METRICS)[number];

export type ReviewEmailAnalyticsManifestEntry = {
  dedupeKey: string;
  metricDate: string;
  kind: string;
  templateVersion: string;
  locale: string;
  metric: ReviewEmailMetric;
  delta: number;
};

function utcDay(value: Date): Date {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()));
}

function metricColumn(metric: ReviewEmailMetric): Prisma.Sql {
  if (!REVIEW_EMAIL_METRICS.includes(metric)) throw new Error('review_email_metric_invalid');
  return Prisma.raw(`"${metric}"`);
}

function parseManifest(value: Prisma.JsonValue | null): ReviewEmailAnalyticsManifestEntry[] {
  if (value === null) return [];
  if (!Array.isArray(value)) throw new Error('review_email_analytics_manifest_invalid');
  return value.map((entry) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw new Error('review_email_analytics_manifest_invalid');
    const row = entry as Record<string, Prisma.JsonValue>;
    if (
      typeof row.dedupeKey !== 'string' ||
      typeof row.metricDate !== 'string' ||
      typeof row.kind !== 'string' ||
      typeof row.templateVersion !== 'string' ||
      typeof row.locale !== 'string' ||
      typeof row.metric !== 'string' ||
      !REVIEW_EMAIL_METRICS.includes(row.metric as ReviewEmailMetric) ||
      typeof row.delta !== 'number' ||
      !Number.isInteger(row.delta)
    ) {
      throw new Error('review_email_analytics_manifest_invalid');
    }
    return row as unknown as ReviewEmailAnalyticsManifestEntry;
  });
}

async function lockReceipt(tx: Prisma.TransactionClient, receiptId: string) {
  const rows = await tx.$queryRaw<Array<{
    id: string;
    storeId: string;
    installationGeneration: number;
    exactSubjectHash: string | null;
    analyticsManifest: Prisma.JsonValue | null;
    analyticsClosedAt: Date | null;
    analyticsCloseReason: string | null;
    metricsReversedAt: Date | null;
  }>>`
    SELECT "id", "storeId", "installationGeneration", "exactSubjectHash",
      "analyticsManifest", "analyticsClosedAt", "analyticsCloseReason", "metricsReversedAt"
    FROM "ReviewRequestReceipt"
    WHERE "id" = ${receiptId}
    FOR UPDATE
  `;
  return rows[0] ?? null;
}

async function lockBatch(tx: Prisma.TransactionClient, batchId: string) {
  const rows = await tx.$queryRaw<Array<{
    id: string;
    storeId: string;
    installationGeneration: number;
    recipientEmailHash: string | null;
    analyticsManifest: Prisma.JsonValue | null;
    analyticsClosedAt: Date | null;
    analyticsCloseReason: string | null;
    metricsReversedAt: Date | null;
  }>>`
    SELECT "id", "storeId", "installationGeneration", "recipientEmailHash",
      "analyticsManifest", "analyticsClosedAt", "analyticsCloseReason", "metricsReversedAt"
    FROM "ReviewEmailBatch"
    WHERE "id" = ${batchId}
    FOR UPDATE
  `;
  return rows[0] ?? null;
}

async function applyMetricDelta(
  tx: Prisma.TransactionClient,
  input: {
    storeId: string;
    installationGeneration: number;
    metricDate: Date;
    kind: string;
    templateVersion: string;
    locale: string;
    metric: ReviewEmailMetric;
    delta: number;
  },
): Promise<void> {
  const column = metricColumn(input.metric);
  await tx.$executeRaw(Prisma.sql`
    INSERT INTO "ReviewEmailDailyMetric" (
      "id", "storeId", "installationGeneration", "metricDate", "kind",
      "templateVersion", "locale", ${column}, "createdAt", "updatedAt"
    ) VALUES (
      ${randomUUID()}, ${input.storeId}, ${input.installationGeneration}, ${utcDay(input.metricDate)}, ${input.kind},
      ${input.templateVersion}, ${input.locale}, ${input.delta}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
    )
    ON CONFLICT ("storeId", "installationGeneration", "metricDate", "kind", "templateVersion", "locale")
    DO UPDATE SET ${column} = "ReviewEmailDailyMetric".${column} + ${input.delta},
      "updatedAt" = CURRENT_TIMESTAMP
  `);

  const aggregate = await tx.reviewEmailDailyMetric.findUniqueOrThrow({
    where: {
      storeId_installationGeneration_metricDate_kind_templateVersion_locale: {
        storeId: input.storeId,
        installationGeneration: input.installationGeneration,
        metricDate: utcDay(input.metricDate),
        kind: input.kind,
        templateVersion: input.templateVersion,
        locale: input.locale,
      },
    },
  });
  if (REVIEW_EMAIL_METRICS.some((metric) => aggregate[metric] < 0)) {
    throw new Error('review_email_analytics_negative_aggregate');
  }
}

export async function recordReviewEmailMetricContribution(
  tx: Prisma.TransactionClient,
  input: {
    receiptId: string;
    dedupeKey: string;
    metricDate: Date;
    kind: string;
    templateVersion: string;
    locale: string;
    metric: ReviewEmailMetric;
    delta?: number;
  },
): Promise<'recorded' | 'duplicate' | 'analytics_closed'> {
  const receipt = await lockReceipt(tx, input.receiptId);
  if (!receipt) return 'analytics_closed';
  if (receipt.analyticsClosedAt) return 'analytics_closed';

  const delta = input.delta ?? 1;
  if (!Number.isInteger(delta) || delta === 0) throw new Error('review_email_metric_delta_invalid');
  const metricDate = utcDay(input.metricDate);
  const inserted = await tx.reviewEmailMetricContribution.createMany({
    data: [{
      receiptId: receipt.id,
      storeId: receipt.storeId,
      installationGeneration: receipt.installationGeneration,
      exactSubjectHash: receipt.exactSubjectHash,
      dedupeKey: input.dedupeKey,
      metricDate,
      kind: input.kind,
      templateVersion: input.templateVersion,
      locale: input.locale,
      metric: input.metric,
      delta,
    }],
    skipDuplicates: true,
  });
  if (inserted.count !== 1) return 'duplicate';

  await applyMetricDelta(tx, {
    storeId: receipt.storeId,
    installationGeneration: receipt.installationGeneration,
    metricDate,
    kind: input.kind,
    templateVersion: input.templateVersion,
    locale: input.locale,
    metric: input.metric,
    delta,
  });

  const manifest = parseManifest(receipt.analyticsManifest);
  manifest.push({
    dedupeKey: input.dedupeKey,
    metricDate: metricDate.toISOString(),
    kind: input.kind,
    templateVersion: input.templateVersion,
    locale: input.locale,
    metric: input.metric,
    delta,
  });
  await tx.reviewRequestReceipt.update({
    where: { id: receipt.id },
    data: { analyticsManifest: manifest as unknown as Prisma.InputJsonValue },
  });
  return 'recorded';
}

export async function recordReviewEmailBatchMetricContribution(
  tx: Prisma.TransactionClient,
  input: {
    batchId: string;
    dedupeKey: string;
    metricDate: Date;
    kind: string;
    templateVersion: string;
    locale: string;
    metric: ReviewEmailMetric;
    delta?: number;
  },
): Promise<'recorded' | 'duplicate' | 'analytics_closed'> {
  const batch = await lockBatch(tx, input.batchId);
  if (!batch || batch.analyticsClosedAt) return 'analytics_closed';
  const delta = input.delta ?? 1;
  if (!Number.isInteger(delta) || delta === 0) throw new Error('review_email_metric_delta_invalid');
  const metricDate = utcDay(input.metricDate);
  const inserted = await tx.reviewEmailMetricContribution.createMany({
    data: [{
      batchId: batch.id,
      storeId: batch.storeId,
      installationGeneration: batch.installationGeneration,
      exactSubjectHash: batch.recipientEmailHash,
      dedupeKey: input.dedupeKey,
      metricDate,
      kind: input.kind,
      templateVersion: input.templateVersion,
      locale: input.locale,
      metric: input.metric,
      delta,
    }],
    skipDuplicates: true,
  });
  if (inserted.count !== 1) return 'duplicate';
  await applyMetricDelta(tx, {
    storeId: batch.storeId,
    installationGeneration: batch.installationGeneration,
    metricDate,
    kind: input.kind,
    templateVersion: input.templateVersion,
    locale: input.locale,
    metric: input.metric,
    delta,
  });
  const manifest = parseManifest(batch.analyticsManifest);
  manifest.push({
    dedupeKey: input.dedupeKey,
    metricDate: metricDate.toISOString(),
    kind: input.kind,
    templateVersion: input.templateVersion,
    locale: input.locale,
    metric: input.metric,
    delta,
  });
  await tx.reviewEmailBatch.update({
    where: { id: batch.id },
    data: { analyticsManifest: manifest as unknown as Prisma.InputJsonValue },
  });
  return 'recorded';
}

export async function closeAndReverseReceiptAnalytics(
  tx: Prisma.TransactionClient,
  receiptId: string,
  input: { now: Date; reason: 'subject_erasure' | 'detail_retention' | 'uninstall' },
): Promise<{ reversed: number; alreadyClosed: boolean }> {
  const receipt = await lockReceipt(tx, receiptId);
  if (!receipt) return { reversed: 0, alreadyClosed: true };
  if (receipt.analyticsClosedAt && receipt.metricsReversedAt) return { reversed: 0, alreadyClosed: true };

  const manifest = parseManifest(receipt.analyticsManifest);
  await tx.reviewRequestReceipt.update({
    where: { id: receipt.id },
    data: {
      analyticsClosedAt: receipt.analyticsClosedAt ?? input.now,
      analyticsCloseReason: input.reason,
    },
  });

  if (input.reason !== 'subject_erasure' && input.reason !== 'uninstall') {
    return { reversed: 0, alreadyClosed: Boolean(receipt.analyticsClosedAt) };
  }

  let reversed = 0;
  for (const entry of manifest) {
    await tx.reviewEmailMetricContribution.updateMany({
      where: { dedupeKey: entry.dedupeKey, receiptId: receipt.id, reversedAt: null },
      data: { reversedAt: input.now, exactSubjectHash: null },
    });
    await applyMetricDelta(tx, {
      storeId: receipt.storeId,
      installationGeneration: receipt.installationGeneration,
      metricDate: new Date(entry.metricDate),
      kind: entry.kind,
      templateVersion: entry.templateVersion,
      locale: entry.locale,
      metric: entry.metric,
      delta: -entry.delta,
    });
    reversed += 1;
  }

  await tx.reviewEmailMetricContribution.updateMany({
    where: { receiptId: receipt.id },
    data: { exactSubjectHash: null },
  });
  await tx.reviewRequestReceipt.update({
    where: { id: receipt.id },
    data: {
      exactSubjectHash: null,
      exactSubjectKeyVersion: null,
      analyticsManifest: Prisma.JsonNull,
      metricsReversedAt: input.now,
    },
  });
  return { reversed, alreadyClosed: false };
}

export async function closeAndReverseBatchAnalytics(
  tx: Prisma.TransactionClient,
  batchId: string,
  input: { now: Date; reason: 'subject_erasure' | 'detail_retention' | 'uninstall' },
): Promise<{ reversed: number; alreadyClosed: boolean }> {
  const batch = await lockBatch(tx, batchId);
  if (!batch) return { reversed: 0, alreadyClosed: true };
  if (batch.analyticsClosedAt && batch.metricsReversedAt) return { reversed: 0, alreadyClosed: true };
  const manifest = parseManifest(batch.analyticsManifest);
  await tx.reviewEmailBatch.update({
    where: { id: batch.id },
    data: {
      analyticsClosedAt: batch.analyticsClosedAt ?? input.now,
      analyticsCloseReason: input.reason,
    },
  });
  if (input.reason !== 'subject_erasure' && input.reason !== 'uninstall') {
    return { reversed: 0, alreadyClosed: Boolean(batch.analyticsClosedAt) };
  }
  let reversed = 0;
  for (const entry of manifest) {
    await tx.reviewEmailMetricContribution.updateMany({
      where: { dedupeKey: entry.dedupeKey, batchId: batch.id, reversedAt: null },
      data: { reversedAt: input.now, exactSubjectHash: null },
    });
    await applyMetricDelta(tx, {
      storeId: batch.storeId,
      installationGeneration: batch.installationGeneration,
      metricDate: new Date(entry.metricDate),
      kind: entry.kind,
      templateVersion: entry.templateVersion,
      locale: entry.locale,
      metric: entry.metric,
      delta: -entry.delta,
    });
    reversed += 1;
  }
  await tx.reviewEmailMetricContribution.updateMany({
    where: { batchId: batch.id },
    data: { exactSubjectHash: null },
  });
  await tx.reviewEmailBatch.update({
    where: { id: batch.id },
    data: {
      recipientEmailHash: null,
      recipientEmailFoldedHash: null,
      recipientEmailHashKeyVersion: null,
      recipientEmailEncrypted: null,
      analyticsManifest: Prisma.JsonNull,
      metricsReversedAt: input.now,
      piiScrubbedAt: input.now,
    },
  });
  return { reversed, alreadyClosed: false };
}

export async function receiptAnalyticsClosed(
  tx: Prisma.TransactionClient,
  receiptId: string | null,
): Promise<boolean> {
  if (!receiptId) return false;
  const receipt = await tx.reviewRequestReceipt.findUnique({
    where: { id: receiptId },
    select: { analyticsClosedAt: true },
  });
  return Boolean(receipt?.analyticsClosedAt);
}

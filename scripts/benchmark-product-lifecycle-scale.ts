import fs from 'node:fs/promises';
import path from 'node:path';
import { Prisma, PrismaClient } from '@prisma/client';
import { applyExactProductEvidenceBatch, type ProductLike } from '@/lib/product-snapshots';

const DEFAULT_STORES = 5_000;
const DEFAULT_PRODUCTS_PER_STORE = 500;
const MAX_STORES = 5_000;
const MAX_PRODUCTS_PER_STORE = 500;
const SCAN_PAGE_SIZE = 200;
const INSTALLATION_PAGE_SIZE = 50;
const FLOW_RATE_PER_SECOND = 1;
let benchmarkStage = 'bootstrap';

type RelationMetric = {
  relation: string;
  tableBytes: bigint;
  indexBytes: bigint;
  totalBytes: bigint;
  estimatedLiveRows: bigint;
  deadRows: bigint;
  insertedRows: bigint;
  updatedRows: bigint;
  deletedRows: bigint;
};

type ExactRelationCounts = {
  authTokens: bigint;
  installations: bigint;
  snapshots: bigint;
  runs: bigint;
  observations: bigint;
  coverage: bigint;
  sweeps: bigint;
};

type PlanSummary = {
  nodeType: string;
  planRows: number;
  actualRows: number;
  executionMs: number;
  planningMs: number;
  sharedHitBlocks: number;
  sharedReadBlocks: number;
};

function argument(name: string): string | null {
  const prefix = `--${name}=`;
  return process.argv.find((value) => value.startsWith(prefix))?.slice(prefix.length) ?? null;
}

function positiveInteger(name: string, fallback: number, maximum: number): number {
  const raw = argument(name);
  const parsed = raw === null ? fallback : Number(raw);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > maximum) {
    throw new Error(`invalid_${name.replaceAll('-', '_')}`);
  }
  return parsed;
}

function numberValue(value: bigint | number): number {
  return typeof value === 'bigint' ? Number(value) : value;
}

function bigintString(value: bigint | number): string {
  return String(value);
}

function elapsedMs(startedAt: number): number {
  return Math.round((performance.now() - startedAt) * 100) / 100;
}

async function forceStatsFlush(prisma: PrismaClient): Promise<void> {
  try {
    await prisma.$executeRawUnsafe('SELECT pg_stat_force_next_flush()');
  } catch {
    // Managed PostgreSQL may not expose this helper. Metrics remain best effort.
  }
}

async function walLsn(prisma: PrismaClient): Promise<string> {
  const [row] = await prisma.$queryRawUnsafe<Array<{ lsn: string }>>(
    'SELECT pg_current_wal_lsn()::text AS lsn',
  );
  if (!row?.lsn) throw new Error('scale_wal_lsn_unavailable');
  return row.lsn;
}

async function walBytes(prisma: PrismaClient, start: string, end: string): Promise<string> {
  const [row] = await prisma.$queryRawUnsafe<Array<{ bytes: string }>>(
    `SELECT pg_wal_lsn_diff($1::pg_lsn, $2::pg_lsn)::text AS bytes`,
    end,
    start,
  );
  if (!row?.bytes) throw new Error('scale_wal_diff_unavailable');
  return row.bytes;
}

async function relationMetrics(prisma: PrismaClient): Promise<RelationMetric[]> {
  return prisma.$queryRawUnsafe<RelationMetric[]>(`
    SELECT
      stats.relname AS relation,
      pg_relation_size(stats.relid)::bigint AS "tableBytes",
      pg_indexes_size(stats.relid)::bigint AS "indexBytes",
      pg_total_relation_size(stats.relid)::bigint AS "totalBytes",
      stats.n_live_tup::bigint AS "estimatedLiveRows",
      stats.n_dead_tup::bigint AS "deadRows",
      stats.n_tup_ins::bigint AS "insertedRows",
      stats.n_tup_upd::bigint AS "updatedRows",
      stats.n_tup_del::bigint AS "deletedRows"
    FROM pg_stat_user_tables stats
    WHERE stats.relname IN (
      'AuthToken',
      'IkasStoreInstallation',
      'ProductSnapshot',
      'ProductReconciliationRun',
      'ProductReconciliationObservation',
      'ProductCatalogCoverage',
      'ProductReconciliationSweep'
    )
    ORDER BY stats.relname
  `);
}

async function exactRelationCounts(prisma: PrismaClient): Promise<ExactRelationCounts> {
  const [counts] = await prisma.$queryRawUnsafe<ExactRelationCounts[]>(`
    SELECT
      (SELECT count(*) FROM "AuthToken")::bigint AS "authTokens",
      (SELECT count(*) FROM "IkasStoreInstallation")::bigint AS "installations",
      (SELECT count(*) FROM "ProductSnapshot")::bigint AS "snapshots",
      (SELECT count(*) FROM "ProductReconciliationRun")::bigint AS "runs",
      (SELECT count(*) FROM "ProductReconciliationObservation")::bigint AS "observations",
      (SELECT count(*) FROM "ProductCatalogCoverage")::bigint AS "coverage",
      (SELECT count(*) FROM "ProductReconciliationSweep")::bigint AS "sweeps"
  `);
  if (!counts) throw new Error('scale_exact_counts_unavailable');
  return counts;
}

function serializedCounts(counts: ExactRelationCounts): Record<keyof ExactRelationCounts, string> {
  return Object.fromEntries(
    Object.entries(counts).map(([key, value]) => [key, bigintString(value)]),
  ) as Record<keyof ExactRelationCounts, string>;
}

function serializedMetrics(rows: RelationMetric[]) {
  return rows.map((row) => ({
    relation: row.relation,
    tableBytes: bigintString(row.tableBytes),
    indexBytes: bigintString(row.indexBytes),
    totalBytes: bigintString(row.totalBytes),
    estimatedLiveRows: bigintString(row.estimatedLiveRows),
    deadRows: bigintString(row.deadRows),
    insertedRows: bigintString(row.insertedRows),
    updatedRows: bigintString(row.updatedRows),
    deletedRows: bigintString(row.deletedRows),
  }));
}

function planSummary(value: unknown): PlanSummary {
  if (!Array.isArray(value) || !value[0] || typeof value[0] !== 'object') {
    throw new Error('scale_explain_shape_invalid');
  }
  const document = value[0] as Record<string, unknown>;
  const plan = document.Plan as Record<string, unknown> | undefined;
  if (!plan) throw new Error('scale_explain_plan_missing');
  const numeric = (key: string) => typeof plan[key] === 'number' ? plan[key] as number : 0;
  return {
    nodeType: String(plan['Node Type'] ?? 'unknown'),
    planRows: numeric('Plan Rows'),
    actualRows: numeric('Actual Rows'),
    executionMs: typeof document['Execution Time'] === 'number' ? document['Execution Time'] : 0,
    planningMs: typeof document['Planning Time'] === 'number' ? document['Planning Time'] : 0,
    sharedHitBlocks: numeric('Shared Hit Blocks'),
    sharedReadBlocks: numeric('Shared Read Blocks'),
  };
}

async function explain(prisma: PrismaClient, sql: string): Promise<PlanSummary> {
  const rows = await prisma.$queryRawUnsafe<Array<Record<string, unknown>>>(
    `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${sql}`,
  );
  return planSummary(rows[0]?.['QUERY PLAN']);
}

async function requireEmptyScaleTarget(prisma: PrismaClient): Promise<void> {
  const counts = await exactRelationCounts(prisma);
  if (Object.values(counts).some((value) => numberValue(value) !== 0)) {
    throw new Error('scale_database_not_empty');
  }
}

async function applyUnchangedSnapshotEvidence(input: {
  prisma: PrismaClient;
  stores: number;
  productsPerStore: number;
  scheduleSlot: string;
  now: Date;
}): Promise<{ changedSnapshots: number; createdSnapshots: number }> {
  let changedSnapshots = 0;
  let createdSnapshots = 0;
  const tx = input.prisma as unknown as Prisma.TransactionClient;

  for (let storeNo = 1; storeNo <= input.stores; storeNo += 1) {
    const storeId = `scale-store-${String(storeNo).padStart(5, '0')}`;
    for (let firstProduct = 1; firstProduct <= input.productsPerStore; firstProduct += SCAN_PAGE_SIZE) {
      const lastProduct = Math.min(firstProduct + SCAN_PAGE_SIZE - 1, input.productsPerStore);
      const entries: Array<{ productId: string; product: ProductLike }> = [];
      for (let productNo = firstProduct; productNo <= lastProduct; productNo += 1) {
        const productId = `scale-product-${String(productNo).padStart(5, '0')}`;
        entries.push({
          productId,
          product: {
            id: productId,
            slug: `product-${productNo}`,
            name: `Synthetic product ${productNo}`,
            createdAt: new Date('2097-01-01T00:00:00.000Z'),
            updatedAt: new Date('2097-12-31T00:00:00.000Z'),
            deleted: false,
          },
        });
      }
      const result = await applyExactProductEvidenceBatch(tx, storeId, entries, {
        source: 'scale_unchanged_sweep',
        now: input.now,
        reconciliationTrigger: 'daily',
        scheduleSlot: input.scheduleSlot,
        provenance: { kind: 'catalog_coverage' },
      });
      changedSnapshots += result.changedSnapshots;
      createdSnapshots += result.createdSnapshots;
    }
  }
  return { changedSnapshots, createdSnapshots };
}

async function main() {
  if (!process.argv.includes('--confirm-disposable')) {
    throw new Error('scale_disposable_confirmation_required');
  }
  const stores = positiveInteger('stores', DEFAULT_STORES, MAX_STORES);
  const productsPerStore = positiveInteger(
    'products-per-store',
    DEFAULT_PRODUCTS_PER_STORE,
    MAX_PRODUCTS_PER_STORE,
  );
  const databaseUrl = process.env.PRODUCT_LIFECYCLE_SCALE_DATABASE_URL;
  if (!databaseUrl) throw new Error('scale_database_url_required');
  const parsed = new URL(databaseUrl);
  const databaseName = decodeURIComponent(parsed.pathname.replace(/^\//, ''));
  const local = ['127.0.0.1', 'localhost', '::1'].includes(parsed.hostname);
  const managedApproved = process.argv.includes('--managed') &&
    process.env.PRODUCT_LIFECYCLE_SCALE_ALLOW_MANAGED === 'true';
  if (!local && !managedApproved) throw new Error('scale_managed_target_not_approved');
  if (!databaseName.startsWith('renuvex_scale_')) throw new Error('scale_database_name_invalid');

  const prisma = new PrismaClient({ datasources: { db: { url: databaseUrl } } });
  const output = path.resolve(argument('output') ?? '.tmp/product-lifecycle-scale-report.json');
  const totalSnapshots = stores * productsPerStore;
  const scheduleSlot = '2098-01-01';

  try {
    benchmarkStage = 'empty_target_check';
    await requireEmptyScaleTarget(prisma);
    const seedWalStart = await walLsn(prisma);
    const seedStartedAt = performance.now();

    benchmarkStage = 'seed_auth_tokens';
    await prisma.$executeRawUnsafe(`
      INSERT INTO "AuthToken" (
        "merchantId", "authorizedAppId", "salesChannelId", "createdAt", "updatedAt",
        "accessToken", "tokenType", "expiresIn", "expireDate", "refreshToken", "scope"
      )
      SELECT
        'scale-store-' || lpad(store_no::text, 5, '0'),
        'scale-app-' || lpad(store_no::text, 5, '0'),
        NULL,
        clock_timestamp(),
        clock_timestamp(),
        'synthetic-access-' || store_no,
        'Bearer',
        3600,
        clock_timestamp() + interval '1 day',
        'synthetic-refresh-' || store_no,
        'read_products'
      FROM generate_series(1, ${stores}) AS store_no
    `);
    benchmarkStage = 'seed_installations';
    await prisma.$executeRawUnsafe(`
      INSERT INTO "IkasStoreInstallation" (
        "storeId", "authorizedAppId", "generation", "stateVersion", "status",
        "activatedAt", "createdAt", "updatedAt"
      )
      SELECT
        'scale-store-' || lpad(store_no::text, 5, '0'),
        'scale-app-' || lpad(store_no::text, 5, '0'),
        1,
        1,
        'active',
        clock_timestamp(),
        clock_timestamp(),
        clock_timestamp()
      FROM generate_series(1, ${stores}) AS store_no
    `);
    benchmarkStage = 'seed_snapshots';
    await prisma.$executeRawUnsafe(`
      INSERT INTO "ProductSnapshot" (
        "id", "storeId", "productId", "slug", "name", "lifecycleState",
        "providerCreatedAt", "ikasUpdatedAt", "lastVerifiedAt", "lastEvidenceSource",
        "absenceObservationCount", "lastSyncedAt", "createdAt", "updatedAt"
      )
      SELECT
        md5(store_no::text || ':' || product_no::text),
        'scale-store-' || lpad(store_no::text, 5, '0'),
        'scale-product-' || lpad(product_no::text, 5, '0'),
        'product-' || product_no,
        'Synthetic product ' || product_no,
        'active_verified',
        TIMESTAMP '2097-01-01 00:00:00',
        TIMESTAMP '2097-12-31 00:00:00',
        clock_timestamp(),
        'scale_seed',
        0,
        clock_timestamp(),
        clock_timestamp(),
        clock_timestamp()
      FROM generate_series(1, ${stores}) AS store_no
      CROSS JOIN generate_series(1, ${productsPerStore}) AS product_no
    `);
    const seedDurationMs = elapsedMs(seedStartedAt);
    const seedWalEnd = await walLsn(prisma);

    await prisma.$executeRawUnsafe('ANALYZE "IkasStoreInstallation"');
    await prisma.$executeRawUnsafe('ANALYZE "ProductSnapshot"');
    await forceStatsFlush(prisma);
    const beforeDaily = await relationMetrics(prisma);
    const snapshotBefore = beforeDaily.find((row) => row.relation === 'ProductSnapshot');
    if (!snapshotBefore) throw new Error('scale_snapshot_metrics_missing');

    const unchangedApplicationWalStart = await walLsn(prisma);
    const unchangedApplicationStartedAt = performance.now();
    benchmarkStage = 'apply_unchanged_snapshot_evidence';
    const unchangedApplication = await applyUnchangedSnapshotEvidence({
      prisma,
      stores,
      productsPerStore,
      scheduleSlot,
      now: new Date(`${scheduleSlot}T03:00:00.000Z`),
    });
    const unchangedApplicationDurationMs = elapsedMs(unchangedApplicationStartedAt);
    const unchangedApplicationWalEnd = await walLsn(prisma);
    await forceStatsFlush(prisma);
    const afterUnchangedApplicationMetrics = await relationMetrics(prisma);
    const snapshotAfterUnchangedApplication = afterUnchangedApplicationMetrics.find(
      (row) => row.relation === 'ProductSnapshot',
    );
    if (!snapshotAfterUnchangedApplication) throw new Error('scale_snapshot_metrics_missing');

    const dailyWalStart = await walLsn(prisma);
    const dailyStartedAt = performance.now();
    benchmarkStage = 'seed_reconciliation_runs';
    await prisma.$executeRawUnsafe(`
      INSERT INTO "ProductReconciliationRun" (
        "id", "storeId", "authorizedAppId", "installationGeneration",
        "installationStateVersion", "trigger", "scheduleSlot", "status", "phase",
        "nextPage", "expectedProductCount", "scannedCount", "verifiedCount", "activeCount",
        "snapshotCreatedCount", "snapshotUpdatedCount", "attempts", "startedAt",
        "finishedAt", "createdAt", "updatedAt"
      )
      SELECT
        md5('run:' || store_no::text),
        'scale-store-' || lpad(store_no::text, 5, '0'),
        'scale-app-' || lpad(store_no::text, 5, '0'),
        1,
        1,
        'daily',
        '${scheduleSlot}',
        'verifying',
        'verify',
        ${Math.ceil(productsPerStore / SCAN_PAGE_SIZE)},
        ${productsPerStore},
        ${productsPerStore},
        ${productsPerStore},
        ${productsPerStore},
        0,
        0,
        0,
        clock_timestamp(),
        NULL,
        clock_timestamp(),
        clock_timestamp()
      FROM generate_series(1, ${stores}) AS store_no
    `);
    benchmarkStage = 'seed_observations';
    await prisma.$executeRawUnsafe(`
      INSERT INTO "ProductReconciliationObservation" (
        "runId", "storeId", "productId", "evidence", "observedAt"
      )
      SELECT
        run."id",
        snapshot."storeId",
        snapshot."productId",
        'present',
        clock_timestamp()
      FROM "ProductSnapshot" snapshot
      INNER JOIN "ProductReconciliationRun" run
        ON run."storeId" = snapshot."storeId"
       AND run."trigger" = 'daily'
       AND run."scheduleSlot" = '${scheduleSlot}'
    `);
    const dailyDurationMs = elapsedMs(dailyStartedAt);
    const dailyWalEnd = await walLsn(prisma);

    benchmarkStage = 'analyze_daily_evidence';
    await prisma.$executeRawUnsafe('ANALYZE "ProductReconciliationRun"');
    await prisma.$executeRawUnsafe('ANALYZE "ProductReconciliationObservation"');
    await prisma.$executeRawUnsafe('ANALYZE "ProductCatalogCoverage"');
    await forceStatsFlush(prisma);
    const peakDailyMetrics = await relationMetrics(prisma);
    const peakDailyCounts = await exactRelationCounts(prisma);

    const batchIds = Array.from(
      { length: Math.min(SCAN_PAGE_SIZE, productsPerStore) },
      (_, index) => `'scale-product-${String(index + 1).padStart(5, '0')}'`,
    ).join(',');
    benchmarkStage = 'query_plans';
    const plans = {
      installationDiscovery: await explain(prisma, `
        SELECT "storeId", "authorizedAppId", "generation", "stateVersion"
        FROM "IkasStoreInstallation"
        WHERE "status" = 'active' AND "storeId" > 'scale-store-02500'
        ORDER BY "storeId" ASC
        LIMIT ${INSTALLATION_PAGE_SIZE}
      `),
      snapshotBatchLookup: await explain(prisma, `
        SELECT "productId", "lifecycleState", "slug", "name", "ikasUpdatedAt"
        FROM "ProductSnapshot"
        WHERE "storeId" = 'scale-store-00001' AND "productId" IN (${batchIds})
      `),
      verificationCandidate: await explain(prisma, `
        SELECT snapshot."productId"
        FROM "ProductSnapshot" snapshot
        WHERE snapshot."storeId" = 'scale-store-00001'
          AND snapshot."lifecycleState" IN ('unknown', 'active_verified')
          AND NOT EXISTS (
            SELECT 1 FROM "ProductReconciliationObservation" observation
            WHERE observation."runId" = md5('run:' || '1')
              AND observation."productId" = snapshot."productId"
          )
        ORDER BY snapshot."productId" ASC
        LIMIT 50
      `),
    };

    const terminalizationWalStart = await walLsn(prisma);
    const terminalizationStartedAt = performance.now();
    benchmarkStage = 'terminalize_reconciliation_runs';
    await prisma.$transaction(async (tx) => {
      await tx.$executeRawUnsafe('DELETE FROM "ProductReconciliationObservation"');
      await tx.$executeRawUnsafe(`
        UPDATE "ProductReconciliationRun"
        SET
          "status" = 'completed',
          "phase" = 'complete',
          "finishedAt" = clock_timestamp(),
          "updatedAt" = clock_timestamp()
        WHERE "trigger" = 'daily' AND "scheduleSlot" = '${scheduleSlot}'
      `);
      await tx.$executeRawUnsafe(`
        INSERT INTO "ProductCatalogCoverage" (
          "storeId", "authorizedAppId", "installationGeneration", "installationStateVersion",
          "reconciliationRunId", "productCount", "completedAt", "createdAt", "updatedAt"
        )
        SELECT
          'scale-store-' || lpad(store_no::text, 5, '0'),
          'scale-app-' || lpad(store_no::text, 5, '0'),
          1,
          1,
          md5('run:' || store_no::text),
          ${productsPerStore},
          clock_timestamp(),
          clock_timestamp(),
          clock_timestamp()
        FROM generate_series(1, ${stores}) AS store_no
      `);
    });
    const terminalizationDurationMs = elapsedMs(terminalizationStartedAt);
    const terminalizationWalEnd = await walLsn(prisma);
    await forceStatsFlush(prisma);
    const afterTerminalizationMetrics = await relationMetrics(prisma);
    const afterTerminalizationCounts = await exactRelationCounts(prisma);

    const scanPagesPerStore = Math.ceil(productsPerStore / SCAN_PAGE_SIZE);
    const runMessages = stores * (scanPagesPerStore + 1);
    const discoveryMessages = Math.ceil(stores / INSTALLATION_PAGE_SIZE) + 1;
    const retentionMessagesWithoutBacklog = 2;
    const totalMessages = runMessages + discoveryMessages + retentionMessagesWithoutBacklog;
    const completionHoursAtConfiguredRate = totalMessages / FLOW_RATE_PER_SECOND / 3600;
    const report = {
      schemaVersion: 3,
      target: {
        environmentClass: local ? 'local_disposable' : 'managed_explicit',
        stores,
        productsPerStore,
        totalSnapshots,
      },
      timings: {
        seedDurationMs,
        unchangedSnapshotApplicationDurationMs: unchangedApplicationDurationMs,
        dailyEvidenceDurationMs: dailyDurationMs,
        terminalizationDurationMs,
      },
      wal: {
        seedBytes: await walBytes(prisma, seedWalStart, seedWalEnd),
        unchangedSnapshotApplicationBytes: await walBytes(
          prisma,
          unchangedApplicationWalStart,
          unchangedApplicationWalEnd,
        ),
        dailyEvidenceBytes: await walBytes(prisma, dailyWalStart, dailyWalEnd),
        terminalizationBytes: await walBytes(
          prisma,
          terminalizationWalStart,
          terminalizationWalEnd,
        ),
      },
      snapshotWriteContract: {
        applicationChangedSnapshots: unchangedApplication.changedSnapshots,
        applicationCreatedSnapshots: unchangedApplication.createdSnapshots,
        unchangedSnapshotUpdates: bigintString(
          snapshotAfterUnchangedApplication.updatedRows - snapshotBefore.updatedRows,
        ),
        expected: '0',
      },
      orchestration: {
        scanPagesPerStore,
        runMessages,
        discoveryMessages,
        retentionMessagesWithoutBacklog,
        totalMessages,
        configuredRatePerSecond: FLOW_RATE_PER_SECOND,
        completionHoursAtConfiguredRate,
        withinMessageCeiling: totalMessages <= 60_000,
        withinCompletionTarget: completionHoursAtConfiguredRate <= 18,
      },
      exactRowCountsAtPeak: serializedCounts(peakDailyCounts),
      exactRowCountsAfterTerminalization: serializedCounts(afterTerminalizationCounts),
      relationMetricsAtPeak: serializedMetrics(peakDailyMetrics),
      relationMetricsAfterTerminalization: serializedMetrics(afterTerminalizationMetrics),
      plans,
      limitations: [
        'Synthetic local data is not a production or provider quota result.',
        'The harness executes the production changed-only snapshot helper with synthetic evidence; it does not call Ikas or QStash.',
        'pg_stat_user_tables row estimates are reported separately from exact row counts.',
        'The synthetic peak creates every store observation concurrently; production flow control limits active runs.',
        'The message estimate models a stable catalog with no exact-verification backlog or delivery retries.',
        'DELETE creates reusable dead space that PostgreSQL autovacuum must reclaim; relation bytes do not shrink immediately.',
        'A managed PostgreSQL run requires separate mutation approval.',
      ],
    };

    if (numberValue(peakDailyCounts.snapshots) !== totalSnapshots) {
      throw new Error('scale_snapshot_count_mismatch');
    }
    if (numberValue(peakDailyCounts.observations) !== totalSnapshots) {
      throw new Error('scale_observation_peak_count_mismatch');
    }
    if (numberValue(afterTerminalizationCounts.observations) !== 0) {
      throw new Error('scale_terminal_observation_retention_detected');
    }
    if (numberValue(afterTerminalizationCounts.coverage) !== stores) {
      throw new Error('scale_terminal_coverage_count_mismatch');
    }
    if (
      report.snapshotWriteContract.applicationChangedSnapshots !== 0 ||
      report.snapshotWriteContract.applicationCreatedSnapshots !== 0 ||
      report.snapshotWriteContract.unchangedSnapshotUpdates !== '0'
    ) {
      throw new Error('scale_unchanged_snapshot_update_detected');
    }
    if (!report.orchestration.withinMessageCeiling || !report.orchestration.withinCompletionTarget) {
      throw new Error('scale_orchestration_target_failed');
    }

    benchmarkStage = 'write_report';
    await fs.mkdir(path.dirname(output), { recursive: true });
    await fs.writeFile(output, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
    console.log(JSON.stringify({
      valid: true,
      stores,
      productsPerStore,
      totalSnapshots,
      totalMessages,
      completionHoursAtConfiguredRate,
      unchangedSnapshotUpdates: report.snapshotWriteContract.unchangedSnapshotUpdates,
      output,
    }));
  } finally {
    await prisma.$disconnect();
  }
}

void main().catch(() => {
  console.error(JSON.stringify({
    error: 'product_lifecycle_scale_benchmark_failed',
    stage: benchmarkStage,
  }));
  process.exitCode = 1;
});

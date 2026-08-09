import { Prisma, PrismaClient } from '@prisma/client';

const EXPECTED_COLUMNS = {
  ProductSnapshot: [
    'lifecycleState',
    'providerCreatedAt',
    'lastVerifiedAt',
    'unavailableAt',
    'conflictDetectedAt',
    'lastEvidenceSource',
    'lastSeenReconciliationRunId',
    'absenceFirstObservedAt',
    'absenceLastObservedAt',
    'absenceObservationCount',
    'absenceLastScheduleSlot',
  ],
  ProductReconciliationRun: [
    'id',
    'storeId',
    'authorizedAppId',
    'installationGeneration',
    'installationStateVersion',
    'trigger',
    'scheduleSlot',
    'status',
    'phase',
    'nextPage',
    'candidateCursor',
    'expectedProductCount',
    'scannedCount',
    'verifiedCount',
    'activeCount',
    'unavailableCount',
    'conflictCount',
    'reconstructedCount',
    'snapshotCreatedCount',
    'snapshotUpdatedCount',
    'attempts',
    'leaseOwner',
    'leaseExpiresAt',
    'nextRetryAt',
    'lastErrorCode',
    'startedAt',
    'finishedAt',
    'createdAt',
    'updatedAt',
  ],
  ProductReconciliationObservation: [
    'runId',
    'storeId',
    'productId',
    'evidence',
    'observedAt',
  ],
  ProductCatalogCoverage: [
    'storeId',
    'authorizedAppId',
    'installationGeneration',
    'installationStateVersion',
    'reconciliationRunId',
    'productCount',
    'completedAt',
    'createdAt',
    'updatedAt',
  ],
  ProductReconciliationSweep: [
    'id',
    'scheduleSlot',
    'status',
    'phase',
    'cursorStoreId',
    'discoveredCount',
    'dispatchedCount',
    'dispatchFailedCount',
    'retainedRunCount',
    'retainedSweepCount',
    'attempts',
    'leaseOwner',
    'leaseExpiresAt',
    'nextRetryAt',
    'lastErrorCode',
    'startedAt',
    'finishedAt',
    'createdAt',
    'updatedAt',
  ],
} as const;

const LIFECYCLE_TABLES = Object.keys(EXPECTED_COLUMNS);

const EXPECTED_CONSTRAINTS = [
  'ProductSnapshot_lifecycleState_check',
  'ProductSnapshot_absence_evidence_check',
  'ProductReconciliationRun_trigger_check',
  'ProductReconciliationRun_status_check',
  'ProductReconciliationRun_phase_check',
  'ProductReconciliationRun_nonnegative_check',
  'ProductReconciliationRun_expected_count_check',
  'ProductReconciliationRun_schedule_slot_check',
  'ProductReconciliationObservation_evidence_check',
  'ProductReconciliationObservation_identity_check',
  'ProductReconciliationObservation_runId_fkey',
  'ProductCatalogCoverage_nonnegative_check',
  'ProductCatalogCoverage_reconciliationRunId_fkey',
  'ProductReconciliationSweep_status_check',
  'ProductReconciliationSweep_phase_check',
  'ProductReconciliationSweep_schedule_slot_check',
  'ProductReconciliationSweep_nonnegative_check',
] as const;

const EXPECTED_INDEXES = [
  'ProductSnapshot_storeId_lifecycleState_lastVerifiedAt_idx',
  'ProductSnapshot_storeId_lastSeenReconciliationRunId_product_idx',
  'ProductReconciliationRun_status_nextRetryAt_createdAt_idx',
  'ProductReconciliationRun_leaseExpiresAt_idx',
  'ProductReconciliationRun_storeId_createdAt_idx',
  'ProductReconciliationRun_storeId_installationGeneration_sta_idx',
  'ProductReconciliationRun_storeId_installationGeneration_tri_key',
  'ProductReconciliationObservation_pkey',
  'ProductReconciliationObservation_storeId_runId_productId_idx',
  'ProductCatalogCoverage_reconciliationRunId_key',
  'ProductReconciliationSweep_scheduleSlot_key',
  'ProductReconciliationSweep_status_nextRetryAt_createdAt_idx',
  'ProductReconciliationSweep_leaseExpiresAt_idx',
  'ProductReconciliationSweep_finishedAt_idx',
  'ProductReconciliationSweep_single_nonterminal_idx',
] as const;

type Expectation = 'expanded' | 'ready';

function parseExpectation(): Expectation {
  const argument = process.argv.find((value) => value.startsWith('--expect='));
  const expectation = argument?.slice('--expect='.length);
  if (expectation === 'expanded' || expectation === 'ready') return expectation;
  throw new Error('expected --expect=expanded or --expect=ready');
}

function toNumber(value: bigint | number): number {
  return typeof value === 'bigint' ? Number(value) : value;
}

async function main() {
  const expectation = parseExpectation();
  const prisma = new PrismaClient();

  try {
    const result = await prisma.$transaction(async (tx) => {
      await tx.$executeRawUnsafe('SET TRANSACTION READ ONLY');
      const columns = await tx.$queryRaw<Array<{ tableName: string; columnName: string }>>`
        SELECT table_name AS "tableName", column_name AS "columnName"
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name IN (${Prisma.join(LIFECYCLE_TABLES)})
      `;
      const columnSet = new Set(columns.map((column) => `${column.tableName}.${column.columnName}`));
      const missingColumns = Object.entries(EXPECTED_COLUMNS)
        .flatMap(([table, names]) => names.map((name) => `${table}.${name}`))
        .filter((column) => !columnSet.has(column));

      const constraints = await tx.$queryRaw<Array<{ name: string }>>`
        SELECT conname AS "name"
        FROM pg_constraint
        WHERE conname IN (${Prisma.join([...EXPECTED_CONSTRAINTS])})
      `;
      const constraintNames = new Set(constraints.map((constraint) => constraint.name));
      const missingConstraints = EXPECTED_CONSTRAINTS.filter((constraint) => !constraintNames.has(constraint));

      const rlsRows = await tx.$queryRaw<Array<{ tableName: string; enabled: boolean }>>`
        SELECT relname AS "tableName", relrowsecurity AS "enabled"
        FROM pg_class
        WHERE relnamespace = 'public'::regnamespace
          AND relname IN (${Prisma.join(LIFECYCLE_TABLES)})
      `;
      const rlsByTable = new Map(rlsRows.map((row) => [row.tableName, row.enabled]));
      const rlsReady = LIFECYCLE_TABLES.every((table) => rlsByTable.get(table) === true);

      const indexes = await tx.$queryRaw<Array<{ name: string }>>`
        SELECT indexname AS "name"
        FROM pg_indexes
        WHERE schemaname = 'public'
          AND indexname IN (${Prisma.join([...EXPECTED_INDEXES])})
      `;
      const indexNames = new Set(indexes.map((index) => index.name));
      const missingIndexes = EXPECTED_INDEXES.filter((index) => !indexNames.has(index));

      const [privileges] = await tx.$queryRaw<Array<{ count: bigint }>>`
        SELECT count(*) AS "count"
        FROM pg_roles role
        CROSS JOIN pg_class relation
        WHERE role.rolname IN ('anon', 'authenticated', 'service_role')
          AND relation.relnamespace = 'public'::regnamespace
          AND relation.relname IN (${Prisma.join(LIFECYCLE_TABLES)})
          AND (
            has_table_privilege(role.rolname, relation.oid, 'SELECT')
            OR has_table_privilege(role.rolname, relation.oid, 'INSERT')
            OR has_table_privilege(role.rolname, relation.oid, 'UPDATE')
            OR has_table_privilege(role.rolname, relation.oid, 'DELETE')
            OR has_table_privilege(role.rolname, relation.oid, 'TRUNCATE')
            OR has_table_privilege(role.rolname, relation.oid, 'REFERENCES')
            OR has_table_privilege(role.rolname, relation.oid, 'TRIGGER')
          )
      `;
      const dataApiPrivilegeCount = toNumber(privileges.count);
      const expanded = missingColumns.length === 0 &&
        missingConstraints.length === 0 &&
        missingIndexes.length === 0 &&
        rlsReady &&
        dataApiPrivilegeCount === 0;

      if (expectation === 'expanded' || !expanded) {
        return {
          valid: expanded,
          expectation,
          expanded,
          missingColumnCount: missingColumns.length,
          missingConstraintCount: missingConstraints.length,
          missingIndexCount: missingIndexes.length,
          rlsReady,
          dataApiPrivilegeCount,
        };
      }

      const now = new Date();
      const freshnessCutoff = new Date(now.getTime() - 36 * 60 * 60 * 1000);
      const [counts] = await tx.$queryRaw<Array<{
        activeInstallations: bigint;
        installationsWithoutFreshCoverage: bigint;
        missingReferencedSnapshots: bigint;
        unknownSnapshots: bigint;
        staleActiveSnapshots: bigint;
        unavailableSnapshots: bigint;
        identityConflictSnapshots: bigint;
        orphanObservations: bigint;
        mismatchedObservations: bigint;
        terminalObservations: bigint;
        invalidCurrentCoverage: bigint;
        stuckRuns: bigint;
        stuckSweeps: bigint;
      }>>`
        WITH active_installations AS (
          SELECT "storeId", "authorizedAppId", "generation", "stateVersion"
          FROM "IkasStoreInstallation"
          WHERE "status" = 'active'
        ),
        current_coverage AS (
          SELECT coverage.*
          FROM "ProductCatalogCoverage" coverage
          INNER JOIN active_installations installation
            ON installation."storeId" = coverage."storeId"
           AND installation."authorizedAppId" = coverage."authorizedAppId"
           AND installation."generation" = coverage."installationGeneration"
           AND installation."stateVersion" = coverage."installationStateVersion"
          INNER JOIN "ProductReconciliationRun" run
            ON run."id" = coverage."reconciliationRunId"
           AND run."storeId" = coverage."storeId"
           AND run."authorizedAppId" = coverage."authorizedAppId"
           AND run."installationGeneration" = coverage."installationGeneration"
           AND run."installationStateVersion" = coverage."installationStateVersion"
           AND run."status" = 'completed'
        ),
        referenced_products AS (
          SELECT review."storeId", review."productId"
          FROM "Review" review
          INNER JOIN active_installations installation ON installation."storeId" = review."storeId"
          UNION
          SELECT summary."storeId", summary."productId"
          FROM "ProductReviewSummary" summary
          INNER JOIN active_installations installation ON installation."storeId" = summary."storeId"
          UNION
          SELECT request."storeId", request."productId"
          FROM "ReviewRequest" request
          INNER JOIN active_installations installation ON installation."storeId" = request."storeId"
          UNION
          SELECT image."storeId", image."productId"
          FROM "PendingReviewImage" image
          INNER JOIN active_installations installation ON installation."storeId" = image."storeId"
          WHERE image."productId" IS NOT NULL
          UNION
          SELECT video."storeId", video."productId"
          FROM "VideoUploadSession" video
          INNER JOIN active_installations installation ON installation."storeId" = video."storeId"
        )
        SELECT
          (SELECT count(*) FROM active_installations) AS "activeInstallations",
          (
            SELECT count(*)
            FROM active_installations installation
            WHERE NOT EXISTS (
              SELECT 1 FROM current_coverage coverage
              WHERE coverage."storeId" = installation."storeId"
                AND coverage."completedAt" >= ${freshnessCutoff}
            )
          ) AS "installationsWithoutFreshCoverage",
          (
            SELECT count(*) FROM referenced_products referenced
            WHERE NOT EXISTS (
              SELECT 1 FROM "ProductSnapshot" snapshot
              WHERE snapshot."storeId" = referenced."storeId"
                AND snapshot."productId" = referenced."productId"
            )
          ) AS "missingReferencedSnapshots",
          (
            SELECT count(*) FROM "ProductSnapshot" snapshot
            INNER JOIN active_installations installation ON installation."storeId" = snapshot."storeId"
            WHERE snapshot."lifecycleState" = 'unknown'
          ) AS "unknownSnapshots",
          (
            SELECT count(*) FROM "ProductSnapshot" snapshot
            INNER JOIN active_installations installation ON installation."storeId" = snapshot."storeId"
            LEFT JOIN current_coverage coverage ON coverage."storeId" = snapshot."storeId"
            WHERE snapshot."lifecycleState" = 'active_verified'
              AND GREATEST(
                COALESCE(snapshot."lastVerifiedAt", '-infinity'::timestamp),
                COALESCE(coverage."completedAt", '-infinity'::timestamp)
              ) < ${freshnessCutoff}
          ) AS "staleActiveSnapshots",
          (
            SELECT count(*) FROM "ProductSnapshot" snapshot
            INNER JOIN active_installations installation ON installation."storeId" = snapshot."storeId"
            WHERE snapshot."lifecycleState" = 'unavailable_verified'
          ) AS "unavailableSnapshots",
          (
            SELECT count(*) FROM "ProductSnapshot" snapshot
            INNER JOIN active_installations installation ON installation."storeId" = snapshot."storeId"
            WHERE snapshot."lifecycleState" = 'identity_conflict'
          ) AS "identityConflictSnapshots",
          (
            SELECT count(*)
            FROM "ProductReconciliationObservation" observation
            LEFT JOIN "ProductReconciliationRun" run ON run."id" = observation."runId"
            WHERE run."id" IS NULL
          ) AS "orphanObservations",
          (
            SELECT count(*)
            FROM "ProductReconciliationObservation" observation
            INNER JOIN "ProductReconciliationRun" run ON run."id" = observation."runId"
            WHERE observation."storeId" <> run."storeId"
          ) AS "mismatchedObservations",
          (
            SELECT count(*)
            FROM "ProductReconciliationObservation" observation
            INNER JOIN "ProductReconciliationRun" run ON run."id" = observation."runId"
            WHERE run."status" IN ('completed', 'exhausted', 'stale_ignored')
          ) AS "terminalObservations",
          (
            SELECT count(*)
            FROM active_installations installation
            INNER JOIN "ProductCatalogCoverage" coverage
              ON coverage."storeId" = installation."storeId"
            LEFT JOIN "ProductReconciliationRun" run
              ON run."id" = coverage."reconciliationRunId"
            WHERE coverage."authorizedAppId" <> installation."authorizedAppId"
               OR coverage."installationGeneration" <> installation."generation"
               OR coverage."installationStateVersion" <> installation."stateVersion"
               OR run."id" IS NULL
               OR run."status" <> 'completed'
               OR run."storeId" <> coverage."storeId"
               OR run."authorizedAppId" <> coverage."authorizedAppId"
               OR run."installationGeneration" <> coverage."installationGeneration"
               OR run."installationStateVersion" <> coverage."installationStateVersion"
          ) AS "invalidCurrentCoverage",
          (
            SELECT count(*)
            FROM "ProductReconciliationRun" run
            WHERE (
              run."status" IN ('pending', 'error')
              AND (run."nextRetryAt" IS NULL OR run."nextRetryAt" <= ${now})
            ) OR (
              run."status" IN ('scanning', 'verifying')
              AND (run."leaseExpiresAt" IS NULL OR run."leaseExpiresAt" <= ${now})
            )
          ) AS "stuckRuns",
          (
            SELECT count(*)
            FROM "ProductReconciliationSweep" sweep
            WHERE (
              sweep."status" IN ('pending', 'error')
              AND (sweep."nextRetryAt" IS NULL OR sweep."nextRetryAt" <= ${now})
            ) OR (
              sweep."status" = 'scanning'
              AND (sweep."leaseExpiresAt" IS NULL OR sweep."leaseExpiresAt" <= ${now})
            )
          ) AS "stuckSweeps"
      `;

      const summary = {
        activeInstallationCount: toNumber(counts.activeInstallations),
        installationsWithoutFreshCoverageCount: toNumber(counts.installationsWithoutFreshCoverage),
        missingReferencedSnapshotCount: toNumber(counts.missingReferencedSnapshots),
        unknownSnapshotCount: toNumber(counts.unknownSnapshots),
        staleActiveSnapshotCount: toNumber(counts.staleActiveSnapshots),
        unavailableSnapshotCount: toNumber(counts.unavailableSnapshots),
        identityConflictSnapshotCount: toNumber(counts.identityConflictSnapshots),
        orphanObservationCount: toNumber(counts.orphanObservations),
        mismatchedObservationCount: toNumber(counts.mismatchedObservations),
        terminalObservationCount: toNumber(counts.terminalObservations),
        invalidCurrentCoverageCount: toNumber(counts.invalidCurrentCoverage),
        stuckRunCount: toNumber(counts.stuckRuns),
        stuckSweepCount: toNumber(counts.stuckSweeps),
      };
      const ready = summary.installationsWithoutFreshCoverageCount === 0 &&
        summary.missingReferencedSnapshotCount === 0 &&
        summary.unknownSnapshotCount === 0 &&
        summary.staleActiveSnapshotCount === 0 &&
        summary.orphanObservationCount === 0 &&
        summary.mismatchedObservationCount === 0 &&
        summary.terminalObservationCount === 0 &&
        summary.invalidCurrentCoverageCount === 0 &&
        summary.stuckRunCount === 0 &&
        summary.stuckSweepCount === 0;
      return { valid: ready, expectation, expanded, ready, ...summary };
    });

    console.log(JSON.stringify(result));
    if (!result.valid) process.exitCode = 1;
  } catch {
    console.error('product_lifecycle_verification_failed');
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void main();

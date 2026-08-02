import { Prisma, PrismaClient } from '@prisma/client';

const EXPECTED_PRODUCT_SNAPSHOT_COLUMNS = [
  'lifecycleState',
  'providerCreatedAt',
  'lastVerifiedAt',
  'unavailableAt',
  'conflictDetectedAt',
  'lastEvidenceSource',
  'lastSeenReconciliationRunId',
] as const;

const EXPECTED_RUN_COLUMNS = [
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
  'scannedCount',
  'verifiedCount',
  'activeCount',
  'unavailableCount',
  'conflictCount',
  'reconstructedCount',
  'attempts',
  'leaseOwner',
  'leaseExpiresAt',
  'nextRetryAt',
  'lastErrorCode',
  'startedAt',
  'finishedAt',
  'createdAt',
  'updatedAt',
] as const;

const EXPECTED_INDEXES = [
  'ProductSnapshot_storeId_lifecycleState_lastVerifiedAt_idx',
  'ProductSnapshot_storeId_lastSeenReconciliationRunId_product_idx',
  'ProductReconciliationRun_status_nextRetryAt_createdAt_idx',
  'ProductReconciliationRun_leaseExpiresAt_idx',
  'ProductReconciliationRun_storeId_createdAt_idx',
  'ProductReconciliationRun_storeId_installationGeneration_sta_idx',
  'ProductReconciliationRun_storeId_installationGeneration_tri_key',
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
        AND table_name IN ('ProductSnapshot', 'ProductReconciliationRun')
    `;
    const columnSet = new Set(columns.map((column) => `${column.tableName}.${column.columnName}`));
    const missingColumns = [
      ...EXPECTED_PRODUCT_SNAPSHOT_COLUMNS.map((column) => `ProductSnapshot.${column}`),
      ...EXPECTED_RUN_COLUMNS.map((column) => `ProductReconciliationRun.${column}`),
    ].filter((column) => !columnSet.has(column));

    const constraints = await tx.$queryRaw<Array<{ name: string }>>`
      SELECT conname AS "name"
      FROM pg_constraint
      WHERE conname IN (
        'ProductSnapshot_lifecycleState_check',
        'ProductReconciliationRun_trigger_check',
        'ProductReconciliationRun_status_check',
        'ProductReconciliationRun_phase_check',
        'ProductReconciliationRun_nonnegative_check'
      )
    `;
    const constraintNames = new Set(constraints.map((constraint) => constraint.name));
    const missingConstraints = [
      'ProductSnapshot_lifecycleState_check',
      'ProductReconciliationRun_trigger_check',
      'ProductReconciliationRun_status_check',
      'ProductReconciliationRun_phase_check',
      'ProductReconciliationRun_nonnegative_check',
    ].filter((constraint) => !constraintNames.has(constraint));

    const rlsRows = await tx.$queryRaw<Array<{ tableName: string; enabled: boolean }>>`
      SELECT relname AS "tableName", relrowsecurity AS "enabled"
      FROM pg_class
      WHERE relnamespace = 'public'::regnamespace
        AND relname IN ('ProductSnapshot', 'ProductReconciliationRun')
    `;
    const rlsByTable = new Map(rlsRows.map((row) => [row.tableName, row.enabled]));
    const rlsReady = rlsByTable.get('ProductSnapshot') === true &&
      rlsByTable.get('ProductReconciliationRun') === true;

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
        AND relation.relname = 'ProductReconciliationRun'
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

    const freshnessCutoff = new Date(Date.now() - 36 * 60 * 60 * 1000);
    const [counts] = await tx.$queryRaw<Array<{
      activeInstallations: bigint;
      installationsWithoutFreshRun: bigint;
      missingReferencedSnapshots: bigint;
      unknownSnapshots: bigint;
      staleActiveSnapshots: bigint;
      unavailableSnapshots: bigint;
      identityConflictSnapshots: bigint;
    }>>`
      WITH active_installations AS (
        SELECT "storeId", "authorizedAppId", "generation", "stateVersion"
        FROM "IkasStoreInstallation"
        WHERE "status" = 'active'
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
            SELECT 1 FROM "ProductReconciliationRun" run
            WHERE run."storeId" = installation."storeId"
              AND run."authorizedAppId" = installation."authorizedAppId"
              AND run."installationGeneration" = installation."generation"
              AND run."installationStateVersion" = installation."stateVersion"
              AND run."status" = 'completed'
              AND run."finishedAt" >= ${freshnessCutoff}
          )
        ) AS "installationsWithoutFreshRun",
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
          WHERE snapshot."lifecycleState" = 'active_verified'
            AND (snapshot."lastVerifiedAt" IS NULL OR snapshot."lastVerifiedAt" < ${freshnessCutoff})
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
        ) AS "identityConflictSnapshots"
    `;

    const summary = {
      activeInstallationCount: toNumber(counts.activeInstallations),
      installationsWithoutFreshRunCount: toNumber(counts.installationsWithoutFreshRun),
      missingReferencedSnapshotCount: toNumber(counts.missingReferencedSnapshots),
      unknownSnapshotCount: toNumber(counts.unknownSnapshots),
      staleActiveSnapshotCount: toNumber(counts.staleActiveSnapshots),
      unavailableSnapshotCount: toNumber(counts.unavailableSnapshots),
      identityConflictSnapshotCount: toNumber(counts.identityConflictSnapshots),
    };
    const ready = summary.installationsWithoutFreshRunCount === 0 &&
      summary.missingReferencedSnapshotCount === 0 &&
      summary.unknownSnapshotCount === 0 &&
      summary.staleActiveSnapshotCount === 0;
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

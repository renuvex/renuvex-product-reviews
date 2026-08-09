import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { readCombinedPrismaSchema } from '../helpers/read-prisma-schema';

const root = process.cwd();
const schema = readCombinedPrismaSchema(root);
const observationSchema = schema.match(/model ProductReconciliationObservation\s*\{[\s\S]*?\n\}/)?.[0] ?? '';
const lifecycleMigration = fs.readFileSync(
  path.join(root, 'prisma', 'migrations', '20260803120000_add_product_lifecycle_evidence', 'migration.sql'),
  'utf8',
);
const absenceMigration = fs.readFileSync(
  path.join(root, 'prisma', 'migrations', '20260809120000_harden_product_lifecycle_evidence', 'migration.sql'),
  'utf8',
);
const scaleMigration = fs.readFileSync(
  path.join(root, 'prisma', 'migrations', '20260809130000_add_product_reconciliation_scale', 'migration.sql'),
  'utf8',
);
const provenanceMigration = fs.readFileSync(
  path.join(root, 'prisma', 'migrations', '20260809140000_add_product_exact_evidence_provenance', 'migration.sql'),
  'utf8',
);

describe('product lifecycle evidence schema', () => {
  it('owns snapshots and reconciliation runs in the lifecycle domain exactly once', () => {
    expect(schema.match(/^model ProductSnapshot\s*{/gm)).toHaveLength(1);
    expect(schema.match(/^model ProductReconciliationRun\s*{/gm)).toHaveLength(1);
    expect(schema.match(/^model ProductReconciliationObservation\s*{/gm)).toHaveLength(1);
    expect(schema.match(/^model ProductCatalogCoverage\s*{/gm)).toHaveLength(1);
    expect(schema.match(/^model ProductReconciliationSweep\s*{/gm)).toHaveLength(1);
    expect(schema).toMatch(/lifecycleState\s+String\s+@default\("unknown"\)/);
    expect(schema).toMatch(/providerCreatedAt\s+DateTime\?/);
    expect(schema).toMatch(/lastVerifiedAt\s+DateTime\?/);
    expect(schema).toMatch(/exactEvidenceAuthorizedAppId\s+String\?\s+@db\.VarChar\(128\)/);
    expect(schema).toMatch(/exactEvidenceGeneration\s+Int\?/);
    expect(schema).toMatch(/exactEvidenceStateVersion\s+Int\?/);
    expect(schema).toMatch(/lastSeenReconciliationRunId\s+String\?/);
    expect(schema).toMatch(/absenceObservationCount\s+Int\s+@default\(0\)/);
    expect(schema).toMatch(/expectedProductCount\s+Int\?/);
    expect(observationSchema).toMatch(/@@id\(\[runId, productId\]\)/);
    expect(observationSchema).toMatch(/@@index\(\[storeId, runId, productId\]\)/);
    expect(observationSchema).not.toMatch(/^\s+(slug|name|providerCreatedAt|ikasUpdatedAt)\s+[^\n]+$/gm);
    expect(schema).toMatch(/phase\s+String\s+@default\("discover"\)/);
    expect(schema).toMatch(/retainedRunCount\s+Int\s+@default\(0\)/);
    expect(schema).toMatch(/retainedSweepCount\s+Int\s+@default\(0\)/);
  });

  it('keeps the migration additive and protects state, status, phase, and Data API access', () => {
    expect(lifecycleMigration).toContain('ADD COLUMN "lifecycleState"');
    expect(lifecycleMigration).toContain('"id" TEXT NOT NULL');
    expect(lifecycleMigration).not.toContain('"id" UUID NOT NULL');
    expect(lifecycleMigration).toContain('ProductSnapshot_lifecycleState_check');
    expect(lifecycleMigration).toContain('ProductReconciliationRun_status_check');
    expect(lifecycleMigration).toContain('ProductReconciliationRun_phase_check');
    expect(absenceMigration).toContain('ProductSnapshot_absence_evidence_check');
    expect(absenceMigration).toContain('ProductReconciliationRun_schedule_slot_check');
    expect(scaleMigration).toContain('ProductReconciliationSweep_phase_check');
    expect(scaleMigration).toContain('ProductReconciliationSweep_single_nonterminal_idx');
    expect(provenanceMigration).toContain('ADD COLUMN "exactEvidenceAuthorizedAppId" VARCHAR(128)');
    expect(provenanceMigration).toContain('ADD COLUMN "exactEvidenceGeneration" INTEGER');
    expect(provenanceMigration).toContain('ADD COLUMN "exactEvidenceStateVersion" INTEGER');
    expect(provenanceMigration).toContain('ProductSnapshot_exact_evidence_provenance_check');
    for (const table of [
      'ProductReconciliationObservation',
      'ProductCatalogCoverage',
      'ProductReconciliationSweep',
    ]) {
      expect(scaleMigration).toContain(`ALTER TABLE "${table}" ENABLE ROW LEVEL SECURITY`);
      expect(scaleMigration).toContain(`REVOKE ALL PRIVILEGES ON TABLE "${table}" FROM PUBLIC`);
    }
    expect(scaleMigration).toContain("ARRAY['anon', 'authenticated', 'service_role']");
    expect([lifecycleMigration, absenceMigration, scaleMigration, provenanceMigration].join('\n'))
      .not.toMatch(/DROP\s+(TABLE|COLUMN)|DELETE\s+FROM\s+"(?:Review|ProductSnapshot)"/i);
    expect(provenanceMigration).not.toMatch(/CREATE\s+(?:UNIQUE\s+)?INDEX|CREATE\s+TABLE/i);
  });
});

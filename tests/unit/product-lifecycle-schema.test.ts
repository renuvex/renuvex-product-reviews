import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { readCombinedPrismaSchema } from '../helpers/read-prisma-schema';

const root = process.cwd();
const schema = readCombinedPrismaSchema(root);
const migration = fs.readFileSync(
  path.join(root, 'prisma', 'migrations', '20260803120000_add_product_lifecycle_evidence', 'migration.sql'),
  'utf8',
);

describe('product lifecycle evidence schema', () => {
  it('owns snapshots and reconciliation runs in the lifecycle domain exactly once', () => {
    expect(schema.match(/^model ProductSnapshot\s*{/gm)).toHaveLength(1);
    expect(schema.match(/^model ProductReconciliationRun\s*{/gm)).toHaveLength(1);
    expect(schema).toMatch(/lifecycleState\s+String\s+@default\("unknown"\)/);
    expect(schema).toMatch(/providerCreatedAt\s+DateTime\?/);
    expect(schema).toMatch(/lastVerifiedAt\s+DateTime\?/);
    expect(schema).toMatch(/lastSeenReconciliationRunId\s+String\?/);
  });

  it('keeps the migration additive and protects state, status, phase, and Data API access', () => {
    expect(migration).toContain('ADD COLUMN "lifecycleState"');
    expect(migration).toContain('"id" TEXT NOT NULL');
    expect(migration).not.toContain('"id" UUID NOT NULL');
    expect(migration).toContain('ProductSnapshot_lifecycleState_check');
    expect(migration).toContain('ProductReconciliationRun_status_check');
    expect(migration).toContain('ProductReconciliationRun_phase_check');
    expect(migration).toContain('ALTER TABLE "ProductReconciliationRun" ENABLE ROW LEVEL SECURITY');
    expect(migration).toContain('REVOKE ALL PRIVILEGES ON TABLE "ProductReconciliationRun" FROM PUBLIC');
    expect(migration).toContain("ARRAY['anon', 'authenticated', 'service_role']");
    expect(migration).not.toMatch(/DROP\s+(TABLE|COLUMN)|DELETE\s+FROM\s+"(?:Review|ProductSnapshot)"/i);
  });
});

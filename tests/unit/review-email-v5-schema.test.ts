import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const schema = fs.readFileSync(path.join(root, 'prisma', 'schema.prisma'), 'utf8');
const migration = fs.readFileSync(
  path.join(root, 'prisma', 'migrations', '20260710210000_add_review_email_retention_analytics_journal', 'migration.sql'),
  'utf8',
);
const lifecycleMigration = fs.readFileSync(
  path.join(root, 'prisma', 'migrations', '20260710120000_add_review_request_email_lifecycle', 'migration.sql'),
  'utf8',
);

describe('review email V5 schema contract', () => {
  it('keeps the DSR idempotency and order-product receipt guarantees at DB level', () => {
    expect(schema).toContain('@@unique([storeId, idempotencyKeyHash])');
    expect(schema).toContain('@@unique([storeId, installationGeneration, orderProductFingerprint], map: "ReviewRequestReceipt_order_product_key")');
    expect(schema).toContain('reviewRequestReceiptId String?');
    expect(schema).toContain('@relation(fields: [reviewRequestReceiptId], references: [id], onDelete: SetNull)');
    expect(migration).toContain('ReviewEmailDataSubjectRun_storeId_idempotencyKeyHash_key');
    expect(migration).toContain('ReviewRequestReceipt_order_product_key');
    expect(schema).toContain('requestDigestKeyVersion      Int?');
    expect(schema).toContain('journalRetentionBaseAt       DateTime?');
    expect(schema).toContain('journalStatus          String    @default("pending")');
    expect(migration).toContain('StoreDataErasureRun_journalStatus_startedAt_idx');
  });

  it('keeps all new customer and journal evidence tables server-only with RLS enabled', () => {
    for (const table of [
      'ReviewEmailSubjectBlock',
      'ReviewRequestReceipt',
      'ReviewEmailDataSubjectRun',
      'ReviewEmailDailyMetric',
      'ReviewEmailMetricContribution',
      'ReviewEmailPurgeRun',
      'ReviewEmailJournalCoverageCheck',
    ]) {
      expect(migration).toContain(`ALTER TABLE "${table}" ENABLE ROW LEVEL SECURITY;`);
    }
  });

  it('prevents order or line parents from cascading unrelated live requests', () => {
    expect(schema).toContain('orderSnapshot                      IkasOrderSnapshot      @relation(fields: [orderSnapshotId], references: [id], onDelete: Restrict)');
    expect(schema).toContain('orderLineSnapshot                  IkasOrderLineSnapshot  @relation(fields: [orderLineSnapshotId], references: [id], onDelete: Restrict)');
    expect(lifecycleMigration).toContain('"ReviewRequest_orderSnapshotId_fkey"\n  FOREIGN KEY ("orderSnapshotId") REFERENCES "IkasOrderSnapshot"("id") ON DELETE RESTRICT');
    expect(lifecycleMigration).toContain('"ReviewRequest_orderLineSnapshotId_fkey"\n  FOREIGN KEY ("orderLineSnapshotId") REFERENCES "IkasOrderLineSnapshot"("id") ON DELETE RESTRICT');
    expect(lifecycleMigration).toContain('"IkasOrderLineSnapshot_orderSnapshotId_fkey"\n  FOREIGN KEY ("orderSnapshotId") REFERENCES "IkasOrderSnapshot"("id") ON DELETE CASCADE');
  });

  it('stores only bounded error codes in unshipped review-email tables', () => {
    expect(schema).toContain('lastErrorCode   String?   @db.VarChar(128)');
    expect(schema).toContain('sanitizedErrorCode     String?   @db.VarChar(128)');
    expect(lifecycleMigration).toContain('"lastErrorCode" VARCHAR(128)');
    expect(lifecycleMigration).toContain('"sanitizedErrorCode" VARCHAR(128)');
    expect(lifecycleMigration).not.toContain('"lastError" VARCHAR(512)');
    expect(lifecycleMigration).not.toContain('"error" VARCHAR(512)');
  });
});

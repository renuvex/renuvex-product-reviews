import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const schema = fs.readFileSync(path.join(root, 'prisma', 'schema.prisma'), 'utf8');
const migration = fs.readFileSync(
  path.join(root, 'prisma', 'migrations', '20260715120000_add_review_email_batch_envelope_v32', 'migration.sql'),
  'utf8',
);
const lifecycleMigration = fs.readFileSync(
  path.join(root, 'prisma', 'migrations', '20260710120000_add_review_request_email_lifecycle', 'migration.sql'),
  'utf8',
);

describe('review email multi-product batch schema contract', () => {
  it('prevents duplicate live delivery groups across HMAC write-key rotations', () => {
    expect(schema).toContain('@@unique([storeId, installationGeneration, batchFingerprint], map: "ReviewEmailBatch_fingerprint_key")');
    expect(migration).toContain('CREATE UNIQUE INDEX "ReviewEmailBatch_live_delivery_group_key"');
    expect(migration).toContain('ON "ReviewEmailBatch"("storeId", "installationGeneration", "orderSnapshotId", "deliveryGroupKey")');
    expect(migration).toContain('WHERE "orderSnapshotId" IS NOT NULL');
    expect(migration).toContain('CONSTRAINT "ReviewEmailBatch_detail_requires_order_check"');
    expect(migration).toContain('CHECK ("detailPurgedAt" IS NOT NULL OR "orderSnapshotId" IS NOT NULL)');
  });

  it('keeps one product request per batch while retaining request-scoped legacy rows', () => {
    expect(migration).toContain('CREATE UNIQUE INDEX "ReviewRequest_batch_product_key"');
    expect(migration).toContain('ON "ReviewRequest"("batchId", "productId") WHERE "batchId" IS NOT NULL');
    expect(schema).toContain('batchId                            String?');
    expect(schema).toContain('requestId        String?');
  });

  it('enforces exactly one batch or request target during additive overlap', () => {
    for (const constraint of [
      'ReviewEmailJob_target_xor_check',
      'ReviewRequestToken_target_xor_check',
      'ReviewRequestSession_target_xor_check',
    ]) {
      expect(migration).toContain(`CONSTRAINT "${constraint}"`);
      expect(migration).toContain('CHECK (("requestId" IS NOT NULL) <> ("batchId" IS NOT NULL))');
    }
  });

  it('requires committed attempts to retain one recipient snapshot until PII scrub', () => {
    expect(migration).toContain('CONSTRAINT "ReviewEmailAttempt_committed_recipient_check"');
    expect(migration).toContain('"sendCommittedAt" IS NULL OR "piiScrubbedAt" IS NOT NULL OR (');
    expect(migration).toContain('"recipientEmailHash" IS NOT NULL');
    expect(migration).toContain('"recipientEmailFoldedHash" IS NOT NULL');
    expect(migration).toContain('"recipientEmailEncrypted" IS NOT NULL');
    expect(schema).not.toContain('recipientCc');
    expect(schema).not.toContain('recipientBcc');
  });

  it('expands event transport without coupling retention to an attempt FK', () => {
    expect(migration).toContain('UPDATE "ReviewEmailEvent"');
    expect(migration).toContain('SET "transport" = \'sns\', "transportEventId" = "snsMessageId"');
    expect(migration).toContain('CREATE UNIQUE INDEX "ReviewEmailEvent_transport_event_key"');
    expect(migration).toContain('WHERE "transport" IS NOT NULL AND "transportEventId" IS NOT NULL');
    expect(schema).toContain('@relation(fields: [attemptId], references: [id], onDelete: SetNull)');
    expect(lifecycleMigration).toContain('"ReviewEmailEvent_attemptId_fkey"');
    expect(lifecycleMigration).toContain('REFERENCES "ReviewEmailAttempt"("id") ON DELETE SET NULL');
  });

  it('keeps new PII-bearing tables server-only', () => {
    for (const table of ['ReviewEmailBatch', 'ReviewEmailUnsubscribeToken']) {
      expect(migration).toContain(`ALTER TABLE "${table}" ENABLE ROW LEVEL SECURITY;`);
    }
    expect(migration).toContain("ARRAY['anon', 'authenticated']");
    expect(migration).toContain('REVOKE ALL PRIVILEGES ON TABLE');
  });

  it('keeps unsubscribe exact identity after its attempt is purged', () => {
    expect(schema).toContain('recipientExactHash                 String              @db.VarChar(128)');
    expect(schema).toContain('recipientExactHashKeyVersion       Int');
    expect(schema).toContain('recipientEmailNormalizationVersion Int                 @default(2)');
    expect(schema).toContain('@@index([storeId, recipientExactHash], map: "ReviewEmailUnsubscribeToken_store_exact_idx")');
    expect(migration).toContain('"recipientExactHash" VARCHAR(128) NOT NULL');
    expect(migration).toContain('"recipientExactHashKeyVersion" INTEGER NOT NULL');
    expect(migration).toContain('"recipientEmailNormalizationVersion" INTEGER NOT NULL DEFAULT 2');
    expect(migration).toContain('CREATE INDEX "ReviewEmailUnsubscribeToken_store_exact_idx"');
    expect(migration).toContain('ON DELETE SET NULL ON UPDATE CASCADE');
  });
});

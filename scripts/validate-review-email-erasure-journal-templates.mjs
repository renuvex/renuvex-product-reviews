import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { calculateReviewEmailJournalRetention } from './calculate-review-email-journal-retention.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bucketTemplate = JSON.parse(fs.readFileSync(path.join(root, 'infra', 'aws', 'review-email-erasure-journal.cloudformation.json'), 'utf8'));
const iamTemplate = JSON.parse(fs.readFileSync(path.join(root, 'infra', 'aws', 'review-email-erasure-journal-iam.cloudformation.json'), 'utf8'));
const expected = calculateReviewEmailJournalRetention();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(bucketTemplate.Parameters?.ActiveRetentionDays?.Default === expected.journalActiveRetentionDays, 'ActiveRetentionDays default differs from copy register.');
assert(bucketTemplate.Parameters?.ObjectLockRetentionDays?.Default === expected.journalObjectLockRetentionDays, 'ObjectLockRetentionDays default differs from copy register.');
assert(expected.journalObjectLockRetentionDays === expected.journalActiveRetentionDays + 7, 'Object Lock retention must equal active retention plus seven days.');
if (process.env.REVIEW_EMAIL_JOURNAL_ACTIVE_RETENTION_DAYS) {
  assert(Number(process.env.REVIEW_EMAIL_JOURNAL_ACTIVE_RETENTION_DAYS) === expected.journalActiveRetentionDays, 'Runtime active retention differs from the copy register.');
}
if (process.env.REVIEW_EMAIL_JOURNAL_OBJECT_LOCK_RETENTION_DAYS) {
  assert(Number(process.env.REVIEW_EMAIL_JOURNAL_OBJECT_LOCK_RETENTION_DAYS) === expected.journalObjectLockRetentionDays, 'Runtime Object Lock retention differs from the copy register.');
}

const bucket = bucketTemplate.Resources?.ReviewEmailErasureJournalBucket;
assert(bucket?.DeletionPolicy === 'Retain' && bucket?.UpdateReplacePolicy === 'Retain', 'Journal bucket must be retained.');
assert(bucket?.Properties?.VersioningConfiguration?.Status === 'Enabled', 'Journal bucket versioning must be enabled.');
assert(bucket?.Properties?.ObjectLockEnabled === true, 'Journal bucket Object Lock must be enabled at creation.');
assert(bucket?.Properties?.ObjectLockConfiguration?.Rule?.DefaultRetention?.Mode === 'GOVERNANCE', 'Journal default lock mode must be GOVERNANCE.');
assert(bucket?.Properties?.ObjectLockConfiguration?.Rule?.DefaultRetention?.Days?.Ref === 'ObjectLockRetentionDays', 'Journal Object Lock must use the calculated parameter.');
const lifecycle = bucket?.Properties?.LifecycleConfiguration?.Rules?.find((rule) => rule.Id === 'BoundedErasureJournalRetention');
assert(lifecycle?.ExpirationInDays?.Ref === 'ActiveRetentionDays', 'Current journal expiration must use ActiveRetentionDays.');
assert(lifecycle?.NoncurrentVersionExpiration?.NoncurrentDays === 7, 'Noncurrent journal versions must retain for seven days.');
assert(lifecycle?.Prefix === 'erasure-journal/v1/2', 'Bounded lifecycle must exclude the permanent coverage genesis object.');
const markerCleanup = bucket?.Properties?.LifecycleConfiguration?.Rules?.find((rule) => rule.Id === 'RemoveExpiredJournalDeleteMarkers');
assert(markerCleanup?.ExpiredObjectDeleteMarker === true, 'Expired journal delete markers must be removed.');

const statements = bucketTemplate.Resources?.ReviewEmailErasureJournalBucketPolicy?.Properties?.PolicyDocument?.Statement ?? [];
assert(statements.some((statement) => statement.Sid === 'DenyInsecureTransport'), 'Journal bucket must deny insecure transport.');
const conditional = statements.find((statement) => statement.Sid === 'DenyJournalWritesWithoutIfNoneMatch');
assert(conditional?.Condition?.StringNotEquals?.['s3:if-none-match'] === '*', 'Journal writes must require If-None-Match: *.');

const writerStatements = iamTemplate.Resources?.JournalWriterRole?.Properties?.Policies?.[0]?.PolicyDocument?.Statement ?? [];
const writerActions = writerStatements.flatMap((statement) => Array.isArray(statement.Action) ? statement.Action : [statement.Action]);
for (const action of ['s3:PutObject', 's3:GetObjectVersion', 's3:GetObjectRetention', 's3:ListBucketVersions']) {
  assert(writerActions.includes(action), `Journal writer is missing ${action}.`);
}
for (const forbidden of ['s3:DeleteObject', 's3:DeleteObjectVersion', 's3:PutObjectRetention', 's3:BypassGovernanceRetention']) {
  assert(!writerActions.includes(forbidden), `Journal writer must not include ${forbidden}.`);
}

const restoreStatements = iamTemplate.Resources?.JournalRestoreOperatorRole?.Properties?.Policies?.[0]?.PolicyDocument?.Statement ?? [];
const restoreActions = restoreStatements.flatMap((statement) => Array.isArray(statement.Action) ? statement.Action : [statement.Action]);
assert(restoreActions.includes('s3:GetObjectLegalHold'), 'Restore reader must verify the genesis legal hold.');

const genesisStatements = iamTemplate.Resources?.JournalGenesisOperatorRole?.Properties?.Policies?.[0]?.PolicyDocument?.Statement ?? [];
const genesisActions = genesisStatements.flatMap((statement) => Array.isArray(statement.Action) ? statement.Action : [statement.Action]);
for (const action of ['s3:PutObject', 's3:PutObjectLegalHold', 's3:GetObjectLegalHold', 's3:GetObjectRetention', 's3:ListBucketVersions']) {
  assert(genesisActions.includes(action), `Genesis operator is missing ${action}.`);
}
for (const forbidden of ['s3:DeleteObject', 's3:DeleteObjectVersion', 's3:PutObjectRetention', 's3:BypassGovernanceRetention']) {
  assert(!genesisActions.includes(forbidden), `Genesis operator must not include ${forbidden}.`);
}

const extensionStatements = iamTemplate.Resources?.JournalRetentionExtensionOperatorRole?.Properties?.Policies?.[0]?.PolicyDocument?.Statement ?? [];
const extensionActions = extensionStatements.flatMap((statement) => Array.isArray(statement.Action) ? statement.Action : [statement.Action]);
assert(extensionActions.includes('s3:PutObjectRetention'), 'Retention-extension role must include PutObjectRetention.');
for (const forbidden of ['s3:DeleteObject', 's3:DeleteObjectVersion', 's3:BypassGovernanceRetention']) {
  assert(!extensionActions.includes(forbidden), `Retention-extension role must not include ${forbidden}.`);
}

console.log('[review-email-journal] copy register and CloudFormation invariants passed');

import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  REVIEW_EMAIL_ACCOUNT_ID,
  REVIEW_EMAIL_REGION,
} from './lib/review-email-cloudformation-contract.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const ACCESS_PATH = resolve(ROOT, 'infra/aws/review-email-deployment-access.cloudformation.json');
const FOUNDATION_PATH = resolve(ROOT, 'infra/aws/review-email-foundation.cloudformation.json');
const profile = readOption('--profile') || process.env.AWS_PROFILE || 'renuvex-readonly';
const region = readOption('--region') || process.env.AWS_REGION || REVIEW_EMAIL_REGION;
const awsCli = resolveAwsCli();

if (region !== REVIEW_EMAIL_REGION) fail(`Policy validation is locked to ${REVIEW_EMAIL_REGION}.`);
const access = JSON.parse(readFileSync(ACCESS_PATH, 'utf8'));
const foundation = JSON.parse(readFileSync(FOUNDATION_PATH, 'utf8'));
const context = {
  'AWS::AccountId': REVIEW_EMAIL_ACCOUNT_ID,
  'AWS::Partition': 'aws',
  'AWS::Region': REVIEW_EMAIL_REGION,
  ApprovedFoundationChangeSetName: 'renuvex-review-email-foundation-validation',
  ApprovedJournalChangeSetName: 'renuvex-review-email-journal-validation',
  ApprovedJournalIamChangeSetName: 'renuvex-review-email-journal-iam-validation',
  ConfigurationSetName: 'renuvex-review-requests-prod',
  DeploymentRegion: REVIEW_EMAIL_REGION,
  FoundationExecutionApprovalExpiresAt: '2099-01-01T00:00:00Z',
  JournalBucketName: access.Parameters.JournalBucketName.Default,
  JournalExecutionApprovalExpiresAt: '2099-01-01T00:00:00Z',
  JournalIamExecutionApprovalExpiresAt: '2099-01-01T00:00:00Z',
  ReviewEmailEventsDlq: 'https://sqs.eu-central-1.amazonaws.com/989086371563/renuvex-review-email-foundation-prod-events-dlq',
  'ReviewEmailEventsDlq.Arn':
    'arn:aws:sqs:eu-central-1:989086371563:renuvex-review-email-foundation-prod-events-dlq',
  ReviewEmailEventsTopic:
    'arn:aws:sns:eu-central-1:989086371563:renuvex-review-email-foundation-prod-events',
  TargetAccountId: REVIEW_EMAIL_ACCOUNT_ID,
};
const policies = [
  {
    document: access.Resources.ReviewEmailOperatorPermissionSet.Properties.InlinePolicy,
    label: 'operator identity policy',
    type: 'IDENTITY_POLICY',
  },
  {
    document:
      access.Resources.ReviewEmailFoundationCloudFormationRole.Properties.Policies[0].PolicyDocument,
    label: 'foundation service-role identity policy',
    type: 'IDENTITY_POLICY',
  },
  {
    document: foundation.Resources.ReviewEmailEventsKey.Properties.KeyPolicy,
    label: 'foundation KMS key policy',
    type: 'RESOURCE_POLICY',
  },
  {
    document: foundation.Resources.ReviewEmailEventsTopicPolicy.Properties.PolicyDocument,
    label: 'foundation SNS topic policy',
    type: 'RESOURCE_POLICY',
  },
  {
    document: foundation.Resources.ReviewEmailEventsDlqPolicy.Properties.PolicyDocument,
    label: 'foundation SQS queue policy',
    type: 'RESOURCE_POLICY',
  },
];

const caller = awsJson(['sts', 'get-caller-identity']);
assert(caller.Account === REVIEW_EMAIL_ACCOUNT_ID, 'AWS caller account is not the locked account.');

const temp = mkdtempSync(join(tmpdir(), 'renuvex-review-email-policy-'));
const summaries = [];
try {
  for (const [index, policy] of policies.entries()) {
    const rendered = renderTemplateValue(policy.document, context);
    const filePath = join(temp, `policy-${index}.json`);
    writeFileSync(filePath, `${JSON.stringify(rendered)}\n`, { encoding: 'utf8', mode: 0o600 });
    const args = [
      'accessanalyzer',
      'validate-policy',
      '--policy-document',
      `file://${filePath.replaceAll('\\', '/')}`,
      '--policy-type',
      policy.type,
    ];
    if (policy.resourceType) {
      args.push('--validate-policy-resource-type', policy.resourceType);
    }
    const response = awsJson(args);
    const findings = response.findings ?? response.Findings ?? [];
    const blocking = findings.filter(({ findingType }) =>
      ['ERROR', 'SECURITY_WARNING'].includes(findingType));
    if (blocking.length > 0) {
      const codes = blocking.map(({ issueCode }) => issueCode).filter(Boolean).sort();
      fail(`${policy.label} has blocking Access Analyzer findings: ${codes.join(', ') || 'unknown'}.`);
    }
    summaries.push({
      blockingFindings: 0,
      findingCount: findings.length,
      label: policy.label,
    });
  }
} finally {
  rmSync(temp, { force: true, recursive: true });
}

process.stdout.write(`${JSON.stringify({ policies: summaries, status: 'passed' }, null, 2)}\n`);

function renderTemplateValue(value, renderContext) {
  if (Array.isArray(value)) return value.map((item) => renderTemplateValue(item, renderContext));
  if (!value || typeof value !== 'object') return value;
  if (typeof value.Ref === 'string') {
    assert(value.Ref in renderContext, `Unresolved CloudFormation Ref: ${value.Ref}.`);
    return renderContext[value.Ref];
  }
  if (value['Fn::GetAtt']) {
    const [logicalId, attribute] = value['Fn::GetAtt'];
    const key = `${logicalId}.${attribute}`;
    assert(key in renderContext, `Unresolved CloudFormation GetAtt: ${key}.`);
    return renderContext[key];
  }
  if (value['Fn::Sub']) {
    const [templateString, variables = {}] = Array.isArray(value['Fn::Sub'])
      ? value['Fn::Sub']
      : [value['Fn::Sub'], {}];
    const replacements = {
      ...renderContext,
      ...Object.fromEntries(
        Object.entries(variables).map(([key, item]) => [key, renderTemplateValue(item, renderContext)]),
      ),
    };
    return templateString.replace(/\$\{([^}]+)\}/g, (_, key) => {
      assert(key in replacements, `Unresolved CloudFormation substitution: ${key}.`);
      return String(replacements[key]);
    });
  }
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, renderTemplateValue(item, renderContext)]),
  );
}

function awsJson(args) {
  const result = spawnSync(
    awsCli,
    [...args, '--profile', profile, '--region', region, '--output', 'json', '--no-cli-pager'],
    { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' },
  );
  if (result.status !== 0) fail(sanitize(result.stderr || result.stdout || `${args[0]} ${args[1]} failed.`));
  try {
    return JSON.parse(result.stdout || '{}');
  } catch {
    fail(`AWS CLI returned invalid JSON for ${args[0]} ${args[1]}.`);
  }
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function fail(message) {
  process.stderr.write(`${String(message).trim()}\n`);
  process.exit(1);
}

function sanitize(value) {
  return String(value)
    .replace(/arn:aws:[^\s"']+/g, '[redacted-arn]')
    .replace(/\b[A-Z0-9]{20}\b/g, '[redacted-access-key-id]')
    .trim();
}

function readOption(name) {
  const prefix = `${name}=`;
  const found = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length).trim() : '';
}

function resolveAwsCli() {
  if (process.env.AWS_CLI) return process.env.AWS_CLI;
  const candidates = [
    commandExistsOnPath('aws') ? 'aws' : '',
    process.env.ProgramFiles ? resolve(process.env.ProgramFiles, 'Amazon/AWSCLIV2/aws.exe') : '',
    process.env['ProgramFiles(x86)']
      ? resolve(process.env['ProgramFiles(x86)'], 'Amazon/AWSCLIV2/aws.exe')
      : '',
  ].filter(Boolean);
  return candidates.find((candidate) => candidate === 'aws' || existsSync(candidate)) || 'aws';
}

function commandExistsOnPath(command) {
  const probe = process.platform === 'win32' ? 'where.exe' : 'which';
  return spawnSync(probe, [command], { encoding: 'utf8', stdio: 'pipe' }).status === 0;
}

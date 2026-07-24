import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { TextDecoder } from 'node:util';

export const REVIEW_EMAIL_ACCOUNT_ID = '989086371563';
export const REVIEW_EMAIL_REGION = 'eu-central-1';
export const REVIEW_EMAIL_ACCESS_STACK_NAME = 'renuvex-review-email-access-prod';
export const REVIEW_EMAIL_FOUNDATION_STACK_NAME = 'renuvex-review-email-foundation-prod';
export const REVIEW_EMAIL_FOUNDATION_ROLE_NAME = 'renuvex-review-email-foundation-cfn';
export const DISABLED_APPROVAL_NAME = 'approval-disabled';
export const DISABLED_APPROVAL_EXPIRY = '1970-01-01T00:00:00Z';

export const FOUNDATION_STACK_TAGS = {
  Environment: 'production',
  Project: 'renuvex-product-reviews',
  Purpose: 'review-request-email',
};

export function canonicalizeJson(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalizeJson).join(',')}]`;
  return `{${Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${canonicalizeJson(value[key])}`)
    .join(',')}}`;
}

export function canonicalJsonSha256(value) {
  return createHash('sha256').update(canonicalizeJson(value), 'utf8').digest('hex');
}

export function readStrictJsonFile(filePath, label = 'JSON file') {
  return parseStrictJsonBytes(readFileSync(filePath), label);
}

export function readStrictJsonAtGitCommit(
  root,
  sourceCommit,
  relativePath,
  label = 'committed JSON file',
) {
  assertGitCommit(sourceCommit);
  const normalizedPath = String(relativePath).replaceAll('\\', '/');
  if (
    normalizedPath.startsWith('/') ||
    normalizedPath.includes('../') ||
    normalizedPath.includes(':') ||
    !/^[A-Za-z0-9._/-]+$/.test(normalizedPath)
  ) {
    throw new Error(`${label} has an unsafe repository path`);
  }

  const result = spawnSync('git', ['show', `${sourceCommit}:${normalizedPath}`], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  if (result.status !== 0) {
    throw new Error(
      `${label} is unavailable at the tagged source commit: ${String(result.stderr).trim()}`,
    );
  }
  return parseStrictJsonBytes(result.stdout, label);
}

export function gitCommitIsAncestor(root, sourceCommit, descendant = 'origin/main') {
  assertGitCommit(sourceCommit);
  const result = spawnSync('git', ['merge-base', '--is-ancestor', sourceCommit, descendant], {
    cwd: root,
    stdio: 'pipe',
  });
  if (result.status === 0) return true;
  if (result.status === 1) return false;
  throw new Error(
    `Unable to verify tagged source ancestry: ${String(result.stderr).trim()}`,
  );
}

export function parseStrictJsonBytes(bytes, label = 'JSON document') {
  let text;
  try {
    text = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes);
  } catch {
    throw new Error(`${label} is not valid UTF-8`);
  }
  return parseStrictJsonText(text, label);
}

export function parseStrictJsonText(text, label = 'JSON document') {
  if (typeof text !== 'string' || text.trim() === '') {
    throw new Error(`${label} is missing`);
  }
  if (text.charCodeAt(0) === 0xfeff) {
    throw new Error(`${label} must not contain a UTF-8 BOM`);
  }

  let value;
  try {
    value = JSON.parse(text);
  } catch {
    throw new Error(`${label} is not valid JSON`);
  }

  assertUnicodeScalarValues(value, label);
  const compactSource = stripInsignificantJsonWhitespace(text);
  if (compactSource !== JSON.stringify(value)) {
    throw new Error(
      `${label} is not strict canonical JSON; duplicate keys, non-canonical escapes, or non-canonical numbers are forbidden`,
    );
  }
  return value;
}

export function parseJsonDocument(value, label = 'JSON document') {
  if (value && typeof value === 'object') {
    assertUnicodeScalarValues(value, label);
    return value;
  }
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${label} is missing`);
  }
  try {
    const parsed = JSON.parse(value);
    assertUnicodeScalarValues(parsed, label);
    return parsed;
  } catch {
    try {
      const parsed = JSON.parse(decodeURIComponent(value));
      assertUnicodeScalarValues(parsed, label);
      return parsed;
    } catch {
      throw new Error(`${label} is not valid JSON`);
    }
  }
}

export function parseSsoPermissionSetPhysicalId(value) {
  const parts = String(value ?? '').split('|');
  if (parts.length !== 2) {
    throw new Error('CloudFormation permission-set physical ID must have two ARN components');
  }
  const instanceArn = parts.find((part) => /^arn:aws:sso:::instance\//.test(part));
  const permissionSetArn = parts.find((part) => /^arn:aws:sso:::permissionSet\//.test(part));
  if (!instanceArn || !permissionSetArn) {
    throw new Error('CloudFormation permission-set physical ID has an unexpected format');
  }
  return { instanceArn, permissionSetArn };
}

export function isExistingStackUpdateChangeSet(changeSet, stack) {
  const changes = changeSet?.Changes ?? [];
  return Boolean(
    changeSet?.StackId &&
      changeSet.StackId === stack?.StackId &&
      changeSet.OnStackFailure == null &&
      changeSet.ImportExistingResources !== true &&
      changes.every(
        (change) =>
          change?.ResourceChange?.Action !== 'Import' &&
          (change?.ResourceChange?.Details ?? []).every(
            (detail) => detail?.ChangeSource !== 'Import',
          ),
      ),
  );
}

export function isDependencyOnlySsoAssignmentChange(
  resourceChange,
  assignmentLogicalId,
  permissionSetLogicalId,
) {
  const normalized = {
    action: resourceChange?.Action,
    details: resourceChange?.Details ?? [],
    logicalResourceId: resourceChange?.LogicalResourceId,
    replacement: resourceChange?.Replacement,
    resourceType: resourceChange?.ResourceType,
    scope: resourceChange?.Scope ?? [],
  };
  const expected = {
    action: 'Modify',
    details: [
      {
        ChangeSource: 'ResourceAttribute',
        CausingEntity: `${permissionSetLogicalId}.PermissionSetArn`,
        Evaluation: 'Dynamic',
        Target: {
          Attribute: 'Properties',
          Name: 'PermissionSetArn',
          RequiresRecreation: 'Always',
        },
      },
    ],
    logicalResourceId: assignmentLogicalId,
    replacement: 'Conditional',
    resourceType: 'AWS::SSO::Assignment',
    scope: ['Properties'],
  };
  return canonicalJsonSha256(normalized) === canonicalJsonSha256(expected);
}

export function declaredResourceTypes(template) {
  return [...new Set(
    Object.values(template?.Resources ?? {})
      .map((resource) => resource?.Type)
      .filter((type) => typeof type === 'string' && type.length > 0),
  )].sort();
}

export function effectiveResourceLogicalIds(template, parameterValues) {
  const conditions = evaluateConditions(template?.Conditions ?? {}, parameterValues);
  return Object.entries(template?.Resources ?? {})
    .filter(([, resource]) => !resource.Condition || conditions[resource.Condition] === true)
    .map(([logicalId]) => logicalId)
    .sort();
}

export function materializeStackPolicy(stackPolicy, effectiveLogicalIds) {
  const effective = new Set(effectiveLogicalIds);
  const statements = [];

  for (const statement of stackPolicy?.Statement ?? []) {
    const resources = Array.isArray(statement.Resource)
      ? statement.Resource
      : [statement.Resource];
    if (resources.includes('*')) {
      if (resources.length !== 1) {
        throw new Error('Stack policy wildcard Resource must not be mixed with logical IDs');
      }
      statements.push(structuredClone(statement));
      continue;
    }

    const filtered = resources.filter((resource) => {
      const match = /^LogicalResourceId\/([A-Za-z0-9]+)$/.exec(resource ?? '');
      if (!match) {
        throw new Error(`Unsupported stack policy Resource: ${String(resource)}`);
      }
      return effective.has(match[1]);
    });
    if (filtered.length === 0) continue;
    statements.push({
      ...structuredClone(statement),
      Resource: Array.isArray(statement.Resource) ? filtered : filtered[0],
    });
  }

  if (statements.length === 0) {
    throw new Error('Effective stack policy must contain at least one statement');
  }
  return { Statement: statements };
}

function evaluateConditions(conditions, parameterValues) {
  const results = {};
  const evaluate = (value) => {
    if (value === null || typeof value !== 'object') return value;
    if ('Ref' in value) {
      const name = value.Ref;
      if (!(name in parameterValues)) throw new Error(`Missing condition parameter: ${name}`);
      return parameterValues[name];
    }
    if ('Fn::Equals' in value) {
      const [left, right] = value['Fn::Equals'];
      return evaluate(left) === evaluate(right);
    }
    if ('Fn::Not' in value) {
      const [operand] = value['Fn::Not'];
      return !Boolean(evaluate(operand));
    }
    if ('Fn::And' in value) return value['Fn::And'].every((operand) => Boolean(evaluate(operand)));
    if ('Fn::Or' in value) return value['Fn::Or'].some((operand) => Boolean(evaluate(operand)));
    throw new Error(`Unsupported CloudFormation condition expression: ${JSON.stringify(value)}`);
  };

  for (const [name, expression] of Object.entries(conditions)) {
    results[name] = Boolean(evaluate(expression));
  }
  return results;
}

function stripInsignificantJsonWhitespace(text) {
  let result = '';
  let inString = false;
  let escaped = false;

  for (const character of text) {
    if (inString) {
      result += character;
      if (escaped) {
        escaped = false;
      } else if (character === '\\') {
        escaped = true;
      } else if (character === '"') {
        inString = false;
      }
      continue;
    }

    if (character === '"') {
      inString = true;
      result += character;
    } else if (!/\s/u.test(character)) {
      result += character;
    }
  }

  return result;
}

function assertUnicodeScalarValues(value, label, path = '$') {
  if (typeof value === 'string') {
    assertScalarString(value, label, path);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertUnicodeScalarValues(item, label, `${path}[${index}]`));
    return;
  }
  if (!value || typeof value !== 'object') return;

  for (const [key, child] of Object.entries(value)) {
    assertScalarString(key, label, `${path}.<key>`);
    assertUnicodeScalarValues(child, label, `${path}.${key}`);
  }
}

function assertScalarString(value, label, path) {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) {
        throw new Error(`${label} contains an unpaired high surrogate at ${path}`);
      }
      index += 1;
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      throw new Error(`${label} contains an unpaired low surrogate at ${path}`);
    }
  }
}

function assertGitCommit(sourceCommit) {
  if (!/^[a-f0-9]{40}$/.test(String(sourceCommit))) {
    throw new Error('Tagged source commit must be a full lowercase Git SHA');
  }
}

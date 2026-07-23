import { createHash } from 'node:crypto';

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

export function parseJsonDocument(value, label = 'JSON document') {
  if (value && typeof value === 'object') return value;
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${label} is missing`);
  }
  try {
    return JSON.parse(value);
  } catch {
    try {
      return JSON.parse(decodeURIComponent(value));
    } catch {
      throw new Error(`${label} is not valid JSON`);
    }
  }
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

import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { createCiEnvironment } from '../../scripts/ci-environment.mjs';

const inheritedKeys = [
  'AWS_REGION',
  'CLOUDFLARE_ACCOUNT_ID',
  'SENTRY_ORG',
  'SUPABASE_PROJECT_ID',
  'VERCEL_ENV',
] as const;

const originalValues = Object.fromEntries(inheritedKeys.map(key => [key, process.env[key]]));

afterEach(() => {
  for (const key of inheritedKeys) {
    const originalValue = originalValues[key];
    if (originalValue === undefined) delete process.env[key];
    else process.env[key] = originalValue;
  }
});

describe('CI server environment', () => {
  it('scrubs inherited provider metadata and replaces required runtime values with synthetic ones', () => {
    for (const key of inheritedKeys) process.env[key] = `production-${key.toLowerCase()}`;

    const environment: Record<string, string | undefined> = createCiEnvironment(path.resolve('.'));

    for (const key of inheritedKeys) expect(environment[key]).toBe('');
    expect(environment.CLIENT_SECRET).toMatch(/^ci-only-secret-/);
    expect(environment.DATABASE_URL).toContain('127.0.0.1:1/renuvex_ci');
    expect(environment.NEXT_PUBLIC_DEPLOY_URL).toBe('https://app.ci.invalid');
    expect(environment.NEXT_PUBLIC_SENTRY_DSN).toBe('');
    expect(environment.REVIEW_EMAIL_ENABLED).toBe('false');
  });
});

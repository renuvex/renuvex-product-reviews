import { describe, expect, it, vi } from 'vitest';
import {
  isIkasInstallationAuthAuditValid,
  readIkasInstallationAuthAudit,
} from '../../scripts/lib/ikas-installation-auth-audit.mjs';

function auditClient(rows: unknown) {
  return {
    $queryRaw: vi.fn().mockResolvedValue(rows),
  } as never;
}

describe('ikas installation auth audit', () => {
  it('accepts only an exact zero-drift result', async () => {
    const summary = await readIkasInstallationAuthAudit(auditClient([{
      missingExactInstallationCount: 0,
      orphanActiveInstallationCount: 0,
    }]));

    expect(isIkasInstallationAuthAuditValid(summary)).toBe(true);
    expect(isIkasInstallationAuthAuditValid({
      missingExactInstallationCount: 1,
      orphanActiveInstallationCount: 0,
    })).toBe(false);
    expect(isIkasInstallationAuthAuditValid({
      missingExactInstallationCount: 0,
      orphanActiveInstallationCount: 1,
    })).toBe(false);
  });

  it.each([
    ['no row', []],
    ['multiple rows', [
      { missingExactInstallationCount: 0, orphanActiveInstallationCount: 0 },
      { missingExactInstallationCount: 0, orphanActiveInstallationCount: 0 },
    ]],
    ['negative count', [{ missingExactInstallationCount: -1, orphanActiveInstallationCount: 0 }]],
    ['non-numeric count', [{ missingExactInstallationCount: 'unknown', orphanActiveInstallationCount: 0 }]],
  ])('fails closed for %s', async (_label, rows) => {
    await expect(readIkasInstallationAuthAudit(auditClient(rows))).rejects.toThrow(
      /ikas_installation_auth_audit_invalid_/,
    );
  });

  it('propagates storage failures to the CLI failure boundary', async () => {
    const db = {
      $queryRaw: vi.fn().mockRejectedValue(new Error('database-canary')),
    } as never;
    await expect(readIkasInstallationAuthAudit(db)).rejects.toThrow('database-canary');
  });
});

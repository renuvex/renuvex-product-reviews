import { describe, expect, it, vi } from 'vitest';
import {
  isSupabaseDataApiSurfaceAuditValid,
  readSupabaseDataApiSurfaceAudit,
} from '../../scripts/lib/supabase-data-api-surface-audit.mjs';

const validRow = {
  rlsDisabledTableCount: 0,
  rlsDisabledTables: [],
  browserSchemaPrivilegeCount: 0,
  browserTablePrivilegeCount: 0,
  browserSequencePrivilegeCount: 0,
  browserRoutinePrivilegeCount: 0,
  disallowedDefaultAclCount: 0,
  ownersMissingFunctionDefaultDenyCount: 0,
  runtimeRlsCompatible: true,
};

function auditClient(rows: unknown) {
  return {
    $queryRaw: vi.fn().mockResolvedValue(rows),
  } as never;
}

describe('Supabase Data API surface audit', () => {
  it('accepts only an RLS-complete, default-deny server-only surface', async () => {
    const summary = await readSupabaseDataApiSurfaceAudit(auditClient([validRow]));
    expect(isSupabaseDataApiSurfaceAuditValid(summary)).toBe(true);
  });

  it.each([
    ['RLS drift', { rlsDisabledTableCount: 1, rlsDisabledTables: ['Review'] }],
    ['schema grant', { browserSchemaPrivilegeCount: 1 }],
    ['table grant', { browserTablePrivilegeCount: 1 }],
    ['sequence grant', { browserSequencePrivilegeCount: 1 }],
    ['routine grant', { browserRoutinePrivilegeCount: 1 }],
    ['default ACL grant', { disallowedDefaultAclCount: 1 }],
    ['implicit future function execute', { ownersMissingFunctionDefaultDenyCount: 1 }],
    ['runtime role blocked by RLS', { runtimeRlsCompatible: false }],
  ])('rejects %s', async (_label, patch) => {
    const summary = await readSupabaseDataApiSurfaceAudit(auditClient([{
      ...validRow,
      ...patch,
    }]));
    expect(isSupabaseDataApiSurfaceAuditValid(summary)).toBe(false);
  });

  it.each([
    ['no row', []],
    ['multiple rows', [validRow, validRow]],
    ['negative count', [{ ...validRow, browserTablePrivilegeCount: -1 }]],
    ['invalid table list', [{ ...validRow, rlsDisabledTables: [42] }]],
    ['invalid runtime flag', [{ ...validRow, runtimeRlsCompatible: 'yes' }]],
  ])('fails closed for %s', async (_label, rows) => {
    await expect(readSupabaseDataApiSurfaceAudit(auditClient(rows))).rejects.toThrow(
      /supabase_data_api_audit_invalid_/,
    );
  });

  it('propagates database failures to the fixed CLI boundary', async () => {
    const db = {
      $queryRaw: vi.fn().mockRejectedValue(new Error('database-canary')),
    } as never;
    await expect(readSupabaseDataApiSurfaceAudit(db)).rejects.toThrow('database-canary');
  });
});

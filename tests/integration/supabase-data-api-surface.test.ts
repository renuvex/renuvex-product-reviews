import { afterAll, describe, expect, it } from 'vitest';
import { prisma } from '@/lib/prisma';
import {
  isSupabaseDataApiSurfaceAuditValid,
  readSupabaseDataApiSurfaceAudit,
} from '../../scripts/lib/supabase-data-api-surface-audit.mjs';

const integrationDatabaseUrl = process.env.REVIEW_EMAIL_INTEGRATION_DATABASE_URL;
const integrationDescribe = integrationDatabaseUrl ? describe : describe.skip;
const STORE_ID = 'supabase-data-api-surface-smoke';

integrationDescribe('Supabase Data API surface (PostgreSQL)', () => {
  const parsed = new URL(integrationDatabaseUrl!);
  if (!['127.0.0.1', 'localhost'].includes(parsed.hostname)) {
    throw new Error('Supabase surface integration tests require a local disposable PostgreSQL database');
  }
  if (process.env.DATABASE_URL !== integrationDatabaseUrl) {
    throw new Error('DATABASE_URL must match REVIEW_EMAIL_INTEGRATION_DATABASE_URL');
  }

  afterAll(async () => {
    await prisma.storeSettings.deleteMany({ where: { storeId: STORE_ID } });
    await prisma.$disconnect();
  });

  it('keeps every public table RLS-enabled with no Data API role privileges', async () => {
    const audit = await readSupabaseDataApiSurfaceAudit(prisma);
    expect(audit).toMatchObject({
      rlsDisabledTableCount: 0,
      rlsDisabledTables: [],
      browserSchemaPrivilegeCount: 0,
      browserTablePrivilegeCount: 0,
      browserSequencePrivilegeCount: 0,
      browserRoutinePrivilegeCount: 0,
      disallowedDefaultAclCount: 0,
      ownersMissingFunctionDefaultDenyCount: 0,
      runtimeRlsCompatible: true,
    });
    expect(isSupabaseDataApiSurfaceAuditValid(audit)).toBe(true);
  });

  it('preserves server-side Prisma read/write access after RLS hardening', async () => {
    const created = await prisma.storeSettings.create({ data: { storeId: STORE_ID } });
    await expect(prisma.storeSettings.findUnique({
      where: { storeId: STORE_ID },
      select: { id: true },
    })).resolves.toEqual({ id: created.id });
    await prisma.storeSettings.delete({ where: { storeId: STORE_ID } });
  });
});

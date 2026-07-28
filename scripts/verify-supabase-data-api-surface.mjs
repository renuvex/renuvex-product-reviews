import { PrismaClient } from '@prisma/client';
import {
  isSupabaseDataApiSurfaceAuditValid,
  readSupabaseDataApiSurfaceAudit,
} from './lib/supabase-data-api-surface-audit.mjs';

const prisma = new PrismaClient();

try {
  const summary = await prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe('SET TRANSACTION READ ONLY');
    return readSupabaseDataApiSurfaceAudit(tx);
  });
  const valid = isSupabaseDataApiSurfaceAuditValid(summary);

  console.log(JSON.stringify({ valid, ...summary }));
  if (!valid) process.exitCode = 1;
} catch {
  console.error('supabase_data_api_surface_verification_failed');
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}

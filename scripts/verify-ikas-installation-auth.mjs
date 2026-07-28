import { PrismaClient } from '@prisma/client';
import {
  isIkasInstallationAuthAuditValid,
  readIkasInstallationAuthAudit,
} from './lib/ikas-installation-auth-audit.mjs';

const prisma = new PrismaClient();

try {
  const summary = await readIkasInstallationAuthAudit(prisma);
  const valid = isIkasInstallationAuthAuditValid(summary);

  console.log(JSON.stringify({ valid, ...summary }));
  if (!valid) process.exitCode = 1;
} catch {
  console.error('ikas_installation_auth_verification_failed');
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}

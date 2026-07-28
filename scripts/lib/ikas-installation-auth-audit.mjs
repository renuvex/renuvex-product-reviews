function requiredCount(value) {
  const count = Number(value);
  if (!Number.isSafeInteger(count) || count < 0) {
    throw new Error('ikas_installation_auth_audit_invalid_count');
  }
  return count;
}

export async function readIkasInstallationAuthAudit(db) {
  const rows = await db.$queryRaw`
    SELECT
      (
        SELECT COUNT(*)::int
        FROM "AuthToken" token
        LEFT JOIN "IkasStoreInstallation" installation
          ON installation."storeId" = token."merchantId"
         AND installation."authorizedAppId" = token."authorizedAppId"
         AND installation."status" = 'active'
        WHERE installation."storeId" IS NULL
      ) AS "missingExactInstallationCount",
      (
        SELECT COUNT(*)::int
        FROM "IkasStoreInstallation" installation
        LEFT JOIN "AuthToken" token
          ON token."merchantId" = installation."storeId"
         AND token."authorizedAppId" = installation."authorizedAppId"
        WHERE installation."status" = 'active'
          AND token."authorizedAppId" IS NULL
      ) AS "orphanActiveInstallationCount"
  `;

  if (!Array.isArray(rows) || rows.length !== 1) {
    throw new Error('ikas_installation_auth_audit_invalid_result');
  }

  return {
    missingExactInstallationCount: requiredCount(rows[0]?.missingExactInstallationCount),
    orphanActiveInstallationCount: requiredCount(rows[0]?.orphanActiveInstallationCount),
  };
}

export function isIkasInstallationAuthAuditValid(audit) {
  return audit.missingExactInstallationCount === 0 && audit.orphanActiveInstallationCount === 0;
}

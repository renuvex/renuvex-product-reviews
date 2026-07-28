export type IkasInstallationAuthAudit = {
  missingExactInstallationCount: number;
  orphanActiveInstallationCount: number;
};

export type IkasInstallationAuthAuditClient = {
  $queryRaw<T = unknown>(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<T>;
};

export function readIkasInstallationAuthAudit(
  db: IkasInstallationAuthAuditClient,
): Promise<IkasInstallationAuthAudit>;

export function isIkasInstallationAuthAuditValid(
  audit: IkasInstallationAuthAudit,
): boolean;

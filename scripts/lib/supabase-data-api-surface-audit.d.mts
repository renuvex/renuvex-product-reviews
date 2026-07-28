export type SupabaseDataApiSurfaceAudit = {
  rlsDisabledTableCount: number;
  rlsDisabledTables: string[];
  browserSchemaPrivilegeCount: number;
  browserTablePrivilegeCount: number;
  browserSequencePrivilegeCount: number;
  browserRoutinePrivilegeCount: number;
  disallowedDefaultAclCount: number;
  ownersMissingFunctionDefaultDenyCount: number;
  runtimeRlsCompatible: boolean;
};

export type SupabaseDataApiSurfaceAuditClient = {
  $queryRaw<T = unknown>(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<T>;
};

export function readSupabaseDataApiSurfaceAudit(
  db: SupabaseDataApiSurfaceAuditClient,
): Promise<SupabaseDataApiSurfaceAudit>;

export function isSupabaseDataApiSurfaceAuditValid(
  audit: SupabaseDataApiSurfaceAudit,
): boolean;

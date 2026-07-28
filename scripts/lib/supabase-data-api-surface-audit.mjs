function requiredCount(value, field) {
  const count = Number(value);
  if (!Number.isSafeInteger(count) || count < 0) {
    throw new Error(`supabase_data_api_audit_invalid_${field}`);
  }
  return count;
}

function requiredBoolean(value, field) {
  if (typeof value !== 'boolean') {
    throw new Error(`supabase_data_api_audit_invalid_${field}`);
  }
  return value;
}

function requiredStringArray(value, field) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || item.length === 0)) {
    throw new Error(`supabase_data_api_audit_invalid_${field}`);
  }
  return [...value];
}

export async function readSupabaseDataApiSurfaceAudit(db) {
  const rows = await db.$queryRaw`
    WITH public_tables AS (
      SELECT c.oid, c.relname, c.relowner, c.relrowsecurity, c.relforcerowsecurity
      FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'public'
        AND c.relkind IN ('r', 'p')
    ),
    target_roles AS (
      SELECT oid, rolname
      FROM pg_roles
      WHERE rolname IN ('anon', 'authenticated', 'service_role')
    ),
    public_owners AS (
      SELECT DISTINCT relowner AS oid
      FROM public_tables
    )
    SELECT
      (
        SELECT COUNT(*)::int
        FROM public_tables
        WHERE NOT relrowsecurity
      ) AS "rlsDisabledTableCount",
      COALESCE((
        SELECT jsonb_agg(relname ORDER BY relname)
        FROM public_tables
        WHERE NOT relrowsecurity
      ), '[]'::jsonb) AS "rlsDisabledTables",
      (
        SELECT COUNT(*)::int
        FROM target_roles
        WHERE has_schema_privilege(rolname, 'public', 'USAGE')
           OR has_schema_privilege(rolname, 'public', 'CREATE')
      ) AS "browserSchemaPrivilegeCount",
      (
        SELECT COUNT(*)::int
        FROM target_roles r
        CROSS JOIN public_tables t
        WHERE has_table_privilege(r.rolname, t.oid, 'SELECT')
           OR has_table_privilege(r.rolname, t.oid, 'INSERT')
           OR has_table_privilege(r.rolname, t.oid, 'UPDATE')
           OR has_table_privilege(r.rolname, t.oid, 'DELETE')
           OR has_table_privilege(r.rolname, t.oid, 'TRUNCATE')
           OR has_table_privilege(r.rolname, t.oid, 'REFERENCES')
           OR has_table_privilege(r.rolname, t.oid, 'TRIGGER')
      ) AS "browserTablePrivilegeCount",
      (
        SELECT COUNT(*)::int
        FROM target_roles r
        CROSS JOIN pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public'
          AND c.relkind = 'S'
          AND (
            has_sequence_privilege(r.rolname, c.oid, 'USAGE')
            OR has_sequence_privilege(r.rolname, c.oid, 'SELECT')
            OR has_sequence_privilege(r.rolname, c.oid, 'UPDATE')
          )
      ) AS "browserSequencePrivilegeCount",
      (
        SELECT COUNT(*)::int
        FROM target_roles r
        CROSS JOIN pg_proc p
        JOIN pg_namespace n ON n.oid = p.pronamespace
        WHERE n.nspname = 'public'
          AND has_function_privilege(r.rolname, p.oid, 'EXECUTE')
      ) AS "browserRoutinePrivilegeCount",
      (
        SELECT COUNT(*)::int
        FROM pg_default_acl d
        LEFT JOIN pg_namespace n ON n.oid = d.defaclnamespace
        CROSS JOIN LATERAL aclexplode(d.defaclacl) acl
        LEFT JOIN pg_roles grantee ON grantee.oid = acl.grantee
        WHERE COALESCE(n.nspname, 'public') = 'public'
          AND (
            grantee.rolname IN ('anon', 'authenticated', 'service_role')
            OR (
              acl.grantee = 0
              AND d.defaclobjtype = 'f'
              AND acl.privilege_type = 'EXECUTE'
            )
          )
      ) AS "disallowedDefaultAclCount",
      (
        SELECT COUNT(*)::int
        FROM public_owners owner
        WHERE NOT EXISTS (
          SELECT 1
          FROM pg_default_acl d
          WHERE d.defaclrole = owner.oid
            AND d.defaclnamespace = 0
            AND d.defaclobjtype = 'f'
        )
      ) AS "ownersMissingFunctionDefaultDenyCount",
      (
        (SELECT rolbypassrls FROM pg_roles WHERE rolname = current_user)
        OR NOT EXISTS (
          SELECT 1
          FROM public_tables
          WHERE relowner <> (SELECT oid FROM pg_roles WHERE rolname = current_user)
             OR relforcerowsecurity
        )
      ) AS "runtimeRlsCompatible"
  `;

  if (!Array.isArray(rows) || rows.length !== 1) {
    throw new Error('supabase_data_api_audit_invalid_result');
  }

  const row = rows[0];
  return {
    rlsDisabledTableCount: requiredCount(row?.rlsDisabledTableCount, 'rls_disabled_table_count'),
    rlsDisabledTables: requiredStringArray(row?.rlsDisabledTables, 'rls_disabled_tables'),
    browserSchemaPrivilegeCount: requiredCount(
      row?.browserSchemaPrivilegeCount,
      'browser_schema_privilege_count',
    ),
    browserTablePrivilegeCount: requiredCount(
      row?.browserTablePrivilegeCount,
      'browser_table_privilege_count',
    ),
    browserSequencePrivilegeCount: requiredCount(
      row?.browserSequencePrivilegeCount,
      'browser_sequence_privilege_count',
    ),
    browserRoutinePrivilegeCount: requiredCount(
      row?.browserRoutinePrivilegeCount,
      'browser_routine_privilege_count',
    ),
    disallowedDefaultAclCount: requiredCount(
      row?.disallowedDefaultAclCount,
      'disallowed_default_acl_count',
    ),
    ownersMissingFunctionDefaultDenyCount: requiredCount(
      row?.ownersMissingFunctionDefaultDenyCount,
      'owners_missing_function_default_deny_count',
    ),
    runtimeRlsCompatible: requiredBoolean(row?.runtimeRlsCompatible, 'runtime_rls_compatible'),
  };
}

export function isSupabaseDataApiSurfaceAuditValid(audit) {
  return (
    audit.rlsDisabledTableCount === 0
    && audit.rlsDisabledTables.length === 0
    && audit.browserSchemaPrivilegeCount === 0
    && audit.browserTablePrivilegeCount === 0
    && audit.browserSequencePrivilegeCount === 0
    && audit.browserRoutinePrivilegeCount === 0
    && audit.disallowedDefaultAclCount === 0
    && audit.ownersMissingFunctionDefaultDenyCount === 0
    && audit.runtimeRlsCompatible
  );
}

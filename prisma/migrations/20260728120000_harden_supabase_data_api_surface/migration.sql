-- Renuvex accesses Postgres only through server-side Prisma. No table in the
-- public schema is intended to be reachable through Supabase Data API roles.
-- RLS remains a deny-by-default second layer even when the Data API is disabled.
ALTER TABLE "AuthToken" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "MediaCleanupRun" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "MediaProviderJob" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "MediaProviderLease" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "OrphanImageQuarantine" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PendingReviewImage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProductReviewSummary" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProductSnapshot" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Review" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ReviewMedia" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ScheduledJobRunLock" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StoreSettings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StoreVideoUsage" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "VideoUploadSession" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WebhookEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WidgetSettings" ENABLE ROW LEVEL SECURITY;

-- Prisma's shadow-database migration replay does not create its own migration
-- bookkeeping table. Production migrate deploy does, so harden it when present
-- without making schema-diff validation fail.
DO $$
BEGIN
  IF to_regclass('public._prisma_migrations') IS NOT NULL THEN
    ALTER TABLE "_prisma_migrations" ENABLE ROW LEVEL SECURITY;
  END IF;
END
$$;

-- PostgreSQL grants USAGE on the public schema to PUBLIC by default. A revoke
-- from only the named Data API roles would still leave that inherited path.
REVOKE USAGE, CREATE ON SCHEMA public FROM PUBLIC;

-- Supabase roles are absent from disposable vanilla PostgreSQL acceptance
-- databases. Apply browser-role revocations only when each role exists.
DO $$
DECLARE
  role_name TEXT;
BEGIN
  FOREACH role_name IN ARRAY ARRAY['anon', 'authenticated', 'service_role']
  LOOP
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = role_name) THEN
      EXECUTE format('REVOKE ALL PRIVILEGES ON SCHEMA public FROM %I', role_name);
      EXECUTE format('REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM %I', role_name);
      EXECUTE format('REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM %I', role_name);
      EXECUTE format('REVOKE ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public FROM %I', role_name);

      -- Clear both global defaults and any legacy public-schema override.
      EXECUTE format(
        'ALTER DEFAULT PRIVILEGES FOR ROLE postgres REVOKE ALL PRIVILEGES ON TABLES FROM %I',
        role_name
      );
      EXECUTE format(
        'ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL PRIVILEGES ON TABLES FROM %I',
        role_name
      );
      EXECUTE format(
        'ALTER DEFAULT PRIVILEGES FOR ROLE postgres REVOKE ALL PRIVILEGES ON SEQUENCES FROM %I',
        role_name
      );
      EXECUTE format(
        'ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL PRIVILEGES ON SEQUENCES FROM %I',
        role_name
      );
      EXECUTE format(
        'ALTER DEFAULT PRIVILEGES FOR ROLE postgres REVOKE ALL PRIVILEGES ON FUNCTIONS FROM %I',
        role_name
      );
      EXECUTE format(
        'ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL PRIVILEGES ON FUNCTIONS FROM %I',
        role_name
      );
    END IF;
  END LOOP;
END
$$;

-- PostgreSQL grants EXECUTE on newly created functions to PUBLIC by default.
-- Remove that implicit API surface for existing and future public functions.
REVOKE EXECUTE ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres
  REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

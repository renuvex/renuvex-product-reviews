import { getIkas, getIkasV1 } from '@/helpers/api-helpers';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { buildStorefrontThemeState, resolveStorefrontThemeMetadata } from '@/lib/storefront-theme';
import { buildStorefrontWidgetScript, LEGACY_STOREFRONT_WIDGET_APP_MARKER, STOREFRONT_WIDGET_APP_MARKER } from '@/lib/storefront-widget-url';
import { StorefrontJSScriptContentTypeEnum, type ikasAdminGraphQLAPIClient } from '@/lib/ikas-client/generated/graphql';
import type { ikasAdminGraphQLAPIClient as ikasAdminGraphQLAPIV1Client } from '@/lib/ikas-client/generated/v1-graphql';
import type { AuthToken } from '@/models/auth-token';

const STOREFRONT_SCRIPT_NAME = 'renuvex-product-reviews-widget';
const LEGACY_STOREFRONT_SCRIPT_NAMES = ['yorum-paneli-widget'];

type IkasClient = ikasAdminGraphQLAPIClient<AuthToken>;
type IkasV1Client = ikasAdminGraphQLAPIV1Client<AuthToken>;
type StorefrontScriptMode = 'install' | 'manual' | 'cron';
type StorefrontScriptAction = 'updated' | 'adopted' | 'created' | 'recreated' | 'skipped_empty_map' | 'failed';
type StorefrontScriptRemoteStatus = 'matched' | 'not_found' | 'stale_or_inactive' | 'list_unavailable';
type StorefrontScriptMatchedBy =
  | 'db_id_marker'
  | 'app_marker_store_id'
  | 'script_name_exact_content'
  | 'script_name_store_id'
  | 'script_name'
  | 'public_api_key'
  | 'db_id_fallback'
  | 'none';
type IkasResultError = {
  error?: string;
  errors?: Array<{ message?: string }>;
};

type StorefrontScriptOptions = {
  scriptListClient?: IkasV1Client;
};

type RemoteStorefrontScript = {
  id: string;
  name: string;
  storefrontId: string;
  isActive: boolean;
  deleted?: boolean;
  scriptContent: string;
};

export type StorefrontScriptResult = {
  storefrontId: string;
  action: StorefrontScriptAction;
  scriptId?: string;
  remoteStatus?: StorefrontScriptRemoteStatus;
  matchedBy?: StorefrontScriptMatchedBy;
  duplicateCount?: number;
  contentMatches?: boolean;
  isActive?: boolean;
  deleted?: boolean;
  error?: string;
};

export type StorefrontScriptSummary = {
  success: number;
  failed: number;
  skipped: number;
  total: number;
  results: StorefrontScriptResult[];
};

function normalizeScriptMap(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};

  const map: Record<string, string> = {};
  for (const [key, item] of Object.entries(value)) {
    if (typeof key === 'string' && typeof item === 'string' && key && item) {
      map[key] = item;
    }
  }
  return map;
}

function summarize(results: StorefrontScriptResult[]): StorefrontScriptSummary {
  const failed = results.filter((result) => result.action === 'failed').length;
  const skipped = results.filter((result) => result.action === 'skipped_empty_map').length;
  return {
    success: results.length - failed - skipped,
    failed,
    skipped,
    total: results.length,
    results,
  };
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'unknown';
}

function resultErrorMessage(result: IkasResultError) {
  const graphQLErrors = result.errors
    ?.map((error) => error.message)
    .filter((message): message is string => Boolean(message));

  return graphQLErrors?.length ? graphQLErrors.join('; ') : result.error || 'unknown';
}

function canRecreateAfterUpdateFailure(message: string) {
  return /not[\s_-]*found|does[\s_-]*not[\s_-]*exist|deleted|bulunamad|silin/i.test(message);
}

function includesStoreIdMarker(scriptContent: string, storeId: string) {
  return scriptContent.includes(`data-renuvex-store-id="${storeId}"`) || scriptContent.includes(`data-ikr-store-id="${storeId}"`);
}

function includesRenuvexAppMarker(scriptContent: string) {
  return scriptContent.includes(`data-renuvex-app="${STOREFRONT_WIDGET_APP_MARKER}"`);
}

function includesLegacyAppMarker(scriptContent: string) {
  return scriptContent.includes(`data-ikr-app="${LEGACY_STOREFRONT_WIDGET_APP_MARKER}"`);
}

function includesAppMarker(scriptContent: string) {
  return includesRenuvexAppMarker(scriptContent) || includesLegacyAppMarker(scriptContent);
}

function isKnownScriptName(name: string) {
  return name === STOREFRONT_SCRIPT_NAME || LEGACY_STOREFRONT_SCRIPT_NAMES.includes(name);
}

function includesPublicApiKey(scriptContent: string, storeId: string) {
  return scriptContent.includes(`publicApiKey=${storeId}`) || scriptContent.includes(`publicApiKey=${encodeURIComponent(storeId)}`);
}

function isAppScript(script: RemoteStorefrontScript, storeId: string) {
  return (
    isKnownScriptName(script.name) ||
    (includesAppMarker(script.scriptContent) && includesStoreIdMarker(script.scriptContent, storeId)) ||
    includesPublicApiKey(script.scriptContent, storeId)
  );
}

function getMatchPriority(
  script: RemoteStorefrontScript,
  existingScriptId: string | undefined,
  storeId: string,
  scriptContent: string,
): { matchedBy: StorefrontScriptMatchedBy; priority: number } {
  const hasRenuvexMarker = includesRenuvexAppMarker(script.scriptContent);
  const hasLegacyMarker = includesLegacyAppMarker(script.scriptContent);
  const hasAppMarker = hasRenuvexMarker || hasLegacyMarker;
  const hasStoreMarker = includesStoreIdMarker(script.scriptContent, storeId);
  const hasPublicApiKey = includesPublicApiKey(script.scriptContent, storeId);
  const hasCanonicalScriptName = script.name === STOREFRONT_SCRIPT_NAME;
  const hasKnownScriptName = isKnownScriptName(script.name);

  if (existingScriptId && script.id === existingScriptId && hasAppMarker && hasStoreMarker) return { matchedBy: 'db_id_marker', priority: 100 };
  if (hasRenuvexMarker && hasStoreMarker) return { matchedBy: 'app_marker_store_id', priority: 95 };
  if (hasLegacyMarker && hasStoreMarker) return { matchedBy: 'app_marker_store_id', priority: 90 };
  if (hasCanonicalScriptName && script.scriptContent === scriptContent) return { matchedBy: 'script_name_exact_content', priority: 80 };
  if (hasKnownScriptName && script.scriptContent === scriptContent) return { matchedBy: 'script_name_exact_content', priority: 78 };
  if (hasCanonicalScriptName && hasPublicApiKey) return { matchedBy: 'script_name_store_id', priority: 70 };
  if (hasKnownScriptName && hasPublicApiKey) return { matchedBy: 'script_name_store_id', priority: 68 };
  if (hasCanonicalScriptName) return { matchedBy: 'script_name', priority: 60 };
  if (hasKnownScriptName) return { matchedBy: 'script_name', priority: 58 };
  if (hasPublicApiKey) return { matchedBy: 'public_api_key', priority: 50 };
  return { matchedBy: 'none', priority: 0 };
}

function getRemoteDiagnostics(
  remoteScripts: RemoteStorefrontScript[] | null,
  remoteScript: RemoteStorefrontScript | undefined,
  existingScriptId: string | undefined,
  storeId: string,
  scriptContent: string,
) {
  if (!remoteScripts) {
    return {
      remoteStatus: 'list_unavailable' as const,
      matchedBy: existingScriptId ? ('db_id_fallback' as const) : ('none' as const),
      duplicateCount: 0,
      contentMatches: undefined,
      isActive: undefined,
      deleted: undefined,
    };
  }

  const appScripts = remoteScripts.filter((script) => isAppScript(script, storeId));
  const relatedScripts = existingScriptId
    ? remoteScripts.filter((script) => isAppScript(script, storeId) || script.id === existingScriptId)
    : appScripts;
  const activeAppScripts = appScripts.filter((script) => script.isActive && !script.deleted);
  const match = remoteScript ? getMatchPriority(remoteScript, existingScriptId, storeId, scriptContent) : undefined;

  return {
    remoteStatus: remoteScript ? ('matched' as const) : relatedScripts.length > 0 ? ('stale_or_inactive' as const) : ('not_found' as const),
    matchedBy: match?.matchedBy ?? ('none' as const),
    duplicateCount: Math.max(0, activeAppScripts.length - (remoteScript ? 1 : 0)),
    contentMatches: remoteScript ? remoteScript.scriptContent === scriptContent : false,
    isActive: remoteScript?.isActive,
    deleted: remoteScript?.deleted,
  };
}

function markSuccessfulWrite(diagnostics: ReturnType<typeof getRemoteDiagnostics>) {
  return { ...diagnostics, contentMatches: true, isActive: true, deleted: false };
}

function selectRemoteScript(scripts: RemoteStorefrontScript[], existingScriptId: string | undefined, storeId: string, scriptContent: string) {
  const usableScripts = scripts.filter((script) => !script.deleted);
  let selected: RemoteStorefrontScript | undefined;
  let selectedPriority = 0;

  for (const script of usableScripts) {
    if (!script.isActive) continue;
    const match = getMatchPriority(script, existingScriptId, storeId, scriptContent);
    if (match.priority > selectedPriority) {
      selected = script;
      selectedPriority = match.priority;
    }
  }

  return selected;
}

async function listRemoteStorefrontScripts(scriptListClient: IkasV1Client | undefined, storefrontId: string) {
  if (!scriptListClient) return null;

  try {
    const result = await scriptListClient.queries.listStorefrontJSScript({ storefrontId });
    if (!result.isSuccess) return null;
    return result.data?.listStorefrontJSScript ?? [];
  } catch {
    return null;
  }
}

async function createStorefrontScript(ikas: IkasClient, storefrontId: string, scriptContent: string) {
  return ikas.mutations.createStorefrontJSScript({
    input: {
      contentType: StorefrontJSScriptContentTypeEnum.SCRIPT,
      name: STOREFRONT_SCRIPT_NAME,
      scriptContent,
      storefrontId,
      isHighPriority: false,
    },
  });
}

function themeSyncReasonForMode(mode: StorefrontScriptMode) {
  if (mode === 'install') return 'install' as const;
  if (mode === 'manual') return 'manual' as const;
  return 'cron' as const;
}

export async function ensureStorefrontScripts(
  ikas: IkasClient,
  storeId: string,
  mode: StorefrontScriptMode,
  options: StorefrontScriptOptions = {},
): Promise<StorefrontScriptSummary> {
  const storefrontResponse = await ikas.queries.listStorefront();
  const storefronts = storefrontResponse.data?.listStorefront ?? [];

  if (!storefrontResponse.isSuccess || storefronts.length === 0) {
    throw new Error('Storefront list could not be fetched');
  }

  const settings = await prisma.storeSettings.upsert({
    where: { storeId },
    update: {},
    create: { storeId },
  });
  const existingScripts = normalizeScriptMap(settings.storefrontScripts);
  const hasNoSavedScripts = Object.keys(existingScripts).length === 0;
  const updatedScripts: Record<string, string> = { ...existingScripts };
  const scriptContent = buildStorefrontWidgetScript(storeId);
  const storefrontTheme = buildStorefrontThemeState(settings.storefrontTheme, resolveStorefrontThemeMetadata(storefronts), {
    reason: themeSyncReasonForMode(mode),
  });

  const results = await Promise.all(
    storefronts.map(async (storefront) => {
      const storefrontId = storefront.id;
      const existingScriptId = existingScripts[storefrontId];
      const remoteScripts = await listRemoteStorefrontScripts(options.scriptListClient, storefrontId);
      const remoteScript = remoteScripts ? selectRemoteScript(remoteScripts, existingScriptId, storeId, scriptContent) : undefined;
      const diagnostics = getRemoteDiagnostics(remoteScripts, remoteScript, existingScriptId, storeId, scriptContent);
      const scriptIdToUpdate = remoteScript?.id || (remoteScripts ? undefined : existingScriptId);
      const actionForUpdate: StorefrontScriptAction = remoteScript && remoteScript.id !== existingScriptId ? 'adopted' : 'updated';
      const shouldRecreate =
        Boolean(existingScriptId) || Boolean(remoteScripts?.some((script) => isAppScript(script, storeId) || script.id === existingScriptId));

      if (!scriptIdToUpdate && mode === 'cron' && hasNoSavedScripts) {
        return { storefrontId, action: 'skipped_empty_map' as const, ...diagnostics };
      }

      if (scriptIdToUpdate) {
        let updateError = '';
        try {
          const updateResult = await ikas.mutations.updateStorefrontJSScript({
            input: {
              id: scriptIdToUpdate,
              name: STOREFRONT_SCRIPT_NAME,
              scriptContent,
              isHighPriority: false,
            },
          });

          if (updateResult.isSuccess) {
            const scriptId = updateResult.data?.updateStorefrontJSScript?.id || scriptIdToUpdate;
            updatedScripts[storefrontId] = scriptId;
            return { storefrontId, action: actionForUpdate, scriptId, ...markSuccessfulWrite(diagnostics) };
          }
          updateError = resultErrorMessage(updateResult);
        } catch (error) {
          return { storefrontId, action: 'failed' as const, error: errorMessage(error), ...diagnostics };
        }

        if (!canRecreateAfterUpdateFailure(updateError)) {
          return {
            storefrontId,
            action: 'failed' as const,
            error: `updateStorefrontJSScript failed: ${updateError}`,
            ...diagnostics,
          };
        }

        try {
          const created = await createStorefrontScript(ikas, storefrontId, scriptContent);
          const scriptId = created.data?.createStorefrontJSScript?.id;
          if (created.isSuccess && scriptId) {
            updatedScripts[storefrontId] = scriptId;
            return { storefrontId, action: 'recreated' as const, scriptId, ...markSuccessfulWrite(diagnostics) };
          }
          return { storefrontId, action: 'failed' as const, error: 'createStorefrontJSScript failed after update failure', ...diagnostics };
        } catch (error) {
          return { storefrontId, action: 'failed' as const, error: errorMessage(error), ...diagnostics };
        }
      }

      try {
        const created = await createStorefrontScript(ikas, storefrontId, scriptContent);
        const scriptId = created.data?.createStorefrontJSScript?.id;
        if (created.isSuccess && scriptId) {
          updatedScripts[storefrontId] = scriptId;
          return { storefrontId, action: shouldRecreate ? ('recreated' as const) : ('created' as const), scriptId, ...markSuccessfulWrite(diagnostics) };
        }
        return { storefrontId, action: 'failed' as const, error: 'createStorefrontJSScript failed', ...diagnostics };
      } catch (error) {
        return { storefrontId, action: 'failed' as const, error: errorMessage(error), ...diagnostics };
      }
    }),
  );

  await prisma.storeSettings.update({
    where: { storeId },
    data: {
      storefrontScripts: updatedScripts,
      storefrontTheme: storefrontTheme as unknown as Prisma.InputJsonValue,
    },
  });

  return summarize(results);
}

export async function ensureStorefrontScriptsForToken(token: AuthToken, mode: StorefrontScriptMode) {
  return ensureStorefrontScripts(getIkas(token), token.merchantId, mode, { scriptListClient: getIkasV1(token) });
}

import { getIkas, getIkasV1 } from '@/helpers/api-helpers';
import { prisma } from '@/lib/prisma';
import { buildStorefrontWidgetScript } from '@/lib/storefront-widget-url';
import { StorefrontJSScriptContentTypeEnum, type ikasAdminGraphQLAPIClient } from '@/lib/ikas-client/generated/graphql';
import type { ikasAdminGraphQLAPIClient as ikasAdminGraphQLAPIV1Client } from '@/lib/ikas-client/generated/v1-graphql';
import type { AuthToken } from '@/models/auth-token';

const STOREFRONT_SCRIPT_NAME = 'yorum-paneli-widget';

type IkasClient = ikasAdminGraphQLAPIClient<AuthToken>;
type IkasV1Client = ikasAdminGraphQLAPIV1Client<AuthToken>;
type StorefrontScriptMode = 'install' | 'manual' | 'cron';
type StorefrontScriptAction = 'updated' | 'adopted' | 'created' | 'recreated' | 'skipped_empty_map' | 'failed';
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

function isAppScript(script: RemoteStorefrontScript, storeId: string) {
  return script.name === STOREFRONT_SCRIPT_NAME || script.scriptContent.includes(`publicApiKey=${storeId}`);
}

function selectRemoteScript(scripts: RemoteStorefrontScript[], existingScriptId: string | undefined, storeId: string, scriptContent: string) {
  const usableScripts = scripts.filter((script) => !script.deleted);
  const existingActiveScript = existingScriptId
    ? usableScripts.find((script) => script.id === existingScriptId && script.isActive && isAppScript(script, storeId))
    : undefined;

  if (existingActiveScript) return existingActiveScript;

  return (
    usableScripts.find((script) => script.isActive && script.name === STOREFRONT_SCRIPT_NAME && script.scriptContent === scriptContent) ||
    usableScripts.find((script) => script.isActive && script.name === STOREFRONT_SCRIPT_NAME && script.scriptContent.includes(`publicApiKey=${storeId}`)) ||
    usableScripts.find((script) => script.isActive && script.name === STOREFRONT_SCRIPT_NAME) ||
    usableScripts.find((script) => script.isActive && isAppScript(script, storeId))
  );
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

  const results = await Promise.all(
    storefronts.map(async (storefront) => {
      const storefrontId = storefront.id;
      const existingScriptId = existingScripts[storefrontId];
      const remoteScripts = await listRemoteStorefrontScripts(options.scriptListClient, storefrontId);
      const remoteScript = remoteScripts ? selectRemoteScript(remoteScripts, existingScriptId, storeId, scriptContent) : undefined;
      const scriptIdToUpdate = remoteScript?.id || (remoteScripts ? undefined : existingScriptId);
      const actionForUpdate: StorefrontScriptAction = remoteScript && remoteScript.id !== existingScriptId ? 'adopted' : 'updated';
      const shouldRecreate =
        Boolean(existingScriptId) || Boolean(remoteScripts?.some((script) => isAppScript(script, storeId) || script.id === existingScriptId));

      if (!scriptIdToUpdate && mode === 'cron' && hasNoSavedScripts) {
        return { storefrontId, action: 'skipped_empty_map' as const };
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
            return { storefrontId, action: actionForUpdate, scriptId };
          }
          updateError = resultErrorMessage(updateResult);
        } catch (error) {
          return { storefrontId, action: 'failed' as const, error: errorMessage(error) };
        }

        if (!canRecreateAfterUpdateFailure(updateError)) {
          return {
            storefrontId,
            action: 'failed' as const,
            error: `updateStorefrontJSScript failed: ${updateError}`,
          };
        }

        try {
          const created = await createStorefrontScript(ikas, storefrontId, scriptContent);
          const scriptId = created.data?.createStorefrontJSScript?.id;
          if (created.isSuccess && scriptId) {
            updatedScripts[storefrontId] = scriptId;
            return { storefrontId, action: 'recreated' as const, scriptId };
          }
          return { storefrontId, action: 'failed' as const, error: 'createStorefrontJSScript failed after update failure' };
        } catch (error) {
          return { storefrontId, action: 'failed' as const, error: errorMessage(error) };
        }
      }

      try {
        const created = await createStorefrontScript(ikas, storefrontId, scriptContent);
        const scriptId = created.data?.createStorefrontJSScript?.id;
        if (created.isSuccess && scriptId) {
          updatedScripts[storefrontId] = scriptId;
          return { storefrontId, action: shouldRecreate ? ('recreated' as const) : ('created' as const), scriptId };
        }
        return { storefrontId, action: 'failed' as const, error: 'createStorefrontJSScript failed' };
      } catch (error) {
        return { storefrontId, action: 'failed' as const, error: errorMessage(error) };
      }
    }),
  );

  await prisma.storeSettings.update({
    where: { storeId },
    data: { storefrontScripts: updatedScripts },
  });

  return summarize(results);
}

export async function ensureStorefrontScriptsForToken(token: AuthToken, mode: StorefrontScriptMode) {
  return ensureStorefrontScripts(getIkas(token), token.merchantId, mode, { scriptListClient: getIkasV1(token) });
}

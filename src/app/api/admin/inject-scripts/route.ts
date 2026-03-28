import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth-helpers';
import { AuthTokenManager } from '@/models/auth-token/manager';
import { getIkas } from '@/helpers/api-helpers';
import { StorefrontJSScriptContentTypeEnum } from '@/lib/ikas-client/generated/graphql';
import { withCors, corsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return corsOptions();
}

/**
 * POST: Tüm mevcut temalara widget scriptini inject et / güncelle.
 * Admin panelindeki "Tüm Temalara Script Ekle" butonundan tetiklenir.
 */
export async function POST(request: Request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });

    const authToken = await AuthTokenManager.get(user.authorizedAppId);
    if (!authToken) return NextResponse.json({ error: 'Auth token bulunamadı' }, { status: 404 });

    const ikasClient = getIkas(authToken);
    const storefrontResponse = await ikasClient.queries.listStorefront();

    if (!storefrontResponse.isSuccess || !storefrontResponse.data?.listStorefront?.length) {
      return NextResponse.json({ error: 'Tema listesi alınamadı' }, { status: 500 });
    }

    const deployUrl = process.env.NEXT_PUBLIC_DEPLOY_URL;
    const scriptContent = `<script src="${deployUrl}/widget.js?publicApiKey=${user.merchantId}" async></script>`;

    const settings = await prisma.storeSettings.findUnique({ where: { storeId: user.merchantId } });
    const existingScripts: Record<string, string> = (settings?.storefrontScripts as Record<string, string>) ?? {};
    const updatedScripts: Record<string, string> = { ...existingScripts };

    const results = await Promise.all(
      storefrontResponse.data.listStorefront.map(async (storefront) => {
        const storefrontId = storefront.id!;
        const existingScriptId = existingScripts[storefrontId];

        if (existingScriptId) {
          // Bilinen script ID ile güncelle
          const result = await ikasClient.mutations.updateStorefrontJSScript({
            input: { id: existingScriptId, scriptContent },
          });
          if (!result.isSuccess) {
            // ikas tarafında silinmiş — yeniden oluştur
            const created = await ikasClient.mutations.createStorefrontJSScript({
              input: {
                contentType: StorefrontJSScriptContentTypeEnum.SCRIPT,
                name: 'yorum-paneli-widget',
                scriptContent,
                storefrontId,
                isHighPriority: false,
              },
            });
            if (created.isSuccess && created.data?.createStorefrontJSScript?.id) {
              updatedScripts[storefrontId] = created.data.createStorefrontJSScript.id;
              return { storefrontId, action: 'recreated' };
            }
            return { storefrontId, action: 'failed' };
          }
          return { storefrontId, action: 'updated' };
        } else {
          // Bu tema için ilk kez script oluştur
          const created = await ikasClient.mutations.createStorefrontJSScript({
            input: {
              contentType: StorefrontJSScriptContentTypeEnum.SCRIPT,
              name: 'yorum-paneli-widget',
              scriptContent,
              storefrontId,
              isHighPriority: false,
            },
          });
          if (created.isSuccess && created.data?.createStorefrontJSScript?.id) {
            updatedScripts[storefrontId] = created.data.createStorefrontJSScript.id;
            return { storefrontId, action: 'created' };
          }
          return { storefrontId, action: 'failed' };
        }
      })
    );

    await prisma.storeSettings.update({
      where: { storeId: user.merchantId },
      data: { storefrontScripts: updatedScripts },
    });

    const failed = results.filter((r) => r.action === 'failed').length;
    const success = results.length - failed;

    return withCors(NextResponse.json({ data: { success, failed, total: results.length, results } }));
  } catch (error: any) {
    console.error('[inject-scripts] ERROR:', error);
    return withCors(NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 }));
  }
}

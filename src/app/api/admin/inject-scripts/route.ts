import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth-helpers';
import { AuthTokenManager } from '@/models/auth-token/manager';
import { getIkas } from '@/helpers/api-helpers';
import { withCors, corsOptions } from '@/lib/cors';
import { StorefrontWidgetUrlError } from '@/lib/storefront-widget-url';
import { ensureStorefrontScripts } from '@/lib/storefront-scripts';

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
    const summary = await ensureStorefrontScripts(ikasClient, user.merchantId, 'manual');

    return withCors(NextResponse.json({ data: summary }));
  } catch (error: any) {
    if (error instanceof StorefrontWidgetUrlError) {
      return withCors(NextResponse.json({ error: error.message }, { status: 500 }));
    }

    console.error('[inject-scripts] ERROR:', error);
    return withCors(NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 }));
  }
}

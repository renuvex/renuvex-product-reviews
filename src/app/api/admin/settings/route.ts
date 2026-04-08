import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth-helpers';

/**
 * GET: Mağaza sahibinin (Admin Panel) widget ayarlarını getir
 */
export async function GET(request: Request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });

    const settings = await prisma.storeSettings.upsert({
      where: { storeId: user.merchantId },
      update: {},
      create: { storeId: user.merchantId },
    });

    return NextResponse.json({ data: settings });
  } catch (error) {
    console.error('[GET] Admin Settings API error:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

/**
 * PUT: Mağaza sahibinin (Admin Panel) widget ayarlarını güncelle
 */
export async function PUT(request: Request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });

    const body = await request.json();
    const { widgetColor, widgetTitle, autoApprove, showHelpful } = body;

    // Ayarları güncelle, eğer yoksa baştan oluştur
    const updatedSettings = await prisma.storeSettings.upsert({
      where: { storeId: user.merchantId },
      update: {
        ...(widgetColor !== undefined && { widgetColor }),
        ...(widgetTitle !== undefined && { widgetTitle }),
        ...(autoApprove !== undefined && { autoApprove }),
        ...(showHelpful !== undefined && { showHelpful }),
      },
      create: {
        storeId: user.merchantId,
        ...(widgetColor !== undefined && { widgetColor }),
        ...(widgetTitle !== undefined && { widgetTitle }),
        ...(autoApprove !== undefined && { autoApprove }),
        ...(showHelpful !== undefined && { showHelpful }),
      }
    });

    return NextResponse.json({ message: 'Ayarlar güncellendi', data: updatedSettings });
  } catch (error) {
    console.error('[PUT] Admin Settings API error:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

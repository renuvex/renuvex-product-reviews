import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        // !! GÜVENLİK NOTU: Sadece geliştirme sürecinde kullanılmalı !!
        const tokens = await prisma.authToken.findMany({
            select: {
                merchantId: true,
                expireDate: true,
                updatedAt: true
            }
        });

        // Veritabanındaki son 10 ürünü de görelim
        const cache = await prisma.productSlugCache.findMany({
            take: 10,
            orderBy: { updatedAt: 'desc' }
        });

        return NextResponse.json({
            count: tokens.length,
            stores: tokens,
            lastCachedItems: cache
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

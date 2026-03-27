import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const storeId = searchParams.get('storeId') || req.headers.get('x-merchant-id');

        if (!storeId) {
            return NextResponse.json({ error: 'storeId missing' }, { status: 400 });
        }

        const auth = await prisma.authToken.findFirst({
            where: { merchantId: storeId }
        });

        const settings = await prisma.storeSettings.findUnique({
            where: { storeId }
        });

        return NextResponse.json({
            storeId,
            hasAuthToken: !!auth?.accessToken,
            tokenExpiresAt: auth?.expireDate,
            hasSettings: !!settings,
            status: !!auth?.accessToken ? 'READY' : 'AUTH_REQUIRED'
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import axios from 'axios';

// İkas'tan slug (link) oluşturmak için basit yardımcı fonksiyon
function slugify(text: string) {
    const trMap: { [key: string]: string } = {
        'ç': 'c', 'Ç': 'c', 'ğ': 'g', 'Ğ': 'g', 'ş': 's', 'Ş': 's',
        'ü': 'u', 'Ü': 'u', 'ı': 'i', 'İ': 'i', 'ö': 'o', 'Ö': 'o'
    };
    for (const key in trMap) {
        text = text.replace(new RegExp(key, 'g'), trMap[key]);
    }
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}

export async function POST(req: Request) {
    try {
        const storeId = req.headers.get('x-merchant-id');
        if (!storeId) {
            return NextResponse.json({ error: 'Mağaza kimliği eksik' }, { status: 400 });
        }

        // 1. Mağazanın access token'ını bul (En güncel olanını al)
        let auth = await prisma.authToken.findFirst({
            where: { merchantId: storeId },
            orderBy: { updatedAt: 'desc' }
        });

        if (!auth || !auth.accessToken) {
            return NextResponse.json({ error: 'Yetkilendirme hatası', details: 'Veritabanında bu mağaza için anahtar bulunamadı.' }, { status: 401 });
        }

        // 1.1 Token süresini kontrol et ve gerekirse tazele
        const now = new Date();
        if (auth.expireDate && now >= new Date(auth.expireDate)) {
            console.log('[SYNC] Token süresi dolmuş, tazeleniyor...');
            
            const clientId = process.env.IKAS_CLIENT_ID;
            const clientSecret = process.env.IKAS_CLIENT_SECRET;

            if (!clientId || !clientSecret) {
                return NextResponse.json({ 
                    error: 'Konfigürasyon hatası', 
                    details: 'Vercel üzerindeki IKAS_CLIENT_ID veya IKAS_CLIENT_SECRET eksik.' 
                }, { status: 500 });
            }

            try {
                const refreshRes = await axios.post('https://api.myikas.com/api/v1/authorized-app/token', {
                    grant_type: 'refresh_token',
                    refresh_token: auth.refreshToken,
                    client_id: clientId,
                    client_secret: clientSecret
                });

                const newTokenData = refreshRes.data;
                auth = await prisma.authToken.update({
                    where: { id: auth.id },
                    data: {
                        accessToken: newTokenData.access_token,
                        expireDate: new Date(Date.now() + newTokenData.expires_in * 1000),
                        refreshToken: newTokenData.refresh_token || auth.refreshToken
                    }
                });
                console.log('[SYNC] Token başarıyla tazelendi.');
            } catch (err: any) {
                console.error('[SYNC AUTH REFRESH ERROR]:', err.response?.data || err.message);
                return NextResponse.json({ error: 'Yetki tazeleme hatası', details: 'Lütfen uygulamayı İkas panelinden silip tekrar yükleyin.' }, { status: 401 });
            }
        }

        // 2. İkas Admin API'den ürünleri çek (V1 stabil yol)
        const response = await axios.post(
            'https://api.myikas.com/api/v1/admin/graphql',
            {
                query: `
                    query {
                        listProduct {
                            data {
                                id
                                name
                            }
                        }
                    }
                `
            },
            {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                    'X-IKAS-STORE-ID': storeId,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data.errors) {
            console.error('[STOREFRONT ERRORS]:', response.data.errors);
            return NextResponse.json({ 
                error: 'Storefront Hatası', 
                details: JSON.stringify(response.data.errors) 
            }, { status: 400 });
        }

        const products = response.data?.data?.listProduct?.data || [];
        console.log(`[SYNC] ${products.length} ürün bulundu.`);

        if (products.length === 0) {
            return NextResponse.json({ message: 'Hiç ürün bulunamadı.', count: 0 });
        }

        // 3. Veritabanına (Cache) kaydet
        // Batch işlem daha performanslı olur
        const upsertPromises = products.map((p: any) => {
            const slug = slugify(p.name);
            return prisma.productSlugCache.upsert({
                where: { storeId_slug: { storeId, slug } },
                update: { productId: p.id },
                create: { storeId, slug, productId: p.id }
            });
        });

        await Promise.all(upsertPromises);

        return NextResponse.json({ 
            message: 'Eşitleme başarılı!', 
            count: products.length 
        });

    } catch (error: any) {
        console.error('[SYNC ERROR]:', error.response?.data || error.message);
        return NextResponse.json({ 
            error: 'Ürünler eşitlenirken hata oluştu.', 
            details: JSON.stringify(error.response?.data || error.message)
        }, { status: 500 });
    }
}

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

        // 1. Mağazanın access token'ını bul
        const auth = await prisma.authToken.findFirst({
            where: { merchantId: storeId }
        });

        if (!auth || !auth.accessToken) {
            return NextResponse.json({ error: 'Yetkilendirme hatası' }, { status: 401 });
        }

        // 2. İkas STOREFRONT API'den ürünleri çek (Halka açık, login istemez!)
        const response = await axios.post(
            'https://api.myikas.com/api/v1/storefront/graphql',
            {
                query: `
                    query {
                        listProduct(input: { pagination: { limit: 100, page: 1 } }) {
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

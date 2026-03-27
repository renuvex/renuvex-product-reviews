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

        // 2. İkas Admin API'den ürünleri çek (GraphQL)
        // Not: slug alanı GraphQL'de doğrudan yoksa isimden türetilecek
        const query = `
            query listProduct($input: ListProductInput!) {
                listProduct(input: $input) {
                    data {
                        id
                        name
                    }
                }
            }
        `;

        const response = await axios.post(
            'https://api.myikas.com/api/v2/admin/graphql',
            {
                query,
                variables: {
                    input: {
                        pagination: {
                            page: 1,
                            limit: 250 // Tek seferde 250 ürün çekelim
                        }
                    }
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

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
            details: error.message 
        }, { status: 500 });
    }
}

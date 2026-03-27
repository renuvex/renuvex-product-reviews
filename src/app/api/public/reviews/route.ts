import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// CORS header'larını döndüren pratik fonksiyon
const setCorsHeaders = (res: NextResponse) => {
  res.headers.set('Access-Control-Allow-Origin', '*'); 
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res;
};

// Preflight handler
export async function OPTIONS() {
  return setCorsHeaders(new NextResponse(null, { status: 204 }));
}

/**
 * GET: Mağaza ön yüzünde (widget.js) yorumları getir
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const storeId = searchParams.get('storeId');
    const productId = searchParams.get('productId');

    if (!storeId || !productId) {
      return setCorsHeaders(NextResponse.json({ error: 'Eksik parametre' }, { status: 400 }));
    }

    const reviews = await prisma.review.findMany({
      where: {
        storeId,
        productId,
        status: 'approved',
      },
      orderBy: { createdAt: 'desc' },
    });

    // Images JSON stringten arraye dönüştürülüyor
    const formattedReviews = reviews.map((r: any) => {
        let parsedImages = [];
        try {
            parsedImages = r.images ? JSON.parse(r.images) : [];
        } catch (e) {
            console.error('JSON Parse Error for review images:', r.id, e);
        }
        return {
            ...r,
            images: parsedImages,
        };
    });

    const res = NextResponse.json({
      data: {
        reviews: formattedReviews,
        totalCount: formattedReviews.length,
      }
    });
    res.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return setCorsHeaders(res);
  } catch (error: any) {
    console.error('[GET] Reviews ERROR:', error);
    return setCorsHeaders(NextResponse.json({ error: error.message }, { status: 500 }));
  }
}

/**
 * POST: Yeni yorum gönder
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('[DEBUG] Gelen Yorum Verisi:', body);

    const { storeId, productId, rating, comment, author, email, images } = body;

    // Temel alan kontrolü
    if (!storeId || !productId || !rating || !author) {
      console.warn('[DEBUG] Eksik alanlar tespit edildi.');
      return setCorsHeaders(NextResponse.json({ error: 'Lütfen gerekli tüm alanları doldurun.' }, { status: 400 }));
    }

    // Ayarları kontrol et (Otomatik onay açık mı?)
    const settings = await prisma.storeSettings.findUnique({ where: { storeId } });
    const initialStatus = settings?.autoApprove ? 'approved' : 'pending';

    console.log('[DEBUG] Veritabanına kayda başlanıyor...');

    const newReview = await prisma.review.create({
      data: {
        storeId: String(storeId),
        productId: String(productId),
        rating: Number(rating),
        comment: comment || '',
        author: String(author),
        email: email || '',
        images: images && Array.isArray(images) ? JSON.stringify(images) : null,
        status: initialStatus,
      },
    });

    console.log('[DEBUG] Yorum başarıyla kaydedildi:', newReview.id);

    return setCorsHeaders(NextResponse.json({ message: 'Yorum alındı', data: newReview }, { status: 201 }));
  } catch (error: any) {
    console.error('[POST] Reviews ERROR FULL:', error);
    return setCorsHeaders(NextResponse.json({ error: `Sunucu hatası: ${error.message || 'Bilinmeyen hata'}` }, { status: 500 }));
  }
}

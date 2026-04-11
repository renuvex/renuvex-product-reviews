import { NextResponse } from 'next/server';
import { withCors, corsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return corsOptions();
}

/**
 * GET /api/preview/reviews
 * Mock reviews for iframe preview — no DB, no auth.
 * Response format matches /api/public/reviews exactly.
 */
export async function GET() {
  const data = {
    reviews: [
      {
        id: 'mock-1',
        productId: 'mock-product',
        storeId: 'mock-store',
        author: 'Ayşe K.',
        rating: 5,
        title: 'Harika ürün!',
        comment: 'Ürün gerçekten çok kaliteli, beklentilerimi fazlasıyla karşıladı. Kumaş kalitesi, dikiş detayları ve genel duruşu harika. Ürünü alırken biraz tereddüt etmiştim ama elime ulaştığında ne kadar doğru bir karar verdiğimi anladım. Hızlı kargo ve özenli paketleme için de ayrıca teşekkürler. Kesinlikle tavsiye ediyorum, pişman olmazsınız! Ayrıca ürünün rengi fotoğraftakinden çok daha canlı ve güzel. Uzun süreli kullanımda da gayet dayanıklı duruyor. Temizliği de oldukça kolay, nemli bir bezle silmek yeterli oluyor. Bu fiyata böyle bir kalite bulmak gerçekten zor. Hem kendime hem de hediye olarak arkadaşlarıma aldım, herkes çok memnun kaldı. İkas ekibine bu başarılı ürün ve hizmet için çok teşekkür ederim, favori mağazam haline geldi bile!',
        status: 'approved',
        isVerifiedPurchase: true,
        helpfulCount: 12,
        images: [
          'https://placehold.co/800x800/fee2e2/fee2e2.png',
          'https://placehold.co/800x800/efe8ff/efe8ff.png'
        ],
        merchantReply: 'Teşekkür ederiz, memnuniyetiniz bizim için çok değerli!',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'mock-2',
        productId: 'mock-product',
        storeId: 'mock-store',
        author: 'Mehmet T.',
        rating: 4,
        title: 'Genel olarak memnunum',
        comment: 'Genel olarak memnunum, sadece ambalaj biraz hasarlı gelmişti ama ürün sağlamdı.',
        status: 'approved',
        isVerifiedPurchase: false,
        helpfulCount: 3,
        images: [
          'https://placehold.co/800x800/e0f2fe/e0f2fe.png'
        ],
        merchantReply: null,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'mock-3',
        productId: 'mock-product',
        storeId: 'mock-store',
        author: 'Zeynep A.',
        rating: 5,
        title: 'Tam aradığım ürün',
        comment: 'Tam aradığım ürün. Kesinlikle tavsiye ederim.',
        status: 'approved',
        isVerifiedPurchase: true,
        helpfulCount: 7,
        images: [
          'https://placehold.co/800x800/fef2f2/fef2f2.png',
          'https://placehold.co/800x800/f0fdf4/f0fdf4.png'
        ],
        merchantReply: null,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    totalCount: 3,
    allCount: 3,
    page: 1,
    totalPages: 1,
    hasMore: false,
    ratingCounts: [0, 0, 0, 1, 2], // [1★, 2★, 3★, 4★, 5★]
    avgRating: '4.7',
  };

  return withCors(NextResponse.json({ data }));
}

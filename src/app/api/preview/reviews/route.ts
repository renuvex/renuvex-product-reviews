import { NextRequest, NextResponse } from 'next/server';
import { withCors, corsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return corsOptions();
}

// ─── Mock yorum datası ────────────────────────────────────────────────────────
// Page 1'de 5 yorum (hasMore: true) — "Daha Fazla Göster" butonu görünür.
// Page 2'de 3 yorum (hasMore: false) — buton tıklanınca yeni yorumlar gelir,
// sonra kaybolur. Toplam 8 yorum → allCount: 8. ratingCounts gerçek dağılımı
// yansıtır, avg da hesaplı.

const PAGE_1_REVIEWS = [
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
  {
    id: 'mock-4',
    productId: 'mock-product',
    storeId: 'mock-store',
    author: 'Can B.',
    rating: 5,
    title: 'Beklentimin üstünde',
    comment: 'Beklentimin çok üstünde bir ürün çıktı. Fiyat/performans olarak çok iyi, kalitesi de tartışmasız.',
    status: 'approved',
    isVerifiedPurchase: true,
    helpfulCount: 5,
    images: [],
    merchantReply: 'Memnun kaldığınıza sevindik, teşekkürler!',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-5',
    productId: 'mock-product',
    storeId: 'mock-store',
    author: 'Elif Y.',
    rating: 4,
    title: 'İyi ama küçük eksikleri var',
    comment: 'Ürün iyi ama küçük bazı detaylar daha iyi olabilirdi. Yine de tavsiye ederim.',
    status: 'approved',
    isVerifiedPurchase: false,
    helpfulCount: 2,
    images: [],
    merchantReply: null,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const PAGE_2_REVIEWS = [
  {
    id: 'mock-6',
    productId: 'mock-product',
    storeId: 'mock-store',
    author: 'Deniz K.',
    rating: 5,
    title: 'Süper',
    comment: 'Süper bir ürün, hızlı teslimat, güzel paketleme. Herkese tavsiye ederim.',
    status: 'approved',
    isVerifiedPurchase: true,
    helpfulCount: 4,
    images: [],
    merchantReply: null,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-7',
    productId: 'mock-product',
    storeId: 'mock-store',
    author: 'Selin R.',
    rating: 3,
    title: 'Ortalama',
    comment: 'Ortalama bir ürün. Beklentimi tam karşılamadı ama kötü de değil.',
    status: 'approved',
    isVerifiedPurchase: false,
    helpfulCount: 1,
    images: [],
    merchantReply: 'Geri bildiriminiz için teşekkürler, gelişmeye devam ediyoruz.',
    createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-8',
    productId: 'mock-product',
    storeId: 'mock-store',
    author: 'Burak N.',
    rating: 5,
    title: 'Kesinlikle tavsiye',
    comment: 'Kesinlikle tavsiye ederim, uzun süredir kullanıyorum ve hiçbir sorun yaşamadım.',
    status: 'approved',
    isVerifiedPurchase: true,
    helpfulCount: 6,
    images: [
      'https://placehold.co/800x800/fef3c7/fef3c7.png'
    ],
    merchantReply: null,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

/**
 * GET /api/preview/reviews?page=1|2
 * Mock reviews for iframe preview — no DB, no auth.
 * Page 1 → 5 reviews + hasMore:true (load more button visible)
 * Page 2 → 3 reviews + hasMore:false (button disappears)
 * Response format matches /api/public/reviews exactly.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);

  const reviews = page === 2 ? PAGE_2_REVIEWS : PAGE_1_REVIEWS;
  const hasMore = page === 1;

  const data = {
    reviews,
    totalCount: 8,
    allCount: 8,
    page,
    totalPages: 2,
    hasMore,
    // 1★:0, 2★:0, 3★:1, 4★:2, 5★:5 → avg = (3 + 4*2 + 5*5) / 8 = 36/8 = 4.5
    ratingCounts: [0, 0, 1, 2, 5],
    avgRating: '4.5',
  };

  return withCors(NextResponse.json({ data }));
}

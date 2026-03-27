import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const setCorsHeaders = (res: NextResponse) => {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
};

export async function OPTIONS() {
  return setCorsHeaders(new NextResponse(null, { status: 204 }));
}

/**
 * POST: Slug listesi alır, her slug için onaylı yorum sayısı ve ortalama puanı döner.
 * Body: { storeId: string, slugs: string[] }
 * Response: { data: { [slug]: { avg: number, count: number } } }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { storeId, slugs } = body;

    if (!storeId || !Array.isArray(slugs) || slugs.length === 0) {
      return setCorsHeaders(NextResponse.json({ data: {} }));
    }

    // Tüm slug'lar için onaylı yorumları tek sorguda çek
    const reviews = await prisma.review.findMany({
      where: {
        storeId,
        slug: { in: slugs },
        status: 'approved',
      },
      select: { slug: true, rating: true },
    });

    // slug → { avg, count } map'i oluştur
    const map: Record<string, { sum: number; count: number }> = {};
    for (const r of reviews) {
      if (!r.slug) continue;
      if (!map[r.slug]) map[r.slug] = { sum: 0, count: 0 };
      map[r.slug].sum += r.rating;
      map[r.slug].count += 1;
    }

    const data: Record<string, { avg: string; count: number }> = {};
    for (const slug of Object.keys(map)) {
      const { sum, count } = map[slug];
      data[slug] = { avg: (sum / count).toFixed(1), count };
    }

    const res = NextResponse.json({ data });
    res.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return setCorsHeaders(res);
  } catch (error: any) {
    console.error('[ratings-by-slug] ERROR:', error);
    return setCorsHeaders(NextResponse.json({ data: {} }, { status: 500 }));
  }
}

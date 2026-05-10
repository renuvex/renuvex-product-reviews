import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { getConfiguredCloudinaryCloudName, getReviewImagePublicId, parseStoredReviewImages } from '@/lib/review-images';

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: Request) {
  // Vercel Cron veya yetkili istek kontrolü
  const authHeader = request.headers.get('authorization');
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const cloudName = getConfiguredCloudinaryCloudName();
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) {
      console.error('[cleanup-images] Cloudinary config is missing');
      return NextResponse.json({ error: 'Cloudinary config missing' }, { status: 500 });
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    // 1. DB'deki tüm review görsel URL'lerini çek
    const reviews = await prisma.review.findMany({
      where: { images: { not: null } },
      select: { images: true },
    });

    const usedPublicIds = new Set<string>();
    for (const review of reviews) {
      if (!review.images) continue;
      const urls = parseStoredReviewImages(review.images, cloudName);
      for (const url of urls) {
        const publicId = getReviewImagePublicId(url, cloudName);
        if (publicId) usedPublicIds.add(publicId);
      }
    }

    // 2. Cloudinary'deki review_images klasöründeki tüm görselleri listele
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'review_images/',
      max_results: 500,
    });

    const allAssets: string[] = result.resources.map((r: any) => r.public_id);

    // 3. Orphan görselleri bul
    const orphans = allAssets.filter(id => !usedPublicIds.has(id));

    if (orphans.length === 0) {
      return NextResponse.json({ message: 'Temizlenecek görsel yok.', deleted: 0 });
    }

    // 4. Orphan görselleri sil (max 100 adet / istek)
    let deleted = 0;
    for (let i = 0; i < orphans.length; i += 100) {
      const batch = orphans.slice(i, i + 100);
      await cloudinary.api.delete_resources(batch);
      deleted += batch.length;
    }

    return NextResponse.json({ message: 'Temizleme tamamlandı.', deleted });
  } catch (error: any) {
    console.error('[cleanup-images] ERROR:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

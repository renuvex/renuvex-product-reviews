import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { withCors, corsOptions } from '@/lib/cors';

// Cloudinary ayarları (Düşük level Node.js SDK'sı)
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Bu API, widget.js için geçici bir "Yükleme İmzası" üretir.
 * Böylece görsel doğrudan Cloudinary'ye güvenli bir şekilde gider.
 */
export async function POST() {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const params_to_sign = { timestamp, folder: 'review_images' };

    const signature = cloudinary.utils.api_sign_request(
      params_to_sign,
      process.env.CLOUDINARY_API_SECRET!
    );

    return withCors(NextResponse.json({
      signature,
      timestamp,
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
    }));
  } catch (error) {
    console.error('[SIGN ERROR]:', error);
    return withCors(NextResponse.json({ error: 'İmza oluşturulamadı' }, { status: 500 }));
  }
}

export async function OPTIONS() {
  return corsOptions();
}

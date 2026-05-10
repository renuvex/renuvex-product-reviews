import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { Redis } from '@upstash/redis';
import { withCors, corsOptions } from '@/lib/cors';
import { getConfiguredCloudinaryCloudName } from '@/lib/review-images';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const UPLOAD_RATE_LIMIT_MAX = 10;
const UPLOAD_RATE_LIMIT_WINDOW_SEC = 10 * 60; // 10 dakika

/**
 * Bu API, widget.js için geçici bir "Yükleme İmzası" üretir.
 * Böylece görsel doğrudan Cloudinary'ye güvenli bir şekilde gider.
 */
export async function POST(request: Request) {
  try {
    const cloudName = getConfiguredCloudinaryCloudName();
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) {
      console.error('[SIGN ERROR]: Cloudinary upload config is missing');
      return withCors(NextResponse.json({ error: 'Görsel yükleme yapılandırması eksik' }, { status: 500 }));
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rlKey = `ikr_upload_rl:${ip}`;
    const count = await redis.incr(rlKey);
    if (count === 1) await redis.expire(rlKey, UPLOAD_RATE_LIMIT_WINDOW_SEC);
    if (count > UPLOAD_RATE_LIMIT_MAX) {
      return withCors(NextResponse.json({ error: 'Çok fazla istek. Lütfen bekleyin.' }, { status: 429 }));
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const params_to_sign = { timestamp, folder: 'review_images' };

    const signature = cloudinary.utils.api_sign_request(
      params_to_sign,
      apiSecret
    );

    return withCors(NextResponse.json({
      signature,
      timestamp,
      cloud_name: cloudName,
      api_key: apiKey,
    }));
  } catch (error) {
    console.error('[SIGN ERROR]:', error);
    return withCors(NextResponse.json({ error: 'İmza oluşturulamadı' }, { status: 500 }));
  }
}

export async function OPTIONS() {
  return corsOptions();
}

import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

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
export async function POST(req: Request) {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const params_to_sign = {
      timestamp: timestamp,
      folder: 'review_images', // Görselleri bu klasöre topluyoruz
    };

    const signature = cloudinary.utils.api_sign_request(
      params_to_sign,
      process.env.CLOUDINARY_API_SECRET!
    );

    const response = NextResponse.json({
      signature,
      timestamp,
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
    });

    // CORS ayarları (Widget'tan erişilebilmesi için)
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('[SIGN ERROR]:', error);
    return NextResponse.json({ error: 'İmza oluşturulamadı' }, { status: 500 });
  }
}

// Güvenlik uyarısı (Preflight)
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

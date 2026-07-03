import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { withCors, corsOptions } from '@/lib/cors';
import { prisma } from '@/lib/prisma';
import { normalizeReviewImageStoreId } from '@/lib/review-images';
import {
  AWS_REVIEW_IMAGE_PROVIDER,
  base64Sha256ToHex,
  buildAwsReviewImagePublicId,
  createAwsReviewImageUploadIntent,
  normalizeAwsReviewImageBytes,
  normalizeAwsReviewImageChecksum,
  normalizeAwsReviewImageContentType,
} from '@/lib/media/providers/aws-review-image';

export const runtime = 'nodejs';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const UPLOAD_RATE_LIMIT_MAX = 10;
const UPLOAD_RATE_LIMIT_WINDOW_SEC = 10 * 60;

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rlKey = `renuvex_pr_upload_rl:${ip}`;
    const count = await redis.incr(rlKey);
    if (count === 1) await redis.expire(rlKey, UPLOAD_RATE_LIMIT_WINDOW_SEC);
    if (count > UPLOAD_RATE_LIMIT_MAX) {
      return withCors(NextResponse.json({ error: 'Too many requests. Please wait.' }, { status: 429 }));
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return withCors(NextResponse.json({ error: 'Invalid request body.' }, { status: 400 }));
    }

    const storeId = normalizeReviewImageStoreId((body as { storeId?: unknown })?.storeId);
    if (!storeId) {
      return withCors(NextResponse.json({ error: 'Invalid store.' }, { status: 400 }));
    }

    const store = await prisma.storeSettings.findUnique({
      where: { storeId },
      select: { storeId: true },
    });
    if (!store) {
      return withCors(NextResponse.json({ error: 'Store could not be verified.' }, { status: 400 }));
    }

    const payload = body as {
      fileName?: unknown;
      contentType?: unknown;
      bytes?: unknown;
      checksumAlgorithm?: unknown;
      checksumSha256?: unknown;
    };
    if (payload.checksumAlgorithm !== 'SHA256') {
      return withCors(NextResponse.json({ error: 'Invalid checksum algorithm.' }, { status: 400 }));
    }

    const fileName = typeof payload.fileName === 'string' ? payload.fileName.trim() : '';
    const contentType = normalizeAwsReviewImageContentType(payload.contentType);
    const bytes = normalizeAwsReviewImageBytes(payload.bytes);
    const checksumSha256 = normalizeAwsReviewImageChecksum(payload.checksumSha256);
    if (!fileName || fileName.length > 255 || !contentType || !bytes || !checksumSha256) {
      return withCors(NextResponse.json({ error: 'Invalid image upload request.' }, { status: 400 }));
    }

    const intent = await createAwsReviewImageUploadIntent({
      storeId,
      contentType,
      bytes,
      checksumSha256,
    });

    await prisma.pendingReviewImage.create({
      data: {
        publicId: buildAwsReviewImagePublicId(storeId, intent.assetId),
        storeId,
        uploadSessionId: intent.uploadSessionId,
        url: null,
        assetId: intent.assetId,
        resourceType: 'image',
        provider: AWS_REVIEW_IMAGE_PROVIDER,
        providerAssetId: intent.assetId,
        processingStatus: 'pending',
        sourceProvider: AWS_REVIEW_IMAGE_PROVIDER,
        sourceAssetId: intent.objectKey,
        mimeType: contentType,
        bytes,
        sourceChecksumAlgorithm: 'SHA256',
        sourceChecksumSha256: checksumSha256,
        metadataSource: 'aws_s3_upload',
        metadataStatus: 'pending',
        variantStatus: 'pending',
        uploadExpiresAt: intent.expiresAt,
      },
    });

    return withCors(NextResponse.json({
      provider: AWS_REVIEW_IMAGE_PROVIDER,
      uploadMethod: intent.uploadMethod,
      uploadUrl: intent.uploadUrl,
      fields: intent.fields,
      assetId: intent.assetId,
      uploadSessionId: intent.uploadSessionId,
      objectKey: intent.objectKey,
      expiresAt: intent.expiresAt.toISOString(),
      maxBytes: intent.maxBytes,
      checksumAlgorithm: intent.checksumAlgorithm,
      checksumSha256,
      checksumSha256Hex: base64Sha256ToHex(checksumSha256),
      publicUrl: null,
    }));
  } catch (error) {
    console.error('[SIGN ERROR]:', error);
    return withCors(NextResponse.json({ error: 'Upload signature could not be created.' }, { status: 500 }));
  }
}

export async function OPTIONS() {
  return corsOptions();
}

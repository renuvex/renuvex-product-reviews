import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { Redis } from '@upstash/redis';
import { withCors, corsOptions } from '@/lib/cors';
import {
  getConfiguredCloudinaryCloudName,
  getReviewImagePublicId,
  isTrustedReviewImageUrl,
  normalizeReviewImageStoreId,
} from '@/lib/review-images';
import { normalizeCloudinaryUploadMetadata } from '@/lib/review-media-metadata';
import {
  AWS_REVIEW_IMAGE_PROVIDER,
  buildAwsReviewImagePublicId,
  generateAwsReviewImagePrivateVariants,
  sanitizeAwsReviewImageRef,
  validateAwsReviewImageOriginal,
} from '@/lib/media/providers/aws-review-image';

export const runtime = 'nodejs';

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const REGISTER_RATE_LIMIT_MAX = 30;
const REGISTER_RATE_LIMIT_WINDOW_SEC = 10 * 60;

function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 32);
}

function sanitizedErrorCode(error: unknown): string {
  const code = error instanceof Error ? error.message || error.name : 'aws_review_image_register_failed';
  return code.replace(/[^a-zA-Z0-9_:-]/g, '_').slice(0, 128) || 'aws_review_image_register_failed';
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rlKey = `renuvex_pr_upload_reg_rl:${ip}`;
    const count = await redis.incr(rlKey);
    if (count === 1) await redis.expire(rlKey, REGISTER_RATE_LIMIT_WINDOW_SEC);
    if (count > REGISTER_RATE_LIMIT_MAX) {
      return withCors(NextResponse.json({ error: 'Too many requests. Please wait.' }, { status: 429 }));
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return withCors(NextResponse.json({ error: 'Invalid request body.' }, { status: 400 }));
    }

    const payload = body as { storeId?: unknown; secureUrl?: unknown; metadata?: unknown; provider?: unknown };
    const storeId = normalizeReviewImageStoreId(payload?.storeId);
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

    if (payload.provider === AWS_REVIEW_IMAGE_PROVIDER || !payload.secureUrl) {
      const imageRef = sanitizeAwsReviewImageRef(payload);
      if (!imageRef) {
        return withCors(NextResponse.json({ error: 'Invalid AWS image reference.' }, { status: 400 }));
      }
      const publicId = buildAwsReviewImagePublicId(storeId, imageRef.assetId);
      const pending = await prisma.pendingReviewImage.findFirst({
        where: {
          publicId,
          storeId,
          uploadSessionId: imageRef.uploadSessionId,
          provider: AWS_REVIEW_IMAGE_PROVIDER,
          providerAssetId: imageRef.assetId,
        },
      });
      if (!pending) {
        return withCors(NextResponse.json({ error: 'Upload intent not found.' }, { status: 400 }));
      }
      if (pending.uploadExpiresAt && pending.uploadExpiresAt <= new Date()) {
        return withCors(NextResponse.json({ error: 'Upload intent expired.' }, { status: 400 }));
      }
      if (
        pending.sourceAssetId !== imageRef.objectKey ||
        pending.mimeType !== imageRef.contentType ||
        pending.bytes !== imageRef.bytes ||
        pending.sourceChecksumAlgorithm !== 'SHA256' ||
        pending.sourceChecksumSha256 !== imageRef.checksumSha256
      ) {
        return withCors(NextResponse.json({ error: 'Upload intent mismatch.' }, { status: 400 }));
      }
      if (pending.variantStatus === 'private_ready') {
        return withCors(NextResponse.json({ ok: true, imageRef }));
      }

      try {
        const originalBuffer = await validateAwsReviewImageOriginal({
          storeId,
          assetId: imageRef.assetId,
          uploadSessionId: imageRef.uploadSessionId,
          objectKey: imageRef.objectKey,
          contentType: imageRef.contentType,
          bytes: imageRef.bytes,
          checksumSha256: imageRef.checksumSha256,
        });
        const manifest = await generateAwsReviewImagePrivateVariants({
          storeId,
          assetId: imageRef.assetId,
          objectKey: imageRef.objectKey,
          contentType: imageRef.contentType,
          bytes: imageRef.bytes,
          checksumSha256: imageRef.checksumSha256,
          originalBuffer,
        });
        await prisma.pendingReviewImage.update({
          where: { publicId },
          data: {
            url: null,
            assetId: imageRef.assetId,
            resourceType: 'image',
            provider: AWS_REVIEW_IMAGE_PROVIDER,
            providerAssetId: imageRef.assetId,
            processingStatus: 'ready',
            sourceProvider: AWS_REVIEW_IMAGE_PROVIDER,
            sourceAssetId: imageRef.objectKey,
            format: imageRef.contentType === 'image/jpeg' ? 'jpg' : imageRef.contentType.split('/')[1],
            mimeType: imageRef.contentType,
            width: manifest.source.width,
            height: manifest.source.height,
            bytes: imageRef.bytes,
            sourceChecksumAlgorithm: 'SHA256',
            sourceChecksumSha256: imageRef.checksumSha256,
            metadataSource: 'aws_s3_register',
            metadataStatus: 'complete',
            metadataFetchedAt: new Date(),
            variantStatus: 'private_ready',
            variantGeneratedAt: new Date(manifest.generatedAt),
            variantErrorCode: null,
            variantManifest: manifest as unknown as Prisma.InputJsonValue,
            uploadRegisteredAt: new Date(),
            ipHash: hashIp(ip),
          },
        });
        return withCors(NextResponse.json({ ok: true, imageRef }));
      } catch (error) {
        const code = sanitizedErrorCode(error);
        await prisma.pendingReviewImage.updateMany({
          where: { publicId, provider: AWS_REVIEW_IMAGE_PROVIDER },
          data: { processingStatus: 'failed', variantStatus: 'failed', variantErrorCode: code },
        });
        console.error('[upload/register] AWS image register failed:', code);
        return withCors(NextResponse.json({ error: 'Image upload could not be verified.' }, { status: 400 }));
      }
    }

    const secureUrl = payload?.secureUrl;
    const cloudName = getConfiguredCloudinaryCloudName();
    if (!isTrustedReviewImageUrl(secureUrl, cloudName, storeId)) {
      return withCors(NextResponse.json({ error: 'Invalid image URL.' }, { status: 400 }));
    }

    const publicId = getReviewImagePublicId(secureUrl, cloudName, storeId);
    if (!publicId) {
      return withCors(NextResponse.json({ error: 'Public ID could not be parsed.' }, { status: 400 }));
    }

    const metadata = normalizeCloudinaryUploadMetadata(payload.metadata, {
      expectedPublicId: publicId,
      apiSecret: process.env.CLOUDINARY_API_SECRET,
    });
    const metadataData = metadata ?? {};

    await prisma.pendingReviewImage.upsert({
      where: { publicId },
      update: metadataData,
      create: { publicId, storeId, ipHash: hashIp(ip), ...metadataData },
    });

    return withCors(NextResponse.json({ ok: true }));
  } catch (error) {
    console.error('[upload/register] ERROR:', error);
    return withCors(NextResponse.json({ error: 'Server error.' }, { status: 500 }));
  }
}

export async function OPTIONS() {
  return corsOptions();
}

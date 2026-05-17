import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '@/lib/prisma';
import { getConfiguredCloudinaryCloudName } from '@/lib/review-images';

const PENDING_TTL_HOURS = 24;
const BATCH_SIZE = 200; // safely under Cloudinary's 100/request delete cap x 2 calls

export type CleanupPendingUploadsSummary = {
  message: string;
  deleted?: number;
  deletedRows?: number;
  deletedAssets?: number;
};

export async function cleanupPendingUploads(): Promise<CleanupPendingUploadsSummary> {
  const cloudName = getConfiguredCloudinaryCloudName();
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary config missing');
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  const cutoff = new Date(Date.now() - PENDING_TTL_HOURS * 60 * 60 * 1000);

  const expired = await prisma.pendingReviewImage.findMany({
    where: { createdAt: { lt: cutoff } },
    take: BATCH_SIZE,
    select: { publicId: true },
  });

  if (expired.length === 0) {
    return { message: 'No expired pending uploads.', deleted: 0 };
  }

  const publicIds = expired.map((row) => row.publicId);
  let deletedAssets = 0;

  for (let i = 0; i < publicIds.length; i += 100) {
    const batch = publicIds.slice(i, i + 100);
    try {
      await cloudinary.api.delete_resources(batch);
      deletedAssets += batch.length;
    } catch (error) {
      console.error('[cleanup-pending-uploads] delete batch failed:', error);
    }
  }

  await prisma.pendingReviewImage.deleteMany({
    where: { publicId: { in: publicIds } },
  });

  return {
    message: 'Cleanup complete.',
    deletedRows: publicIds.length,
    deletedAssets,
  };
}

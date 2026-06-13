import { v2 as cloudinary } from 'cloudinary';
import { getConfiguredCloudinaryCloudName } from '@/lib/review-images';

function configureCloudinary() {
  const cloudName = getConfiguredCloudinaryCloudName();
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) throw new Error('Cloudinary config missing');
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });
}

export async function deleteCloudinaryReviewImages(publicIds: string[]) {
  if (publicIds.length === 0) return [];
  configureCloudinary();
  const deleted: string[] = [];
  for (let index = 0; index < publicIds.length; index += 100) {
    const batch = publicIds.slice(index, index + 100);
    await cloudinary.api.delete_resources(batch, { resource_type: 'image', type: 'upload' });
    deleted.push(...batch);
  }
  return deleted;
}

import { generateClient } from 'aws-amplify';
import { getCurrentUser, fetchUserAttributes } from '@aws-amplify/auth';
import { uploadData, getUrl } from '@aws-amplify/storage';
// utils/getSignedImageUrl.ts
import { Storage } from 'aws-amplify';

/**
 * Get a signed image URL from S3 for display in the app.
 * @param key The S3 object key (e.g. "public/123_item.jpg")
 * @returns The full signed URL string, or undefined if failed
 */
export const getSignedImageUrl = async (key: string): Promise<string | undefined> => {
  try {
    const url = await getUrl(key, { level: 'public' });
    return url;
  } catch (error) {
    console.error('Failed to get signed URL for image:', key, error);
    return undefined;
  }
};

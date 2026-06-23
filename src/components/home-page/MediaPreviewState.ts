export interface MediaPreviewState {
  mediaId: string;
  type: 'image' | 'video';
  url: string | null;
  playbackId?: string | null;
  playbackToken?: string | null;
  thumbnailToken?: string | null;
  posterUrl?: string | null;
  width?: number | null;
  height?: number | null;
  loading: boolean;
  reviewStatus: string;
}

export function isUnapprovedVideoPreview(preview: MediaPreviewState | null): boolean {
  return preview?.type === 'video' && preview.reviewStatus !== 'approved';
}

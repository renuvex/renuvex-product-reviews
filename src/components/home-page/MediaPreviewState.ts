export interface MediaPreviewState {
  mediaId: string;
  type: 'image' | 'video';
  url: string | null;
  loading: boolean;
  reviewStatus: string;
}

export function isUnapprovedVideoPreview(preview: MediaPreviewState | null): boolean {
  return preview?.type === 'video' && preview.reviewStatus !== 'approved';
}

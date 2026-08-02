export interface ReviewMedia {
  id: string;
  type: 'image' | 'video';
  url: string | null;
  thumbnailUrl: string | null;
  variantStatus?: string | null;
  previewMode: 'public' | 'signed' | 'unsupported';
  canPreview: boolean;
  posterUrl: string | null;
  durationMs: number | null;
  width: number | null;
  height: number | null;
  position: number;
  processingStatus: string;
  visible: boolean;
}

export interface Review {
  id: string;
  productId: string;
  productName: string | null;
  rating: number;
  title: string | null;
  comment: string | null;
  author: string;
  status: string;
  merchantReply: string | null;
  images: string | null;
  media?: ReviewMedia[];
  hasVideo?: boolean;
  createdAt: string;
}

export const TABS = [
  { key: 'pending',  label: 'Onay Bekleyen Yorumlar' },
  { key: 'approved', label: 'Onaylanan Yorumlar' },
  { key: 'rejected', label: 'Reddedilen Yorumlar' },
  { key: 'all',      label: 'Tüm Yorumlar' },
] as const;

export type TabKey = typeof TABS[number]['key'];

export const COMMENT_LIMIT = 180;

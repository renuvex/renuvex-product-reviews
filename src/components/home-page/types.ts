export interface Review {
  id: string;
  productId: string;
  productName: string | null;
  rating: number;
  comment: string | null;
  author: string;
  status: string;
  merchantReply: string | null;
  images: string | null;
  createdAt: string;
  helpfulCount: number;
}

export interface StoreSettings {
  widgetTitle?: string;
  widgetColor?: string;
  autoApprove?: boolean;
  showHelpful?: boolean;
}

export const TABS = [
  { key: 'pending',  label: 'Onay Bekleyen Yorumlar' },
  { key: 'approved', label: 'Onaylanan Yorumlar' },
  { key: 'rejected', label: 'Reddedilen Yorumlar' },
  { key: 'all',      label: 'Tüm Yorumlar' },
] as const;

export type TabKey = typeof TABS[number]['key'];

export const COMMENT_LIMIT = 180;

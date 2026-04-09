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

// Per-widget settings — JSON'dan gelen veri
export interface ReviewsSettings {
  enabled?: boolean;
  title?: string;
  primaryColor?: string;
  showHelpful?: boolean;
  autoApprove?: boolean;
}

export interface BadgeSettings {
  enabled?: boolean;
  icon?: 'star' | 'heart' | 'circle';
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

// API'den gelen tüm widget ayarları haritası: { reviews: {...}, badge: {...} }
export type WidgetSettingsMap = Record<string, Record<string, unknown> | undefined> & {
  reviews?: ReviewsSettings;
  badge?: BadgeSettings;
};

export const TABS = [
  { key: 'pending',  label: 'Onay Bekleyen Yorumlar' },
  { key: 'approved', label: 'Onaylanan Yorumlar' },
  { key: 'rejected', label: 'Reddedilen Yorumlar' },
  { key: 'all',      label: 'Tüm Yorumlar' },
] as const;

export type TabKey = typeof TABS[number]['key'];

export const COMMENT_LIMIT = 180;

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
}

// Per-widget settings — JSON'dan gelen veri
// Otomatik onay eşiği — yeni yorumlar bu değere göre status alır.
//   manual = hiç otomatik onaylama (admin elle onaylar)
//   4plus  = 4 yıldız ve üzeri otomatik onaylanır
//   5stars = sadece 5 yıldız otomatik onaylanır
//   all    = tüm yorumlar otomatik onaylanır
export type AutoApproveMode = 'manual' | '4plus' | '5stars' | 'all';

export interface ReviewsSettings {
  enabled?: boolean;
  title?: string;
  primaryColor?: string;
  autoApprove?: AutoApproveMode;
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

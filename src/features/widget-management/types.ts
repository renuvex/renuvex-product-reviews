// Automatic approval is part of the Reviews widget settings contract.
export type AutoApproveMode = 'manual' | '4plus' | '5stars' | 'all';

export interface ReviewsSettings {
  [key: string]: unknown;
  enabled?: boolean;
  videoReviewsEnabled?: boolean;
  title?: string;
  autoApprove?: AutoApproveMode;
  richSnippetsEnabled?: boolean;
}

export interface BadgeSettings {
  [key: string]: unknown;
  enabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  mobileOverride?: boolean;
  mobileSize?: 'small' | 'medium' | 'large';
  alignment?: 'auto' | 'left' | 'center' | 'right';
  showValue?: boolean;
  showCount?: boolean;
}

export type WidgetSettingsMap = Record<string, Record<string, unknown> | undefined> & {
  reviews?: ReviewsSettings;
  badge?: BadgeSettings;
};

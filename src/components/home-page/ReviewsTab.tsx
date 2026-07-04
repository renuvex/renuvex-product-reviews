import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { colors, componentStyles, typography } from '@/lib/design-tokens';
import { Review, ReviewMedia, TabKey, TABS } from './types';
import { ReviewRow } from './ReviewRow';

interface ReviewsTabProps {
  activeTab: TabKey;
  reviews: Review[];
  loading: boolean;
  page: number;
  total: number;
  pageSize: number;
  tabCounts: Record<TabKey, number>;
  onTabChange: (tab: TabKey) => void;
  onStatusChange: (id: string, status: string) => Promise<void>;
  onReply: (review: Review) => void;
  onDeleteReply: (id: string) => void;
  onDeleteReview: (id: string) => void;
  onMediaOpen: (media: ReviewMedia, reviewStatus: string) => void;
  getImagePreviewUrl: (mediaId: string, variant: 'thumb_320x427' | 'w1200') => Promise<string | null>;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

function renderStars(count: number) {
  return Array(5).fill(0).map((_, i) => (
    <Star key={i} size={14} className={i < count ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
  ));
}

export function ReviewsTab({
  activeTab, reviews, loading, page, total, pageSize, tabCounts,
  onTabChange, onStatusChange, onReply, onDeleteReply, onDeleteReview,
  onMediaOpen, getImagePreviewUrl, onPageChange, onPageSizeChange,
}: ReviewsTabProps) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <>
      {/* Yatay iç tab bar */}
      <div style={{ display: 'flex', flexDirection: 'row', borderBottom: `1px solid ${colors.borderDefault}`, marginBottom: 16, gap: 0 }}>
        {TABS.map(({ key, label }) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: isActive ? `2px solid ${colors.primary}` : '2px solid transparent',
                marginBottom: -1,
                padding: '10px 16px',
                fontSize: typography.fontSize.base,
                fontWeight: isActive ? typography.fontWeight.medium : typography.fontWeight.regular,
                color: isActive ? colors.primary : colors.textSecondary,
                textShadow: isActive ? `${colors.primary} 0px 0px 0.25px` : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                whiteSpace: 'nowrap',
              }}
            >
              {label}
              <span style={{
                color: isActive ? colors.primary : colors.textSecondary,
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
                textShadow: isActive ? `${colors.primary} 0px 0px 0.25px` : 'none',
                visibility: tabCounts[key] > 0 ? 'visible' : 'hidden',
              }}>
                ({tabCounts[key]})
              </span>
            </button>
          );
        })}
      </div>

      {/* Yorum listesi */}
      <Card>
        <CardContent className="p-0">
          {reviews.length === 0 && !loading ? (
            <div className="h-24 flex items-center justify-center px-6" style={{ fontSize: typography.fontSize.base, color: colors.textMuted }}>
              Bu kategoride henüz yorum bulunamadı.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {reviews.map((review) => (
                <ReviewRow
                  key={review.id}
                  review={review}
                  onStatusChange={onStatusChange}
                  onReply={onReply}
                  onDeleteReply={onDeleteReply}
                  onDeleteReview={onDeleteReview}
                  onMediaOpen={onMediaOpen}
                  getImagePreviewUrl={getImagePreviewUrl}
                  renderStars={renderStars}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {total > 0 && (
        <div className="sticky bottom-0 mt-0 flex items-center justify-between px-6 py-3 border border-border bg-white/80 backdrop-blur-sm rounded-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: typography.fontSize.base, color: colors.textSecondary }}>Satır Adedi:</span>
              <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                style={{ ...componentStyles.select, height: '28px', width: '72px', cursor: 'pointer' }}
              >
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <span style={{ fontSize: typography.fontSize.base, color: colors.textSecondary }}>
              {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, total)} / {total} Yorum
            </span>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button disabled={page <= 1 || loading}
                style={{ background: 'none', border: 'none', outline: 'none', fontSize: typography.fontSize.base, cursor: page <= 1 ? 'not-allowed' : 'pointer', color: page <= 1 ? colors.textMuted : colors.textPrimary, padding: '0 4px' }}
                onClick={() => onPageChange(page - 1)}>
                &lt; Önceki
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce<(number | '...')[]>((acc, p, i, arr) => {
                  if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push('...');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) => p === '...' ? (
                  <span key={`ellipsis-${i}`} style={{ padding: '0 4px', fontSize: typography.fontSize.base, color: colors.textMuted }}>…</span>
                ) : (
                  <button
                    key={p}
                    style={p === page ? componentStyles.paginationBtnActive : componentStyles.paginationBtn}
                    disabled={loading}
                    onClick={() => onPageChange(p as number)}
                  >
                    {p}
                  </button>
                ))}
              <button disabled={page >= totalPages || loading}
                style={{ background: 'none', border: 'none', outline: 'none', fontSize: typography.fontSize.base, cursor: page >= totalPages ? 'not-allowed' : 'pointer', color: page >= totalPages ? colors.textMuted : colors.textPrimary, padding: '0 4px' }}
                onClick={() => onPageChange(page + 1)}>
                Sonraki &gt;
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

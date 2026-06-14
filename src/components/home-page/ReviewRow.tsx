import React, { useState } from 'react';
import Image from 'next/image';
import { Check, X, ChevronDown, ChevronUp, MoreVertical, Trash2, MessageSquareX, Reply, Play } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { colors, componentStyles, radii, typography } from '@/lib/design-tokens';
import { Review, ReviewMedia, COMMENT_LIMIT } from './types';

interface ReviewRowProps {
  review: Review;
  onStatusChange: (id: string, status: string) => Promise<void>;
  onReply: (review: Review) => void;
  onDeleteReply: (id: string) => void;
  onDeleteReview: (id: string) => void;
  onMediaOpen: (media: ReviewMedia, reviewStatus: string) => void;
  renderStars: (n: number) => React.ReactNode;
}

export function ReviewRow({ review, onStatusChange, onReply, onDeleteReply, onDeleteReview, onMediaOpen, renderStars }: ReviewRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const comment = review.comment || '';
  const isLong = comment.length > COMMENT_LIMIT;
  const displayedComment = isLong && !expanded ? comment.slice(0, COMMENT_LIMIT) + '…' : comment;

  let images: string[] = [];
  try { if (review.images) images = JSON.parse(review.images); } catch (_) {}
  const media: ReviewMedia[] = review.media?.length
    ? review.media
    : images.map((url, position) => ({
        id: `legacy-${position}`,
        type: 'image' as const,
        url,
        posterUrl: null,
        durationMs: null,
        width: null,
        height: null,
        position,
        processingStatus: 'ready',
        visible: true,
      }));
  const hasProcessingVideo = media.some(item => item.type === 'video' && item.processingStatus !== 'ready');

  return (
    <div className="flex items-start gap-4 px-6 py-4 hover:bg-muted/30 transition-colors">
      {/* Sol: ürün + müşteri + yorum */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>{review.author || '—'}</span>
          <span style={{ fontSize: typography.fontSize.xs, color: colors.textMuted }}>·</span>
          <span style={{ fontSize: typography.fontSize.xs, color: colors.textMuted }}>{new Date(review.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <div className="truncate mb-2" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.primary }}>{review.productName || review.productId}</div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex gap-0.5">{renderStars(review.rating)}</div>
        </div>

        {comment && (
          <div>
            <p className="leading-relaxed break-words" style={{ fontSize: typography.fontSize.base, color: colors.textPrimary }}>{displayedComment}</p>
            {isLong && (
              <button
                className="flex items-center gap-0.5 hover:underline mt-1"
                style={{ fontSize: typography.fontSize.xs, color: colors.primary, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <><ChevronUp size={12} /> Daha az göster</> : <><ChevronDown size={12} /> Devamını Göster</>}
              </button>
            )}
          </div>
        )}

        {media.length > 0 && (
          <div className="mt-2 flex gap-2 flex-wrap">
            {media.map((item) => item.type === 'image' && item.url ? (
              <Image key={item.id} src={item.url} alt="Yorum görseli" width={48} height={48}
                className="w-10 h-10 object-cover rounded border border-border cursor-zoom-in"
                onClick={() => onMediaOpen(item, review.status)} />
            ) : (
              <button
                key={item.id}
                type="button"
                className="relative w-10 h-10 overflow-hidden rounded border border-border bg-black text-white disabled:cursor-not-allowed disabled:opacity-60"
                disabled={item.processingStatus !== 'ready' || !item.posterUrl}
                onClick={() => onMediaOpen(item, review.status)}
                aria-label={item.processingStatus === 'ready' ? 'Yorum videosunu aç' : 'Video işleniyor'}
                title={item.processingStatus === 'ready' ? 'Videoyu oynat' : 'Video işleniyor'}
              >
                {item.posterUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.posterUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-black/25"><Play size={16} fill="currentColor" /></span>
              </button>
            ))}
          </div>
        )}

        {review.merchantReply && (
          <div style={{ marginTop: 8, backgroundColor: colors.primaryBg, padding: '8px 12px', borderRadius: radii.default, borderLeft: `3px solid ${colors.primary}`, fontSize: typography.fontSize.xs, color: colors.textSecondary }}>
            <span style={{ fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>Yanıtınız: </span>{review.merchantReply}
          </div>
        )}
      </div>

      {/* Sağ: aksiyonlar — review.status'a göre buton göster */}
      <div className="flex items-center gap-1.5 shrink-0">
        {review.status !== 'approved' && (
          <button
            disabled={actionLoading !== null || hasProcessingVideo}
            title={hasProcessingVideo ? 'Video işlenmeden yorum onaylanamaz.' : undefined}
            style={{ ...componentStyles.btnSm, color: colors.primary, borderColor: colors.primary, backgroundColor: 'transparent', display: 'flex', alignItems: 'center', gap: 4, opacity: actionLoading === 'approved' || hasProcessingVideo ? 0.6 : 1, cursor: actionLoading !== null || hasProcessingVideo ? 'not-allowed' : 'pointer' }}
            onClick={async () => {
              setActionLoading('approved');
              await onStatusChange(review.id, 'approved');
              setActionLoading(null);
            }}
          >
            <Check size={13} /> {actionLoading === 'approved' ? '...' : 'Onayla'}
          </button>
        )}
        {review.status !== 'rejected' && (
          <button
            disabled={actionLoading !== null}
            style={{ ...componentStyles.btnSm, color: colors.error, borderColor: colors.error, backgroundColor: colors.bgWhite, display: 'flex', alignItems: 'center', gap: 4, opacity: actionLoading === 'rejected' ? 0.6 : 1, cursor: actionLoading !== null ? 'not-allowed' : 'pointer' }}
            onClick={async () => {
              setActionLoading('rejected');
              await onStatusChange(review.id, 'rejected');
              setActionLoading(null);
            }}
          >
            <X size={13} /> {actionLoading === 'rejected' ? '...' : 'Reddet'}
          </button>
        )}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button style={{ ...componentStyles.btnSm, padding: '0 8px' }}>
              <MoreVertical size={15} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onReply(review)}>
              <Reply size={14} style={{ minWidth: 14 }} />
              {review.merchantReply ? 'Cevabı Düzenle' : 'Cevapla'}
            </DropdownMenuItem>
            {review.merchantReply && (
              <DropdownMenuItem style={{ color: colors.error }} onClick={() => onDeleteReply(review.id)}>
                <MessageSquareX size={14} style={{ minWidth: 14 }} />
                Cevabı Sil
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem style={{ color: colors.error }} onClick={() => onDeleteReview(review.id)}>
              <Trash2 size={14} style={{ minWidth: 14 }} />
              Yorumu Sil
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

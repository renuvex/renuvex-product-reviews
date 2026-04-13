'use client';

import React from 'react';
import { colors, radii, shadows, typography } from '@/lib/design-tokens';
import { PreviewProps } from '../editor/WidgetEditor';
import { PreviewStars } from './icon-preview';

// ─── Mock data ───────────────────────────────────────────────────────────────

const MOCK_REVIEWS = [
  {
    id: '1',
    author: 'Ayşe K.',
    initials: 'AK',
    rating: 5,
    comment: 'Ürün gerçekten çok kaliteli, beklentilerimi fazlasıyla karşıladı. Hızlı kargo için de teşekkürler!',
    date: '2 gün önce',
    avatarBg: 'rgb(247,245,255)',
    avatarColor: 'rgb(111,85,255)',
    reply: { name: 'Mağaza Sahibi', text: 'Teşekkür ederiz, memnuniyetiniz bizim için çok değerli!' },
  },
  {
    id: '2',
    author: 'Mehmet T.',
    initials: 'MT',
    rating: 4,
    comment: 'Genel olarak memnunum, sadece ambalaj biraz hasarlı gelmişti ama ürün sağlamdı.',
    date: '5 gün önce',
    avatarBg: 'rgb(240,253,244)',
    avatarColor: 'rgb(18,183,106)',
    reply: null,
  },
  {
    id: '3',
    author: 'Zeynep A.',
    initials: 'ZA',
    rating: 5,
    comment: 'Tam aradığım ürün. Kesinlikle tavsiye ederim.',
    date: '1 hafta önce',
    avatarBg: 'rgb(255,251,235)',
    avatarColor: 'rgb(245,158,11)',
    reply: null,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

const SIZE_PRESETS = {
  small:  { titleSize: 20, reviewTextSize: 12, authorSize: 12, replyNameSize: 12, replyTextSize: 12 },
  medium: { titleSize: 24, reviewTextSize: 14, authorSize: 14, replyNameSize: 14, replyTextSize: 14 },
  large:  { titleSize: 28, reviewTextSize: 16, authorSize: 16, replyNameSize: 16, replyTextSize: 16 },
};

export function ReviewsWidgetPreview({ settings }: PreviewProps) {
  const primaryColor = (settings.primaryColor as string) ?? '#111111';
  const title = (settings.title as string) || 'Müşteri Yorumları';
  const showHelpful = (settings.showHelpful as boolean) ?? true;
  const isEnabled = (settings.enabled as boolean) ?? true;
  const reviewIcon = (settings.reviewIcon as string) ?? 'star';
  const starColor = (settings.reviewStarColor as string) ?? '#f59e0b';

  const sizeKey = (settings.size as string) ?? 'medium';
  const sz = SIZE_PRESETS[sizeKey as keyof typeof SIZE_PRESETS] ?? SIZE_PRESETS.medium;
  const { titleSize, reviewTextSize, authorSize, replyNameSize, replyTextSize } = sz;

  // -- Border Radius --
  const widgetRadius = (settings.borderRadius as number) ?? 8;
  const innerRadius = Math.max(0, widgetRadius - 4); // Yorum içi öğelerin orantılı ovalliği

  if (!isEnabled) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        color: colors.textMuted,
        fontSize: typography.fontSize.base,
        border: `2px dashed ${colors.borderDefault}`,
        borderRadius: widgetRadius,
      }}>
        Widget devre dışı
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: colors.bgWhite,
      border: `1px solid ${colors.borderDefault}`,
      borderRadius: widgetRadius,
      boxShadow: shadows.antCard,
      overflow: 'hidden',
      maxWidth: 600,
    }}>
      {/* Widget header */}
      <div style={{ padding: '20px 24px', borderBottom: `1px solid ${colors.borderDefault}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{
            fontSize: titleSize,
            fontWeight: typography.fontWeight.medium,
            color: colors.textPrimary,
            margin: 0,
          }}>
            {title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <PreviewStars rating={4} iconValue={reviewIcon} color={starColor} />
            <span style={{ fontSize: typography.fontSize.sm, color: colors.textMuted }}>4.7 (128)</span>
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <div>
        {MOCK_REVIEWS.map((review, idx) => (
          <div
            key={review.id}
            style={{
              padding: '16px 24px',
              borderBottom: idx < MOCK_REVIEWS.length - 1 ? `1px solid ${colors.borderLight}` : 'none',
            }}
          >
            <div style={{ display: 'flex', gap: 12 }}>
              {/* Avatar */}
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                backgroundColor: review.avatarBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                color: review.avatarColor,
                flexShrink: 0,
              }}>
                {review.initials}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: authorSize, fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>
                      {review.author}
                    </span>
                    <PreviewStars rating={review.rating} iconValue={reviewIcon} color={starColor} />
                  </div>
                  <span style={{ fontSize: typography.fontSize.xs, color: colors.textMuted, flexShrink: 0 }}>
                    {review.date}
                  </span>
                </div>

                <p style={{
                  fontSize: reviewTextSize,
                  color: colors.textSecondary,
                  lineHeight: '1.6',
                  margin: 0,
                }}>
                  {review.comment}
                </p>

                {showHelpful && (
                  <button
                    style={{
                      marginTop: 8,
                      fontSize: typography.fontSize.xs,
                      color: colors.textMuted,
                      background: 'none',
                      border: `1px solid ${colors.borderLight}`,
                      borderRadius: innerRadius,
                      padding: '3px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    👍 Faydalı
                  </button>
                )}

                {review.reply && (
                  <div style={{
                    marginTop: 10,
                    padding: '10px 14px',
                    background: 'rgba(0,0,0,0.03)',
                    borderRadius: innerRadius,
                    borderLeft: `3px solid ${primaryColor}`,
                  }}>
                    <div style={{ fontSize: replyNameSize, fontWeight: typography.fontWeight.medium, color: colors.textPrimary, marginBottom: 4 }}>
                      {review.reply.name}
                    </div>
                    <div style={{ fontSize: replyTextSize, color: colors.textSecondary, lineHeight: '1.6' }}>
                      {review.reply.text}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { colors, radii, shadows, typography } from '@/lib/design-tokens';
import { PreviewProps } from '../editor/WidgetEditor';

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
  },
];

// ─── Star component ──────────────────────────────────────────────────────────

function Stars({ rating, color }: { rating: number; color: string }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            fontSize: 14,
            color: i <= rating ? color : colors.borderDefault,
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ReviewsWidgetPreview({ settings }: PreviewProps) {
  const primaryColor = (settings.primaryColor as string) ?? '#6f55ff';
  const title = (settings.title as string) || 'Müşteri Değerlendirmeleri';
  const showHelpful = (settings.showHelpful as boolean) ?? true;
  const isEnabled = (settings.enabled as boolean) ?? true;

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
        borderRadius: radii.lg,
      }}>
        Widget devre dışı
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: colors.bgWhite,
      border: `1px solid ${colors.borderDefault}`,
      borderRadius: radii.lg,
      boxShadow: shadows.antCard,
      overflow: 'hidden',
      maxWidth: 600,
    }}>
      {/* Widget header */}
      <div style={{ padding: '20px 24px', borderBottom: `1px solid ${colors.borderDefault}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.medium,
            color: colors.textPrimary,
            margin: 0,
          }}>
            {title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Stars rating={4} color={primaryColor} />
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
                    <span style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>
                      {review.author}
                    </span>
                    <Stars rating={review.rating} color={primaryColor} />
                  </div>
                  <span style={{ fontSize: typography.fontSize.xs, color: colors.textMuted, flexShrink: 0 }}>
                    {review.date}
                  </span>
                </div>

                <p style={{
                  fontSize: typography.fontSize.base,
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
                      borderRadius: radii.default,
                      padding: '3px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    👍 Faydalı
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

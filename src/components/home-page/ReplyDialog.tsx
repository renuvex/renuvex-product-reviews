import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { colors, componentStyles, typography, opacity } from '@/lib/design-tokens';
import { Review } from './types';

interface ReplyDialogProps {
  open: boolean;
  review: Review | null;
  onClose: () => void;
  onSubmit: (id: string, text: string) => Promise<void>;
}

export function ReplyDialog({ open, review, onClose, onSubmit }: ReplyDialogProps) {
  const [text, setText] = useState(review?.merchantReply ?? '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setText(review?.merchantReply ?? '');
  }, [review]);

  const handleSubmit = async () => {
    if (!review || !text.trim()) return;
    setLoading(true);
    try {
      await onSubmit(review.id, text.trim());
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col" aria-describedby={undefined}>
        <DialogHeader className="shrink-0">
          <DialogTitle style={componentStyles.dialogTitle}>{review?.merchantReply ? 'Yanıtı Düzenle' : 'Müşteriye Yanıt Ver'}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto space-y-3 py-1">
          {review && (
            <div className="bg-muted rounded-lg p-3" style={{ fontSize: typography.fontSize.base, color: colors.textSecondary }}>
              <span style={{ fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>{review.author}</span>
              {' — '}
              {review.comment}
            </div>
          )}
          <Textarea
            placeholder="Yanıtınızı yazın..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={2000}
            className="resize-none h-32 overflow-y-auto focus-visible:ring-0 focus-visible:ring-offset-0"
            style={{ borderColor: undefined }}
            onFocus={e => {
              e.currentTarget.style.borderColor = colors.primary;
              const len = e.currentTarget.value.length;
              e.currentTarget.setSelectionRange(len, len);
            }}
            onBlur={e => (e.currentTarget.style.borderColor = colors.borderDefault)}
          />
          <div className="text-right" style={{ fontSize: typography.fontSize.sm, color: text.length >= 2000 ? colors.error : colors.textSecondary }}>
            {text.length}/2000
          </div>
        </div>
        <DialogFooter>
          <button style={componentStyles.btnDefault} onClick={onClose}>İptal</button>
          <button onClick={handleSubmit} disabled={loading || !text.trim()}
            style={{ ...componentStyles.btnPrimary, opacity: (loading || !text.trim()) ? opacity.disabled : opacity.full, cursor: (loading || !text.trim()) ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Gönderiliyor...' : 'Gönder'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

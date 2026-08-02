'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { AlertCircle, LoaderCircle, RefreshCw, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { colors, componentStyles, typography } from '@/lib/design-tokens';
import { isAdminReviewSummary } from '@/lib/admin-review-summary';
import { useAdminShell } from '@/features/admin-shell/AdminShellContext';
import { Review, ReviewMedia, TabKey } from './types';
import { AdminMuxPlayerPreview } from './AdminMuxPlayerPreview';
import { isUnapprovedVideoPreview, type MediaPreviewState } from './MediaPreviewState';
import { ReplyDialog } from './ReplyDialog';
import { ReviewsTab } from './ReviewsTab';

export function ReviewModerationScreen() {
  const { getAuthHeader, handleApiAuthenticationFailure } = useAdminShell();
  const [activeTab, setActiveTab] = useState<TabKey>('pending');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [tabCounts, setTabCounts] = useState<Record<TabKey, number>>({ pending: 0, approved: 0, rejected: 0, all: 0 });
  const [loading, setLoading] = useState(false);
  const [hasLoadedReviews, setHasLoadedReviews] = useState(false);
  const [reviewLoadError, setReviewLoadError] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<MediaPreviewState | null>(null);
  const [replyDialog, setReplyDialog] = useState<{ open: boolean; review: Review | null }>({ open: false, review: null });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const pageSizeRef = React.useRef(pageSize);
  const summaryRequestSequenceRef = React.useRef(0);

  useEffect(() => {
    pageSizeRef.current = pageSize;
  }, [pageSize]);

  const fetchReviews = useCallback(async (tab: TabKey, p: number, limit?: number) => {
    setLoading(true);
    setReviewLoadError(false);
    try {
      const statusParam = tab === 'all' ? '' : `&status=${tab}`;
      const res = await axios.get(`/api/admin/reviews?page=${p}&limit=${limit ?? pageSizeRef.current}${statusParam}`, {
        headers: await getAuthHeader(),
      });
      if (res.data?.data) {
        setReviews(res.data.data as Review[]);
        setTotal(res.data.pagination.total);
        setPage(p);
        setHasLoadedReviews(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      if (!handleApiAuthenticationFailure(error)) setReviewLoadError(true);
    } finally {
      setLoading(false);
    }
  }, [getAuthHeader, handleApiAuthenticationFailure]);

  const fetchReviewSummary = useCallback(async () => {
    const requestSequence = ++summaryRequestSequenceRef.current;
    try {
      const response = await axios.get('/api/admin/reviews/summary', {
        headers: await getAuthHeader(),
      });
      if (requestSequence !== summaryRequestSequenceRef.current) return;
      const summary = response.data?.data;
      if (!isAdminReviewSummary(summary)) throw new Error('admin_review_summary_invalid');
      setTabCounts({
        pending: summary.pending,
        approved: summary.approved,
        rejected: summary.rejected,
        all: summary.total,
      });
    } catch (error) {
      if (requestSequence !== summaryRequestSequenceRef.current) return;
      handleApiAuthenticationFailure(error);
    }
  }, [getAuthHeader, handleApiAuthenticationFailure]);

  useEffect(() => {
    void fetchReviews('pending', 1);
    void fetchReviewSummary();
  }, [fetchReviews, fetchReviewSummary]);

  const handleReviewTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    fetchReviews(tab, 1);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await axios.put('/api/admin/reviews', { id, status: newStatus }, { headers: await getAuthHeader() });
      const processing = response.data?.processing === true;
      toast.success(processing
        ? 'Video yayına hazırlanıyor. Onay provider işlemi tamamlanınca uygulanacak.'
        : newStatus === 'approved' ? 'Yorum onaylandı.' : 'Yorum reddedildi.');
      await Promise.all([fetchReviews(activeTab, page), fetchReviewSummary()]);
    } catch (error) {
      if (!handleApiAuthenticationFailure(error)) {
        toast.error("Durum güncellenirken bir hata oluştu, lütfen tekrar deneyin.");
      }
    }
  };

  const getImagePreviewUrl = useCallback(async (mediaId: string, variant: 'thumb_320x427' | 'w1200' = 'w1200') => {
    const response = await axios.get(`/api/admin/reviews/image-preview?mediaId=${encodeURIComponent(mediaId)}&variant=${encodeURIComponent(variant)}`, {
      headers: await getAuthHeader(),
    });
    const signedUrl = response.data?.data?.url;
    return typeof signedUrl === 'string' && signedUrl ? signedUrl : null;
  }, [getAuthHeader]);

  const getVideoThumbnailUrl = useCallback(async (mediaId: string) => {
    const response = await axios.get(`/api/admin/reviews/video-thumbnail?mediaId=${encodeURIComponent(mediaId)}`, {
      headers: await getAuthHeader(),
    });
    const signedUrl = response.data?.data?.url;
    return typeof signedUrl === 'string' && signedUrl ? signedUrl : null;
  }, [getAuthHeader]);

  const handleMediaOpen = async (media: ReviewMedia, reviewStatus: string) => {
    if (media.type === 'image') {
      if (media.url && media.previewMode !== 'signed') {
        setMediaPreview({ mediaId: media.id, type: 'image', url: media.url, loading: false, reviewStatus });
        return;
      }
      if (!media.canPreview) return;
      setMediaPreview({ mediaId: media.id, type: 'image', url: null, loading: true, reviewStatus });
      try {
        const signedUrl = await getImagePreviewUrl(media.id, 'w1200');
        if (typeof signedUrl !== 'string' || !signedUrl) throw new Error('image_preview_url_missing');
        setMediaPreview(current => (
          current?.mediaId === media.id ? { ...current, url: signedUrl, loading: false } : current
        ));
      } catch (error) {
        setMediaPreview(current => (current?.mediaId === media.id ? null : current));
        if (!handleApiAuthenticationFailure(error)) {
          toast.error('Gorsel onizlemesi acilamadi. Lutfen tekrar deneyin.');
        }
      }
      return;
    }
    if (media.type !== 'video' || media.processingStatus !== 'ready') return;
    setMediaPreview({ mediaId: media.id, type: 'video', url: null, width: media.width, height: media.height, loading: true, reviewStatus });
    try {
      const response = await axios.get(`/api/admin/reviews/video-playback?mediaId=${encodeURIComponent(media.id)}`, {
        headers: await getAuthHeader(),
      });
      const data = response.data?.data;
      const playbackId = data?.playbackId;
      const playbackToken = data?.playbackToken;
      const thumbnailToken = data?.thumbnailToken;
      if (typeof playbackId !== 'string' || !playbackId) throw new Error('video_playback_id_missing');
      if (typeof playbackToken !== 'string' || !playbackToken) throw new Error('video_playback_token_missing');
      if (typeof thumbnailToken !== 'string' || !thumbnailToken) throw new Error('video_thumbnail_token_missing');
      setMediaPreview(current => (
        current?.mediaId === media.id
          ? {
              ...current,
              url: typeof data?.url === 'string' ? data.url : null,
              posterUrl: typeof data?.posterUrl === 'string' ? data.posterUrl : null,
              playbackId,
              playbackToken,
              thumbnailToken,
              loading: false,
            }
          : current
      ));
    } catch (error) {
      setMediaPreview(current => (current?.mediaId === media.id ? null : current));
      if (!handleApiAuthenticationFailure(error)) {
        toast.error('Video önizlemesi açılamadı. Lütfen tekrar deneyin.');
      }
    }
  };

  const handleReplySubmit = async (id: string, replyText: string) => {
    try {
      await axios.put('/api/admin/reviews', { id, merchantReply: replyText }, { headers: await getAuthHeader() });
      setReviews(prev => prev.map(r => r.id === id ? { ...r, merchantReply: replyText } : r));
      toast.success("Yanıt başarıyla gönderildi.");
    } catch (error) {
      if (!handleApiAuthenticationFailure(error)) toast.error("Yanıt gönderilirken bir hata oluştu.");
    }
  };

  const handleDeleteReview = (id: string) => setDeleteConfirm(id);

  const confirmDeleteReview = async () => {
    if (!deleteConfirm) return;
    const id = deleteConfirm;
    setDeleteConfirm(null);
    try {
      await axios.delete(`/api/admin/reviews?id=${id}`, { headers: await getAuthHeader() });
      toast.success("Yorum silindi.");
      const targetPage = reviews.length === 1 && page > 1 ? page - 1 : page;
      await Promise.all([fetchReviews(activeTab, targetPage), fetchReviewSummary()]);
    } catch (error) {
      if (!handleApiAuthenticationFailure(error)) {
        void fetchReviews(activeTab, page);
        toast.error("Yorum silinirken bir hata oluştu.");
      }
    }
  };

  const handleDeleteReply = async (id: string) => {
    try {
      await axios.put('/api/admin/reviews', { id, merchantReply: null }, { headers: await getAuthHeader() });
      setReviews(prev => prev.map(r => r.id === id ? { ...r, merchantReply: null } : r));
      toast.success("Yanıt silindi.");
    } catch (error) {
      if (!handleApiAuthenticationFailure(error)) toast.error("Yanıt silinirken bir hata oluştu.");
    }
  };

  const videoPreviewIsPortrait = mediaPreview?.type === 'video'
    && typeof mediaPreview.width === 'number'
    && typeof mediaPreview.height === 'number'
    && mediaPreview.height > mediaPreview.width;
  const videoPreviewShellClassName = videoPreviewIsPortrait
    ? 'flex w-[min(88vw,360px)] max-h-[92vh] flex-col items-center gap-3'
    : 'flex w-[min(92vw,760px)] max-h-[92vh] flex-col items-center gap-3';
  const videoPreviewPlayerClassName = videoPreviewIsPortrait
    ? 'h-[min(72vh,640px)] w-full rounded-lg bg-black shadow-2xl [--media-object-fit:contain] [--media-object-position:center]'
    : 'aspect-video max-h-[72vh] w-full rounded-lg bg-black shadow-2xl [--media-object-fit:contain] [--media-object-position:center]';

  return (
    <div className="w-full">

      <ReplyDialog
        open={replyDialog.open}
        review={replyDialog.review}
        onClose={() => setReplyDialog({ open: false, review: null })}
        onSubmit={handleReplySubmit}
      />

      <Dialog open={!!deleteConfirm} onOpenChange={(open) => { if (!open) setDeleteConfirm(null); }}>
        <DialogContent className="sm:max-w-[400px]" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: typography.fontSize.base, fontWeight: 600, color: colors.textPrimary }}>
              <AlertCircle size={18} color={colors.error} />
              Yorum Silinecek. Emin misiniz?
            </DialogTitle>
          </DialogHeader>
          <p style={{ fontSize: typography.fontSize.sm, color: colors.textSecondary }}>Bu yorum kalıcı olarak silinecektir. Bu işlem geri alınamaz.</p>
          <DialogFooter>
            <button style={componentStyles.btnDefault} onClick={() => setDeleteConfirm(null)}>Vazgeç</button>
            <button style={componentStyles.btnDanger} onClick={confirmDeleteReview}>Sil</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {mediaPreview && (
        <div className="fixed inset-0 bg-black/85 z-[99999] flex items-center justify-center" onClick={() => setMediaPreview(null)} role="dialog" aria-modal="true" aria-label="Yorum medyası önizlemesi">
          <button type="button" className="absolute top-4 right-5 flex h-10 w-10 items-center justify-center text-white bg-transparent border-none cursor-pointer" aria-label="Kapat" onClick={() => setMediaPreview(null)}><X size={24} /></button>
          {mediaPreview.loading ? (
            <div className="flex items-center gap-2 text-white" role="status">
              <LoaderCircle className="animate-spin" size={22} />
              {mediaPreview.type === 'image' ? 'Gorsel yukleniyor...' : 'Video hazırlanıyor...'}
            </div>
          ) : mediaPreview.type === 'video' && mediaPreview.playbackId && mediaPreview.playbackToken && mediaPreview.thumbnailToken ? (
            <div className={videoPreviewShellClassName} onClick={(event) => event.stopPropagation()}>
              {isUnapprovedVideoPreview(mediaPreview) && (
                <div className="flex w-full items-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-950" role="note">
                  <AlertCircle size={17} aria-hidden="true" />
                  Onaylanmamış müşteri videosu
                </div>
              )}
              <AdminMuxPlayerPreview
                playbackId={mediaPreview.playbackId}
                playbackToken={mediaPreview.playbackToken}
                thumbnailToken={mediaPreview.thumbnailToken}
                posterUrl={mediaPreview.posterUrl}
                className={videoPreviewPlayerClassName}
              />
            </div>
          ) : mediaPreview.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mediaPreview.url} alt="Görsel" className="max-w-[90vw] max-h-[90vh] rounded-lg object-contain shadow-2xl" onClick={(event) => event.stopPropagation()} />
          ) : null}
        </div>
      )}

      {reviewLoadError ? (
        <div role="alert" className="mb-4 flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm">
          <span>{hasLoadedReviews ? 'Yorumlar yenilenemedi. Son doğrulanmış liste gösteriliyor.' : 'Yorumlar yüklenemedi.'}</span>
          <button
            type="button"
            onClick={() => void fetchReviews(activeTab, page)}
            style={{ ...componentStyles.btnDefault, display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <RefreshCw size={14} aria-hidden="true" /> Tekrar Dene
          </button>
        </div>
      ) : null}

      {hasLoadedReviews || loading ? (
        <ReviewsTab
          activeTab={activeTab}
          reviews={reviews}
          loading={loading}
          page={page}
          total={total}
          pageSize={pageSize}
          tabCounts={tabCounts}
          onTabChange={handleReviewTabChange}
          onStatusChange={handleStatusChange}
          onReply={(review) => setReplyDialog({ open: true, review })}
          onDeleteReply={handleDeleteReply}
          onDeleteReview={handleDeleteReview}
          onMediaOpen={handleMediaOpen}
          getImagePreviewUrl={getImagePreviewUrl}
          getVideoThumbnailUrl={getVideoThumbnailUrl}
          onPageChange={(nextPage) => void fetchReviews(activeTab, nextPage)}
          onPageSizeChange={(size) => {
            setPageSize(size);
            void fetchReviews(activeTab, 1, size);
          }}
        />
      ) : null}
    </div>
  );
}

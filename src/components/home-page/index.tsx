import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { AlertCircle, CheckCircle2, LoaderCircle, MessageSquare, Settings, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { colors, componentStyles, typography } from '@/lib/design-tokens';
import { TokenHelpers } from '@/helpers/token-helpers';
import { Review, ReviewMedia, WidgetSettingsMap, TabKey } from './types';
import { isUnapprovedVideoPreview, type MediaPreviewState } from './MediaPreviewState';
import { ReplyDialog } from './ReplyDialog';
import { ReviewsTab } from './ReviewsTab';
import { WidgetsContainer } from './widgets';
import {
  INITIAL_WIDGET_SETTINGS_LOAD_STATE,
  reduceWidgetSettingsLoadState,
  type WidgetSettingsLoadState,
} from './widgets/editor/WidgetSettingsLoadState';

// Her admin API çağrısından önce taze JWT token al — uzun açık kalan
// sayfada eski token expire olduğunda 401 alıp "kaydedilemedi" hatası
// vermesini önler. TokenHelpers cache'li, expired token'ı atıp AppBridge'den
// yenisini çeker.
async function freshAuthHeader(fallbackToken: string | null): Promise<{ Authorization: string }> {
  const fresh = await TokenHelpers.getTokenForIframeApp();
  return { Authorization: `JWT ${fresh || fallbackToken || ''}` };
}

interface HomePageProps {
  token: string | null;
  storeName?: string;
}

export default function HomePage({ token, storeName }: HomePageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('pending');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [tabCounts, setTabCounts] = useState<Record<TabKey, number>>({ pending: 0, approved: 0, rejected: 0, all: 0 });
  const [settingsLoadState, setSettingsLoadState] = useState<WidgetSettingsLoadState>(INITIAL_WIDGET_SETTINGS_LOAD_STATE);
  const [loading, setLoading] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<MediaPreviewState | null>(null);
  const [replyDialog, setReplyDialog] = useState<{ open: boolean; review: Review | null }>({ open: false, review: null });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const settings = settingsLoadState.settings;

  const pageSizeRef = React.useRef(pageSize);
  pageSizeRef.current = pageSize;

  const fetchReviews = useCallback(async (tab: TabKey, p: number, limit?: number) => {
    if (!token) return;
    setLoading(true);
    try {
      const statusParam = tab === 'all' ? '' : `&status=${tab}`;
      const res = await axios.get(`/api/admin/reviews?page=${p}&limit=${limit ?? pageSizeRef.current}${statusParam}`, {
        headers: await freshAuthHeader(token),
      });
      if (res.data?.data) {
        setReviews(res.data.data as Review[]);
        setTotal(res.data.pagination.total);
        setPage(p);
        setTabCounts(prev => ({ ...prev, [tab]: res.data.pagination.total }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error("Yorumlar çekilirken hata:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchAllCounts = useCallback(async () => {
    if (!token) return;
    const headers = await freshAuthHeader(token);
    try {
      const [pending, approved, rejected, all] = await Promise.all([
        axios.get('/api/admin/reviews?status=pending&page=1&limit=1', { headers }),
        axios.get('/api/admin/reviews?status=approved&page=1&limit=1', { headers }),
        axios.get('/api/admin/reviews?status=rejected&page=1&limit=1', { headers }),
        axios.get('/api/admin/reviews?page=1&limit=1', { headers }),
      ]);
      setTabCounts({
        pending:  pending.data?.pagination?.total  ?? 0,
        approved: approved.data?.pagination?.total ?? 0,
        rejected: rejected.data?.pagination?.total ?? 0,
        all:      all.data?.pagination?.total      ?? 0,
      });
    } catch (error) {
      console.error("Tab sayıları çekilirken hata:", error);
    }
  }, [token]);

  const loadSettings = useCallback(async () => {
    if (!token) return;

    setSettingsLoadState(state => reduceWidgetSettingsLoadState(state, { type: 'start' }));

    try {
      const settingsRes = await axios.get('/api/admin/settings', { headers: await freshAuthHeader(token) });
      setSettingsLoadState(state => reduceWidgetSettingsLoadState(state, {
        type: 'success',
        settings: settingsRes.data?.data,
      }));
    } catch (error) {
      console.error("Widget ayarları çekilirken hata:", error);
      setSettingsLoadState(state => reduceWidgetSettingsLoadState(state, { type: 'failure' }));
    }
  }, [token]);

  const handleSettingsChange = useCallback((nextSettings: WidgetSettingsMap) => {
    setSettingsLoadState(state => ({
      ...state,
      settings: nextSettings,
    }));
  }, []);

  useEffect(() => {
    if (!token) return;
    void fetchReviews('pending', 1);
    void fetchAllCounts();
    void loadSettings();
  }, [token, fetchReviews, fetchAllCounts, loadSettings]);

  const handleReviewTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    fetchReviews(tab, 1);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await axios.put('/api/admin/reviews', { id, status: newStatus }, { headers: await freshAuthHeader(token) });
      const processing = response.data?.processing === true;
      toast.success(processing
        ? 'Video yayına hazırlanıyor. Onay provider işlemi tamamlanınca uygulanacak.'
        : newStatus === 'approved' ? 'Yorum onaylandı.' : 'Yorum reddedildi.');
      await Promise.all([fetchReviews(activeTab, page), fetchAllCounts()]);
    } catch (error) {
      console.error("Durum güncellenemedi:", error);
      toast.error("Durum güncellenirken bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  const handleMediaOpen = async (media: ReviewMedia, reviewStatus: string) => {
    if (media.type === 'image' && media.url) {
      setMediaPreview({ mediaId: media.id, type: 'image', url: media.url, loading: false, reviewStatus });
      return;
    }
    if (media.type !== 'video' || media.processingStatus !== 'ready') return;
    setMediaPreview({ mediaId: media.id, type: 'video', url: null, loading: true, reviewStatus });
    try {
      const response = await axios.get(`/api/admin/reviews/video-playback?mediaId=${encodeURIComponent(media.id)}`, {
        headers: await freshAuthHeader(token),
      });
      const url = response.data?.data?.url;
      if (typeof url !== 'string' || !url) throw new Error('video_playback_url_missing');
      setMediaPreview(current => (
        current?.mediaId === media.id
          ? { ...current, url, loading: false }
          : current
      ));
    } catch (error) {
      console.error('Video önizlemesi açılamadı:', error);
      setMediaPreview(current => (current?.mediaId === media.id ? null : current));
      toast.error('Video önizlemesi açılamadı. Lütfen tekrar deneyin.');
    }
  };

  const handleReplySubmit = async (id: string, replyText: string) => {
    try {
      await axios.put('/api/admin/reviews', { id, merchantReply: replyText }, { headers: await freshAuthHeader(token) });
      setReviews(prev => prev.map(r => r.id === id ? { ...r, merchantReply: replyText } : r));
      toast.success("Yanıt başarıyla gönderildi.");
    } catch {
      toast.error("Yanıt gönderilirken bir hata oluştu.");
    }
  };

  const handleDeleteReview = (id: string) => setDeleteConfirm(id);

  const confirmDeleteReview = async () => {
    if (!deleteConfirm) return;
    const id = deleteConfirm;
    const deletedReview = reviews.find(r => r.id === id);
    setDeleteConfirm(null);
    try {
      await axios.delete(`/api/admin/reviews?id=${id}`, { headers: await freshAuthHeader(token) });
      toast.success("Yorum silindi.");
      const targetPage = reviews.length === 1 && page > 1 ? page - 1 : page;
      await fetchReviews(activeTab, targetPage);
      if (deletedReview) {
        setTabCounts(prev => ({
          ...prev,
          [deletedReview.status as TabKey]: Math.max(0, prev[deletedReview.status as TabKey] - 1),
          all: Math.max(0, prev.all - 1),
        }));
      }
    } catch {
      fetchReviews(activeTab, page);
      toast.error("Yorum silinirken bir hata oluştu.");
    }
  };

  const handleDeleteReply = async (id: string) => {
    try {
      await axios.put('/api/admin/reviews', { id, merchantReply: null }, { headers: await freshAuthHeader(token) });
      setReviews(prev => prev.map(r => r.id === id ? { ...r, merchantReply: null } : r));
      toast.success("Yanıt silindi.");
    } catch {
      toast.error("Yanıt silinirken bir hata oluştu.");
    }
  };

  const saveSettings = async (widgetId: string, widgetSettings: Record<string, unknown>) => {
    try {
      await axios.put('/api/admin/settings', { widgetId, settings: widgetSettings }, { headers: await freshAuthHeader(token) });
      toast.success('Kaydetme başarılı! Değişiklikleriniz sitenize birkaç dakika içinde yansıtılacaktır.');
    } catch {
      toast.error('Ayarlar kaydedilirken bir hata oluştu.');
      throw new Error('save_failed');
    }
  };

  if (!token) {
    return (
      <div className="max-w-[1200px] mx-auto p-6 bg-background min-h-[100vh]">
        <div className="text-center p-20 bg-muted rounded-xl border border-dashed">
          <h3 className="mb-2" style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>Authentication Required</h3>
          <p style={{ fontSize: typography.fontSize.base, color: colors.textMuted }}>Please authenticate to access the Review Dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-background min-h-screen">

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
            <div className="flex items-center gap-2 text-white" role="status"><LoaderCircle className="animate-spin" size={22} /> Video hazırlanıyor...</div>
          ) : mediaPreview.type === 'video' && mediaPreview.url ? (
            <div className="flex max-h-[94vh] max-w-[94vw] flex-col items-center gap-3" onClick={(event) => event.stopPropagation()}>
              {isUnapprovedVideoPreview(mediaPreview) && (
                <div className="flex w-full items-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-950" role="note">
                  <AlertCircle size={17} aria-hidden="true" />
                  Onaylanmamış müşteri videosu
                </div>
              )}
              <video src={mediaPreview.url} muted controls playsInline preload="metadata" className="max-h-[86vh] max-w-[90vw] rounded-lg bg-black shadow-2xl" />
            </div>
          ) : mediaPreview.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mediaPreview.url} alt="Görsel" className="max-w-[90vw] max-h-[90vh] rounded-lg object-contain shadow-2xl" onClick={(event) => event.stopPropagation()} />
          ) : null}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, color: colors.textPrimary, letterSpacing: '-0.02em' }}>Değerlendirmeler</h1>
          <p className="mt-1" style={{ fontSize: typography.fontSize.base, color: colors.textMuted }}>
            <span style={{ fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>{storeName}</span> mağazanızın müşteri yorumlarını yönetin.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ ...componentStyles.badgeApproved, fontSize: typography.fontSize.sm, padding: '4px 12px' }}>
            <CheckCircle2 size={14} style={{ marginRight: 4, display: 'inline' }} /> İkas&apos;a Bağlı
          </span>
        </div>
      </div>

      <Tabs defaultValue="reviews" orientation="vertical" className="gap-4">
        <TabsList className="h-fit p-1.5 bg-muted/30 rounded-xl w-44 shrink-0 border border-border/50">
          <TabsTrigger value="reviews" className="py-2 px-3 rounded-lg mb-1" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium }}>
            <MessageSquare size={15} className="mr-1.5 shrink-0" />
            <span className="truncate">Yorumlar</span>
          </TabsTrigger>
          <TabsTrigger value="widgets" className="py-2 px-3 rounded-lg" style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium }}>
            <Settings size={15} className="mr-1.5 shrink-0" />
            <span className="truncate">Widgetlar</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="m-0 flex-1 min-w-0">
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
            onReply={(r) => setReplyDialog({ open: true, review: r })}
            onDeleteReply={handleDeleteReply}
            onDeleteReview={handleDeleteReview}
            onMediaOpen={handleMediaOpen}
            onPageChange={(p) => fetchReviews(activeTab, p)}
            onPageSizeChange={(size) => { setPageSize(size); fetchReviews(activeTab, 1, size); }}
          />
        </TabsContent>

        <TabsContent value="widgets" className="m-0 flex-1 min-w-0">
          <WidgetsContainer
            settings={settings}
            settingsStatus={settingsLoadState.status}
            onChange={handleSettingsChange}
            onSave={async (widgetId, widgetSettings) => {
              await saveSettings(widgetId, widgetSettings);
            }}
            onRetrySettings={loadSettings}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

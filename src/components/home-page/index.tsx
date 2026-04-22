import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { AlertCircle, CheckCircle2, MessageSquare, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { colors, componentStyles, typography } from '@/lib/design-tokens';
import { TokenHelpers } from '@/helpers/token-helpers';
import { Review, WidgetSettingsMap, TabKey } from './types';
import { ReplyDialog } from './ReplyDialog';
import { ReviewsTab } from './ReviewsTab';
import { WidgetsContainer } from './widgets';

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
  const [settings, setSettings] = useState<WidgetSettingsMap>({});
  const [loading, setLoading] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [replyDialog, setReplyDialog] = useState<{ open: boolean; review: Review | null }>({ open: false, review: null });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

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

  useEffect(() => {
    if (!token) return;
    const init = async () => {
      const [, settingsRes] = await Promise.all([
        fetchReviews('pending', 1),
        axios.get('/api/admin/settings', { headers: await freshAuthHeader(token) }),
      ]);
      if (settingsRes.data?.data) setSettings(settingsRes.data.data as WidgetSettingsMap);
      fetchAllCounts();
    };
    init();
  }, [token, fetchReviews, fetchAllCounts]);

  const handleReviewTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    fetchReviews(tab, 1);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const targetReview = reviews.find(r => r.id === id);
    const oldStatus = targetReview?.status;
    try {
      await axios.put('/api/admin/reviews', { id, status: newStatus }, { headers: await freshAuthHeader(token) });
      toast.success(newStatus === 'approved' ? 'Yorum onaylandı.' : 'Yorum reddedildi.');
      await fetchReviews(activeTab, page);
      if (oldStatus && oldStatus !== newStatus) {
        setTabCounts(prev => ({
          ...prev,
          [oldStatus as TabKey]: Math.max(0, prev[oldStatus as TabKey] - 1),
          [newStatus as TabKey]: prev[newStatus as TabKey] + 1,
        }));
      }
    } catch (error) {
      console.error("Durum güncellenemedi:", error);
      toast.error("Durum güncellenirken bir hata oluştu, lütfen tekrar deneyin.");
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
        <DialogContent className="sm:max-w-[400px]">
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

      {lightboxUrl && (
        <div className="fixed inset-0 bg-black/85 z-[99999] flex items-center justify-center cursor-zoom-out" onClick={() => setLightboxUrl(null)}>
          <button className="absolute top-4 right-5 text-white text-3xl leading-none bg-transparent border-none cursor-pointer" onClick={() => setLightboxUrl(null)}>✕</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightboxUrl} alt="Görsel" className="max-w-[90vw] max-h-[90vh] rounded-lg object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
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
            onLightbox={setLightboxUrl}
            onPageChange={(p) => fetchReviews(activeTab, p)}
            onPageSizeChange={(size) => { setPageSize(size); fetchReviews(activeTab, 1, size); }}
          />
        </TabsContent>

        <TabsContent value="widgets" className="m-0 flex-1 min-w-0">
          <WidgetsContainer
            settings={settings}
            onChange={setSettings}
            onSave={async (widgetId, widgetSettings) => {
              await saveSettings(widgetId, widgetSettings);
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

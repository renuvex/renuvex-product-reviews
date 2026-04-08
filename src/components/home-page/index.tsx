import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'sonner';
import { CheckCircle2, MessageSquare, Settings, Star, Check, X, ChevronDown, ChevronUp, MoreVertical, Trash2, MessageSquareX, Reply } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { colors, componentStyles, radii, typography, opacity } from '@/lib/design-tokens';

interface Review {
  id: string;
  storeId: string;
  productId: string;
  productName: string | null;
  rating: number;
  comment: string | null;
  author: string;
  status: string;
  merchantReply: string | null;
  images: string | null;
  createdAt: string;
  helpfulCount: number;
}

interface StoreSettings {
  widgetTitle?: string;
  widgetColor?: string;
  autoApprove?: boolean;
  showHelpful?: boolean;
}

interface HomePageProps {
  token: string | null;
  storeName?: string;
}

const COMMENT_LIMIT = 180;

function ReviewRow({ review, statusFilter, onStatusChange, onReply, onDeleteReply, onDeleteReview, onLightbox, renderStars }: {
  review: Review;
  statusFilter: string;
  onStatusChange: (id: string, status: string) => void;
  onReply: (review: Review) => void;
  onDeleteReply: (id: string) => void;
  onDeleteReview: (id: string) => void;
  onLightbox: (url: string) => void;
  renderStars: (n: number) => React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  const comment = review.comment || '';
  const isLong = comment.length > COMMENT_LIMIT;
  const displayedComment = isLong && !expanded ? comment.slice(0, COMMENT_LIMIT) + '…' : comment;

  let images: string[] = [];
  try { if (review.images) images = JSON.parse(review.images); } catch (_) {}

  return (
    <div className="flex items-start gap-4 px-6 py-4 hover:bg-muted/30 transition-colors">
      {/* Sol: ürün + müşteri + yorum */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>{review.author || '—'}</span>
          <span style={{ fontSize: typography.fontSize.xs, color: colors.textMuted }}>·</span>
          <span style={{ fontSize: typography.fontSize.xs, color: colors.textMuted }}>{new Date(review.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>
        <div className="truncate mb-2" style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, color: colors.primary }}>{review.productName || review.productId}</div>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex gap-0.5">{renderStars(review.rating)}</div>
          {review.helpfulCount > 0 && (
            <span style={{ fontSize: typography.fontSize.xs, color: colors.textMuted }}>{review.helpfulCount} kişi faydalı buldu</span>
          )}
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

        {images.length > 0 && (
          <div className="mt-2 flex gap-2 flex-wrap">
            {images.map((img, idx) => (
              <Image key={idx} src={img} alt="Review" width={48} height={48}
                className="w-10 h-10 object-cover rounded border border-border cursor-zoom-in"
                onClick={() => onLightbox(img)} />
            ))}
          </div>
        )}

        {review.merchantReply && (
          <div style={{ marginTop: 8, backgroundColor: colors.primaryBg, padding: '8px 12px', borderRadius: radii.default, borderLeft: `3px solid ${colors.primary}`, fontSize: typography.fontSize.xs, color: colors.textSecondary }}>
            <span style={{ fontWeight: typography.fontWeight.medium, color: colors.textPrimary }}>Yanıtınız: </span>{review.merchantReply}
          </div>
        )}
      </div>

      {/* Sağ: aksiyonlar */}
      <div className="flex items-center gap-1.5 shrink-0">
        {statusFilter !== 'approved' && (
          <button
            style={{ ...componentStyles.btnSm, color: colors.primary, borderColor: colors.primary, backgroundColor: 'transparent', display: 'flex', alignItems: 'center', gap: 4 }}
            onClick={() => onStatusChange(review.id, 'approved')}
          >
            <Check size={13} /> Onayla
          </button>
        )}
        {statusFilter !== 'rejected' && (
          <button
            style={{ ...componentStyles.btnSm, color: colors.error, borderColor: colors.error, backgroundColor: colors.bgWhite, display: 'flex', alignItems: 'center', gap: 4 }}
            onClick={() => onStatusChange(review.id, 'rejected')}
          >
            <X size={13} /> Reddet
          </button>
        )}
        <DropdownMenu>
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

function ReplyDialog({ open, review, onClose, onSubmit }: {
  open: boolean;
  review: Review | null;
  onClose: () => void;
  onSubmit: (id: string, text: string, status: string) => Promise<void>;
}) {
  const [text, setText] = useState(review?.merchantReply ?? '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setText(review?.merchantReply ?? '');
  }, [review]);

  const handleSubmit = async () => {
    if (!review || !text.trim()) return;
    setLoading(true);
    try {
      await onSubmit(review.id, text.trim(), review.status);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col">
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
            className="resize-none h-32 overflow-y-auto focus-visible:ring-0 focus-visible:ring-offset-0"
    style={{ borderColor: undefined }}
    onFocus={e => (e.currentTarget.style.borderColor = colors.primary)}
    onBlur={e => (e.currentTarget.style.borderColor = colors.borderDefault)}
          />
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

interface PaginatedReviews {
  data: Review[];
  total: number;
  page: number;
}

export default function HomePage({ token, storeName }: HomePageProps) {
  const [activeTab, setActiveTab] = useState('pending');
  const [tabData, setTabData] = useState<Record<string, PaginatedReviews>>({
    pending: { data: [], total: 0, page: 1 },
    approved: { data: [], total: 0, page: 1 },
    rejected: { data: [], total: 0, page: 1 },
  });
  const [pageSize, setPageSize] = useState(20);
  const [settings, setSettings] = useState<StoreSettings>({});
  const [loading, setLoading] = useState(false);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [replyDialog, setReplyDialog] = useState<{ open: boolean; review: Review | null }>({ open: false, review: null });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const pageSizeRef = React.useRef(pageSize);
  pageSizeRef.current = pageSize;

  const fetchReviews = useCallback(async (status: string, page: number, limit?: number) => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get(`/api/admin/reviews?status=${status}&page=${page}&limit=${limit ?? pageSizeRef.current}`, {
        headers: { Authorization: `JWT ${token}` },
      });
      if (res.data?.data) {
        setTabData(prev => ({
          ...prev,
          [status]: { data: res.data.data as Review[], total: res.data.pagination.total, page },
        }));
      }
    } catch (error) {
      console.error("Yorumlar çekilirken hata:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // İlk yüklemede ayarları ve aktif tab'ı çek
  useEffect(() => {
    if (!token) return;
    const init = async () => {
      const [, settingsRes] = await Promise.all([
        fetchReviews('pending', 1),
        axios.get('/api/admin/settings', { headers: { Authorization: `JWT ${token}` } }),
      ]);
      if (settingsRes.data?.data) setSettings(settingsRes.data.data as StoreSettings);
    };
    init();
  }, [token, fetchReviews]);

  // Tab değişince o tab'ın verisini çek (henüz çekilmediyse)
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab !== 'settings' && tabData[tab].data.length === 0) {
      fetchReviews(tab, 1);
    }
  };

  const updateReviewInTab = (status: string, updater: (r: Review) => Review) => {
    setTabData(prev => ({
      ...prev,
      [status]: {
        ...prev[status],
        data: prev[status].data.map(updater),
      },
    }));
  };

  const removeReviewFromTab = (status: string, id: string) => {
    setTabData(prev => ({
      ...prev,
      [status]: { ...prev[status], data: prev[status].data.filter(r => r.id !== id), total: prev[status].total - 1 },
    }));
  };

  // Yorum Durumunu Güncelleme (Onayla / Reddet)
  const handleStatusChange = async (id: string, newStatus: string) => {
    const currentStatus = activeTab;
    removeReviewFromTab(currentStatus, id);
    try {
      await axios.put('/api/admin/reviews',
        { id, status: newStatus },
        { headers: { Authorization: `JWT ${token}` } }
      );
      toast.success(newStatus === 'approved' ? 'Yorum onaylandı.' : 'Yorum reddedildi.');
      // Hedef tab'ı yenile
      fetchReviews(newStatus, tabData[newStatus].page);
    } catch (error) {
      console.error("Durum güncellenemedi:", error);
      fetchReviews(currentStatus, tabData[currentStatus].page);
      toast.error("Durum güncellenirken bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  // Yanıt gönderme
  const handleReplySubmit = async (id: string, replyText: string, reviewStatus: string) => {
    try {
      await axios.put('/api/admin/reviews',
        { id, merchantReply: replyText },
        { headers: { Authorization: `JWT ${token}` } }
      );
      updateReviewInTab(reviewStatus, r => r.id === id ? { ...r, merchantReply: replyText } : r);
      toast.success("Yanıt başarıyla gönderildi.");
    } catch {
      toast.error("Yanıt gönderilirken bir hata oluştu.");
    }
  };

  // Yorum silme
  const handleDeleteReview = (id: string) => {
    setDeleteConfirm(id);
  };

  const confirmDeleteReview = async () => {
    if (!deleteConfirm) return;
    const id = deleteConfirm;
    const currentStatus = activeTab;
    setDeleteConfirm(null);
    removeReviewFromTab(currentStatus, id);
    try {
      await axios.delete(`/api/admin/reviews?id=${id}`, { headers: { Authorization: `JWT ${token}` } });
      toast.success("Yorum silindi.");
    } catch {
      fetchReviews(currentStatus, tabData[currentStatus].page);
      toast.error("Yorum silinirken bir hata oluştu.");
    }
  };

  // Yanıt silme
  const handleDeleteReply = async (id: string) => {
    const currentStatus = activeTab;
    updateReviewInTab(currentStatus, r => r.id === id ? { ...r, merchantReply: null } : r);
    try {
      await axios.put('/api/admin/reviews',
        { id, merchantReply: null },
        { headers: { Authorization: `JWT ${token}` } }
      );
      toast.success("Yanıt silindi.");
    } catch {
      fetchReviews(currentStatus, tabData[currentStatus].page);
      toast.error("Yanıt silinirken bir hata oluştu.");
    }
  };

  // Ayarları Kaydetme
  const saveSettings = async () => {
    try {
      await axios.put('/api/admin/settings', settings, { headers: { Authorization: `JWT ${token}` } });
      toast.success("Ayarlar başarıyla kaydedildi.");
    } catch {
      toast.error("Ayarlar kaydedilirken bir hata oluştu.");
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

  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} size={14} className={i < count ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} />
    ));
  };

  const renderTabContent = (statusFilter: string) => {
    const { data, total, page } = tabData[statusFilter];
    const totalPages = Math.ceil(total / pageSize);
    const title = statusFilter === 'pending' ? 'Bekleyen Yorumlar' : statusFilter === 'approved' ? 'Onaylı Yorumlar' : 'Reddedilen Yorumlar';

    return (
      <>
      <Card>
        <CardHeader>
          <CardTitle style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.medium }}>{title}</CardTitle>
          <CardDescription>
            {loading ? "Lütfen Bekleyin..." : `${total} adet yorum bulunuyor.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {data.length === 0 && !loading ? (
            <div className="h-24 flex items-center justify-center px-6" style={{ fontSize: typography.fontSize.base, color: colors.textMuted }}>
              Bu kategoride henüz yorum bulunamadı.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {data.map((review) => (
                <ReviewRow
                  key={review.id}
                  review={review}
                  statusFilter={statusFilter}
                  onStatusChange={handleStatusChange}
                  onReply={(r) => { setReplyDialog({ open: true, review: r }); }}
                  onDeleteReply={handleDeleteReply}
                  onDeleteReview={handleDeleteReview}
                  onLightbox={setLightboxUrl}
                  renderStars={renderStars}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      {total > 0 && (
        <div className="sticky bottom-0 mt-0 flex items-center justify-between px-6 py-3 border border-border bg-white/80 backdrop-blur-sm rounded-xl">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span style={{ fontSize: typography.fontSize.base, color: colors.textSecondary }}>Satır Adedi:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  const newSize = Number(e.target.value);
                  setPageSize(newSize);
                  fetchReviews(statusFilter, 1, newSize);
                }}
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
                onClick={() => fetchReviews(statusFilter, page - 1)}>
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
                    onClick={() => fetchReviews(statusFilter, p as number)}
                  >
                    {p}
                  </button>
                ))}
              <button disabled={page >= totalPages || loading}
                style={{ background: 'none', border: 'none', outline: 'none', fontSize: typography.fontSize.base, cursor: page >= totalPages ? 'not-allowed' : 'pointer', color: page >= totalPages ? colors.textMuted : colors.textPrimary, padding: '0 4px' }}
                onClick={() => fetchReviews(statusFilter, page + 1)}>
                Sonraki &gt;
              </button>
            </div>
          )}
        </div>
      )}
      </>
    );
  };

  return (
    <div className="w-full p-4 bg-background min-h-screen">

      {/* Yanıt Dialog */}
      <ReplyDialog
        open={replyDialog.open}
        review={replyDialog.review}
        onClose={() => setReplyDialog({ open: false, review: null })}
        onSubmit={handleReplySubmit}
      />

      {/* Yorum Silme Onay Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={(open) => { if (!open) setDeleteConfirm(null); }}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle style={componentStyles.dialogTitle}>Yorumu Sil</DialogTitle>
          </DialogHeader>
          <p style={{ fontSize: typography.fontSize.base, color: colors.textSecondary }}>Bu yorum kalıcı olarak silinecek. Bu işlem geri alınamaz.</p>
          <DialogFooter>
            <button style={componentStyles.btnDefault} onClick={() => setDeleteConfirm(null)}>İptal</button>
            <button style={componentStyles.btnDanger} onClick={confirmDeleteReview}>Evet, Sil</button>
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

      <Tabs defaultValue="pending" orientation="vertical" className="gap-4" onValueChange={handleTabChange}>
        <TabsList className="h-fit p-1.5 bg-muted/30 rounded-xl w-44 shrink-0 border border-border/50">
          <TabsTrigger value="pending" className="py-2 px-3 rounded-lg mb-1">
            <MessageSquare size={15} className="mr-1.5 shrink-0" />
            <span className="truncate">Bekleyen</span>
            {tabData.pending.total > 0 && (
              <Badge variant="secondary" className="ml-auto shrink-0" style={{ backgroundColor: colors.primary, color: colors.textWhite, fontSize: typography.fontSize.xs }}>{tabData.pending.total}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved" className="py-2 px-3 rounded-lg mb-1">
            <Check size={15} className="mr-1.5 shrink-0" />
            <span className="truncate">Onaylı</span>
          </TabsTrigger>
          <TabsTrigger value="rejected" className="py-2 px-3 rounded-lg mb-1">
            <X size={15} className="mr-1.5 shrink-0" />
            <span className="truncate">Reddedilen</span>
          </TabsTrigger>
          <div className="my-1.5 border-t border-border/50 w-full" />
          <TabsTrigger value="settings" className="py-2 px-3 rounded-lg">
            <Settings size={15} className="mr-1.5 shrink-0" />
            <span className="truncate">Widget Ayarları</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="m-0">
          {renderTabContent('pending')}
        </TabsContent>
        <TabsContent value="approved" className="m-0">
          {renderTabContent('approved')}
        </TabsContent>
        <TabsContent value="rejected" className="m-0">
          {renderTabContent('rejected')}
        </TabsContent>

        <TabsContent value="settings" className="m-0">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.medium }}>Widget Görünüm Ayarları</CardTitle>
              <CardDescription>Müşterilerin ürün sayfalarında göreceği yorum panelinin tasarımını özelleştirin.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Widget Başlığı</Label>
                  <Input
                    id="title"
                    value={settings.widgetTitle || "Müşteri Değerlendirmeleri"}
                    onChange={(e) => setSettings({ ...settings, widgetTitle: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Ana Tema Rengi</Label>
                  <div className="flex gap-2">
                    <Input
                      id="color"
                      type="color"
                      className="w-[80px] p-1 h-10"
                      value={settings.widgetColor || "#000000"}
                      onChange={(e) => setSettings({ ...settings, widgetColor: e.target.value })}
                    />
                    <Input
                      value={settings.widgetColor || "#000000"}
                      onChange={(e) => setSettings({ ...settings, widgetColor: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-3 col-span-2">
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={settings.autoApprove || false}
                      onChange={(e) => setSettings({ ...settings, autoApprove: e.target.checked })}
                    />
                    Yeni Yorumları Otomatik Onayla
                  </Label>
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={settings.showHelpful ?? true}
                      onChange={(e) => setSettings({ ...settings, showHelpful: e.target.checked })}
                    />
                    Faydalı Butonu Göster
                  </Label>
                </div>
              </div>

              <button style={componentStyles.btnPrimary} onClick={saveSettings}>Ayarları Kaydet</button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

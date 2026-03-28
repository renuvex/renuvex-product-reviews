import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { CheckCircle2, MessageSquare, Settings, Star, Check, X, Reply } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
}

interface StoreSettings {
  widgetTitle?: string;
  widgetColor?: string;
  widgetTemplate?: string;
  autoApprove?: boolean;
}

interface HomePageProps {
  token: string | null;
  storeName?: string;
}

export default function HomePage({ token, storeName }: HomePageProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [settings, setSettings] = useState<StoreSettings>({});
  const [loading, setLoading] = useState(true);

  // Verileri Backend'den (Prisma) Çekme Fonksiyonu
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        // Hem yorumları hem ayarları paralel çek
        const [reviewsRes, settingsRes] = await Promise.all([
          axios.get('/api/admin/reviews', { headers: { Authorization: `JWT ${token}` } }),
          axios.get('/api/admin/settings', { headers: { Authorization: `JWT ${token}` } })
        ]);
        
        if (reviewsRes.data?.data) {
          setReviews(reviewsRes.data.data as Review[]);
        }
        if (settingsRes.data?.data) {
          setSettings(settingsRes.data.data as StoreSettings);
        }
      } catch (error) {
        console.error("Veriler çekilirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Yorum Durumunu Güncelleme (Onayla / Reddet)
  const handleStatusChange = async (id: string, newStatus: string) => {
    const previousReviews = reviews;
    setReviews(reviews.map(r => r.id === id ? { ...r, status: newStatus } : r));
    try {
      await axios.put('/api/admin/reviews',
        { id, status: newStatus },
        { headers: { Authorization: `JWT ${token}` } }
      );
    } catch (error) {
      console.error("Durum güncellenemedi:", error);
      setReviews(previousReviews);
      alert("Durum güncellenirken bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  // Ayarları Kaydetme
  const saveSettings = async () => {
    try {
      await axios.put('/api/admin/settings', settings, { headers: { Authorization: `JWT ${token}` } });
      alert("Ayarlar başarıyla kaydedildi!");
    } catch (error) {
      alert("Ayarlar kaydedilirken bir hata oluştu.");
    }
  };

  if (!token) {
    return (
      <div className="max-w-[1200px] mx-auto p-6 bg-background min-h-[100vh]">
        <div className="text-center p-20 bg-muted rounded-xl border border-dashed">
          <h3 className="text-lg font-semibold mb-2">Authentication Required</h3>
          <p className="text-muted-foreground">Please authenticate to access the Review Dashboard.</p>
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
    const filtered = reviews.filter(r => r.status === statusFilter);
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {statusFilter === 'pending' ? 'Bekleyen Yorumlar' : statusFilter === 'approved' ? 'Onaylı Yorumlar' : 'Reddedilen Yorumlar'}
          </CardTitle>
          <CardDescription>
            {loading ? "Lütfen Bekleyin..." : `${filtered.length} adet yorum bulunuyor.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Müşteri & Ürün</TableHead>
                  <TableHead>Puan</TableHead>
                  <TableHead className="w-[40%]">Yorum</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div className="font-medium">{review.author}</div>
                      <div className="text-sm font-semibold text-primary">{review.productName || review.productId}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">{renderStars(review.rating)}</div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{review.comment}</p>
                      
                      {/* Görsellerin Tabloda Görünmesi */}
                      {review.images && (
                        <div className="mt-3 flex gap-2 flex-wrap">
                          {(() => {
                            try {
                              const imgs = JSON.parse(review.images);
                              return Array.isArray(imgs) ? imgs.map((img: string, idx: number) => (
                                <Image
                                  key={idx}
                                  src={img}
                                  alt="Review"
                                  width={48}
                                  height={48}
                                  className="w-12 h-12 object-cover rounded border border-gray-200 cursor-zoom-in"
                                  onClick={() => window.open(img, '_blank')}
                                />
                              )) : null;
                            } catch (e) { return null; }
                          })()}
                        </div>
                      )}

                      {review.merchantReply && (
                        <div className="mt-2 bg-muted p-2 rounded text-xs border-l-2 border-primary">
                          <strong>Cevabınız:</strong> {review.merchantReply}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                       {statusFilter !== 'approved' && (
                          <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50" onClick={() => handleStatusChange(review.id, 'approved')}>
                            <Check size={14} className="mr-1" /> Onayla
                          </Button>
                       )}
                       {statusFilter !== 'rejected' && (
                          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleStatusChange(review.id, 'rejected')}>
                            <X size={14} className="mr-1" /> Reddet
                          </Button>
                       )}
                       <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => {
                          const reply = prompt('Müşteriye cevabınız:');
                          if (reply) {
                            axios.put('/api/admin/reviews', { id: review.id, merchantReply: reply }, { headers: { Authorization: `JWT ${token}` } })
                              .then(() => setReviews(reviews.map(r => r.id === review.id ? { ...r, merchantReply: reply } : r)));
                          }
                       }}>
                         <Reply size={14} className="mr-1" /> Cevapla
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                      Bu kategoride henüz yorum bulunamadı. (Sahte veriler kaldırıldı, artık gerçek yorumlar gösterilecek!)
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6 bg-background min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Değerlendirmeler</h1>
          <p className="text-muted-foreground mt-1">
            <span className="font-medium text-black">{storeName}</span> mağazanızın müşteri yorumlarını yönetin.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-200 text-sm py-1 px-3">
            <CheckCircle2 size={14} className="mr-1" /> İkas&apos;a Bağlı
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="pending" orientation="vertical" className="gap-8">
        <TabsList className="h-fit p-2 bg-muted/30 rounded-xl w-64 shrink-0 border border-border/50">
          <TabsTrigger value="pending" className="py-2.5 px-4 rounded-lg mb-1">
            <MessageSquare size={16} className="mr-2" />
            Bekleyen Onaylar
            <Badge variant="secondary" className="ml-auto bg-black text-white">{reviews.filter(r => r.status === 'pending').length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="approved" className="py-2.5 px-4 rounded-lg mb-1">
            <Check size={16} className="mr-2" />
            Onaylı Yorumlar
          </TabsTrigger>
          <TabsTrigger value="rejected" className="py-2.5 px-4 rounded-lg mb-1">
            <X size={16} className="mr-2" />
            Reddedilenler
          </TabsTrigger>
          <div className="my-2 border-t border-border/50 w-full" />
          <TabsTrigger value="settings" className="py-2.5 px-4 rounded-lg">
            <Settings size={16} className="mr-2" />
            Widget Ayarları
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
              <CardTitle>Widget Görünüm Ayarları</CardTitle>
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

                <div className="space-y-2 flex flex-col justify-center">
                  <Label htmlFor="autoApprove" className="flex items-center gap-2 cursor-pointer mt-4">
                    <input
                      id="autoApprove"
                      type="checkbox"
                      className="w-4 h-4"
                      checked={settings.autoApprove || false}
                      onChange={(e) => setSettings({ ...settings, autoApprove: e.target.checked })}
                    />
                    Yeni Yorumları Otomatik Onayla (Beklemeye almaz)
                  </Label>
                </div>
              </div>

              <Button onClick={saveSettings}>Ayarları Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

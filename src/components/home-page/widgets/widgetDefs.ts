import { getIconOptions, getFilterIconOptions } from '@/widget/icons.js';

// ─── Settings field types ────────────────────────────────────────────────────

// Bir alanın belirli bir ayara bağlı olarak görünüp görünmeyeceğini tanımlar.
// Örn: { key: 'themeMode', equals: 'custom' } → sadece themeMode === 'custom' ise görünür.
// Örn: { key: 'summaryLayout', notIn: ['hero','minimal'] } → bu değerlerden biriyse gizlenir.
//
// Layout-aware varyant (TERCİH EDİLEN):
// Örn: { layoutKey: 'reviewLayout', supports: 'thumbnailSize' }
//   → aktif review layout'un meta.supports.thumbnailSize === false ise alan gizlenir.
// Yeni layout eklenince UI dosyasını düzenlemek gerekmez — kaynak doğrusu layout meta'sıdır.
// Bkz: src/widget/{summary,review}-layouts/index.js — supports sözleşmesi.
export type ShowWhen =
  | { key: string; equals: string | number | boolean }
  | { key: string; notIn: Array<string | number | boolean> }
  | { layoutKey: 'summaryLayout' | 'reviewLayout'; supports: string };

export type SelectOption = { value: string; label: string };

// Select options — statik dizi veya başka ayar değerlerine bağlı dinamik fonksiyon olabilir.
// Örn: reviewIcon === 'star' ise 3 stil, 'heart' ise 2 stil seçeneği göster.
export type SelectOptionsSource =
  | SelectOption[]
  | ((settings: Record<string, unknown>) => SelectOption[]);

export type SettingField =
  | { type: 'toggle';     key: string; label: string; default: boolean;  showWhen?: ShowWhen }
  | { type: 'text';       key: string; label: string; placeholder?: string; default: string; hideLabel?: boolean; showWhen?: ShowWhen }
  | { type: 'color';      key: string; label: string; default: string; showWhen?: ShowWhen }
  | { type: 'select';     key: string; label: string; options: SelectOptionsSource; default: string; showWhen?: ShowWhen }
  // radioGroup — vertical radio list (Loox/Yotpo standardı). Uzun label'lı ya da
  // önemli kararlar için: tüm seçenekler aynı anda görünür, tek tıkla seçilir.
  | { type: 'radioGroup'; key: string; label: string; options: SelectOption[]; default: string; showWhen?: ShowWhen }
  // dropdown — native <select>; yer kazandıran kompakt UI. Yine select tipinde
  // farklı UI varyantı (kart-button) olduğu için ayrı tip.
  | { type: 'dropdown';   key: string; label: string; options: SelectOption[]; default: string; showWhen?: ShowWhen }
  | { type: 'range';      key: string; label: string; min: number; max: number; default: number; showWhen?: ShowWhen }
  // iconSelect — ikonların SVG grid popover'ında görüntülendiği özel seçici.
  // options sadece { value, label } — SVG preview ICONS registry'sinden alınır.
  | { type: 'iconSelect'; key: string; label: string; options: SelectOption[]; default: string; showWhen?: ShowWhen };

export interface SettingsGroup {
  title: string;
  isColor?: boolean; // true → "Renkler" kategorisi altında listelenir, false/undefined → ana panelde
  fields: SettingField[];
}

// ─── Widget definition ───────────────────────────────────────────────────────

export interface WidgetDef {
  id: 'reviews' | 'badge' | 'carousel' | 'popup' | 'qa' | 'summary';
  name: string;
  description: string;
  previewBg: string;
  settings: SettingsGroup[];
}

// ─── Widget registry ─────────────────────────────────────────────────────────

export const WIDGETS: WidgetDef[] = [
  {
    id: 'reviews',
    name: 'Ürün Yorumları',
    description: 'Ürün detay sayfasında yıldız puanı ve müşteri yorumlarını gösterir.',
    previewBg: 'rgba(111, 85, 255, 0.08)',
    settings: [
      {
        title: 'Genel',
        fields: [
          // showTitle = layout-aware "title destekliyor mu" + kullanıcı tercihi.
          // Layout title'ı desteklemiyorsa toggle hiç görünmez. Açıksa input
          // görünür; input boşsa render.js placeholder'ı (default) gösterir.
          { type: 'toggle', key: 'showTitle', label: 'Widget Başlığını Göster', default: true, showWhen: { layoutKey: 'summaryLayout', supports: 'title' } },
          // Toggle metni zaten bağlamı veriyor, ekstra label tekrar olur — hideLabel ile gizlenir.
          { type: 'text',   key: 'title',     label: 'Widget Başlığı', placeholder: 'Müşteri Yorumları', default: 'Müşteri Yorumları', hideLabel: true, showWhen: { key: 'showTitle', equals: true } },
          // Görsel galeri (Fotoğraflı Yorumlar strip) başlığı — Widget Başlığı pattern'inin aynısı.
          // Tasarım'daki showPhotoGallery strip'i tamamen gizler, bu sadece başlığı.
          { type: 'toggle', key: 'showPhotoGalleryTitle', label: 'Görsel Galeri Başlığını Göster', default: true },
          { type: 'text',   key: 'photoGalleryTitle',    label: 'Görsel Galeri Başlığı', placeholder: 'Fotoğraflı Yorumlar', default: 'Fotoğraflı Yorumlar', hideLabel: true, showWhen: { key: 'showPhotoGalleryTitle', equals: true } },
        ],
      },
      {
        title: 'Tasarım',
        fields: [
          {
            type: 'select',
            key: 'summaryLayout',
            label: 'Özet Tasarımı',
            options: [
              { value: 'classic', label: 'Klasik' },
              { value: 'split',   label: 'Yatay' },
              { value: 'compact', label: 'Kompakt' },
              { value: 'minimal', label: 'Minimal' },
              { value: 'hero',    label: 'Hero' },
            ],
            default: 'classic',
          },
          {
            type: 'select',
            key: 'reviewLayout',
            label: 'Yorum Tasarımı',
            options: [
              { value: 'card',    label: 'Kart' },
              { value: 'list',    label: 'Liste' },
              { value: 'gallery', label: 'Galeri' },
            ],
            default: 'card',
          },
          // Köşe ovalliği renk değil — şekil. Tasarım grubunda ana panelde
          // diğer tasarım kararlarıyla (layout seçimleri) birlikte durur.
          { type: 'range', key: 'borderRadius', label: 'Köşe Ovalliği', min: 0, max: 24, default: 8 },
          // Boyut ayarları da tasarım kararı — eskiden ayrı "Boyutlar" accordion'undaydı,
          // tek tasarım panelinde toplandı. 'size' tüm widget tipografisi+ikon boyutu;
          // 'thumbnailSize' fotoğraflı yorumlar strip'inin thumbnail boyutu.
          {
            type: 'select',
            key: 'size',
            label: 'Widget Boyutu',
            default: 'medium',
            options: [
              { value: 'small',  label: 'Küçük' },
              { value: 'medium', label: 'Orta' },
              { value: 'large',  label: 'Büyük' },
            ],
          },
          {
            type: 'select',
            key: 'thumbnailSize',
            label: 'Görsel Galeri Boyutu',
            default: 'medium',
            options: [
              { value: 'small',  label: 'Küçük' },
              { value: 'medium', label: 'Orta' },
              { value: 'large',  label: 'Büyük' },
            ],
            showWhen: { layoutKey: 'reviewLayout', supports: 'thumbnailSize' },
          },
          // Göster/gizle toggle'ları tasarım kararı (görsel öğe seçimi).
          // Ayarlar = sistem davranışı, Tasarım = görünüm — net ayrım.
          { type: 'toggle', key: 'showPhotoGallery',   label: 'Görsel Galerisini Göster', default: true },
          { type: 'toggle', key: 'showRecommendation', label: 'Tavsiye Yüzdesini Göster', default: true, showWhen: { layoutKey: 'summaryLayout', supports: 'recommendation' } },
        ],
      },
      {
        title: 'Widget Kutusu',
        isColor: true,
        fields: [
          { type: 'color', key: 'widgetBgColor',      label: 'Widget Arka Plan',     default: '#ffffff' },
          { type: 'color', key: 'widgetBorderColor',  label: 'Widget Border',        default: '#ffffff' },
          { type: 'color', key: 'separatorColor',     label: 'Ayırıcı Çizgi Rengi',  default: '#e5e7eb' },
        ],
      },
      {
        title: 'Başlık & Özet',
        isColor: true,
        fields: [
          { type: 'color', key: 'headerTitleColor',     label: 'Widget Başlığı',     default: '#111111' },
          { type: 'color', key: 'headerAvgColor',       label: 'Ortalama Puan',      default: '#111111' },
          { type: 'color', key: 'headerCountColor',     label: 'Yorum Sayısı',       default: '#111111' },
          { type: 'color', key: 'headerRecommendColor', label: 'Tavsiye Yüzdesi',    default: '#111111' },
        ],
      },
      {
        title: 'Bar Chart',
        isColor: true,
        fields: [
          { type: 'color', key: 'barLabelColor',   label: 'Etiket Rengi',        default: '#111111' },
          { type: 'color', key: 'barFillColor',    label: 'Dolgu Rengi',         default: '#111111' },
          { type: 'color', key: 'barTrackColor',   label: 'Arka Plan Rengi',     default: '#e5e7eb' },
          { type: 'color', key: 'barCountColor',   label: 'Sayı Rengi',          default: '#111111' },
          { type: 'color', key: 'barHoverBgColor', label: 'Hover Arka Planı',    default: '#f3f4f6' },
        ],
      },
      {
        title: 'Butonlar',
        isColor: true,
        fields: [
          { type: 'color', key: 'btnBgColor',          label: 'Yorum Yaz / Gönder Arka Plan',  default: '#111111' },
          { type: 'color', key: 'btnTextColor',        label: 'Yorum Yaz / Gönder Yazı',       default: '#ffffff' },
          { type: 'color', key: 'btnBorderColor',      label: 'Yorum Yaz / Gönder Border',     default: '#111111' },
          { type: 'color', key: 'filterBtnBgColor',    label: 'Filtre Butonu Arka Plan',       default: '#111111' },
          { type: 'color', key: 'filterBtnTextColor',  label: 'Filtre Butonu Yazı',            default: '#ffffff' },
          { type: 'color', key: 'filterBtnBorderColor',label: 'Filtre Butonu Border',          default: '#111111' },
        ],
      },
      {
        title: 'Filtre Menüsü',
        isColor: true,
        fields: [
          { type: 'color', key: 'filterMenuBgColor',      label: 'Menü Arka Planı',       default: '#ffffff' },
          { type: 'color', key: 'filterMenuBorderColor',  label: 'Menü Border',            default: '#e5e7eb' },
          { type: 'color', key: 'filterItemTextColor',    label: 'Öğe Yazı Rengi',         default: '#111111' },
          { type: 'color', key: 'filterItemHoverBgColor', label: 'Öğe Hover Arka Planı',   default: '#f3f4f6' },
          { type: 'color', key: 'filterItemActiveColor',  label: 'Aktif Öğe Rengi',        default: '#111111' },
        ],
      },
      {
        title: 'Yorum Kartı',
        isColor: true,
        fields: [
          { type: 'color', key: 'reviewTitleColor',  label: 'Başlık Rengi',       default: '#111111' },
          { type: 'color', key: 'reviewAuthorColor', label: 'Yazar Rengi',         default: '#111111' },
          { type: 'color', key: 'reviewDateColor',   label: 'Tarih Rengi',         default: '#111111' },
          { type: 'color', key: 'reviewBodyColor',   label: 'Yorum Metni Rengi',   default: '#111111' },
          { type: 'color', key: 'reviewBorderColor', label: 'Ayırıcı Çizgi Rengi', default: '#e5e7eb' },
        ],
      },
      {
        title: 'Mağaza Yanıtı',
        isColor: true,
        fields: [
          { type: 'color', key: 'replyBgColor',     label: 'Arka Plan Rengi',  default: '#f3f4f6' },
          { type: 'color', key: 'replyBorderColor', label: 'Sol Çizgi Rengi',  default: '#111111' },
          { type: 'color', key: 'replyLabelColor',  label: 'Etiket Rengi',     default: '#111111' },
          { type: 'color', key: 'replyTextColor',   label: 'Metin Rengi',      default: '#111111' },
        ],
      },
      {
        title: 'Fotoğraf Galerisi',
        isColor: true,
        fields: [
          { type: 'color', key: 'photoBgColor',     label: 'Arka Plan Rengi',   default: '#f3f4f6' },
          { type: 'color', key: 'photoBorderColor', label: 'Border Rengi',      default: '#e5e7eb' },
          { type: 'color', key: 'photoTitleColor',  label: 'Başlık Rengi',      default: '#111111' },
        ],
      },
      {
        title: 'Form',
        isColor: true,
        fields: [
          { type: 'color', key: 'formBgColor',       label: 'Form Arka Planı',        default: '#ffffff' },
          { type: 'color', key: 'formBorderColor',   label: 'Form Border',            default: '#e5e7eb' },
          { type: 'color', key: 'inputBgColor',      label: 'Alan Arka Planı',        default: '#ffffff' },
          { type: 'color', key: 'inputTextColor',    label: 'Alan Yazı Rengi',        default: '#111111' },
          { type: 'color', key: 'inputBorderColor',  label: 'Alan Border Rengi',      default: '#d1d5db' },
          { type: 'color', key: 'placeholderColor',  label: 'Placeholder Rengi',      default: '#9ca3af' },
        ],
      },
      {
        title: 'Daha Fazla Göster',
        isColor: true,
        fields: [
          { type: 'color', key: 'loadMoreBgColor',     label: 'Arka Plan Rengi', default: '#ffffff' },
          { type: 'color', key: 'loadMoreTextColor',   label: 'Yazı Rengi',      default: '#111111' },
          { type: 'color', key: 'loadMoreBorderColor', label: 'Border Rengi',    default: '#d1d5db' },
        ],
      },
      {
        title: 'Modal',
        isColor: true,
        fields: [
          { type: 'color', key: 'modalBgColor',          label: 'Modal Arka Planı',       default: '#ffffff' },
          { type: 'color', key: 'modalTextColor',        label: 'Modal Yazı Rengi',       default: '#111111' },
          { type: 'color', key: 'modalCloseBgColor',     label: 'Kapat Butonu Arka Plan', default: '#111111' },
          { type: 'color', key: 'modalCloseTextColor',   label: 'Kapat Butonu Yazı',     default: '#ffffff' },
          { type: 'color', key: 'modalCloseBorderColor', label: 'Kapat Butonu Border',   default: '#111111' },
          { type: 'color', key: 'modalNavBgColor',       label: 'Ok Butonu Arka Plan',   default: '#111111' },
          { type: 'color', key: 'modalNavTextColor',     label: 'Ok Butonu Yazı',        default: '#ffffff' },
          { type: 'color', key: 'modalReplyBgColor',     label: 'Yanıt Arka Planı',      default: '#f3f4f6' },
          { type: 'color', key: 'modalReplyBorderColor', label: 'Yanıt Sol Çizgisi',     default: '#111111' },
        ],
      },
      {
        // İkon ve rengi birlikte — yıldız konusu tek başlık altında ana panelde.
        // Renk eskiden "Yorum Kartı" altındaydı, kullanıcı yıldız arıyordu.
        title: 'Yıldız Stili',
        fields: [
          {
            type: 'iconSelect',
            key: 'reviewIcon',
            label: 'Yorum İkonu',
            default: 'star:rounded',
            // İkon listesi icons.js ICONS registry'sinden dinamik gelir —
            // yeni ikon eklenince otomatik burada görünür.
            options: getIconOptions(),
          },
          { type: 'color', key: 'reviewStarColor', label: 'Yıldız Rengi', default: '#f59e0b' },
        ],
      },
      {
        // Filtre butonu ikonu — Yıldız Stili pattern'iyle aynı, ana panelde.
        // Renkler "Filtre Menüsü" + "Butonlar" gruplarında Renkler sekmesinde kalır.
        title: 'Filtre Stili',
        fields: [
          {
            type: 'iconSelect',
            key: 'filterIcon',
            label: 'Filtre İkonu',
            default: 'lines',
            options: getFilterIconOptions(),
          },
        ],
      },
      {
        // Widget davranışı toggle'ları — en sona, kullanıcı genelde önce
        // tasarımı yapar, sonra "neyi göster/gizle, otomatik onayla mı" karar verir.
        title: 'Ayarlar',
        fields: [
          { type: 'toggle', key: 'enabled',     label: 'Widget Aktif',                   default: true },
          // Otomatik onay eşiği — Loox/Yotpo standardı 4 seviyeli radio.
          // submit endpoint'i (/api/public/reviews) yorum yıldızını bu değere
          // göre değerlendirip status'u 'approved' veya 'pending' olarak yazar.
          {
            type: 'dropdown',
            key: 'autoApprove',
            label: 'Yorum Onayı',
            default: 'manual',
            options: [
              { value: 'manual', label: 'Manuel onay' },
              { value: '4plus',  label: '4 yıldız ve üzeri' },
              { value: '5stars', label: 'Sadece 5 yıldız' },
              { value: 'all',    label: 'Otomatik onayla' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'badge',
    name: 'Yıldız Rozeti',
    description: 'Ürün listelerinde ve kartlarında ortalama puanı rozet olarak gösterir.',
    previewBg: 'rgba(59, 130, 246, 0.08)',
    settings: [
      {
        title: 'Genel',
        fields: [
          { type: 'toggle', key: 'enabled', label: 'Widget Aktif', default: true },
        ],
      },
      {
        title: 'Görünüm',
        fields: [
          {
            type: 'iconSelect',
            key: 'icon',
            label: 'Puan İkonu',
            default: 'star',
            options: getIconOptions(),
          },
          {
            type: 'select',
            key: 'size',
            label: 'Rozet Boyutu',
            default: 'medium',
            options: [
              { value: 'small',  label: 'Küçük' },
              { value: 'medium', label: 'Orta' },
              { value: 'large',  label: 'Büyük' },
            ],
          },
          { type: 'color', key: 'color', label: 'İkon Rengi', default: '#f59e0b' },
        ],
      },
    ],
  },
  {
    id: 'carousel',
    name: 'Yorum Carousel',
    description: 'Seçili yorumları carousel formatında herhangi bir sayfada gösterin.',
    previewBg: 'rgba(245, 158, 11, 0.08)',
    settings: [],
  },
  {
    id: 'popup',
    name: 'Pop-up Yorumlar',
    description: 'En iyi yorumlarınızı otomatik pop-up widget ile öne çıkarın.',
    previewBg: 'rgba(239, 68, 68, 0.08)',
    settings: [],
  },
  {
    id: 'qa',
    name: 'Soru & Cevap',
    description: 'Müşterilerin ürünleriniz hakkında soru sormasına olanak tanıyın.',
    previewBg: 'rgba(16, 185, 129, 0.08)',
    settings: [],
  },
  {
    id: 'summary',
    name: 'AI Yorum Özeti',
    description: 'Yapay zeka ile yorumlarınızın özetini ürün sayfasında gösterin.',
    previewBg: 'rgba(168, 85, 247, 0.08)',
    settings: [],
  },
];

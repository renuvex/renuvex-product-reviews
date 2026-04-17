import { getIconOptions } from '@/widget/icons.js';

// ─── Settings field types ────────────────────────────────────────────────────

// Bir alanın belirli bir ayara bağlı olarak görünüp görünmeyeceğini tanımlar.
// Örn: { key: 'themeMode', equals: 'custom' } → sadece themeMode === 'custom' ise görünür.
export type ShowWhen = { key: string; equals: string | number | boolean };

export type SelectOption = { value: string; label: string };

// Select options — statik dizi veya başka ayar değerlerine bağlı dinamik fonksiyon olabilir.
// Örn: reviewIcon === 'star' ise 3 stil, 'heart' ise 2 stil seçeneği göster.
export type SelectOptionsSource =
  | SelectOption[]
  | ((settings: Record<string, unknown>) => SelectOption[]);

export type SettingField =
  | { type: 'toggle';     key: string; label: string; default: boolean;  showWhen?: ShowWhen }
  | { type: 'text';       key: string; label: string; placeholder?: string; default: string; showWhen?: ShowWhen }
  | { type: 'color';      key: string; label: string; default: string; showWhen?: ShowWhen }
  | { type: 'select';     key: string; label: string; options: SelectOptionsSource; default: string; showWhen?: ShowWhen }
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
          { type: 'toggle', key: 'enabled', label: 'Widget Aktif',   default: true },
          { type: 'text',   key: 'title',    label: 'Widget Başlığı', placeholder: 'Müşteri Yorumları', default: 'Müşteri Yorumları' },
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
              { value: 'classic', label: 'Klasik (Açık)' },
              { value: 'compact', label: 'Kompakt (Açılır)' },
            ],
            default: 'classic',
          },
        ],
      },
      {
        title: 'Widget Kutusu',
        isColor: true,
        fields: [
          { type: 'range', key: 'borderRadius',       label: 'Köşe Ovalliği',        min: 0, max: 24, default: 8 },
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
          { type: 'color', key: 'reviewStarColor',   label: 'Yıldız Rengi',        default: '#f59e0b' },
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
        ],
      },
      {
        title: 'Davranış',
        fields: [
          { type: 'toggle', key: 'autoApprove',        label: 'Yeni Yorumları Otomatik Onayla', default: false },
          { type: 'toggle', key: 'showRecommendation', label: 'Tavsiye Yüzdesini Göster',       default: true },
          { type: 'toggle', key: 'showPhotoGallery',   label: 'Fotoğraf Galerisini Göster',    default: true },
        ],
      },
      {
        title: 'Boyutlar',
        fields: [
          {
            type: 'select',
            key: 'size',
            label: 'Yazı Boyutu',
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
            label: 'Küçük Resim Boyutu',
            default: 'medium',
            options: [
              { value: 'small',  label: 'Küçük' },
              { value: 'medium', label: 'Orta' },
              { value: 'large',  label: 'Büyük' },
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

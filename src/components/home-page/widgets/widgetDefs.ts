// ─── Settings field types ────────────────────────────────────────────────────

export type SettingField =
  | { type: 'toggle';  key: string; label: string; default: boolean }
  | { type: 'text';    key: string; label: string; placeholder?: string; default: string }
  | { type: 'color';   key: string; label: string; default: string }
  | { type: 'select';  key: string; label: string; options: { value: string; label: string }[]; default: string }
  | { type: 'range';   key: string; label: string; min: number; max: number; default: number };

export interface SettingsGroup {
  title: string;
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
          { type: 'toggle', key: 'enabled',      label: 'Widget Aktif',        default: true },
          { type: 'text',   key: 'title',         label: 'Widget Başlığı',      placeholder: 'Müşteri Yorumları', default: 'Müşteri Yorumları' },
        ],
      },
      {
        title: 'Görünüm',
        fields: [
          { type: 'color', key: 'primaryColor', label: 'Buton & Vurgu Rengi', default: '#111111' },
          { type: 'range', key: 'borderRadius', label: 'Köşe Ovalliği', min: 0, max: 24, default: 8 },
        ],
      },
      {
        title: 'Yıldız Stili',
        fields: [
          {
            type: 'select',
            key: 'reviewIcon',
            label: 'Yorum İkonu',
            default: 'star',
            options: [
              { value: 'star',   label: '★ Yıldız' },
              { value: 'heart',  label: '♥ Kalp' },
              { value: 'circle', label: '● Daire' },
            ],
          },
          { type: 'color', key: 'reviewStarColor', label: 'Yıldız Rengi', default: '#f59e0b' },
          {
            type: 'select',
            key: 'reviewStarSize',
            label: 'Yıldız Boyutu',
            default: 'medium',
            options: [
              { value: 'small',  label: 'Küçük' },
              { value: 'medium', label: 'Orta' },
              { value: 'large',  label: 'Büyük' },
            ],
          },
        ],
      },
      {
        title: 'Davranış',
        fields: [
          { type: 'toggle', key: 'autoApprove',  label: 'Yeni Yorumları Otomatik Onayla', default: false },
          { type: 'toggle', key: 'showHelpful',  label: 'Faydalı Butonu Göster',          default: true },
        ],
      },
      {
        title: 'Boyutlar',
        fields: [
          { type: 'range', key: 'titleSize',      label: 'Başlık Boyutu',         min: 16, max: 32, default: 24 },
          { type: 'range', key: 'reviewTextSize', label: 'Yorum Yazı Boyutu',     min: 12, max: 18, default: 14 },
          { type: 'range', key: 'authorSize',     label: 'Yazar Adı Boyutu',      min: 12, max: 18, default: 14 },
          { type: 'range', key: 'replyNameSize',  label: 'Mağaza Adı Boyutu',     min: 12, max: 18, default: 14 },
          { type: 'range', key: 'replyTextSize',  label: 'Mağaza Yanıtı Boyutu',  min: 12, max: 18, default: 14 },
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
            type: 'select',
            key: 'icon',
            label: 'Puan İkonu',
            default: 'star',
            options: [
              { value: 'star',   label: '★ Yıldız' },
              { value: 'heart',  label: '♥ Kalp' },
              { value: 'circle', label: '● Daire' },
            ],
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

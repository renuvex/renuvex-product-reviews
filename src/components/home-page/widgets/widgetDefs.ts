// ─── Settings field types ────────────────────────────────────────────────────

export type SettingField =
  | { type: 'toggle';  key: string; label: string; default: boolean }
  | { type: 'text';    key: string; label: string; placeholder?: string; default: string }
  | { type: 'color';   key: string; label: string; default: string }
  | { type: 'select';  key: string; label: string; options: { value: string; label: string }[]; default: string };

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
          { type: 'text',   key: 'title',         label: 'Widget Başlığı',      placeholder: 'Müşteri Değerlendirmeleri', default: 'Müşteri Değerlendirmeleri' },
        ],
      },
      {
        title: 'Görünüm',
        fields: [
          { type: 'color', key: 'primaryColor', label: 'Ana Tema Rengi', default: '#111111' },
        ],
      },
      {
        title: 'Davranış',
        fields: [
          { type: 'toggle', key: 'autoApprove',  label: 'Yeni Yorumları Otomatik Onayla', default: false },
          { type: 'toggle', key: 'showHelpful',  label: 'Faydalı Butonu Göster',          default: true },
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

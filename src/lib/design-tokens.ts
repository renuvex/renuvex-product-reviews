/**
 * ikas Admin Panel Design Tokens
 * Ant Design tabanlı ikas admin panelinden çıkarılan değerler.
 * Kaynak: DevTools computed styles + CSS custom properties
 *
 * Doğrulanan değerler (DevTools):
 * - Primary button: rgb(111,85,255), 4px radius, 44px height, 14px/500
 * - Default button: white, border rgb(227,232,239), 4px radius, 44px height, 14px/500
 * - Select: white, border rgb(227,232,239), 4px radius, 14px/400
 * - Tab active: rgb(111,85,255), underline 2px aynı renk
 * - Tab default: rgb(111,85,255) (ikas her tab'ı primary renkte gösteriyor)
 * - Pagination btn: rgb(154,164,178), border rgb(238,242,246), 28px height
 * - Pagination active: rgb(69,51,171) text, rgb(247,245,255) bg, border rgb(213,205,255)
 * - Font: Inter, 14px, rgb(18,25,38)
 * - h1: 37px/700, h2: 30px/700, h3: 27px/700, h4: 23px/700
 * - Alert (Ant Design default): white bg, 8px radius, Ant shadow
 */

export const colors = {
  // Brand
  primary: 'rgb(111, 85, 255)',          // --primary: #6f55ff
  primaryHover: 'rgb(91, 68, 214)',      // ~%15 darker (CSS :hover — gözlemsel)
  primaryText: 'rgb(69, 51, 171)',       // aktif pagination, link rengi
  primaryBg: 'rgb(247, 245, 255)',       // aktif pagination bg, subtle vurgu
  primaryBorder: 'rgb(213, 205, 255)',   // aktif pagination border

  // Text
  textPrimary: 'rgb(18, 25, 38)',        // --primary-text-color, ana metin
  textBody: 'rgb(19, 19, 24)',           // body computed
  textSecondary: 'rgb(75, 85, 101)',     // ikincil metin — DevTools doğrulandı (modal açıklama metni)
  textMuted: 'rgb(154, 164, 178)',       // disabled / muted, pagination rengi
  textWhite: 'rgb(255, 255, 255)',

  // Background
  bgWhite: 'rgb(255, 255, 255)',
  bgPage: 'rgb(245, 247, 250)',          // ikas panel sayfa arka planı (gözlemsel)
  bgHover: 'rgb(249, 250, 251)',         // satır hover arka planı (gözlemsel)

  // Border
  borderDefault: 'rgb(227, 232, 239)',   // button, input, select, card border
  borderLight: 'rgb(238, 242, 246)',     // pagination btn, ayırıcı çizgi
  borderFocus: 'rgb(111, 85, 255)',      // focus ring rengi (primary)

  // Status — onaylandı
  success: 'rgb(18, 183, 106)',          // DevTools doğrulandı (toast icon rengi)
  successBg: 'rgb(240, 253, 244)',
  successBorder: 'rgb(187, 247, 208)',
  successText: 'rgb(18, 183, 106)',      // DevTools doğrulandı

  error: 'rgb(255, 60, 72)',            // solid danger bg+border — DevTools doğrulandı
  errorText: 'rgb(255, 0, 0)',          // outline danger text — DevTools doğrulandı
  errorBg: 'rgb(255, 242, 242)',        // light error bg
  errorBorder: 'rgb(227, 225, 229)',    // outline danger border — DevTools doğrulandı

  warning: 'rgb(245, 158, 11)',
  warningBg: 'rgb(255, 251, 235)',
  warningBorder: 'rgb(253, 230, 138)',
  warningText: 'rgb(146, 64, 14)',

  // Pending = warning tonu
  pending: 'rgb(245, 158, 11)',
  pendingBg: 'rgb(255, 251, 235)',
  pendingText: 'rgb(146, 64, 14)',
} as const;

export const typography = {
  // Doğrulanan: body font
  fontFamily: '"Twemoji Country Flags", Inter, sans-serif',

  fontSize: {
    xs: '12px',
    sm: '13px',
    base: '14px',    // ikas default — tüm UI metni
    md: '16px',
    lg: '18px',      // modal title
    xl: '20px',
    '2xl': '24px',
    // Headings — DevTools'dan doğrulanan (ikas ürün sayfası)
    h4: '23px',      // 23.457px → 23px
    h3: '27px',      // 26.914px → 27px
    h2: '30px',      // 30.371px → 30px
    h1: '37px',      // 37.285px → 37px
  },

  fontWeight: {
    regular: '400',
    medium: '500',   // button, tab label, modal title
    bold: '700',     // headings (h1-h4)
  },

  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const;

export const radii = {
  none: '0px',
  sm: '2px',
  default: '4px',   // ikas button, select, input, card, modal — doğrulanan
  md: '6px',
  lg: '8px',        // Ant Design modal / message default
  xl: '12px',
  full: '9999px',   // badge / chip
} as const;

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
} as const;

export const opacity = {
  full: 1,
  disabled: 0.5,
  muted: 0.7,
} as const;

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
  default: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
  md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
  // Ant Design message/notification shadow (resmi Ant değeri)
  antMessage: '0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)',
  antCard: '0 1px 2px 0 rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px 0 rgba(0,0,0,0.02)',
} as const;

/**
 * Hazır component stilleri
 * Inline style prop olarak doğrudan kullanılabilir.
 * Hover için CSS class ile override et veya onMouseEnter/Leave kullan.
 */
export const componentStyles = {

  // ─── Buttons ────────────────────────────────────────────────────────────────

  // Doğrulanan: rgb(111,85,255) bg, white text, 4px radius, 44px height, 14px/500
  btnPrimary: {
    backgroundColor: colors.primary,
    color: colors.textWhite,
    borderRadius: radii.default,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    height: '44px',
    padding: '0 16px',
    border: `1px solid ${colors.primary}`,
    cursor: 'pointer',
    outline: 'none',
    whiteSpace: 'nowrap' as const,
  },
  // Doğrulanan: white bg, rgb(227,232,239) border, 4px radius, 44px height, 14px/500
  btnDefault: {
    backgroundColor: colors.bgWhite,
    color: colors.textPrimary,
    borderRadius: radii.default,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    height: '44px',
    padding: '0 16px',
    border: `1px solid ${colors.borderDefault}`,
    cursor: 'pointer',
    outline: 'none',
    whiteSpace: 'nowrap' as const,
  },
  // Küçük button (toolbar, aksiyon alanları) — 32px
  btnSm: {
    backgroundColor: colors.bgWhite,
    color: colors.textPrimary,
    borderRadius: radii.default,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    height: '32px',
    padding: '0 12px',
    border: `1px solid ${colors.borderDefault}`,
    cursor: 'pointer',
    outline: 'none',
  },
  // Doğrulanan: solid danger — rgb(255,60,72) bg, white text, 44px height, 14px/500
  btnDanger: {
    backgroundColor: colors.error,
    color: colors.textWhite,
    borderRadius: radii.default,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    height: '44px',
    padding: '0 16px',
    border: `1px solid ${colors.error}`,
    cursor: 'pointer',
    outline: 'none',
  },
  // Doğrulanan: outline danger — white bg, rgb(255,60,72) border+text, 44px height, 14px/500
  btnOutlineDanger: {
    backgroundColor: colors.bgWhite,
    color: colors.error,
    borderRadius: radii.default,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    height: '44px',
    padding: '0 16px',
    border: `1px solid ${colors.error}`,
    cursor: 'pointer',
    outline: 'none',
    whiteSpace: 'nowrap' as const,
  },
  // Doğrulanan: ghost primary — transparent bg, rgb(111,85,255) border+text, 44px height, 14px/500
  btnGhost: {
    backgroundColor: 'transparent',
    color: colors.primary,
    borderRadius: radii.default,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    height: '44px',
    padding: '0 16px',
    border: `1px solid ${colors.primary}`,
    cursor: 'pointer',
    outline: 'none',
  },

  // ─── Input / Select ─────────────────────────────────────────────────────────

  // Doğrulanan: rgb(227,232,239) border, 4px radius, 14px/400
  input: {
    color: colors.textPrimary,
    backgroundColor: colors.bgWhite,
    borderRadius: radii.default,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    border: `1px solid ${colors.borderDefault}`,
    padding: '0 12px',
    height: '40px',
    outline: 'none',
    width: '100%',
  },
  // Doğrulanan: aynı input stili
  select: {
    color: colors.textPrimary,
    backgroundColor: colors.bgWhite,
    borderRadius: radii.default,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    border: `1px solid ${colors.borderDefault}`,
    padding: '0 8px',
    height: '40px',
    outline: 'none',
  },
  textarea: {
    color: colors.textPrimary,
    backgroundColor: colors.bgWhite,
    borderRadius: radii.default,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    border: `1px solid ${colors.borderDefault}`,
    padding: '8px 12px',
    outline: 'none',
    width: '100%',
    resize: 'vertical' as const,
  },

  // ─── Tabs ───────────────────────────────────────────────────────────────────

  // Doğrulanan: rgb(111,85,255), 14px/500, underline 2px primary
  tabActive: {
    color: colors.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    borderBottom: `2px solid ${colors.primary}`,
    paddingBottom: '8px',
    cursor: 'pointer',
  },
  tabDefault: {
    color: colors.textMuted,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    borderBottom: '2px solid transparent',
    paddingBottom: '8px',
    cursor: 'pointer',
  },

  // ─── Pagination ─────────────────────────────────────────────────────────────

  // Doğrulanan: rgb(154,164,178) text, border rgb(238,242,246), 28px height
  paginationBtn: {
    color: colors.textMuted,
    backgroundColor: 'transparent',
    borderRadius: radii.default,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    border: `1px solid ${colors.borderLight}`,
    height: '28px',
    minWidth: '28px',
    padding: '0 8px',
    cursor: 'pointer',
    outline: 'none',
  },
  // Doğrulanan: rgb(69,51,171) text, rgb(247,245,255) bg, border rgb(213,205,255)
  paginationBtnActive: {
    color: colors.primaryText,
    backgroundColor: colors.primaryBg,
    borderRadius: radii.default,
    border: `1px solid ${colors.primaryBorder}`,
    fontWeight: typography.fontWeight.regular,  // ikas: 400 — doğrulandı
    fontSize: typography.fontSize.base,
    height: '28px',
    minWidth: '28px',
    width: '28px',
    padding: '3px',
    cursor: 'pointer',
    outline: 'none',
  },

  // ─── Card ───────────────────────────────────────────────────────────────────

  card: {
    backgroundColor: colors.bgWhite,
    borderRadius: radii.default,
    border: `1px solid ${colors.borderDefault}`,
    boxShadow: shadows.antCard,
    padding: spacing[6],
  },
  cardHeader: {
    fontSize: typography.fontSize.md,     // 16px
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    paddingBottom: spacing[4],
    borderBottom: `1px solid ${colors.borderLight}`,
    marginBottom: spacing[4],
  },

  // ─── Badge / Status chip ────────────────────────────────────────────────────

  badgePending: {
    backgroundColor: colors.pendingBg,
    color: colors.pendingText,
    borderRadius: radii.full,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    padding: '2px 8px',
    display: 'inline-flex',
    alignItems: 'center',
  },
  badgeApproved: {
    backgroundColor: colors.successBg,
    color: colors.successText,
    borderRadius: radii.full,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    padding: '2px 8px',
    display: 'inline-flex',
    alignItems: 'center',
  },
  badgeRejected: {
    backgroundColor: colors.errorBg,
    color: colors.errorText,
    borderRadius: radii.full,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    padding: '2px 8px',
    display: 'inline-flex',
    alignItems: 'center',
  },

  // ─── Alert / Message (Ant Design default değerleri) ─────────────────────────

  alertSuccess: {
    backgroundColor: colors.successBg,
    border: `1px solid ${colors.successBorder}`,
    borderRadius: radii.lg,              // Ant: 8px
    padding: '9px 12px',
    color: colors.successText,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    boxShadow: shadows.antMessage,
  },
  alertError: {
    backgroundColor: colors.errorBg,
    border: `1px solid ${colors.errorBorder}`,
    borderRadius: radii.lg,
    padding: '9px 12px',
    color: colors.errorText,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    boxShadow: shadows.antMessage,
  },
  alertWarning: {
    backgroundColor: colors.warningBg,
    border: `1px solid ${colors.warningBorder}`,
    borderRadius: radii.lg,
    padding: '9px 12px',
    color: colors.warningText,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    boxShadow: shadows.antMessage,
  },

  // ─── Dialog / Modal ─────────────────────────────────────────────────────────

  dialogContent: {
    backgroundColor: colors.bgWhite,
    borderRadius: radii.lg,              // modal 8px
    boxShadow: shadows.antMessage,
    padding: spacing[6],
  },
  dialogTitle: {
    fontSize: typography.fontSize.lg,    // 18px — doğrulanan
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
  },
  dialogFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: spacing[2],
    paddingTop: spacing[4],
    borderTop: `1px solid ${colors.borderLight}`,
    marginTop: spacing[4],
  },

  // ─── Table ──────────────────────────────────────────────────────────────────

  tableHeader: {
    backgroundColor: colors.bgPage,
    color: colors.textPrimary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    padding: '12px 16px',
    borderBottom: `1px solid ${colors.borderDefault}`,
  },
  tableCell: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    padding: '12px 16px',
    borderBottom: `1px solid ${colors.borderLight}`,
  },

} as const;

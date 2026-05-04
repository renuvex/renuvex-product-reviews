import type { WidgetSettingsDraft } from './editor/WidgetEditor';

const BASIC_COLOR_KEYS = new Set([
  'basicBrandColor',
  'basicTextColor',
  'basicStarColor',
  'basicStarEmptyColor',
  'basicBarTrackColor',
]);

function getHexRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(hex);
  if (!match) return null;
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
}

function getReadableTextColor(hex: string): '#111111' | '#ffffff' {
  const rgb = getHexRgb(hex);
  if (!rgb) return '#ffffff';
  const srgb = [rgb.r, rgb.g, rgb.b].map((value) => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  });
  const luminance = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  return luminance > 0.5 ? '#111111' : '#ffffff';
}

export function isBasicColorKey(key: string): boolean {
  return BASIC_COLOR_KEYS.has(key);
}

export function applyBasicColorChange(
  settings: WidgetSettingsDraft,
  key: string,
  value: string
): WidgetSettingsDraft {
  const next: WidgetSettingsDraft = { ...settings, [key]: value };
  if (!isBasicColorKey(key)) return next;

  if (key === 'basicBrandColor') {
    const readableText = getReadableTextColor(value);
    Object.assign(next, {
      btnBgColor: value,
      btnTextColor: readableText,
      btnBorderColor: value,
      filterBtnBgColor: value,
      filterBtnTextColor: readableText,
      filterBtnBorderColor: value,
      filterItemActiveColor: value,
      barFillColor: value,
      formStepBarColor: value,
      loadMoreTextColor: value,
      loadMoreBorderColor: value,
      replyBorderColor: value,
    });
  }

  if (key === 'basicTextColor') {
    Object.assign(next, {
      headerTitleColor: value,
      headerAvgColor: value,
      headerCountColor: value,
      headerRecommendColor: value,
      barCountColor: value,
      reviewTitleColor: value,
      reviewAuthorColor: value,
      reviewDateColor: value,
      reviewBodyColor: value,
      replyLabelColor: value,
      replyTextColor: value,
      photoTitleColor: value,
      photoArrowTextColor: value,
      formTextColor: value,
      inputTextColor: value,
      filterItemTextColor: value,
    });
  }

  if (key === 'basicStarColor') {
    next.reviewStarColor = value;
  }

  if (key === 'basicStarEmptyColor') {
    next.starEmptyColor = value;
  }

  if (key === 'basicBarTrackColor') {
    next.barTrackColor = value;
  }

  return next;
}

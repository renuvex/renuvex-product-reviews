// icons/filter-icons.js - Filter button icon registry (single-state SVGs)
//
// Source: Google Material Symbols / Google Fonts Icons - Apache 2.0

var MS_VB = '0 -960 960 960';

function svg(path) {
  return '<svg viewBox="' + MS_VB + '" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="' + path + '"/></svg>';
}

var FP = {
  lines:    'M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z',
  linesAlt: 'M440-160v-160h80v40h360v80H520v40h-80Zm-360-80v-80h280v80H80Zm200-160v-80H80v-80h200v-80h80v240h-80Zm160-80v-80h440v80H440Zm160-160v-160h80v40h120v80H680v40h-80Zm-520-80v-80h440v80H80Z',
  funnel:   'M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z',
  dense:    'M120-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z',
};

export var FILTER_ICONS = {
  lines:    { label: 'Çizgili',       svg: svg(FP.lines) },
  linesAlt: { label: 'Çizgili (Alt)', svg: svg(FP.linesAlt) },
  funnel:   { label: 'Huni',          svg: svg(FP.funnel) },
  dense:    { label: 'Yoğun Çizgili', svg: svg(FP.dense) },
};

export function getFilterIconSvg(value) {
  var icon = FILTER_ICONS[value] || FILTER_ICONS.lines;
  return icon.svg;
}

export function getFilterIconOptions() {
  return Object.keys(FILTER_ICONS).map(function (key) {
    return { value: key, label: FILTER_ICONS[key].label };
  });
}

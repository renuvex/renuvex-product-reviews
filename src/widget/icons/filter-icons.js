// icons/filter-icons.js - Filter button icon registry (single-state SVGs)
//
// Sources:
// - Google Material Symbols / Google Fonts Icons - Apache 2.0
// - Phosphor Icons - MIT

var MS_VB = '0 -960 960 960';
var PH_VB = '0 0 256 256';

function svg(path, viewBox) {
  return '<svg viewBox="' + (viewBox || MS_VB) + '" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="' + path + '"/></svg>';
}

var FP = {
  lines:    'M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z',
  funnel:   'M227.81,66.76l-.08.09L160,139.17v55.49A16,16,0,0,1,152.87,208l-32,21.34A16,16,0,0,1,96,216V139.17L28.27,66.85l-.08-.09A16,16,0,0,1,40,40H216a16,16,0,0,1,11.84,26.76Z',
  controls: 'M84,136a28,28,0,0,1-20,26.83V216a8,8,0,0,1-16,0V162.83a28,28,0,0,1,0-53.66V40a8,8,0,0,1,16,0v69.17A28,28,0,0,1,84,136Zm52-74.83V40a8,8,0,0,0-16,0V61.17a28,28,0,0,0,0,53.66V216a8,8,0,0,0,16,0V114.83a28,28,0,0,0,0-53.66Zm72,80V40a8,8,0,0,0-16,0V141.17a28,28,0,0,0,0,53.66V216a8,8,0,0,0,16,0V194.83a28,28,0,0,0,0-53.66Z',
  sliders:  'M32,80a8,8,0,0,1,8-8H77.17a28,28,0,0,1,53.66,0H216a8,8,0,0,1,0,16H130.83a28,28,0,0,1-53.66,0H40A8,8,0,0,1,32,80Zm184,88H194.83a28,28,0,0,0-53.66,0H40a8,8,0,0,0,0,16H141.17a28,28,0,0,0,53.66,0H216a8,8,0,0,0,0-16Z',
};

export var FILTER_ICONS = {
  lines: { label: 'Lines', svg: svg(FP.lines) },
  funnel: { label: 'Funnel', svg: svg(FP.funnel, PH_VB) },
  controls: { label: 'Controls', svg: svg(FP.controls, PH_VB) },
  sliders: { label: 'Sliders', svg: svg(FP.sliders, PH_VB) },
};

export function getFilterIconSvg(value) {
  var key = value === 'star' ? 'funnel' : value;
  var icon = FILTER_ICONS[key] || FILTER_ICONS.lines;
  return icon.svg;
}

export function getFilterIconOptions() {
  return Object.keys(FILTER_ICONS).map(function (key) {
    return { value: key, label: FILTER_ICONS[key].label };
  });
}

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
  star:     'M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z',
  controls: 'M84,136a28,28,0,0,1-20,26.83V216a8,8,0,0,1-16,0V162.83a28,28,0,0,1,0-53.66V40a8,8,0,0,1,16,0v69.17A28,28,0,0,1,84,136Zm52-74.83V40a8,8,0,0,0-16,0V61.17a28,28,0,0,0,0,53.66V216a8,8,0,0,0,16,0V114.83a28,28,0,0,0,0-53.66Zm72,80V40a8,8,0,0,0-16,0V141.17a28,28,0,0,0,0,53.66V216a8,8,0,0,0,16,0V194.83a28,28,0,0,0,0-53.66Z',
  sliders:  'M32,80a8,8,0,0,1,8-8H77.17a28,28,0,0,1,53.66,0H216a8,8,0,0,1,0,16H130.83a28,28,0,0,1-53.66,0H40A8,8,0,0,1,32,80Zm184,88H194.83a28,28,0,0,0-53.66,0H40a8,8,0,0,0,0,16H141.17a28,28,0,0,0,53.66,0H216a8,8,0,0,0,0-16Z',
};

export var FILTER_ICONS = {
  lines: { label: 'Lines', svg: svg(FP.lines) },
  star: { label: 'Star', svg: svg(FP.star, PH_VB) },
  controls: { label: 'Controls', svg: svg(FP.controls, PH_VB) },
  sliders: { label: 'Sliders', svg: svg(FP.sliders, PH_VB) },
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

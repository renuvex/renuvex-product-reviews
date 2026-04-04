// config.js — Script tag'inden PUBLIC_API_KEY ve API_BASE çıkarma
// Bu değerler tüm modüller tarafından import edilir

const scriptTag = document.currentScript || (function () {
  var scripts = document.getElementsByTagName('script');
  for (var i = scripts.length - 1; i >= 0; i--) {
    if (scripts[i].src && scripts[i].src.indexOf('/widget.js') !== -1) return scripts[i];
  }
  return scripts[scripts.length - 1];
})();

const scriptSrc = scriptTag ? scriptTag.src : '';
const urlParams = new URLSearchParams(scriptSrc.split('?')[1] || '');

export const PUBLIC_API_KEY = urlParams.get('publicApiKey');
export const API_BASE = scriptSrc ? scriptSrc.split('?')[0].replace(/\/widget\.js$/, '') : '';

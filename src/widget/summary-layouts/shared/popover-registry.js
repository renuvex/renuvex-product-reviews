// summary-layouts/shared/popover-registry.js
// Hafif popover registry — light dismiss + one-at-a-time + ESC.
// Sadece "popover davranışı" isteyen elementler kaydolur (overlay tarzı).
// Accordion gibi flow-içi elementler kaydolmaz.

var registered = []; // { trigger, element, close }
var listenersAttached = false;

function handleDocClick(e) {
  for (var i = registered.length - 1; i >= 0; i--) {
    var p = registered[i];
    // Trigger'a tıklama → toggle handler kendi yönetir, bizimki sıralama
    if (p.trigger && p.trigger.contains(e.target)) continue;
    // Element içine tıklama → açık kalmalı
    if (p.element && p.element.contains(e.target)) continue;
    // Dışarı tıklama → kapat
    p.close();
  }
}
function handleKeydown(e) {
  if (e.key !== 'Escape') return;
  for (var i = registered.length - 1; i >= 0; i--) registered[i].close();
}
function ensureListeners() {
  if (listenersAttached || typeof document === 'undefined') return;
  document.addEventListener('click', handleDocClick, true);
  document.addEventListener('keydown', handleKeydown);
  listenersAttached = true;
}

// One-at-a-time: bir popover açılınca diğerlerini kapat.
// Trigger handler'ından "açıyorum" sinyali olarak çağrılır.
export function notifyOpening(self) {
  for (var i = 0; i < registered.length; i++) {
    if (registered[i] !== self) registered[i].close();
  }
}

export function registerPopover(opts) {
  ensureListeners();
  var entry = { trigger: opts.trigger, element: opts.element, close: opts.close };
  registered.push(entry);
  return function unregister() {
    var idx = registered.indexOf(entry);
    if (idx !== -1) registered.splice(idx, 1);
  };
}

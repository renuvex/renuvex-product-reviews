// core/registry.js — Bundle-içi widget surface registry'si
//
// ÖNEMLİ: Bu registry tek IIFE bundle içinde yapısal bir indirection katmanıdır.
// Tüm surface'ler statik import edilir ve widget.js içinde mevcuttur. Bu bir
// code-splitting / lazy-load sınırı DEĞİLDİR — buraya dinamik import() eklemeyin.
// Bkz. ADR_0013 (docs/wiki/04_Decisions/ADR_0013_Modular_Widget_Loader_Architecture.md).
//
// Surface descriptor şekli:
//   { key:      string,
//     detect:   (context) => boolean,
//     mount:    (context) => void,
//     unmount?: () => void }   // Phase 1'de kullanılmıyor; Phase 2 (unmount akışı) için ayrılmış.

var surfaces = [];

// Bir surface descriptor'ı kaydeder. Aynı key tekrar gelirse yok sayılır
// (registerCoreSurfaces idempotent olsun diye).
export function register(descriptor) {
  if (!descriptor || typeof descriptor.key !== 'string') return;
  if (typeof descriptor.detect !== 'function' || typeof descriptor.mount !== 'function') return;
  for (var i = 0; i < surfaces.length; i++) {
    if (surfaces[i].key === descriptor.key) return;
  }
  surfaces.push(descriptor);
}

export function getSurfaces() {
  return surfaces.slice();
}

// Verilen context için detect() geçen tüm surface'leri mount eder.
// Her detect/mount çağrısı try/catch ile izole edilir — bir surface hata
// verirse diğerleri etkilenmez (widget render'ının tek bir yüzey yüzünden
// tamamen düşmesini engeller).
export function mountMatching(context) {
  for (var i = 0; i < surfaces.length; i++) {
    var surface = surfaces[i];
    var matched = false;
    try {
      matched = !!surface.detect(context);
    } catch (err) {
      console.error('[ikr] surface detect error (' + surface.key + '):', err);
      continue;
    }
    if (!matched) continue;
    try {
      surface.mount(context);
    } catch (err) {
      console.error('[ikr] surface mount error (' + surface.key + '):', err);
    }
  }
}

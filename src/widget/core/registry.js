// core/registry.js - widget surface registry.
//
// Phase 2: surface descriptors stay light, and mount() may lazy-load the real
// module. The registry isolates detect/mount failures so one surface cannot
// break the rest of the storefront widget.

var surfaces = [];

// Register a surface descriptor. Duplicate keys are ignored so
// registerCoreSurfaces() remains idempotent.
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

function handleMountResult(surface, result) {
  if (!result || typeof result.then !== 'function') return;
  result.catch(function (err) {
    console.error('[ikr] surface mount error (' + surface.key + '):', err);
  });
}

// Mount every surface whose detect() passes for the given context.
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
      handleMountResult(surface, surface.mount(context));
    } catch (err) {
      console.error('[ikr] surface mount error (' + surface.key + '):', err);
    }
  }
}

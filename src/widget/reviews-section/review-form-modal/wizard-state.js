// reviews-section/review-form-modal/wizard-state.js
// Wizard'ın step state ve geçiş logic'i. Step renderer'larından bağımsız —
// state burada, görsel adımlarda. Bir step input alır, state'e yazar,
// goNext()'le bir sonraki adıma geçer.
//
// Toplam step: 4 (rating → photos → content → author). Sıra TASARIM kararı,
// ileride değişebilir → renderer'lar `state.currentStep` üzerinden tepki
// vermek yerine kendi sıralarını bilir, switch state.js'de.

export var TOTAL_STEPS = 4;

/**
 * Step bazlı merkezi validasyon kuralları.
 * Hem footer (buton) hem de step bileşenleri buraya bakar.
 * Tek merkezden yönetildiği için tutarsızlık (flash vb.) oluşmaz.
 */
export function validateStep(step, state) {
  if (!state) return false;

  switch (step) {
    case 1:
      // Rating zorunlu.
      return state.rating > 0;
    case 2:
      // Fotoğraflar opsiyonel.
      return true;
    case 3:
      // Yorum içeriği zorunlu.
      return !!(state.comment && state.comment.trim().length > 0);
    case 4:
      // İsim (author) zorunlu.
      return !!(state.author && state.author.trim().length > 0);
    default:
      return true;
  }
}

export function createWizardState(opts) {
  opts = opts || {};
  var listeners = [];

  var state = {
    currentStep: 1,
    rating: 0,
    title: '',
    comment: '',
    author: '',
    email: '',
    images: [],
    pendingImages: [],
    fingerprints: [], // Persistence için: 'name_size' formatında parmak izleri
    productId: opts.productId || '',
    productName: opts.productName || '',
  };

  function notify() {
    listeners.forEach(function (fn) {
      try { fn(state); } catch (e) { /* sessiz */ }
    });
  }

  return {
    get: function () { return state; },
    set: function (patch) {
      Object.assign(state, patch);
      notify();
    },
    goNext: function () {
      if (state.currentStep < TOTAL_STEPS) {
        state.currentStep += 1;
        notify();
      }
    },
    goBack: function () {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
        notify();
      }
    },
    onChange: function (fn) {
      listeners.push(fn);
      return function () {
        listeners = listeners.filter(function (l) { return l !== fn; });
      };
    },
  };
}

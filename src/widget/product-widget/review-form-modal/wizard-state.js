// product-widget/review-form-modal/wizard-state.js
// Wizard'ın step state ve geçiş logic'i. Step renderer'larından bağımsız —
// state burada, görsel adımlarda. Bir step input alır, state'e yazar,
// goNext()'le bir sonraki adıma geçer.
//
// Toplam step: 4 (rating → photos → content → author). Sıra TASARIM kararı,
// ileride değişebilir → renderer'lar `state.currentStep` üzerinden tepki
// vermek yerine kendi sıralarını bilir, switch state.js'de.

export var TOTAL_STEPS = 4;

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

// product-widget/review-form-modal/progress-bar.js
// Modal alt kısmındaki segment göstergesi (Loox tarzı).
// Aktif/tamamlanmış step'ler dolu siyah, kalanlar açık gri.

import { TOTAL_STEPS } from './wizard-state.js';

export function createProgressBar() {
  var wrap = document.createElement('div');
  wrap.className = 'ikr-fwizard-progress';

  var segments = [];
  for (var i = 0; i < TOTAL_STEPS; i++) {
    var seg = document.createElement('span');
    seg.className = 'ikr-fwizard-progress-seg';
    wrap.appendChild(seg);
    segments.push(seg);
  }

  return {
    el: wrap,
    update: function (currentStep) {
      segments.forEach(function (seg, idx) {
        if (idx + 1 <= currentStep) {
          seg.classList.add('ikr-fwizard-progress-seg-active');
        } else {
          seg.classList.remove('ikr-fwizard-progress-seg-active');
        }
      });
    },
  };
}

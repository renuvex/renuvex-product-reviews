// reviews-section/render/states.js — non-content state builders.
//
// Pure DOM builders for the review section's non-list states: the admin-preview
// "disabled" placeholder and the fetch-error retry block. Both render inside the
// review section's shadow root, so they are built via DOM (not HTML strings) and
// carry no head-injected CSS. Neither calls render() — the error block's retry
// handler is passed in by the caller (render.js) to avoid a render<->states cycle.

import { partialStarsHTML } from '../../core/helpers.js';

// Disabled-state placeholder (admin preview when settings.enabled === false).
// Built via DOM (not an HTML string) so it can render inside the shadow root.
export function buildDisabledStateEl(radius) {
  var box = document.createElement('div');
  box.style.cssText =
    'padding:40px 20px;margin-top:24px;text-align:center;color:#6e6d7a;font-family:Inter,sans-serif;' +
    'border:1px dashed #e3e1e5;border-radius:' + radius + 'px;background:#fafafa;display:flex;' +
    'flex-direction:column;align-items:center;justify-content:center;gap:8px;';

  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', '32');
  svg.setAttribute('height', '32');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.style.cssText = 'color:#6e6d7a;margin-bottom:4px;';
  var path = document.createElementNS(NS, 'path');
  path.setAttribute('d', 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24');
  var line = document.createElementNS(NS, 'line');
  line.setAttribute('x1', '1');
  line.setAttribute('y1', '1');
  line.setAttribute('x2', '23');
  line.setAttribute('y2', '23');
  svg.appendChild(path);
  svg.appendChild(line);

  var titleEl = document.createElement('div');
  titleEl.style.cssText = 'font-weight:500;font-size:18px;color:#1a191a;letter-spacing:-0.01em;';
  titleEl.textContent = 'Widget şu anda Pasif durumda';

  var descEl = document.createElement('div');
  descEl.style.cssText = 'font-size:16px;color:#6e6d7a;max-width:380px;line-height:1.5;';
  descEl.textContent = 'Canlı mağazanızda müşterileriniz hiçbir yorum alanı görmeyecektir.';

  box.appendChild(svg);
  box.appendChild(titleEl);
  box.appendChild(descEl);
  return box;
}

export function buildEmptyReviewsState(opts) {
  opts = opts || {};
  var wrap = document.createElement('div');
  wrap.className = 'renuvex-pr-empty-state';

  var content = document.createElement('div');
  content.className = 'renuvex-pr-empty-state-content';

  var title = document.createElement('div');
  title.className = 'renuvex-pr-empty-state-title';
  title.textContent = 'Bu ürün için henüz yorum yok';
  content.appendChild(title);

  var stars = document.createElement('div');
  stars.className = 'renuvex-pr-empty-state-stars';
  stars.innerHTML = partialStarsHTML(0, opts.iconPair);
  content.appendChild(stars);

  var text = document.createElement('p');
  text.className = 'renuvex-pr-state-msg renuvex-pr-empty-state-text';
  text.setAttribute('role', 'status');
  text.setAttribute('aria-live', 'polite');
  text.textContent = 'İlk yorumu yazarak diğer müşterilere yardımcı olun.';
  content.appendChild(text);

  wrap.appendChild(content);

  var writeBtn = document.createElement('button');
  writeBtn.type = 'button';
  writeBtn.className = 'renuvex-pr-write-btn renuvex-pr-empty-state-cta';
  writeBtn.textContent = opts.writeButtonText || 'Yorum Yap';
  writeBtn.onclick = typeof opts.onWriteClick === 'function' ? opts.onWriteClick : null;
  wrap.appendChild(writeBtn);

  return wrap;
}

export function buildReviewsErrorState(message, onRetry) {
  var wrap = document.createElement('div');
  wrap.className = 'renuvex-pr-state-msg renuvex-pr-state-error';
  wrap.setAttribute('role', 'status');
  wrap.setAttribute('aria-live', 'polite');

  var text = document.createElement('div');
  text.className = 'renuvex-pr-state-error-text';
  text.textContent = message || 'Yorumlar şu anda yüklenemiyor.';
  wrap.appendChild(text);

  var retryBtn = document.createElement('button');
  retryBtn.type = 'button';
  retryBtn.className = 'renuvex-pr-state-retry';
  retryBtn.textContent = 'Tekrar Dene';
  retryBtn.onclick = async function () {
    retryBtn.disabled = true;
    retryBtn.textContent = 'Tekrar deneniyor...';
    await onRetry();
  };
  wrap.appendChild(retryBtn);

  return wrap;
}

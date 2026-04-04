// index.js — Widget entry point
// ikas tarafından her sayfaya inject edilir: <script src="/widget.js?publicApiKey=...">

import { PUBLIC_API_KEY } from './core/config.js';
import { attachEvents } from './events.js';
import { startMutationObserver } from './observer.js';

// Store key yoksa hiçbir şey yapma
if (PUBLIC_API_KEY) {
  function init() {
    attachEvents();
    startMutationObserver();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

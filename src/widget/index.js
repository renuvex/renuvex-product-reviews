// index.js — Widget entry point
// ikas tarafından her sayfaya inject edilir: <script src="/widget.js?publicApiKey=...">
//
// Bu dosya yalnızca ince bir giriş noktasıdır: side-effect başlatmaları
// (ADR_0011 sırası) ve preview/prod dallanması. Tüm orkestrasyon loader.js'te
// (ADR_0013 — Modular Widget Loader Architecture).

// Error reporter ilk import olmalı — window listener'ları diğer widget
// modülleri evaluate olmadan önce bağlansın. Side-effect import.
import './core/error-reporter.js';
import { ensureBaseReset } from './shared/base-reset.js';
import { attachInputModalityListeners } from './shared/input-modality.js';
import { PUBLIC_API_KEY } from './core/config.js';
import { startWidget, startPreview } from './loader.js';

// Widget-scope base reset + global input modality tracker. İkisi de idempotent
// ve tek bundle içindeki tüm widget yüzeyleri tarafından miras alınır.
ensureBaseReset();
attachInputModalityListeners();

if (window.__ikasPreviewMode === true) {
  startPreview();
} else if (PUBLIC_API_KEY) {
  startWidget();
}

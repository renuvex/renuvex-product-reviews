// listing-badges/index.js — Listing badge orkestrasyon ve state yönetimi

import { ls } from '../core/state.js';
import { fetchSettings } from '../product-widget/bootstrap.js';
import { collectSlugs } from './collect.js';
import { fetchRatings } from './ratings.js';
import { injectBadges } from './inject.js';
import { injectStyles } from '../core/helpers.js';
import { CLASSIC_CSS } from '../themes/ozy/styles.js';

export async function renderListingBadges() {
  if (ls.inProgress) { ls.queued = true; return; }
  if (ls.rendered) return;
  ls.rendered = true;
  ls.inProgress = true;
  try {
    var doCleanup = ls.navCleanup;
    if (doCleanup) ls.navCleanup = false;

    var slugNameMap = collectSlugs();
    if (!Object.keys(slugNameMap).length) { ls.rendered = false; return; }
    var results = await Promise.all([fetchSettings(), fetchRatings(Object.keys(slugNameMap))]);
    var settings = results[0];
    if (!settings) { ls.rendered = false; return; }
    var ratings = results[1];

    // Widget rengini CSS variable olarak set et — listing badge yıldızları için
    injectStyles(settings.widgetColor, CLASSIC_CSS);

    // Fetch tamamlandıktan sonra atomik swap: önce eskileri sil, sonra yenileri inject et
    if (doCleanup) {
      document.querySelectorAll('[data-ikr-listing-badge]').forEach(function(el) { el.remove(); });
      document.querySelectorAll('[data-ikr-badge]').forEach(function(el) { el.removeAttribute('data-ikr-badge'); });
    }
    injectBadges(slugNameMap, ratings);
  } finally {
    ls.inProgress = false;
    if (ls.queued) {
      ls.queued = false;
      ls.rendered = false;
      renderListingBadges();
    }
  }
}

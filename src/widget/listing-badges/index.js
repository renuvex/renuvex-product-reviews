// listing-badges/index.js — Listing badge orkestrasyon ve state yönetimi

import { ls } from '../core/state.js';
import { fetchSettings } from '../product-widget/bootstrap.js';
import { collectSlugs } from './collect.js';
import { fetchRatings } from './ratings.js';
import { injectBadges } from './inject.js';

export async function renderListingBadges() {
  if (ls.inProgress) { ls.queued = true; return; }
  if (ls.rendered) return;
  ls.rendered = true;
  ls.inProgress = true;
  try {
    // PAGE_VIEW sonrası eski badge'leri ve attribute'ları atomik temizle
    if (ls.navCleanup) {
      ls.navCleanup = false;
      document.querySelectorAll('[data-ikr-listing-badge]').forEach(function(el) { el.remove(); });
      document.querySelectorAll('[data-ikr-badge]').forEach(function(el) { el.removeAttribute('data-ikr-badge'); });
    }
    var slugNameMap = collectSlugs();
    if (!Object.keys(slugNameMap).length) { ls.rendered = false; return; }
    var results = await Promise.all([fetchSettings(), fetchRatings(Object.keys(slugNameMap))]);
    var settings = results[0];
    if (!settings) { ls.rendered = false; return; }
    var ratings = results[1];
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

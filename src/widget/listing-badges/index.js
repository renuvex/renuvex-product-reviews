// listing-badges/index.js - listing badge orchestration and state.

import { ls } from '../core/state.js';
import { fetchSettings } from '../core/settings.js';
import { getIconFromSettings } from '../icons/index.js';
import { SIZE_MAP, ensureBadgeTokens } from '../core/badge.js';
import { collectProductTargets } from './collect.js';
import { fetchRatings } from './ratings.js';
import { clearBadgePlaceholders, disconnectListingBadgeRemovalObservers, injectBadges, reserveBadgeSlots } from './inject.js';

function cleanupListingBadges() {
  disconnectListingBadgeRemovalObservers();
  document.querySelectorAll('[data-renuvex-listing-badge],[data-renuvex-listing-badge]').forEach(function(el) { el.remove(); });
  document.querySelectorAll('[data-renuvex-pr-badge],[data-renuvex-badge]').forEach(function(el) {
    el.removeAttribute('data-renuvex-pr-badge');
    el.removeAttribute('data-renuvex-badge');
  });
  clearBadgePlaceholders();
}

export async function renderListingBadges() {
  if (ls.inProgress) { ls.queued = true; return; }
  if (ls.rendered) return;
  ls.rendered = true;
  ls.inProgress = true;
  try {
    var doCleanup = ls.navCleanup;
    if (doCleanup) ls.navCleanup = false;

    var response = await fetchSettings();
    if (!response) { ls.rendered = false; return; }

    var widgets = (response && response.widgets) || {};

    // Do not inject listing badges when the badge widget is disabled.
    if (widgets.badge && widgets.badge.enabled === false) {
      if (doCleanup) cleanupListingBadges();
      ls.rendered = false;
      return;
    }

    // Rating görseli tek kaynaktan: "Ürün Yorumları" widget'ı (reviewIcon +
    // reviewStarColor). Listing rozetleri PDP render.js'e bağlı olmadan kendi
    // yıldız renk değişkenini kurar — soğuk listing girişinde de doğru renk.
    // Dolu + boş yıldız (outline) tek --renuvex-pr-review-star-color'dan beslenir.
    var productTargets = collectProductTargets();
    var slugs = Object.keys(productTargets);
    if (!slugs.length) { ls.rendered = false; return; }
    var ratingsPromise = fetchRatings(productTargets).catch(function() { return {}; });

    var reviewsSettings = widgets.reviews || {};
    var iconPair = getIconFromSettings(reviewsSettings);
    var starColor = /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(reviewsSettings.reviewStarColor || '')
      ? reviewsSettings.reviewStarColor
      : '#f59e0b';
    document.documentElement.style.setProperty('--renuvex-pr-review-star-color', starColor);

    // Rozet boyutu — "Yıldız Rozeti" → badge.size; SIZE_MAP core/badge.js'te tek kaynak.
    // Merchant'ın Küçük/Orta/Büyük seçimi PDP başlık rozetiyle aynı şekilde
    // (hem ikon hem metin boyutuna) uygulanır. Yüzeye özel olan tek şey çevre
    // boşlukları (gap/margin) — listing dar kart, PDP ferah başlık.
    // PR-3: sizing component-scope CSS variable üzerinden akıyor;
    // ensureBadgeTokens `<style id="renuvex-pr-badge-tokens">` etiketini günceller.
    // PR-4: mobileOverride açıksa `@media (max-width:640px)` bloğu da yazılır.
    var badgeSettings = widgets.badge || {};
    var sizeKey = badgeSettings.size || 'medium';
    var sizes = SIZE_MAP[sizeKey] || SIZE_MAP.medium;
    var mobileSizes = null;
    if (badgeSettings.mobileOverride === true) {
      var mobileSizeKey = badgeSettings.mobileSize || 'small';
      mobileSizes = SIZE_MAP[mobileSizeKey] || SIZE_MAP.small;
    }
    ensureBadgeTokens(sizes, mobileSizes);

    var slugNameMap = {};
    slugs.forEach(function(slug) {
      slugNameMap[slug] = productTargets[slug] ? productTargets[slug].name : null;
    });

    // Remove old badges before reserving slots for the new page/listing.
    if (doCleanup) {
      cleanupListingBadges();
    }

    // Reserve stable vertical space while rating data is still in flight, then
    // replace placeholders with real badges in injectBadges().
    reserveBadgeSlots(slugNameMap);

    var ratings = await ratingsPromise;
    injectBadges(slugNameMap, ratings, iconPair);
  } finally {
    ls.inProgress = false;
    if (ls.queued) {
      ls.queued = false;
      ls.rendered = false;
      renderListingBadges();
    }
  }
}

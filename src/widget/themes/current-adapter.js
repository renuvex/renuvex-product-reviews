// themes/current-adapter.js - active storefront theme adapter.
//
// Phase 2 keeps Ozy as the verified fallback adapter. Future ikas Studio data-*
// attributes or merchant-selected theme ids can be routed here without changing
// listing badge injection logic.
//
// ─── THEME ADAPTER CONTRACT ─────────────────────────────────────────────────
// A theme adapter answers ONLY "where and when to render": DOM mount points,
// product card / title selectors, page & context detection, and nav/cart/banner
// link exclusion.
//
// A theme adapter NEVER decides "how it looks". The star icon family, star
// color, and full/half/empty rendering are a GLOBAL rating visual system
// (source: "Ürün Yorumları" reviewIcon / reviewStarColor; renderer:
// core/helpers.js partialStarsHTML + PARTIAL_STARS_CSS). Adapter exports must
// not include any icon / color / half-star logic. See ADR_0016.

import { ozyThemeAdapter } from './ozy/adapter.js';

export function getThemeAdapter() {
  return ozyThemeAdapter;
}

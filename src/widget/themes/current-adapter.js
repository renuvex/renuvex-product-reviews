// themes/current-adapter.js - active storefront theme adapter.
//
// Phase 2 keeps Ozy as the verified fallback adapter. Future ikas Studio data-*
// attributes or merchant-selected theme ids can be routed here without changing
// listing badge injection logic.

import { ozyThemeAdapter } from './ozy/adapter.js';

export function getThemeAdapter() {
  return ozyThemeAdapter;
}

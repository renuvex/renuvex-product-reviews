// summary-layouts/classic/styles.js
// Classic/default summary layout — classic-specific CSS only.
//
// The shared `.renuvex-pr-summary` base (root container, grid tokens, and
// avg/count/recommend typography) used to live here and is inherited by every
// summary layout. It now lives in summary-layouts/shared/summary-base.js and is
// injected first by getLayoutsCSS(). This file keeps ONLY the classic-specific
// rule (title alignment); classic's container uses the bare `.renuvex-pr-summary`
// base from summary-base.js (classic root has no `-summary-classic` modifier).

export var CLASSIC_SUMMARY_CSS = `
  /* Classic layout title is centered; other layouts override their title class. */
  .renuvex-pr-title-classic{text-align:center;}
`;

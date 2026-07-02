// summary-layouts/shared/summary-base.js
// Shared summary base for ALL summary layouts.
//
// `.renuvex-pr-summary` root container + grid column tokens
// (--renuvex-pr-col-label / -col-count / -col-gap / --renuvex-pr-summary-max) +
// the avg/count/recommend typography. Every summary layout's root carries the
// `.renuvex-pr-summary` class (classic/index.js:35, compact/index.js:73,
// split/index.js:37, hero/index.js:29, minimal/index.js:32) and inherits these
// rules, then overrides composition in its own *-summary-<id> rules.
//
// getLayoutsCSS() (summary-layouts/index.js) prepends this BEFORE the per-layout
// CSS so the cascade order stays "base first, layout overrides after".
//
// Faz 1 (behavior-preserving extraction): moved verbatim out of classic/styles.js
// with no value/selector change. The base still carries classic's default visual
// feel (flex-direction:column / gap:20 / padding) as the summary default;
// isolating that into an explicit classic modifier is a separate tokenization
// phase (Faz 2).

export var SUMMARY_BASE_CSS = `
  .renuvex-pr-summary{
    --renuvex-pr-col-label:104px;
    --renuvex-pr-col-count:60px;
    --renuvex-pr-col-gap:4px;
    --renuvex-pr-summary-max:340px;
    display:flex;flex-direction:column;align-items:center;gap:20px;
    padding:16px 28px 24px;border-radius:var(--renuvex-pr-radius,6px);margin:0 auto 24px;
  }

  .renuvex-pr-summary-avg{flex-direction:row;gap:8px;max-width:none;width:auto;}
  .renuvex-pr-avg-star{width:var(--renuvex-pr-avg-star-size,52px);height:var(--renuvex-pr-avg-star-size,52px);color:var(--renuvex-pr-review-star-color,#f59e0b);line-height:1;}
  .renuvex-pr-avg-num{font-size:var(--renuvex-pr-avg-rating-size,46px);font-weight:500;line-height:1;color:var(--renuvex-pr-header-avg,#111111);}

  .renuvex-pr-summary-count{font-size:var(--renuvex-pr-review-count-size,16px);color:var(--renuvex-pr-header-count,#111111);white-space:normal;font-weight:400;max-width:100%;width:auto;overflow-wrap:anywhere;word-break:break-word;line-height:1.2;text-align:center;}

  .renuvex-pr-summary-recommend{display:block;font-size:var(--renuvex-pr-recommend-size,14px);color:var(--renuvex-pr-header-recommend,#111111);text-align:center;max-width:100%;width:auto;overflow-wrap:anywhere;word-break:break-word;}
  .renuvex-pr-recommend-pct{font-weight:700;color:var(--renuvex-pr-header-recommend,#111111);margin-right:3px;}

  @media(max-width:600px){
    .renuvex-pr-summary{padding:16px var(--renuvex-pr-pad-summary-mobile);gap:14px;--renuvex-pr-col-label:92px;--renuvex-pr-col-count:48px;}
  }
`;

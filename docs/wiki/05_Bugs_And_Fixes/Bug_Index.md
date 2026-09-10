---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - bugs
related:
  - "[[Index]]"
  - "[[Solved_Issues]]"
  - "[[Recurring_Problems]]"
  - "[[Debugging_Notes]]"
source_files: []
---

# Bug Index

## Agent Brief

Use this page to locate verified bug records. Keep open issues separate from
fixed history, and do not mark a runtime issue closed until its required live
acceptance has passed. The 2026-08 badge availability incident is fixed. The
Product ID runtime and PR #39's quick-view generation fix are live. PR #40 and
the approved replacement Worker fixed the remaining bound-modal discovery TTL
bug; desktop and `412x915` live lifetime acceptance passed. The broader Product
ID closeout still tracks lifecycle continuity, Canary 2, and Sentry alerts in
its acceptance record.

> Master list of tracked bugs. Add an entry when a real bug is found, with link to a per-bug note. Mark fixed bugs and link to the resolution.

## Open
- None currently recorded.

## Recently fixed (verify periodically)
- 2026-09-10 - [[Bug_Quick_View_Badge_Listing_Generation_Rollover]] - PR #39 fixed same-target/same-ID generation rollover; PR #40 made discovery TTL pre-bind only. Main/Vercel/approved Worker rollout completed, and desktop plus `412x915` live quick-view canaries retained one exact Product ID badge beyond the former TTL and after internal interaction, with clean close cleanup.
- 2026-09-08 - [[Bug_Storefront_Badges_Fail_Closed_After_Theme_Schema_Drift]] - PR #35 replaced unavailable Ikas active-theme evidence with strict runtime-attested Ozy placement while preserving fail-closed unknown/ambiguous themes; PR #36 bound request dedupe to exact candidates. Live PDP/category/home placement passed. Product ID propagation is deployed and Canary 1 passed; lifecycle continuity, Canary 2, and owner-deferred Sentry alert delivery remain in the separate closeout record.
- 2026-07-29 - [[Bug_Review_Widget_SPA_Health_Probe_False_Positive]] - Fixed a CI-reproduced false `reviews-widget / missing_after_render` report. The old product widget is intentionally cleared during an SPA route transition, but its delayed visibility probe could fire before the next product event. Review probes now stop only when their route/product lifecycle is no longer relevant; genuine unexpected removal remains observable.
- 2026-07-04 - [[Bug_AWS_Lightbox_Full_Size_Variant_Selection]] - Fixed a storefront AWS image lightbox bug where small uploaded originals could make every generated variant report the same width, causing the generic picker to choose `thumb_640x854.webp` for the main 1200px modal image. Lightbox main images now prefer the full-size `w*` variant family, and duplicate immutable `srcset` values are suppressed.
- 2026-07-02 - [[Bug_Offline_Refresh_Unstyled_SVG_Star]] - Verified and fixed an offline refresh / partial-load hardening bug where widget-owned SVG stars and media thumbnails could become huge when CSS/current chunks were missing or delayed. Shared icon output now carries intrinsic `1em` fallback dimensions, and media thumbnail source quality is separated from small HTML display fallback dimensions.
- 2026-06-12 - [[Bug_Widget_Editor_Late_Settings_Dirty_State]] - Verified and fixed an admin customization dirty-state bug where opening Product Reviews before asynchronous saved settings finished loading could initialize the editor draft from defaults, then mark the screen as unsaved when the real saved settings arrived. The editor now syncs late saved settings only while the local draft is still untouched, preserves real merchant edits, and unit tests pin the draft/saved snapshot contract.
- 2026-06-06 - [[Bug_PDP_Review_Lifecycle_SPA_Race]] - Verified and fixed a PDP SPA navigation race where `PRODUCT_VIEW` could arrive before the explicit review mount and later stale product bootstrap results could overwrite the active PDP review widget. The loader now replays only `reviews-main` for late explicit review mounts, initial bootstrap is guarded by product/path tokens, and network smoke pins late-mount replay, mount-absent badge-only behavior, and stale bootstrap prevention.
- 2026-06-06 - [[Bug_Compact_Count_Label_HTML_Injection]] - Verified and fixed a compact summary hardening bug: the merchant-editable `countLabel` was interpolated into the compact trigger's `innerHTML` string while the other summary layouts used `textContent`. The compact layout now keeps trusted star/caret SVG markup in `innerHTML` but writes the dynamic count label through `textContent`; merchant-text fallbacks are normalized through `settingText(...)`, and runtime smoke pins both markup-like labels and whitespace-only labels.
- 2026-06-02 - [[Bug_List_Review_Photo_Height_Stretch]] - Verified and fixed a list layout review item image sizing bug: medium list photos could render as `110 x 400px` because the layout set width but did not own the rendered height, allowing the image HTML `height=400` metadata to leak into layout. List item photos now use paired width/height CSS variables and runtime smoke pins the medium 3:4 portrait box in tall rows.
- 2026-06-02 - [[Bug_Filter_Menu_Shadow_DOM_Light_Dismiss]] desktop follow-up - Desktop mouse testing showed a filter option selection could leave the shared filter button temporarily non-interactive after the sort render (`pointer-events:none`, no pointer cursor), especially visible in compact desktop when immediately trying to reopen the filter. Root cause: mouse options were activating on `pointerdown`, arming the mobile gesture shield before render. Fixed by keeping touch/pen on `pointerdown` with the shield, but moving desktop mouse option activation back to the normal `click` path; runtime smoke pins all five summary layouts.
- 2026-06-02 - [[Bug_Filter_Menu_Shadow_DOM_Light_Dismiss]] deployment follow-up - Vercel production was already on commit `142707d8`, but physical mobile testing still reported the compact rating flash immediately after deploy. Hardened the visual state by moving inactive filtered rows to `.renuvex-pr-bar-dimmed{opacity:0.35!important}` and changed stable widget entrypoints to `max-age=0, must-revalidate` so bugfix deploys are not hidden behind the previous 5-minute loader cache window.
- 2026-06-02 - [[Bug_Filter_Menu_Shadow_DOM_Light_Dismiss]] follow-up - Physical mobile testing showed the same-gesture dismiss shield was visually over-broad: after a compact mobile rating was selected, choosing a filter option made inactive rating rows flash from their intentional `opacity:0.35` dim state to full opacity. Fixed by keeping pointer blocking broad while excluding `.renuvex-pr-bar-row` from the forced `opacity:1` reset; runtime smoke pins `opacity:0.35` + `pointer-events:none` during the shield.
- 2026-06-01 - [[Bug_Filter_Menu_Shadow_DOM_Light_Dismiss]] follow-up - Physical mobile testing showed the trailing click swallow was not enough: after a filter option closed the menu on `pointerdown`, same-gesture compat mouse/active state could visually press the exposed "Yorum Yap" button underneath. Fixed with a scoped `[data-renuvex-pr-dismiss-gesture]` shield that preserves normal ADR_0011 press feedback for real future taps.
- 2026-06-01 - [[Bug_Summary_Popover_Registry_Lifecycle_Contract]] - Verified and fixed a summary popover registry lifecycle/contract bug: full summary re-renders could leave detached filter-menu entries registered, `notifyOpening` callers passed unregister functions while the registry compared entry objects, and the compact panel did not return the required `wasOpen` boolean. The registry now exposes a handle API, purges disconnected entries, and pins the contract with unit + interaction tests.
- 2026-06-01 - [[Bug_Photo_Strip_Thumbnail_Size_Contract]] - Verified and fixed a photo strip settings-contract bug: list/gallery layouts exposed "Fotoğraf Galeri Boyutu" but runtime overwrote the strip thumbnail size with widget-size layout photo widths. `thumbnailSize` now controls the top strip in every review layout; list/gallery item photos still follow widget `size`.
- 2026-06-01 - [[Bug_Widget_Page_View_Semantic_Dedupe]] - Widget loader lifecycle follow-up verified and fixed a `PAGE_VIEW` dedupe bug: the previous global 800 ms timestamp debounce suppressed a real `PRODUCT` to `CATEGORY` transition when events arrived close together. `storefront-context.js` now dedupes by normalized `pageType` plus route key, and network smoke pins both distinct-transition pass-through and same-page duplicate suppression.
- 2026-05-31 - [[Bug_Widget_Listing_Event_Replay]] - Widget loader lifecycle audit verified and fixed a listing/search event replay gap: synchronous `VIEW_LISTING` / `VIEW_SEARCH_RESULTS` emitted during `IkasEvents.subscribe()` could map product context before `onListingView()` was registered, so the listing surface was not mounted until a later page event or fallback. `storefront-context.js` now replays latest listing context like product/page, and network smoke pins duplicate product idempotency, PDP side-effect boundaries, listing event ordering, and fail-closed listing gates.
- 2026-05-31 - [[Bug_Review_Read_Lifecycle_Stale_Responses]] - Review read lifecycle audit verified and fixed three storefront regressions: slower sort/filter responses could overwrite newer selections, stale load-more completions could advance the active sorted page, and overlapping load-more ids duplicated DOM cards. Runtime smoke now pins stale-response guards, duplicate filtering, retry recovery, photo-strip independence, and trusted image layout rendering.
- 2026-05-31 - [[Bug_Review_Wizard_Photo_Upload_Lifecycle]] - Verified and fixed two photo upload lifecycle bugs: close-before-upload-complete now revokes local blob previews, and deleting one pending photo no longer aborts later selected uploads. Removal now batches state cleanup before blob revoke to avoid stale image load errors.
- 2026-05-31 - [[Bug_Lightbox_Focus_Trap_Accessibility]] follow-up - Verified and fixed photo-strip thumbnails being click-only lightbox triggers. `wireLightboxTrigger()` now centralizes photo lightbox trigger ARIA + `tabindex` + `Enter`/`Space` activation across photo strip and card/list/gallery layouts; interaction smoke pins keyboard open and focus restore from the strip.
- 2026-05-31 - [[Bug_Wizard_Rating_Radiogroup_And_Focus_Return]] follow-up - Verified and fixed initial `Shift+Tab` focus escape after opening the wizard or photo lightbox. Cause: dialog containers with `tabindex="-1"` were focused inside the trap but omitted from tabbable first/last math. `trapFocus()` now routes non-tabbable in-trap focus into the tabbable cycle; interaction smoke pins both overlays.
- 2026-05-30 - [[Bug_Wizard_Rating_Radiogroup_And_Focus_Return]] - In the wizard, Tab stepped through all 5 rating stars and Esc didn't return focus to the "Yorum Yap" trigger. Final behavior after user testing keeps all stars Tab-focusable and adds arrow-key navigation; `getReturnFocusElement()` is shadow-aware, close moves focus out before fade, and overlays focus their dialog containers on open so first Tab lands predictably.
- 2026-05-30 - [[Bug_Icon_Use_Node_Blank_Glyphs]] - After the Phosphor unification, the caret/X icons inserted via `appendChild(iconUseNode(...))` (lightbox close + nav, photo-strip arrows, wizard close, thumbnail-remove) rendered as **blank buttons** (box present + clickable, no glyph). Root cause: `iconUseNode` built the `<svg><use>` via `DOMParser('image/svg+xml')` + `importNode`; such a `<use>` never instances its sprite `<symbol>` once moved into a live shadow tree (non-zero rect but empty `getBBox()`). HTML-parsed icons (filter, compact chevron, wizard back, stars) were fine. All behavior tests passed because the buttons still clicked. Fixed by HTML-parsing in `iconUseNode`; added a `getBBox()` geometry regression.
- 2026-05-30 - [[Bug_Icon_Sprite_Inner_Dimension_Strip]] - The review wizard's "Fotoğraf Ekle" icon rendered without its square frame (only the inner lens + mountain line showed). Root cause: `icons/star-sprite.js` `svgStringToSymbol` stripped `width`/`height` with global regexes, deleting them from the image icon's frame `<rect width height>` (a 0×0 rect renders nothing) — latent since the `<symbol>`/`<use>` sprite was introduced, invisible because every other icon is `<path>`/`<circle>`/`<line>` based. Fixed by scoping the strip to the root `<svg>` tag only (path-icon output byte-identical); also swapped the wizard photo/plus icons to Phosphor to match the badge/filter family.
- 2026-05-30 - [[Bug_Filter_Menu_Shadow_DOM_Light_Dismiss]] - After Shadow DOM isolation, the classic summary filter dropdown stayed open on re-tap, and a dismiss/option tap over the photo strip opened a thumbnail's lightbox. Root cause: `popover-registry`'s `document`-level light-dismiss read a retargeted `e.target` (always the shadow host `#renuvex-reviews`), so every click read as "outside". Fixed with `event.composedPath()` membership + swallowing the dismiss/activation click.
- 2026-05-25 - [[Bug_Listing_Badge_Missing_After_Render]] - Sentry RENUVEX-PRODUCT-REVIEWS-6 (~93 events, `listing-badge` / `missing_after_render`) was a false positive: the 350ms visibility probe held a stale reference to the pre-self-heal badge element while a healthy replacement was present. Fixed by having `probeWidgetVisibility` re-resolve the live owned node at probe time (resolvers at all call sites); mount-mode-independent (A/B proven), verified on the dev store (1/session → 0). Intentional one-shot self-heal left unchanged.
- 2026-05-24 - [[Bug_Review_Wizard_WebKit_Rating_Advance]] - A real iPhone 11 Safari test could leave the review wizard waiting on step 1 after tapping a star. Fixed by making rating activation pointer/touch-safe and by sending the auto-advance request through the wizard state machine instead of dropping it on a one-shot `canNavigate()` check.
- 2026-05-24 - [[Bug_Filter_Menu_WebKit_Tap_Activation]] - iOS Safari/WebKit closed the review filter menu on tap without firing the option activation path, so the review list did not change. Fixed with pointer-safe menu item activation plus explicit next-state fetch values.
- 2026-05-24 - [[Bug_Widget_Script_Ownership_Conflict]] - A third-party app also loaded a `widget.js` file, and this app's loader/runtime could select that script when `document.currentScript` was unavailable. Fixed with marker-first, `publicApiKey`-required script discovery plus owned Renuvex/legacy slot wrappers; live deploy verification remains required.
- 2026-05-17 - [[Bug_Listing_Badge_Stars_Direct_Load]] - Listing badge stars were missing on cold direct entry to home/category/search pages (`.renuvex-pr-star` spans rendered 0×0 because `#renuvex-pr-styles`, which carries the `display:inline-flex` rule, was injected only by the PDP `render.js` path). Fixed: the badge factory self-injects `#renuvex-pr-badge-styles` via `ensureBadgeStyles()`, sharing one `PARTIAL_STARS_CSS` constant with `CLASSIC_CSS`. Verified on the dev store with cold home/category entry.
- 2026-05-12 - [[Bug_Lightbox_Preview_Settings_Sync]] - Open photo lightbox preview updates now re-render the full right pane from closure state, including review icons and merchant reply label, instead of reading rating from DOM attributes.
- 2026-05-12 - [[Bug_Filter_Menu_Keyboard_Accessibility]] - Review summary filter menu now uses real `<button role="menuitem">` items, exposes menu semantics on the trigger, focuses the first option on open, restores focus to the trigger on close, and auto-closes when focus leaves the wrap.
- 2026-05-12 - [[Bug_Review_Wizard_Focus_Trap_Accessibility]] - Multi-step review submission wizard now traps keyboard focus, focuses the active step on open/step change, restores previous focus on close, and exposes visible focus outlines.
- 2026-05-12 - [[Bug_Lightbox_Mobile_Review_Switch_Scroll_State]] - Photo lightbox now normalizes all modal scroll layers when switching long/short reviews, and fixed-body locking is limited to iOS/WebKit.
- 2026-05-12 - [[Bug_Lightbox_Mobile_Pull_To_Refresh]] - Photo lightbox now locks root overscroll so long-comment top-boundary pulls do not leak into browser pull-to-refresh.
- 2026-05-11 - [[Bug_Widget_CSS_Template_Backtick_Crash]] - Deployed `widget.js` no longer crashes with `ReferenceError: modal is not defined`; raw backticks were removed from the CSS template literal and the bundle was rebuilt.
- 2026-05-11 - [[Bug_Product_Widget_Missing_Auto_Mount]] - PDP review block no longer depends exclusively on a manually present `#ikas-reviews-anchor`; missing anchors are generated after the product container so the review block and product-title badge can render after deploy/theme changes.
- 2026-05-11 - [[Bug_Review_Image_Error_Fallback]] - Review image load failures now degrade gracefully: storefront thumbnails hide broken images, the lightbox main image shows a neutral placeholder, and failures are surfaced with `console.warn`. (K2)
- 2026-05-11 - [[Bug_Cloud_Name_Silent_Image_Filter]] - Structurally closed by [[ADR_0008_Cloud_Name_Build_Time_Only]]: cloud name is now a single build-time constant. Runtime image-policy cache, setter, settings field, and warn helper removed.
- 2026-05-11 - [[Bug_Lightbox_Tablet_Viewport_And_Scroll]] - Photo lightbox now uses a stacked 641-800 px tablet/landscape shell, mobile `vh` / `svh` / `dvh` fallbacks, and explicit scroll containment.
- 2026-05-11 - [[Bug_Lightbox_Focus_Trap_Accessibility]] - Photo lightbox now exposes dialog semantics, traps keyboard focus inside the modal, and restores previous focus on close.
- 2026-05-11 - [[Bug_Review_Fetch_Error_Empty_State]] - Review fetch failures now render a retryable error state instead of the normal empty-review state; load-more failures keep a retry button.
- 2026-05-11 - [[Bug_Review_Detail_Lightbox_Risks]] - Card/list/gallery lightbox navigation now uses one canonical loaded review collection for the active sort/filter state instead of caller page slices.
- 2026-05-11 - [[Bug_Photo_Strip_Lazy_Loading_And_Srcset]] - Photo strip, card/list/gallery thumbnails, and lightbox mini thumbs now use lazy/eager policy, async decoding, responsive `srcset`, and explicit dimensions. Main lightbox image keeps eager loading with explicit dimensions.
- 2026-05-11 - [[Photo_Strip]] - Photo strip now uses dedicated `hasImages=true&limit=15` fetch independent of the main list. Load-more and sort/filter no longer leave the strip in a stale state; lightbox navigation walks the dedicated strip dataset. See [[ADR_0007_Photo_Strip_Cap_And_Rotation]].
- 2026-05-10 - [[Bug_Review_Detail_Lightbox_Risks]] - Photo-less gallery long-text read-more no longer opens the photo detail lightbox; it expands inline, and `openReviewModal` guards empty image sets.
- 2026-05-10 - [[Bug_Review_Detail_Lightbox_Risks]] - Public review image URLs are now restricted to trusted Cloudinary assets before storage or storefront render.

## Recurring problems
See [[Recurring_Problems]] for patterns that come back across versions.

## How to file a bug
1. Copy [[Bug_Template]] → `05_Bugs_And_Fixes/Bug_<short-title>.md`
2. Fill: Date · Status · Area · Symptoms · Root Cause · Fix · Files Changed · Prevention
3. Add a row to this index
4. Update the same row and bug page when fixed; do not create a second solved log

## Obsidian Links
- [[Solved_Issues]]
- [[Recurring_Problems]]
- [[Debugging_Notes]]
- [[Bug_Template]]

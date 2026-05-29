## Summary
- 

## Verification
- [ ] `pnpm test:unit`
- [ ] `pnpm test:widget-smoke`
- [ ] `pnpm test:widget-runtime`
- [ ] `pnpm test:widget-interactions`
- [ ] `pnpm test:admin-preview`
- [ ] `pnpm check:widget-js`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm lint`
- [ ] `git diff --check`

## Widget/API Test Coverage
- [ ] Surface or lazy-boundary changes update widget network smoke tests, or this PR explains why not.
- [ ] Layout/render changes update widget runtime smoke tests, or this PR explains why not.
- [ ] Modal/lightbox/wizard changes update interaction smoke tests, or this PR explains why not.
- [ ] Admin settings/preview changes update admin preview tests, or this PR explains why not.
- [ ] Public API/theme-state changes update unit tests, or this PR explains why not.
- [ ] New `src/widget/surfaces/*.surface.js` files update `SURFACE_TEST_CONTRACTS` in `tests/unit/widget-surface-contracts.test.ts`.
- [ ] Runtime/network-sensitive widget changes run `pnpm measure:deployed-widget` or explain why deployed evidence is not applicable.
- [ ] Structured-data changes run `pnpm verify:deployed-jsonld` and record/plan Google Rich Results verification.

## Notes
- 

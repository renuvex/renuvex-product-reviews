// core/rollout.js — Allowlist gate for badge sibling-mount rollout (PR-2 deploy 1).
//
// Plan: docs/wiki/plans (ADR_0017 draft) — phased migration. Production stores
// keep legacy (inside-<h2>) mount until deploy 2 flips the default. Dev store
// is added below for 48-72h monitoring after PR-2 lands.
//
// Emergency override (debug only):
//   window.RENUVEX_PR_BADGE_MOUNT_LEGACY = true -> disable sibling mount.

import { PUBLIC_API_KEY } from './config.js';

// publicApiKey strings — each merchant tenant has a unique key (see config.js).
// Bundle uniquely identifies the merchant; widget.js?publicApiKey=<UUID> is the
// canonical source.
var SIBLING_MOUNT_ALLOWLIST = [
  '02786d4b-a09b-4b36-ad8c-56e6d396f6fd', // dev-mertcopper.ikas.shop
];

export function isSiblingMountEnabled() {
  if (typeof window !== 'undefined' && window.RENUVEX_PR_BADGE_MOUNT_LEGACY === true) return false;
  if (!PUBLIC_API_KEY) return false;
  return SIBLING_MOUNT_ALLOWLIST.indexOf(PUBLIC_API_KEY) !== -1;
}

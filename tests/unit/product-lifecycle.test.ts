import { describe, expect, it } from 'vitest';
import {
  decideProductLifecycleWrite,
  isFreshActiveProduct,
  resolveSafeSlugProductIds,
  type CurrentProductEvidence,
  type NormalizedProductEvidence,
} from '@/lib/product-lifecycle';

const NOW = new Date('2026-08-03T12:00:00.000Z');

function evidence(input: Partial<NormalizedProductEvidence> = {}): NormalizedProductEvidence {
  return {
    productId: 'product-1',
    slug: 'new-slug',
    name: 'New name',
    providerCreatedAt: new Date('2026-01-01T00:00:00.000Z'),
    ikasUpdatedAt: new Date('2026-08-03T11:00:00.000Z'),
    deleted: false,
    ...input,
  };
}

function current(input: Partial<CurrentProductEvidence> = {}): CurrentProductEvidence {
  return {
    lifecycleState: 'active_verified',
    slug: 'old-slug',
    name: 'Old name',
    providerCreatedAt: new Date('2026-01-01T00:00:00.000Z'),
    ikasUpdatedAt: new Date('2026-08-02T11:00:00.000Z'),
    lastVerifiedAt: new Date('2026-08-02T12:00:00.000Z'),
    unavailableAt: null,
    conflictDetectedAt: null,
    absenceFirstObservedAt: null,
    absenceLastObservedAt: null,
    absenceObservationCount: 0,
    absenceLastScheduleSlot: null,
    ...input,
  };
}

describe('product lifecycle evidence transitions', () => {
  it('keeps ownership for the same product id while refreshing metadata', () => {
    const result = decideProductLifecycleWrite({
      current: current(),
      evidence: evidence(),
      productId: 'product-1',
      source: 'reconciliation_scan',
      now: NOW,
    });

    expect(result).toMatchObject({
      lifecycleState: 'active_verified',
      slug: 'new-slug',
      name: 'New name',
      lastVerifiedAt: NOW,
      unavailableAt: null,
    });
  });

  it('does not let out-of-order provider metadata overwrite newer evidence', () => {
    const result = decideProductLifecycleWrite({
      current: current({ ikasUpdatedAt: new Date('2026-08-03T11:30:00.000Z') }),
      evidence: evidence({ ikasUpdatedAt: new Date('2026-08-03T10:00:00.000Z') }),
      productId: 'product-1',
      source: 'webhook_exact',
      now: NOW,
    });

    expect(result.lifecycleState).toBe('active_verified');
    expect(result).not.toHaveProperty('slug');
    expect(result).not.toHaveProperty('name');
    expect(result).not.toHaveProperty('ikasUpdatedAt');
    expect(result.lastVerifiedAt).toBe(NOW);
  });

  it('keeps one exact-empty daily observation unknown and confirms absence on a later daily slot', () => {
    const firstObservedAt = new Date('2026-08-03T03:00:00.000Z');
    const first = decideProductLifecycleWrite({
      current: current(),
      evidence: null,
      productId: 'product-1',
      source: 'reconciliation_exact',
      now: firstObservedAt,
      reconciliationTrigger: 'daily',
      scheduleSlot: '2026-08-03',
    });
    const secondObservedAt = new Date('2026-08-04T03:00:00.000Z');
    const second = decideProductLifecycleWrite({
      current: current(first),
      evidence: null,
      productId: 'product-1',
      source: 'reconciliation_exact',
      now: secondObservedAt,
      reconciliationTrigger: 'daily',
      scheduleSlot: '2026-08-04',
    });

    expect(first).toMatchObject({
      lifecycleState: 'unknown',
      unavailableAt: null,
      absenceObservationCount: 1,
      absenceLastScheduleSlot: '2026-08-03',
    });
    expect(second).toMatchObject({
      lifecycleState: 'unavailable_verified',
      unavailableAt: secondObservedAt,
      absenceObservationCount: 2,
      absenceLastScheduleSlot: '2026-08-04',
    });
  });

  it('does not count replayed or non-daily exact-empty evidence toward deletion', () => {
    const firstObservedAt = new Date('2026-08-03T03:00:00.000Z');
    const first = decideProductLifecycleWrite({
      current: current(),
      evidence: null,
      productId: 'product-1',
      source: 'reconciliation_exact',
      now: firstObservedAt,
      reconciliationTrigger: 'daily',
      scheduleSlot: '2026-08-03',
    });
    const replay = decideProductLifecycleWrite({
      current: current(first),
      evidence: null,
      productId: 'product-1',
      source: 'reconciliation_exact',
      now: new Date('2026-08-04T04:00:00.000Z'),
      reconciliationTrigger: 'daily',
      scheduleSlot: '2026-08-03',
    });
    const manual = decideProductLifecycleWrite({
      current: current(first),
      evidence: null,
      productId: 'product-1',
      source: 'reconciliation_exact',
      now: new Date('2026-08-05T04:00:00.000Z'),
      reconciliationTrigger: 'manual',
    });

    expect(replay).toMatchObject({ lifecycleState: 'unknown', absenceObservationCount: 1 });
    expect(manual).toMatchObject({ lifecycleState: 'unknown', absenceObservationCount: 1 });
  });

  it('turns explicit provider deleted evidence directly into a tombstone', () => {
    const deleted = decideProductLifecycleWrite({
      current: current(),
      evidence: evidence({ deleted: true }),
      productId: 'product-1',
      source: 'reconciliation_scan',
      now: NOW,
    });

    expect(deleted).toMatchObject({ lifecycleState: 'unavailable_verified', unavailableAt: NOW });
  });

  it('treats a tombstoned id reappearing as conflict even when createdAt is equal', () => {
    const originalCreatedAt = new Date('2026-01-01T00:00:00.000Z');
    const result = decideProductLifecycleWrite({
      current: current({
        lifecycleState: 'unavailable_verified',
        providerCreatedAt: originalCreatedAt,
        unavailableAt: new Date('2026-08-02T00:00:00.000Z'),
      }),
      evidence: evidence({ providerCreatedAt: originalCreatedAt }),
      productId: 'product-1',
      source: 'reconciliation_scan',
      now: NOW,
    });

    expect(result).toMatchObject({
      lifecycleState: 'identity_conflict',
      conflictDetectedAt: NOW,
    });
    expect(result).not.toHaveProperty('slug');
  });

  it('never auto-resolves identity conflict', () => {
    const result = decideProductLifecycleWrite({
      current: current({
        lifecycleState: 'identity_conflict',
        conflictDetectedAt: new Date('2026-08-02T00:00:00.000Z'),
      }),
      evidence: evidence(),
      productId: 'product-1',
      source: 'reconciliation_exact',
      now: NOW,
    });

    expect(result.lifecycleState).toBe('identity_conflict');
    expect(result.conflictDetectedAt).toEqual(new Date('2026-08-02T00:00:00.000Z'));
  });
});

describe('safe slug resolution', () => {
  it('resolves one fresh active id and ignores historical unavailable tombstones', () => {
    expect(resolveSafeSlugProductIds([
      { slug: 'same-slug', productId: 'old-product', lifecycleState: 'unavailable_verified', lastVerifiedAt: NOW },
      { slug: 'same-slug', productId: 'new-product', lifecycleState: 'active_verified', lastVerifiedAt: NOW },
    ], NOW)).toEqual({ 'same-slug': 'new-product' });
  });

  it.each([
    ['unknown', null],
    ['identity_conflict', NOW],
    ['active_verified', new Date(NOW.getTime() - 36 * 60 * 60 * 1000 - 1)],
  ])('fails closed when the same slug also has %s evidence', (lifecycleState, lastVerifiedAt) => {
    expect(resolveSafeSlugProductIds([
      { slug: 'shared', productId: 'product-1', lifecycleState: 'active_verified', lastVerifiedAt: NOW },
      { slug: 'shared', productId: 'product-2', lifecycleState, lastVerifiedAt },
    ], NOW)).toEqual({});
  });

  it('uses the documented 36-hour freshness boundary', () => {
    expect(isFreshActiveProduct({
      lifecycleState: 'active_verified',
      lastVerifiedAt: new Date(NOW.getTime() - 36 * 60 * 60 * 1000),
    }, NOW)).toBe(true);
    expect(isFreshActiveProduct({ lifecycleState: 'unknown', lastVerifiedAt: NOW }, NOW)).toBe(false);
  });

  it('uses current catalog coverage without rewriting unchanged active snapshots', () => {
    const staleSnapshot = new Date(NOW.getTime() - 48 * 60 * 60 * 1000);

    expect(isFreshActiveProduct({
      lifecycleState: 'active_verified',
      lastVerifiedAt: staleSnapshot,
    }, NOW, NOW)).toBe(true);
    expect(resolveSafeSlugProductIds([{
      slug: 'covered-product',
      productId: 'product-1',
      lifecycleState: 'active_verified',
      lastVerifiedAt: staleSnapshot,
    }], NOW, NOW)).toEqual({ 'covered-product': 'product-1' });
  });
});

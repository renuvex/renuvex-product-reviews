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
    unavailableAt: null,
    conflictDetectedAt: null,
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

  it('turns an exact missing or deleted result into a tombstone', () => {
    const missing = decideProductLifecycleWrite({
      current: current(),
      evidence: null,
      productId: 'product-1',
      source: 'reconciliation_exact',
      now: NOW,
    });
    const deleted = decideProductLifecycleWrite({
      current: current(),
      evidence: evidence({ deleted: true }),
      productId: 'product-1',
      source: 'reconciliation_scan',
      now: NOW,
    });

    expect(missing).toMatchObject({ lifecycleState: 'unavailable_verified', unavailableAt: NOW });
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
});

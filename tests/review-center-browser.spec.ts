import { expect, test } from '@playwright/test';

const ITEM_A = '11111111-1111-4111-8111-111111111111';
const ITEM_B = '22222222-2222-4222-8222-222222222222';

test('exchanges the fragment token and reviews products independently in one batch session', async ({ page }) => {
  let phase: 'first' | 'second' = 'first';
  let exchangedToken: string | null = null;

  await page.route('**/api/public/review-center/session', async (route) => {
    const payload = route.request().postDataJSON() as { token?: string };
    exchangedToken = payload.token ?? null;
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: { status: 'active', completedCount: 0, totalCount: 2, remainingCount: 2 } }),
    });
  });
  await page.route('**/api/public/review-center/items?**', async (route) => {
    const items = phase === 'first'
      ? [
          { itemId: ITEM_A, productId: 'product-a', productName: 'Product A', variantName: null, status: 'sent', canSubmit: true },
          { itemId: ITEM_B, productId: 'product-b', productName: 'Product B', variantName: 'Blue', status: 'sent', canSubmit: true },
        ]
      : [{ itemId: ITEM_B, productId: 'product-b', productName: 'Product B', variantName: 'Blue', status: 'sent', canSubmit: true }];
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          items,
          totalCount: 2,
          remainingCount: phase === 'first' ? 2 : 1,
          nextCursor: null,
        },
      }),
    });
  });
  await page.route(`**/api/public/review-center/items/${ITEM_A}/reviews`, async (route) => {
    phase = 'second';
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ data: { state: 'created', reviewId: 'review-a', batchCompleted: false } }),
    });
  });
  await page.route(`**/api/public/review-center/items/${ITEM_B}/skip`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: { state: 'skipped', batchCompleted: true } }),
    });
  });

  await page.goto('/request#token=v1.test-token');

  await expect(page).toHaveURL(/\/request$/);
  await expect.poll(() => exchangedToken).toBe('v1.test-token');
  await expect(page.getByRole('heading', { name: 'Product A' })).toBeVisible();

  await page.getByLabel('Adınız').fill('Ada');
  await page.getByLabel('Yorumunuz').fill('Ürün beklentimi karşıladı.');
  await page.getByRole('button', { name: 'Gönder ve devam et' }).click();

  await expect(page.getByRole('heading', { name: 'Product B' })).toBeVisible();
  await expect(page.getByText('Blue')).toBeVisible();
  await page.getByRole('button', { name: 'Bu ürünü değerlendirmek istemiyorum' }).click();

  await expect(page.getByRole('heading', { name: 'Değerlendirmeleriniz alındı' })).toBeVisible();
});

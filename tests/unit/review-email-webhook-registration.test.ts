import { describe, expect, it, vi } from 'vitest';
import { registerOrderWebhooks, reviewRequestWebhookScopeSet } from '@/lib/review-email/ikas-orders';

describe('review email ikas webhook registration contract', () => {
  it('submits only the scopes currently accepted by ikas saveWebhooks', async () => {
    const saveOrderWebhooks = vi.fn().mockResolvedValue({
      isSuccess: true,
      data: { saveWebhooks: { id: 'webhook-1' } },
    });

    await registerOrderWebhooks({ mutations: { saveOrderWebhooks } } as never, 'https://app.renuvex.app/api/webhooks/ikas/orders');

    expect(saveOrderWebhooks).toHaveBeenCalledWith({
      input: {
        endpoint: 'https://app.renuvex.app/api/webhooks/ikas/orders',
        scopes: ['store/order/created', 'store/order/updated'],
      },
    });
    expect(reviewRequestWebhookScopeSet()).not.toContain('store/app/deleted');
  });
});

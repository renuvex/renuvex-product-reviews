import * as Sentry from '@sentry/nextjs';

const SERVER_FAILURES = {
  admin_auth_configuration_failed: {
    source: 'admin-auth',
    route: 'shared',
    operation: 'configuration',
  },
  admin_auth_lookup_failed: {
    source: 'admin-auth',
    route: 'shared',
    operation: 'principal_lookup',
  },
  admin_reviews_list_failed: {
    source: 'admin-api',
    route: 'reviews',
    operation: 'list',
  },
  admin_review_summary_failed: {
    source: 'admin-api',
    route: 'reviews-summary',
    operation: 'aggregate',
  },
  admin_reviews_delete_failed: {
    source: 'admin-api',
    route: 'reviews',
    operation: 'delete',
  },
  admin_reviews_update_failed: {
    source: 'admin-api',
    route: 'reviews',
    operation: 'update',
  },
  admin_reviews_media_publish_failed: {
    source: 'admin-api',
    route: 'reviews',
    operation: 'media_publish',
  },
  admin_reviews_media_compensation_failed: {
    source: 'admin-api',
    route: 'reviews',
    operation: 'media_compensation',
  },
  admin_settings_read_failed: {
    source: 'admin-api',
    route: 'settings',
    operation: 'read',
  },
  admin_settings_write_failed: {
    source: 'admin-api',
    route: 'settings',
    operation: 'write',
  },
  admin_image_preview_failed: {
    source: 'admin-api',
    route: 'reviews-image-preview',
    operation: 'sign',
  },
  admin_video_preview_failed: {
    source: 'admin-api',
    route: 'reviews-video-playback',
    operation: 'sign',
  },
  admin_video_thumbnail_failed: {
    source: 'admin-api',
    route: 'reviews-video-thumbnail',
    operation: 'sign',
  },
  review_email_settings_read_failed: {
    source: 'admin-api',
    route: 'review-email-settings',
    operation: 'read',
  },
  merchant_fetch_failed: {
    source: 'admin-api',
    route: 'get-merchant',
    operation: 'provider_read',
  },
  product_sync_failed: {
    source: 'admin-api',
    route: 'sync-products',
    operation: 'provider_sync',
  },
  product_reconciliation_failed: {
    source: 'internal-api',
    route: 'product-reconciliation',
    operation: 'process',
  },
  storefront_script_sync_failed: {
    source: 'admin-api',
    route: 'inject-scripts',
    operation: 'provider_sync',
  },
  storefront_theme_sync_failed: {
    source: 'admin-api',
    route: 'storefront-theme',
    operation: 'provider_sync',
  },
  public_reviews_fetch_failed: {
    source: 'public-api',
    route: 'reviews',
    operation: 'list',
  },
  public_reviews_submit_failed: {
    source: 'public-api',
    route: 'reviews',
    operation: 'submit',
  },
  public_ratings_by_slug_failed: {
    source: 'public-api',
    route: 'ratings-by-slug',
    operation: 'resolve',
  },
} as const;

export type ServerFailureCode = keyof typeof SERVER_FAILURES;

export function reportServerFailure(code: ServerFailureCode): void {
  const tags = SERVER_FAILURES[code];
  try {
    console.error('[server-failure]', code);
  } catch {
    // Observability must not alter the request result.
  }
  try {
    Sentry.captureException(new Error(code), { tags });
  } catch {
    // Observability must not alter the request result.
  }
}

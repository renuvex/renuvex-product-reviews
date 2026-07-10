// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { isSensitiveReviewRequestPath } from "@/lib/review-email/sentry-privacy";

const disableTelemetry =
  typeof window !== "undefined" && isSensitiveReviewRequestPath(window.location.pathname);

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Review links carry a one-time token in the URL fragment before hydration.
  // Disable browser telemetry on this isolated page so Replay initialUrl and
  // error/navigation context cannot capture the fragment.
  enabled: !disableTelemetry,

  integrations: disableTelemetry
    ? []
    : [
        Sentry.replayIntegration({
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],

  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,

  enableLogs: true,

  replaysSessionSampleRate: disableTelemetry ? 0 : process.env.NODE_ENV === "production" ? 0.05 : 0.1,
  replaysOnErrorSampleRate: disableTelemetry ? 0 : 1.0,

  sendDefaultPii: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

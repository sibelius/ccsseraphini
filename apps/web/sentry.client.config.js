// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { Integrations } from '@sentry/tracing';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  environment: process.env.NODE_ENV,
  dsn: SENTRY_DSN,
  tracesSampleRate: 1,
  integrations: [new Integrations.BrowserTracing()],
});

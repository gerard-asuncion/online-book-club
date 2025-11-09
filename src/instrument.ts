import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_SDK_KEY,
  sendDefaultPii: true
});

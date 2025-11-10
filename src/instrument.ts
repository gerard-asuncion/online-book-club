import * as Sentry from "@sentry/react";
import { LoginError } from "./classes/LoginError";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_SDK_KEY,
  sendDefaultPii: true,
  beforeSend(event, hint) {
    const error = hint.originalException;
    if (error instanceof LoginError) {
      return null;
    }
    return event;
  },
});

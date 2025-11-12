import * as Sentry from '@sentry/react';
import AppLayout from "../components/ui/AppLayout";
import Settings from "../components/form/Settings";

const SettingsPage = () => {
  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <AppLayout>
            <Settings />
        </AppLayout>
    </Sentry.ErrorBoundary>
  )
}

export default SettingsPage

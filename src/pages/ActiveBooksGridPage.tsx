import * as Sentry from '@sentry/react';
import AppLayout from "../components/ui/AppLayout";
import ActiveBooksGrid from "../components/form/ActiveBooksGrid";

const ActiveBooksGridPage = () => {
  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <AppLayout>
            <ActiveBooksGrid />
        </AppLayout>
    </Sentry.ErrorBoundary>
  )
}

export default ActiveBooksGridPage;

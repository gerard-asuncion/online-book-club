import * as Sentry from '@sentry/react';
import AppLayout from "../components/ui/AppLayout";
import BooksGrid from "../components/form/BooksGrid";

const BooksGridPage = () => {
  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <AppLayout>
            <BooksGrid />
        </AppLayout>
    </Sentry.ErrorBoundary>
  )
}

export default BooksGridPage;

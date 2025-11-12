import * as Sentry from '@sentry/react';
import AppLayout from "../components/ui/AppLayout";
import ChatHistorial from "../components/form/ChatHistorial";

const ChatHistorialPage = () => {
  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <AppLayout>
            <ChatHistorial />
        </AppLayout>
    </Sentry.ErrorBoundary>
  )
}

export default ChatHistorialPage;

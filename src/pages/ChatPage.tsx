import * as Sentry from '@sentry/react';
import AppLayout from "../components/ui/AppLayout";
import Chat from "../components/form/Chat";

const ChatPage = () => {
  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <AppLayout>
            <Chat />
        </AppLayout>
    </Sentry.ErrorBoundary>
  )
}

export default ChatPage

import * as Sentry from '@sentry/react';
import LoginForm from '../components/form/LoginForm';

const LoginPage = () => {

    return (
        <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
            <LoginForm />
        </Sentry.ErrorBoundary>
    );
};

export default LoginPage;
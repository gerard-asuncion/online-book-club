import * as Sentry from '@sentry/react';
import RegisterForm from '../components/form/RegisterForm';

const RegisterPage = () => {
  
  return (
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
      <RegisterForm />            
    </Sentry.ErrorBoundary>
  )
}

export default RegisterPage;

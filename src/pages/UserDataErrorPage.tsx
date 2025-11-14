import useAuth from '../hooks/useAuth'; 
import usePageNavigation from '../hooks/usePageNavigation';
import ScreenFrame from '../components/ui/ScreenFrame';
import Header from '../components/ui/Header';
import { defaultButtonLayout } from '../utils/classNameUtils';

const UserDataErrorPage = () => {

  const { logout } = useAuth();
  const { navigateToLogin } = usePageNavigation();

  const handleConfirmation = (): void => {
    logout();
    navigateToLogin();
  };

  return (
    <ScreenFrame page="full">
      <Header />
      <ScreenFrame page="center">
        <div className="flex flex-col items-center justify-center p-8 text-white border-2 border-main-color rounded-lg shadow-md max-w-sm mx-auto space-y-6">
            <h2>Fatal error, your profile data seems to be missing. Please contact us: onlinebookclub.app@gmail.com</h2>
            <button 
              className={`${defaultButtonLayout()}`}
              onClick={handleConfirmation}>
                Ok
            </button>
        </div>
      </ScreenFrame>
    </ScreenFrame>
  );
};

export default UserDataErrorPage;
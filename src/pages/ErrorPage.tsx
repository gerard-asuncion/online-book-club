import { useNavigate } from 'react-router-dom'; 
import ScreenFrame from '../components/ui/ScreenFrame';
import Header from '../components/ui/Header';
import { defaultButtonLayout } from '../utils/classNameUtils';

const ErrorPage = () => {
  
  const navigate = useNavigate(); 

  const handleReturn = (): void => {
    navigate('/', { replace: true }); 
  };

  return (
    <ScreenFrame page="full">
      <Header />
      <ScreenFrame page="center">
        <div className="flex flex-col items-center justify-center p-8 text-white border-2 border-main-color rounded-lg shadow-md max-w-sm mx-auto space-y-6">
            <h2>There has been an error, please go back.</h2>
            <button 
              className={`${defaultButtonLayout()}`}
              onClick={handleReturn}>
                Return
            </button>
        </div>
      </ScreenFrame>
    </ScreenFrame>
  );
};

export default ErrorPage;
import { useNavigate } from 'react-router-dom'; 
import Screen from '../components/ui/Screen';
import Button from '../components/ui/Button';

const ErrorPage = () => {
  const navigate = useNavigate(); 

  const handleReturn = () => {
    navigate('/', { replace: true }); 
  };

  return (
    <Screen page="center">
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md max-w-sm mx-auto space-y-6">
            <h2>There has been an error, please go back.</h2>
            <Button onClick={handleReturn}>
                Return
            </Button>
        </div>

    </Screen>
  );
};

export default ErrorPage;
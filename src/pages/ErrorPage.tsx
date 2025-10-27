import { useNavigate } from 'react-router-dom'; 

const ErrorPage = () => {
  const navigate = useNavigate(); 

  const handleReturn = () => {
    navigate('/', { replace: true }); 
  };

  return (
    <div>
      <h2>There has been an error, please go back.</h2>
      <button className='bg-gray-500' onClick={handleReturn}>Return</button>
    </div>
  );
};

export default ErrorPage;
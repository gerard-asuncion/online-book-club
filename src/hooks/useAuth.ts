import { useNavigate } from 'react-router-dom';
import { signInWithPopup, signOut} from 'firebase/auth';
import { auth, provider } from '../firebase-config';
import Cookies from 'universal-cookie';
import { useAppDispatch } from '../app/hooks';
import { setIsAuth, clearAuth } from '../features/auth/authSlice';

const cookies = new Cookies();

const useAuth = () => {
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      dispatch(setIsAuth());
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    } 
  };

  const userSignOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    dispatch(clearAuth());
    navigate("/welcome", { replace: true });
  }

  return {
    signInWithGoogle,
    userSignOut
  };

};

export default useAuth;
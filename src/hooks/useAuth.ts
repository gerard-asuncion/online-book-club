import { useNavigate } from 'react-router-dom';
import { signInWithPopup, signOut} from 'firebase/auth';
import { auth, provider } from '../firebase-config';
import Cookies from 'universal-cookie';
import { useAppDispatch } from '../app/hooks';
import { setIsAuth, clearAuth } from '../features/auth/authSlice';
import { clearBookRoom } from '../features/bookRoom/bookRoomSlice';
import { setIsWelcome } from '../features/mainContentRoute/mainContentRouteSlice';

const cookies = new Cookies();

const useAuth = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const register = async () => {
    console.log("register");
  }

  const loginWithEmailAndPassword = async () => {
    console.log("Login With Email...");
  }

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      dispatch(setIsAuth());
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    } 
  };

  const logout = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    dispatch(clearAuth());
    dispatch(clearBookRoom());
    dispatch(setIsWelcome());
  }

  return {
    register,
    loginWithEmailAndPassword,
    loginWithGoogle,
    logout
  };

};

export default useAuth;
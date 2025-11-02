import { useNavigate } from 'react-router-dom';
import { signInWithPopup, signOut} from 'firebase/auth';
import { auth, provider } from '../firebase-config';
import Cookies from 'universal-cookie';
import { useAppDispatch } from '../app/hooks';
import { setIsAuth, clearAuth } from '../features/auth/authSlice';
import { clearBookRoom } from '../features/bookRoom/bookRoomSlice';
import { setIsWelcome } from '../features/mainContentRoute/mainContentRouteSlice';
import { setOpenSidebar } from '../features/responsive/responsiveSlice';

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

      const cookieOptions = {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      };
      cookies.set("auth-token", result.user.refreshToken, cookieOptions);

      dispatch(setIsAuth());
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    } 
  };

  const logout = async () => {
    await signOut(auth);
    cookies.remove("auth-token", { path: "/" });
    dispatch(clearAuth());
    dispatch(clearBookRoom());
    dispatch(setIsWelcome());
    dispatch(setOpenSidebar());
  }

  return {
    register,
    loginWithEmailAndPassword,
    loginWithGoogle,
    logout
  };

};

export default useAuth;
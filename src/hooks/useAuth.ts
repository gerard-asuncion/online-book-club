import { useNavigate } from 'react-router-dom';
import { signInWithPopup, signOut} from 'firebase/auth';
import { auth, provider } from '../firebase-config';
import Cookies from 'universal-cookie';
import { useAppDispatch } from '../app/hooks';
import { setIsAuth, clearAuth } from '../features/auth/authSlice';
import { clearCurrentBook } from '../features/currentBook/currentBookSlice';
import { setIsSearch } from '../features/mainContentRoute/mainContentRouteSlice';
import { setOpenSidebar } from '../features/responsive/responsiveSlice';
import type { CookieOptions } from '../types/types';

const cookies: Cookies = new Cookies();

const useAuth = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const register = async (): Promise<void> => {
    console.log("register");
  }

  const loginWithEmailAndPassword = async (): Promise<void> => {
    console.log("Login With Email...");
  }

  const loginWithGoogle = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, provider);

      const cookieOptions: CookieOptions = {
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

  const logout = async (): Promise<void> => {
    await signOut(auth);
    cookies.remove("auth-token", { path: "/" });
    dispatch(clearCurrentBook());
    dispatch(clearAuth());
    dispatch(setIsSearch());
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
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, signOut} from 'firebase/auth';
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

  const navigateToRegister = (): void => {
    navigate("/register", { replace: true });
  }

  const navigateToLogin = (): void => {
    navigate("/login", { replace: true });
  }

  const register = async (): Promise<void> => {
    const userEmail = "user@user.com";
    const userPassword = "password1234";
    try {
      const result = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
      await sendEmailVerification(result.user);
      console.log("Verification email sent!");
     }catch (error) {
      console.error("Error creating user or sending verification email:", error, 4000);
     }
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
      console.error(error, 4000);
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
    navigateToRegister,
    navigateToLogin,
    register,
    loginWithEmailAndPassword,
    loginWithGoogle,
    logout
  };

};

export default useAuth;
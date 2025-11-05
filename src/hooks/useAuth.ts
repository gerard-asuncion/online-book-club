import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, signOut} from 'firebase/auth';
import { auth, provider } from '../firebase-config';
import Cookies from 'universal-cookie';
import { useAppDispatch } from '../app/hooks';
import { setIsAuth, clearAuth } from '../features/auth/authSlice';
import { clearCurrentBook } from '../features/currentBook/currentBookSlice';
import { setIsSearch } from '../features/mainContentRoute/mainContentRouteSlice';
import { setOpenSidebar } from '../features/responsive/responsiveSlice';
import { ValidationError } from "../classes/ValidationError"
import { validationErrorMessage } from '../utils/utils';
import type { CookieOptions, ErrorType } from '../types/types';

const cookies: Cookies = new Cookies();

const useAuth = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
    
  const [newUsername, setNewUsername] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [newUserPassword, setNewUserPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>("");

  const [registrationErrors, setRegistrationErrors] = useState<ErrorType[]>([]);

  const navigateToRegister = (): void => {
    navigate("/register", { replace: true });
  }

  const navigateToLogin = (): void => {
    navigate("/login", { replace: true });
  }

  const submitRegisterForm = (e: React.FormEvent): void => {

    e.preventDefault();
    
    const validationErrors: ErrorType[] = []

    try {

      // if(newUsername === registered username)...

      if(newUsername === "") validationErrors.push({
        input: "Username",
        message: "Enter new username."
      });
      if(!newUserEmail.includes("@") || !newUserEmail.includes(".")) validationErrors.push({
        input: "Email",
        message: "Invalid email address."
      });
      if(newUserPassword.length < 8 || newPasswordConfirmation.length < 8) validationErrors.push({
        input: "Password",
        message: "Password must be at least 8 characters long."
      });
      if(newUserPassword.length < 8 || newPasswordConfirmation.length < 8) validationErrors.push({
        input: "Password",
        message: "Confirmation password doesn't match."
      });

      if(validationErrors.length > 0) { 
          const message = validationErrorMessage(validationErrors);
          throw new ValidationError(message, validationErrors); 
      };
      
      if(registrationErrors.length > 0) setRegistrationErrors([]);

      register();

    }catch(error){

      error instanceof ValidationError
      ? setRegistrationErrors([{message: error.message}, ...validationErrors])
      : setRegistrationErrors([{message: `Unexpected: ${error}`}])

      console.log(validationErrors[0], validationErrors[1], validationErrors[2], validationErrors[3]);

    }finally{

      console.log(newUsername, newUserEmail, newUserPassword, newPasswordConfirmation);
      
      setNewUsername("")
      setNewUserEmail("");
      setNewUserPassword("");
      setNewPasswordConfirmation("");

      validationErrors.splice(0, validationErrors.length)

    }
  }

  const register = async (): Promise<void> => {

    try {
      const result = await createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword);
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
    submitRegisterForm,
    setNewUsername,
    setNewUserEmail,
    setNewUserPassword,
    setNewPasswordConfirmation,
    navigateToRegister,
    navigateToLogin,
    loginWithEmailAndPassword,
    loginWithGoogle,
    logout
  };

};

export default useAuth;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signInWithPopup, 
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, provider } from '../firebase-config';
import Cookies from 'universal-cookie';
import { useAppDispatch } from '../app/hooks';
import { setIsAuth, clearAuth } from '../features/auth/authSlice';
import { setUserProfileUid, clearUserProfile } from '../features/userProfile/userProfileSlice';
import { clearCurrentBook } from '../features/currentBook/currentBookSlice';
import { setIsSearch } from '../features/mainContentRoute/mainContentRouteSlice';
import { setOpenSidebar } from '../features/responsive/responsiveSlice';
import { ValidationError } from "../classes/ValidationError"
import { RegisterUser } from '../classes/RegisterUser';
import type { CookieOptions, ErrorType } from '../types/types';

const USERS_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;

const cookies: Cookies = new Cookies();

const useAuth = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [registrationErrors, setRegistrationErrors] = useState<ErrorType[]>([]);
    
  const [newUsername, setNewUsername] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [newUserPassword, setNewUserPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>("");

  const [loginError, setLoginError] = useState<string | null>(null);

  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const navigateToRegister = (): void => {
    navigate("/register", { replace: true });
  }

  const navigateToLogin = (): void => {
    navigate("/login", { replace: true });
  }

  const isUsernameFormatValid = (username: string): boolean => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(username);
  };

  const submitRegisterForm = (e: React.FormEvent): void => {

    e.preventDefault();
    
    const validationErrors: ErrorType[] = []

    try {

      // if(newUsername === registered username)...

      if(newUsername.trim() === "") validationErrors.push({
        input: "Username",
        message: "Username can't be empty."
      });
      if(!isUsernameFormatValid(newUsername)) validationErrors.push({
        input: "Username",
        message: "Username can't contain symbols or spaces."
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
          throw new ValidationError(validationErrors); 
      };
      
      if(registrationErrors.length > 0) setRegistrationErrors([]);

      const newUser = new RegisterUser(newUsername, newUserEmail, newUserPassword);

      registerNewUser(newUser);

    }catch(error){

      error instanceof ValidationError
      ? setRegistrationErrors([{message: error.message}, ...validationErrors])
      : setRegistrationErrors([{message: `Unexpected: ${error}`}])

    }finally{

      console.log(newUsername);
      console.log(newUserEmail);
      console.log(newUserPassword);
      console.log(newPasswordConfirmation);
      
      setNewUsername("")
      setNewUserEmail("");
      setNewUserPassword("");
      setNewPasswordConfirmation("");

      validationErrors.splice(0, validationErrors.length)

    }
  }

  const registerNewUser = async (newUser: RegisterUser): Promise<void> => {

    try {
      const result = await createUserWithEmailAndPassword(auth, newUser.userEmail, newUser.userPassword);

      await updateProfile(result.user, {
        displayName: newUser.userUsername
      });
  
      console.log("Profile updated with displayName: ", result.user.displayName);

      const userDocRef = doc(db, USERS_COLLECTION, result.user.uid);

      const dataForFirestore = newUser.toFirestoreObject();
      dataForFirestore.uid = result.user.uid;

      await setDoc(userDocRef, dataForFirestore);
    
      console.log("User document created in Firestore!");

      await sendEmailVerification(result.user);
      console.log("Verification email sent!");

     }catch (error) {

      console.error("Error creating user or sending verification email:", error, 4000);

     }finally{

     }
  }

  const loginWithEmailAndPassword = async (e: React.FormEvent): Promise<void> => {

    e.preventDefault();

    setLoginError(null); 

    try {
      const result = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

      const cookieOptions: CookieOptions = {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      };

      cookies.set("auth-token", result.user.refreshToken, cookieOptions);

      dispatch(setIsAuth());

      dispatch(setUserProfileUid({ userProfileUid: result.user.uid }));

      navigate("/", { replace: true });

    } catch (error) {
 
      if (error instanceof Error && 'code' in error) {
        const errorCode = (error as { code: string }).code;
        console.error("Firebase Login Error:", errorCode);

        switch (errorCode) {
            case "auth/invalid-credential":
            case "auth/invalid-email":
            case "auth/user-not-found":
            case "auth/wrong-password":
                setLoginError("Incorrect email or password");
                break;

            default:
                setLoginError("Unexpected error, please try again.");
        }
      } else {
        console.error("Unexpected Error:", error);
        setLoginError("Unexpected error, please try again.");
      }
    }
  };

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
    dispatch(clearUserProfile());
    dispatch(setIsSearch());
    dispatch(setOpenSidebar());
  }

  return {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    loginError,
    registrationErrors,
    newUsername,
    newUserEmail,
    newUserPassword,
    newPasswordConfirmation,
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
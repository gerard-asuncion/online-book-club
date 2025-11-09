import * as Sentry from "@sentry/react";
import { useState } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut,
  type UserCredential
} from 'firebase/auth';
import { 
  doc,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  writeBatch,
  type DocumentData,
  type WriteBatch
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import Cookies from 'universal-cookie';
import { useAppDispatch } from '../app/hooks';
import { setIsAuth, clearAuth } from '../features/auth/authSlice';
import { clearUserProfile } from '../features/userProfile/userProfileSlice';
import { clearCurrentBook } from '../features/currentBook/currentBookSlice';
import { setIsSearch } from '../features/mainContentRoute/mainContentRouteSlice';
import { setOpenSidebar } from '../features/responsive/responsiveSlice';
import { ValidationError } from "../classes/Errors/ValidationError";
import { LoginError } from '../classes/Errors/LoginError';
import { 
  RegisterNewUserError, 
  LoginWithEmailAndPasswordError,
  UserCredentialError
} from '../classes/Errors/CustomErrors';
import { RegisterUser } from '../classes/RegisterUser';
import type { CookieOptions, ErrorType, UserProfileType } from '../types/types';

const USERS_COLLECTION: string = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;
const USERNAMES_COLLECTION: string = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERNAMES;

const cookies: Cookies = new Cookies();

const useAuth = () => {

  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  
  const [loginError, setLoginError] = useState<LoginError | null>(null);
  const [registrationErrors, setRegistrationErrors] = useState<ErrorType[]>([]);
    
  const [newUsername, setNewUsername] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [newUserPassword, setNewUserPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>("");

  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const [checkboxState, setCheckboxState] = useState<boolean>(false);

  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);

  const navigateToRegister = (): void => {
    navigate("/register", { replace: true });
  }

  const navigateToLogin = (): void => {
    navigate("/login", { replace: true });
  }

  const isUsernameFormatValid = (username: string): boolean => {
    const regex: RegExp = /^[a-zA-Z0-9]+$/;
    return regex.test(username);
  };

  const isEmailFormatValid = (email: string): boolean => {
    const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const checkAvailableUsername = async (newUsername: string): Promise<boolean> => {

    const newUsernameLowerCase: string = newUsername.toLowerCase();    
    const usernameDocRef: DocumentReference<DocumentData, DocumentData> = 
      doc(db, USERNAMES_COLLECTION, newUsernameLowerCase);

    try {
      const docSnap: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(usernameDocRef);
      return !docSnap.exists();

    } catch (error) {
      Sentry.captureException(error);
      if (import.meta.env.DEV) console.error("Error checking username availability:", error);
      return false;
    }
  }

  const submitRegisterForm = async (e: React.FormEvent): Promise<void> => {

    e.preventDefault();
    
    const validationErrors: ErrorType[] = []
    setRegistrationErrors([]);

    try {

      if(newUsername.trim() === "") validationErrors.push({
        input: "Username",
        message: "Username can't be empty."
      });
      if(!isUsernameFormatValid(newUsername)) validationErrors.push({
        input: "Username",
        message: "Username can't contain symbols or spaces."
      });
      if(!isEmailFormatValid(newUserEmail)) validationErrors.push({
        input: "Email",
        message: "Invalid email address."
      });
      if(newUserPassword.length < 8 || newPasswordConfirmation.length < 8) validationErrors.push({
        input: "Password",
        message: "Password must be at least 8 characters long."
      });
      if(newPasswordConfirmation !== newUserPassword) validationErrors.push({
        input: "Password",
        message: "Confirmation password doesn't match."
      });

      const isAvailable: boolean = await checkAvailableUsername(newUsername);

      if(!isAvailable) validationErrors.push({
        input: "Username",
        message: "Username not available."
      });

      if(validationErrors.length > 0) { 
          throw new ValidationError(validationErrors); 
      };
      
      if(registrationErrors.length > 0) setRegistrationErrors([]);

      setLoadingLogin(true);

      const newUser: RegisterUser = new RegisterUser(newUsername, newUserEmail, newUserPassword, checkboxState);

      await registerNewUser(newUser);   
      await loginWithEmailAndPassword(newUser.userEmail, newUser.userPassword);

    }catch(error){
      Sentry.captureException(error);
      if (import.meta.env.DEV) console.error("Error submitting register form:", error);
      if (error instanceof ValidationError) {
        setRegistrationErrors([{message: error.message}, ...validationErrors]);
      } else if (error instanceof LoginError) {
        setRegistrationErrors([{message: error.userMessage}]);
      } else if (error instanceof Error && 'code' in error) {
        setRegistrationErrors([{message: (error as {code: string}).code}]);
      } else {
        setRegistrationErrors([{message: `Unexpected: ${error}`}]);
      }
    }
  }

  const registerNewUser = async (newUser: RegisterUser): Promise<void> => {

    try {
      if(!newUser) throw new RegisterNewUserError("Register form didn't provide any object called newUser.");

      const result: UserCredential = await createUserWithEmailAndPassword(auth, newUser.userEmail, newUser.userPassword);

      if(!result) throw new UserCredentialError("Failed register")
      
      await updateProfile(result.user, {
        displayName: newUser.userUsername
      });

      const batch: WriteBatch = writeBatch(db);
      const userDocRef: DocumentReference = doc(db, USERS_COLLECTION, result.user.uid);
      const dataForFirestore: UserProfileType = newUser.toFirestoreObject();
      const resultUserUid: string = result.user.uid;
      dataForFirestore.uid = resultUserUid;
      batch.set(userDocRef, dataForFirestore);

      const usernameDocRef: DocumentReference<DocumentData, DocumentData> = 
        doc(db, USERNAMES_COLLECTION, dataForFirestore.displayName_lowercase);      
      batch.set(usernameDocRef, {});
      await batch.commit();

      await sendEmailVerification(result.user);
      
    } catch(error){
      if (import.meta.env.DEV) console.error("Error registering new user:", error);
      Sentry.captureException(error);   
    }
  
  }

  const premiumRegister = (checked: boolean): void => {
    setCheckboxState(checked);
  }

  const submitLoginForm = (e: React.FormEvent): void => {
    e.preventDefault();
    loginWithEmailAndPassword(loginEmail, loginPassword);  
  };

  const loginWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
    setLoadingLogin(true);
    setLoginError(null);

    try {
      if(!email) throw new LoginWithEmailAndPasswordError("No user email, unable to login.");
      if(!password) throw new LoginWithEmailAndPasswordError("No user password, unable to login.");
  
      const result: UserCredential = await signInWithEmailAndPassword(auth, email, password);

      dispatch(clearCurrentBook());
      dispatch(clearUserProfile());

        const cookieOptions: CookieOptions = {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        };
      cookies.set("auth-token", result.user.refreshToken, cookieOptions);

      dispatch(setIsAuth());
      dispatch(setIsSearch());
      dispatch(setOpenSidebar());

      navigate("/", { replace: true });

    } catch (error) {
      Sentry.captureException(error);
      if (import.meta.env.DEV) console.error("Firebase Login Error:", error);
      const loginError = LoginError.fromFirebaseError(error);
      setLoginError(loginError);
      throw loginError;
      
    } finally {
      setLoadingLogin(false);
    }
  }

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
    loadingLogin,
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
    submitLoginForm,
    checkboxState,
    premiumRegister,
    logout
  };

};

export default useAuth;
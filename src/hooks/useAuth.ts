import * as Sentry from "@sentry/react";
import { useState } from 'react';
import usePageNavigation from "./usePageNavigation";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut,
  deleteUser,
  type User,
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
import { activateDisplayInfo } from "../features/displayInfo/displayInfoSlice";
import { setIsAuth, clearAuth } from '../features/auth/authSlice';
import { clearUserProfile } from '../features/userProfile/userProfileSlice';
import { clearCurrentBook } from '../features/currentBook/currentBookSlice';
import { setOpenSidebar } from '../features/responsive/responsiveSlice';
import { LoginError } from '../classes/LoginError';
import { RegisterNewUserError, UserCredentialError } from '../classes/CustomErrors';
import { RegisterUser } from '../classes/RegisterUser';
import type { CookieOptions, UserProfileType, ErrorType } from '../types/types';
import useUserData from "./useUserData";

const USERS_COLLECTION: string = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;
const USERNAMES_COLLECTION: string = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERNAMES;

const cookies: Cookies = new Cookies();

const useAuth = () => {

  const dispatch = useAppDispatch();
  
  const [loginError, setLoginError] = useState<LoginError | null>(null);
  const [userLoginErrors, setUserLoginErrors] = useState<ErrorType[]>([]);

  const [registrationWarnings, setRegistrationWarnings] = useState<ErrorType[]>([{
        id: "username-condition",
        message: "Username can't contain symbols or spaces, except the underscore: _"
      },{
        id: "password-condition",
        message: "Password must be at least 8 characters long."
      }]);
    
  const [newUsername, setNewUsername] = useState<string>("");
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [newUserPassword, setNewUserPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>("");

  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  const [checkboxState, setCheckboxState] = useState<boolean>(true);

  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);

  const { markDeletedProfile } = useUserData();
  const { navigateToLogin, navigateToRegister, navigateToEmptyBar } = usePageNavigation();


  const isUsernameFormatValid = (username: string): boolean => {
    const regex: RegExp = /^\w+$/;
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

    setRegistrationWarnings(prevErrors => {
      let actualErrors: ErrorType[] = prevErrors;
      if (isUsernameFormatValid(newUsername)) {
        actualErrors = actualErrors.filter(err => err.id !== "username-condition");
      };
      if (newUserPassword.length >= 8 || newPasswordConfirmation.length >= 8) {
        actualErrors = actualErrors.filter(err => err.id !== "password-condition");
      };
      if(newUsername.trim() === "") actualErrors.push({
        id: "username-error",
        message: "Username can't be empty."
      });
      if(!isEmailFormatValid(newUserEmail)) actualErrors.push({
        id: "email-error",
        message: "Invalid email address."
      });
      if(newPasswordConfirmation !== newUserPassword) actualErrors.push({
        id: "password-error",
        message: "Confirmation password doesn't match."
      });
      return actualErrors;
    });

    try {
      const isAvailable: boolean = await checkAvailableUsername(newUsername);

      if(!isAvailable){
        setRegistrationWarnings(prevErrors => {
          let actualErrors: ErrorType[] = prevErrors;
          actualErrors.push({
            id: "unavailable-username",
            message: "Username not available."
          });
          return actualErrors;
        });
      }

      if(registrationWarnings.length > 0) return;

      setLoadingLogin(true);

      const newUser: RegisterUser = new RegisterUser(newUsername, newUserEmail, newUserPassword, checkboxState);

      await registerNewUser(newUser);   
      await loginWithEmailAndPassword(newUser.userEmail, newUser.userPassword);

    }catch(error){
      Sentry.captureException(error);
      if (import.meta.env.DEV){
        console.error("Error submitting register form:", error);
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
    setUserLoginErrors([]);
    setLoginError(null);
    const userErrors: ErrorType[] = [];
    try {
      if(!email || email.trim() === "") userErrors.push({
        id: "email-error",
        message: "No user email, unable to login."
      });
      if(!password || password.trim() === "") userErrors.push({
        id: "password-error",
        message: "No user password, unable to login."
      });

      setUserLoginErrors(userErrors);
  
      const result: UserCredential = await signInWithEmailAndPassword(auth, email, password);

      dispatch(clearCurrentBook());
      dispatch(clearUserProfile());

        const cookieOptions: CookieOptions = {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        };
      cookies.set("auth-token", result.user.refreshToken, cookieOptions);

      dispatch(setIsAuth());
      dispatch(setOpenSidebar());

      navigateToEmptyBar();

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
    dispatch(setOpenSidebar());
    dispatch(activateDisplayInfo());
  }

  const deleteUserFromFirebase = async (): Promise<void> => {
    try {
      const user: User | null = auth.currentUser;
      if (user) {
        const confirmDelete: boolean = globalThis.confirm("Are you sure you want to delete your profile? This action can't be undone.");
        if(confirmDelete) {
          const updateDeleted: boolean = await markDeletedProfile();
          if(updateDeleted){
            await deleteUser(user);
            logout();
          }
        }
      } 
    } catch (error) {
      Sentry.captureException(error);
      if (import.meta.env.DEV) console.error("Error deleting user:", error);
    }
  };

  return {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    loadingLogin,
    loginError,
    userLoginErrors,
    registrationWarnings,
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
    logout,
    deleteUserFromFirebase
  };

};

export default useAuth;
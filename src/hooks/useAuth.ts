import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut
} from 'firebase/auth';
import { 
  doc,
  DocumentReference,
  getDoc,
  writeBatch
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import Cookies from 'universal-cookie';
import { useAppDispatch } from '../app/hooks';
import { setIsAuth, clearAuth } from '../features/auth/authSlice';
import { setUserProfileUid, setUserProfileUsername, clearUserProfile } from '../features/userProfile/userProfileSlice';
import { clearCurrentBook } from '../features/currentBook/currentBookSlice';
import { setIsSearch } from '../features/mainContentRoute/mainContentRouteSlice';
import { setOpenSidebar } from '../features/responsive/responsiveSlice';
import { ValidationError } from "../classes/ValidationError"
import { RegisterUser } from '../classes/RegisterUser';
import type { CookieOptions, ErrorType, UserProfileType } from '../types/types';

const USERS_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;
const USERNAMES_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERNAMES;

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

  const [checkboxState, setCheckboxState] = useState<boolean>(false);

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

  const isEmailFormatValid = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const checkAvailableUsername = async (newUsername: string): Promise<boolean> => {

    const newUsernameLowerCase = newUsername.toLowerCase();    
    const usernameDocRef = doc(db, USERNAMES_COLLECTION, newUsernameLowerCase);

    try {
      const docSnap = await getDoc(usernameDocRef);
      return !docSnap.exists();

    } catch (error) {
      console.error("Error checking username availability:", error);
      return false;
    }
  }

  const submitRegisterForm = async (e: React.FormEvent): Promise<void> => {

    e.preventDefault();
    
    const validationErrors: ErrorType[] = []

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

      const isAvailable = await checkAvailableUsername(newUsername);

      if(!isAvailable) validationErrors.push({
        input: "Username",
        message: "Username not available."
      });

      if(validationErrors.length > 0) { 
          throw new ValidationError(validationErrors); 
      };
      
      if(registrationErrors.length > 0) setRegistrationErrors([]);

      const newUser: RegisterUser = new RegisterUser(newUsername, newUserEmail, newUserPassword, checkboxState);

      registerNewUser(newUser);

      navigate("/login", { replace: true });

    }catch(error){

      error instanceof ValidationError
      ? setRegistrationErrors([{message: error.message}, ...validationErrors])
      : setRegistrationErrors([{message: `Unexpected: ${error}`}])

    }finally{
      
      setNewUsername("")
      setNewUserEmail("");
      setNewUserPassword("");
      setNewPasswordConfirmation("");

      validationErrors.length = 0;

    }
  }

  const registerNewUser = async (newUser: RegisterUser): Promise<void> => {

    try {
      const result = await createUserWithEmailAndPassword(auth, newUser.userEmail, newUser.userPassword);
      await updateProfile(result.user, {
        displayName: newUser.userUsername
      });

      const batch = writeBatch(db);

      const userDocRef: DocumentReference = doc(db, USERS_COLLECTION, result.user.uid);
      const dataForFirestore: UserProfileType = newUser.toFirestoreObject();
      const resultUserUid: string = result.user.uid;
      dataForFirestore.uid = resultUserUid;
      batch.set(userDocRef, dataForFirestore);

      const usernameDocRef: DocumentReference = doc(db, USERNAMES_COLLECTION, dataForFirestore.displayName_lowercase);
      batch.set(usernameDocRef, {});

      await batch.commit();

      await sendEmailVerification(result.user);

      }catch (error) {
      console.error("Error creating user or sending verification email:", error, 4000);
    }
  }

  const premiumRegister = (checked: boolean): void => {
    setCheckboxState(checked);
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
      dispatch(setUserProfileUsername({ userProfileUsername: result.user.displayName }));

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
    }finally {
      setLoginEmail("");
      setLoginPassword("");
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
    checkboxState,
    premiumRegister,
    logout
  };

};

export default useAuth;
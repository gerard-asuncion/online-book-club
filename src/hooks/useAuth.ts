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

      if(newUsername === "") validationErrors.push({
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
    // 1. Prevé l'enviament del formulari
    e.preventDefault();
    
    // 2. Neteja errors anteriors
    setLoginError(null); 

    try {
      // 3. AQUESTA ÉS LA LÍNIA QUE HAS COMENÇAT:
      // Executa l'inici de sessió
      const result = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

      // --- 4. LÒGICA D'ÈXIT (Copiada del teu 'loginWithGoogle') ---

      // Defineix les opcions de la cookie
      const cookieOptions: CookieOptions = {
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 dies
      };

      // Estableix la cookie de sessió
      cookies.set("auth-token", result.user.refreshToken, cookieOptions);

      // Actualitza l'estat global de Redux
      dispatch(setIsAuth());
      
      // Navega a la pàgina principal
      navigate("/", { replace: true });

    } catch (error) {
      // --- 5. GESTIÓ D'ERRORS (Millorat) ---
      // Aquí és on fem servir la 'traducció' de la documentació
      
      // La majoria d'errors de Firebase tenen un 'code'
      if (error instanceof Error && 'code' in error) {
        const errorCode = (error as { code: string }).code;
        console.error("Firebase Login Error:", errorCode);

        // Donem un missatge útil a l'usuari
        switch (errorCode) {
          case "auth/invalid-credential":
          case "auth/invalid-email":
            setLoginError("L'email o la contrasenya són incorrectes.");
            break;
          case "auth/user-not-found": // Encara que 'invalid-credential' és més comú
            setLoginError("No s'ha trobat cap usuari amb aquest email.");
            break;
          case "auth/wrong-password": // Encara que 'invalid-credential' és més comú
            setLoginError("L'email o la contrasenya són incorrectes.");
            break;
          default:
            setLoginError("Ha ocorregut un error. Torna a intentar-ho.");
        }
      } else {
        // Per a errors genèrics
        console.error("Unexpected Error:", error);
        setLoginError("Ha ocorregut un error inesperat.");
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
    dispatch(setIsSearch());
    dispatch(setOpenSidebar());
  }

  return {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
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
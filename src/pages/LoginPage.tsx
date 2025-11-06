import useAuth from "../hooks/useAuth";
import Header from "../components/ui/Header";
import ScreenFrame from "../components/ui/ScreenFrame";
import { defaultButtonLayout } from "../utils/classNameUtils";

const Auth = () => {

    const { 
        loginEmail,
        setLoginEmail,
        loginPassword,
        setLoginPassword,
        loginError,
        loginWithGoogle, 
        loginWithEmailAndPassword, 
        navigateToRegister
    } = useAuth();

    return (
        <ScreenFrame page="full">
            <Header />
            <ScreenFrame page="center">
                <section className="flex flex-col justify-center items-center p-8 border-2 border-main-color rounded-3xl max-w-sm mx-auto space-y-6">
                    <form className="flex flex-col" onSubmit={loginWithEmailAndPassword} >
                        <label 
                            htmlFor="email"
                            className="text-white"
                        >
                            User Email:
                        </label>
                        <input 
                            type="text" 
                            name="email" 
                            value={loginEmail}
                            onChange={(e) => {setLoginEmail(e.target.value)}}
                            placeholder="Enter email..."
                            className="bg-white"
                        />
                        <label 
                            htmlFor="email"
                            className="text-white"
                        >
                            User Password:
                        </label>
                        <input 
                            type="text" 
                            name="password" 
                            value={loginPassword}
                            onChange={(e) => {setLoginPassword(e.target.value)}}
                            placeholder="Enter password..."
                            className="bg-white"
                        />
                        
                            {loginError && (
                                <div className="text-red-500 text-xs text-center p-2 rounded-md">
                                    {loginError}
                                </div>
                            )}
                            
                        <button 
                            type="submit"
                            className={`${defaultButtonLayout()}`}
                        >
                            Log In
                        </button>
                    </form>
                    <article>
                        <button 
                            className={`${defaultButtonLayout()}`}
                            onClick={navigateToRegister}
                        >
                            Register
                        </button>
                        <button
                            className={`${defaultButtonLayout()}`}
                            onClick={loginWithGoogle}
                        >
                            Continue With Google
                        </button>
                    </article>
                </section>
            </ScreenFrame>
        </ScreenFrame>
    );
};

export default Auth;
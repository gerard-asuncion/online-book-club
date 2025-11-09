import * as Sentry from '@sentry/react';
import useAuth from "../hooks/useAuth";
import Header from "../components/ui/Header";
import ScreenFrame from "../components/ui/ScreenFrame";
import { defaultButtonLayout } from "../utils/classNameUtils";

const LoginPage = () => {

    const { 
        loginEmail,
        setLoginEmail,
        loginPassword,
        setLoginPassword,
        loginError,
        submitLoginForm, 
        navigateToRegister
    } = useAuth();

    return (
        <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <ScreenFrame page="full">
            <Header />
            <ScreenFrame page="center">
                <section className="flex flex-col justify-center items-center p-8 border-2 border-main-color rounded-3xl max-w-sm mx-auto space-y-6">
                    <form className="flex flex-col gap-3" onSubmit={submitLoginForm} >
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
                            className="bg-white p-1 rounded-md"
                        />
                        <label 
                            htmlFor="email"
                            className="text-white"
                        >
                            User Password:
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            value={loginPassword}
                            onChange={(e) => {setLoginPassword(e.target.value)}}
                            placeholder="Enter password..."
                            className="bg-white p-1 mb-5 rounded-md"
                        />
                        
                            {loginError && (
                                <div className="text-main-color text-xs text-center p-2 rounded-md">
                                    {loginError.userMessage}
                                </div>
                            )}
                            
                        <button 
                            type="submit"
                            className={`${defaultButtonLayout()}`}
                        >
                            Log In
                        </button>
                    </form>
                    <button 
                        className={`${defaultButtonLayout()}`}
                        onClick={navigateToRegister}
                    >
                        Register
                    </button>
                    <button
                    type="button"
                    className={`${defaultButtonLayout()}`}
                    onClick={() => {
                        throw new Error("Testing sentry error!!");
                    }}
                >
                Break the world
                </button>;
                </section>
            </ScreenFrame>
        </ScreenFrame>
        </Sentry.ErrorBoundary>
    );
};

export default LoginPage;
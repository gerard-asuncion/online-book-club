import useAuth from "../../hooks/useAuth";
import Header from "../../components/ui/Header";
import ScreenFrame from "../../components/ui/ScreenFrame";
import { defaultButtonLayout } from "../../utils/classNameUtils";

const LoginForm = () => {

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
                            type="email" 
                            name="email" 
                            value={loginEmail}
                            onChange={(e) => {setLoginEmail(e.target.value)}}
                            placeholder="example@mail.com"
                            className="bg-secondary-color border-main-color border-2 text-white placeholder:text-main-color placeholder:italic p-1 rounded-md"
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
                            className="bg-secondary-color border-main-color border-2 text-white p-1 mb-5 rounded-md"
                        />
                        {loginError &&
                            <div className="bg-main-color text-white text-center">
                                {loginError.userMessage}
                            </div>
                        }                    
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
                </section>
            </ScreenFrame>
        </ScreenFrame>
    );
};

export default LoginForm;
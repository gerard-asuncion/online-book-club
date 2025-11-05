import useAuth from "../hooks/useAuth";
import Header from "../components/ui/Header";
import ScreenFrame from "../components/ui/ScreenFrame";
import { defaultButtonLayout } from "../utils/classNameUtils";

const Auth = () => {

    const { loginWithGoogle, loginWithEmailAndPassword, navigateToRegister } = useAuth();

    return (
        <ScreenFrame page="full">
            <Header />
            <ScreenFrame page="center">
                <section className="flex flex-col justify-center items-center p-8 border-2 border-main-color rounded-lg max-w-sm mx-auto space-y-6">
                    <article className="flex flex-col">
                        <label 
                            htmlFor="email"
                            className="text-white"
                        >
                            User Email:
                        </label>
                        <input 
                            type="text" 
                            name="email" 
                            id="email"
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
                            name="email" 
                            id="email"
                            placeholder="Enter password..."
                            className="bg-white"
                        />
                    </article>
                    <button 
                        className={`${defaultButtonLayout()}`}
                        onClick={loginWithEmailAndPassword} 
                    >
                        Log In
                    </button>
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
                </section>
            </ScreenFrame>
        </ScreenFrame>
    );
};

export default Auth;
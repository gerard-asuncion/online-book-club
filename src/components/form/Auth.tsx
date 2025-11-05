import useAuth from "../../hooks/useAuth";
import { defaultButtonLayout } from "../../utils/classNameUtils";

const Auth = () => {

    const { loginWithGoogle, loginWithEmailAndPassword, register } = useAuth();

    return (
        <section className="flex flex-col justify-center items-center p-8 border-2 border-main-color rounded-lg max-w-sm mx-auto space-y-6">
            <div className="font-medium text-center text-white">
                Welcome to Online Book Club
            </div>
            <button 
                className={`${defaultButtonLayout()}`}
                onClick={loginWithEmailAndPassword} 
            >
                Log In With Email & Password
            </button>
            <button 
                className={`${defaultButtonLayout()}`}
                onClick={register}
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
    );
};

export default Auth;
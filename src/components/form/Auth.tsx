import useAuth from "../../hooks/useAuth";

const Auth = () => {

    const { loginWithGoogle, loginWithEmailAndPassword, register } = useAuth();

    return (
        <section className="flex flex-col items-center justify-center p-8 border-2 border-white rounded-lg max-w-sm mx-auto space-y-6">
            <p className="font-medium text-center text-white">
                Welcome to Online Book Club
            </p>
            <div className="hidden">
                <button onClick={loginWithEmailAndPassword} >
                    Log In With Email & Password
                </button>
                <button onClick={register}>
                    Register
                </button>
            </div>   
            <button onClick={loginWithGoogle}>
                Continue With Google
            </button>
        </section>
    );
};

export default Auth;
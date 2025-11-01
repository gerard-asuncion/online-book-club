import Button from "../ui/Button";
import useAuth from "../../hooks/useAuth";

const Auth = () => {

    const { loginWithGoogle, loginWithEmailAndPassword, register } = useAuth();

    return (
        <section className="flex flex-col items-center justify-center p-8 border-2 border-white rounded-lg max-w-sm mx-auto space-y-6">
            <p className="font-medium text-center text-white">
                Welcome to Online Book Club
            </p>
            <div className="hidden">
                <Button onClick={loginWithEmailAndPassword} >
                    Log In With Email & Password
                </Button>
                <Button onClick={register}>
                    Register
                </Button>
            </div>   
            <Button onClick={loginWithGoogle}>
                Continue With Google
            </Button>
        </section>
    );
};

export default Auth;
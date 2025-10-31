import Button from "../ui/Button";
import useAuth from "../../hooks/useAuth";

const Auth = () => {

    const { loginWithGoogle, loginWithEmailAndPassword, register } = useAuth();

    return (
        <section className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md max-w-sm mx-auto space-y-6">
            <p className="text-gray-700 font-medium text-center">
                Sign In To Continue
            </p>
            <Button onClick={loginWithEmailAndPassword}>
                Login With Email & Password
            </Button>   
            <Button onClick={loginWithGoogle}>
                Login With Google
            </Button>
            <Button onClick={register}>
                Register
            </Button>
        </section>
    );
};

export default Auth;
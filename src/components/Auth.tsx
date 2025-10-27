import Button from "./Button";
import useAuth from "../hooks/useAuth";

const Auth = () => {

    const { signInWithGoogle } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md max-w-sm mx-auto space-y-6">
            <p className="text-gray-700 font-medium text-center">
                Sign In To Continue
            </p>   
            <Button onClick={signInWithGoogle}>
                Sign In With Google
            </Button>
        </div>
    );
};

export default Auth;
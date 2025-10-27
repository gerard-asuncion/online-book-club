import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import type { AuthProps } from "../types/props";
import { useNavigate } from "react-router-dom";
import Screen from "./Screen";
import Button from "./Button";

const cookies = new Cookies();

const Auth = ({ setIsAuth }: AuthProps) => {

    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
            navigate("/", { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Screen page="center">
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md max-w-sm mx-auto space-y-6">
            <p className="text-gray-700 font-medium text-center">
                Sign In To Continue
            </p>   
            <Button onClick={signInWithGoogle}>
                Sign In With Google
            </Button>
            </div>
        </Screen>
    );
};

export default Auth;
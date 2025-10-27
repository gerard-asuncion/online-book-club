import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import type { AuthProps } from "../types/props.js";
import { useNavigate } from "react-router-dom";
import Screen from "./Screen.js";

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
            <button 
                onClick={signInWithGoogle} 
                className="
                w-full
                flex items-center justify-center 
                py-3 px-4 
                bg-white 
                border border-gray-300 
                rounded-lg 
                shadow-sm 
                text-gray-800 
                font-semibold 
                hover:bg-gray-50 
                transition-colors 
                duration-200 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500 
                focus:ring-offset-2
                "
            >
                Sign In With Google
            </button>
            </div>
        </Screen>
    );
};

export default Auth;
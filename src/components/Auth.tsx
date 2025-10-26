import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import type { AuthProps } from "../types/props.js";

const cookies = new Cookies();

const Auth = ({ setIsAuth }: AuthProps) => {
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="">
        <p> Sign In With Google To Continue </p>
        <button onClick={signInWithGoogle}> Sign In With Google </button>
        </div>
    );
};

export default Auth;
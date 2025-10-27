import { useState } from "react";
import Auth from "./Auth";
import Cookies from "universal-cookie";
import { Outlet } from "react-router-dom";

const cookies = new Cookies();

const AuthRouter = () => {

    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

    if(!isAuth){
        return (
            <Auth setIsAuth={setIsAuth} />
        )
    }

    return <Outlet />;
}

export default AuthRouter

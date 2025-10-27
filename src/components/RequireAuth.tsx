import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

const cookies = new Cookies();

const RequireAuth = () => {

    const authCookies: string | undefined = cookies.get("auth-token");

    if(!authCookies){
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default RequireAuth

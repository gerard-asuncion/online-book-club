import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated } from "../../features/auth/authSelectors";

const RedirectIfAuth = () => {

    const isAuth: boolean = useAppSelector(selectIsAuthenticated);

    if (isAuth) {
		return <Navigate to="/" replace />;
	}
    
	return <Outlet />;
}

export default RedirectIfAuth;
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated } from "../../features/auth/authSelectors";

const RequireAuth = () => {

    const isAuth: boolean = useAppSelector(selectIsAuthenticated);

    if (!isAuth) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}

export default RequireAuth;

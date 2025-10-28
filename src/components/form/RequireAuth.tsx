import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectIsAuthenticated } from "../../features/auth/authSelectors";

const RequireAuth = () => {

    const isAuth = useAppSelector(selectIsAuthenticated);

    if (!isAuth) {
		return <Navigate to="/sign-in" replace />;
	}

	return <Outlet />;
}

export default RequireAuth;

import { useNavigate, type NavigateFunction } from "react-router-dom";

const usePageNavigation = () => {

    const navigate: NavigateFunction = useNavigate();

    const navigateToEmptyBar = (): void => {
        navigate("/", { replace: true });
    }
    const navigateToRegister = (): void => {
        navigate("/register", { replace: true });
    }
    const navigateToLogin = (): void => {
        navigate("/login", { replace: true });
    }
    const navigateToSearch = (): void => {
        navigate("/", { replace: true });
    }
    const navigateToChat = (): void => {
        navigate("/chat", { replace: true });
    }
    const navigateToHistorial = (): void => {
        navigate("/historial", { replace: true });
    }
    const navigateToSettings = (): void => {
        navigate("/settings", { replace: true });
    }
    const navigateToActive = (): void => {
        navigate("/active", { replace: true });
    }
    const navigateToAbout = (): void => {
        navigate("/about", { replace: true });
    }
    const navigateToUserDataError = (): void => {
        navigate("/userdataerror", { replace: true });
    }

    return { 
        navigateToEmptyBar,
        navigateToRegister,
        navigateToLogin, 
        navigateToSearch, 
        navigateToChat, 
        navigateToHistorial, 
        navigateToSettings, 
        navigateToActive, 
        navigateToAbout,
        navigateToUserDataError
    }
}

export default usePageNavigation;

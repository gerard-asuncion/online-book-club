import Auth from "../components/form/Auth";
import Header from "../components/ui/Header";
import ScreenFrame from "../components/ui/ScreenFrame";

const LoginPage = () => {

    return (
        <ScreenFrame page="full">
            <Header />
            <ScreenFrame page="center">
                <Auth />
            </ScreenFrame>
        </ScreenFrame>
    )

}

export default LoginPage;

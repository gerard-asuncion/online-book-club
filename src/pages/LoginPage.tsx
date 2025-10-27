import { useState } from "react"
import Auth from "../components/Auth"
import Cookies from "universal-cookie"

const cookies = new Cookies();

const LoginPage = () => {

    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))

    return (
        <Auth setIsAuth={setIsAuth} />
    )
}

export default LoginPage

import ScreenFrame from "../../components/ui/ScreenFrame";
import Header from "../../components/ui/Header";
import useAuth from "../../hooks/useAuth";
import { showHideAnything, defaultButtonLayout } from "../../utils/classNameUtils";
import useResponsive from "../../hooks/useResponsive";

const RegisterForm = () => {

  const { isMobile } = useResponsive();

  const { 
    registrationWarnings,
    newUsername,
    newUserEmail,
    newUserPassword,
    newPasswordConfirmation,
    setNewUsername,
    setNewUserEmail,
    setNewUserPassword,
    setNewPasswordConfirmation,
    submitRegisterForm, 
    navigateToLogin,
    checkboxState,
    premiumRegister,
    loadingLogin
  } = useAuth();
  
  return (
    <ScreenFrame page="full">
    {!isMobile && <Header />}
        <ScreenFrame page="center">
            {loadingLogin && <div className="text-2xl text-white font-bold">LOADING...</div>}
                {!loadingLogin &&
                    <section className="flex flex-col items-center gap-4 p-8 border-2 rounded-3xl border-main-color">
                        <form 
                            onSubmit={submitRegisterForm}
                            className="flex flex-col gap-6 w-full"
                        >
                            <section className="
                                grid 
                                grid-cols-1 
                                md:grid-cols-2 
                                gap-4
                            ">
                            <div className="flex flex-col gap-1">
                                <label 
                                htmlFor="username"
                                className="text-white"
                                >
                                Username:
                                </label>
                                <input 
                                type="text"
                                name="username" 
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className="text-white bg-secondary-color border-2 border-main-color placeholder:text-main-color placeholder:italic py-1 px-2 rounded-md" 
                                placeholder="your_username_here" 
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label 
                                htmlFor="email"
                                className="text-white"
                                >
                                Email:
                                </label>
                                <input 
                                type="email"
                                name="email" 
                                value={newUserEmail}
                                onChange={(e) => setNewUserEmail(e.target.value)}
                                className="text-white bg-secondary-color border-2 border-main-color placeholder:text-main-color placeholder:italic py-1 px-2 rounded-md" 
                                placeholder="example@mail.com" 
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label 
                                htmlFor="password"
                                className="text-white"
                                >
                                Password:
                                </label>
                                <input 
                                type="password" 
                                name="password" 
                                value={newUserPassword}
                                onChange={(e) => setNewUserPassword(e.target.value)}
                                className="text-white bg-secondary-color border-2 border-main-color py-1 px-2 rounded-md" 
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label 
                                htmlFor="passwordRepeat"
                                className="text-white"
                                >
                                Repeat password:
                                </label>
                                <input 
                                type="password"
                                name="passwordRepeat" 
                                value={newPasswordConfirmation}
                                onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                                className="text-white bg-secondary-color border-2 border-main-color py-1 px-2 rounded-md" 
                                />
                            </div>
                            
                            </section>
                            <div className="flex gap-2 justify-center items-center">
                                <input 
                                    type="checkbox"
                                    className="accent-main-color"
                                    id="registerPremiumCheckbox"
                                    name="registerPremiumCheckbox"
                                    checked={checkboxState} 
                                    onChange={(e) => {
                                        premiumRegister(e.target.checked);
                                    }}
                                />
                                <label 
                                    htmlFor="registerAdminCheckbox"
                                    className="text-white text-sm"
                                >
                                    Premium user (free & recomended)
                                </label>
                            </div>
                            <ul className={`
                                ${showHideAnything(!registrationWarnings.length)} 
                                bg-main-color
                                text-white`
                            }>
                                <li>Username can't contain symbols or spaces, except the underscore: _</li>
                                <li>Password must be at least 8 characters long</li>
                            </ul>
                            <ul className={`
                                ${showHideAnything(registrationWarnings.length)} 
                                flex
                                flex-col
                                items-center
                                gap-0.5
                            `}>
                            {registrationWarnings.map(warning => 
                                <li 
                                key={warning.id} 
                                className="bg-main-color text-white">
                                    {warning.message}
                                </li>
                            )}
                            </ul>
                            <button
                            type="submit" 
                            className={`row-span-1 ${defaultButtonLayout} w-full md:w-50/100 self-center`}
                            >
                                Register
                            </button>
                        </form>
                            <button
                                className={`${defaultButtonLayout} w-full md:w-50/100`}
                                onClick={navigateToLogin}
                            >
                                Go back
                            </button>
                    </section>
                }
        </ScreenFrame>
    </ScreenFrame>
  )
}

export default RegisterForm;

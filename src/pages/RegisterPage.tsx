import { useState } from "react";
import ScreenFrame from "../components/ui/ScreenFrame";
import Header from "../components/ui/Header";
import useAuth from "../hooks/useAuth";
import { showHideAnything, defaultButtonLayout } from "../utils/classNameUtils";
import useResponsive from "../hooks/useResponsive";

const RegisterPage = () => {

  const { isMobile } = useResponsive();

  const [checkboxState, setCheckboxState] = useState<boolean>(false);

  const testCheckbox = (checked: boolean): void => {
    setCheckboxState(checked);
  }

  const { 
    registrationErrors,
    newUsername,
    newUserEmail,
    newUserPassword,
    newPasswordConfirmation,
    setNewUsername,
    setNewUserEmail,
    setNewUserPassword,
    setNewPasswordConfirmation,
    submitRegisterForm, 
    navigateToLogin 
  } = useAuth();
  
  return (
    <ScreenFrame page="full">
      {!isMobile && <Header />}
        <ScreenFrame page="center">
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
                    className="bg-white py-1 px-2 rounded-md" 
                    placeholder="enter username..." 
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
                    type="text"
                    name="email" 
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="bg-white py-1 px-2 rounded-md" 
                    placeholder="enter email..." 
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
                    type="text" 
                    name="password" 
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    className="bg-white py-1 px-2 rounded-md" 
                    placeholder="enter password..." 
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
                    type="text" 
                    name="passwordRepeat" 
                    value={newPasswordConfirmation}
                    onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                    className="bg-white py-1 px-2 rounded-md" 
                    placeholder="repeat password..."
                  />
                </div>
                
              </section>
              <div className="flex gap-2 justify-center items-center">
                <input 
                  type="checkbox"
                  className="accent-main-color"
                  id="registerAdminCheckbox"
                  name="registerAdminCheckbox"
                  checked={checkboxState} 
                  onChange={(e) => {
                      testCheckbox(e.target.checked);
                  }}
                />
                <label 
                  htmlFor="registerAdminCheckbox"
                  className="text-white text-sm"
                >
                  Admin user
                </label>
              </div>
              <div className={`
                  ${showHideAnything(registrationErrors.length)} 
                  text-xs
                  flex
                  flex-col
                  items-start
                  gap-0.5
                `}>
                {registrationErrors.map((error, index) => 
                  index === 0
                  ? <div key={index} className="text-white">{error.message}</div>
                  : <div key={index} className="text-main-color">{error.message}</div>
                )}
              </div>
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
        </ScreenFrame>
    </ScreenFrame>
  )
}

export default RegisterPage;

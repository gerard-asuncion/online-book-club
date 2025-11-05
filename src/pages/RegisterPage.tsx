import { useState } from "react";
import ScreenFrame from "../components/ui/ScreenFrame";
import Header from "../components/ui/Header";
import { defaultButtonLayout } from "../utils/classNameUtils";

const RegisterPage = () => {

  const [checkboxState, setCheckboxState] = useState<boolean>(false);

  const testCheckbox = (checked: boolean): void => {
    setCheckboxState(checked);
  }
  
  return (
    <ScreenFrame page="full">
        <Header />
        <ScreenFrame page="center">
          <section className="flex flex-col gap-5 p-10 border-2 rounded-3xl border-main-color">
            <form action="" className="grid grid-col grid-cols-1 grid-rows-5">
              <div className="flex flex-col gap-3">
                <label 
                  htmlFor="username"
                  className="text-white"
                >
                  Username:
                </label>
                <input 
                  type="text"
                  name="username" 
                  id="username" 
                  className="bg-white py-1 px-2 rounded-md" 
                  placeholder="enter username..." 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label 
                  htmlFor="email"
                  className="text-white"
                >
                  Email:
                </label>
                <input 
                  type="text"
                  name="email" 
                  id="email" 
                  className="bg-white py-1 px-2 rounded-md" 
                  placeholder="enter email..." 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label 
                  htmlFor="password"
                  className="text-white"
                >
                  Password:
                </label>
                <input 
                  type="text" 
                  name="password" 
                  id="password" 
                  className="bg-white py-1 px-2 rounded-md" 
                  placeholder="enter password..." 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label 
                  htmlFor="passwordRepeat"
                  className="text-white"
                >
                  Repeat password:
                </label>
                <input 
                  type="text" 
                  name="passwordRepeat" 
                  id="passwordRepeat" 
                  className="bg-white py-1 px-2 rounded-md" 
                  placeholder="repeat password..."
                />
              </div>
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
              <button
                className={`${defaultButtonLayout}`}
              >
                Register
              </button>
            </form>
            <button
            className={`${defaultButtonLayout}`}
            >
              Go back
            </button>
          </section>
        </ScreenFrame>
    </ScreenFrame>
  )
}

export default RegisterPage;

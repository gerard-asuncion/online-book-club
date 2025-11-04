import MainContentFrame from "../ui/MainContentFrame";
import useAuth from "../../hooks/useAuth";
import useMainContentRouter from "../../hooks/useMainContentRouter";
import { defaultButtonLayout } from "../../utils/classNameUtils";

const Settings = () => {

  const { logout } = useAuth();
  const { switchContent } = useMainContentRouter();

  return (
    <MainContentFrame>
      <div className="h-full w-full text-white font-bold text-lg flex justify-center items-center">
        <button 
          className={`${defaultButtonLayout()} max-w-50`}
          onClick={() => {
              switchContent("");
              logout();
          }}>
          Log Out
      </button> 
      </div>
    </MainContentFrame>
  )
}

export default Settings;

import MainContentFrame from "../ui/MainContentFrame";
import useSettings from "../../hooks/useSettings";
import useAuth from "../../hooks/useAuth";
import useMainContentRouter from "../../hooks/useMainContentRouter";
import { defaultButtonLayout } from "../../utils/classNameUtils";

const Settings = () => {

  const { changePremiumStatus } = useSettings();
  const { logout } = useAuth();
  const { switchContent } = useMainContentRouter();

  return (
    <MainContentFrame>
      <div className="h-full w-full p-10 text-white">
        <button
          className={`${defaultButtonLayout()} max-w-50`}
          onClick={() => switchContent("chatHistorial")}
        >
          Chat Historial
        </button>
        <button
          className={`${defaultButtonLayout()} max-w-50`}
          onClick={changePremiumStatus}
        >
          Change plan
        </button>
        <button 
          className={`${defaultButtonLayout()} max-w-50`}
          onClick={logout}>
          Log Out
        </button> 
      </div>
    </MainContentFrame>
  )
}

export default Settings;

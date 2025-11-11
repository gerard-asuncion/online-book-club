import MainContentFrame from "../ui/MainContentFrame";
import useSettings from "../../hooks/useSettings";
import useAuth from "../../hooks/useAuth";
import usePageNavigation from "../../hooks/usePageNavigation";
import { defaultButtonLayout } from "../../utils/classNameUtils";

const Settings = () => {

  const { changePremiumStatus } = useSettings();
  const { logout, deleteUserFromFirebase } = useAuth();
  const { navigateToHistorial } = usePageNavigation();

  return (
    <MainContentFrame>
      <section className="h-full w-full text-white flex flex-col items-center justify-center gap-3">
        <button
          className={`${defaultButtonLayout()} max-w-50`}
          onClick={navigateToHistorial}
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
        <button 
          className={`${defaultButtonLayout()} max-w-50`}
          onClick={deleteUserFromFirebase}>
          Delete profile
        </button> 
      </section>
    </MainContentFrame>
  )
}

export default Settings;

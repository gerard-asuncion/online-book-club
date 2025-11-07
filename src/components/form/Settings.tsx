import MainContentFrame from "../ui/MainContentFrame";
import useSettings from "../../hooks/useSettings";
import useAuth from "../../hooks/useAuth";
import useMainContentRouter from "../../hooks/useMainContentRouter";
import { defaultButtonLayout } from "../../utils/classNameUtils";

const Settings = () => {

  const { userHistorialBooks, isLoading, error, handleBookClick } = useSettings();
  const { logout } = useAuth();
  const { switchContent } = useMainContentRouter();

  return (
    <MainContentFrame>
      <div className="h-full w-full p-10 text-white">
        <section>
          <div>Chats:</div>
          <article>
            {!isLoading && error && <div>{error}</div>}
            {isLoading && <div>Loading...</div>}
            {!isLoading && userHistorialBooks.map(room =>
            <div>
              <button onClick={() => {
                handleBookClick(room.id, room.volumeInfo.title, room.volumeInfo.authors);
              }}>
                {room.volumeInfo.title}
              </button>
            </div>
           )}
          </article>
        </section>
        <button
          className={`${defaultButtonLayout()} max-w-50`}
        >
          Change plan
        </button>
        <button 
          className={`${defaultButtonLayout()} max-w-50`}
          onClick={() => {
              switchContent("");
              logout();
          }}>
          Log Out
        </button> 
        <button
          className={`${defaultButtonLayout()} max-w-50`}
        >
          Delete account
        </button>
      </div>
    </MainContentFrame>
  )
}

export default Settings;

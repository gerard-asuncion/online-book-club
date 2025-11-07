import MainContentFrame from "../ui/MainContentFrame";
import useSettings from "../../hooks/useSettings";
import useAuth from "../../hooks/useAuth";
import { defaultButtonLayout } from "../../utils/classNameUtils";

const Settings = () => {

  const { userHistorialBooks, 
          isLoadingHistorial, 
          handleBookClick, 
          changePremiumStatus, 
          getHistorialBooks 
        } = useSettings();

  const { logout } = useAuth();

  return (
    <MainContentFrame>
      <div className="h-full w-full p-10 text-white">
        <button
          className={`${defaultButtonLayout()} max-w-50`}
          onClick={getHistorialBooks}
        >
          Chat Historial
        </button>
        <section>
          <article>
            <div>Chats:</div>
            {isLoadingHistorial && <div>Loading...</div>}
            {userHistorialBooks.map(room =>
            <div key={room.id}>
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

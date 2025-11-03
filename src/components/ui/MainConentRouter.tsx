import Chat from "../form/Chat";
import Settings from "../form/Settings";
import BooksGrid from "../form/BooksGrid";
import MainContentFrame from "./MainContentFrame";
import useMainContentRouter from "../../hooks/useMainContentRouter";

const MainContentRouter = () => {

  const { isWelcome, isChat, isSettings, isSearch } = useMainContentRouter();

  if(isChat){
    return (
      <Chat />
    )
  } else if(isSettings){
    return (
      <Settings />
    )
  } else if(isSearch){
    return (
      <BooksGrid />
    )
  } else if(isWelcome){
    return (
      <MainContentFrame>
        <div className="h-full text-white font-bold text-lg flex justify-center items-center">
          Welcome, please select a room...
        </div>
      </MainContentFrame>
    )
  } else {
    return (
      <MainContentFrame>
        <div className="h-full text-white font-bold text-lg flex justify-center items-center">
          Sorry, something went wrong loading this component, please try again.
        </div>
      </MainContentFrame>
    )
  }

}

export default MainContentRouter;

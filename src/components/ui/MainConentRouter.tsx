import Chat from "../form/Chat";
import ChatHistorial from "../form/ChatHistorial";
import Settings from "../form/Settings";
import BooksGrid from "../form/BooksGrid";
import MainContentFrame from "./MainContentFrame";
import useMainContentRouter from "../../hooks/useMainContentRouter";
import ActiveBooksGrid from "../form/activeBooksGrid";
import AboutSection from "./AboutSection";

const MainContentRouter = () => {

  const { isChat, isChatHistorial, isSettings, isSearch, isActiveSearch, isAbout } = useMainContentRouter();

  if(isChat){
    return (
      <Chat />
    )
  } else if(isChatHistorial){
    return (
      <ChatHistorial />
    )
  } else if(isSettings){
    return (
      <Settings />
    )
  } else if(isSearch){
    return (
      <BooksGrid />
    )
  } else if(isActiveSearch){
    return (
      <ActiveBooksGrid />
    )

  } else if(isAbout){
    return (
      <AboutSection />
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

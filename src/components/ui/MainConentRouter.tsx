import Chat from "../form/Chat";
import Settings from "../form/Settings";
import Search from "../form/Search";
import Welcome from "../form/Welcome";
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
      <Search />
    )
  } else if(isWelcome) {
    return (
      <Welcome />
    )
  } else {
    return (
      <MainContentFrame>
        <div>Sorry, something went wrong loading this component, please try again.</div>
      </MainContentFrame>
    )
  }

}

export default MainContentRouter;

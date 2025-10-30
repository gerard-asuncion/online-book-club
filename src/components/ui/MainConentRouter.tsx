import Chat from "../form/Chat"
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
      <MainContentFrame>
        <div>Settings</div>
      </MainContentFrame>
    )
  } else if(isSearch){
    return (
      <MainContentFrame>
        <div>Search</div>
      </MainContentFrame>
    )
  } else if(isWelcome) {
    return (
      <MainContentFrame>
        <div>Welcome!</div>
      </MainContentFrame>
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

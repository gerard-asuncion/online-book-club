import Chat from "../form/Chat"
import type { AppWindowProps } from "../../types/props"
import Settings from "../form/Settings"

const AppWindow = ({ bookRoom, displayedWindow }: AppWindowProps) => {

  if(displayedWindow === "chat" && bookRoom){
    return (
      <Chat bookRoom={bookRoom} />
    )
  } else if(displayedWindow === "chat"){
    return (
      <div>Welcome! Add a new book or select one to start chatting...</div>
    )
  } else if(displayedWindow === "settings"){
    return (
      <Settings />
    )
  } else {
    return (
      <div>Failed to load window, please use the sidebar to navigate.</div>
    )

  }

}

export default AppWindow;

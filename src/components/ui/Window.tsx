import Chat from "../form/Chat"
import type { WindowProps } from "../../types/props"

const Window = ({ bookRoom }: WindowProps) => {

  if(bookRoom === "") return (
    <div className="p-10 md:p-40">
      Select a chat room to start...
    </div>
  )

  return (
    <Chat bookRoom={bookRoom} />
  )
}

export default Window

import Chat from "../form/Chat"
import type { WindowProps } from "../../types/props"

const Window = ({ bookRoom }: WindowProps) => {

  if(bookRoom === "") return (
    <div>Select a chat room to start...</div>
  )

  return (
        <Chat bookRoom={bookRoom} />
  )
}

export default Window

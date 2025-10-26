import Chat from "./Chat"
import type { WindowProps } from "../types/props"

const Window = ({ room }: WindowProps) => {
  return (
        <Chat room={room} />
  )
}

export default Window

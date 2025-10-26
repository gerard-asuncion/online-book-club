import Cookies from "universal-cookie"

export interface WindowProps {
    bookRoom: string
}

export interface ChatProps {
    bookRoom: string
}

export interface SidebarProps {
    setBookRoom: React.Dispatch<React.SetStateAction<string>>
}

export interface AuthProps {
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export interface UseChatProps {
  bookRoom: string;
}

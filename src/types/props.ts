export interface WindowProps {
    room: string
}

export interface ChatProps {
    room: string
}

export interface SidebarProps {
    setBookRoom: React.Dispatch<React.SetStateAction<string>>
}
import type { ReactNode } from "react";

export interface WindowProps {
    bookRoom: string;
}

export interface ChatProps {
    bookRoom: string;
}

export interface HeaderProps {
    openSidebar: boolean,
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SidebarProps {
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>,
    setBookRoom: React.Dispatch<React.SetStateAction<string>>,
    mdBreakpoint: number;
}

export interface UseAuthProps {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UseChatProps {
    bookRoom: string;
}

export interface ScreenProps {
    children: ReactNode,
    page: string;
};

export interface ButtonProps {
    children: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}
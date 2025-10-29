import type { ReactNode } from "react";

export interface OnlyStringChildrenProps {
    children: string;
}

export interface OnlyReactNodeChildrenProps {
    children: ReactNode;
}

export interface OnlyBookRoomProps {
    bookRoom: string;
}

export interface AppWindowProps {
    bookRoom: string,
    displayedWindow: string;
}

export interface HeaderProps {
    openSidebar: boolean,
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SidebarProps {
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>,
    setBookRoom: React.Dispatch<React.SetStateAction<string>>,
    setDisplayedWindow: React.Dispatch<React.SetStateAction<string>>,
    mdBreakpoint: number;
}

export interface SidebarBookCardProps {
    children: string,
    setBookRoom: React.Dispatch<React.SetStateAction<string>>,
    setDisplayedWindow: React.Dispatch<React.SetStateAction<string>>,
    hideSidebar: () => void;
}

export interface UseAuthProps {
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ScreenFrameProps {
    children: ReactNode,
    page: string;
};

export interface ButtonProps {
    children: string,
    onClick: React.MouseEventHandler<HTMLButtonElement> | void;
}
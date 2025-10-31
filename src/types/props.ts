import type { ReactNode } from "react";

export interface OnlyBookRoomProps {
    bookRoom: string;
}

export interface OnlyStringChildrenProps {
    children: string;
}

export interface OnlyReactNodeChildrenProps {
    children: ReactNode;
}

export interface SidebarBookCardProps {
    children: string;
}

export interface UseAuthProps {
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UseNewMessageCountProps {
    bookRoomName: string;
}

export interface ScreenFrameProps {
    children: ReactNode,
    page: string;
};

export interface ButtonProps {
    children: string,
    onClick: React.MouseEventHandler<HTMLButtonElement> | void;
}
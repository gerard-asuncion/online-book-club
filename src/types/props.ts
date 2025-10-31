import type { ReactNode } from "react";
import type { User } from 'firebase/auth';

export interface OnlyReactNodeChildrenProps {
    children: ReactNode;
}

export interface SidebarBookCardProps {
    children: string,
    user: User | null;
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
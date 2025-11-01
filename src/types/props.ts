import type { ReactNode } from "react";
import type { User } from 'firebase/auth';

export interface OnlyReactNodeChildrenProps {
    children: ReactNode;
}

// Provisional Book interface:
interface Book {
    title: string,
    author: string;
}

export interface SidebarBookCardProps {
    children: Book,
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
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}
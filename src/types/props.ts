import type { ReactNode } from "react";
import type { User } from 'firebase/auth';
import type { BookItem } from "./books";

export interface OnlyReactNodeChildrenProps {
    children: ReactNode;
}

export interface LoadingUserProps {
    isLoadingUser: boolean;
}

export interface MainContentRouterProps {
    currentUser: User | null;
}

export interface SidebarBookCardProps {
    cardStoredBook: BookItem,
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
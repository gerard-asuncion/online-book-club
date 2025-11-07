import type { ReactNode } from "react";
import type { BookItem } from "./booksTypes";

export interface OnlyReactNodeChildrenProps {
    children: ReactNode;
}

export interface LoadingUserProps {
    isLoadingUser: boolean;
}

export interface SidebarBookCardProps {
    cardStoredBook: BookItem,
    removeMode: boolean;
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
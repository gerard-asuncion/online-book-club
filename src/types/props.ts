import type { ReactNode } from "react";
import type { User } from 'firebase/auth';
import type { UserProfile } from '../types/types';

export interface OnlyReactNodeChildrenProps {
    children: ReactNode;
}

export interface UserLoadingUserProps {
    currentUser: User | null,
    userProfile: UserProfile | null,
    isLoadingUser: boolean;
}

export interface MainContentRouterProps {
    currentUser: User | null;
}

export interface SidebarBookCardProps {
    displayedBookId: string,
    currentUser: User | null;
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
import type { Timestamp } from "firebase/firestore";

export interface AuthSliceInitialState {
    isAuth: boolean;
}

export interface MainContentRouteInitialState {
    isWelcome: boolean,
    isChat: boolean,
    isSettings: boolean,
    isSearch: boolean;
}

export interface BookRoomInitialState {
    bookRoom: string,
    lastViewedKey: string,
    lastViewedDate: number,
    unreadMessagesCount: number
}

export interface SidebarInitialState {
    windowWidth: number,
    openSidebar: boolean;
}
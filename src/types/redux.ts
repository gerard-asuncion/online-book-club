import type { Message } from "./types";

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
    bookRoom: string;
}

export interface SidebarInitialState {
    windowWidth: number,
    openSidebar: boolean;
}

export interface MessagesInitialState {
    messages: Message[];
}
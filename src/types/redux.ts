import type { Message } from "./types";
import type { BookItem } from "./books";

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

export interface ResponsiveInitialState {
    windowWidth: number,
    isMobile: boolean,
    openSidebar: boolean;
}

export interface MessagesInitialState {
    messages: Message[];
}

export interface BooksSliceInitialState {
    volumes: BookItem[],
    status: string,
    error: string | null;
}
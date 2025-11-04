import type { Message } from "./types";
import type { BookItem } from "./books";

export interface AuthSliceInitialState {
    isAuth: boolean;
}

export interface MainContentRouteInitialState {
    isChat: boolean,
    isSettings: boolean,
    isSearch: boolean,
    isAbout: boolean;
}

export interface CurrentBookInitialState {
    bookId: string | null,
    bookTitle: string | null,
    bookAuthors: string[];
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
    error: string | null,
    currentQuery: string;
}
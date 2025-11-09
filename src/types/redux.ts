import type { BookItem } from "./booksTypes";

export interface AuthSliceInitialState {
    isAuth: boolean;
}

export interface MainContentRouteInitialState {
    isChat: boolean,
    isChatHistorial: boolean,
    isSettings: boolean,
    isSearch: boolean,
    isActiveSearch: boolean,
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

export interface GoogleBooksSliceInitialState {
    volumes: BookItem[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed' | 'loading-more';
    error: string | null,
    currentQuery: string;
}

export interface UserProfileInitialState {
    userProfileUid: string | null,
    userProfileUsername: string | null,
    userProfilePremium: boolean,
    storedBooks: BookItem[],
    fetchStoredBooksStatus: 'idle' | 'loading' | 'succeeded' | 'failed',
    fetchStoredBooksError: string | null;
}
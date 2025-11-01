import type { User } from "firebase/auth";

export const showHideAnything = (show: boolean | number): string =>
    show ? "" : "hidden";

export const changeWindowLayout = (openSidebar: boolean): string =>
    openSidebar 
    ? "hidden md:block md:col-span-3" 
    : "h-full md:col-span-full";

export const changeSidebarLayout = (openSidebar: boolean): string =>
    openSidebar 
    ? "h-full md:col-span-1" 
    : "hidden";

export const setMessageBackgroundColor = (isUser: User | null): string =>
    isUser
    ? "bg-green-200"
    : "bg-white";

export const highlightBookRoomCard = (openBookRoom: string, bookRoomName: string): string =>
    openBookRoom === bookRoomName
    ? "bg-white border-2 border-white hover:bg-gray-900 hover:text-white hover:border-green-800"
    : "bg-gray-900 border-2 border-green-800 text-white hover:bg-green-800"
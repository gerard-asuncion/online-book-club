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
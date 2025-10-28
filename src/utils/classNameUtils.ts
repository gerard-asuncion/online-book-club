export const showHide = (show: boolean): string =>
    show ? "" : "hidden";

export const narrowChat = (narrow: boolean): string =>
    narrow ? "md:col-span-2" : "md:col-span-3";

export const makeFullHeight = (fullHeight: boolean): string =>
    fullHeight ? "h-full" : "hidden";

export const changeWindowLayout = (openSidebar: boolean): string =>
    openSidebar ?
    "hidden md:block md:col-span-2" :
    "h-full md:col-span-3";

export const changeSidebarLayout = (openSidebar: boolean): string =>
    openSidebar ?
    "h-full md:col-span-1" :
    "hidden";
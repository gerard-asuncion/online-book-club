export const changeWindowLayout = (openSidebar: boolean): string =>
    openSidebar ?
    "hidden md:block md:col-span-2" :
    "h-full md:col-span-full";

export const changeSidebarLayout = (openSidebar: boolean): string =>
    openSidebar ?
    "h-full md:col-span-1" :
    "hidden";
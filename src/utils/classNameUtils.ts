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

export const highlightBookRoomCard = (openBookRoom: string, bookRoomName: string): string =>
    openBookRoom === bookRoomName
    ? "bg-gray-800 border-2 border-white text-white"
    : "bg-gray-900 border-2 border-green-800 hover:bg-green-800 text-green-800 hover:text-white"
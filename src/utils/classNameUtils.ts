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
    openBookRoom !== bookRoomName
    ? "bg-gray-900 border-2 border-green-800 text-green-800 transition-colors duration-300 md:duration-100 ease-in-out md:hover:bg-green-800 md:hover:text-white"
    : "bg-gray-800 border-2 border-white text-white"


export const defaultButtonLayout = (): string =>
    `w-full
    text-white
    flex items-center justify-center 
    py-3 px-4 
    border-2
    border-green-800
    rounded-lg 
    shadow-sm 
    font-semibold     
    transition-colors 
    cursor-pointer
    transition-colors 
    ease-in-out
    duration-200
    active:text-black
    active:bg-green-800
    md:hover:bg-green-800`
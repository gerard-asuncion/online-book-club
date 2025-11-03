export const showHideAnything = (show: boolean | number): string =>
    show ? "" : "hidden";

export const centerAnyContent = (center: boolean): string =>
    center ? "flex justify-center items-center" : ""

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
    ? "bg-default-bg border-2 border-main-color text-main-color transition-colors duration-300 md:duration-100 ease-in-out md:hover:bg-main-color md:hover:text-white"
    : "bg-default-bg border-2 border-white text-white"

    
export const setBooksGridLayout = (isOpenGrid: boolean) : string =>
    isOpenGrid ? "grid-cols-4 grid-rows-1" : "grid-cols-1 grid-rows-3"


export const defaultButtonLayout = (): string =>
        `w-full
        text-white
        flex items-center justify-center 
        py-3 px-4 
        border-2
        border-main-color
        rounded-lg 
        font-semibold     
        transition-colors 
        cursor-pointer
        transition-colors 
        ease-in-out
        duration-200
        active:bg-main-color
        md:hover:bg-main-color`
    
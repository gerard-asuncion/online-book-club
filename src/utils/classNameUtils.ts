export const showHideAnything = (show: boolean | number): string =>
    show ? "" : "hidden";

export const alineateMessages = (userId: string | undefined, messageId: string): string =>
    userId === messageId
    ? "justify-end"
    : "justify-start"

export const styleMessages = (userId: string | undefined, messageId: string): string =>
    userId === messageId
    ? "bg-secondary-color"
    : "bg-secondary-color"

export const justifyBooksGrid = (center: boolean): string =>
    center ? "justify-center" : "justify-between"

export const changeWindowLayout = (openSidebar: boolean): string =>
    openSidebar 
    ? "hidden md:block md:col-span-3" 
    : "h-full md:col-span-full";

export const changeSidebarLayout = (openSidebar: boolean): string =>
    openSidebar 
    ? "h-full md:col-span-1" 
    : "hidden";

export const highlightBookRoomCard = (openBookRoom: string | null, bookRoomName: string): string => 
    openBookRoom !== bookRoomName
    ? "bg-default-bg border-2 border-main-color text-main-color transition-colors duration-300 md:duration-100 ease-in-out md:hover:bg-main-color md:hover:text-white cursor-pointer"
    : "bg-default-bg border-2 border-white text-white"

    
export const setBooksGridFormLayout = (isOpenGrid: boolean) : string =>
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
    
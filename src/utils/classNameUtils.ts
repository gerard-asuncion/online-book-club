export const showHideAnything = (show: boolean | number): string =>
    show ? "" : "hidden";

export const alineateMessages = (userId: string | undefined, messageId: string): string =>
    userId === messageId
    ? "justify-end"
    : "justify-start"

export const styleMessages = (userId: string | undefined, messageId: string): string =>
    userId === messageId
    ? "border-main-color border-2"
    : "border-secondary-color border-2 bg-secondary-color"

export const displayUserName = (userId: string | undefined, messageId: string): string =>
    userId === messageId
    ? "invisible"
    : ""

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

export const centerHeaderTitle = (locationPathname: string): string =>
    locationPathname === "/register"
    ? "justify-center"
    : "justify-between"

export const hideHeaderButton = (locationPathname: string): string =>
    locationPathname === "/register"
    ? "hidden"
    : ""

export const highlightBookRoomCard = (openBookRoom: string | null, bookRoomName: string): string => 
    openBookRoom !== bookRoomName
    ? "bg-default-bg border-2 border-main-color text-main-color transition-colors duration-300 md:duration-100 ease-in-out md:hover:bg-main-color md:hover:text-white cursor-pointer"
    : "bg-default-bg border-2 border-white text-white"

    
export const setBooksGridFormLayout = (isOpenGrid: boolean) : string =>
    isOpenGrid ? "grid-cols-4 grid-rows-1" : "grid-cols-1 grid-rows-3"


export const defaultButtonLayout = (): string =>
        `w-full
        text-white
        text-sm
        font-semibold
        flex items-center justify-center 
        py-3 px-4 
        border-2
        border-main-color
        rounded-lg  
        transition-colors 
        cursor-pointer
        transition-colors 
        ease-in-out
        duration-200
        active:bg-main-color
        md:hover:bg-main-color`
    
export const showHideAnything = (show: boolean | number): string =>
    show ? "" : "hidden";

export const alineateMessages = (userUid: string | undefined, messageUserUid: string | undefined): string =>
    userUid === messageUserUid
    ? "justify-end"
    : "justify-start"

export const styleMessages = (userUid: string | undefined, messageUserUid: string | undefined): string =>
    userUid === messageUserUid
    ? "border-main-color border-2"
    : "border-secondary-color border-2 bg-secondary-color"

export const displayUserName = (userUid: string | undefined, messageUserUid: string | undefined, username: string | null | undefined): string => {
    if(username) {
        return userUid === messageUserUid
        ? "invisible"
        : "text-main-color"
    }else {
        return "text-gray-400";        
    }
}

export const justifyBooksSection = (center: boolean): string =>
    center ? "justify-center" : "justify-between"

export const changeBooksGridFlexDirection = (open: boolean): string =>
    open ? "md:flex-row items-center" : "items-center"

export const changeWindowLayout = (openSidebar: boolean): string =>
    openSidebar 
    ? "hidden md:block md:col-span-3" 
    : "h-full md:col-span-full";

export const changeSidebarLayout = (openSidebar: boolean): string =>
    openSidebar 
    ? "h-full md:col-span-1" 
    : "hidden";

export const centerHeaderTitle = (locationPathname: string): string =>
    locationPathname === "/"
    ? "justify-between"
    : "justify-center"

export const hideHeaderButton = (locationPathname: string): string =>
    locationPathname === "/"
    ? ""
    : "hidden"

const highlightBookRoomCard = (openBookRoom: string | null, bookRoomName: string): string =>
    openBookRoom === bookRoomName
    ? "bg-default-bg border-2 border-white text-white"
    : "bg-default-bg border-2 border-main-color text-main-color transition-colors duration-300 md:duration-100 ease-in-out md:hover:bg-main-color md:hover:text-white cursor-pointer"

export const bookRoomCardStyle = (openBookRoom: string | null, bookRoomName: string, removeMode: boolean): string =>
    removeMode 
    ? "bg-default-bg border-2 border-red-500 text-white"
    : highlightBookRoomCard(openBookRoom, bookRoomName)

export const setCursorPointer = (active: string | null): string =>
    active ? "cursor-pointer" : ""

export const defaultButtonLayout = (active: boolean = true): string =>
    active
    ?"w-full max-h-10 text-white text-sm font-semibold flex items-center justify-center py-3 px-4 border-2 border-main-color rounded-lg cursor-pointer transition-colors ease-in-out duration-200 active:bg-main-color md:hover:bg-main-color"
    : "w-full max-h-10 text-gray-500 text-sm font-semibold flex items-center justify-center py-3 px-4 border-2 border-gray-500 rounded-lg"
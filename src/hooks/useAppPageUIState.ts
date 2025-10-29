import { useState, useEffect } from "react";

const useAppPageUIState= () => {

    const sidebarKey: string = import.meta.env.VITE_LOCALSTORAGE_SIDEBAR_KEY;
    const roomKey: string = import.meta.env.VITE_LOCALSTORAGE_CHAT_ROOM_KEY

    const mdBreakpoint: number = 768;

    const [openSidebar, setOpenSidebar] = useState<boolean>(() => {
    const sidebarSavedState: string | null = localStorage.getItem(sidebarKey);
    let initialSidebarState: boolean;
    if(sidebarSavedState !== null) {
        try {
        initialSidebarState = JSON.parse(sidebarSavedState); 
        return initialSidebarState; 
        } catch (e) {
        console.error("Dades de sidebar corruptes a localStorage. Netejant...");
        localStorage.removeItem(sidebarKey); 
        }
    }
    return window.innerWidth > mdBreakpoint; 
    });

    const [displayedWindow, setDisplayedWindow] = useState<string>("")
    
    const [bookRoom, setBookRoom] = useState<string>(() => {
        const savedRoom = localStorage.getItem(roomKey);  
        if (savedRoom) {
            try {
                return savedRoom;
            } catch (e) {
                console.error("Dades de sala corruptes a localStorage. Netejant...");
                localStorage.removeItem(roomKey); 
            }
        }  
        return "";
    });

    useEffect(() => {
        localStorage.setItem(sidebarKey, JSON.stringify(openSidebar));
    }, [openSidebar]);

    useEffect(() => {
        if (bookRoom) {
            localStorage.setItem(roomKey, bookRoom);
        }
    }, [bookRoom])

    return {
        openSidebar, 
        setOpenSidebar,
        bookRoom,
        setBookRoom,
        displayedWindow,
        setDisplayedWindow,
        mdBreakpoint
    }
}

export default useAppPageUIState;

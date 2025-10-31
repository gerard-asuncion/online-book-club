import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectOpenSidebar, selectWindowWidth } from "../features/sidebar/sidebarSelectors";
import { setClose, setOpen, setWindowWidth } from "../features/sidebar/sidebarSlice";
import useMainContentRouter from "./useMainContentRouter";
import useBookRoom from "./useBookRoom";
import type { User } from "firebase/auth";
import { getCurrentUser } from "../utils/firebaseUtils";

const useSidebar = () => {

    const { isChat, switchContent } = useMainContentRouter();
    const { handleSetBookRoom } = useBookRoom();

    const [displayUsername, setDisplayUsername] = useState<string>("unknown");
    const [loadingUsername, setLoadingUsername] = useState<boolean>(true);

    useEffect(() => {
        fetchUserDisplayName();
    }, []);

    const dispatch = useAppDispatch();
    const isOpenSidebar = useAppSelector(selectOpenSidebar);
    const appWindowWidth = useAppSelector(selectWindowWidth);

    const fetchUserDisplayName = async () => {
        try {
            const user: User | null = await getCurrentUser();
            if (user && user.displayName) {
                setDisplayUsername(user.displayName);
            } else {
                setDisplayUsername("Username not found");
            }
        } catch (error){
            console.error("Error obtenint l'usuari:", error);
            setDisplayUsername("Failed loading username");
        } finally {
            setLoadingUsername(false);         
        }
    }

    const showSidebar = (open: boolean) => {
        open ? dispatch(setOpen()) : dispatch(setClose());
    }

    const hideSidebarInMobile = () => {
        const mdBreakpoint: number = 768
        if(appWindowWidth < mdBreakpoint){
            dispatch(setClose());
        }
    }

    const changeStoredWindowWidth = (currentWidth: number) => {
        dispatch(setWindowWidth({windowWidth: currentWidth}));
    }

    const handleBookCardClick = (bookRoomName: string) => {
        if(!isChat){
            switchContent("chat");
        }
        handleSetBookRoom(bookRoomName);
        hideSidebarInMobile();
    }

    return {
        displayUsername,
        loadingUsername,
        isOpenSidebar,
        showSidebar,
        hideSidebarInMobile,
        changeStoredWindowWidth,
        handleBookCardClick
    }
}

export default useSidebar;

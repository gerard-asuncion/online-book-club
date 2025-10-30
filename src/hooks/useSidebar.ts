import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectOpenSidebar, selectWindowWidth } from "../features/sidebar/sidebarSelectors";
import { setClose, setOpen, setWindowWidth } from "../features/sidebar/sidebarSlice";
import useMainContentRouter from "./useMainContentRouter";
import useBookRoom from "./useBookRoom";
import { auth } from '../firebase-config';

const useSidebar = () => {

    const { isChat, switchContent } = useMainContentRouter();
      const { handleSetBookRoom } = useBookRoom();

    const [displayUserName, setDisplayUserName] = useState("unknown user");

    const dispatch = useAppDispatch();
    const isOpenSidebar = useAppSelector(selectOpenSidebar);
    const appWindowWidth = useAppSelector(selectWindowWidth);
    
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

    useEffect(() => {
        if(auth.currentUser && auth.currentUser.displayName){
            setDisplayUserName(auth.currentUser.displayName);
        }else {
            setDisplayUserName("user name not found");
            console.log(auth.currentUser?.displayName);
        }
    }, []);

    return {
        displayUserName,
        isOpenSidebar,
        showSidebar,
        hideSidebarInMobile,
        changeStoredWindowWidth,
        handleBookCardClick
    }
}

export default useSidebar;

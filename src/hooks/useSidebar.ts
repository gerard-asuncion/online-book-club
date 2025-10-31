import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectOpenSidebar, selectWindowWidth } from "../features/sidebar/sidebarSelectors";
import { setClose, setOpen, setWindowWidth } from "../features/sidebar/sidebarSlice";
import useMainContentRouter from "./useMainContentRouter";
import useBookRoom from "./useBookRoom";

const useSidebar = () => {

    const { isChat, switchContent } = useMainContentRouter();
    const { handleSetBookRoom } = useBookRoom();

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

    return {
        isOpenSidebar,
        showSidebar,
        hideSidebarInMobile,
        changeStoredWindowWidth,
        handleBookCardClick
    }
}

export default useSidebar;

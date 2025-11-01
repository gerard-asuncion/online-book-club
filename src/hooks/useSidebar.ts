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

    const showSidebar = (open: boolean): void => {
        open ? dispatch(setOpen()) : dispatch(setClose());
    }

    const hideSidebarInMobile = (): void => {
        const mdBreakpoint: number = 768
        if(appWindowWidth < mdBreakpoint){
            dispatch(setClose());
        }
    }

    const changeStoredWindowWidth = (currentWidth: number): void => {
        dispatch(setWindowWidth({windowWidth: currentWidth}));
    }

    const handleBookCardClick = (bookRoomName: string): void => {
        if(!isChat) return switchContent("chatRoom");
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

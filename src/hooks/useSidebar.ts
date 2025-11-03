import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsMobile, selectOpenSidebar } from "../features/responsive/responsiveSelectors";
import { setCloseSidebar, setOpenSidebar } from "../features/responsive/responsiveSlice";
import useMainContentRouter from "./useMainContentRouter";
import useBookRoom from "./useBookRoom";
import { addTimeout } from "../utils/utils";

const useSidebar = () => {

    const { isChat, switchContent } = useMainContentRouter();
    const { handleSetBookRoom } = useBookRoom();

    const dispatch = useAppDispatch();
    const isOpenSidebar = useAppSelector(selectOpenSidebar);
    const isMobile = useAppSelector(selectIsMobile);

    const showSidebar = (open: boolean): void => {
        if(open){
            dispatch(setOpenSidebar());
        }else if(!open){
            dispatch(setCloseSidebar());
        }
    }

    const hideSidebarInMobile = (): void => {
        if(isMobile){
            const closeDispatch = () => dispatch(setCloseSidebar());
            addTimeout(closeDispatch, 400);
        }
    }

    const handleBookCardClick = (bookRoomName: string): void => {
        handleSetBookRoom(bookRoomName);
        if(!isChat){
            switchContent("chatRoom");
        };
        hideSidebarInMobile();
    }

    return {
        isMobile,
        isOpenSidebar,
        showSidebar,
        hideSidebarInMobile,
        handleBookCardClick,
    }
}

export default useSidebar;

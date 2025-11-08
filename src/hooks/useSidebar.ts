import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsMobile, selectOpenSidebar } from "../features/responsive/responsiveSelectors";
import { setCloseSidebar, setOpenSidebar } from "../features/responsive/responsiveSlice";
import useMainContentRouter from "./useMainContentRouter";
import { addTimeout } from "../utils/utils";

const useSidebar = () => {

    const { isChat, switchContent } = useMainContentRouter();

    const dispatch = useAppDispatch();

    const isOpenSidebar: boolean = useAppSelector(selectOpenSidebar);
    const isMobile: boolean = useAppSelector(selectIsMobile);

    const [removeMode, setRemoveMode] = useState<boolean>(false);

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

    const openChat = (currentBookTitle: string | null): void => {
        if(!isChat && currentBookTitle){
            switchContent("chatRoom");
        };
    }

    return {
        openChat,
        removeMode,
        setRemoveMode,
        isMobile,
        isOpenSidebar,
        showSidebar,
        hideSidebarInMobile
    }
}

export default useSidebar;

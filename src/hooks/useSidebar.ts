import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsMobile, selectOpenSidebar } from "../features/responsive/responsiveSelectors";
import { setCloseSidebar, setOpenSidebar } from "../features/responsive/responsiveSlice";
import useMainContentRouter from "./useMainContentRouter";
import { addTimeout } from "../utils/utils";
import { clearCurrentBook, setCurrentBook } from "../features/currentBook/currentBookSlice";
import useUserData from "./useUserData";

const useSidebar = () => {

    const { isChat, switchContent } = useMainContentRouter();
    const { removeBookFromProfile } = useUserData();

    const dispatch = useAppDispatch();
    const isOpenSidebar = useAppSelector(selectOpenSidebar);
    const isMobile = useAppSelector(selectIsMobile);

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

    const handleBookCardClick = (id: string, title: string, authors: string[], removeMode: boolean) => {

        if(removeMode){
            
            removeBookFromProfile(id);

        } else {

            dispatch(clearCurrentBook());
            dispatch(setCurrentBook({ bookId: id, bookTitle: title, bookAuthors: authors }));
            if(!isChat){
                switchContent("chatRoom");
            };
            hideSidebarInMobile();

        }
    }

    return {
        removeMode,
        setRemoveMode,
        isMobile,
        isOpenSidebar,
        showSidebar,
        hideSidebarInMobile,
        handleBookCardClick,
    }
}

export default useSidebar;

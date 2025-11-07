import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsMobile, selectOpenSidebar } from "../features/responsive/responsiveSelectors";
import { setCloseSidebar, setOpenSidebar } from "../features/responsive/responsiveSlice";
import useMainContentRouter from "./useMainContentRouter";
import { addTimeout } from "../utils/utils";
import { clearCurrentBook, setCurrentBook } from "../features/currentBook/currentBookSlice";
import useUserData from "./useUserData";
import { selectUserProfilePremium } from "../features/userProfile/userProfileSelectors";

const useSidebar = () => {

    const { isChat, switchContent } = useMainContentRouter();
    const { removeBookFromProfile } = useUserData();

    const dispatch = useAppDispatch();

    const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);
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

    const handleBookCardClick = (id: string, title: string, authors: string[], removeMode: boolean) : void => {

        if(removeMode){      
            removeBookFromProfile(id, isPremiumUser);
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
        openChat,
        removeMode,
        setRemoveMode,
        isMobile,
        isOpenSidebar,
        showSidebar,
        hideSidebarInMobile,
        handleBookCardClick
    }
}

export default useSidebar;

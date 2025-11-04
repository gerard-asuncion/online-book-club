import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsMobile, selectOpenSidebar } from "../features/responsive/responsiveSelectors";
import { setCloseSidebar, setOpenSidebar } from "../features/responsive/responsiveSlice";
import useMainContentRouter from "./useMainContentRouter";
import { addTimeout } from "../utils/utils";
import { clearCurrentBook, setCurrentBook } from "../features/currentBook/currentBookSlice";

const useSidebar = () => {

    const { isChat, switchContent } = useMainContentRouter();

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

    const handleBookCardClick = (): void => {
        dispatch(clearCurrentBook());
        const id: string = "1234";
        const title: string = "title";
        const authors: string[] = ["author"]
        dispatch(setCurrentBook({ bookId: id, title: title, authors: authors }));
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

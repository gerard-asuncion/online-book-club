import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectOpenSidebar, selectWindowWidth } from "../features/sidebar/sidebarSelectors";
import { setClose, setOpen, setWindowWidth, setMobileClose } from "../features/sidebar/sidebarSlice";

const useSidebar = () => {

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

    return {
        isOpenSidebar,
        showSidebar,
        hideSidebarInMobile,
        changeStoredWindowWidth
    }
}

export default useSidebar;

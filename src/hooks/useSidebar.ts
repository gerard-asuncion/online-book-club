import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectOpenSidebar } from "../features/sidebar/sidebarSelectors";
import { setClose, setOpen } from "../features/sidebar/sidebarSlice";

const useSidebar = () => {

    const dispatch = useAppDispatch();
    const isOpenSidebar = useAppSelector(selectOpenSidebar);
    
    const showSidebar = (open: boolean) => {
        open ? dispatch(setOpen()) : dispatch(setClose());
    }

    const mobileHideSidebar = (breakpoint: number): void => {
        if(window.innerWidth > breakpoint){
            setClose();
        }
    }

    return {
        isOpenSidebar,
        showSidebar,
        mobileHideSidebar
    }
}

export default useSidebar;

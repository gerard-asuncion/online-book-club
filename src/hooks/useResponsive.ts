import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { mdBreakpoint, setIsMobile, setIsNotMobile } from "../features/responsive/responsiveSlice";
import { selectIsMobile } from "../features/responsive/responsiveSelectors";

const useResponsive = () => {

    const dispatch = useAppDispatch();
    const isMobile: boolean = useAppSelector(selectIsMobile);

    const handleResize = useCallback((): void => {

        const currentIsMobile: boolean = window.innerWidth < mdBreakpoint;

            if (currentIsMobile) {
                dispatch(setIsMobile());
            } else {
                dispatch(setIsNotMobile());
          }

    }, [dispatch]);
    
    useEffect(() => {

        window.addEventListener('resize', handleResize);

        handleResize(); 

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [handleResize]); 
      
  return { isMobile }
}

export default useResponsive;

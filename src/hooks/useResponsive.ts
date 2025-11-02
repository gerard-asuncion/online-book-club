import { useAppSelector } from "../app/hooks";
import { selectWindowWidth, selectIsMobile } from "../features/responsive/responsiveSelectors";
import { setWindowWidth, setIsMobile, setIsNotMobile } from "../features/responsive/responsiveSlice";
import { useDispatch } from "react-redux";

const useResponsive = () => {

  const appWindowWidth: number = useAppSelector(selectWindowWidth);
  const isMobile: boolean = useAppSelector(selectIsMobile);
  const dispatch = useDispatch();

  const mdBreakpoint: number = 768;

  const detectMobileScreen = () => {
    if(appWindowWidth > mdBreakpoint){
      dispatch(setIsNotMobile())
    } else {
      dispatch(setIsMobile());
    }
  }

  const changeStoredWindowWidth = (currentWidth: number): void => {
    dispatch(setWindowWidth({windowWidth: currentWidth}));
  }

  return { isMobile, detectMobileScreen, changeStoredWindowWidth }

}
export default useResponsive;

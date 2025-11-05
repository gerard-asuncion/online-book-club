import { useEffect, useCallback } from "react";
import Header from "../components/ui/Header";
import Sidebar from "../components/form/Sidebar";
import MainContentRouter from "../components/ui/MainConentRouter";
import ScreenFrame from "../components/ui/ScreenFrame";
import useUserData from "../hooks/useUserData";
import useSidebar from "../hooks/useSidebar";
import { useAppDispatch } from "../app/hooks";
import { mdBreakpoint } from "../features/responsive/responsiveSlice";
import { setIsMobile, setIsNotMobile } from "../features/responsive/responsiveSlice";
import { changeWindowLayout, changeSidebarLayout } from "../utils/classNameUtils";

function AppPage() {

  const dispatch = useAppDispatch();

  const { isOpenSidebar } = useSidebar();
  const { user, isLoadingUser } = useUserData();

  const handleResize = useCallback(() => {
      const currentIsMobile = window.innerWidth < mdBreakpoint;  
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

  return (
    <ScreenFrame page="full">
        <Header />
        <section className="md:grid md:grid-cols-4 grow overflow-hidden">
            <div className={`
              ${changeWindowLayout(isOpenSidebar)}
              overflow-hidden`}>
                <MainContentRouter user={user} />
            </div>
            <div className={`
              ${changeSidebarLayout(isOpenSidebar)}
              md:border-l-4
              border-main-color
              overflow-y-auto
              px-5`}>
                <Sidebar user={user} isLoadingUser={isLoadingUser} />
            </div>
        </section>
    </ScreenFrame>
  )
}

export default AppPage
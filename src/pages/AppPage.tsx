import { useEffect } from "react";
import Header from "../components/ui/Header";
import Sidebar from "../components/form/Sidebar";
import MainContentRouter from "../components/ui/MainConentRouter";
import ScreenFrame from "../components/ui/ScreenFrame";
import useSidebar from "../hooks/useSidebar";
import useResponsive from "../hooks/useResponsive";
import { 
  changeWindowLayout, 
  changeSidebarLayout } from "../utils/classNameUtils";

function AppPage() {

  const windowSize: number = window.innerWidth;

  const { isOpenSidebar } = useSidebar();
  const { detectMobileScreen, changeStoredWindowWidth } = useResponsive();

  useEffect(()  => {
    changeStoredWindowWidth(windowSize);
    detectMobileScreen();
  }, [windowSize]);

  return (
    <ScreenFrame page="full">
        <Header />
        <section className="md:grid md:grid-cols-4 grow overflow-hidden">
            <div className={`
              ${changeWindowLayout(isOpenSidebar)}
              overflow-hidden`}>
                <MainContentRouter />
            </div>
            <div className={`
              ${changeSidebarLayout(isOpenSidebar)}
              md:border-l-10
              border-green-800
              overflow-y-auto
              px-4`}>
                <Sidebar />
            </div>
        </section>
    </ScreenFrame>
  )
}

export default AppPage
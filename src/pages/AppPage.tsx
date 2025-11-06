import Header from "../components/ui/Header";
import Sidebar from "../components/form/Sidebar";
import MainContentRouter from "../components/ui/MainConentRouter";
import ScreenFrame from "../components/ui/ScreenFrame";
import useUserData from "../hooks/useUserData";
import useSidebar from "../hooks/useSidebar";
import useResponsive from "../hooks/useResponsive";
import { changeWindowLayout, changeSidebarLayout } from "../utils/classNameUtils";

function AppPage() {

  const { isOpenSidebar } = useSidebar();
  const { isLoadingUser } = useUserData();

  useResponsive();

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
              md:border-l-4
              border-main-color
              overflow-y-auto
              px-5`}>
                <Sidebar isLoadingUser={isLoadingUser} />
            </div>
        </section>
    </ScreenFrame>
  )
}

export default AppPage;
import Header from "../components/ui/Header";
import Sidebar from "../components/form/Sidebar";
import AppWindow from "../components/ui/AppWindow";
import ScreenFrame from "../components/ui/ScreenFrame";
import useAppPageUIState from "../hooks/useAppPageUIState";
import { 
  changeWindowLayout, 
  changeSidebarLayout } from "../utils/classNameUtils";

function AppPage() {
 
  const { openSidebar, 
        setOpenSidebar,
        bookRoom,
        setBookRoom,
        displayedWindow,
        setDisplayedWindow,
        mdBreakpoint } = useAppPageUIState();

  return (
    <ScreenFrame page="full">
        <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <section className="md:grid md:grid-cols-3 grow overflow-hidden">
            <div className={`
              ${changeWindowLayout(openSidebar)}
              overflow-hidden`}>
                <AppWindow
                  displayedWindow={displayedWindow}
                  bookRoom={bookRoom} />
            </div>
            <div className={`
              ${changeSidebarLayout(openSidebar)}
              bg-green-600
              overflow-hidden
              px-4`}>
                <Sidebar 
                  setOpenSidebar={setOpenSidebar}
                  setDisplayedWindow={setDisplayedWindow}
                  setBookRoom={setBookRoom}
                  mdBreakpoint={mdBreakpoint} />
            </div>
        </section>
    </ScreenFrame>
  )
}

export default AppPage
import { useEffect, useState } from "react";
import Header from "../components/ui/Header";
import Sidebar from "../components/form/Sidebar";
import Window from "../components/ui/Window";
import Screen from "../components/ui/Screen";
import { 
  changeWindowLayout, 
  changeSidebarLayout } from "../utils/classNameUtils";

function AppPage() {

  const mdBreakpoint: number = 768;

  const [bookRoom, setBookRoom] = useState<string>("");
  const [openSidebar, setOpenSidebar] = useState<boolean>(() => {

    const savedState = localStorage.getItem("sidebarOpen");

    if (savedState !== null) {
      return JSON.parse(savedState); 
    }
    
    return window.innerWidth > mdBreakpoint; 
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(openSidebar));
  }, [openSidebar]);

  return (
    <Screen page="full">
        <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <section className="md:grid md:grid-cols-3 h-screen">
            <div className={`
              ${changeWindowLayout(openSidebar)}
              bg-amber-500`}>
                <Window bookRoom={bookRoom} />
            </div>
            <div className={`
              ${changeSidebarLayout(openSidebar)}
            bg-green-600`}>
                <Sidebar 
                  setOpenSidebar={setOpenSidebar} 
                  setBookRoom={setBookRoom}
                  mdBreakpoint={mdBreakpoint} />
            </div>
        </section>
    </Screen>
  )
}

export default AppPage
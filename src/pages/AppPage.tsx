import { useEffect, useState } from "react";
import Header from "../components/ui/Header";
import Sidebar from "../components/form/Sidebar";
import Window from "../components/ui/Window";
import Screen from "../components/ui/Screen";
import { 
  changeWindowLayout, 
  changeSidebarLayout } from "../utils/classNameUtils";

function AppPage() {

  const sidebarKey: string = import.meta.env.VITE_LOCALSTORAGE_SIDEBAR_KEY;
  const roomKey: string = import.meta.env.VITE_LOCALSTORAGE_CHAT_ROOM_KEY

  const mdBreakpoint: number = 768;

  const [openSidebar, setOpenSidebar] = useState<boolean>(() => {
    const sidebarSavedState: string | null = localStorage.getItem(sidebarKey);
    let initialSidebarState: boolean;
    if(sidebarSavedState !== null) {
      try {
        initialSidebarState = JSON.parse(sidebarSavedState); 
        return initialSidebarState; 
      } catch (e) {
        console.error("Dades de sidebar corruptes a localStorage. Netejant...");
        localStorage.removeItem(sidebarKey); 
      }
    }
    return window.innerWidth > mdBreakpoint; 
  });

  const [bookRoom, setBookRoom] = useState<string>(() => {
    const savedRoom = localStorage.getItem(roomKey);  
    if (savedRoom) {
        try {
          return savedRoom;
        } catch (e) {
          console.error("Dades de sala corruptes a localStorage. Netejant...");
          localStorage.removeItem(roomKey); 
        }
    }  
    return "";
  });

  useEffect(() => {
    localStorage.setItem(sidebarKey, JSON.stringify(openSidebar));
  }, [openSidebar]);

  useEffect(() => {
    if (bookRoom) {
        localStorage.setItem(roomKey, bookRoom);
    }
  }, [bookRoom])

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
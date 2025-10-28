import { useState } from "react";
import Header from "../components/ui/Header";
import Sidebar from "../components/form/Sidebar";
import Window from "../components/ui/Window";
import Screen from "../components/ui/Screen";
import { 
  changeWindowLayout, 
  changeSidebarLayout } from "../utils/classNameUtils";

function AppPage() {

  const [bookRoom, setBookRoom] = useState<string>("");
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

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
                <Sidebar setBookRoom={setBookRoom} />
            </div>
        </section>
    </Screen>
  )
}

export default AppPage
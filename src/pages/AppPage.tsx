import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Window from "../components/Window";
import Screen from "../components/Screen";

function AppPage() {

  const [bookRoom, setBookRoom] = useState<string>("")

  return (
    <Screen page="full">
        <Header />
        <section className="sm:grid sm:grid-cols-3 h-full">
            <div className="sm:col-span-2 bg-amber-500">
                <Window bookRoom={bookRoom} />
            </div>
            <div className="hidden sm:block bg-green-600">
                <Sidebar setBookRoom={setBookRoom} />
            </div>
        </section>
    </Screen>
  )
}

export default AppPage
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Window from "./components/Window";

function App() {

  const [bookRoom, setBookRoom] = useState<string>("")

  return (
    <main className="h-screen">
      <Header />
      <section className="sm:grid sm:grid-cols-3 h-full">
        <div className="sm:col-span-2 bg-amber-500">
          <Window room={bookRoom} />
        </div>
        <div className="hidden sm:block bg-green-600">
          <Sidebar setBookRoom={setBookRoom} />
        </div>
      </section>
    </main> 
  )
}

export default App

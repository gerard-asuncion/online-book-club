import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Window from "./components/Window";
import Auth from "./components/Auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function App() {

  const [isAuth, setIsAuth] = useState<boolean>(cookies.get("auth-token"));
  const [bookRoom, setBookRoom] = useState<string>("")

  if(!isAuth){
    return <Auth setIsAuth={setIsAuth} />
  }

  return (
    <main className="h-screen">
      <Header />
      <section className="sm:grid sm:grid-cols-3 h-full">
        <div className="sm:col-span-2 bg-amber-500">
          <Window bookRoom={bookRoom} />
        </div>
        <div className="hidden sm:block bg-green-600">
          <Sidebar setBookRoom={setBookRoom} />
        </div>
      </section>
    </main> 
  )
}

export default App

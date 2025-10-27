import Button from "./Button";
import useAuth from "../hooks/useAuth";
import type { SidebarProps } from "../types/props";

const Sidebar = ({ setBookRoom }: SidebarProps) => {

    const { userSignOut } = useAuth()
  
    return (
    <div>
        <ul>
            <li className="cursor-pointer">
                <button onClick={() => {setBookRoom("book1")}}>
                    Book 1
                </button>
            </li>
            <li className="cursor-pointer">
                <button onClick={() => setBookRoom("book2")}>
                    Book 2
                </button>
            </li>
            <li className="cursor-pointer">
                <button onClick={() => setBookRoom("book3")}>
                    Book 3
                </button>
            </li>
        </ul>
        <Button onClick={userSignOut}>
            Sign Out
        </Button>
    </div>
  )
}

export default Sidebar

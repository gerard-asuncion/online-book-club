import Button from "../ui/Button";
import useAuth from "../../hooks/useAuth";
import type { SidebarProps } from "../../types/props";

const Sidebar = ({ setOpenSidebar, setBookRoom, mdBreakpoint }: SidebarProps) => {

    const { userSignOut } = useAuth()

    const closeSidebar = (): void => {
        if(window.innerWidth < mdBreakpoint){
            setOpenSidebar(false);
        }
    }
  
    return (
    <div className="h-full flex flex-col justify-center">
        <ul>
            <li className="cursor-pointer">
                <button onClick={() => {
                    setBookRoom("book1");
                    closeSidebar();
                    }}>
                    Book 1
                </button>
            </li>
            <li className="cursor-pointer">
                <button onClick={() => {
                    setBookRoom("book2");
                    closeSidebar();
                    }}>
                    Book 2
                </button>
            </li>
            <li className="cursor-pointer">
                <button onClick={() => {
                    setBookRoom("book3");
                    closeSidebar();
                    }}>
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

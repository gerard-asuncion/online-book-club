import type { SidebarProps } from "../types/props"

const Sidebar = ({setBookRoom}: SidebarProps) => {
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
    </div>
  )
}

export default Sidebar

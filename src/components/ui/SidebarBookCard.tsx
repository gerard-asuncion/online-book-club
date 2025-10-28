import type { SidebarBookCardProps } from "../../types/props";

const SidebarBookCard = ({ children, setBookRoom, hideSidebar  }: SidebarBookCardProps) => {
  return (
    <li className="flex justify-center items-center border-2 col-span-1 bg-white">
        <button onClick={() => {setBookRoom(children); hideSidebar();}}
            className="flex p-3">
            <div className="mr-2">
                Chat room for: 
            </div>
            <div className="font-bold">
                {children}
            </div>
        </button>
    </li>
  )
}

export default SidebarBookCard;
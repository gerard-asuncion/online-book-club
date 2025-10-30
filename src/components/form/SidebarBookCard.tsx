import useBookRoom from "../../hooks/useBookRoom";
import useSidebar from "../../hooks/useSidebar";
import type { SidebarBookCardProps } from "../../types/props";

const SidebarBookCard = ({ children }: SidebarBookCardProps) => {

  const { handleSetBookRoom } = useBookRoom();
  const { hideSidebarInMobile } = useSidebar();

  return (
    <li className="flex justify-center items-center border-2 row-span-1 bg-white">
        <button onClick={() => {
          handleSetBookRoom(children);
          hideSidebarInMobile();}}
            className="md:flex p-3 cursor-pointer">
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
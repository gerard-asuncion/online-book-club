import useBookRoom from "../../hooks/useBookRoom";
import useSidebar from "../../hooks/useSidebar";
import type { SidebarBookCardProps } from "../../types/props";

const SidebarBookCard = ({ children }: SidebarBookCardProps) => {

  const { handleSetBookRoom } = useBookRoom();
  const { mobileHideSidebar } = useSidebar();

  const mdBreakpoint: number = 768;

  return (
    <li className="flex justify-center items-center border-2 col-span-1 bg-white">
        <button onClick={() => {
          handleSetBookRoom(children);
          mobileHideSidebar(mdBreakpoint);}}
            className="md:flex p-3">
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
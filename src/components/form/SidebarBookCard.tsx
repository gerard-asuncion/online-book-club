import useSidebar from "../../hooks/useSidebar";
import { showHideAnything } from "../../utils/classNameUtils";
import type { SidebarBookCardProps } from "../../types/props";
import useUnreadCounter from "../../hooks/useUnreadCounter";

const SidebarBookCard = ({ children, user }: SidebarBookCardProps) => {

  const { unreadCount } = useUnreadCounter(children, user);
 
  const { handleBookCardClick } = useSidebar();

  return (
    <li className="flex justify-center items-center row-span-1 bg-white">
        <button 
          onClick={() => {
            handleBookCardClick(children);
          }}
          className="md:flex md:justify-between p-3 cursor-pointer">
            <div className="mr-2">
                Chat room for: 
            </div>
            <div className="font-bold mr-4">
                {children}
            </div>
            <div className={`
                    ${showHideAnything(unreadCount)}
                    flex
                    justify-center
                    items-center
                    rounded-full
                    bg-red-500
                    h-6
                    w-6
                    text-white
                    font-bold`}>
              {unreadCount}
            </div>
        </button>
    </li>
  )
}

export default SidebarBookCard;
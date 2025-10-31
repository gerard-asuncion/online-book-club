import useSidebar from "../../hooks/useSidebar";
import { showHideAnything } from "../../utils/classNameUtils";
import type { SidebarBookCardProps } from "../../types/props";
import useUnreadCounter from "../../hooks/useUnreadCounter";

const SidebarBookCard = ({ children, user }: SidebarBookCardProps) => {

  const { unreadCount } = useUnreadCounter(children, user);
 
  const { handleBookCardClick } = useSidebar();

  return (
    <li className="
          row-span-1
          h-full">
        <button 
          onClick={() => {
            handleBookCardClick(children);
          }}
          className="
            h-full
            w-full
            md:flex 
            md:justify-start
            md:items-center
            p-3 
            bg-white
            hover:bg-gray-900
            hover:text-white
            cursor-pointer">
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
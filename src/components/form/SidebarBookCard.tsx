import useSidebar from "../../hooks/useSidebar";
import { showHideAnything } from "../../utils/classNameUtils";
import type { SidebarBookCardProps } from "../../types/props";
import useUnreadCounter from "../../hooks/useUnreadCounter";

const SidebarBookCard = ({ children, user }: SidebarBookCardProps) => {

  const bookRoomName: string = children.title;

  const { unreadCount } = useUnreadCounter(bookRoomName, user);
 
  const { handleBookCardClick } = useSidebar();

  return (
    <li className="
          row-span-1
          h-full">
        <button 
          onClick={() => {
            handleBookCardClick(bookRoomName);
          }}
          className="
            h-full
            w-full
            flex 
            justify-between
            items-center
            px-4
            py-1
            bg-white
            hover:bg-gray-900
            hover:text-white
            cursor-pointer">
            <section className="flex flex-col items-start justify-center">
              <div className="font-bold">
                {children.title}
              </div>
              <div className="text-sm">
                {children.author}
              </div>
            </section>
            <div className={`
                    ${showHideAnything(unreadCount)}
                    flex
                    justify-center
                    items-center
                    rounded-full
                    h-6
                    w-6
                    bg-gray-900
                    text-white
                    font-bold`}>
              {unreadCount}
            </div>
        </button>
    </li>
  )
}

export default SidebarBookCard;
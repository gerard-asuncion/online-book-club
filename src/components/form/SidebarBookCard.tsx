import useSidebar from "../../hooks/useSidebar";
import { showHideAnything, highlightBookRoomCard } from "../../utils/classNameUtils";
import type { SidebarBookCardProps } from "../../types/props";
import useUnreadCounter from "../../hooks/useUnreadCounter";
import useBookRoom from "../../hooks/useBookRoom";

const SidebarBookCard = ({ children, user }: SidebarBookCardProps) => {

  const bookRoomName: string = children.title;
  
  const { bookRoom } = useBookRoom();
  const { unreadCount, setUnreadCount } = useUnreadCounter(bookRoomName, user);
  const { handleBookCardClick } = useSidebar();

  const openBookRoom = bookRoom;

  return (
    <li className="
          row-span-1
          h-full">
        <button 
          onClick={() => {
            handleBookCardClick(bookRoomName);
            setUnreadCount(0);
          }}
          className={`
            ${highlightBookRoomCard(openBookRoom, bookRoomName)}
            h-full
            w-full
            flex 
            justify-between
            items-center
            px-4
            py-1
            rounded-lg
            cursor-pointer
          `}>
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
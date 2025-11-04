import useSidebar from "../../hooks/useSidebar";
import { showHideAnything, highlightBookRoomCard } from "../../utils/classNameUtils";
import type { SidebarBookCardProps } from "../../types/props";
import useUnreadCounter from "../../hooks/useUnreadCounter";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentBookId } from "../../features/currentBook/currentBookSelectors";

const SidebarBookCard = ({ children, displayedBookId, user }: SidebarBookCardProps) => {

  const currentBookId = useAppSelector(selectCurrentBookId);
  
  const { unreadCount, setUnreadCount } = useUnreadCounter(displayedBookId, user);
  const { handleBookCardClick } = useSidebar();

  return (
    <li className="
          row-span-1
          h-full">
        <button 
          onClick={() => {
            handleBookCardClick();
            setUnreadCount(0);
          }}
          className={`
            ${highlightBookRoomCard(currentBookId, displayedBookId)}
            h-full
            w-full
            flex 
            justify-between
            items-center
            px-4
            py-2
            rounded-lg
          `}>
            <section className="flex flex-col items-start justify-center text-left">
              <div className="font-bold">
                Title: {children}
              </div>
              <div className="text-sm">
                Author: {children}
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
                    bg-main-color
                    text-white
                    font-bold
                    `}>
              {unreadCount}
            </div>
        </button>
    </li>
  )
}

export default SidebarBookCard;
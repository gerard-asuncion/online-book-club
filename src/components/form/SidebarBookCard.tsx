import useSidebar from "../../hooks/useSidebar";
import useUnreadCounter from "../../hooks/useUnreadCounter";
import { bookCardTitle, bookCardAuthors } from "../../utils/utils";
import { showHideAnything, highlightBookRoomCard } from "../../utils/classNameUtils";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentBookId } from "../../features/currentBook/currentBookSelectors";
import { selectUserProfilePremium } from "../../features/userProfile/userProfileSelectors";
import type { SidebarBookCardProps } from "../../types/props";

const SidebarBookCard = ({ cardStoredBook, removeMode }: SidebarBookCardProps) => {

  const currentBookId = useAppSelector(selectCurrentBookId);
  const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);

  const cardStoredBookId: string = cardStoredBook.id;
  const cardStoredBookTitle: string = cardStoredBook.volumeInfo.title;
  const cardStoredBookAuthors: string[] = cardStoredBook.volumeInfo.authors;

  const { handleBookCardClick } = useSidebar();
  const { unreadCount, setUnreadCount } = useUnreadCounter(currentBookId);

  if(!isPremiumUser){
    return null;
  }

  return (
    <li className="min-h-[50px] mb-2">
        <button 
          onClick={() => {
            handleBookCardClick(cardStoredBookId, cardStoredBookTitle, cardStoredBookAuthors, removeMode);
            setUnreadCount(0);
          }}
          className={`
            ${highlightBookRoomCard(currentBookId, cardStoredBookId, removeMode)}
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
              <div className="font-semibold">
                {bookCardTitle(cardStoredBookTitle)}
              </div>
              <div className="text-sm">
                {bookCardAuthors(cardStoredBookAuthors)}
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
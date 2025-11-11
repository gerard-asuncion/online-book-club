import useUnreadCount from "../../hooks/useUnreadCount";
import useGridBookCard from "../../hooks/useGridBookCard";
import { showHideAnything } from "../../utils/classNameUtils";
import type { GridBookCardProps } from "../../types/props";

const GridBookCard = ( { currentBook, isChatHistorial }: GridBookCardProps ) => {

    const currentBookId: string = currentBook.id;

    const { unreadCount, setUnreadCount } = useUnreadCount(currentBookId);
    const { handleVolumeSelection, handleHistorialVolumeSelection } = useGridBookCard();

    const switchFunction = () => {
        if(isChatHistorial){
            handleHistorialVolumeSelection(currentBook.id, currentBook.volumeInfo.title, currentBook.volumeInfo.authors);
            setUnreadCount(0);
        }else{
            handleVolumeSelection(currentBook.id, currentBook.volumeInfo.title, currentBook.volumeInfo.authors);
            setUnreadCount(0);
        }
    }

    return (
        <li 
            className="col-span-1 mb-10 flex flex-col items-center"
            key={currentBook.id}
        >
            <button 
                onClick={switchFunction} 
                className="cursor-pointer flex flex-col justify-center items-start gap-1 w-70/100 aspect-2/3"
            >
                <img
                className="w-full h-full object-cover"
                src={currentBook.volumeInfo.imageLinks?.thumbnail} 
                alt={currentBook.volumeInfo.title} 
            />
                <div className="text-left">
                    <strong>{currentBook.volumeInfo.title}</strong>
                    <p
                    className="text-main-color"
                    >
                    {currentBook.volumeInfo.authors?.join(', ')}
                    </p>
                </div>
                <div className={`
                    ${showHideAnything(unreadCount)}
                    flex
                    gap-2
                    text-white
                    p-1
                    text-sm
                    font-semibold
                `}>
                    <p className="">Unread:</p>
                    <div className="
                        flex
                        justify-center
                        items-center
                        rounded-full
                        h-6
                        w-6
                        bg-main-color
                        font-bold"
                    >
                        {unreadCount}
                    </div>
            </div>
            </button>
        </li>
    )
}

export default GridBookCard;

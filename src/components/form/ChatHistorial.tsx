import MainContentFrame from "../ui/MainContentFrame";
import useChatHistorial from "../../hooks/useChatHistorial";
import { useEffect } from "react";

const ChatHistorial = () => {

    const { 
        userHistorialBooks, 
        setUserHistorialBooks,
        isLoadingHistorial, 
        handleBookClick,
        getHistorialBooks,
    } = useChatHistorial();

    useEffect(() => {
        setUserHistorialBooks([]);
        getHistorialBooks();
    }, []);
  
    return (
        <MainContentFrame>
        <section className="h-full w-full p-10 text-white">
            <div className="flex justify-center items-center font-xl text-main-color font-bold p-4 my-5">
                Chat Historial
            </div>          
            <ul className="flex flex-col justify-start items-center gap-5">
                {isLoadingHistorial && <div>Loading...</div>}
                {userHistorialBooks.map(room =>
                    <li
                        key={room.id}
                        className=""
                    >
                        <button
                            className="hover:text-main-color cursor-pointer"
                            onClick={() => {
                                handleBookClick(room.id, room.volumeInfo.title, room.volumeInfo.authors);
                            }}>
                            {room.volumeInfo.title}
                        </button>
                    </li>
            )}
            </ul>
        </section>
        </MainContentFrame>
    )
}

export default ChatHistorial;

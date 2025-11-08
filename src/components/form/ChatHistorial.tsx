import MainContentFrame from "../ui/MainContentFrame";
import useChatHistorial from "../../hooks/useChatHistorial";
import { useEffect } from "react";

const ChatHistorial = () => {

    const { 
        userHistorialBooks, 
        isLoadingHistorial, 
        handleBookClick,
        getHistorialBooks,
    } = useChatHistorial();

    useEffect(() => {
        getHistorialBooks();
    }, []);
  
    return (
        <MainContentFrame>
        <section className="h-full w-full p-10 text-white">
            <h2>Chat Historial</h2>          
            <article>
            <div>
                <div>Chats:</div>
                {isLoadingHistorial && <div>Loading...</div>}
                {userHistorialBooks.map(room =>
                <div key={room.id}>
                <button onClick={() => {
                    handleBookClick(room.id, room.volumeInfo.title, room.volumeInfo.authors);
                }}>
                    {room.volumeInfo.title}
                </button>
                </div>
            )}
            </div>
            </article>
        </section>
        </MainContentFrame>
    )
}

export default ChatHistorial;

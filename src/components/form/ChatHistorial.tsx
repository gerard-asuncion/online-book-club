import { useEffect } from "react";
import MainContentFrame from "../ui/MainContentFrame";
import useChatHistorial from "../../hooks/useChatHistorial";
import type { BookItem } from "../../types/booksTypes";
import GridBookCard from "../ui/GridBookCard";

const ChatHistorial = () => {

    const { 
        userHistorialBooks,
        userHistorialBooksStatus,
        userHistorialBooksError, 
        getHistorialBooks,
    } = useChatHistorial();

    useEffect(() => {
        getHistorialBooks();
    }, [getHistorialBooks]);
  
    return (
        <MainContentFrame>
            <section className="h-full w-full p-10 text-white min-h-0
            overflow-y-auto
            scrollbar">
                <div className="flex justify-center items-center font-xl text-main-color font-bold p-4 my-5">
                    Chat Historial
                </div>
                <ul className="grid grid-cols-2 md:grid-cols-5">
                    {userHistorialBooksStatus === "loading" && <li>Loading...</li>}
                    {userHistorialBooksError === "loading" && <li>{userHistorialBooksError}</li>}
                    {userHistorialBooks.map((book: BookItem) => (
                        <GridBookCard currentBook={book} isChatHistorial={true} />
                    ))}
                </ul>          
            </section>
        </MainContentFrame>
    )
}

export default ChatHistorial;

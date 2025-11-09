import MainContentFrame from "../ui/MainContentFrame";
import useChatHistorial from "../../hooks/useChatHistorial";
import { useEffect } from "react";
import type { BookItem } from "../../types/booksTypes";

const ChatHistorial = () => {

    const { 
        userHistorialBooks,
        userHistorialBooksStatus,
        userHistorialBooksError, 
        handleBookClick,
        getHistorialBooks,
    } = useChatHistorial();

    useEffect(() => {
        getHistorialBooks();
    }, [getHistorialBooks]);
  
    return (
        <MainContentFrame>
            <section className="h-full w-full p-10 text-white">
                <div className="flex justify-center items-center font-xl text-main-color font-bold p-4 my-5">
                    Chat Historial
                </div>
                <ul className="grid grid-cols-2 md:grid-cols-5">
                    {userHistorialBooksStatus === "loading" && <li>Loading...</li>}
                    {userHistorialBooksError === "loading" && <li>{userHistorialBooksError}</li>}
                    {userHistorialBooks.map((book: BookItem) => (
                    <li 
                        className="col-span-1 mb-10 flex flex-col items-center"
                        key={book.id}
                    >
                        <button 
                            onClick={() => {
                                handleBookClick(book.id, book.volumeInfo.title, book.volumeInfo.authors);
                            }}
                            className="cursor-pointer flex flex-col justify-center items-start gap-1 w-70/100 aspect-2/3"
                        >
                            <img
                            className="w-full h-full object-cover"
                            src={book.volumeInfo.imageLinks?.thumbnail} 
                            alt={book.volumeInfo.title} 
                            />
                        <div className="text-left">
                            <strong>{book.volumeInfo.title}</strong>
                            <p
                            className="text-main-color"
                            >
                            {book.volumeInfo.authors?.join(', ')}
                            </p>
                        </div>
                        </button>
                    </li>
                    ))}
                </ul>          
            </section>
        </MainContentFrame>
    )
}

export default ChatHistorial;

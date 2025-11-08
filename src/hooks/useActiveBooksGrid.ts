import { useState } from 'react';
import { 
    collection, 
    CollectionReference, 
    getDocs, 
    query, 
    QuerySnapshot, 
    type DocumentData, 
    type Query 
} from 'firebase/firestore';
import { db } from '../firebase-config';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearGoogleBooksSearch, fetchBooksByIds } from '../features/googleBooks/googleBooksSlice';
import { selectGoogleBooksVolumes, selectGoogleBooksStatus, selectGoogleBooksError } from '../features/googleBooks/googleBooksSelectors';
import type { SentMessage } from '../types/messageTypes';
import type { BookItem } from '../types/booksTypes';

const MESSAGES_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_MESSAGES;

const useActiveBooksGrid = () => {

    const dispatch = useAppDispatch();

    const allActiveBooks: BookItem[] = useAppSelector(selectGoogleBooksVolumes);
    const allActiveBooksStatus: string = useAppSelector(selectGoogleBooksStatus);
    const allActiveBooksError: string | null = useAppSelector(selectGoogleBooksError);

    const [search, setSearch] = useState<string>("");
    const [resultsBooks, setResultsBooks] = useState<BookItem[]>();

    const getAllRoomIds = async (): Promise<string[]> => {
        try {
            const messagesRef: CollectionReference<DocumentData, DocumentData> = 
                collection(db, MESSAGES_COLLECTION);
            const queryMessages: Query<DocumentData, DocumentData> = 
                query(messagesRef);
            const querySnapshot: QuerySnapshot<DocumentData, DocumentData> = 
                await getDocs(queryMessages);

            const roomIds: Set<string> = new Set<string>();

            querySnapshot.forEach((document) => {
                const message: SentMessage = document.data() as SentMessage;
                if (message.room) roomIds.add(message.room);
            });
            return Array.from(roomIds);

        } catch (error) {
            console.error("Error fetching room ids:", error);
            return [];
        }
    };

    const getActiveBooks = async (): Promise<void> => {
        setResultsBooks([]);
        dispatch(clearGoogleBooksSearch());
        const allRoomIds: string[] = await getAllRoomIds();
        dispatch(fetchBooksByIds(allRoomIds));
    }

    const showResults = (): BookItem[] => {
        if(!resultsBooks || !resultsBooks.length){
            return allActiveBooks;
        }else{
            return resultsBooks;
        }
    }

    const handleActiveBooksSearch = (e: React.FormEvent, search: string): void => {
        e.preventDefault();
        if(!search.trim()) return;
        const foundTitles: BookItem[] = allActiveBooks.filter(book => book.volumeInfo.title.toLowerCase().includes(search.toLowerCase()))
        const foundAuthors: BookItem[] = allActiveBooks.filter(book => book.volumeInfo.authors?.some(author => author.toLowerCase().includes(search.toLowerCase())));
        const foundBooks: BookItem[] = [...new Set([...foundTitles, ...foundAuthors])]
        if(!foundBooks.length) alert("No books were found matching this search.");
        setResultsBooks(foundBooks);
    }
    
    return { allActiveBooks, allActiveBooksStatus, allActiveBooksError, getActiveBooks, search, setSearch, handleActiveBooksSearch, showResults }
}

export default useActiveBooksGrid;

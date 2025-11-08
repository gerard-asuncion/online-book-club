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
import { fetchBooksByIds } from '../features/googleBooks/googleBooksSlice';
import { selectGoogleBooksVolumesById } from '../features/googleBooks/googleBooksSelectors';
import type { SentMessage } from '../types/messageTypes';
import type { BookItem } from '../types/booksTypes';

const MESSAGES_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_MESSAGES;

const useActiveBooksGrid = () => {

    const dispatch = useAppDispatch();

    const allActiveBooks: BookItem[] = useAppSelector(selectGoogleBooksVolumesById)

    const [isLoadingBooks, setIsLoadingBooks] = useState<boolean>(false);

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
        setIsLoadingBooks(true);
        const allRoomIds: string[] = await getAllRoomIds();
        dispatch(fetchBooksByIds(allRoomIds));
        console.log(allActiveBooks);
        setIsLoadingBooks(false);
    }

    return { allActiveBooks, isLoadingBooks, getActiveBooks }
}

export default useActiveBooksGrid;

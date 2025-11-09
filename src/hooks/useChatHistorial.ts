import { useCallback } from 'react';
import { clearCurrentBook, setCurrentBook } from "../features/currentBook/currentBookSlice";
import { selectGoogleBooksVolumes, selectGoogleBooksStatus, selectGoogleBooksError } from "../features/googleBooks/googleBooksSelectors";
import useMainContentRouter from "./useMainContentRouter";
import { doc, DocumentReference, DocumentSnapshot, getDoc, type DocumentData } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { fetchBooksByIds, clearGoogleBooksSearch } from '../features/googleBooks/googleBooksSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import type { UserProfileType } from '../types/types';
import type { BookItem } from '../types/booksTypes';

const USERS_COLLECTION: string = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;

const useChatHistorial = () => {

    const userProfileUid: string | undefined = auth.currentUser?.uid;

    const dispatch = useAppDispatch();

    const userHistorialBooks: BookItem[] = useAppSelector(selectGoogleBooksVolumes);
    const userHistorialBooksStatus: string = useAppSelector(selectGoogleBooksStatus);
    const userHistorialBooksError: string | null = useAppSelector(selectGoogleBooksError);

    const { isChat, switchContent } = useMainContentRouter();

    const handleBookClick = (id: string, title: string, authors: string[]): void => {

        dispatch(clearCurrentBook());
        dispatch(setCurrentBook({ bookId: id, bookTitle: title, bookAuthors: authors }));
        if(!isChat){
            switchContent("chatRoom");
        };
    }

    const fetchHistorialBookIds = async (userProfileUid: string): Promise<string[]> => {  

        const historialBookIds: string[] = [];

        try {
            // if(true) throw new Error("HERE'S AN ERROR!")
            const userDocRef: DocumentReference<DocumentData, DocumentData> = 
                doc(db, USERS_COLLECTION, userProfileUid);
            const docSnap: DocumentSnapshot<DocumentData, DocumentData> = 
                await getDoc(userDocRef);

            if (docSnap.exists()) {
                const profileData: UserProfileType = docSnap.data() as UserProfileType;
                profileData.userChatHistorial.forEach(id => historialBookIds.push(id));
            } else {
                console.warn("Settings: No user profile document found.");
                historialBookIds.length = 0;
            }

            return historialBookIds;

        } catch (error) {
            console.error("Error fetching user chat historial:", error);
            return [];
        } 
    }

    const getHistorialBooks = useCallback(async (): Promise<void> => {
        if(!userProfileUid) return;
        dispatch(clearGoogleBooksSearch());
        const historialBookIds: string[] = await fetchHistorialBookIds(userProfileUid);
        dispatch(fetchBooksByIds(historialBookIds));
    }, [userProfileUid, dispatch]);

    return { 
        userHistorialBooks,
        userHistorialBooksStatus,
        userHistorialBooksError, 
        getHistorialBooks, 
        handleBookClick 
    };
}

export default useChatHistorial;

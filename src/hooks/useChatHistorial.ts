import * as Sentry from "@sentry/react";
import { useCallback } from 'react';
import { selectGoogleBooksVolumes, selectGoogleBooksStatus, selectGoogleBooksError } from "../features/googleBooks/googleBooksSelectors";
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

    const fetchHistorialBookIds = async (userProfileUid: string): Promise<string[]> => {  

        const historialBookIds: string[] = [];

        try {
            const userDocRef: DocumentReference<DocumentData, DocumentData> = 
                doc(db, USERS_COLLECTION, userProfileUid);
            const docSnap: DocumentSnapshot<DocumentData, DocumentData> = 
                await getDoc(userDocRef);

            if (docSnap.exists()) {
                const profileData: UserProfileType = docSnap.data() as UserProfileType;

                for(let id of profileData.userChatHistorial){
                    historialBookIds.push(id);
                }
                // profileData.userChatHistorial.forEach(id => historialBookIds.push(id));
            } else {
                console.warn("Settings: No user profile document found.");
                historialBookIds.length = 0;
            }

            return historialBookIds;

        } catch (error) {
            Sentry.captureException(error);
            if(import.meta.env.DEV) console.error("Error fetching user chat historial:", error);
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
        getHistorialBooks
    };
}

export default useChatHistorial;

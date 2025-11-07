import { useState } from 'react';
import axios from 'axios';
import { doc, DocumentReference, DocumentSnapshot, getDoc, type DocumentData } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import useUserData from './useUserData';
import { selectUserProfilePremium, selectUserProfileUid } from '../features/userProfile/userProfileSelectors';
import { clearCurrentBook, setCurrentBook } from "../features/currentBook/currentBookSlice";
import useMainContentRouter from './useMainContentRouter';
import type { UserProfileType } from '../types/types';
import type { BookItem } from '../types/booksTypes';

const USERS_COLLECTION: string = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;
const BOOKS_API_URL: string = import.meta.env.VITE_GOOGLE_BOOKS_API_URL;

const useSettings = () => {

    const [userHistorialBooks, setUserHistorialBooks] = useState<BookItem[]>([]);
    const [isLoadingHistorial, setIsLoadingHistorial] = useState<boolean>(false);

    const { isChat, switchContent } = useMainContentRouter();
    const { activatePremiumMode, disablePremiumMode } = useUserData();

    const dispatch = useAppDispatch();

    const userProfileUid: string | null = useAppSelector(selectUserProfileUid);
    const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);

    const changePremiumStatus = (): void => {
        if(isPremiumUser){
            disablePremiumMode();  
        } else {
            activatePremiumMode();
        }
    }

    const handleBookClick = (id: string, title: string, authors: string[]): void => {

        dispatch(clearCurrentBook());
        dispatch(setCurrentBook({ bookId: id, bookTitle: title, bookAuthors: authors }));
        if(!isChat){
            switchContent("chatRoom");
        };
    }

    const fetchBooksByIds = async (historialBookIds: string[]): Promise<BookItem[]> => {
        try {
            const fetchPromises = historialBookIds.map(bookId =>
                axios.get(`${BOOKS_API_URL}/${bookId}`)
            );
            const responses = await Promise.all(fetchPromises);           
            const historialBooksData: BookItem[] = responses.map(response => response.data as BookItem);

            return historialBooksData;

        } catch (error) { 
            if (axios.isAxiosError(error)) {
                console.error('Failed to fetch one or more stored books.');
                return [];
            } else {
                console.error('An unexpected error occurred:', error);
                return [];
            }
        }
    };

    const fetchHistorialBookIds = async (userProfileUid: string): Promise<string[]> => {  

        const historialBookIds: string[] = [];

        try {
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

    const getHistorialBooks = async (): Promise<void> => {
        if(!userProfileUid) return;
        setIsLoadingHistorial(true);
        const historialBookIds: string[] = await fetchHistorialBookIds(userProfileUid);
        const historialBooks: BookItem[] = await fetchBooksByIds(historialBookIds);
        setUserHistorialBooks(historialBooks);
        setIsLoadingHistorial(false);
    }

    return { userHistorialBooks, isLoadingHistorial, handleBookClick, changePremiumStatus, getHistorialBooks };
};

export default useSettings;
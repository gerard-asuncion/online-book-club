import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUserProfileUid } from '../features/userProfile/userProfileSelectors';
import { clearCurrentBook, setCurrentBook } from "../features/currentBook/currentBookSlice";
import useMainContentRouter from './useMainContentRouter';
import type { UserProfile } from '../types/types';
import type { BookItem } from '../types/books';

const USERS_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;
const BOOKS_API_URL = import.meta.env.VITE_GOOGLE_BOOKS_API_URL;

const useSettings = () => {

    const { isChat, switchContent } = useMainContentRouter();

    const dispatch = useAppDispatch();

    const userProfileUid: string | null = useAppSelector(selectUserProfileUid);

    const [userHistorialBooks, setUserHistorialBooks] = useState<BookItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleBookClick = (id: string, title: string, authors: string[]) => {

        dispatch(clearCurrentBook());
        dispatch(setCurrentBook({ bookId: id, bookTitle: title, bookAuthors: authors }));
        if(!isChat){
            switchContent("chatRoom");
        };
    }

    const fetchBooksByIds = async (historialBookIds: string[]): Promise<BookItem[] | undefined> => {

        if (historialBookIds.length === 0) {
            return;
        }
        setError(null);       
        try {
            const fetchPromises = historialBookIds.map(bookId =>
                axios.get(`${BOOKS_API_URL}/${bookId}`)
            );
            const responses = await Promise.all(fetchPromises);           
            const historialBooksData = responses.map(response => response.data as BookItem);

            return historialBooksData;

        } catch (error) { 
            if (axios.isAxiosError(error)) {
                setError('Failed to fetch one or more stored books.');
                return;
            } else {
                setError('An unexpected error occurred.');
                return;
            }
        }
    };

    const fetchUserChatHistorial = useCallback(async () => {  

        const historialBookIds: string[] = [];  

        if (!userProfileUid) {
            console.warn("Settings: No user is authenticated.");
            return;
        }
        setIsLoading(true);
        try {
            const userDocRef = doc(db, USERS_COLLECTION, userProfileUid);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const profileData = docSnap.data() as UserProfile;
                profileData.userChatHistorial.forEach(id => historialBookIds.push(id));
            } else {
                console.warn("Settings: No user profile document found.");
                historialBookIds.length = 0;
            }

            const historial = await fetchBooksByIds(historialBookIds);

            if(historial === undefined){
                throw new Error("Failed loading chat historial.")
            }

            setUserHistorialBooks(historial);

        } catch (error) {
            console.error("Error fetching user chat historial:", error);
        } finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => { 

        fetchUserChatHistorial();

    }, [fetchUserChatHistorial]);


    return { userHistorialBooks, isLoading, error, handleBookClick };
};

export default useSettings;
import * as Sentry from "@sentry/react";
import { useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsMobile, selectOpenSidebar } from "../features/responsive/responsiveSelectors";
import { selectUserProfilePremium } from '../features/userProfile/userProfileSelectors';
import { clearCurrentBook, setCurrentBook } from "../features/currentBook/currentBookSlice";
import { setCloseSidebar } from "../features/responsive/responsiveSlice";
import { clearGoogleBooksSearch, fetchBooksByIds } from '../features/googleBooks/googleBooksSlice';
import useUserData from "./useUserData";
import useMainContentRouter from "./useMainContentRouter";
import { addTimeout } from "../utils/utils";
import type { BookItem } from '../types/booksTypes';
import type { SentMessage } from '../types/messageTypes';

const MESSAGES_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_MESSAGES;

const useSidebar = () => {

    const { removeBookFromProfile } = useUserData();
    const { isChat, switchContent } = useMainContentRouter();

    const dispatch = useAppDispatch();

    const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);
    const isOpenSidebar: boolean = useAppSelector(selectOpenSidebar);
    const isMobile: boolean = useAppSelector(selectIsMobile);

    const [removeMode, setRemoveMode] = useState<boolean>(false);
    const [resultsActiveBooks, setResultsActiveBooks] = useState<BookItem[]>();

    const hideSidebarInMobile = (checkPremium: boolean = true): void => {
        if(isMobile && checkPremium){
            const closeDispatch = () => dispatch(setCloseSidebar());
            addTimeout(closeDispatch, 400);
        }
    }

    const openChat = (currentBookTitle: string | null): void => {
        if(!isChat && currentBookTitle){
            switchContent("chatRoom");
        };
    }

    const getActiveBooks = async (isPremiumUser: boolean): Promise<void> => {
        if(!isPremiumUser) return;
        setResultsActiveBooks([]);
        dispatch(clearGoogleBooksSearch());
        const allRoomIds: string[] = await getAllRoomIds();
        dispatch(fetchBooksByIds(allRoomIds));
    };

    const getAllRoomIds = async (): Promise<string[]> => {
        try {
            const messagesRef: CollectionReference<DocumentData, DocumentData> = 
                collection(db, MESSAGES_COLLECTION);
            const queryMessages: Query<DocumentData, DocumentData> = 
                query(messagesRef);
            const querySnapshot: QuerySnapshot<DocumentData, DocumentData> = 
                await getDocs(queryMessages);

            const roomIds: Set<string> = new Set<string>();

            for(let document of querySnapshot.docs){
                const message: SentMessage = document.data() as SentMessage;
                if (message.room) roomIds.add(message.room);
            }
            return Array.from(roomIds);

        } catch (error) {
            Sentry.captureException(error);
            if(import.meta.env.DEV) console.error("Error fetching room ids:", error);
            return [];
        }
    }

    
    const handleBookCardClick = (id: string, title: string, authors: string[], removeMode: boolean): void => {
        if(removeMode){      
            removeBookFromProfile(id, isPremiumUser);
        } else {
            dispatch(clearCurrentBook());
            dispatch(setCurrentBook({ bookId: id, bookTitle: title, bookAuthors: authors }));
            if(!isChat){
                switchContent("chatRoom");
            };
            hideSidebarInMobile();
        }
    }

    return {
        openChat,
        removeMode,
        setRemoveMode,
        isMobile,
        isOpenSidebar,
        hideSidebarInMobile,
        resultsActiveBooks,
        setResultsActiveBooks,
        getActiveBooks,
        handleBookCardClick
    }
}

export default useSidebar;

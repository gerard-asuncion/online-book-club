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
import { setCloseSidebar, setOpenSidebar } from "../features/responsive/responsiveSlice";
import { clearGoogleBooksSearch, fetchBooksByIds } from '../features/googleBooks/googleBooksSlice';
import useMainContentRouter from "./useMainContentRouter";
import { addTimeout } from "../utils/utils";
import type { BookItem } from '../types/booksTypes';
import type { SentMessage } from '../types/messageTypes';

const MESSAGES_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_MESSAGES;

const useSidebar = () => {

    const { isChat, switchContent } = useMainContentRouter();

    const dispatch = useAppDispatch();

    const isOpenSidebar: boolean = useAppSelector(selectOpenSidebar);
    const isMobile: boolean = useAppSelector(selectIsMobile);

    const [removeMode, setRemoveMode] = useState<boolean>(false);
    const [resultsActiveBooks, setResultsActiveBooks] = useState<BookItem[]>();

    const showSidebar = (open: boolean): void => {
        if(open){
            dispatch(setOpenSidebar());
        }else if(!open){
            dispatch(setCloseSidebar());
        }
    }

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

            querySnapshot.forEach((document) => {
                const message: SentMessage = document.data() as SentMessage;
                if (message.room) roomIds.add(message.room);
            });
            return Array.from(roomIds);

        } catch (error) {
            Sentry.captureException(error);
            if(import.meta.env.DEV) console.error("Error fetching room ids:", error);
            return [];
        }
    }

    return {
        openChat,
        removeMode,
        setRemoveMode,
        isMobile,
        isOpenSidebar,
        showSidebar,
        hideSidebarInMobile,
        resultsActiveBooks,
        setResultsActiveBooks,
        getActiveBooks
    }
}

export default useSidebar;
